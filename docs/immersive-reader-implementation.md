# Implementación del lector inmersivo

## Contratos del MVP

- La ruta normal es `/read/:libro_uri/`; la variante `/read/:libro_uri/:page` se reserva para enlaces compartidos y compatibilidad.
- El número de la ruta sólo es una pista explícita de arranque, tiene prioridad sobre el progreso local y no es la posición persistida.
- Ante un error se ofrecen la ficha `/book/:libro_uri` y el lector clásico `/leerlibro/:libro_uri/:page`.
- La flecha superior vuelve al origen real del historial (ficha, dashboard o audiolibro) y usa `/book/:libro_uri` como fallback cuando el reader se abrió directamente.
- La API v1 sigue siendo read-only. El MVP guarda progreso y preferencias localmente; no sincroniza ni escribe en el backend.
- La carpeta del reader se resuelve exclusivamente con la convención documentada:
  `/lector/{primer carácter}/{segundo carácter}/{primer token}/{uri}`.
- La URI debe cumplir `^[a-zA-Z0-9._-]+$`, no puede empezar con punto ni contener `..`. Ninguna entrada permite proporcionar una ruta.

## Fuente de contenido

`manifest.json` versión 2 es la fuente estructural. Sus rangos, URI, índice y capítulos se validan antes de usarlos. Los fragmentos `pag-N.html` sólo se solicitan si `1 <= N <= manifest.pages` y se sanitizan de nuevo en el cliente.

Si la solicitud directa del manifest responde 404, el cliente usa `GET /api/v1/public/reader-manifest/{uri}`. El endpoint reconstruye un contrato mínimo desde `libroinfo.php`, valida todos los fragmentos, registra el libro en `ebook_regeneration_queue` para regenerarlo con `epub2html2` y crea `manifest.json` mediante lock, temporal y rename atómico. La respuesta actual ya contiene el manifest; desde la apertura siguiente vuelve a utilizarse la ruta estática rápida. Otros estados HTTP no activan esta compatibilidad.

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

- desarrollo: `http://localhost:5173/app/read/arlt-roberto-el-criador-de-gorilas/`;
- preview: `http://localhost:4173/app/read/arlt-roberto-el-criador-de-gorilas/`;
- destino compartido: agregar un fragmento, por ejemplo `/app/read/arlt-roberto-el-criador-de-gorilas/17`;
- Balzac: sustituir la URI por `balzac-honorato-de-un-asunto-tenebroso`.

Para probar desde un celular en la misma red, se reemplaza `localhost` por la IP LAN que muestra Vite. El equipo debe poder acceder por HTTPS a `planetalibro.net` y permitir el puerto local en el firewall.

## Layout elegido

El MVP usa columnas CSS como motor inicial de paginación: el flujo lógico sanitizado se pagina al ancho útil y altura del viewport. Esta opción mantiene un DOM semántico único, permite que una página visual cruce límites `pag-N` y reutiliza el mismo contenido para scroll continuo.

Si las pruebas con el corpus real muestran inestabilidad persistente con imágenes o bloques indivisibles, el fallback diseñado es medir rangos DOM. Esa comparación no puede cerrarse únicamente con build; requiere las pruebas manuales y end-to-end pendientes.

La ventana inicial carga ocho fragmentos. En modo paginado, al entrar en las dos últimas pantallas visuales disponibles se solicita el lote siguiente antes de alcanzar el borde del flujo. La precarga que agrega contenido posterior no cubre la lectura con un placeholder; una carga exigida al intentar cruzar el borde sí conserva el ancla y usa el placeholder de repaginación. Esto evita que el final provisional de la ventana se presente como final del libro sin bloquear la lectura por trabajo anticipado.

El avance visual no usa `scrollLeft`: el ancho total de columnas incluye gaps que hacen que el límite nativo `scrollWidth - clientWidth` no coincida con el origen de la última columna. El reader mantiene el flujo multicolumna y lo desplaza con `translate3d` en múltiplos exactos del ancho del viewport. Así escritorio y móvil comparten el mismo cálculo y la última pantalla no queda truncada por el clamp de scroll.

El ancho de columna y su gap se derivan de `clientWidth` y del padding calculado del contenedor, no de `100vw`. Esto evita desalineación acumulativa en navegadores móviles donde el viewport CSS incluye barras o áreas que no forman parte del ancho útil. La suma `columnWidth + columnGap` coincide siempre con el paso usado por `translate3d`.

