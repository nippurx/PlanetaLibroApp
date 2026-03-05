# Mapa Inicial de Módulos / Carpetas

## `adm/`

- Rol probable: administración protegida por Basic Auth (`adm/.htaccess:1-5`)
- Archivos clave:
  - `adm/.htaccess`
  - `adm/adm_books_funcs.php`
  - `adm/adm_sitemaps_crear.php`
  - `adm/adm_stats.php`
  - `adm/adm_upload_epub.php`
  - `adm/author_set_dompub.php`
  - `adm/autor_uris.php`
- Dependencias/notas:
  - el acceso está restringido por `.htpasswd` (`adm/.htaccess:4`)

## `api/`

- Rol probable: endpoints HTTP simples del sitio (`api/v1/gptsearch.php:1-5`, `api/siguiente-libro.php:1-5`)
- Archivos clave:
  - `api/siguiente-libro.php`
  - `api/v1/gptsearch.php`
- Dependencias/notas:
  - `api/v1/gptsearch.php` depende de `../../mp_dbfuncs.php`, `../../dbconf.php`, `../../funciones.php`, `../../pl_funcs.php`, `../../libro_funcs.php` (`api/v1/gptsearch.php:14-18`)
  - `api/siguiente-libro.php` depende de `mp_dbfuncs.php`, `dbconf.php`, `funciones.php` (`api/siguiente-libro.php:3-5`)

## `assets/`

- Rol probable: assets frontend modernos (`assets/` contiene `css`, `img`, `js`, `sounds`, `vendor`)
- Archivos clave:
  - `assets/js/main.js`
  - `assets/css/style.css`
  - `assets/img/favicon.png`
  - `assets/img/apple-touch-icon.png`
  - `assets/sounds/tictac.mp3`
- Dependencias/notas:
  - no se documentó en profundidad en Fase 0
  - referencias directas desde PHP: **NO CONFIRMADO**

## `backend/`

- Rol probable: tareas operativas / backoffice de reseñas y videos
- Archivos clave:
  - `backend/addreviews.php`
  - `backend/addreviews_main.php`
  - `backend/bkend_html_header.php`
  - `backend/bkend_resenas_add.php`
  - `backend/bkend_videos_audiolibros_add.php`
  - `backend/bkend_videos_audiolibros_lst.php`
  - `backend/bkend_videos_book_listado.php`
  - `backend/f_libro_videos_insert.php`
- Dependencias/notas:
  - dependencia interna exacta con la raíz: **NO CONFIRMADO** en esta fase

## `biblioteca/`

- Rol probable: repositorio físico de contenidos/biblioteca indexada por prefijo alfabético
- Evidencia:
  - `dbconf.php` define `sys_repositorio = 'biblioteca'` (`dbconf.php:10`)
  - la carpeta existe con subdirectorios alfabéticos (`biblioteca/` contiene `a`, `b`, `c`, etc.)
- Archivos clave:
  - contenido puntual: **NO CONFIRMADO** en Fase 0
- Dependencias/notas:
  - `c_libro.php` arma rutas usando `sys_repositorio` (`c_libro.php:48-50`, `c_libro.php:61-63`, `c_libro.php:76-79`)

## `blog/`

- Rol probable: instalación separada de WordPress
- Archivos clave:
  - `blog/index.php`
  - `blog/wp-blog-header.php`
  - `blog/wp-config.php`
  - `blog/wp-feed.php`
  - `blog/wp-comments-post.php`
  - `blog/license.txt`
  - `blog/readme.html`
- Dependencias/notas:
  - `blog/index.php` hace bootstrap estándar de WP con `require('./wp-blog-header.php')` (`blog/index.php:1-4`)

## `chatgpt_desa/`

- Rol probable: subapp/experimento ChatGPT con routing propio
- Archivos clave:
  - `chatgpt_desa/.htaccess`
  - `chatgpt_desa/index.php`
  - `chatgpt_desa/chatgpt_funcs.php`
  - `chatgpt_desa/test_openai.php`
  - `chatgpt_desa/bibliotecario_chat_gpt_refactor_chatgpt.php`
- Dependencias/notas:
  - tiene reglas rewrite propias (`chatgpt_desa/.htaccess:1-19`)
  - `chatgpt_desa/chatgpt_funcs.php` usa PDO propio (`chatgpt_desa/chatgpt_funcs.php:55-74`)

## `docs/`

- Rol probable: documentación técnica y dumps SQL
- Archivos clave:
  - `docs/c2380538_main_stru.sql`
  - `docs/videos_book.sql`
  - `docs/Backlog.md`
- Dependencias/notas:
  - el dump estructural de referencia es `docs/c2380538_main_stru.sql` (`docs/c2380538_main_stru.sql:1-31`)

## `en/`, `gr/`, `pt/`, `free/`

- Rol probable: variantes de landing o contenido por idioma/segmento
- Archivos clave:
  - `en/index.php`
  - `en/how_to_download_free_audiobooks.php`
  - `en/template_audiolibros_gratis_en.php`
  - `gr/index.php`
  - `pt/index.php`
  - `free/index.php`
  - `free/index-2.0.php`
