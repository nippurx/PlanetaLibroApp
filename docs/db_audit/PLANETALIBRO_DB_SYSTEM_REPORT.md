# PlanetaLibro DB System Report

## Alcance

Este informe integra exclusivamente la documentacion de Fases 1 y 2:

- catalogo estructural: `docs/db_audit/10_DB_CATALOG.md:1-1854`
- indice de queries: `docs/db_audit/20_QUERIES_INDEX.md:1-19`
- uso por tabla: `docs/db_audit/21_TABLE_USAGE.md:1-437`
- mapa por feature: `docs/db_audit/22_FEATURES_MAP.md:1-248`
- mapa archivo -> tablas: `docs/db_audit/23_FILE_TO_TABLE_MAP.md:1-140`
- conexiones/helpers: `docs/db_audit/02_DB_CONNECTION.md:3-260`

No se releyo codigo ni el dump fuera de esa documentacion.

## Resumen ejecutivo

- Base estructural relevada: **56 tablas** (`docs/db_audit/10_DB_CATALOG.md:1851`)
- Tablas sin PK: **6** (`docs/db_audit/10_DB_CATALOG.md:1852`)
- Tablas con FKs explicitas: **2** (`docs/db_audit/10_DB_CATALOG.md:1854`)
- Queries indexadas en el codebase: **1368** (`docs/db_audit/20_QUERIES_INDEX.md:3`)
- Stack principal operativo: `mysqli` + helpers `mp_db_connect()`, `mpdb_query()`, `mpdb_get_value()` (`docs/db_audit/02_DB_CONNECTION.md:19-76`)
- Stack secundario visible: `PDO` para auth y algunas APIs/subapps (`docs/db_audit/02_DB_CONNECTION.md:87-145`)

## Nucleos reales del sistema

### Identidad y acceso

El nucleo de identidad gira alrededor de `user_table`, con flujos de login, registro, recuperacion y sesion persistente (`docs/db_audit/22_FEATURES_MAP.md:9-45`). En uso real, `user_table` es una de las tablas mas cargadas del sistema y concentra autentificacion, perfil basico y gating premium (`docs/db_audit/21_TABLE_USAGE.md:381-388`).

### Catalogo editorial

`ebooks_books` es el hub principal del dominio. Se vincula en uso real con autores, tags, videos, lectura, descargas, pedidos y biblioteca (`docs/db_audit/21_TABLE_USAGE.md:85-92`, `docs/db_audit/22_FEATURES_MAP.md:64-81`). El catalogo se ordena y filtra por `views`, `views_last`, idioma, `read_online`, `descargar`, `dompub` y `video_audiolibro` (`docs/db_audit/22_FEATURES_MAP.md:66-80`).

### Actividad del usuario

La actividad principal del usuario se reparte entre:

- `user_books` para biblioteca y progreso de lectura (`docs/db_audit/21_TABLE_USAGE.md:349-356`)
- `user_books_log` para eventos/paginas leidas (`docs/db_audit/21_TABLE_USAGE.md:357-364`)
- `user_video_audiolibros` para audiolibros y progreso temporal (`docs/db_audit/21_TABLE_USAGE.md:405-412`)

Ese bloque soporta lectura online, biblioteca, audiolibros y parte del gating de contenido (`docs/db_audit/22_FEATURES_MAP.md:83-124`, `docs/db_audit/22_FEATURES_MAP.md:165-183`).

### Operacion y growth

Hay tres subsistemas operativos claros:

- `mailing` + `mailing_users` para campanas y cola de envios (`docs/db_audit/21_TABLE_USAGE.md:221-236`, `docs/db_audit/22_FEATURES_MAP.md:223-243`)
- `ab_events` para AB testing (`docs/db_audit/21_TABLE_USAGE.md:5-11`, `docs/db_audit/22_FEATURES_MAP.md:223-243`)
- `failed_searches` para telemetria de busquedas sin resultado (`docs/db_audit/21_TABLE_USAGE.md:189-196`, `docs/db_audit/22_FEATURES_MAP.md:204-221`)

## Modulos con mayor centralidad

Por mapa archivo -> tablas, los nodos de codigo mas centrales son:

