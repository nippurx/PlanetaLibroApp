# Cola de regeneración de libros (`ebook_regeneration_queue`)

## Propósito del documento

Este documento explica por qué existe `ebook_regeneration_queue`, qué acontecimiento origina sus registros y cómo deben interpretarse. Su alcance es técnico y funcional: describe el flujo actualmente implementado para la compatibilidad de libros legacy con el lector moderno de Planeta Libro.

La tabla no registra lecturas, usuarios ni progreso. Es un registro operativo de libros cuya publicación requiere una regeneración definitiva.

## Resumen ejecutivo

El lector moderno utiliza `manifest.json` versión 2 como contrato estructural de cada libro. Parte del catálogo fue publicada antes de que existiera ese contrato: esos libros conservan `libroinfo.php` y fragmentos `pag-N.html`, pero pueden carecer de `manifest.json`.

Para que un libro legacy pueda abrirse sin esperar una intervención editorial, la API puede reconstruir bajo demanda un manifest de compatibilidad. Ese archivo restablece la lectura inmediata, pero no equivale a republicar el libro con el generador vigente. Por eso el sistema registra el libro en `ebook_regeneration_queue`: la fila conserva la obligación de regenerarlo posteriormente con `epub2html2`, aun cuando ya sea legible.

En términos operativos, una fila con motivo `legacy_compatibility_manifest` significa:

> El libro necesitó la capa de compatibilidad del lector moderno y continúa identificado para una regeneración definitiva con el publicador actual.

## Origen del problema

Planeta Libro convive con dos generaciones de publicaciones:

1. **Publicación moderna:** dispone de un `manifest.json` v2 que declara URI, cantidad de fragmentos, página inicial, índice, capítulos, recursos y advertencias.
2. **Publicación legacy:** conserva metadatos en `libroinfo.php` y el contenido en una secuencia de archivos `pag-N.html`, pero puede no disponer del manifest moderno.

El navegador no debe descargar ni ejecutar `libroinfo.php` como contrato de datos. Tampoco sería aceptable interpretar PHP mediante `include` o `eval`, porque el archivo pertenece a una publicación histórica y no a una API diseñada para el cliente.

La compatibilidad se implementó en el servidor mediante un parser limitado que reconoce únicamente las asignaciones legacy admitidas. De esa forma, la API puede recuperar la estructura necesaria sin ejecutar código PHP arbitrario.

## Cómo se origina un registro

El flujo comienza cuando el lector solicita el manifest estático de un libro y recibe un HTTP 404. Sólo en ese caso llama al endpoint de compatibilidad `GET /api/v1/public/reader-manifest/{uri}`.

La API realiza el siguiente proceso:

1. valida la URI pública del libro;
2. obtiene su `ebooks_books_id` desde `ebooks_books`;
3. resuelve de forma confinada su directorio bajo la raíz configurada del lector;
4. adquiere un lock exclusivo por libro para evitar materializaciones concurrentes;
5. comprueba nuevamente si otro proceso ya creó un manifest válido;
6. localiza y analiza `libroinfo.php` sin ejecutarlo;
7. valida los metadatos y la existencia contigua de todos los archivos `pag-N.html` declarados;
8. registra mediante UPSERT la necesidad de regeneración en `ebook_regeneration_queue`;
9. construye y valida un `manifest.json` v2 temporal;
10. publica el manifest mediante un renombrado atómico;
11. registra la fecha de generación exitosa del manifest de compatibilidad;
12. devuelve el manifest en la misma respuesta.

El registro se produce después de validar los metadatos legacy y los fragmentos, pero antes de escribir y publicar el manifest. Esta secuencia permite que un fallo de escritura o publicación deje constancia de que el libro requiere atención. En ese caso, la fila puede existir sin `compatibility_manifest_generated_at`.

Si al entrar al servicio ya existe un `manifest.json` v2 válido, el servicio lo devuelve y no crea una fila nueva. La cola documenta la detección ocurrida durante la materialización legacy; no es un inventario obtenido examinando retroactivamente todos los manifests del catálogo.

## Datos registrados por el flujo actual

El repositorio escribe o actualiza los siguientes datos:

