## Context

`planeta-libro-app/FEAT-003` se integra sobre el cambio `immersive-book-reader`. Ese reader concatena fragmentos publicados `pag-N.html` en un flujo refluible, pagina mediante columnas CSS o scroll continuo y ya define una ubicación canónica basada en contenido. Los números `pag-N`, páginas visuales y offsets de píxeles son inestables ante fuente, viewport, preferencias y regeneraciones.

La identidad de usuario real es `user_table.userid`; `user_books.user_id` y `user_books_log.user_id` la utilizan de facto. Los libros se identifican físicamente mediante `ebooks_books.ebooks_books_id`, mientras la API pública adopta URI-first. El esquema legacy no declara todas las claves foráneas y la autenticación auditada contiene writes GET sin CSRF, mezcla de acceso SQL y riesgos de sesión que no deben heredarse.

## Goals / Non-Goals

**Goals:**

- Ofrecer destacados y notas privadas a usuarios autenticados, con creación desde una selección y gestión unificada por libro.
- Usar el intento de anotación como invitación contextual al registro sin perder la ubicación o el borrador del visitante.
- Persistir las anotaciones en SQL y sincronizarlas naturalmente entre sesiones/dispositivos.
- Mantener el pasaje anotado al cambiar layout y recuperar razonablemente el ancla tras cambios del contenido.
- Diseñar para millones de filas mediante datos acotados, índices selectivos, paginación y consultas por propietario/libro.
- Garantizar propiedad, privacidad, sanitización, protección contra CSRF y ausencia de caché pública.

**Non-Goals:**

- Destacados populares, notas públicas, colaboración o compartir el comentario personal.
- Notas manuscritas, dibujos, etiquetas, carpetas o flashcards.
- Exportación, búsqueda global o analítica del contenido personal.
- Deduplicar selecciones iguales de diferentes usuarios en una tabla compartida.
- Hacer que `pag-N`, una página visual o un offset DOM sean la identidad única de una anotación.
- Reparar toda la autenticación legacy; sí se exige una frontera segura para estos endpoints.

## Decisions

### 1. Una entidad privada para destacados y notas

La tabla nueva se denomina `user_book_annotations`. Cada fila pertenece a un usuario y un libro. Un destacado tiene `note_text` nulo; una nota es la misma entidad con `note_text` no vacío. La interfaz presenta acciones distintas, pero el almacenamiento y los endpoints comparten modelo.

No se añade un campo `type` en esta etapa para evitar estados contradictorios. Si aparecen clases no derivables —por ejemplo manuscritura o correcciones— una evolución versionada podrá incorporarlo.

La anotación se relaciona directamente con `user_id` y `ebooks_books_id`, no con `user_books.id`. Quitar un libro de la biblioteca no elimina las notas; anotar tampoco depende de que exista previamente una fila de biblioteca.

### 2. Descubrimiento abierto, persistencia autenticada

Un visitante puede seleccionar texto y ver las acciones `Destacar` y `Añadir nota`. Al activarlas, antes de cualquier write, el reader muestra una invitación accesible con el beneficio, y acciones para registrarse, iniciar sesión o cancelar.

El cliente conserva en memoria o almacenamiento efímero versionado el libro, selección, ubicación, intención y borrador si existe. El retorno de autenticación acepta sólo una ruta relativa canonicalizada bajo la app. Tras autenticarse, el reader valida nuevamente el contenido y permite confirmar la creación; no persiste automáticamente una nota que el usuario no haya confirmado.

Si el usuario cancela, puede seguir leyendo sin bloqueos ni recordatorios repetidos durante la misma interacción.

### 3. Ancla híbrida y offsets normalizados

Cada rango conserva como pistas:

- `start_fragment` y `end_fragment` dentro del manifest validado;
- `start_offset` y `end_offset` sobre el texto visible normalizado de esos fragmentos, medidos con una convención única y versionada;
- `exact_text`, el pasaje seleccionado normalizado y limitado;
- `prefix_text` y `suffix_text`, contexto acotado anterior y posterior;
- `content_version`, derivada del manifest o de una huella estable aprobada;
- `anchor_version`, versión del algoritmo/convención.

Los offsets nunca se calculan sobre HTML crudo, bytes UTF-8, páginas visuales o coordenadas de pantalla. La implementación debe documentar si usa puntos de código Unicode u otra unidad reproducible entre cliente y servidor.

Al resolver, el reader intenta: coordenadas y texto exacto bajo la misma versión; texto exacto cerca de la pista original; texto más contexto estructural; mejor coincidencia segura; y finalmente estado no localizado. El texto y la nota se conservan incluso si ya no puede marcarse el pasaje.

