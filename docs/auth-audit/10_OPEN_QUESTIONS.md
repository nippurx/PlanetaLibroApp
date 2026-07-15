# Cuestiones no confirmadas

1. **NO CONFIRMADO:** valores efectivos de `session.name`, `cookie_path`, `cookie_domain`, `cookie_secure`, `cookie_httponly`, `cookie_samesite`, lifetime, save handler y garbage collection en producción (`funciones.php:1140-1154`).
2. **NO CONFIRMADO:** host canónico real y redirecciones entre `planetalibro.net`, `www.planetalibro.net`, `.com` y `www` en el proxy/CDN.
3. **NO CONFIRMADO:** valor efectivo de `sys_url` por dominio y si permite variantes peligrosas en `login_destino` (`login.php:102-112`).
4. **NO CONFIRMADO:** índices/constraints reales de producción, especialmente unicidad de email y `remember_token`; el dump solo demuestra estructura (`docs/c2380538_main_stru.sql:831-881`).
5. **NO CONFIRMADO:** semántica operacional de `valid`, `usergroup`, `user_groups`, bloqueo y administración; los guards principales no los usan.
6. **NO CONFIRMADO:** proceso batch que vence `paid` según `renew_date`; el guard solo mira `paid` (`user_funcs.php:2523-2555`).
7. **NO CONFIRMADO:** si Google OAuth está enlazado desde alguna UI, si las credenciales siguen válidas y si existe `dashboard.php`; no debe invocarse en la prueba (`google-callback.php:7-50`).
8. **NO CONFIRMADO:** si el hosting aplica la `.htaccess` inspeccionada y la cabecera pública a respuestas PHP/API (`.htaccess:48-51`).
9. **NO CONFIRMADO:** service worker desplegado y reglas de caché para `/api/v1/session`; debe verificarse en build/producción antes de auth.
10. **NO CONFIRMADO:** límites reales de biblioteca, reglas completas de contenido Premium/adulto y favoritos; no se encontró una política central única.
11. **NO CONFIRMADO:** si las cookies históricas con `Domain` explícito permanecen en navegadores; logout intenta varias variantes (`logout.php:110-126`).
12. **NO CONFIRMADO:** configuración CORS efectiva (`cors_allow_origin`) porque el archivo local de configuración no forma parte del árbol de la app auditada; la API sí consume la clave (`api/v1/public/index.php:22-24`).

## Procedimientos manuales seguros pendientes

En un entorno staging sin datos reales: inspeccionar `Set-Cookie` de login; comprobar `/session` desde `/`, `/app/` y `/api/v1/`; repetir en apex/www y `.net/.com`; verificar logout y caché con DevTools; probar destinos maliciosos; y validar expiry/rotación con usuarios sintéticos. No ejecutar estas pruebas contra cuentas o BD reales.

