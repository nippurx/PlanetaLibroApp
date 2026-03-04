# PlanetaLibro API v1

API read-only y aislada para la app nueva en `/app`, construida sin depender de helpers legacy y sin modificar el sitio existente fuera de `api/v1`.

## Endpoints

- `GET /api/v1/public/health`
- `GET /api/v1/public/libro/{uri}`
- `GET /api/v1/public/autor/{uri}`
- `GET /api/v1/public/buscar?q=...&limit=20&offset=0`
- `GET /api/v1/public/libros?limit=20&offset=0`

## Notas de path

Sin tocar el `.htaccess` raiz ni la configuracion del hosting, el path efectivo garantizado es con `/public`:

- `https://planetalibro.net/api/v1/public/health`

Si el hosting permite apuntar el document root de esta API a `api/v1/public`, o si luego se agrega una regla externa especifica, se puede usar:

- `https://planetalibro.net/api/v1/health`

Para ese caso, ajustar `PL_API_BASE_PATH=/api/v1` o editar `config/config.php`.

## Ejemplos curl

```bash
curl https://planetalibro.net/api/v1/public/health
curl "https://planetalibro.net/api/v1/public/libro/don-quijote-de-la-mancha"
curl "https://planetalibro.net/api/v1/public/autor/miguel-de-cervantes?limit=10&offset=0"
curl "https://planetalibro.net/api/v1/public/buscar?q=cervantes&limit=20&offset=0"
curl "https://planetalibro.net/api/v1/public/libros?limit=20&offset=0"
```

## Decisiones

- `uri-first`: los endpoints publicos usan `uri`, no `ebooks_books_id` ni `ebooks_authors_id`.
- `read-only`: no hay writes ni dependencia de helpers legacy como `dbconf.php`, `mp_dbfuncs.php` o similares.
- `PDO + prepared statements`: todas las consultas usan `prepare` y `bindValue`.
- `JSON consistente`:
  - `200`: `{"data": ...}`
  - `400`: `{"error":{"code":"bad_request","message":"..."}}`
  - `404`: `{"error":{"code":"not_found","message":"..."}}`
  - `500`: `{"error":{"code":"internal_error"}}`

## Tablas y campos reales usados

Verificados contra `docs/c2380538_main_stru.sql` y el reverse engineering en `docs/db_audit`.

### Libros

- Tabla: `ebooks_books`
- PK: `ebooks_books_id`
- URI publica: `uri`
- Titulo: `ebooks_books_title`
- Subtitulo: `ebooks_books_subtitle`
- Relacion a autor: `ebooks_books_author`
- Cover flag: `ebooks_books_cover`
- Cover link: `cover_link`
- Descripcion: `ebooks_books_txt_inf`
- Recursos:
  - `ebooks_books_file`
  - `ebooks_books_file_alternative`
  - `ebooks_books_file_audiobook`
  - `external_pdf`
  - `video_audiolibro`
  - `read_online`
  - `descargar`
  - `url_amazon`
  - `link_p2p`
  - `link_hotmart`
- Formatos:
  - `ebooks_format_pdf`
  - `ebooks_format_epub`
  - `ebooks_format_mobi`

### Autores

- Tabla: `ebooks_authors`
- PK: `ebooks_authors_id`
- URI publica: `uri`
- Nombre: `ebooks_authors_name`
- Apellido: `ebooks_authors_surname`
- Bio: `ebooks_authors_htm_bio`

## Relacion libro -> autor

Relacion directa real:

- `ebooks_books.ebooks_books_author = ebooks_authors.ebooks_authors_id`

No fue necesaria una tabla puente para estos endpoints base.

## Configuracion

Archivo: `api/v1/config/config.php`

Variables soportadas:

- `PL_API_BASE_PATH`
- `PL_API_CORS_ALLOW_ORIGIN`
- `PL_DB_HOST`
- `PL_DB_NAME`
- `PL_DB_USER`
- `PL_DB_PASS`

## Logging

Los errores no muestran stacktrace en la respuesta. Si `storage/logs` existe, los errores se escriben en:

- `api/v1/storage/logs/api.log`

## Asset URLs (legacy-compatible)

La API v1 ahora devuelve rutas host-relative para tapas y archivos calculadas con la misma convencion del legacy.

Referencia legacy tomada (sin modificar archivos legacy):

- `uri.php` -> `mp_std_file_url($uri, $raiz='libros')`
- `pl_funcs.php` -> `libro_get_cover_path($libro, $local=0)`

Convencion resultante para libros en `sys_repositorio='biblioteca'`:

- `/{repositorio}/{letra1}/{letra2}/{autor_base}/{book_uri}/`
- tapa por defecto: `{book_uri}.webp`
- fallback de extension: `.webp`, `.jpg`, `.png` (si existe archivo local)

Ejemplo:

- libro URI: `josh-kaufman-mba-personal`
- `cover_url`: `/biblioteca/j/o/josh/josh-kaufman-mba-personal/josh-kaufman-mba-personal.webp`
- `book_dir_path`: `/biblioteca/j/o/josh/josh-kaufman-mba-personal/`

Campos nuevos agregados sin romper los existentes:

- `GET /libro/{uri}`:
  - `cover_path`, `cover_url`, `book_dir_path`, `cover_candidates`
  - `author_uri` (top-level)
  - en `recursos`: `archivo_path`, `archivo_alternativo_path`, `archivo_audiolibro_path`
- `GET /libros`, `GET /buscar` (cada item):
  - `cover_url`, `author_uri`
- `GET /autor/{uri}` (cada libro listado):
  - `cover_url`, `author_uri`