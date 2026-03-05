# Modelo Logico - Fase 3

## Base del modelo

Este modelo se arma con estructura + uso real:

- estructura de tablas: `docs/db_audit/10_DB_CATALOG.md:1-1854`
- uso real por tabla: `docs/db_audit/21_TABLE_USAGE.md:5-429`
- features consolidadas: `docs/db_audit/22_FEATURES_MAP.md:9-243`

Hechos estructurales relevantes:

- el catalogo tiene **56 tablas** (`docs/db_audit/10_DB_CATALOG.md:1851`)
- solo **2 tablas** tienen FKs explicitas (`docs/db_audit/10_DB_CATALOG.md:1854`)

Consecuencia: casi todas las relaciones del modelo funcional son **INFERIDAS POR USO REAL**, no por constraints de MySQL.

## Entidades principales

### Usuario

- tabla base: `user_table` (`docs/db_audit/10_DB_CATALOG.md:1479-1650`)
- uso real: auth, sesion, premium, mailing, perfil (`docs/db_audit/21_TABLE_USAGE.md:381-388`, `docs/db_audit/22_FEATURES_MAP.md:9-62`)

### Libro

- tabla base: `ebooks_books` (`docs/db_audit/10_DB_CATALOG.md:322-651`)
- uso real: catalogo, busqueda, lectura, descargas, videos, trivia (`docs/db_audit/21_TABLE_USAGE.md:85-92`, `docs/db_audit/22_FEATURES_MAP.md:64-221`)

### Autor

- tabla base funcional: `ebooks_authors` (`docs/db_audit/21_TABLE_USAGE.md:69-75`)
- rol logico: entidad asociada al libro en catalogo y busqueda (`docs/db_audit/22_FEATURES_MAP.md:64-81`, `docs/db_audit/22_FEATURES_MAP.md:204-221`)

### Biblioteca y progreso

- `user_books` (`docs/db_audit/10_DB_CATALOG.md:1353-1387`, `docs/db_audit/21_TABLE_USAGE.md:349-356`)
- `user_books_log` (`docs/db_audit/10_DB_CATALOG.md:1388-1478`, `docs/db_audit/21_TABLE_USAGE.md:357-364`)
- `user_video_audiolibros` (`docs/db_audit/10_DB_CATALOG.md:1651-1712`, `docs/db_audit/21_TABLE_USAGE.md:405-412`)

### Clasificacion

- `tags`
- `books_tags` (`docs/db_audit/10_DB_CATALOG.md:93-118`, `docs/db_audit/21_TABLE_USAGE.md:29-35`)

### Operacion

- `mailing` (`docs/db_audit/10_DB_CATALOG.md:865-895`, `docs/db_audit/21_TABLE_USAGE.md:221-228`)
- `mailing_users` (`docs/db_audit/10_DB_CATALOG.md:896-930`, `docs/db_audit/21_TABLE_USAGE.md:229-236`)
- `ab_events` (`docs/db_audit/10_DB_CATALOG.md:7-39`, `docs/db_audit/21_TABLE_USAGE.md:5-11`)
- `failed_searches` (`docs/db_audit/10_DB_CATALOG.md:754-808`, `docs/db_audit/21_TABLE_USAGE.md:189-196`)

## Relaciones logicas consolidadas

### `ebooks_books` -> `ebooks_authors`

- estado: **INFERIDO**
- clave observada: `ebooks_books.ebooks_books_author` -> `ebooks_authors.ebooks_authors_id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:69-92`, `docs/db_audit/22_FEATURES_MAP.md:64-81`
- cardinalidad logica: un autor -> muchos libros

### `user_books` -> `user_table`

- estado: **INFERIDO**
- clave observada: `user_books.user_id` -> `user_table.userid`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:349-388`, `docs/db_audit/22_FEATURES_MAP.md:83-124`
- cardinalidad logica: un usuario -> muchos libros en biblioteca

### `user_books` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `user_books.ebooks_books_id` -> `ebooks_books.ebooks_books_id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:85-92`, `docs/db_audit/21_TABLE_USAGE.md:349-356`
- cardinalidad logica: muchos registros de usuario/libro -> un libro

### `user_books_log` -> `user_table`

- estado: **INFERIDO**
- clave observada: `user_books_log.user_id` -> `user_table.userid`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:357-388`, `docs/db_audit/22_FEATURES_MAP.md:83-102`

