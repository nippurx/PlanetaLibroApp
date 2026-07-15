## Context

La app React ya expone `/read/:libro_uri/:page`, pero `ImmersiveReaderPage` contiene texto y controles estáticos. Los enlaces desde ficha, dashboard y audiolibro pasan `currentPage`; hoy el mapeo del cliente fija ese dato en `1` y el progreso en `0`. `AppShell` tiene un modo `immersive`, aunque todavía conserva navegación móvil ajena a la lectura.

El sistema publicado vive fuera de la app: para cada URI existe una carpeta `/lector/{first-letter}/{second-letter}/{first-token}/{book-uri}/` con `manifest.json` versión 2, `pag-N.html`, assets y `libroinfo.php`. `manifest.json` declara `pages`, `paginicio`, `index`, `chapters`, `assets` y `warnings`. Los fragmentos conservan HTML limitado, pero pueden contener URLs absolutas, estilos residuales y calidad variable; no son documentos completos ni equivalen a una pantalla física.

El reader legacy resuelve `/leerlibro/{book-uri}/{page}`, carga `libroinfo.php` y `pag-N.html`, actualiza `user_books.current_page` y registra una lectura. La API v1 de esta app sólo ofrece endpoints GET de catálogo; no expone manifest, contenido, sesión ni escritura de progreso. Por tanto, este diseño no presupone nuevos campos, tablas ni endpoints.

## Goals / Non-Goals

**Goals:**

- Producir una experiencia de lectura rápida, bella, refluible y sin distracciones sobre el formato publicado actual.
- Mantener `pag-N` como detalle interno de carga, nunca como identidad de progreso ni como página visible; la interfaz habla de capítulo, porcentaje y páginas visuales efímeras.
- Cubrir paginación visual predeterminada, scroll continuo alternativo, índice, preferencias, progreso recuperable y accesibilidad desde el MVP.
- Definir límites de seguridad, rendimiento y compatibilidad suficientes para implementar después sin tocar el publicador.

**Non-Goals:**

- Cambiar la publicación EPUB, su estructura física o las URLs legacy.
- Definir una nueva base de datos o afirmar un contrato remoto aún inexistente.
- Incluir búsqueda, anotaciones, marcadores, diccionario, voz u offline en el MVP.

## Decisions

### 1. Adaptador de fuente de libro, no acceso disperso

El reader dependerá de una abstracción de sólo lectura que obtenga y valide:

1. metadatos del libro por URI;
2. `manifest.json` desde la ubicación pública aprobada;
3. fragmentos `pag-N.html` dentro del rango `1..manifest.pages`;
4. assets pertenecientes a la misma carpeta publicada.

La implementación deberá centralizar la resolución de URL y nunca aceptar una ruta física o un nombre de fragmento arbitrario desde la entrada del usuario. La URI se valida/codifica y el índice se deriva exclusivamente del manifest validado. Producción sirve la app desde `https://planetalibro.net/app/` y los libros desde `https://planetalibro.net/lector/...`; ambas rutas comparten origen y CORS no es un bloqueo. No se necesita ni se inventa un endpoint intermediario en `api/v1`. En desarrollo y preview, Vite reenvía `/lector` al host publicado para conservar la misma forma de URL en el navegador.

`manifest.json` es la fuente primaria y React nunca descarga ni interpreta código PHP. Si la solicitud directa responde 404, React llama a `GET /api/v1/public/reader-manifest/{uri}`. La API deriva la carpeta sólo desde una URI validada y una raíz configurada, consulta el libro por URI, toma exclusivamente las asignaciones legacy permitidas de `libroinfo.php` mediante un parser limitado sin `eval`, valida rango y existencia contigua de fragmentos, y construye el contrato v2 mínimo.

La generación es idempotente y atómica: se serializa por libro mediante un lock, vuelve a comprobar si otro proceso creó el manifest, escribe un temporal en la misma carpeta, valida el JSON y lo renombra a `manifest.json`. Nunca sobrescribe un manifest existente. El endpoint devuelve el JSON en la misma respuesta para evitar una tercera solicitud. Los 404 de manifests ausentes no deben recibir caché negativa prolongada.

