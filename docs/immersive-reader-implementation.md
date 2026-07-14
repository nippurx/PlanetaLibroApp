# Implementación del lector inmersivo

## Contratos del MVP

- La ruta de la app conserva `/read/:libro_uri/:page` y también admite `/read/:libro_uri`.
- El número de la ruta sólo es una pista de arranque compatible con enlaces legacy; no es la posición persistida.
- Ante un error se ofrecen la ficha `/book/:libro_uri` y el lector clásico `/leerlibro/:libro_uri/:page`.
- La flecha superior vuelve al origen real del historial (ficha, dashboard o audiolibro) y usa `/book/:libro_uri` como fallback cuando el reader se abrió directamente.
- La API v1 sigue siendo read-only. El MVP guarda progreso y preferencias localmente; no sincroniza ni escribe en el backend.
- La carpeta del reader se resuelve exclusivamente con la convención documentada:
  `/lector/{primer carácter}/{segundo carácter}/{primer token}/{uri}`.
- La URI debe cumplir `^[a-zA-Z0-9._-]+$`, no puede empezar con punto ni contener `..`. Ninguna entrada permite proporcionar una ruta.

## Fuente de contenido

`manifest.json` versión 2 es la fuente estructural. Sus rangos, URI, índice y capítulos se validan antes de usarlos. Los fragmentos `pag-N.html` sólo se solicitan si `1 <= N <= manifest.pages` y se sanitizan de nuevo en el cliente.

La app se desplegará en `https://planetalibro.net/app/` y obtiene los libros mediante `https://planetalibro.net/lector/...`. Ambas URLs comparten esquema, host y puerto, por lo que CORS no es un bloqueo de producción ni requiere cambiar cabeceras Apache. La política de caché HTTP continúa siendo una verificación de despliegue separada.

En desarrollo y preview, Vite conserva en el navegador la ruta same-origin `/lector/...` y la reenvía a `https://planetalibro.net`. El target se puede sustituir con `VITE_READER_PROXY_TARGET` sin cambiar código. El proxy está configurado tanto para `server` como para `preview`; no modifica Apache ni los libros publicados.

## Prueba manual local

Desarrollo con recarga automática:

```powershell
npm run dev:reader
```

Preview del build local, generado en `dist/` dentro del repositorio:

```powershell
npm run preview:reader
```

Rutas de prueba:

- desarrollo: `http://localhost:5173/app/read/arlt-roberto-el-criador-de-gorilas/1`;
- preview: `http://localhost:4173/app/read/arlt-roberto-el-criador-de-gorilas/1`;
- Balzac: sustituir la URI por `balzac-honorato-de-un-asunto-tenebroso`.

Para probar desde un celular en la misma red, se reemplaza `localhost` por la IP LAN que muestra Vite. El equipo debe poder acceder por HTTPS a `planetalibro.net` y permitir el puerto local en el firewall.

## Layout elegido

El MVP usa columnas CSS como motor inicial de paginación: el flujo lógico sanitizado se pagina al ancho útil y altura del viewport. Esta opción mantiene un DOM semántico único, permite que una página visual cruce límites `pag-N` y reutiliza el mismo contenido para scroll continuo.

Si las pruebas con el corpus real muestran inestabilidad persistente con imágenes o bloques indivisibles, el fallback diseñado es medir rangos DOM. Esa comparación no puede cerrarse únicamente con build; requiere las pruebas manuales y end-to-end pendientes.

La ventana inicial carga ocho fragmentos. En modo paginado, al entrar en las dos últimas pantallas visuales disponibles se solicita el lote siguiente antes de alcanzar el borde del flujo. La incorporación conserva el ancla y usa el placeholder de repaginación; intentar avanzar desde el borde mantiene una segunda oportunidad de carga. Esto evita que el final provisional de la ventana se presente como final del libro.

El avance visual no usa `scrollLeft`: el ancho total de columnas incluye gaps que hacen que el límite nativo `scrollWidth - clientWidth` no coincida con el origen de la última columna. El reader mantiene el flujo multicolumna y lo desplaza con `translate3d` en múltiplos exactos del ancho del viewport. Así escritorio y móvil comparten el mismo cálculo y la última pantalla no queda truncada por el clamp de scroll.

El ancho de columna y su gap se derivan de `clientWidth` y del padding calculado del contenedor, no de `100vw`. Esto evita desalineación acumulativa en navegadores móviles donde el viewport CSS incluye barras o áreas que no forman parte del ancho útil. La suma `columnWidth + columnGap` coincide siempre con el paso usado por `translate3d`.

Un `ResizeObserver` recalcula la geometría cuando abrir o cerrar un panel cambia el ancho útil sin emitir `window.resize`. Al saltar desde el índice se reemplaza el flujo renderizado por una ventana contigua alrededor del fragmento de destino, en lugar de mezclar fragmentos lejanos con la ventana anterior; después se resuelve el título mediante el ancla y se retoma la precarga secuencial.

La precarga secuencial funciona en ambos modos. Paginado solicita el lote siguiente al entrar en sus dos últimas pantallas visuales; continuo lo solicita al superar el 80 % del scroll disponible. En continuo se reinicia el disparador mientras llega el lote para evitar solicitudes encadenadas y se restaura el pasaje anclado antes de permitir que el usuario continúe hasta el final real del libro.

## Anclas

La posición se guarda como ancla versionada con:

- ruta/índice estructural de bloque;
- cita textual normalizada;
- contexto textual posterior;
- offset reservado para una granularidad futura.

La restauración intenta coincidencia textual exacta, luego contextual y finalmente el bloque estructural más cercano. No persiste `pag-N`, número de columna, página visual ni píxeles como identidad.

La captura prioriza el bloque bajo el punto de lectura y, si el panel o un espacio de columna impiden obtenerlo, sólo considera bloques cuyos rectángulos fragmentados intersectan el viewport. La restauración obtiene la columna desde el primer rectángulo CSS del bloque respecto del flujo transformado; no usa `offsetLeft`, porque ese valor puede apuntar al inicio del elemento original aunque su contenido esté fragmentado en otra columna.

## Rollback

Se puede retirar la ruta/enlaces del reader React y dirigir al lector clásico. No se modificaron el publicador EPUB, `manifest.json`, `libroinfo.php` ni los fragmentos publicados.