| Dato | Valor o uso actual | Significado |
|---|---|---|
| `ebooks_books_id` | ID interno del libro | Relaciona el trabajo operativo con `ebooks_books`. |
| `reason` | `legacy_compatibility_manifest` | Indica que el trabajo nació al necesitar un manifest construido desde una publicación legacy. |
| `status` | `pending` al insertar | Señala que la regeneración definitiva todavía está pendiente. |
| `target_generator` | `epub2html2` | Identifica el generador con el que debe republicarse el libro. |
| `compatibility_manifest_generated_at` | Fecha y hora, tras la publicación exitosa | Confirma únicamente la creación del manifest transitorio de compatibilidad. |
| `updated_at` | Actualizado por el UPSERT y al marcar el manifest | Registra la última actualización efectuada por este flujo. |

La clave única esperada es la combinación (`ebooks_books_id`, `target_generator`). El UPSERT hace que varias aperturas del mismo libro no generen trabajos duplicados para el mismo destino. En una detección repetida se conserva la fila, se reafirma el motivo y se actualiza `updated_at`.

## Cómo interpretar que un libro esté en la tabla

La presencia de un libro significa que fue identificado como candidato a regeneración por el flujo de compatibilidad. Para el motivo actualmente implementado, el sistema comprobó que tenía una publicación legacy válida y llegó al punto de encolar su regeneración.

Esto no implica necesariamente que el libro esté indisponible. Pueden darse, al menos, estas situaciones:

- **Pendiente con fecha de manifest de compatibilidad:** el manifest transitorio se publicó correctamente y el libro puede abrirse en el lector moderno, pero todavía necesita la regeneración definitiva.
- **Pendiente sin fecha de manifest de compatibilidad:** la estructura legacy fue validada y el trabajo se registró, pero la publicación del manifest no llegó a confirmarse. Una causa posible es un fallo posterior de escritura, validación o renombrado.

La existencia actual de un archivo `manifest.json` tampoco demuestra por sí sola que la deuda esté resuelta: puede ser el manifest transitorio generado por este mismo mecanismo. Los manifests de compatibilidad se identifican además por `legacy_source.compatibility_manifest = true` y por la advertencia que indica que el libro debe regenerarse con `epub2html2`.

## Manifest de compatibilidad frente a regeneración definitiva

Son dos resultados diferentes:

| Manifest de compatibilidad | Regeneración definitiva |
|---|---|
| Se crea bajo demanda para restablecer la lectura. | Republica el libro mediante el generador vigente. |
| Deriva su estructura de `libroinfo.php` y `pag-N.html`. | Debe producir los artefactos canónicos del proceso moderno. |
| Es una solución transitoria y está marcado como legacy. | Resuelve la deuda operativa que representa la cola. |
| Puede coexistir con un trabajo en estado `pending`. | Debería determinar el cierre exitoso del trabajo. |

Por lo tanto, `compatibility_manifest_generated_at` no es una fecha de finalización de la regeneración. Sólo acredita que la medida de compatibilidad fue publicada correctamente.

## Qué no representa esta tabla

`ebook_regeneration_queue` no debe interpretarse como:

- historial de visitas o aperturas;
- progreso de lectura;
- relación entre usuarios y libros;
- indicador de popularidad;
- cola de descargas;
- prueba automática de que un libro está roto;
- confirmación de que la regeneración definitiva ya terminó;
- autorización general para modificar `ebooks_books`, `libroinfo.php` o los fragmentos publicados.

La escritura en esta tabla es una excepción operativa acotada dentro de una API mayormente de lectura. No constituye un patrón general para introducir otras escrituras.

## Concurrencia e idempotencia

La materialización utiliza dos protecciones complementarias:

- un lock exclusivo asociado al directorio del libro, seguido de una segunda comprobación del manifest;
- una clave única por libro y generador, junto con un UPSERT.

El lock protege la creación del archivo y el UPSERT protege la cola. Así, dos primeras aperturas concurrentes no deberían publicar manifests incompatibles ni crear filas duplicadas para `epub2html2`.

## Errores y límites de interpretación

No todos los fallos posibles generan una fila. Si la URI es inválida, el libro no existe en la base, el directorio no puede resolverse, falta `libroinfo.php`, sus metadatos son inválidos o falta algún fragmento, la ejecución termina antes del UPSERT.

