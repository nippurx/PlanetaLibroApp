# Checklist manual del reader inmersivo

Registrar dispositivo, sistema, navegador, viewport, conexión y libro. Adjuntar captura o vídeo corto ante cada fallo y anotar el pasaje visible antes/después.

## Preparación HTTP (una vez por libro)

- [ ] Abrir DevTools > Network, desactivar caché y cargar el reader.
- [ ] Confirmar estado 200 y `Content-Type` correcto de `manifest.json`, al menos tres `pag-N.html` no consecutivos y cada imagen solicitada.
- [ ] Copiar las cabeceras de respuesta: `Cache-Control`, `Expires`, `ETag`, `Last-Modified`, `Vary` y `Age` (anotar “ausente” explícitamente).
- [ ] Recargar con caché habilitada y registrar si cada recurso viene de memoria/disco, responde 304 o vuelve a transferirse completo.
- [ ] Confirmar que las solicitudes usan `/lector/...` en el origen local de Vite y que el proxy no produce contenido mixto, redirecciones inesperadas ni assets 404.
- [ ] Repetir para Arlt, Balzac y Camus. En Camus confirmar primero si existe el `manifest.json` v2; no asumirlo desde la URL legacy.

## Celular (portrait y landscape)

- [ ] La primera vista muestra el modo paginado, sin header/footer globales y sin texto `pag-N`.
- [ ] Toque en tercio derecho: avanza exactamente una pantalla. Tercio izquierdo: retrocede una. Centro: muestra/oculta controles.
- [ ] Swipe horizontal corto y largo: un gesto produce un solo avance/retroceso; el gesto vertical no cambia página accidentalmente.
- [ ] Al llegar al final del lote cargado aparece “Ajustando la página…” y luego el pasaje siguiente, sin flash de texto viejo ni salto hacia atrás.
- [ ] Cambiar tamaño de fuente, interlineado y ancho: el mismo pasaje sigue visible después de repaginar.
- [ ] Rotar portrait/landscape dos veces: se conserva el pasaje y no queda una columna en blanco.
- [ ] Cambiar tema claro/sepia/oscuro: texto, controles, foco y placeholder conservan contraste.
- [ ] Cambiar a scroll continuo y volver a paginado: se conserva el pasaje; el scroll es vertical natural.
- [ ] Abrir índice, saltar a inicio/medio/final y cerrar con gesto/botón; el foco y el anuncio son comprensibles.
- [ ] Salir a la ficha, volver a abrir y comprobar restauración del pasaje, no del número `pag-N`.
- [ ] Activar “reducir movimiento”: no hay desplazamientos animados ni animación de hoja.
- [ ] Con lector de pantalla disponible: recorrer headings, article, botones e índice; confirmar orden lógico y nombres útiles.

## Escritorio

- [ ] Flecha derecha, Page Down y Espacio avanzan exactamente una pantalla; flecha izquierda y Page Up retroceden una.
- [ ] Tab recorre controles visibles con foco claro; Escape cierra panel y devuelve foco al botón que lo abrió.
- [ ] Clic en laterales y botones de flecha respetan límites de inicio/final.
- [ ] Redimensionar ventana lentamente y maximizar/restaurar: se conserva el pasaje sin texto superpuesto ni columnas parciales.
- [ ] Zoom del navegador a 200 %: texto legible, controles alcanzables y pasaje conservado tras repaginar.
- [ ] Probar viewport angosto, medio y ancho; la lectura mantiene una sola pantalla visual, márgenes razonables e imágenes contenidas.
- [ ] En Balzac, revisar `pag-161` y `pag-392`: párrafos largos continúan entre pantallas sin pérdida, duplicación ni corte horizontal.
- [ ] En Arlt, revisar portada, logo y `pag-104`: imágenes no desplazan el pasaje después de aparecer y headings no quedan aislados de forma grave.

## Red y fallos

- [ ] Con throttling “Slow 3G”, abrir libro y avanzar hasta cargar otro lote: placeholder estable, controles utilizables y sin repaginaciones repetidas.
- [ ] Tras una carga correcta, activar offline y recorrer sólo contenido ya cargado; registrar comportamiento al requerir un fragmento nuevo.
- [ ] Bloquear una imagen: el texto sigue disponible y la repaginación termina tras el timeout.
- [ ] Bloquear un `pag-N.html`: aparece error recuperable o fallback; no se pierde el progreso anterior.
- [ ] Probar manifest inválido/404 en entorno controlado: ofrece volver a ficha y lector clásico.

## Criterio de cierre

- [ ] No hay salto perceptible que cambie el pasaje tras cargar imagen, fragmento, fuente, rotación o preferencia.
- [ ] Ninguna superficie presenta `pag-N` como página visible o como progreso para el lector.
- [ ] Las cabeceras HTTP reales y cualquier incompatibilidad se anexaron al spike de riesgos.
- [ ] Los fallos encontrados tienen libro, recurso, navegador y pasos reproducibles.
