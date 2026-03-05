# EntryPoints y Routing

## 1. Routing detectado

### 1.1 Routing principal en raíz

El routing principal visible no usa front controller único. La raíz tiene un `.htaccess` que reescribe URLs amigables directamente a scripts PHP concretos:

- `/libro/{slug}` -> `libro.php?libro=$1` (`.htaccess:9`)
- `/resumen/{slug}` -> `resumen.php?libro=$1` (`.htaccess:10`)
- `/leerlibro/{slug}` -> `leerlibro.php?libro=$1` (`.htaccess:11`)
- `/temas/{letra}` -> `temas.php?letra=$1` (`.htaccess:12`)
- `/autores/{letra}` -> `autores.php?letra=$1` (`.htaccess:13`)
- `/autor/{slug}` -> `autor.php?autor=$1` (`.htaccess:14`)
- `/audiolibro_player/{slug}` -> `audiolibro_player.php?libro=$1` (`.htaccess:16`)
- `/audiolibro/{slug}` -> `audiolibro.php?libro=$1` (`.htaccess:17`)
- `/reviews/{slug}` -> `reviews.php?libro=$1` (`.htaccess:18`)
- `/trivia/{slug}` -> `trivia.php?libro=$1` (`.htaccess:19`)
- `/tema/{slug}` -> `tema.php?tema=$1` (`.htaccess:20`)
- `/usuario_biblioteca/{userid}` -> `usuario_biblioteca.php?userid=$1` (`.htaccess:21`)

Conclusión operativa: el routing principal es por `mod_rewrite` hacia scripts específicos, no por `REQUEST_URI` ni por un router central detectado en raíz (`.htaccess:1-24`).

### 1.2 Consumo de parámetros reescritos dentro de los scripts

Después del rewrite, varios entrypoints parsean el parámetro recibido:

- `libro.php` lee `$_REQUEST['libro']` y lo parte con `explode('/')` para separar slug/página (`libro.php:79-85`)
- `leerlibro.php` hace lo mismo con `$_REQUEST['libro']` (`leerlibro.php:50-58`)
- `autor.php` parsea `$_REQUEST['autor']` (`autor.php:30-31`)
- `autores.php` parsea `$_REQUEST['letra']` (`autores.php:33-38`)

### 1.3 Uso de `REQUEST_URI`

Se encontró uso de `$_SERVER['REQUEST_URI']`, pero para construir QR/URLs, no para resolver el routing principal:

- `bootstrap.php:256-260`
- `readonline.php:128-149`

Routing por `REQUEST_URI`: **NO CONFIRMADO**.

### 1.4 Routing adicional en `chatgpt_desa/`

La subapp `chatgpt_desa/` sí tiene su propio `.htaccess` con reglas que apuntan a `index.php`:

- `/chatgpt/` -> `index.php` (`chatgpt_desa/.htaccess:6-7`)
- `/chatgpt/{autor}` -> `index.php?autor=$1` (`chatgpt_desa/.htaccess:9-12`)
- `/chatgpt/{autor}/{accion}` -> `index.php?autor=$1&accion=$2` (`chatgpt_desa/.htaccess:14-15`)

## 2. Entrypoints principales en raíz

### `index.php`

- Archivo: `index.php`
- Propósito: home principal del sitio / índice 2022-2025 (`index.php:2-4`, `index.php:60-64`)
- Includes principales:
  - `mp_dbfuncs.php` (`index.php:13`)
  - `dbconf.php` (`index.php:14`)
  - `funciones.php` (`index.php:15`)
  - `pl_funcs.php` (`index.php:16`)
  - `libro_funcs.php` (`index.php:17`)
  - `user_funcs.php` (`index.php:20`)
  - `template_funcs.php` (`index.php:28`)
  - `template_basico_2025.php` (`index.php:60`)
- Conexión DB:
  - `mp_db_connect($dbconf)` (`index.php:30`)