- Dependencias/notas:
  - `en/index.php` incluye helpers de raíz (`en/index.php:11-22`)
  - `pt/index.php` incluye helpers de raíz (`pt/index.php:9-19`)
  - `gr/index.php` incluye helpers de raíz (`gr/index.php:9-20`)

## `inc/`

- Rol probable: snippets de tracking, embeds y utilidades frontend legacy
- Archivos clave:
  - `inc/google_sitesearch.htm`
  - `inc/analyticstracking.php`
  - `inc/addthis.htm`
  - `inc/addthis-lector.htm`
  - `inc/facebook.htm`
  - `inc/gtag.js`
  - `inc/iconify.min.js`
- Dependencias/notas:
  - `bootstrap.php` incluye `inc/google_sitesearch.htm` (`bootstrap.php:120-123`)
  - otras inclusiones exactas desde raíz: **NO CONFIRMADO** en esta fase

## `lang/`

- Rol probable: archivos de idioma
- Archivos clave:
  - `lang/es.php`
  - `lang/en.php`
  - `lang/pt.php`
- Dependencias/notas:
  - la carga concreta parece abstraída por `pl_language_set()` / `pl_language_load()` en scripts como `index.php`, `autores.php`, `leerlibro.php` (`index.php:41-44`, `autores.php:57-60`, `leerlibro.php:112-117`)
  - include directo de `lang/*.php`: **NO CONFIRMADO**

## `lector/`

- Rol probable: archivos físicos del lector online, indexados por prefijo alfabético
- Evidencia:
  - `dbconf.php` define `sys_lector = 'lector'` (`dbconf.php:14`)
  - la carpeta existe con subdirectorios alfabéticos (`lector/` contiene `a`, `b`, `c`, etc.)
- Archivos clave:
  - contenido puntual: **NO CONFIRMADO** en Fase 0
- Dependencias/notas:
  - `leerlibro.php` es el entrypoint lógico del lector (`leerlibro.php:1-18`)

## `lib/`

- Rol probable: librerías de terceros legacy
- Archivos clave:
  - `lib/phpqrcode/qrlib.php`
  - `lib/phpqrcode/phpqrcode.php`
  - `lib/phpqrcode/index.php`
  - `lib/magpierss/rss_fetch.inc`
  - `lib/magpierss/rss_parse.inc`
  - `lib/magpierss/README`
- Dependencias/notas:
  - uso concreto desde la app principal: **NO CONFIRMADO** en esta fase

## `restore/`

- Rol probable: dumps SQL históricos / restauración
- Archivos clave:
  - `restore/data_planetal_main_noticias.sql`
  - `restore/ebook_data_planetal_main.sql`
  - `restore/ebook_download_log_planetal_main.sql`
  - `restore/links_planetal_main.sql`
  - `restore/sys_users_email_planetal_main.sql`
  - `restore/tags_planetal_main.sql`
  - `restore/votes_planetal_main.sql`
  - `restore/mpdump.php`
- Dependencias/notas:
  - `restore/mpdump.php` usa `mysql_connect` legacy (`restore/mpdump.php:35`)

## `srvapi/`

- Rol probable: endpoints/admin remotos del servidor
- Archivos clave:
  - `srvapi/planetalibroadm.php`
  - `srvapi/planetalibroadm-vok.php`
  - `srvapi/planetalibroadm_v1 ok.php`
- Dependencias/notas:
  - integración exacta con la raíz: **NO CONFIRMADO**

## `test/`

- Rol probable: pruebas manuales y scripts experimentales
- Archivos clave:
  - `test/dbconf.php`
  - `test/testdb.php`
  - `test/test_cron.php`
  - `test/test_lector.php`
  - `test/test_mailing.php`
  - `test/test_phpinfo.php`
  - `test/test_upload.php`
  - `test/testjson.php`
- Dependencias/notas:
  - no usar como fuente primaria de arquitectura productiva sin confirmación adicional

## `xapi/`

- Rol probable: API REST separada con PDO
- Archivos clave:
  - `xapi/v1/config.php`
  - `xapi/v1/index.php`
  - `xapi/v1/post.php`
  - `xapi/v1/utils.php`
- Dependencias/notas:
  - `xapi/v1/index.php` incluye `config.php` y `utils.php` (`xapi/v1/index.php:2-3`)
  - `xapi/v1/post.php` incluye `config.php` y `utils.php` (`xapi/v1/post.php:2-3`)
  - `utils.php` centraliza la conexión PDO (`xapi/v1/utils.php:4-15`)

## Observaciones transversales

- La raíz del proyecto concentra gran parte de la lógica de negocio en archivos `*_funcs.php`, `c_*.php` y entrypoints PHP directos (`index.php:13-30`, `libro.php:25-50`, `leerlibro.php:32-46`).
- No se detectó una carpeta `templates/` dedicada; el patrón actual usa templates PHP en la raíz, por ejemplo `template_basico_2025.php`, `template_funcs.php`, `template_lector_2025.php` (`index.php:28,60`, `leerlibro.php:36`, `libro.php:43`).