Al detectar el legacy, la API registra mediante `UPSERT` el `ebooks_books_id` en `ebook_regeneration_queue` con razón `legacy_compatibility_manifest`, estado inicial `pending` y destino `epub2html2`. La cola no bloquea futuras lecturas estáticas y conserva la necesidad de regenerar aunque ya exista el manifest temporal. `libroinfo.php`, `pag-N.html` y el publicador permanecen intactos.

### 2. Paginación visual predeterminada y scroll continuo alternativo

El MVP presenta por defecto una página visual refluible por viewport, con avance horizontal discreto de una pantalla completa. Los límites visuales se calculan después de aplicar viewport, fuente, tamaño, interlineado, márgenes e imágenes; nunca se toman de los límites de `pag-N`. Los fragmentos se concatenan internamente en orden dentro de un flujo lógico, sin títulos “Página N”, separadores, numeración técnica ni URLs de fragmento visibles.

El motor de layout medirá el flujo ya estilizado y construirá límites visuales reproducibles mediante columnas CSS del ancho útil del viewport. Columnas CSS es el motor definitivo del MVP después de las pruebas con contenido real. El MVP no incorpora medición explícita de rangos DOM ni introduce saltos artificiales para fijar una línea concreta en la parte superior.

El scroll vertical continuo se ofrece como modo alternativo desde preferencias. Ambos modos consumen el mismo contenido ordenado y comparten anclas, progreso, índice y sanitización. Cambiar de modo conserva el pasaje actual y recalcula su representación.

Para rapidez, no es obligatorio descargar el libro completo al abrir, pero el motor debe disponer de suficiente contenido anterior y posterior para calcular de forma estable la pantalla actual y la siguiente. Se carga primero la zona crítica que contiene el ancla restaurada. En un salto de índice, esa zona crítica comprende el fragmento anterior y el fragmento de destino; se revela apenas sus recursos críticos estabilizan el layout y los fragmentos posteriores de la ventana se precargan en segundo plano, sin volver a cubrir la lectura con el placeholder. Las cargas solicitadas al alcanzar un límite sí conservan el placeholder mientras restauran el ancla y completan la navegación. La portada (`pag-1`) es contenido; puede ocupar una página visual propia sin revelar su identificador técnico.

### 3. Contenido aislado y normalizado

Cada fragmento se parseará como HTML inerte y se sanitizará antes de renderizar. Como defensa adicional a la limpieza del publicador, se eliminarán scripts, estilos ejecutables, iframes, formularios, handlers y URLs/protocolos no permitidos. Los enlaces externos seguros conservarán aviso/contexto y `noopener`; los recursos relativos se resolverán sólo contra la carpeta del libro.

El CSS del reader dominará tipografía, colores, ancho e interlineado. Se preservarán estructura, énfasis, listas, citas, headings e imágenes; los estilos inline incompatibles no podrán romper tema, layout o accesibilidad. Un fallo de manifest o fragmento mostrará un estado recuperable y enlace a la ficha/lector legacy, sin renderizar contenido parcial engañoso.

### 4. Navegación basada en anclas de contenido

La ubicación canónica será un ancla derivada del contenido, no un `fragmentIndex`, un número de página visual ni un desplazamiento en píxeles. Como mínimo combinará contexto textual normalizado y posición estructural dentro del flujo, por ejemplo una ruta de bloque más offset de caracteres y citas de texto anterior/posterior. El algoritmo exacto se validará con HTML real y deberá resolver el ancla cuando cambien fuente, márgenes, viewport o modo de lectura. `pag-N` puede utilizarse sólo como pista de carga o fallback legacy, nunca como identidad persistida principal.

No se añade el ancla a ninguna API hasta validar el contrato remoto. Si sólo existe `current_page` legacy, éste sirve para acotar la búsqueda inicial; después el reader produce un ancla interna. Ante una regeneración que cambie el contenido, la restauración intenta coincidencia exacta, luego contextual/estructural y finalmente un fallback válido cercano.

- Índice: se construye de `manifest.index`, respeta `nivel`, salta al fragmento indicado y enfoca/anuncia el destino.
- Anterior/siguiente en modo paginado: toque o clic en zona lateral, swipe horizontal, flechas, Page Up/Down, Space y controles visibles avanzan o retroceden exactamente una página visual. El centro revela controles y los elementos interactivos del libro no disparan navegación lateral.
- Modo scroll: conserva scroll táctil, rueda y teclado como alternativas naturales, sin modificar el ancla canónica.
- Progreso: se calcula desde la posición del ancla dentro del flujo lógico y se expresa como porcentaje y capítulo actual. La UI puede indicar una página visual efímera dentro de la sesión, pero nunca equipara `pag-N` con esa página ni la persiste como ubicación.
- Historial: abrir/cerrar índice o preferencias no cambia la ubicación. Volver desde la ruta del reader lleva a la ficha del libro o al origen de navegación disponible.

