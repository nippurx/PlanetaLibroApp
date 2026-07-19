## 1. Cerrar contratos y límites

- [x] 1.1 Definir límites exactos para selección, contexto y nota; unidad normalizada de offsets, `anchor_version` y `content_version`.
- [x] 1.2 Acordar paleta cerrada y color predeterminado, incluida su accesibilidad en temas claro, sepia y oscuro.
- [x] 1.3 Definir el contrato autenticado de la app, protección CSRF/Origin, retorno relativo seguro y borrador efímero con expiración.
- [x] 1.4 Decidir si la primera anotación añade el libro a `user_books` o mantiene ambas acciones independientes, sin vincular la fila de anotación a `user_books.id`.

## 2. Persistencia SQL

- [ ] 2.1 Diseñar y revisar la migración InnoDB/utf8mb4 para `user_book_annotations`, con PK de 64 bits, propietario, libro, rango, evidencia textual, versiones, nota, color y timestamps.
- [ ] 2.2 Añadir índices para `(user_id, ebooks_books_id, ubicación, id)` y `(user_id, updated_at, id)`, y verificar planes de consulta con volúmenes representativos.
- [x] 2.3 Definir rollback no destructivo, política de borrado de cuenta y tratamiento de anotaciones cuando un libro se retira de la biblioteca o publicación.

## 3. API autenticada

- [x] 3.1 Implementar repositorio y DTOs que resuelvan URI pública a `ebooks_books_id`, obtengan `user_id` sólo de sesión y utilicen sentencias preparadas.
- [x] 3.2 Implementar creación idempotente y validación server-side de rango, versiones, paleta y límites.
- [x] 3.3 Implementar listado por libro con filtros y cursor estable, sin exponer anotaciones de otros usuarios.
- [x] 3.4 Implementar edición con control de concurrencia y eliminación idempotente filtradas por `id` y propietario.
- [x] 3.5 Aplicar autenticación, defensa de writes, rate limits, `private, no-store`, exclusión de service worker y logs sin texto personal.

## 4. Selección y autenticación contextual

- [x] 4.1 Integrar selección de texto normalizado intra e interfragmento con los gestos del reader, impidiendo avances accidentales.
- [x] 4.2 Crear las acciones accesibles `Destacar` y `Añadir nota` y validar límites antes de enviar.
- [x] 4.3 Implementar la invitación para visitantes con registro, login y cancelación, sin writes anónimos.
- [x] 4.4 Preservar selección, ubicación, intención y borrador efímero durante el login; revalidar y pedir confirmación al regresar.

## 5. Anclaje y representación

- [x] 5.1 Implementar serialización versionada de coordenadas, texto exacto y contexto sobre texto visible normalizado.
- [x] 5.2 Implementar resolución degradada: coordenadas validadas, coincidencia textual/contextual y estado no localizado.
- [x] 5.3 Representar rangos simples, interfragmento y superpuestos en paginado/scroll y repintarlos tras cambios de layout o preferencias.
- [x] 5.4 Implementar editor de comentario/color y conversión entre destacado y nota sin recrear la anotación.

## 6. Cuaderno por libro

- [x] 6.1 Implementar `Mis anotaciones` con orden de lectura, extracto, comentario, color y estados vacío, carga y error.
- [x] 6.2 Implementar filtros `Todas`, `Destacados` y `Notas` y carga incremental por cursor.
- [x] 6.3 Implementar retorno al pasaje con carga de ventana, resolución del ancla, foco/anuncio accesible y tratamiento de anclas no localizadas.

## 7. Verificación y entrega gradual

- [ ] 7.1 Probar propiedad cruzada, sesión ausente, CSRF/Origin, IDs manipulados, XSS en notas, límites, no-store y ausencia de texto personal en logs/compartir.
- [ ] 7.2 Probar idempotencia, reintentos, concurrencia entre dispositivos, paginación por cursor y planes SQL con millones de filas simuladas.
- [ ] 7.3 Probar offsets y recuperación con Unicode, entidades, espacios, elementos inline, rangos interfragmento y regeneraciones simuladas.
- [ ] 7.4 Probar selección, teclado, lector de pantalla, foco, temas, paginado, scroll y cambios de viewport/preferencias sobre una muestra real de libros.
- [ ] 7.5 Activar detrás de una bandera, medir errores de anclaje, latencia, almacenamiento y conversión registro→anotación confirmada, y documentar rollback.
- [ ] 7.6 Resolver la inestabilidad confirmada de las asas nativas en Android paginado: comparar mitigación de eventos, cambio temporal a continuo, columnas con `scrollLeft`/`scroll-snap` (recomendado) y páginas DOM independientes; validar la alternativa elegida en Chrome y Brave sin implementar selección propia.
  - [x] Implementar como experimento el cambio temporal a continuo sin persistir la preferencia y con restauración automática del paginado.
  - [ ] Validar en dispositivos Android reales con Chrome y Brave: selección de una y varias líneas, extensión hacia abajo, límites de columna y cambios de orientación/preferencias.
