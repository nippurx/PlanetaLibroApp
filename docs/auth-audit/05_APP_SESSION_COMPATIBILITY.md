# Compatibilidad de sesión con `/app/`

## Producción

`remember_token`, `useremail` y `pl_logged_out` tienen path `/`, por lo que el navegador los enviará a `/app/` y `/api/v1/` en el mismo host (`login.php:64-96`, `logout.php:63-70`). Como `Domain` se omite, son host-only: una cookie creada en `planetalibro.net` no llega a `www.planetalibro.net`, `planetalibro.com` ni sus variantes. **INFERENCIA:** la restauración puede funcionar para un endpoint API que invoque el mismo servicio de sesión/identidad en el mismo host; la API actual no lo hace (`api/v1/public/index.php:18-42`, `api/v1/src/bootstrap.php:13-53`).

La cookie de sesión PHP puede o no tener path `/`; depende de php.ini/configuración efectiva y del orden incorrecto del helper (`funciones.php:1140-1154`). **NO CONFIRMADO:** `session.cookie_path`, nombre, dominio, lifetime y SameSite de producción.

React ya usa `credentials: "include"` (`src/api/client.ts:56-68`). En mismo origen no hace falta CORS. La API actual envía `Access-Control-Allow-Origin` configurable y `Vary: Origin`, pero no `Access-Control-Allow-Credentials` (`api/v1/public/index.php:20-25`); una llamada cross-origin con credenciales requeriría origen explícito y `Allow-Credentials: true`, nunca `*`.

## Desarrollo Vite

Vite proxya `/api` al target configurado y cambia el Host (`vite.config.ts:5-9`, `vite.config.ts:20-24`). La cookie de producción pertenece a `planetalibro.net` y no es visible directamente a `localhost`. Además, un `Set-Cookie` host-only atravesando proxy puede quedar asociado a localhost según el navegador/proxy; esto no reproduce fielmente producción. No deben usarse cuentas reales. Para pruebas seguras: fixture/session fake solo en entorno de test o navegador contra un dominio local HTTPS controlado, documentando la diferencia.

## Conclusión

Sí es viable compartir identidad en `/app/` **solo** con endpoints PHP same-origin y cookies correctas. No basta con alojar ambos paths bajo el mismo dominio: deben verificarse host exacto, cookie PHP, HTTPS y que el endpoint ejecute la restauración. `.net` y `.com` requieren login separado o una transferencia de sesión explícita y segura; nunca cookies compartidas entre eTLD distintos.

