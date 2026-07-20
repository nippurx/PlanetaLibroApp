# PlanetaLibro API v1

API aislada para la app nueva en `/app`. Los endpoints de catálogo son read-only. Las escrituras explícitas son progreso de lectura, compatibilidad del reader y anotaciones privadas autenticadas; no ejecutan helpers legacy.

## Endpoints

- `GET /api/v1/public/health`
- `GET /api/v1/public/libro/{uri}`
- `GET /api/v1/public/autor/{uri}`
- `GET /api/v1/public/buscar?q=...&limit=20&offset=0`
- `GET /api/v1/public/libros?limit=20&offset=0`
- `GET /api/v1/public/libros/por-tag?tag=crecimiento-personal&limit=20&offset=0`
- `GET /api/v1/public/libros/top?limit=10&lang=es`
- `GET /api/v1/public/reader-manifest/{uri}`
- `GET /api/v1/public/session`
- `GET /api/v1/public/library`
- `GET /api/v1/public/reader-progress/{uri}`
- `POST /api/v1/public/reader-progress/{uri}`
- `GET /api/v1/public/books/{uri}/annotations`
- `POST /api/v1/public/books/{uri}/annotations`
- `PATCH /api/v1/public/annotations/{id}`
- `DELETE /api/v1/public/annotations/{id}`

## Biblioteca y progreso del reader

`POST /reader-progress/{uri}` requiere sesión, mismo origen y `X-CSRF-Token`. Recibe `{ "page": N }` y registra la lectura de forma transaccional. Si el usuario todavía no tiene el libro, crea su fila en `user_books`; si ya existe, actualiza `current_page`, `last_read` y `leidas`. La respuesta incluye `created`, `updated` y `current_page`. Un URI que no corresponde a `ebooks_books` devuelve `404 book_not_found`.

El usuario se obtiene exclusivamente de la sesión. La operación bloquea la fila del libro mientras comprueba e inserta la pertenencia, evitando altas duplicadas causadas por aperturas concurrentes desde la API. El fallo remoto no bloquea el reader ni reemplaza el progreso local.

## Anotaciones privadas de lectura

Los endpoints de anotaciones requieren una sesión válida. `user_id` se obtiene exclusivamente en servidor y nunca se acepta como identidad desde el cliente.

- `GET /books/{uri}/annotations`: filtros `all`, `highlights` y `notes`, límite `1..100` y cursor opaco.
- `POST /books/{uri}/annotations`: creación idempotente mediante `client_request_id` UUID.
- `PATCH /annotations/{id}`: modifica nota/color usando `revision` para concurrencia optimista.
- `DELETE /annotations/{id}`: eliminación idempotente acotada al propietario.

POST, PATCH y DELETE requieren `X-CSRF-Token`, entregado por `GET /session` al usuario autenticado, mismo origen y límite de frecuencia por sesión. Todas las respuestas usan `Cache-Control: private, no-store`; los logs no deben incluir pasajes, contexto ni notas.

La API resuelve la URI pública a `ebooks_books_id`, valida el rango contra el manifest real y rechaza un `content_version` desactualizado. El contrato y el DDL están documentados en `openspec/changes/reading-annotations` y `docs/db_audit/40_SCHEMA_ADDITIONS.md`.

Errores específicos:

- `401 unauthenticated`
- `403 forbidden`
- `404 book_not_found` o `annotation_not_found`
- `409 stale_annotation_anchor` o `annotation_conflict`
- `429 rate_limited`

## Endpoint de compatibilidad del reader

`GET /api/v1/public/reader-manifest/{uri}` se usa únicamente cuando la solicitud estática a `/lector/.../manifest.json` devuelve 404.

Flujo:

1. valida la URI y consulta su `ebooks_books_id`;
2. deriva la carpeta bajo la raíz `/lector` sin aceptar paths del cliente;
3. si otro proceso ya creó un manifest v2 válido, lo devuelve;
4. parsea sólo las asignaciones admitidas de `libroinfo.php`, sin `include` ni `eval`;
5. valida `npaginas`, `paginicio`, índice y la existencia contigua de todos los `pag-N.html`;
6. hace `UPSERT` en `ebook_regeneration_queue` con razón `legacy_compatibility_manifest` y destino `epub2html2`;
7. escribe un temporal, lo valida y publica mediante rename atómico;
8. devuelve `{"data": manifest}` en esa misma respuesta.

