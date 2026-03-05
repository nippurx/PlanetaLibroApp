# Conexión DB y Helpers SQL

## 1. Stack principal del sitio legacy

### 1.1 Configuración central

La configuración principal de base de datos del sitio está en `dbconf.php`:

- `DBTYPE = mysql` (`dbconf.php:27`)
- `DBHOST = localhost` (`dbconf.php:28`)
- `DBUSER = c2380538_admin` (`dbconf.php:29`)
- `DBPASSWORD = Kualalumpur23` (`dbconf.php:30`)
- `DBNAME = c2380538_main` (`dbconf.php:31`)

También hay una configuración anterior/comentada para LatinCloud:

- `190.228.29.61 / planetal_admin / planetal_main` (`dbconf.php:34-40`)

### 1.2 Apertura de conexión

El helper principal es `mp_db_connect($dbconfig)` en `mp_dbfuncs.php:68-135`.

Implementación observada:

- usa `mysqli_connect($dbconfig['DBHOST'], $dbconfig['DBUSER'], $dbconfig['DBPASSWORD'])` (`mp_dbfuncs.php:87`)
- luego selecciona la base con `mysqli_select_db($link, $dbconfig['DBNAME'])` (`mp_dbfuncs.php:122`)
- devuelve el recurso/conexión `$link` (`mp_dbfuncs.php:134`)

Variables globales/patrón asociado:

- scripts incluyen `dbconf.php` y luego llaman `mp_db_connect($dbconf)` para poblar `$dbconn`
- ejemplos:
  - `index.php:13-30`
  - `autor.php:12-16` y `autor.php:45`
  - `autores.php:24-31` y `autores.php:54`
  - `leerlibro.php:32-46` y `leerlibro.php:67`
  - `descargar.php:13-24` y `descargar.php:42`

### 1.3 Fallback / espejo

Si falla la conexión principal, `mp_db_connect()` intenta preparar una configuración espejo:

- host `192.168.0.196` (`mp_dbfuncs.php:102`)
- user `teknear_adm` (`mp_dbfuncs.php:103`)
- db `teknear_planetalibro_main` (`mp_dbfuncs.php:105`)

Pero la reconexión posterior vuelve a usar `$dbconfig[...]` y no `$dbconf[...]` (`mp_dbfuncs.php:107`). Por código, el uso efectivo del espejo queda **NO CONFIRMADO** y parece inconsistente.

## 2. Helpers SQL centrales del stack principal

### 2.1 Query helpers

- `mpdb_query($query, $conn)` (`mp_dbfuncs.php:272-279`)
  - ejecuta `mysqli_query($conn, $query)` (`mp_dbfuncs.php:275`)
  - retorna `mysqli_error($conn)` (`mp_dbfuncs.php:278`)
  - patrón de uso: se guarda en `$rc` y no devuelve el result set

- `mpdb_get_value($query, $conn)` (`mp_dbfuncs.php:285-299`)
  - ejecuta `mysqli_query($conn, $query)` (`mp_dbfuncs.php:287`)
  - itera con `mysqli_fetch_array($result)` (`mp_dbfuncs.php:293-296`)
  - devuelve un array de filas (`mp_dbfuncs.php:289-298`)

### 2.2 Escape / sanitización

- `mpdb_real_escape_string($texto)` (`mp_dbfuncs.php:433-439`)
  - usa `mysqli_real_escape_string($dbconn, $texto)` sobre el global `$dbconn` (`mp_dbfuncs.php:435-438`)

- `mpdb_escape($value)` (`mp_dbfuncs.php:452-456`)
  - también usa el global `$dbconn` (`mp_dbfuncs.php:453-455`)

Patrón de uso visible:

- `autor.php` arma SQL concatenando `mpdb_real_escape_string($p_autor)` (`autor.php:54-57`)
- `autores.php` arma SQL concatenando `mpdb_real_escape_string(...)` (`autores.php:112-114`)
- `c_category.php` usa `mpdb_escape()` para `INSERT IGNORE INTO tags ...` (`c_category.php:72-76`)
- `c_libro.php` concatena múltiples valores escapados (`c_libro.php:109-111`; `c_libro.php:246-248`)

### 2.3 Fetch helpers adicionales

En `c_autor.php` hay helpers adicionales que parecen duplicar funcionalidad y no viven en `mp_dbfuncs.php`:

