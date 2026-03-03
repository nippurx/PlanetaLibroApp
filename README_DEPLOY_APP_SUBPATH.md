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

## URLs de prueba

Produccion:

```text
https://planetalibro.net/app/...
https://planetalibro.com/app/...
```

## Checklist de verificacion

- Confirmar que los assets en build referencian `/app/assets/...`.
- Confirmar que recargando `/app/libro/{uri}` no rompe el router y carga la app.
- Confirmar que en dev `/api/v1/public/health` responde correctamente por el proxy.
- Confirmar con una busqueda global que no existen strings `planetalibro.net` ni `planetalibro.com` en el frontend.
