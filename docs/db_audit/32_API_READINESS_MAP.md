# API Readiness Map

## Base usada

- catalogo estructural: `docs/db_audit/10_DB_CATALOG.md:1-1854`
- uso real: `docs/db_audit/21_TABLE_USAGE.md:5-429`
- features: `docs/db_audit/22_FEATURES_MAP.md:9-243`
- conexiones/helpers: `docs/db_audit/02_DB_CONNECTION.md:3-260`

Escala de readiness:

- `Alta`: feature con tablas claras, queries reales consistentes y bajo acoplamiento lateral
- `Media`: feature clara pero con deudas de naming, mezcla de helpers o reglas dispersas
- `Baja`: feature con dependencias opacas, stack mixto o riesgo alto de refactor

## Auth / Session

- Readiness: `Media-Baja`
- Recursos sugeridos:
  - `POST /auth/login`
  - `POST /auth/register`
  - `POST /auth/logout`
  - `POST /auth/recover`
  - `GET /auth/session`
- Tablas base: `user_table`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:9-45`, `docs/db_audit/21_TABLE_USAGE.md:381-388`
- Bloqueadores:
  - mezcla de `PDO` y helper legacy (`docs/db_audit/02_DB_CONNECTION.md:87-145`)
  - flujo OAuth con disponibilidad de `$connection` no confirmada (`docs/db_audit/02_DB_CONNECTION.md:219-236`)
- Decision: exponer primero login/logout/session; dejar OAuth para segunda etapa.

## Users / Profile

- Readiness: `Media-Baja`
- Recursos sugeridos:
  - `GET /users/me`
  - `GET /users/{id}`
- Tablas base: `user_table`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:47-62`
- Bloqueadores:
  - perfil no esta separado del modelo de auth/premium/mailing
- Decision: exponer solo lectura al inicio.

## Books / Catalog

- Readiness: `Alta`
- Recursos sugeridos:
  - `GET /books`
  - `GET /books/{bookId}`
  - `GET /books/by-uri/{uri}`
  - `GET /authors/{authorId}/books`
- Tablas base: `ebooks_books`, `ebooks_authors`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:64-81`, `docs/db_audit/21_TABLE_USAGE.md:69-92`
- Fortalezas:
  - modelo de consulta muy usado
  - criterios de orden y filtros bien visibles en queries reales
- Bloqueadores:
  - joins inferidos, no formalizados por FK
- Decision: buen candidato para primera API publica de lectura.

## Search

- Readiness: `Alta`
- Recursos sugeridos:
  - `GET /search?q=`
  - `GET /search/suggestions?q=`
  - `GET /search/failed`
- Tablas base: `ebooks_books`, `ebooks_authors`, `failed_searches`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:204-221`, `docs/db_audit/21_TABLE_USAGE.md:189-196`
- Fortalezas:
  - feature acotada
  - telemetria propia de fallos
- Decision: puede salir junto con catalogo.

## Reading Progress

- Readiness: `Media`
- Recursos sugeridos:
  - `GET /books/{bookId}/reading`
  - `PUT /books/{bookId}/reading`
  - `POST /books/{bookId}/reading-events`
- Tablas base: `user_books`, `user_books_log`, `ebooks_books`, `libros_pedidos`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:83-102`, `docs/db_audit/21_TABLE_USAGE.md:205-220`, `docs/db_audit/21_TABLE_USAGE.md:349-364`
- Bloqueadores:
  - usa `book_id`, `ebooks_books_id` y `uri` segun flujo
  - parte del flujo dispara `libros_pedidos`
- Decision: viable si se define un identificador canonico de libro.

## Library

- Readiness: `Media`
- Recursos sugeridos:
  - `GET /library`
  - `POST /library/books/{bookId}`
  - `DELETE /library/books/{bookId}`
- Tablas base: `user_books`, `ebooks_books`, `libros_pedidos`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:104-124`, `docs/db_audit/21_TABLE_USAGE.md:349-356`
- Bloqueadores:
  - hay writes en helpers y endpoints dedicados
  - existe acoplamiento con pedidos de lectura no disponibles
- Decision: buena segunda ola despues de catalogo y auth basica.