- `mpdb_num_rows($result)` (`c_autor.php:222-236`)
- `mpdb_fetch_assoc($result)` (`c_autor.php:239-253`)

Esto sugiere dispersión parcial de helpers SQL.

## 3. Prepared statements detectados

### 3.1 Login / registro con PDO

`login_dbconfig.php` crea un `PDO` en `$connection`:

- construcción PDO (`login_dbconfig.php:27-31`)
- config DB reutiliza `DBHOST/DBUSER/DBPASSWORD/DBNAME` (`login_dbconfig.php:10-14`)

Uso típico:

- `login.php`
  - `SELECT * FROM user_table WHERE EMAIL=:email` (`login.php:31-34`)
  - `UPDATE user_table SET remember_token = ? WHERE userid = ?` (`login.php:60-62`)
- `login_register.php`
  - `SELECT * FROM user_table WHERE email=:email` (`login_register.php:57-60`)
  - `INSERT INTO user_table(...) VALUES (...)` (`login_register.php:77-84`)

Variables globales relevantes:

- `$connection` (PDO) en `login_dbconfig.php:27-31`

### 3.2 Subapp `chatgpt_desa`

`chatgpt_desa/chatgpt_funcs.php` define un stack PDO independiente:

- `PL_DB_DSN`, `PL_DB_USER`, `PL_DB_PASS` (`chatgpt_desa/chatgpt_funcs.php:55-57`)
- helper `pl_pdo(): PDO` (`chatgpt_desa/chatgpt_funcs.php:65-74`)
- prepared statements:
  - `SELECT url FROM libros WHERE titulo = :t LIMIT 1` (`chatgpt_desa/chatgpt_funcs.php:218`)
  - `SELECT url FROM libros WHERE slug = :s LIMIT 1` (`chatgpt_desa/chatgpt_funcs.php:225`)
  - búsqueda por `LIKE` (`chatgpt_desa/chatgpt_funcs.php:232`)

Observación:

- DSN por defecto apunta a `dbname=planetalibro`, no a `c2380538_main` (`chatgpt_desa/chatgpt_funcs.php:55`).

Compatibilidad con la DB principal del dump: **NO CONFIRMADO**.

### 3.3 `xapi/v1`

`xapi/v1/config.php` define otro bloque propio:

- `$dbconf[...]` con `c2380538_main` (`xapi/v1/config.php:3-7`)
- array `$db` con `host/username/password/db` (`xapi/v1/config.php:10-15`)

`xapi/v1/utils.php` abre PDO:

- `new PDO("mysql:host={$db['host']};dbname={$db['db']}", ...)` (`xapi/v1/utils.php:4-15`)

Uso:

- `xapi/v1/index.php` consulta `ebooks_books` con `prepare()` y `bindValue()` (`xapi/v1/index.php:11-21`)
- `xapi/v1/post.php` hace CRUD sobre `posts` con `prepare()` (`xapi/v1/post.php:11-89`)

Variables relevantes:

- `$dbConn` en `xapi/v1/index.php:6` y `xapi/v1/post.php:6`

### 3.4 `diagnostic_logger.php`

Archivo aislado de diagnóstico con conexión `new mysqli(...)`:

- credenciales hardcodeadas (`diagnostic_logger.php:44-47`)
- conexión (`diagnostic_logger.php:58-63`)

Parece herramienta operativa, no helper central.

## 4. Bloque `google-callback.php`

### 4.1 Uso de `$connection` dentro del archivo

`google-callback.php` usa `$connection` como objeto PDO:

- `SELECT * FROM user_table WHERE EMAIL=:email` (`google-callback.php:25-28`)
- `INSERT INTO user_table (EMAIL, PASSWORD, NAME) VALUES (...)` (`google-callback.php:35-39`)
- `lastInsertId()` sobre `$connection` (`google-callback.php:41`)

### 4.2 Includes reales del archivo

Los únicos includes/requires visibles en `google-callback.php` son:

- `require 'vendor/autoload.php';` (`google-callback.php:2`)
- `include('dbconf.php');` (`google-callback.php:3`)

### 4.3 Qué aportan esos includes

#### `vendor/autoload.php`

`vendor/autoload.php` solo carga el autoloader de Composer y retorna el loader:

- `require_once __DIR__ . '/composer/autoload_real.php';` (`vendor/autoload.php:23`)
- `return ComposerAutoloaderInit...::getLoader();` (`vendor/autoload.php:25`)