### 5. Controles inmersivos

El lienzo ocupa el viewport y no incluye la navegación global móvil del `AppShell`. Una acción central/toggle revela barra superior (volver, título, índice, preferencias) y barra inferior (capítulo, porcentaje y control de progreso); los controles se ocultan tras inactividad sólo si el foco no está dentro de ellos y no hay panel abierto. La lectura y los controles usan safe areas.

No habrá animación de hoja. Las transiciones serán discretas y se desactivarán con `prefers-reduced-motion`. Los controles esenciales nunca dependerán sólo de hover.

### 6. Preferencias de lectura

El MVP ofrece:

- tema claro, sepia y oscuro;
- una serif de lectura, una sans y una alternativa accesible disponibles realmente en el bundle/carga aprobada;
- tamaño tipográfico, interlineado y ancho/márgenes dentro de rangos seguros;
- alineación izquierda por defecto; no se ofrece justificado hasta comprobar separación silábica adecuada.

Se conservan como preferencias globales del lector en almacenamiento local con clave versionada y validación de valores. Se aplican antes de revelar contenido cuando sea posible para evitar destellos. La futura sincronización por usuario debe reutilizar el mismo modelo conceptual, pero no forma parte del contrato remoto del MVP.

Al cambiar preferencias, viewport o modo se captura el ancla del primer pasaje legible, se repagina o refluye el contenido y se resuelve esa ancla en la nueva página visual o posición de scroll; no se conserva un índice de página ni `scrollTop` absoluto. El pasaje anclado debe quedar visible inmediatamente después del reflujo y se procurará ubicarlo dentro de la mitad superior de la nueva página visual cuando los límites naturales de las columnas lo permitan. No se exige mantener exactamente la primera línea arriba: es aceptable que aparezca texto anterior en la misma página visual como resultado natural del cambio de fuente, tamaño, márgenes o viewport.

### 7. Progreso local primero y sincronización desacoplada

El cliente guarda de forma inmediata y limitada (debounce y eventos de salida/ocultamiento) la última ancla de contenido por URI, junto con versión del manifest o `generated_at` cuando esté disponible. Al abrir, la prioridad es:

1. ubicación explícita válida en la URL;
2. progreso local compatible;
3. progreso remoto compatible, cuando exista integración autenticada;
4. inicio del contenido asociado a `manifest.paginicio` válido;
5. inicio del libro.

La sincronización remota es una frontera separada: debe ser autenticada, tolerar fallos y definir cómo mapear la ubicación rica al `current_page` legacy. Un fallo remoto no interrumpe lectura ni borra progreso local. El contrato y la resolución “más reciente gana” u otra política quedan abiertos hasta inspeccionar autenticación y requisitos del backend.

### 8. Accesibilidad como comportamiento base

El contenido se presenta como región/article con headings preservados y orden DOM de lectura. Paneles usan diálogo/modal accesible cuando corresponda, gestionan foco de entrada/salida y permiten Escape. Botones tienen nombre accesible, estado y foco visible. Teclado y controles visibles cubren todas las acciones; toque lateral y swipe nunca son la única vía. En modo paginado, la tecnología asistiva puede recorrer el contenido sin que el ocultamiento visual de páginas altere el orden de lectura.

Los cambios de capítulo/ubicación solicitados se anuncian de forma no intrusiva. El tema cumple contraste WCAG AA para texto y controles; zoom del navegador y texto ampliado no ocultan contenido ni acciones. Se conserva `alt` aportado por el libro; un `alt` vacío sigue siendo decorativo y no se inventa una descripción.

## Risks / Trade-offs

