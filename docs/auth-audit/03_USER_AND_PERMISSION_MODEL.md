# Modelo de usuario y permisos

## Identidad canónica

| Campo | Clasificación | Uso demostrado |
|---|---|---|
| `userid` | autenticación/identidad | PK lógica, sesión y FKs de datos (`docs/c2380538_main_stru.sql:831-833`, `login.php:80-85`) |
| `email` | autenticación + perfil | lookup único de facto para login/registro/recovery (`login.php:33-41`, `login_register.php:57-84`) |
| `username` | perfil | nombre en sesión/UI (`login.php:85-87`) |
| `screenname` | perfil/legado | restaurado si existe; no escrito por login principal (`user_funcs.php:2497-2501`) |
| `p_hash` | autenticación | `password_hash`/`password_verify` (`funciones.php:1040-1062`, `login.php:55-57`) |
| `remember_token` | autenticación persistente | token de restauración (`login.php:61-82`, `user_funcs.php:2469-2488`) |
| `paid` | entitlement | copiado a sesión y usado como booleano Premium (`login.php:88`, `user_funcs.php:2544-2552`) |
| `renew_date` | suscripción | se escribe al activar un año, pero no se consulta en el guard principal (`user_funcs.php:819-824`, `user_funcs.php:2523-2555`) |
| `img_url` | perfil | avatar en sesión (`login.php:89`) |
| `valid`, `usergroup` | autorización potencial/legado | existen en esquema, pero el login y los guards auditados no los verifican (`docs/c2380538_main_stru.sql:837-845`, `login.php:36-88`) |
| `authentication_source`, `openidurl` | histórico/OAuth potencial | existen, pero Google callback no los usa (`docs/c2380538_main_stru.sql:869-872`, `google-callback.php:30-48`) |
| `s_hash`, `acti_code`, `temppass`, `tp*`, `cookie_*` | histórico/aparentemente obsoleto | no participan en el flujo principal demostrado (`docs/c2380538_main_stru.sql:835-849,873-875`) |

## Reglas reales

- Visitante: ausencia de `$_SESSION['userid']` y token restaurable; `user_logged_check()` devuelve falso (`user_funcs.php:2455-2515`).
- Registrado: sesión con `userid`; no se comprueba `valid`, bloqueo ni grupo en login (`login.php:36-88`).
- Premium: verdad de `$_SESSION['user_paid']`, derivada de `user_table.paid`; quita anuncios y permite contenido protegido (`funciones.php:2014-2022`, `user_funcs.php:2523-2555`).
- Suscripción vencida: **NO CONFIRMADO** que se revoque automáticamente. `renew_date` se escribe, pero el guard solo mira `paid` (`user_funcs.php:819-824`, `user_funcs.php:2544-2552`).
- Adultos: el helper trata la suscripción Premium como prueba de mayoría y redirige a la página de adultos (`user_funcs.php:210-224`, `user_funcs.php:2544-2552`). No hay verificación de edad independiente.
- Administrador/roles: **NO CONFIRMADO** en el sistema principal. `usergroup`/`user_groups` existen, pero no hay enforcement demostrado en login/guards (`docs/c2380538_main_stru.sql:796-807,831-880`).
- Bloqueado/inválido: **NO CONFIRMADO**; `valid` existe pero no se comprueba en el login (`docs/c2380538_main_stru.sql:837`, `login.php:36-88`).

La futura API debe autenticar en servidor, recalcular `paid`/vencimiento desde BD y no confiar en el valor enviado o cacheado por React.

