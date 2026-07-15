## Why

El lector actual de la app es una maqueta estática y el lector legacy expone la partición técnica del publicador como páginas numeradas. Esto impide ofrecer una lectura adaptable, continua y consistente con la experiencia rápida, hermosa y sin distracciones que busca PlanetaLibro, aunque los libros ya publican un contrato reutilizable mediante `manifest.json` y fragmentos `pag-N.html`.

El objetivo es incorporar un lector inmersivo en la app que consuma ese formato sin modificar el publicador EPUB, oculte al lector la fragmentación interna y permita retomar la lectura con preferencias y navegación accesibles.

## What Changes

### MVP

- Servir el reader en `https://planetalibro.net/app/` y consumir `/lector/...` en el mismo origen; durante desarrollo y preview, reproducir esa topología mediante proxy Vite sin cambiar Apache.
- Reemplazar la maqueta del reader React por una experiencia de lectura funcional, de controles discretos y contenido adaptable a móvil, tablet y escritorio, con paginación visual tipo Kindle como modo predeterminado.
- Cargar la estructura del libro desde `manifest.json` y el contenido desde `pag-N.html`, tratándolos como recursos internos y no como páginas visibles para el usuario.
- Cuando un libro legacy carezca de `manifest.json` pero tenga `libroinfo.php` y fragmentos válidos, solicitar a la API un manifest v2 de compatibilidad: la API lo reconstruye sin ejecutar contenido arbitrario, lo publica atómicamente para lecturas posteriores y registra el libro en `ebook_regeneration_queue` para su futura regeneración con `epub2html2`.
- Avanzar o retroceder una pantalla visual completa mediante toque/clic lateral, swipe horizontal, controles visibles y teclado; ofrecer scroll continuo como modo alternativo.
- Ofrecer navegación por índice y una representación de progreso basada en porcentaje y capítulo.
- Permitir ajustar tema, familia y tamaño tipográfico, interlineado y ancho/márgenes de lectura, conservando las preferencias disponibles entre sesiones.
- Mantener columnas CSS como motor de paginación del MVP y, tras cualquier reflujo, conservar el pasaje anclado visible inmediatamente y, cuando la distribución natural lo permita, dentro de la mitad superior de la nueva página visual.
- Guardar una ubicación de lectura estable basada en un ancla interna del contenido, independiente del número `pag-N` y de la página visual calculada, y prever su sincronización remota sin inventar un contrato de API que el proyecto todavía no ofrece.
- Cumplir navegación por teclado, foco visible, nombres accesibles, contraste suficiente y reducción de movimiento.
- Mantener las URLs legacy `/leerlibro/{book-uri}/{page}` y el publicador EPUB sin cambios.

### Fuera de alcance

- Modificar el conversor/publicador EPUB, `libroinfo.php`, los fragmentos `pag-N.html` o sobrescribir manifests v2 existentes. La única escritura publicada admitida es crear un `manifest.json` ausente para compatibilidad legacy.
- Búsqueda dentro del libro, marcadores, resaltados, notas, diccionario, lectura en voz alta y modo offline/PWA.
- Animación de hoja, gamificación, funciones sociales o asistencia de IA.
- Paginación mediante rangos DOM o saltos artificiales destinados a fijar una línea en la parte superior después del reflujo.
- Crear tablas o campos adicionales fuera de `ebook_regeneration_queue`, ya provisionada para esta compatibilidad, ni endpoints de progreso remoto sin acordar antes su contrato.

## Capabilities

### New Capabilities

- `immersive-reading`: Presentación rápida, adaptable y sin distracciones del contenido publicado, con paginación visual predeterminada y sin exponer la fragmentación `pag-N`.
- `reader-navigation`: Navegación por pantalla visual mediante toque, swipe, teclado y controles; índice y modo alternativo de scroll continuo.
- `reading-preferences`: Ajustes visuales de lectura persistentes y aplicados sin destellos evitables.
- `reading-progress`: Cálculo, conservación y restauración mediante un ancla interna independiente de `pag-N` y de la página visual, con estrategia local y futura sincronización remota.
- `accessible-reader`: Operación completa sin gestos obligatorios, semántica, foco, contraste y movimiento accesibles.

### Modified Capabilities

No existen capacidades base en `openspec/specs/`; todas las capacidades de este cambio son nuevas.

## Impact

- **App React:** ruta existente `/read/:libro_uri/:page`, `ImmersiveReaderPage`, modo inmersivo de `AppShell` y enlaces desde ficha, dashboard y audiolibro.
- **Carga de contenido:** el cliente mantiene acceso directo al `manifest.json` y los fragmentos. Sólo ante 404 del manifest usa `GET /api/v1/public/reader-manifest/{uri}`, que materializa un manifest v2 faltante desde `libroinfo.php`, registra la regeneración pendiente y devuelve el mismo contrato JSON.
- **Persistencia operativa:** la API realiza un `UPSERT` idempotente en `ebook_regeneration_queue`; esta escritura no representa progreso del usuario y no modifica `ebooks_books`.
- **Persistencia:** la API v1 actual es read-only y devuelve progreso simulado (`currentPage: 1`, `progressPercent: 0`). El legacy actualiza `user_books.current_page` al visitar una página; cualquier sincronización nueva deberá conservar compatibilidad y definir autenticación, resolución de conflictos y granularidad antes de implementarse.
- **Compatibilidad:** no hay cambio breaking para el publicador ni para `/leerlibro/...`; `manifest.json` versión 2 y los fragmentos existentes siguen siendo la fuente publicada.
- **Calidad:** el proyecto aún no tiene framework de tests; las tareas deberán incorporar la infraestructura automatizada mínima y pruebas manuales representativas.
