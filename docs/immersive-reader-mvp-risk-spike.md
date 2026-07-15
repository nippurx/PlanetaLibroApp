# Spike de riesgos del reader inmersivo

Fecha: 2026-07-14

## Decisión de origen en producción

La app se desplegará en `https://planetalibro.net/app/` y los recursos se sirven desde `https://planetalibro.net/lector/...`. Comparten esquema, host y puerto: son same-origin. CORS no se considera un riesgo ni un bloqueo de producción y no se requieren cambios en las cabeceras Apache para habilitar la lectura. Sí queda pendiente verificar las cabeceras y el comportamiento efectivo de caché.

## Alcance y límites de la verificación

Se inspeccionó la copia local sincronizada del árbol publicado en `D:\Desarrollo\MPWebs\www\planetalibro\lector` sin modificarla. El entorno no permitió abrir `planetalibro.net`: `curl` no pudo establecer conexión al puerto 443 y el navegador integrado bloqueó el dominio por una restricción del usuario. Por ello, esta evidencia prueba existencia y compatibilidad del contenido publicado local, pero **no prueba una respuesta HTTP de producción**. No se observaron cabeceras de respuesta; queda pendiente la parte de caché y acceso HTTP real de la tarea OpenSpec 1.1, no CORS como decisión arquitectónica.

La configuración local `D:\Desarrollo\MPWebs\www\planetalibro\.htaccess` declara `ExpiresDefault "access plus 2 days"`, un año para imágenes y `Header set Cache-Control "public"`. No declara `Access-Control-Allow-Origin`. Son directivas de configuración, no cabeceras de producción observadas; además dependen de que Apache tenga activos `mod_expires` y `mod_headers`.

## Recursos derivados y comprobados

Raíz HTTP contractual: `https://planetalibro.net/lector/{primera letra}/{segunda letra}/{autor}/{libro_uri}`.

### Roberto Arlt — El criador de gorilas

Raíz: `https://planetalibro.net/lector/a/r/arlt/arlt-roberto-el-criador-de-gorilas`

- `manifest.json`: presente localmente, JSON v2, `pages: 213`; existen los 213 `pag-N.html`.
- Fragmentos inspeccionados: `pag-1.html`, `pag-2.html`, `pag-3.html`, `pag-5.html`, `pag-104.html`, `pag-213.html`; todos legibles localmente.
- Assets declarados y presentes: `OEBPS/Images/cover.jpg` (74.189 bytes), `Images/cover.jpg` (74.189 bytes), `OEBPS/Images/logo_mundo.jpg` (1.967 bytes).
- HTML del corpus: 1.090 `p`, 16 `h1`, 3 `strong`, 2 `img`, 1 `a`, 1 `hr`; sin `script`, handlers, tablas ni `pre`.
- Particularidades: URLs absolutas en imágenes, `alt=""`, estilos inline de centrado, clases Bootstrap históricas, `&nbsp;` y un separador `hr`. El sanitizador debe eliminar estilo/clases sin perder texto, imágenes ni `alt` decorativo.

### Honoré de Balzac — Un asunto tenebroso

Raíz: `https://planetalibro.net/lector/b/a/balzac/balzac-honorato-de-un-asunto-tenebroso`

- `manifest.json`: presente localmente, JSON v2, `pages: 394`; existen los 394 `pag-N.html`.
- Fragmentos inspeccionados: `pag-1.html`, `pag-2.html`, `pag-5.html`, `pag-161.html`, `pag-201.html`, `pag-392.html`, `pag-394.html`; todos legibles localmente.
- Assets declarados y presentes: `OEBPS/Images/cover.jpg` (226.211 bytes), `Images/cover.jpg` (226.211 bytes).
- HTML del corpus: 1.370 `p`, 6 `em`, 4 `br`, 4 `h2`, 4 `blockquote`, 1 `h3`, 1 `img`, 1 `hr`; sin `script`, handlers, tablas ni `pre`.
- Particularidades: fragmentos muy desparejos (171 a 7.030 caracteres), párrafos largos, `blockquote`, títulos con `br` y párrafos vacíos con altura inline. El sanitizador elimina la altura usada como espaciador. El caso de 7.030 caracteres es el principal fixture para comprobar fragmentación de texto largo.

### Albert Camus — La peste

Raíz esperada: `https://planetalibro.net/lector/c/a/camus/camus-albert-la-peste`.

No existe en la copia local sincronizada. La ficha legacy pública usa `/leerlibro/camus-albert-la-peste/157`, pero sin acceso HTTP no fue posible confirmar que la raíz v2, `manifest.json`, `pag-N.html` o sus assets existan. No se deducen nombres de assets sin manifest.

## Resultado del spike de columnas

Se recorrió todo el HTML real disponible de Arlt y Balzac, no sólo fixtures sintéticos. Su conjunto de elementos es compatible con fragmentación CSS en columnas: texto, headings, énfasis, enlaces, blockquotes e imágenes; no se encontraron scripts, tablas, preformateado ni widgets con tamaño propio. Los párrafos largos de Balzac pueden fragmentarse entre columnas y no justifican por sí solos rangos DOM.

El motor del MVP continúa siendo columnas CSS. El reader espera fuentes e imágenes críticas de la zona necesaria para revelar el destino (con límite de 2,5 s), aguarda dos frames de layout, recalcula desde el ancla interna y revela el contenido después. En saltos de índice sólo bloquea por el fragmento anterior y el destino; los siguientes fragmentos se anexan en segundo plano sin placeholder. Cuando una acción del usuario exige cruzar un borde aún no cargado, muestra un placeholder neutro, restaura el pasaje y entonces avanza una pantalla. Esto reduce tanto el tiempo percibido del salto como los cambios visibles de columna.

No se implementan rangos DOM: no apareció una incompatibilidad estructural real que los requiera. Queda pendiente la validación visual en un navegador permitido; por ese motivo la tarea 4.4 no se marca completa todavía.

## Cabeceras HTTP pendientes de capturar

Para cada manifest, fragmento y asset se deben registrar: estado, URL final tras redirecciones, `Content-Type`, `Content-Length`, `ETag`, `Last-Modified`, `Cache-Control`, `Expires`, `Vary` y `Age`. También se debe repetir una solicitud condicional para comprobar `304`. CORS no requiere una prueba habilitante porque producción es same-origin. Hasta disponer de esas respuestas, el resultado exacto es: **cabeceras de caché no observadas**.
