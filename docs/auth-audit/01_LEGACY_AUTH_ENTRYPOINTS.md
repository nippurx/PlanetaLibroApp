# Entry points de autenticación legacy

## Mapa

| Entry point | Método/entrada | Includes y conexión | Estado, tablas y resultado |
|---|---|---|---|
| `/login.php` | GET muestra formulario; POST si `login`; recibe `email`, `password` (`login.php:29-35`, `login.php:172-189`) | `dbconf.php`, `login_dbconfig.php`, `mp_dbfuncs.php`, `funciones.php`, `user_funcs.php`; PDO `$connection` (`login.php:6-16`, `login_dbconfig.php:27-31`) | SELECT `user_table.email`; verifica `p_hash`; UPDATE `remember_token`; escribe sesión/cookies; redirige a `login_destino` o biblioteca (`login.php:36-41`, `login.php:55-117`). |
| `/logout.php` | GET; sin CSRF (`logout.php:1-15`) | mysqli/helper mediante `dbconf.php`, `mp_dbfuncs.php` (`logout.php:2-13`) | UPDATE `user_table.remember_token=NULL`, destruye sesión/cookies, crea marcador `pl_logged_out`, 302 a `index.php?logout=1` (`logout.php:19-74`). |
| `/login_register.php` | GET/POST; `register`, `username`, `email`, `password`; los duplicados del formulario solo se validan en JS (`login_register.php:38-47`, `login_register.php:134-167`) | PDO desde `login_dbconfig.php`; `funciones.php` (`login_register.php:22-24`) | SELECT por email; INSERT `USERNAME,P_HASH,EMAIL,DATE_JOINED`; no inicia login (`login_register.php:57-96`). |
| `/login_recover.php` | GET/POST; `recover`, `email` (`login_recover.php:39-50`, `login_recover.php:62-75`) | PDO y PHPMailer (`login_recover.php:30-34`) | SELECT `user_table.email`; envía enlace con hash del email; revela si existe (`login_recover.php:100-140`). No persiste token. |
| `/login_changepass.php` | GET `email,h`; POST `register,email,password` (`login_changepass.php:31-35`, `login_changepass.php:71-90`) | PDO más helpers mysqli (`login_changepass.php:25-29`) | GET verifica `password_verify(email,h)`; POST **no vuelve a verificar `h`** y actualiza por email (`login_changepass.php:47-90`). |
| `/google-callback.php` | GET `code` (`google-callback.php:14-20`) | Google client + PDO (`google-callback.php:2-5`, `google-callback.php:24-39`) | Busca `EMAIL`; intenta INSERT en columnas `EMAIL,PASSWORD,NAME`; guarda claves de sesión incompatibles y redirige a `dashboard.php` (`google-callback.php:24-50`). **NO CONFIRMADO/PROBABLEMENTE ROTO** por divergencia con esquema (`docs/c2380538_main_stru.sql:831-880`). |
| Restauración | llamada `user_logged_check()` desde páginas como inicio y lector (`index.php:20-31`, `leerlibro.php:32-71`) | conexión mysqli `$dbconn` | Si no hay `userid`, consulta `user_table.remember_token`, regenera sesión y repuebla identidad (`user_funcs.php:2450-2504`). |
| Biblioteca protegida | `/usuario_biblioteca_libros.php`; sesión + `user_logged_check()` (`usuario_biblioteca_libros.php:33-53`, `usuario_biblioteca_libros.php:77-94`) | helpers legacy/mysqli | Autenticado usa `$_SESSION['userid']`; anónimo guarda destino y va a login (`usuario_biblioteca_libros.php:91-99`). |
| Protección genérica | `check_user_login()` | mysqli (`user_funcs.php:1231-1253`) | acepta userid de URL o sesión/token; si no, guarda URI y redirige (`user_funcs.php:1239-1273`). |
| Premium/adultos | `user_is_subscribed($pagina_actual)` | sesión/globales | exige login y luego `user_paid`; redirige a login o `usuario_solo_adultos.php` (`user_funcs.php:2523-2555`). |

## Redirecciones y retorno

`login_destino` vive en sesión y es escrito desde múltiples protecciones (`user_funcs.php:1271-1273`, `user_funcs.php:2533-2551`). El login acepta un destino que empiece por `sys_url`; si no, concatena `sys_url` (`login.php:102-117`). **INFERENCIA:** si `sys_url` no está normalizado o una cadena externa consigue pasar el prefijo, existe riesgo de redirect abierto; el retorno futuro debe aceptar exclusivamente rutas relativas bajo allowlist.

## Páginas y operaciones autenticadas observadas

El lector restaura usuario mediante `user_logged_check()` y guarda progreso (`leerlibro.php:19-27`, `leerlibro.php:70-71`, `leerlibro_funcs.php:1083`, `leerlibro_funcs.php:1344`). Añadir a biblioteca es GET `q`, llama `user_logged_check()` y escribe `user_books` (`user_books_insert.php:31-37`). Los endpoints de audiolibro escriben usando el `userid` de sesión (`f_user_video_audiolibros_insert.php:23-38`, `f_user_video_audiolibros_updatetime.php:23-55`). No se encontró validación CSRF en estos entrypoints.

