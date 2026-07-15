# Auditoría de autenticación legacy

Fecha del análisis: 2026-07-15. Alcance: análisis estático, sin acceso a cuentas ni escritura en BD. El legacy se leyó en `D:\Desarrollo\MPWebs\www\planetalibro`; no fue modificado. La aplicación y la API funcional tampoco fueron modificadas: esta carpeta es el único entregable.

## Resumen ejecutivo

La identidad canónica es `user_table.userid`; el login real es un POST HTML a `/login.php`, busca por `email`, valida `p_hash` mediante `password_verify`, regenera el ID PHP, crea sesión y un `remember_token` aleatorio persistente, y redirige al destino guardado o a la biblioteca (`login.php:29-41`, `login.php:55-88`, `login.php:98-117`, `funciones.php:1052-1062`). El logout real es GET `/logout.php`: revoca el token en BD, destruye la sesión, intenta eliminar cookies y redirige al inicio (`logout.php:10-31`, `logout.php:33-74`).

La sesión puede compartirse entre `/`, `/app/` y `/api/v1/` si todos se sirven desde el mismo host: `remember_token` y `useremail` usan path `/` y no fijan `Domain` (`login.php:64-96`). La cookie PHP depende de la configuración efectiva de PHP, que no está fijada antes de `session_start`; por ello su path/domain/SameSite reales son **NO CONFIRMADOS** (`funciones.php:1140-1154`). `.net` y `.com`, y `www` frente al apex, no comparten cookies host-only.

Para el MVP se recomienda la estrategia A: redirección al login legacy con retorno interno validado y un endpoint de sesión read-only. Como arquitectura objetivo se recomienda C: una capa PHP compartida de identidad, extraída gradualmente. No se recomienda B como primer paso porque duplicaría lógica sensible.

Riesgos principales: recuperación de contraseña reutilizable, sin expiración y vulnerable a cambiar el email en el POST; OAuth inconsistente y con secretos versionados; SQL injection mediante `remember_token`; ausencia de CSRF; `remember_token` en texto plano, anual y sin rotación; open redirect potencial; y caché pública global en `.htaccess` (`login_recover.php:100-140`, `login_changepass.php:31-90`, `google-callback.php:7-50`, `user_funcs.php:2469-2488`, `.htaccess:48-51`).

## Documentos

1. [01_LEGACY_AUTH_ENTRYPOINTS.md](01_LEGACY_AUTH_ENTRYPOINTS.md)
2. [02_SESSION_AND_COOKIES.md](02_SESSION_AND_COOKIES.md)
3. [03_USER_AND_PERMISSION_MODEL.md](03_USER_AND_PERMISSION_MODEL.md)
4. [04_USER_DATA_RELATIONSHIPS.md](04_USER_DATA_RELATIONSHIPS.md)
5. [05_APP_SESSION_COMPATIBILITY.md](05_APP_SESSION_COMPATIBILITY.md)
6. [06_API_INTEGRATION_OPTIONS.md](06_API_INTEGRATION_OPTIONS.md)
7. [07_SECURITY_RISKS.md](07_SECURITY_RISKS.md)
8. [08_RECOMMENDED_AUTH_CONTRACT.md](08_RECOMMENDED_AUTH_CONTRACT.md)
9. [09_IMPLEMENTATION_PLAN.md](09_IMPLEMENTATION_PLAN.md)
10. [10_OPEN_QUESTIONS.md](10_OPEN_QUESTIONS.md)

