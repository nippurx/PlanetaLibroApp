# Riesgos de seguridad

| Severidad | Riesgo y evidencia | Impacto | Mitigación |
|---|---|---|---|
| Crítico | Recovery: enlace derivado solo del email, reutilizable/sin expiración; POST acepta email modificable sin revalidar hash (`login_recover.php:100-140`, `login_changepass.php:31-90,132-147`) | cambio de contraseña de otra cuenta y enlaces perpetuos | token aleatorio one-time, hash en BD, expiración, vincular userid, consumir atómicamente, mensaje uniforme |
| Crítico | OAuth contiene credenciales en código y usa columnas/sesión incompatibles (`google-callback.php:7-50`; esquema `docs/c2380538_main_stru.sql:831-880`) | secreto expuesto, flujo roto/cuentas inconsistentes | revocar/rotar secreto; variables de entorno; state+PKCE; mapear a `userid/p_hash/username`; no habilitar hasta prueba |
| Alto | SQL injection por cookie concatenada en dos restauradores (`user_funcs.php:1251-1253`, `user_funcs.php:2469-2480`) | lectura/manipulación SQL según driver | prepared statement y token validado por formato/hash |
| Alto | `remember_token` en texto plano, 365 días, sin expiración server-side ni rotación (`login.php:61-82`, `user_funcs.php:2469-2503`) | robo equivale a sesión duradera | selector+hash, expiración BD, rotación al uso, revocación por dispositivo |
| Alto | CSRF ausente en logout y writes GET (`logout.php:1-15`, `user_books_insert.php:31-37`, `f_user_video_audiolibros_updatetime.php:23-55`) | logout forzado y cambios de biblioteca/progreso | POST/DELETE/PUT, token CSRF, Origin/Referer, SameSite defensa adicional |
| Alto | Secretos/credenciales DB/OAuth versionados en `login_dbconfig.php`, `dbconf.php`, `google-callback.php` y archivo de credenciales Google JSON | compromiso de infraestructura | rotar y trasladar a entorno/secret manager; historia Git; no copiar valores |
| Alto | Posible open redirect por `login_destino`/comparación de prefijo (`login.php:102-112`) | phishing/robo de confianza | aceptar solo paths relativos canonicalizados bajo `/app/`; nonce de retorno |
| Alto | OAuth no muestra `state`, usa redirect HTTP y no regenera sesión (`google-callback.php:7-16,46-50`) | login CSRF/intercepción/fijación | HTTPS, state, PKCE, regenerar ID |
| Medio | Configuración de seguridad de sesión ocurre tras `session_start()` (`funciones.php:1140-1154`) | flags pueden no aplicarse; fixation/cookie insegura | `session_set_cookie_params` e ini antes de start; verificar headers reales |
| Medio | Login/registro/recovery sin CSRF ni rate limiting visible (`login.php:29-57`, `login_register.php:38-84`, `login_recover.php:39-50`) | brute force, spam, login CSRF | rate limit, CSRF, backoff, logs sin contraseñas |
| Medio | Enumeración en registro y recovery (`login_register.php:67-73`, `login_recover.php:135-140`) | descubrimiento de cuentas | respuesta y timing uniformes |
| Medio | Premium confía en `paid` cacheado y no verifica `renew_date` (`user_funcs.php:2523-2555`) | acceso tras vencimiento | entitlement server-side con regla explícita/actualizada |
| Medio | `valid`/bloqueo no se verifica en login (`docs/c2380538_main_stru.sql:837`, `login.php:36-88`) | cuentas inválidas podrían autenticarse | definir semántica y comprobarla en servicio común |
| Medio | Mezcla PDO/mysqli y SQL concatenado (`login.php:36-82`, `logout.php:13-30`) | divergencia/error/inyección | un repositorio PDO con prepares |
| Medio | `.htaccess` fija `Cache-Control: public` global (`.htaccess:48-51`) | contenido autenticado cacheable | respuestas auth `no-store, private`; excluir API/páginas privadas |
| Medio | service worker/cache app: **NO CONFIRMADO**; una respuesta `/me` podría persistirse | exposición entre usuarios | excluir rutas auth del SW; `no-store`; limpiar estado al logout |
| Bajo | `useremail` no es HttpOnly (`login.php:90-96`) | email accesible a JS/XSS | eliminar cookie; obtener perfil mínimo por `/session` |
| Bajo | logout intenta múltiples dominios pero no puede borrar cookies de otro eTLD (`logout.php:110-126`) | logout no global entre `.net/.com` | definir dominio canónico y logout federado explícito |
| Bajo | mayúsculas/minúsculas de columnas divergen en OAuth (`google-callback.php:25-46`) | incompatibilidad según driver/esquema | mapping único y tests |

No se observó exposición JSON actual de hashes/tokens porque la API aún no autentica. Debe prohibirse expresamente.

