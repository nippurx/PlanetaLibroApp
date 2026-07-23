## Context

La biblioteca autenticada obtiene actualmente una lista ordenada por última lectura y presenta los primeros elementos mediante cortes posicionales. La UI muestra categorías y progreso, pero el contrato actual no aporta estados canónicos de biblioteca ni un denominador de progreso, y algunos controles no navegan ni cambian el contenido.

El cambio cruza frontend, contrato API y posiblemente persistencia. Debe conservar `/app/library`, las URIs de libros, las rutas de lector, audio y detalle, la frontera entre React y la API PHP, y la convivencia prolongada con PlanetaLibro legacy. Antes de modificar datos se deberán auditar `user_books`, `user_books_log`, sus columnas y consumidores reales; la representación persistente de los estados permanece `NO CONFIRMADA`.

La biblioteca es una superficie autenticada y no debe alterar contenido público indexable. La experiencia debe ser mobile-first, accesible y capaz de crecer sin cargar ni renderizar el catálogo personal completo en una sola respuesta.

## Goals / Non-Goals

**Goals:**

- Convertir la biblioteca en una representación confiable del ciclo de lectura.
- Permitir retomar rápidamente libros y audiolibros con actividad incompleta.
- Separar claramente contenido por leer, terminado y abandonado mediante estados reales.
- Proporcionar cantidades, orden, búsqueda dentro de la biblioteca y vistas completas paginadas.
- Conservar acciones explícitas de lectura y audio y el contexto útil de cada obra.
- Ofrecer carruseles resumidos en móvil y listas verticales compactas en todas las vistas completas, también en escritorio.
- Eliminar controles aparentes y cubrir carga, vacío, error recuperable y éxito.

**Non-Goals:**

- Añadir libros desde “Mi Biblioteca” o reincorporar “Nuevo libro”/“Añadir libro”.
- Implementar descargas offline o copiar el icono de descarga de Headway.
- Incorporar un reproductor persistente o promociones superpuestas.
- Modificar PlanetaLibro legacy, URLs públicas, SEO, autenticación o reglas de suscripción.
- Definir una migración de base de datos antes de completar la auditoría del esquema y sus consumidores.

## Decisions

### 1. El backend será la autoridad de clasificación

La API autenticada expondrá para cada pertenencia a biblioteca un estado canónico y las marcas temporales necesarias. El frontend no inferirá estados mediante la posición del elemento, cortes de array ni reglas duplicadas.

Estados de dominio objetivo:

- `unread`: pertenece a la biblioteca y todavía no se inició.
- `in_progress`: tiene actividad y no está terminado ni abandonado.
- `completed`: fue marcado o determinado como terminado por una regla canónica del servidor.
- `abandoned`: fue marcado como abandonado.

`Todos` será una vista, no un quinto estado, e incluirá todas las pertenencias. Por decisión del propietario no se agregarán tablas ni campos: los estados se derivarán exclusivamente de progreso, total de páginas y actividad existentes.

La clasificación tendrá esta prioridad:

1. `completed` cuando exista un total de páginas confiable, haya avance real y `current_page >= total_pages`.
2. `abandoned` cuando la última actividad disponible sea anterior a tres meses respecto del momento de la consulta.
3. `in_progress` cuando exista avance real de lectura o audio.
4. `unread` para las demás pertenencias.

La prioridad evita que un libro terminado hace más de tres meses sea reclasificado como abandonado. Cuando el total de páginas no esté disponible, el sistema no inferirá finalización.

**Alternativa considerada:** inferir todo en React a partir de `current_page` y `first_read`. Se descarta porque no distingue de forma confiable por leer, terminado y abandonado, y duplicaría reglas de negocio.

### 2. La API evolucionará de forma aditiva y paginada

El contrato de biblioteca agregará datos suficientes para estado, orden, cantidades y progreso sin retirar campos existentes. Los listados completos aceptarán un filtro de estado, búsqueda acotada y paginación con límites del servidor. Los resúmenes podrán obtenerse en una respuesta agregada o mediante endpoints acotados; la elección concreta deberá minimizar consultas y preservar compatibilidad.

El total de páginas se leerá de manera no materializante desde un `manifest.json` válido o desde `libroinfo.php`. La consulta de biblioteca no deberá publicar manifests, encolar regeneraciones ni escribir archivos. El progreso porcentual solo se devolverá o calculará cuando exista un total confiable. Si no hay denominador, la UI mostrará la página actual o una acción para retomar, pero no fabricará un porcentaje.