- `user_funcs.php` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:5-10`)
- `libro_funcs.php` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:26-31`)
- `mp_mailing.php` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:68-73`)
- `c_libro.php` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:82-87`)
- `backend/addreviews_main.php` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:145-150`)
- `buscar.php` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:565-569`)

Interpretacion tecnica: la logica de negocio no esta concentrada en un ORM ni en un solo servicio, sino distribuida en helpers PHP grandes y entrypoints que ejecutan SQL directamente.

## Subsistemas funcionales consolidados

### Auth / sesion

- tablas: `user_table`
- consultas criticas: `Q1028`, `Q1029`, `Q1033`, `Q1034`, `Q1035`, `Q1036` (`docs/db_audit/20_QUERIES_INDEX.md:16437-16576`)
- feature docs: `docs/db_audit/22_FEATURES_MAP.md:9-45`

### Catalogo / busqueda

- tablas: `ebooks_books`, `ebooks_authors`, `books_tags`, `tags`, `failed_searches`
- features: catalogo y busqueda (`docs/db_audit/22_FEATURES_MAP.md:64-81`, `docs/db_audit/22_FEATURES_MAP.md:204-221`)
- uso intenso de `ebooks_books` (`docs/db_audit/21_TABLE_USAGE.md:85-92`)

### Lectura / biblioteca

- tablas: `user_books`, `user_books_log`, `libros_pedidos`
- features: lectura online y biblioteca (`docs/db_audit/22_FEATURES_MAP.md:83-124`)
- consultas criticas: `Q0956`, `Q0957`, `Q1195` (`docs/db_audit/20_QUERIES_INDEX.md:15285-15312`, `docs/db_audit/20_QUERIES_INDEX.md:19109-19120`)

### Audiolibros / video review

- tablas: `user_video_audiolibros`, `videos_book`, `videos_sugeridos`, `ebooks_books`
- features: audiolibros y reseñas en video (`docs/db_audit/22_FEATURES_MAP.md:165-202`)

### Operacion / growth

- tablas: `mailing`, `mailing_users`, `ab_events`
- features: admin, AB testing, mailing (`docs/db_audit/22_FEATURES_MAP.md:223-243`)
- consultas criticas: `Q1047` a `Q1069` (`docs/db_audit/20_QUERIES_INDEX.md:16741-17104`)

## Limites del sistema relevado

### Core PlanetaLibro

El core funcional nuevo para mantenimiento/API deberia centrarse en:

- `user_table`
- `ebooks_books`
- `ebooks_authors`
- `user_books`
- `user_books_log`
- `user_video_audiolibros`
- `books_tags`
- `tags`
- `libros_pedidos`
- `mailing`
- `mailing_users`
- `failed_searches`
- `ab_events`
- `videos_book`
- `videos_sugeridos`

Sustento: estas tablas aparecen tanto en feature map como en uso real (`docs/db_audit/21_TABLE_USAGE.md:5-429`, `docs/db_audit/22_FEATURES_MAP.md:9-243`).

### Subsistemas laterales

Hay dos bloques acoplados pero no prioritarios para una API del core:

- `blog/` con tablas `categories`, `comments`, `users` y muchas queries propias (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:19-24`, `docs/db_audit/21_TABLE_USAGE.md:37-59`)
- `userbase/` con tablas y conexiones parcialmente no confirmadas (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:12-17`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:61-66`)

## Que habilita este informe

### Para mantenimiento

Permite identificar rapidamente:

- tablas centrales del negocio
- helpers PHP con mayor densidad de SQL
- features con writes directos sobre el modelo

### Para refactor

La estrategia mas segura es cortar por bounded contexts:

1. identidad y sesion
2. catalogo y busqueda
3. lectura y biblioteca
4. growth y admin

### Para una API nueva

El mejor punto de entrada no es "tabla por tabla", sino "feature por feature", usando como recursos base:

- `/auth`
- `/users/me`
- `/books`
- `/books/{id|uri}`
- `/books/{id}/reading`
- `/library`
- `/audiobooks`
- `/search`
- `/mailing`

La priorizacion detallada queda en `docs/db_audit/32_API_READINESS_MAP.md`.