Un `ResizeObserver` recalcula la geometría cuando abrir o cerrar un panel cambia el ancho útil sin emitir `window.resize`. Al saltar desde el índice se reemplaza primero el flujo renderizado por la zona crítica formada por el fragmento anterior y el destino, en lugar de mezclar fragmentos lejanos con la ventana anterior. Después de resolver el título mediante el ancla y revelar el capítulo, se completan en segundo plano los fragmentos posteriores de la ventana hasta un total máximo de ocho.

La precarga secuencial funciona en ambos modos. Paginado solicita el lote siguiente al entrar en sus dos últimas pantallas visuales; continuo lo solicita al superar el 80 % del scroll disponible. La descarga anticipada mantiene un único trabajo concurrente y no activa “Ajustando la página”; si el usuario alcanza un borde que todavía requiere contenido, la carga pasa a ser bloqueante, captura el ancla y completa el avance o retroceso después del reflujo.

## Anclas

La posición se guarda como ancla versionada con:

- ruta/índice estructural de bloque;
- cita textual normalizada;
- contexto textual posterior;
- offset reservado para una granularidad futura.

La restauración intenta coincidencia textual exacta, luego contextual y finalmente el bloque estructural más cercano. No persiste `pag-N`, número de columna, página visual ni píxeles como identidad.

La captura prioriza el bloque bajo el punto de lectura y, si el panel o un espacio de columna impiden obtenerlo, sólo considera bloques cuyos rectángulos fragmentados intersectan el viewport. La restauración obtiene la columna desde el primer rectángulo CSS del bloque respecto del flujo transformado; no usa `offsetLeft`, porque ese valor puede apuntar al inicio del elemento original aunque su contenido esté fragmentado en otra columna.

## Compartir ubicación

La URL visible no se actualiza al avanzar. El botón Compartir inspecciona los fragmentos renderizados en orden y crea `/app/read/{libro_uri}/{fragmento}` con el primero que intersecta la pantalla, aunque sólo aparezca una porción mínima. En dispositivos compatibles usa Web Share; en los demás copia el enlace al portapapeles.

El enlace es deliberadamente aproximado: identifica una unidad `pag-N.html`, no una página visual ni el pasaje textual exacto. Al abrirlo se prioriza el destino sobre el progreso local y el flujo visible comienza exactamente en el fragmento solicitado, sin incorporar `pag-(N-1)`. Los saltos internos desde el índice sí conservan el fragmento anterior como contexto de paginación.

La barra inferior no muestra capítulo. Muestra `Pág. N de total`, una línea de avance y porcentaje; `N` se toma del mismo primer fragmento visible usado al compartir y `total` es `manifest.pages`. Es una referencia compacta de navegación, no el progreso persistido ni una página visual calculada.

## Barra de marca persistente

`ReaderBrandBar` forma parte del shell del reader y no contiene acciones. Su altura visual es `44px`, definida una sola vez en `--reader-brand-bar-height`; la altura total agrega `env(safe-area-inset-top)`. El viewport reserva ese total antes de su espacio de controles, de modo que la altura disponible de las columnas CSS y la restauración del ancla se recalculan sin contenido debajo de la barra. El logo remoto solicitado mide `32px` de alto y deja `6px` arriba y abajo; el dominio se centra de manera absoluta respecto del viewport y no respecto del logo. La barra queda por encima de paneles y controles, mientras que los paneles reservan su altura para no ocultar su contenido inicial.

Las URLs numeradas pasan en producción por `public/reader-share.php`, mediante la primera regla de `public/.htaccess`, antes de los fallbacks estáticos y de la SPA. El shell conserva la URL y el bundle React, pero agrega en el HTML inicial la metadata Open Graph que los crawlers sociales pueden leer sin ejecutar JavaScript. La tapa se selecciona desde `manifest.assets`, se verifica como archivo local dentro de la carpeta derivada del libro y se publica como URL absoluta junto con su tipo y dimensiones. La cabecera de diagnóstico `X-PlanetaLibro-Share-Metadata` informa `cover` o `generic`. Ante manifest o tapa ausentes, el reader sigue abriendo con metadata genérica.

## Rollback

Se puede retirar la ruta/enlaces del reader React y dirigir al lector clásico. No se modificaron el publicador EPUB, `manifest.json`, `libroinfo.php` ni los fragmentos publicados.