- Depende de rewrite/routing:
  - No de forma obligatoria para entrar por `/`

### `libro.php`

- Archivo: `libro.php`
- Propósito: detalle de libro (`libro.php:3-9`)
- Includes principales:
  - `mp_dbfuncs.php` (`libro.php:25`)
  - `dbconf.php` (`libro.php:26`)
  - `funciones.php` (`libro.php:27`)
  - `c_libro.php` (`libro.php:30`)
  - `leerlibro_funcs.php` (`libro.php:34`)
  - `libro_funcs.php` (`libro.php:37`)
  - `user_funcs.php` (`libro.php:38`)
  - `template_funcs.php` (`libro.php:43`)
  - `ads/mpads/mpads.php` (`libro.php:50`)
- Conexión DB:
  - `mp_db_connect($dbconf)` (`libro.php:93`)
- Depende de rewrite/routing:
  - Sí, para URLs lindas `/libro/{slug}` (`.htaccess:9`, `libro.php:79-85`)

### `leerlibro.php`

- Archivo: `leerlibro.php`
- Propósito: lector online / página de lectura (`leerlibro.php:2-13`)
- Includes principales:
  - `mp_dbfuncs.php` (`leerlibro.php:32`)
  - `dbconf.php` (`leerlibro.php:33`)
  - `funciones.php` (`leerlibro.php:34`)
  - `user_funcs.php` (`leerlibro.php:35`)
  - `template_funcs.php` (`leerlibro.php:36`)
  - `leerlibro_funcs.php` (`leerlibro.php:40`)
  - `libro_funcs.php` (`leerlibro.php:41`)
  - `c_libros_pedidos.php` (`leerlibro.php:42`)
  - `mp_file_cache.php` (`leerlibro.php:45`)
- Conexión DB:
  - `mp_db_connect($dbconf)` (`leerlibro.php:67`)
- Depende de rewrite/routing:
  - Sí, para `/leerlibro/{slug}` (`.htaccess:11`, `leerlibro.php:50-58`)

### `buscar.php`

- Archivo: `buscar.php`
- Propósito: buscador de libros y autores (`buscar.php:2-4`)
- Includes principales:
  - `mp_dbfuncs.php` (`buscar.php:10`)
  - `dbconf.php` (`buscar.php:11`)
  - `funciones.php` (`buscar.php:12`)
  - `pl_funcs.php` (`buscar.php:13`)
  - `libro_funcs.php` (`buscar.php:14`)
  - `search_funcs.php` (`buscar.php:15`)
  - `user_funcs.php` (`buscar.php:16`)
  - `ads/mpads/mpads.php` (`buscar.php:18`)
  - `amazon_api.php` (`buscar.php:19`)
  - `ab_lib.php` (`buscar.php:20`)
- Depende de rewrite/routing:
  - No se vio rewrite dedicado en `.htaccess`; parece entrar por querystring/form (`buscar.php:27-29`)

### `autor.php`

- Archivo: `autor.php`
- Propósito: página de autor / libros de un autor (`autor.php:2-5`)
- Includes principales:
  - `mp_dbfuncs.php` (`autor.php:12`)
  - `dbconf.php` (`autor.php:13`)
  - `funciones.php` (`autor.php:14`)
  - `pl_funcs.php` (`autor.php:16`)
  - `autor_funcs.php` (`autor.php:18`)
  - `libro_funcs.php` (`autor.php:19`)
  - `libro_zapping_funcs.php` (`autor.php:20`)
  - `chatgpt_funcs.php` (`autor.php:21`)
  - `user_funcs.php` (`autor.php:22`)
- Conexión DB:
  - `mp_db_connect($dbconf)` (`autor.php:45`)
- Depende de rewrite/routing:
  - Sí, para `/autor/{slug}` (`.htaccess:14`, `autor.php:30-31`)

### `autores.php`