## Audiobooks

- Readiness: `Media`
- Recursos sugeridos:
  - `GET /audiobooks`
  - `GET /audiobooks/{bookId}`
  - `PUT /audiobooks/{bookId}/progress`
  - `POST /library/audiobooks/{bookId}`
- Tablas base: `ebooks_books`, `user_video_audiolibros`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:165-183`, `docs/db_audit/21_TABLE_USAGE.md:405-412`
- Bloqueadores:
  - depende de `video_audiolibro` en `ebooks_books`
  - hay estado mixto `sin-audiolibro` embebido en datos
- Decision: exponer luego de normalizar estados de disponibilidad.

## Video Reviews

- Readiness: `Media`
- Recursos sugeridos:
  - `GET /books/{bookId}/reviews/videos`
  - `POST /books/{bookId}/reviews/videos/suggestions`
  - `POST /admin/books/{bookId}/reviews/videos/select`
- Tablas base: `videos_book`, `videos_sugeridos`, `ebooks_books`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:185-202`, `docs/db_audit/21_TABLE_USAGE.md:421-436`
- Bloqueadores:
  - relaciones por `uri` y no por FK numerica
  - parte del flujo es editorial/backend
- Decision: separar API publica de sugerencias y API interna editorial.

## Premium / Adult Gating

- Readiness: `Baja`
- Recursos sugeridos:
  - `GET /entitlements/me`
  - `GET /books/{bookId}/access`
- Tablas base: `user_table`, `books_tags`, `tags`, `ebooks_books`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:146-163`
- Bloqueadores:
  - no hay tabla de suscripcion clara en el core documentado
  - el gating depende de sesion y tags, no de un modelo explicito de entitlement
- Decision: no exponer como API completa hasta modelar suscripciones.

## Mailing / Growth

- Readiness: `Media`
- Recursos sugeridos:
  - `GET /admin/mailing/campaigns`
  - `POST /admin/mailing/campaigns`
  - `POST /admin/mailing/campaigns/{id}/users`
  - `POST /admin/mailing/campaigns/{id}/send-next`
- Tablas base: `mailing`, `mailing_users`, `user_table`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:223-243`, `docs/db_audit/21_TABLE_USAGE.md:221-236`
- Fortalezas:
  - modelo funcional bastante claro
  - cola y estado documentados
- Bloqueadores:
  - relacion con usuarios por `email`
- Decision: buen candidato para API interna, no publica.

## AB Testing / Analytics

- Readiness: `Media-Alta`
- Recursos sugeridos:
  - `POST /events/ab/impression`
  - `POST /events/ab/click`
  - `GET /admin/ab/experiments`
- Tablas base: `ab_events`
- Evidencia: `docs/db_audit/22_FEATURES_MAP.md:223-243`, `docs/db_audit/21_TABLE_USAGE.md:5-11`
- Fortalezas:
  - modelo simple
  - entidad aislada
- Decision: buena candidata para servicio pequeño separado.

## Recomendacion de roadmap

### Ola 1

1. `GET /books`
2. `GET /books/{id|uri}`
3. `GET /search`
4. `POST /auth/login`
5. `POST /auth/logout`
6. `GET /auth/session`

### Ola 2

1. `GET /library`
2. `POST /library/books/{bookId}`
3. `PUT /books/{bookId}/reading`
4. `POST /books/{bookId}/reading-events`
5. `GET /audiobooks/{bookId}`

### Ola 3

1. `POST /books/{bookId}/reviews/videos/suggestions`
2. `GET /admin/mailing/campaigns`
3. `POST /events/ab/impression`
4. `POST /events/ab/click`

## Requisitos previos minimos

Antes de construir la API conviene definir:

1. identificadores canonicos para usuario, libro, autor y tag
2. convencion unica de acceso a datos para el core
3. capa de validacion para relaciones hoy inferidas
4. separacion explicita entre core, `blog/` y `userbase/`

## Conclusion

La API nueva es viable si toma como base el **modelo funcional real** y no el esquema legacy "tal cual". El mejor punto de partida es `books + search + auth/session`, seguido por `library + reading`.
