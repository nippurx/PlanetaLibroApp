## Context

El reader paginado clasifica toques por zonas 20/60/20 dentro del viewport y hoy todo toque no interactivo en el 20 % derecho avanza. El cuaderno de anotaciones ya carga, crea, actualiza, elimina y navega rangos privados mediante `user_book_annotations`. La base productiva informada es MySQL 5.7.44 y ya recibió `annotation_type` e índice por tipo; no tiene unicidad condicional para señaladores.

## Goals / Non-Goals

**Goals:**

- Permitir múltiples señaladores persistentes por usuario y libro.
- Hacer toggle con un toque en una zona superior derecha exclusiva, accesible y de tamaño táctil.
- Integrar señaladores en el cuaderno existente con filtro, contexto y navegación.
- Evitar duplicados razonablemente desde la API y tolerar duplicados históricos al eliminar.
- Preservar destacados, notas, progreso, gestos y modos de lectura.

**Non-Goals:**

- Colores seleccionables, categorías, exportación o señaladores públicos.
- Persistencia definitiva para visitantes anónimos.
- Ejecutar otra migración SQL o reparar la foreign key que impidió el índice único condicional.
- Cambiar URLs públicas, SEO, manifest o contenido publicado.

## Decisions

1. `annotation_type` será el discriminante explícito (`highlight`, `note`, `bookmark`). Los clientes dejarán de inferir el tipo exclusivamente desde `note_text`, pero conservarán compatibilidad defensiva si un servidor antiguo omite el campo.
2. Un señalador será un ancla puntual: inicio y fin iguales, `exact_text=''`, `note_text=NULL`, contexto anterior/posterior acotado, `color_code=1`. Esto reutiliza el modelo híbrido sin fingir una selección.
3. La API expondrá el toggle en el contrato de anotaciones. Dentro de una transacción, buscará por propietario, libro y ubicación; si existe borrará todos los duplicados de esa ubicación y si no existe insertará. Se bloqueará la fila lógica mediante la secuencia transaccional disponible; sin índice único permanece una carrera extremadamente pequeña entre requests simultáneos, mitigada por bloqueo UI e idempotencia.
4. El hit target será un botón real superpuesto en la esquina superior derecha del viewport, de aproximadamente 52x56 CSS px más safe-area cuando corresponda. `data-reader-interactive` lo excluye de gestos y navegación; su altura limitada deja disponible el avance en el lateral derecho inferior.
5. El botón mostrará la cinta solo cuando la ubicación visible esté marcada, pero la zona táctil existirá siempre. Tendrá nombre y estado accesibles y foco visible.
6. El cuaderno conservará una sola carga y añadirá filtro `bookmarks`. Las filas de señalador mostrarán contexto, ubicación y acciones para navegar/eliminar, sin editor de color o nota.

## Risks / Trade-offs

- [La página visible puede empezar en medio de un nodo] → Crear el ancla desde el primer punto de texto visible y usar fragmento, offset y contexto híbridos.
- [La zona tapa controles o roba avance] → Limitarla a la esquina superior, marcarla interactiva y probar que el lateral derecho inferior todavía avanza.
- [Dos requests simultáneos crean duplicados] → Bloqueo de UI, UUID idempotente, búsqueda previa en transacción y eliminación de todos los equivalentes al quitar.
- [Servidor sin migración] → Mostrar error recuperable; el despliegue requiere verificar `annotation_type` antes de habilitar la UI.
- [Cambio de contenido invalida el ancla] → Resolver por coordenadas y contexto; conservar la fila y avisar si no puede localizarse.
- [La geometría se consulta durante la transición de página] → Invalidar el punto anterior y recalcular al recibir `transitionend`, con fallback temporizado y cancelación al iniciar otra navegación.
- [El toolbar de escritorio intercepta la esquina] → Elevar el target sobre el toolbar y reservar su ancho en la distribución desktop, manteniéndolo debajo de la barra negra y debajo de paneles/modales.
- [Un navegador conserva un manifest anterior] → Revalidar manifest y fragmentos con `cache: no-cache`; ante 409 recargar el reader para reconstruir contenido y anclas, sin atribuir una versión nueva a texto cacheado.
- [Navegar desde el cuaderno restaura foco al toolbar] → Suprimir la restauración de foco únicamente cuando el panel se cierra para ir a una anotación; los cierres normales conservan la accesibilidad existente.
- [El señalador móvil intercepta el botón tipográfico] → En pantallas de hasta 640 px ubicar el target dentro del extremo derecho de la barra negra, sobre su capa y respetando safe-area; desktop conserva la posición inferior.
- [El ancla navegada no coincide con el nuevo inicio visual] → Considerar activo cualquier señalador cuya ancla resuelta intersecte el viewport actual y, al quitarlo, usar la ubicación persistida de ese registro.

## Migration Plan

1. Verificar que `annotation_type` y el índice informado existen; no ejecutar DDL desde la aplicación.
2. Desplegar API compatible con tipos y filtro nuevo.
3. Desplegar frontend y habilitar junto con anotaciones.
4. Validar creación, eliminación, recarga, cuaderno y navegación en móvil y escritorio.
5. Rollback: ocultar el control y revertir API/frontend conservando filas `bookmark`; no eliminar datos personales.

## Open Questions

- La restricción única física permanece diferida hasta diagnosticar la foreign key productiva; no bloquea esta versión.