### `user_books_log` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `user_books_log.book_id` -> `ebooks_books.ebooks_books_id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:85-92`, `docs/db_audit/21_TABLE_USAGE.md:357-364`

### `user_video_audiolibros` -> `user_table`

- estado: **INFERIDO**
- clave observada: `user_video_audiolibros.user_id` -> `user_table.userid`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:381-412`, `docs/db_audit/22_FEATURES_MAP.md:165-183`

### `user_video_audiolibros` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `user_video_audiolibros.ebooks_books_id` -> `ebooks_books.ebooks_books_id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:85-92`, `docs/db_audit/21_TABLE_USAGE.md:405-412`

### `books_tags` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `books_tags.book_id` -> `ebooks_books.ebooks_books_id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:29-35`, `docs/db_audit/22_FEATURES_MAP.md:64-81`

### `books_tags` -> `tags`

- estado: **INFERIDO**
- clave observada: `books_tags.tag_id` -> `tags.id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:29-35`

### `ebooks_trivia_questions` -> `ebooks_books`

- estado: **INFERIDO**
- claves observadas: `ebooks_trivia_questions.ebooks_books_id` y/o `book_id` -> `ebooks_books.ebooks_books_id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:165-172`, `docs/db_audit/22_FEATURES_MAP.md:64-81`

### `libros_pedidos` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `libros_pedidos.libro` <-> `ebooks_books.uri`
- evidencia: join real en `Q0007` (`docs/db_audit/20_QUERIES_INDEX.md:101-115`) y uso por feature (`docs/db_audit/22_FEATURES_MAP.md:83-102`)

### `mailing_users` -> `mailing`

- estado: **INFERIDO**
- clave observada: `mailing_users.mailing_id` -> `mailing.id`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:221-236`, `docs/db_audit/22_FEATURES_MAP.md:223-243`
- cardinalidad logica: una campaña -> muchos destinatarios

### `mailing_users` -> `user_table`

- estado: **INFERIDO**
- clave observada: `mailing_users.email` <-> `user_table.email`
- evidencia: carga global desde `user_table` en feature map (`docs/db_audit/22_FEATURES_MAP.md:223-243`)

### `videos_book` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `videos_book.libro_uri` -> `ebooks_books.uri`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:421-428`, `docs/db_audit/22_FEATURES_MAP.md:185-202`

### `videos_sugeridos` -> `ebooks_books`

- estado: **INFERIDO**
- clave observada: `videos_sugeridos.uri` -> `ebooks_books.uri`
- evidencia: `docs/db_audit/21_TABLE_USAGE.md:429-436`, `docs/db_audit/22_FEATURES_MAP.md:185-202`

## Diagrama textual resumido

```text
user_table
  -> user_books
      -> ebooks_books
  -> user_books_log
      -> ebooks_books
  -> user_video_audiolibros
      -> ebooks_books

ebooks_books
  -> ebooks_authors
  <-> books_tags <-> tags
  -> ebooks_trivia_questions
  -> libros_pedidos (por uri/libro)
  -> videos_book (por uri/libro_uri)
  -> videos_sugeridos (por uri)

mailing
  -> mailing_users
  -> user_table (por email, INFERIDO)

ab_events
  entidad operativa independiente

failed_searches
  entidad operativa independiente
```

## Entidades aisladas o de menor prioridad para el core

- `favorites`: sin uso detectado (`docs/db_audit/21_TABLE_USAGE.md:197-204`)
- tablas del bloque `blog/`: fuera del core principal de PlanetaLibro (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:19-24`, `docs/db_audit/21_TABLE_USAGE.md:37-59`)
- tablas del bloque `userbase/`: acopladas a un subsistema paralelo (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:12-17`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:61-66`)

## Implicancia para diseño futuro

Para una nueva API conviene modelar primero estos agregados:

1. `User`
2. `Book`
3. `Author`
4. `LibraryItem`
5. `ReadingProgress`
6. `AudiobookProgress`
7. `Tag`
8. `MailingCampaign`
9. `VideoReview`

Porque son los que ya tienen soporte simultaneo en estructura, queries reales y features documentadas.