No sobrescribe manifests existentes. El lock por libro vive en el directorio temporal del sistema y el único archivo persistente nuevo dentro del libro es `manifest.json`.

Errores relevantes:

- `400 invalid_book_uri`
- `404 book_not_found`, `legacy_book_not_found` o `legacy_metadata_missing`
- `422 legacy_metadata_invalid`, `legacy_index_invalid`, `legacy_fragment_missing` o `manifest_invalid`
- `500 manifest_lock_failed`, `manifest_write_failed`, `manifest_publish_failed` o `manifest_generation_failed`

La respuesta dinámica usa `Cache-Control: no-store`; las aperturas siguientes consumen directamente el manifest estático creado.

Validación de producción 2026-07-14: `homero-odisea-res` materializó correctamente un manifest de 120 páginas, 13 entradas de índice y dos assets. Se registró una única fila `pending` para `ebooks_books_id=75567` y `epub2html2`; la segunda apertura consumió el archivo estático y el libro se leyó correctamente.

Validación adicional 2026-07-15: `joseph-nguyen-no-te-creas-todo-lo-que-piensas` materializó 17 páginas y 10 entradas (`ebooks_books_id=75330`), mientras `homero-la-iliada` materializó 743 páginas y 32 entradas (`ebooks_books_id=68`). Ambos registraron una sola fila `pending`, se leyeron correctamente y en la segunda apertura utilizaron el manifest estático sin volver a invocar la API.

## Notas de path

Sin tocar el `.htaccess` raiz ni la configuracion del hosting, el path efectivo garantizado es con `/public`:

- `https://planetalibro.com/api/v1/public/health`

Si el hosting permite apuntar el document root de esta API a `api/v1/public`, o si luego se agrega una regla externa especifica, se puede usar:

- `https://planetalibro.com/api/v1/health`

Para ese caso, ajustar `PL_API_BASE_PATH=/api/v1` o editar `config/config.php`.

## Ejemplos curl

```bash
curl https://planetalibro.com/api/v1/public/health
curl "https://planetalibro.com/api/v1/public/libro/don-quijote-de-la-mancha"
curl "https://planetalibro.com/api/v1/public/autor/miguel-de-cervantes?limit=10&offset=0"
curl "https://planetalibro.com/api/v1/public/buscar?q=cervantes&limit=20&offset=0"
curl "https://planetalibro.com/api/v1/public/libros?limit=20&offset=0"
curl "https://planetalibro.com/api/v1/public/libros/por-tag?tag=crecimiento-personal&limit=10&offset=0"
curl "https://planetalibro.com/api/v1/public/libros/top?limit=10&lang=es"
```

## Endpoint publico: libros por tag

- Ruta: `GET /api/v1/public/libros/por-tag`
- Query params:
  - `tag` requerido. Usa la URI publica del tag, por ejemplo `crecimiento-personal`.
  - `limit` opcional. Entero entre `1` y `100`. Default `20`.
  - `offset` opcional. Entero entre `0` y `100000`. Default `0`.
  - `lang` opcional. Codigo ISO de 2 letras, por ejemplo `es`.
- Contrato externo:
  - el cliente solo envia `tag`
  - la API no expone `tag_id` ni detalles internos de tablas puente
  - si no existe el tag o no tiene libros, responde `items: []`

Ejemplo:

```bash
curl "https://planetalibro.com/api/v1/public/libros/por-tag?tag=crecimiento-personal&limit=10&offset=0"
```

Respuesta ejemplo:

```json
{
  "data": {
    "items": [
      {
        "id": 123,
        "uri": "josh-kaufman-mba-personal",
        "author_uri": "josh-kaufman",
        "cover_url": "/biblioteca/j/o/josh/josh-kaufman-mba-personal/josh-kaufman-mba-personal.webp",
        "titulo": "MBA Personal",
        "subtitulo": "",
        "autor": {
          "uri": "josh-kaufman",
          "nombre": "Josh Kaufman",
          "photo": {
            "available": true,
            "url": "https://planetalibro.com/img/authors/josh-kaufman.jpg"
          }
        },
        "cover": {
          "available": true,
          "link": null
        },
        "recursos": {
          "read_online": true,
          "video_audiolibro": null
        },
        "formatos": {
          "pdf": true,
          "epub": true,
          "mobi": false
        }
      }
    ],
    "pagination": {
      "limit": 10,
      "offset": 0
    },
    "filters": {
      "tag": "crecimiento-personal",
      "lang": null
    }
  }
}
```