- **[El entorno local no comparte origen con los libros publicados]** → usar el proxy Vite para `/lector`; producción es same-origin y no requiere cambios CORS ni un endpoint API intermedio.
- **[HTML histórico difiere de la whitelist del publicador v2]** → probar una muestra diversa, sanitizar en cliente y ofrecer error recuperable por fragmento/libro.
- **[Dos lectores intentan materializar el mismo legacy]** → lock por carpeta, comprobación doble y rename atómico; la cola usa una clave única idempotente.
- **[El proceso PHP no puede escribir en `/lector`]** → devolver error recuperable y lector clásico, registrar el fallo y documentar el permiso mínimo sólo para crear manifest y lock.
- **[Manifest temporal oculta que el libro sigue siendo legacy]** → incluir procedencia/warning en el JSON y mantener la regeneración pendiente en `ebook_regeneration_queue` hasta completar `epub2html2`.
- **[Carga completa consume memoria en libros largos]** → ventana de fragmentos, precarga acotada, caché y medición de memoria/rendimiento.
- **[Paginación cambia tras cargar fuentes o imágenes]** → esperar recursos críticos, reservar dimensiones, repaginar desde el ancla y no prometer un número visual estable antes de completar el layout.
- **[Columnas CSS redistribuyen verticalmente el pasaje tras el reflujo]** → aceptar el movimiento natural si el ancla permanece visible inmediatamente; priorizar la mitad superior cuando sea posible sin rangos DOM ni saltos artificiales.
- **[Virtualización altera límites visuales]** → mantener una ventana suficiente, placeholders medidos y resolver nuevamente el ancla antes de revelar la página.
- **[Ancla textual no resuelve tras regenerar el libro]** → combinar cita textual y ruta estructural, usar contexto, versionar el algoritmo y aplicar fallbacks sin convertir `pag-N` en identidad.
- **[Porcentaje aproximado no equivale a palabras leídas]** → evitar precisión engañosa y evaluar un índice textual futuro.
- **[Cambio de fuente/viewport invalida páginas visuales]** → repaginar y resolver el ancla del pasaje, nunca persistir el número visual ni píxeles.
- **[Progreso local y legacy divergen]** → desacoplar sincronización, no sobrescribir sin política y resolver el contrato antes de activar writes.
- **[Auto-ocultamiento perjudica teclado o lector de pantalla]** → mantener controles visibles con foco/panel abierto y ofrecer toggle explícito.

## Migration Plan

1. Confirmar desde los entornos de app el acceso real a manifests, fragmentos y assets de una muestra de libros.
2. Implementar el adaptador y reader detrás de la ruta existente, sin alterar `/leerlibro/...`.
3. Implementar y validar el motor de anclas, la paginación visual predeterminada y el modo alternativo de scroll.
4. Activar progreso local basado en anclas y conservar fallback a ficha o lector legacy ante incompatibilidad.
5. Validar rendimiento, accesibilidad, gestos y restauración tras repaginación en móvil/escritorio antes de dirigir todos los enlaces internos al reader nuevo.
6. Diseñar y desplegar la sincronización remota por separado, sólo después de acordar autenticación y contrato compatible.

Rollback: retirar los enlaces al reader nuevo o redirigir la ruta de app al lector legacy. Los archivos publicados y su publicador permanecen intactos, y el almacenamiento local nuevo puede ignorarse sin migración destructiva.

## Open Questions

1. Resuelta: la app vive en `https://planetalibro.net/app/` y `/lector/...` comparte origen. Queda por medir la caché efectiva, no CORS.
2. ¿La app recibirá `path_prefix` desde catálogo o derivará la convención de URI? La documentación exige no inventar rutas, aunque el publicador describe una derivación estable; debe elegirse una fuente contractual.
3. ¿Qué autenticación utilizará la app y qué contrato autorizado sincronizará progreso/preferencias? API v1 hoy es read-only.
4. ¿Debe mantenerse `:page` en la URL pública del reader React o migrarse a `/read/:libro_uri` conservando compatibilidad mediante redirect?
5. ¿Qué tamaño y diversidad tiene el corpus (libros muy largos, tablas, notas, idiomas RTL, imágenes internas) para fijar límites de ventana y soporte del MVP?
6. ¿El porcentaje debe ponderar caracteres/palabras del flujo normalizado o una métrica futura generada fuera del publicador? Para el MVP debe ser independiente de `pag-N`.
7. Resuelta: columnas CSS es el motor definitivo del MVP. La estabilidad exige visibilidad inmediata del pasaje anclado y prioriza la mitad superior, pero no una línea superior exacta; no se implementan rangos DOM ni saltos artificiales.