**Alternativa considerada:** descargar toda la biblioteca y clasificarla en el cliente. Se descarta por escalabilidad, cantidades potencialmente incorrectas y falta de una fuente única de verdad.

### 3. La pantalla inicial será un resumen por intención

La jerarquía será:

1. **Continuar**, con elementos `in_progress` ordenados por actividad más reciente.
2. **Por leer**, con elementos `unread` ordenados por incorporación más reciente.
3. **Terminados**, con elementos `completed` ordenados por finalización más reciente.
4. Acceso a **Todos**, con búsqueda dentro de la biblioteca.
5. **Abandonados** como filtro secundario dentro de Todos o del selector de estados.

Cada sección visible mostrará su cantidad real y una acción **Ver todo** cuando exista una vista completa. No se mostrará una sección vacía como carrusel sin contenido; se ofrecerá un vacío contextual cuando corresponda.

**Alternativa considerada:** pestañas principales para todos los estados. Se descarta para la portada móvil porque oculta simultáneamente las distintas intenciones y reduce la capacidad de retomar contenido rápidamente. Las vistas completas sí podrán usar filtros.

### 4. Se conservarán acciones explícitas y se definirán dos presentaciones complementarias

Los resúmenes y las vistas completas compartirán el mismo modelo de datos, pero utilizarán componentes visuales distintos:

- La tarjeta de resumen priorizará portada y reconocimiento visual.
- La fila de lista priorizará exploración rápida, información y administración de colecciones extensas.

Cada fila de “Ver todo” tendrá una estructura estable:

1. Portada a la izquierda con proporción consistente.
2. Columna flexible con título de hasta dos líneas, autor de una línea y progreso útil.
3. Zona de acciones con **Leer** y **Escuchar** cuando correspondan.
4. Menú contextual para información y otras acciones secundarias implementadas.
5. Separador visual entre filas.

En móvil, las acciones **Leer** y **Escuchar** se presentarán como botones compactos centrados con solo su icono visible. Conservarán nombres accesibles completos; desde el breakpoint de escritorio podrán mostrar icono y texto cuando no estén bajo una portada.

Cuando estas acciones aparezcan debajo de una portada, su contenedor ocupará el 100 % del ancho de la tapa en cualquier viewport. Un único botón ocupará todo el ancho; dos botones se repartirán el espacio en partes iguales con sus iconos centrados y sin texto visible.

El título y el autor se truncarán sin desplazar ni ocultar las acciones. La fila podrá abrir la acción primaria o el detalle según el contrato de navegación definido, mientras que los botones internos conservarán destinos independientes y áreas táctiles suficientes.

No se copiará la acción de descarga observada en Headway: mientras no exista un contrato offline, la UI no mostrará un icono que pueda interpretarse como descarga. El menú contextual tampoco contendrá opciones sin implementación.

La búsqueda global seguirá siendo el lugar para descubrir o incorporar contenido. La búsqueda de **Todos** solo filtrará obras que ya pertenecen a la biblioteca.

### 5. Las vistas “Ver todo” usarán una lista vertical en todos los viewports

En móvil, las secciones resumidas usarán carruseles horizontales con indicadores visuales de desbordamiento y controles accesibles. En escritorio, cada carrusel horizontal mostrará flechas anterior/siguiente que desplazarán la colección y se desactivarán al alcanzar sus extremos. **Ver todo** abrirá la lista completa con la misma clasificación y cantidad del resumen.

Toda vista “Ver todo” se presentará como una lista vertical de una columna:

- En móvil ocupará el ancho disponible con márgenes y áreas táctiles apropiadas.
- En escritorio se centrará dentro de un ancho máximo legible en lugar de expandir las filas de borde a borde o convertirlas en una cuadrícula.
- Cada página o bloque incremental mantendrá el mismo orden y anatomía de filas.

El encabezado de la vista completa incluirá volver, nombre de la colección y cantidad total. También expondrá un control de ordenamiento con opciones reales definidas por el dominio; el orden activo será identificable, accesible y restaurable mediante URL o estado de navegación.

La disponibilidad inicial de opciones dependerá del estado:

- **Continuar**: actividad reciente como orden predeterminado.
- **Por leer**: incorporación reciente como orden predeterminado.
- **Terminados**: finalización reciente como orden predeterminado.
- **Todos**: actividad o incorporación reciente según la regla aprobada.

