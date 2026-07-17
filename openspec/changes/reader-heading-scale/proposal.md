## Why

El reader elimina los estilos editoriales arbitrarios de los fragmentos y aplica tamaños relativos propios, pero la escala actual permite que un `h1` alcance el doble del tamaño de lectura elegido. En títulos largos, viewports angostos o preferencias de fuente grandes, el encabezado puede dominar una pantalla y perjudicar la continuidad de lectura.

## What Changes

- Acotar la escala visual de `h1` a `h6` dentro del contenido del reader sin eliminar su jerarquía semántica.
- Evitar que el tamaño de los encabezados crezca de manera desproporcionada al aumentar el tamaño base de lectura.
- Adaptar los encabezados a móvil y escritorio, incluyendo títulos largos, sin truncar ni ocultar texto.
- Conservar énfasis, estructura, separación editorial y los comienzos de capítulo existentes.
- Añadir una validación visual reproducible para títulos cortos y largos con distintos tamaños de fuente y modos de lectura.
- No modificar `epub2html2`, fragmentos publicados, manifests, URLs, API, progreso ni el lector legacy.

## Capabilities

### New Capabilities

- `reader-heading-scale`: Escala tipográfica acotada y adaptable para encabezados sanitizados dentro del reader.

### Modified Capabilities

Ninguna.

## Impact

- Afecta únicamente la presentación del contenido en `src/index.css` y, si la validación lo requiere, fixtures o pruebas locales del reader.
- El reflujo puede cambiar la cantidad de páginas visuales, por lo que debe conservarse el pasaje visible mediante el mecanismo de anclas existente.
- No cambia contenido indexable, metadata, rutas públicas, contratos API ni comportamiento del lector legacy; el impacto SEO/GEO esperado es neutro.
- El rollback consiste en restaurar la escala CSS anterior de `h1` a `h6`.
