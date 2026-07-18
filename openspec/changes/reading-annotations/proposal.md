## Why

El lector inmersivo permite leer y conservar el progreso, pero no ofrece una forma de apropiarse del texto: un lector no puede guardar un pasaje significativo, escribir una reflexión ni volver después a ese lugar. La prueba de producto que originó `planeta-libro-app/FEAT-003` mostró que destacados y notas son acciones distintas para el usuario, aunque comparten el mismo anclaje y ciclo de vida.

La capacidad también ofrece una razón concreta para registrarse: el visitante puede descubrir la acción sobre el texto y, al intentar guardarla, comprender que una cuenta gratuita conserva sus anotaciones y permite recuperarlas en otros dispositivos.

## What Changes

- Permitir seleccionar un pasaje del contenido refluible y crear un destacado o una nota personal.
- Exigir una sesión autenticada para persistir, consultar, editar o eliminar anotaciones.
- Permitir que un visitante descubra e intente la acción; antes de escribir en servidor se le explica el beneficio y se le ofrece registro o inicio de sesión, preservando el contexto para continuar.
- Persistir destacados y notas como una única entidad privada en una tabla SQL `user_book_annotations`.
- Anclar cada selección mediante coordenadas normalizadas y evidencia textual suficiente para sobrevivir a cambios de layout y recuperarse, cuando sea posible, tras una regeneración del libro.
- Mostrar por libro una experiencia unificada con filtros para todas las anotaciones, destacados y notas, y navegación de regreso al pasaje.
- Incorporar contratos autenticados, comprobación de propiedad, protección de writes, límites y pruebas de privacidad, concurrencia y recuperación de anclas.

## Capabilities

### New Capabilities

- `reading-annotations`: Creación, persistencia privada, recuperación, edición y eliminación de destacados y notas personales anclados al contenido de un libro.

## Impact

- **Base de datos:** nueva tabla InnoDB `user_book_annotations`, relacionada de facto con `user_table.userid` y `ebooks_books.ebooks_books_id`, con índices orientados a usuario, libro y ubicación.
- **API:** nuevos endpoints autenticados de anotaciones. La identidad se obtiene exclusivamente de la sesión; la URI pública del libro se resuelve internamente al ID físico.
- **Reader React:** menú de selección, representación de rangos, editor de nota, llamada a autenticación con retorno, panel unificado y navegación hacia el pasaje.
- **Autenticación:** se necesita un contrato seguro de sesión para la app. No se reutilizan writes legacy por GET ni flujos sin CSRF documentados en la auditoría.
- **Privacidad:** notas y destacados son privados por defecto, no se incluyen en cachés públicas, previews sociales, telemetría de contenido ni acciones de compartir citas.
- **Compatibilidad:** `pag-N` y offsets son pistas de carga. El texto exacto, contexto y versión del contenido permiten validar o recuperar el ancla.

La exportación, anotaciones públicas/sociales, destacados populares, colaboración, manuscritura, etiquetas y búsqueda global quedan fuera de este cambio.
