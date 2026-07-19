## Why

El lector necesita señaladores persistentes y múltiples por libro, con la interacción inmediata y predecible esperada por usuarios de lectores dedicados. La esquina superior derecha debe reservarse para esta acción sin provocar avances de página, y los señaladores deben convivir con notas y subrayados en el cuaderno unificado.

## What Changes

- Añadir señaladores privados autenticados como un tipo explícito de `user_book_annotations`.
- Permitir agregar o quitar el señalador de la ubicación visible mediante un toque en una zona superior derecha de tamaño táctil.
- Excluir esa zona de la navegación por toque y conservar el avance en la región derecha inferior.
- Mostrar el señalador activo con un único color y sin selector.
- Incorporar señaladores al panel existente de anotaciones con filtro, contexto y navegación.
- Reutilizar anclas de contenido y `color_code=1`; los colores y categorías quedan fuera de alcance y registrados como `FEAT-008`.
- Mantener la compatibilidad de los contratos existentes de destacados y notas mediante `annotation_type` explícito.

## Capabilities

### New Capabilities

- `reader-bookmarks`: creación, eliminación, persistencia, presentación y navegación de múltiples señaladores privados por libro.

### Modified Capabilities

- Ninguna spec principal existente; el cambio extiende el cuaderno implementado por el change activo `reading-annotations` sin modificar URLs públicas.

## Impact

- Frontend: `ImmersiveReaderPage`, gestos, contratos API y cuaderno de anotaciones.
- API PHP: validación, repositorio, filtros y respuesta de anotaciones.
- Datos: usa `user_book_annotations.annotation_type` e `idx_uba_user_book_type_location`, informados como aplicados en MySQL 5.7.44; no depende del índice único condicional fallido.
- Seguridad: escrituras autenticadas, mismo origen, CSRF, límites e identidad server-side ya usados por anotaciones.
- SEO/GEO: sin impacto; no cambia rutas, HTML indexable ni metadata pública.
- Compatibilidad: los clientes anteriores continúan recibiendo los campos previos más `annotation_type`; filtros existentes conservan su significado.