Invertir el orden será una capacidad mínima del control. No se mostrarán opciones que el backend no pueda aplicar de manera estable sobre toda la colección paginada.

**Alternativa considerada:** usar una cuadrícula en escritorio para las vistas completas. Se descarta por decisión del propietario para mantener el mismo patrón de exploración y administración en todos los viewports.

La navegación móvil identificará la sección como **Biblioteca** con un icono coherente. Se evitará repetir el título visible de la página cuando el encabezado del shell ya lo presenta.

### 6. Los controles se renderizarán únicamente cuando tengan contrato real

No se publicarán pestañas, enlaces, cantidades ni botones de acción sin destino o comportamiento comprobable. Se eliminarán anclas `#`, botones sin manejador y estados visuales estáticos que aparenten filtrado.

### 7. La compatibilidad y el despliegue serán incrementales

El contrato API se ampliará antes de conectar la nueva UI. Mientras la nueva experiencia no esté completa, `/app/library` conservará el comportamiento estable existente. El cambio podrá desplegarse por etapas y revertirse restaurando el consumidor anterior sin modificar URLs públicas.

## Risks / Trade-offs

- [Los estados deseados pueden no existir en el esquema actual] → Auditar tablas, columnas, queries y consumidores; documentar la decisión y usar una migración aditiva, compatible y reversible solo con aprobación.
- [El total de páginas puede no ser confiable para todo el catálogo] → Mostrar progreso porcentual únicamente cuando el servidor declare una base válida; usar página actual como alternativa honesta.
- [Las cantidades y listados pueden divergir] → Calcular ambos desde la misma regla canónica y probar invariantes por usuario y filtro.
- [Los carruseles pueden ocultar contenido] → Mostrar una porción siguiente, permitir teclado/gestos y ofrecer siempre “Ver todo”.
- [Una lista única puede desaprovechar ancho en pantallas grandes] → Centrarla con un ancho máximo legible y usar el espacio interno para mejorar título, autor, progreso y acciones sin cambiar a cuadrícula.
- [Ordenar una colección paginada solo en el cliente produciría resultados incompletos] → Aplicar el orden en el servidor antes de paginar y conservar el criterio en navegación, búsqueda y carga incremental.
- [Una respuesta agregada puede encarecer las consultas] → Medir el plan de consultas, limitar resúmenes y paginar vistas completas.
- [Los cambios de navegación móvil pueden afectar otras pantallas] → Limitar el ajuste a etiqueta, icono y estado activo; validar Inicio, Buscar y Biblioteca en rutas directas y recargas.
- [La transición puede exponer estados históricos ambiguos] → Definir una regla de compatibilidad documentada y no marcar automáticamente como terminado o abandonado sin evidencia.
- [Errores de codificación pueden reaparecer] → Mantener artefactos y fuentes en UTF-8 y añadir una revisión visual de textos en español.

## Migration Plan

1. Auditar el modelo actual de biblioteca y documentar la fuente de cada estado, fecha y progreso.
2. Definir el contrato API aditivo y las reglas canónicas, incluyendo autorización, paginación y compatibilidad.
3. Si se requieren datos nuevos, presentar y aprobar una migración versionada, reversible y compatible con legacy antes de ejecutarla.
4. Implementar y validar API, cantidades, filtros y casos vacíos sin retirar el contrato actual.
5. Implementar la lógica de dominio y componentes de UI detrás del contrato nuevo.
6. Validar móvil, escritorio, teclado, rutas directas, recarga, rendimiento y ausencia de cambios SEO/GEO.
7. Activar la nueva presentación de `/app/library`.

Rollback: restaurar la presentación y el consumidor anterior manteniendo los campos API aditivos. Cualquier dato o columna nueva se conservará durante el rollback; su eliminación requeriría otro cambio y autorización explícita.

## Open Questions

- La auditoría confirmó que `user_books` solo contiene progreso y actividad de lectura, mientras `user_video_audiolibros` contiene progreso y actividad de audio. Por decisión del propietario, los estados se derivan sin persistencia adicional.
- La biblioteca no dispone de un total de páginas en base de datos. Se consultará en modo lectura desde el manifiesto o metadato legacy; cuando no esté disponible se omitirá porcentaje y finalización.
- Los estados serán automáticos: finalización por última página y abandono por más de tres meses sin actividad. La primera versión no escribirá estados desde la UI.
- La API expondrá dos lecturas aditivas: un resumen acotado por secciones y un listado completo filtrado/paginado. El endpoint existente se conservará para compatibilidad.