Selecciones que atraviesan fragmentos son válidas siempre que formen un rango continuo, ordenado, dentro del mismo libro y de límites configurados. `pag-N` acelera la carga, pero no se expone como garantía editorial.

### 4. Esquema lógico y límites

La tabla tendrá conceptualmente:

- identidad `id` de 64 bits;
- `user_id`, `ebooks_books_id`;
- coordenadas de inicio y fin;
- `exact_text`, `prefix_text`, `suffix_text`;
- `content_version`, `anchor_version`;
- `note_text` nullable y `color` dentro de una paleta cerrada;
- `created_at`, `updated_at`.

Los tamaños máximos de selección, contexto y nota se fijan antes de migrar y se validan tanto en API como en UI. La primera versión usa una paleta pequeña; no asigna significado semántico a los colores.

Para la versión 1 se fijan 4.000 unidades UTF-16 normalizadas para el pasaje, 256 para cada contexto y 10.000 para la nota. Los offsets se miden en unidades UTF-16 sobre texto visible con whitespace colapsado; `anchor_version=1` identifica esta convención. La paleta cerrada es amarillo (`1`, predeterminado), azul (`2`), rosa (`3`) y verde (`4`).

Índices mínimos esperados:

- `(user_id, ebooks_books_id, start_fragment, start_offset, id)` para el cuaderno y el render del libro;
- `(user_id, updated_at, id)` para futura sincronización/listado del propietario;
- PK sobre `id`.

No se crea una tabla `book_text_anchors`: la deduplicación tendría baja efectividad, añadiría joins y concurrencia, y no elimina la necesidad de evidencia por anotación. Se medirá almacenamiento real antes de normalizar.

### 5. Contrato API y propiedad

La API pública recibe la URI del libro y resuelve `ebooks_books_id` en el repositorio. `user_id` proviene exclusivamente de la sesión server-side y nunca del path, query o body. Crear, listar, editar y eliminar requieren autenticación.

Actualizar o eliminar siempre filtra simultáneamente por `id` y `user_id`; una anotación ajena se responde sin revelar su existencia. Los writes usan métodos semánticos, sentencias preparadas, transacción cuando corresponda, protección CSRF/Origin según el contrato de sesión y límites de frecuencia/tamaño.

Las respuestas autenticadas usan `Cache-Control: private, no-store` y quedan excluidas de service workers/cachés compartidas. Logs y métricas pueden registrar IDs técnicos, latencia y resultado, pero no `note_text`, `exact_text` ni contexto.

La sesión expone un token CSRF aleatorio ligado a la sesión autenticada. POST, PATCH y DELETE requieren ese token, mismo origen y un límite de frecuencia por sesión. El retorno a login acepta únicamente rutas relativas bajo `/app/`; el borrador efímero expira a los 20 minutos y requiere confirmación después del regreso.

`content_version` usa `manifest.generated_at` cuando está disponible y, como fallback compatible, `manifest-v2:{uri}:{pages}`. Crear una anotación no crea ni requiere una fila en `user_books`.

### 6. Cuaderno y renderizado

El panel `Mis anotaciones` pertenece al libro abierto y combina notas y destacados en orden de lectura. Ofrece filtros `Todas`, `Destacados` y `Notas`, estados vacío/error y paginación o carga incremental. Cada entrada muestra el extracto, comentario si existe, color y una acción para volver al pasaje.

Al navegar a una anotación, el reader carga la ventana necesaria, resuelve el ancla, presenta el pasaje y mueve foco/anuncia el destino de forma accesible. En un ancla no localizada muestra el extracto y la nota, permite editar/eliminar y explica que ya no puede ubicar el fragmento; no inventa una posición.

La selección activa prevalece sobre toque lateral y swipe. Crear, abrir el editor o seleccionar texto no debe avanzar página. Los rangos se vuelven a representar después de repaginación, cambio de preferencias o modo.

### 7. Conflictos y consistencia

Cada edición devuelve `updated_at`. Las actualizaciones incluyen la versión observada; si otro dispositivo modificó la fila, la API rechaza el write con conflicto y devuelve el estado actual para decisión explícita. Eliminar es idempotente desde la perspectiva del propietario.

Crear puede aceptar una clave idempotente acotada por usuario para evitar duplicados causados por reintentos de red, sin impedir que el lector cree deliberadamente dos anotaciones sobre el mismo pasaje.

## Risks / Trade-offs