No define `$connection` en ese archivo (`vendor/autoload.php:1-25`).

#### `dbconf.php`

`dbconf.php` define constantes del sitio, `$dbconf` y algunos `include_once`, pero no crea `$connection`:

- define `$dbconf['DBHOST']`, `DBUSER`, `DBPASSWORD`, `DBNAME` (`dbconf.php:26-31`)
- incluye `mp_user_info.php` y `mp_ads.php` (`dbconf.php:60-65`)
- la conexión experimental `$dbconn = mp_db_connect($dbconf);` está comentada (`dbconf.php:134-136`)

No aparece `new PDO(...)` ni asignación a `$connection` en `dbconf.php:1-140`.

#### `mp_user_info.php`

`mp_user_info.php` tampoco define `$connection`; incluso tiene comentado el include de `login_dbconfig.php`:

- comentario `//include('login_dbconfig.php');` (`mp_user_info.php:7-8`)
- no hay asignación a `$connection` en `mp_user_info.php:1-41`

### 4.4 Origen real de `$connection` en el proyecto

El origen real de `$connection` sí existe en el proyecto y está en `login_dbconfig.php`:

- creación de PDO: `$connection = new PDO("mysql:host=".$dbconf['DBHOST'].";dbname=".$dbconf['DBNAME'], ...)` (`login_dbconfig.php:27-29`)

Ese archivo es el mismo que usan los flujos de login/registro:

- `login.php` incluye `login_dbconfig.php` (`login.php:2-3`) y luego usa `$connection->prepare(...)` (`login.php:31-33`, `login.php:61-62`)
- `login_register.php` incluye `login_dbconfig.php` (`login_register.php:22`) y luego usa `$connection->prepare(...)` (`login_register.php:57-58`, `login_register.php:77-82`)

### 4.5 Conclusión

Conclusión confirmada:

- El origen real de `$connection` en este codebase es `login_dbconfig.php:27-29`.
- `google-callback.php` **no** incluye `login_dbconfig.php`; solo incluye `vendor/autoload.php` y `dbconf.php` (`google-callback.php:2-3`).
- Por alcance/scope de PHP, con la evidencia visible, `$connection` **no queda definida** dentro de `google-callback.php`.

### 4.6 Estado operativo documentado

Estado: **RESUELTO**

- origen real de `$connection`: `login_dbconfig.php:27-29`
- disponibilidad real dentro de `google-callback.php`: **NO CONFIRMADA / probablemente ausente por include faltante**

### 4.7 Hipótesis respaldada por evidencia

Hipótesis más fuerte:

- `google-callback.php` fue escrito para reutilizar el mismo PDO de login (`login_dbconfig.php`), pero el include correspondiente no quedó agregado.

Evidencia:

- usa el mismo patrón de `$connection->prepare(...)` sobre `user_table` que `login.php` y `login_register.php` (`google-callback.php:25-39`, `login.php:31-33`, `login_register.php:57-58`)
- el archivo que efectivamente crea `$connection` es `login_dbconfig.php` (`login_dbconfig.php:27-29`)
- `google-callback.php` no lo incluye (`google-callback.php:2-3`)

## 5. Patrón de uso típico observado

### Stack legacy `mysqli`

1. `include/require` de `mp_dbfuncs.php`
2. `include/require` de `dbconf.php`
3. `include/require` de funciones de dominio (`funciones.php`, `pl_funcs.php`, `libro_funcs.php`, etc.)
4. `mp_db_connect($dbconf)` -> `$dbconn`
5. consultas con `mpdb_get_value()` o `mpdb_query()`

Ejemplos:

- `index.php:13-30`
- `autor.php:12-22` y `autor.php:45-57`
- `descargar.php:13-24` y `descargar.php:42-49`
- `api/v1/gptsearch.php:14-24` y `api/v1/gptsearch.php:52-67`

### Stack auth/API con PDO

1. include de archivo de config PDO (`login_dbconfig.php` o `xapi/v1/utils.php`)
2. uso directo de `$connection` o `$dbConn`
3. queries con `prepare()`, `bindParam()` o `bindValue()`

Ejemplos:

- `login.php:31-36`
- `login_register.php:57-84`
- `xapi/v1/index.php:17-21`
- `xapi/v1/post.php:42-44`
