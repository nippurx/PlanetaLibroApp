# Contrato de autenticación recomendado (sin implementación)

## Rutas definitivas

- `GET /api/v1/session`: fuente única para sesión actual. Anónimo también responde 200.
- `GET /api/v1/me`: opcional; 401 si no autenticado. Puede omitirse inicialmente porque `/session` ya incluye perfil mínimo.
- `POST /api/v1/logout`: revoca sesión/token; requiere CSRF; 204 idempotente.
- `GET /login.php?return_to=/app/...`: login MVP legacy. `return_to` debe validarse/guardarse server-side.
- `POST /api/v1/login`: **reservado**, no implementar en MVP; solo después de la capa compartida C.

Los nombres tentativos con `/public/` son confusos para recursos dependientes de cookies; aunque el endpoint admita anónimos, `/session` no es cacheable ni “público”. La API actual usa base `/api/v1/public` (`docs/PlanetaLibro-API-README.md:13-23`); durante transición puede exponerse físicamente allí, conservando contrato lógico `/api/v1/session` mediante routing futuro.

## Respuestas

Anónimo, 200:

```json
{"data":{"authenticated":false,"user":null,"entitlements":{"premium":false}}}
```

Autenticado, 200:

```json
{"data":{"authenticated":true,"user":{"id":123,"username":"usuario","avatar_url":null},"entitlements":{"premium":true}}}
```

`/me` anónimo: `401 {"error":{"code":"unauthenticated","message":"Authentication required."}}`. CSRF inválido: 403 `csrf_failed`. Entrada inválida: 400; rate limit: 429; error interno: 500 sin detalles. El formato conserva el patrón actual (`api/v1/src/Response.php:17-49`).

## Cabeceras y seguridad

Toda respuesta dependiente de sesión: `Cache-Control: private, no-store, max-age=0`, `Pragma: no-cache`, `Vary: Cookie, Origin`; nunca cache del service worker. Cookies `Secure; HttpOnly; SameSite=Lax; Path=/`. Writes con cookie: token CSRF ligado a sesión en header `X-CSRF-Token` más validación `Origin`; login puede usar patrón synchronizer y rate limiting. CORS solo si es imprescindible: origen exacto, `Access-Control-Allow-Credentials: true`; producción same-origin no necesita CORS.

Campos explícitamente excluidos: `email` por defecto, `p_hash`, `s_hash`, `remember_token`, tokens OAuth, cookies, `acti_code`, `temppass`, IPs, `usergroup` crudo, `valid` crudo, `paid` crudo, `renew_date`, datos de pago y cualquier secreto. La API expone un entitlement derivado, no la implementación.