En cambio, los fallos ocurridos después de encolar —por ejemplo, al escribir o publicar el archivo— pueden dejar una fila pendiente sin fecha de manifest generado. La tabla, por sí sola, no contiene suficiente contexto para diagnosticar todos esos casos; debe complementarse con el estado, el campo de error si existe en el esquema desplegado y los logs de la API.

## Ciclo de vida actualmente comprobado

El código versionado define con claridad estas dos transiciones:

1. creación o actualización idempotente del trabajo con estado inicial `pending`;
2. actualización de `compatibility_manifest_generated_at` cuando se publicó el manifest transitorio.

No se encontró en el repositorio un consumidor que tome los trabajos, ejecute `epub2html2` y defina de manera comprobable las transiciones posteriores de estado, reintentos, errores o cierre. En consecuencia, este documento no prescribe nombres de estados ni condiciones de finalización que no estén respaldados por la implementación.

Hasta que ese consumidor esté implementado o documentado, un registro no debe retirarse ni marcarse como completado únicamente porque exista un manifest o porque `compatibility_manifest_generated_at` tenga valor. El cierre debe corresponder a una regeneración definitiva confirmada por el proceso responsable.

## Estado del esquema documental

La verificación manual de producción del 14 de julio de 2026 confirmó una tabla compatible con:

- clave única (`ebooks_books_id`, `target_generator`);
- columnas de estado, timestamps y error;
- un registro real en estado `pending` con destino `epub2html2` y fecha de manifest generado.

Sin embargo, la definición de `ebook_regeneration_queue` no aparece actualmente en `docs/c2380538_main_stru.sql`. Por esa razón, la lista de columnas de este documento se limita a las utilizadas directamente por el código y a las características verificadas en la documentación operativa. El DDL debería incorporarse al inventario versionado de esquema para que la estructura física tenga una fuente de verdad auditable.

## Preguntas frecuentes

### ¿Por qué un libro puede leerse y continuar pendiente?

Porque la lectura puede estar funcionando mediante un manifest de compatibilidad. La publicación definitiva con `epub2html2` es una tarea separada.

### ¿La fecha del manifest significa que el trabajo terminó?

No. `compatibility_manifest_generated_at` confirma la publicación de la solución transitoria, no la regeneración definitiva.

### ¿Cada apertura agrega una fila?

No. La combinación de libro y generador es única y el alta utiliza un UPSERT. Además, las aperturas posteriores normalmente cargan directamente el manifest estático y ya no invocan el endpoint de compatibilidad.

### ¿Un libro sin fila está necesariamente actualizado?

No. La cola se alimenta bajo demanda cuando el lector encuentra un 404 y materializa un libro legacy. Un libro nunca abierto mediante ese flujo puede no haber sido detectado.

### ¿Una fila sin fecha de manifest indica que `libroinfo.php` era inválido?

No. Los metadatos y fragmentos se validan antes del alta. La ausencia de fecha indica que no se confirmó la publicación posterior del manifest; el diagnóstico concreto requiere revisar errores y logs.

### ¿Puede borrarse la fila cuando aparece `manifest.json`?

No como consecuencia automática. El archivo puede ser el manifest de compatibilidad. La fila sólo debería cerrarse de acuerdo con el resultado confirmado de la regeneración definitiva.

## Referencias de implementación

- `api/v1/src/Reader/ReaderManifestService.php`: validación, lock, materialización y orden de las operaciones.
- `api/v1/src/Repositories/ReaderManifestRepo.php`: UPSERT y actualización de la fecha del manifest.
- `api/v1/src/Reader/LegacyBookInfoParser.php`: interpretación limitada de `libroinfo.php`.
- `api/v1/docs/README.md`: contrato y respuestas del endpoint de compatibilidad.
- `openspec/changes/immersive-book-reader/`: propuesta, diseño, especificación y tareas que originaron la funcionalidad.
- `docs/immersive-reader-implementation.md`: resumen de la integración con el lector.
- `docs/immersive-reader-manual-checklist.md`: verificación operativa en producción.
- `CONSTITUTION.md`: restricciones arquitectónicas y de persistencia aplicables.
