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

## Registro 2026-07-14 — retroceso desde salto de índice

- Diagnóstico: al saltar a un capítulo intermedio, la ventana cargada comenzaba en el fragmento anterior al destino. Al alcanzar su primera página visual, el control anterior quedaba deshabilitado y no existía carga retrospectiva.
- Corrección: el intento de retroceso desde el inicio de una ventana ahora carga el lote anterior, restaura el pasaje anclado tras el reflujo y continúa exactamente una página visual hacia atrás. El control anterior sólo se deshabilita en el inicio real del libro.
- Validación automática completada: `npm run build`, `git diff --check` y `openspec validate immersive-book-reader --strict` finalizaron correctamente.
- [ ] Repetir manualmente en PC con Arlt y Balzac: saltar a un capítulo intermedio, retroceder más allá del inicio de al menos dos ventanas y confirmar continuidad, ausencia de duplicación y límite real en el inicio del libro.
- [ ] Repetir el mismo recorrido en celular portrait y landscape mediante botón, toque lateral y swipe.
- Limitación de esta ejecución: el navegador automatizado rechazó el acceso a `localhost:4173` por una preferencia de seguridad del usuario; no se atribuye validación visual de PC o celular.

## Registro 2026-07-14 — revelado rápido desde índice

- Implementación: el salto espera sólo el fragmento anterior y el destino. Después de revelar y anclar el capítulo, precarga en segundo plano hasta completar una ventana máxima de ocho fragmentos.
- La precarga posterior no debe mostrar “Ajustando la página…”. El placeholder queda reservado para cargas que una navegación solicita al cruzar un borde todavía no disponible.
- [x] En Arlt y Balzac, saltar desde el inicio a un capítulo cercano al final y comparar el tiempo hasta ver el título con la implementación anterior. Confirmado en PC y celular.
- [x] Confirmar que el capítulo permanece estable mientras llegan los fragmentos posteriores, sin salto de pasaje, duplicación ni overlay bloqueante. Confirmado en celular portrait/landscape y PC.
- [x] Repetir con red normal en PC y celular.
- [ ] Repetir con Slow 3G en PC y celular. No probado.

## Registro 2026-07-14 — compatibilidad legacy en producción

- [x] API y app desplegadas con el endpoint de materialización legacy.
- [x] PHP pudo crear `manifest.json` dentro de la carpeta legacy de `homero-odisea-res`.
- [x] Esquema real de `ebook_regeneration_queue` compatible con el repositorio: clave única (`ebooks_books_id`, `target_generator`) y columnas de estado, timestamps y error presentes.
- [x] Primera apertura: generó manifest v2 de 120 páginas, 13 entradas de índice, dos assets y procedencia `legacy_source.compatibility_manifest=true`.
- [x] Cola: una única fila para `ebooks_books_id=75567`, estado `pending`, destino `epub2html2` y timestamp de manifest generado.
- [x] Segunda apertura: utilizó el manifest estático; el libro se leyó correctamente y no volvió a materializarlo mediante la API.
- [ ] Ejecutar dos primeras aperturas concurrentes sobre otro legacy sin manifest y confirmar un solo archivo/fila.
- [ ] Probar de forma controlada metadata inválida y fallos de permisos/cola, confirmando ausencia de temporales o manifests parciales.

## Registro 2026-07-15 — compatibilidad legacy adicional

- [x] `joseph-nguyen-no-te-creas-todo-lo-que-piensas`: primera apertura creó un manifest de 17 páginas, 10 entradas de índice y dos assets; fila única `pending` para `ebooks_books_id=75330`.
- [x] `homero-la-iliada`: primera apertura creó un manifest de 743 páginas, 32 entradas de índice y dos assets; fila única `pending` para `ebooks_books_id=68`.
- [x] Segunda apertura de ambos libros utilizó el manifest estático y no volvió a llamar al endpoint de materialización.
- [x] Ambos libros se pueden leer correctamente en el reader, cubriendo un legacy corto y otro excepcionalmente largo.
- [ ] Estas aperturas fueron sucesivas; todavía falta una primera apertura realmente simultánea sobre el mismo legacy sin manifest.

## Registro 2026-07-15 — URL compartible por fragmento