## Endpoint publico: detalle de libro

- Ruta: `GET /api/v1/public/libro/{uri}`
- Campo nuevo:
  - `tags`: lista de objetos `{label, uri}` lista para renderizar links a `tema/{uri}` en la app.
- Fuente de datos:
  - se resuelve desde la estructura normalizada `books_tags` + `tags`
  - el label humano sale de `tags.nombre_es`
  - si el libro no tiene relaciones cargadas, la API devuelve `tags: []`

Fragmento de respuesta ejemplo:

```json
{
  "data": {
    "id": 123,
    "uri": "josh-kaufman-mba-personal",
    "titulo": "MBA Personal",
    "tags": [
      {
        "label": "Crecimiento Personal",
        "uri": "crecimiento-personal"
      },
      {
        "label": "Psicologia",
        "uri": "psicologia"
      }
    ]
  }
}
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
- `reader_root` en `config/config.php` (opcional). Si se omite, usa `$_SERVER['DOCUMENT_ROOT'] . '/lector'`.

El usuario de PHP necesita permisos mínimos para crear el temporal y renombrarlo a `manifest.json` dentro de carpetas legacy. La tabla `ebook_regeneration_queue` debe existir con la clave única por `ebooks_books_id` y `target_generator` documentada para este cambio.

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
  - `tags` con objetos `{label, uri}`
  - en `recursos`: `archivo_path`, `archivo_alternativo_path`, `archivo_audiolibro_path`
- `GET /libros`, `GET /buscar` (cada item):
  - `cover_url`, `author_uri`
- `GET /autor/{uri}` (cada libro listado):
  - `cover_url`, `author_uri`
## Author photo

Se agrega el campo `author.photo` (en payloads donde el autor viaja como objeto `author` o `autor`) usando convencion de archivos, sin cambios en base de datos.

Convencion:

- `author_uri`: por ejemplo `kafka-franz`
- URL publica: `https://planetalibro.com/img/authors/{author_uri}.jpg`
- Path filesystem (server): `$_SERVER['DOCUMENT_ROOT'] . "/img/authors/{author_uri}.jpg"`
- Validacion: `file_exists(...)`

Schema del campo:

```json
"photo": {
  "available": true,
  "url": "https://planetalibro.com/img/authors/kafka-franz.jpg"
}
```

Reglas de respuesta:

- Si existe el archivo `.jpg`: `photo.available=true` y `photo.url` con dominio exacto `https://planetalibro.com`.
- Si no existe: `photo.available=false` y `photo.url=null`.

Endpoints impactados:

- `GET /api/v1/public/autor/{uri}` en `data.author.photo`
- `GET /api/v1/public/libro/{uri}` en `data.autor.photo`
- `GET /api/v1/public/libros` en `data.items[].autor.photo`
- `GET /api/v1/public/buscar` en `data.items[].autor.photo`

Ejemplo de `GET /api/v1/public/autor/kafka-franz?limit=1&offset=0`:

```json
{
  "data": {
    "author": {
      "id": 123,
      "uri": "kafka-franz",
      "nombre": "Franz Kafka",
      "photo": {
        "available": true,
        "url": "https://planetalibro.com/img/authors/kafka-franz.jpg"
      }
    },
    "books": [
      {
        "id": 456,
        "uri": "kafka-franz-la-metamorfosis",
        "autor": {
          "uri": "kafka-franz",
          "nombre": "Franz Kafka",
          "photo": {
            "available": true,
            "url": "https://planetalibro.com/img/authors/kafka-franz.jpg"
          }
        }
      }
    ],
    "pagination": {
      "limit": 1,
      "offset": 0
    }
  }
}
```

Verificacion manual rapida:

- Caso con imagen: consultar `/api/v1/public/autor/kafka-franz` y validar `photo.available=true`.
- Caso sin imagen: consultar un `author_uri` inexistente en `/img/authors/` y validar `photo.available=false` y `photo.url=null`.

Nota de configuracion:

- En `api/v1/config/config.php` no existe hoy una constante para dominio base del sitio, por eso la URL de foto se arma con el dominio fijo requerido (`https://planetalibro.com`).
