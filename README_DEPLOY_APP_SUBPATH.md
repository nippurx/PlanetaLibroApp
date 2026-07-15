# Deploy en /app

Este proyecto usa `base: '/app/'` en Vite y `basename="/app"` en React Router porque la app se publica bajo el subpath `/app` en produccion.
Eso hace que los assets salgan con rutas `/app/assets/...` y que las rutas del router funcionen correctamente debajo de `/app`.

## Multi-dominio

La app no hardcodea ningun dominio.
La API se consume con rutas relativas al host actual, por ejemplo `/api/v1/public/...`.
Eso permite que el mismo frontend funcione igual en `planetalibro.net`, `planetalibro.com` y tambien en desarrollo local.

## Desarrollo

Comando:

```bash
npm run dev
```

En desarrollo, Vite proxya `/api` hacia `http://localhost/planetalibro`, por lo que el frontend puede usar `fetch('/api/v1/public/health')` sin problemas de CORS.

URL de prueba en dev:

```text
http://localhost:5173/app/...
```

Prueba API dev (proxy OK):

```js
fetch('/api/v1/public/health')
```

## Build

Comando:

```bash
npm run build
```

El build genera la salida directamente en:

```text
D:\Desarrollo\MPWebs\www\planetalibro\app
```

El directorio `public/` aporta dos archivos que Vite copia al build:

- `.htaccess`: evalúa primero `/app/read/{libro_uri}/{N}`, lo envía mediante una ruta absoluta al shell social y después aplica los fallbacks estáticos y de React Router.
- `reader-share.php`: lee el `index.html` generado, resuelve la tapa declarada en el manifest e inyecta Open Graph —incluidos tipo, ancho y alto de imagen— antes de entregar el mismo bundle React. La respuesta incluye `X-PlanetaLibro-Share-Metadata: cover` cuando encontró una tapa y `generic` cuando no la encontró.

Apache debe permitir `.htaccess`, `mod_rewrite` y ejecución PHP dentro de `/app`. El shell no consulta la base de datos ni ejecuta `libroinfo.php`.

## URLs de prueba

Produccion:

```text
https://planetalibro.net/app/...
https://planetalibro.com/app/...
```

## Checklist de verificacion

- Confirmar que los assets en build referencian `/app/assets/...`.
- Confirmar que recargando `/app/libro/{uri}` no rompe el router y carga la app.
- Confirmar que `/app/read/{uri}/{N}` contiene `og:image` absoluto al inspeccionar el HTML inicial y que después abre el reader en la misma URL.
- Confirmar en la respuesta de esa URL `X-PlanetaLibro-Share-Metadata: cover`. Si la cabecera no aparece, Apache no está aplicando el `.htaccess` desplegado en `/app`; no es un problema de caché de WhatsApp.
- Compartir una URL numerada nueva por WhatsApp y comprobar que la tarjeta muestra la tapa; una URL usada anteriormente puede conservar la caché de WhatsApp.
- Confirmar que en dev `/api/v1/public/health` responde correctamente por el proxy.
- Confirmar con una busqueda global que no existen strings `planetalibro.net` ni `planetalibro.com` en el frontend.
