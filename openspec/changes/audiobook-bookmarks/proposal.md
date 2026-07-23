## Why

El reproductor de audiolibros guarda una única posición de reanudación, pero no permite conservar varios momentos importantes ni asociarles notas privadas. La tabla `user_audiobook_annotations` ya fue creada por el propietario para cubrir esa necesidad sin forzar coordenadas temporales dentro del modelo textual del ebook.

## What Changes

- Añadir señaladores privados persistentes en el segundo actual del audiolibro asociado al libro.
- Incorporar un botón compacto de solo icono `bookmark_add`, accesible y disponible cuando el reproductor está listo.
- Crear el señalador inmediatamente y abrir después un editor de nota opcional sin pausar el audio.
- Evitar duplicados por usuario, libro, medio y segundo; una creación repetida recupera el registro existente y nunca lo elimina.
- Permitir listar, navegar, editar la nota y eliminar señaladores de audio con autorización, CSRF, límites y concurrencia optimista.
- Preservar señaladores pertenecientes a un video anterior sin aplicarlos silenciosamente al medio nuevo.
- Mantener separados el progreso único de `user_video_audiolibros`, las anotaciones textuales de `user_book_annotations` y los nuevos registros de `user_audiobook_annotations`.
- No cambiar URLs públicas, canonical, contenido indexable ni rutas legacy; el impacto SEO/GEO esperado es neutro.
- Permitir compartir un señalador existente o el instante actual mediante un enlace profundo al segundo exacto, con un mensaje temporal opcional.
- Crear o reutilizar automáticamente un señalador estándar cuando un usuario autenticado confirma “Guardar y compartir” desde el reproductor.

## Capabilities

### New Capabilities

- `audiobook-bookmarks`: Creación, notas opcionales, listado, navegación y eliminación de señaladores privados anclados a un medio y segundo del audiolibro.

### Modified Capabilities

Ninguna.

## Impact

- Frontend: `AudiobookPlayerPage`, componente del reproductor, cliente API tipado y lógica de presentación/edición.
- API PHP v1: nuevas rutas autenticadas, controlador, repositorio y validación del medio vigente.
- Datos: lecturas y escrituras sobre `user_audiobook_annotations`; lectura de `ebooks_books.video_audiolibro`; no se ejecuta DDL desde la aplicación.
- Seguridad y privacidad: identidad exclusivamente server-side, mismo origen, CSRF, rate limiting, ownership, prepared statements y `Cache-Control: private, no-store`.
- Compatibilidad: no modifica contratos existentes de progreso, reader, biblioteca ni legacy. Rollback: ocultar el control y deshabilitar las rutas conservando los datos privados.