- Archivo: `autores.php`
- Propósito: índice/listado de autores por letra (`autores.php:2-5`, `autores.php:33-52`)
- Includes principales:
  - `mp_dbfuncs.php` (`autores.php:24`)
  - `dbconf.php` (`autores.php:25`)
  - `funciones.php` (`autores.php:26`)
  - `user_funcs.php` (`autores.php:27`)
  - `libro_funcs.php` (`autores.php:28`)
  - `pl_funcs.php` (`autores.php:31`)
  - `template_basico_2025.php` (`autores.php:74`)
- Conexión DB:
  - `mp_db_connect($dbconf)` (`autores.php:54`)
- Depende de rewrite/routing:
  - Sí, para `/autores/{letra}` (`.htaccess:13`, `autores.php:33-38`)

### `descargar.php`

- Archivo: `descargar.php`
- Propósito: flujo de descarga y validación de usuario (`descargar.php:34-50`, `descargar.php:80-90`, `descargar.php:125-177`)
- Includes principales:
  - `mp_dbfuncs.php` (`descargar.php:13`)
  - `dbconf.php` (`descargar.php:14`)
  - `funciones.php` (`descargar.php:15`)
  - `user_funcs.php` (`descargar.php:17`)
  - `pl_funcs.php` (`descargar.php:18`)
  - `leerlibro_funcs.php` (`descargar.php:20`)
  - `libro_funcs.php` (`descargar.php:21`)
  - `mp_file_cache.php` (`descargar.php:24`)
  - `PHPMailer/PHPMailer.php` (`descargar.php:25`)
  - `crons.php` (`descargar.php:29`)
- Conexión DB:
  - `mp_db_connect($dbconf)` (`descargar.php:42`)
- Depende de rewrite/routing:
  - No se detectó rewrite dedicado en `.htaccess`

### `login.php`

- Archivo: `login.php`
- Propósito: autenticación de usuarios (`login.php:24-31`, `login.php:52-89`)
- Includes principales:
  - `dbconf.php` (`login.php:2`)
  - `login_dbconfig.php` (`login.php:3`)
  - `mp_dbfuncs.php` (`login.php:5`)
  - `funciones.php` (`login.php:6`)
  - `user_funcs.php` (`login.php:7`)
- Conexión DB:
  - usa `$connection` PDO creado en `login_dbconfig.php` (`login.php:31-36`, `login_dbconfig.php:27-31`)
- Depende de rewrite/routing:
  - No

### `login_register.php`

- Archivo: `login_register.php`
- Propósito: registro de usuarios (`login_register.php:36-47`, `login_register.php:57-84`)
- Includes principales:
  - `login_dbconfig.php` (`login_register.php:22`)
  - `funciones.php` (`login_register.php:23`)
- Conexión DB:
  - usa `$connection` PDO de `login_dbconfig.php` (`login_register.php:57-84`, `login_dbconfig.php:27-31`)
- Depende de rewrite/routing:
  - No

## 3. Otros entrypoints detectados

- `api/v1/gptsearch.php`: endpoint JSON para búsqueda (`api/v1/gptsearch.php:1-5`, `api/v1/gptsearch.php:21-24`)
- `api/siguiente-libro.php`: endpoint API en estado incompleto/debug (`api/siguiente-libro.php:20-23`)
- `xapi/v1/index.php`: endpoint PDO para búsquedas GET sobre `ebooks_books` (`xapi/v1/index.php:11-21`)
- `xapi/v1/post.php`: endpoint CRUD genérico sobre tabla `posts` (`xapi/v1/post.php:11-89`)
- `blog/index.php`: bootstrap de WordPress (`blog/index.php:1-4`)

## 4. Entrypoints o router propio no confirmados

- Router central propio basado en `REQUEST_URI` / `parse_url`: **NO CONFIRMADO**
- Front controller único tipo `router.php` / `dispatch.php` para la raíz: **NO CONFIRMADO**