- [x] Los enlaces normales desde ficha, dashboard y audiolibro abren `/app/read/{libro_uri}/` sin `/1`.
- [x] La URL no se actualiza al avanzar: el historial permanece estable durante la lectura.
- [x] La acción Compartir genera `/app/read/{libro_uri}/{fragmento}` y usa Web Share o copia al portapapeles como fallback.
- [x] En PC, compartir una pantalla que cruce dos fragmentos y confirmar que se utiliza el primero aunque sólo tenga una porción mínima visible.
- [x] Repetir en celular portrait/landscape y en modo scroll.
- [x] Abrir el enlace compartido con progreso local en otra posición y confirmar que prevalece el fragmento indicado.
- [ ] Abrir directamente `/app/read/arlt-roberto-el-criador-de-gorilas/120` y confirmar que el primer texto pertenece a `pag-120.html`, sin contenido de `pag-119.html`.
- [x] El compartir nativo del celular fue confirmado en producción HTTPS.
- [x] Tras desplegar el shell Open Graph, compartir una URL numerada nueva y confirmar que WhatsApp muestra la tapa correcta, título y dominio PlanetaLibro.
- [ ] Abrir la tarjeta desde WhatsApp y confirmar que conserva `/app/read/{libro}/{N}` y carga el reader en el fragmento indicado.

## Registro 2026-07-19 — señaladores

- Implementación: señaladores privados múltiples en `user_book_annotations`, discriminados por `annotation_type='bookmark'`, con ancla puntual, contexto y color inicial fijo.
- La esquina superior derecha contiene un botón táctil permanente de 52 por 56 píxeles CSS. La cinta solo se ve cuando la ubicación está marcada; la zona siempre queda excluida del avance de página.
- El panel “Mis anotaciones” lista señaladores junto con notas y destacados, ofrece filtro propio, contexto, navegación y borrado.
- La API alterna creación/eliminación dentro de una transacción y elimina todos los duplicados equivalentes al quitar. No depende de las columnas generadas ni del índice único condicional que no pudo aplicarse en MySQL 5.7.44.
- [x] Tests frontend: la zona interactiva del extremo derecho no ejecuta navegación; 21 pruebas aprobadas.
- [x] Tests PHP: manifest y contrato de señaladores aprobados.
- [x] Build productivo, validación OpenSpec estricta y `git diff --check` aprobados.
- [ ] En celular portrait y landscape, tocar la esquina sin cinta: aparece el señalador y no avanza la página.
- [ ] Volver a tocar la cinta: desaparece y no avanza la página.
- [ ] Tocar el lateral derecho inmediatamente debajo del target: avanza exactamente una página.
- [ ] Crear varios señaladores en un mismo libro, recargar y comprobar que persisten.
- [ ] Abrir “Mis anotaciones”, filtrar “Señaladores” y navegar a cada ubicación.
- [ ] Repetir en temas claro, sepia y oscuro, modo paginado y continuo, teclado y lector de pantalla.
- Validación pendiente de entorno: prueba manual contra la base productiva migrada y comprobación visual móvil/escritorio.
- Corrección posterior: al cambiar de página, el punto visible se calculaba antes de terminar la transición de columnas y al retroceder podía conservar la geometría de la página anterior. Ahora se invalida durante el movimiento y se recalcula en `transitionend`, con fallback temporizado y cancelación de cálculos obsoletos.
- [ ] Regresión: avanzar desde una página señalada y volver atrás mediante toque, swipe, botón y teclado; la cinta debe reaparecer después de cada transición.
- Corrección PC: el toolbar superior podía quedar por encima de la zona del señalador e interceptar el clic. El target ahora está por encima del toolbar y el layout desktop reserva su ancho, sin modificar la grilla móvil.
- [ ] En PC, con controles visibles y ocultos, acercar el mouse y hacer clic en la esquina: debe agregar/quitar el señalador y no abrir preferencias ni avanzar.
- Segunda corrección PC: la activación ya no depende del `click` sintetizado; mouse y touch ejecutan en `pointerup`, mientras teclado conserva `click`. Un error de API ahora aparece visiblemente debajo de la barra negra.
- Diagnóstico confirmado en PC: el navegador conservaba un manifest anterior y la API respondió `stale_annotation_anchor`. Manifest y fragmentos ahora usan revalidación `no-cache`; ante un 409 el reader recarga contenido coherente automáticamente antes de permitir un nuevo intento.
- Corrección de navegación: “Ir al señalador” cierra el cuaderno sin devolver el foco al toolbar, por lo que la barra desaparece. Cerrar el panel normalmente conserva la restauración de foco accesible.
- Ajuste móvil: el señalador se ubica dentro del extremo derecho de la barra negra de PlanetaLibro, respetando safe-area. En desktop permanece debajo de esa barra.
- [ ] En celular portrait y landscape, comprobar que el señalador funciona dentro de la barra negra y que el botón `Tt` se puede activar con el menú visible.
- Corrección de redibujado: tras “Ir al señalador”, la cinta se activa cuando el ancla persistida intersecta la página visual, aunque el nuevo inicio de columna no coincida exactamente con el offset usado al crearla. Al quitarla se usa la ubicación real guardada.
