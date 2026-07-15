# Sesión y cookies

## Ciclo real

1. Las páginas llaman `session_start()` directamente o mediante `mp_session_start()` (`login.php:15-16`, `leerlibro.php:19`). El helper configura `HttpOnly`, strict mode y Secure **después** de iniciar la sesión, de modo que su efecto sobre la cookie emitida en esa misma llamada es incierto (`funciones.php:1140-1154`).
2. Login POST consulta email y verifica el hash (`login.php:29-57`).
3. En éxito regenera el ID, genera 32 bytes aleatorios hex, lo guarda en cookie y en `user_table`, y llena la sesión (`login.php:58-96`).
4. `user_logged_check()` confía primero en `$_SESSION['userid']`; si no existe y no hay `pl_logged_out`, restaura por token, regenera ID y repuebla la sesión (`user_funcs.php:2455-2504`). El token no rota ni recibe expiración server-side.
5. Logout revoca por userid o token, vacía y destruye sesión, expira cookies y establece `pl_logged_out` cinco minutos (`logout.php:19-70`).

## Cookies

| Nombre | Tipo | Creación | Lectura | Eliminación | Path | Domain | Secure | HttpOnly | SameSite | Duración | Finalidad | Evidencia |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `remember_token` | persistente | login exitoso | restauración/logout | logout | `/` | omitido (host-only) | según HTTPS detectado | sí | Lax | 365 días | restaurar identidad | `login.php:61-82`; `user_funcs.php:2469-2503`; `logout.php:15-31,60-61` |
| `useremail` | persistente | login | no se encontró lectura relevante en el flujo auditado | logout | `/` | omitido | según HTTPS | **no** | Lax | 365 días | dato legado/UI | `login.php:90-96`; `logout.php:50-58` |
| `pl_logged_out` | persistente corto | logout | bloquea restauración | login lo expira | `/` | omitido | según HTTPS | sí | Lax | 300 s | evitar restauración inmediata | `logout.php:63-70`; `login.php:71-77`; `user_funcs.php:2465-2468` |
| nombre de sesión PHP (normalmente `PHPSESSID`) | sesión | `session_start()` | PHP | logout | **NO CONFIRMADO** | **NO CONFIRMADO** | **NO CONFIRMADO efectivo** | **NO CONFIRMADO efectivo** | **NO CONFIRMADO** | sesión/navegador o php.ini | estado PHP | `funciones.php:1140-1154`; `logout.php:44-48` |
| `auth_token` | código aparentemente no usado | `mp_verify_auth` solo lo elimina; creación no confirmada | helper no observado en entrypoints | fallo auth | `/` | omitido | API antigua | no especificado | no especificado | expirada | vestigio | `funciones.php:1157-1165` |

## Variables de sesión

| Clave | Escritura/lectura | Finalidad |
|---|---|---|
| `userid` | login/restauración; usada como identidad en biblioteca/progreso (`login.php:85`, `user_funcs.php:2489`, `leerlibro_funcs.php:1083`) | ID canónico |
| `username` | login/restauración (`login.php:86`, `user_funcs.php:2490`) | nombre visible |
| `email` | login/restauración (`login.php:87`, `user_funcs.php:2491`) | contacto/lookup legado |
| `user_paid` | copia de `paid` al autenticar (`login.php:88`, `user_funcs.php:2493`) | entitlement cacheado |
| `img_url` | login/restauración (`login.php:89`, `user_funcs.php:2492`) | avatar |
| `screenname` | se limpia en login/logout, pero el login principal no lo llena (`login.php:59`, `logout.php:37`) | perfil legado |
| `login_destino` | protecciones escriben; login lee (`user_funcs.php:1271`, `login.php:102`) | retorno post-login |
| `login_origen` | helpers de plantilla escriben y login lee (`template_funcs.php:158-159`, `login.php:198-207`) | navegación de vuelta |

No hay evidencia de expiración, hash, rotación periódica, selector/validator ni vinculación a dispositivo para `remember_token`. Un token inválido deja al usuario anónimo sin limpiar la cookie (`user_funcs.php:2469-2504`).

