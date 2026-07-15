# Opciones de integración

## API actual

La API es una frontera independiente, PDO, read-only, con router solo GET, repositorios y respuestas `data/error` (`docs/PlanetaLibro-API-README.md:1-44`, `api/v1/src/Router.php:7-38`, `api/v1/src/Response.php:7-49`). Bootstrap crea PDO/repositorios sin sesión ni middleware (`api/v1/src/bootstrap.php:13-53`). La cabecera CORS es global y no hay credenciales, preflight, CSRF ni no-cache autenticado (`api/v1/public/index.php:18-25`).

Se pueden reutilizar `Request`, `Response`, `Router`, PDO y el patrón controlador/repositorio. Deben aislarse: `AuthSessionService`, `CurrentUser`, `CsrfGuard`, `AuthController`, `UserRepository` y middleware/cadena previa al controlador. No debe incluirse `user_funcs.php` entero dentro de la API porque mezcla HTML, redirects, globals y SQL.

## Comparación

| Criterio | A: redirect legacy | B: formulario React/API | C: capa PHP compartida |
|---|---|---|---|
| Compatibilidad/MVP | alta | media | alta al completar |
| Cambios legacy | mínimos | pocos, pero duplica reglas | moderados y graduales |
| Riesgo | bajo si retorno allowlist | alto: credenciales/CSRF/rate limit/recovery | medio por refactor |
| UX | salto visual | mejor | mejor a largo plazo |
| OAuth/recovery | reutiliza entrypoints, aunque deben endurecerse | habría que reproducirlos | unifica correctamente |
| Logout global | endpoint legacy común | coordinación obligatoria | coherente por diseño |
| Desarrollo local | redirect a host real; incómodo | más fácil de simular | requiere harness |
| Mantenimiento | deuda temporal | lógica duplicada | mejor objetivo |

## Recomendación

MVP: A, con `/login.php` como dueño de credenciales y una ruta de retorno relativa firmada/allowlisted a `/app/`; después `GET /api/v1/session` same-origin. Antes de usar recovery/OAuth públicamente deben corregirse sus riesgos.

Objetivo: C. Extraer pequeñas funciones puras/repositorios compartidos para cargar usuario, validar contraseña, emitir/revocar/rotar token y derivar entitlements. Migrar legacy y API una función por vez con pruebas de paridad. B solo sería razonable después de C, cuando el formulario React sea un cliente de la misma capa, no una reimplementación.