- **Conversión percibida como muro:** explicar el valor antes del login, conservar contexto y permitir cancelar sin interrumpir la lectura.
- **Login pierde selección:** guardar un borrador efímero con expiración, validar retorno y revalidar el rango tras autenticación.
- **Offsets ambiguos:** convención normalizada, versionada y compartida; pruebas con entidades, Unicode, espacios, elementos inline y selección entre fragmentos.
- **Regeneración rompe anclas:** evidencia textual/contextual, versión de contenido y degradación a no localizada sin pérdida de la nota.
- **Volumen de millones de filas:** límites, índices compuestos, paginación por cursor, consultas por propietario/libro y medición antes de particionar o deduplicar.
- **Exposición de datos privados:** ownership server-side, no-store, exclusión de logs/caché/compartir y pruebas cruzadas entre usuarios.
- **Deuda de autenticación legacy:** frontera API nueva y segura; no reutilizar endpoints GET ni confiar en IDs del cliente.
- **Solapamiento de destacados:** permitir rangos superpuestos y definir render determinista; evitar fusionarlos silenciosamente porque pueden tener notas distintas.
- **Asas de selección inestables en Android paginado (confirmado):** en Chromium móvil, el flujo multicolumna desplazado mediante `transform: translate3d(...)` puede mezclar coordenadas lógicas y transformadas. Al ajustar una selección, las asas pueden invertirse y una saltar al inicio del texto visible, seleccionando gran parte de la página. La misma selección funciona correctamente en modo continuo, por lo que el defecto queda aislado al mecanismo de paginado y no al anclaje SQL.

### Deuda diferida: selección nativa en modo paginado móvil

La corrección definitiva se difiere para una iteración posterior. Se conservarán y evaluarán estas alternativas, de menor a mayor alcance:

1. **Mitigación sobre la implementación actual:** mientras exista una selección nativa, suspender gestos, precarga, repaginación y cambios de página; reducir los renders disparados por `selectionchange`; esperar a que el rango se estabilice antes de mostrar acciones. Puede reducir la frecuencia, pero no elimina el defecto de geometría de Chromium.
2. **Selección temporal en modo continuo:** ofrecer cambiar a modo continuo para seleccionar con precisión y luego restaurar el modo anterior. Es estable, pero interrumpe la lectura y requiere preservar ubicación y selección.
3. **Paginado mediante desplazamiento horizontal real (recomendado):** mantener columnas sin transformar y navegar con `scrollLeft`, opcionalmente con `scroll-snap`. El viewport y las asas usarían el mismo sistema de coordenadas. Requiere revisar página visual, swipe, botones, restauración, precarga, progreso, cambios de preferencias e `Ir al texto`.
4. **Páginas DOM independientes:** dividir el contenido refluible en contenedores reales por página. Ofrece máximo control, pero tiene mayor complejidad al repaginar por fuente, viewport, interlineado y orientación.

No se implementarán asas de selección propias: reemplazar la selección nativa sería frágil y perjudicaría copiar texto y accesibilidad. La aceptación futura exige pruebas en Chrome y Brave para Android, con selección de una y varias líneas, cerca de límites de columna y tras cambios de orientación/preferencias.

**Alternativa experimental elegida:** se implementa la opción 2 exclusivamente en Android cuando la preferencia es paginada. Tras estabilizar una selección inicial válida, el reader activa scroll continuo como modo efectivo temporal, reconstruye el rango nativo desde sus coordenadas normalizadas y conserva la preferencia paginada. Al colapsar o finalizar la selección vuelve a la página visual anterior. El experimento queda aislado en Git y la tarea permanece abierta hasta validarlo manualmente en Chrome y Brave para Android.

## Migration Plan

1. Fijar límites, unidad de offset, formato de `content_version`, paleta y contrato autenticado/CSRF.
2. Crear `user_book_annotations` e índices en una migración reversible conforme al registro propuesto en `docs/db_audit/40_SCHEMA_ADDITIONS.md`, verificando motor, charset y collation compatibles con notas Unicode.
3. Implementar repositorio y endpoints autenticados detrás de una bandera, con ownership, no-store, límites e idempotencia.
4. Integrar selección, invitación de autenticación, editor, render y cuaderno en el reader sin habilitar para tráfico general.
5. Validar con libros reales, selecciones intra/interfragmento, Unicode, repaginación, regeneración simulada, sesiones concurrentes y usuarios distintos.
6. Activar gradualmente, observar errores de resolución, latencia, tamaño de filas y conversión registro→anotación confirmada.

Rollback: ocultar la capacidad y deshabilitar los endpoints de escritura conservando la tabla para no perder datos personales. La eliminación física sólo se considera después de exportar o confirmar que no existen anotaciones reales.

## Open Questions

No quedan preguntas de diseño bloqueantes. Antes del despliegue general resta verificar el DDL productivo real y medir planes SQL con volumen representativo.
