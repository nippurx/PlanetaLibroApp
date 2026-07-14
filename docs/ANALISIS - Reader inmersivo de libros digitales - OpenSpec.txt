# ANALISIS - Reader inmersivo de libros digitales - OpenSpec

chat: https://chatgpt.com/g/g-p-69864a26ef5c8191938e158674235645-planetalibroapp/c/6a562c59-dbc8-83e9-bca6-a40d46c473b6


La clave no es copiar un Kindle visualmente: es copiar su sensación de lectura. Los mejores lectores eliminan distracciones, recuerdan exactamente dónde estabas y dejan que cada persona adapte la página a sus ojos.

El nuevo reader debería tratar los `pag-N.html` como fragmentos internos, nunca como “páginas” visibles para el lector. El usuario debe percibir un libro continuo, adaptable a celular, tablet y PC.

## Qué imitar

| Área            | Patrón que se repite en lectores exitosos                                                              | Decisión para PlanetaLibro                                           |
| --------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Inmersión       | Texto ocupa casi toda la pantalla; controles aparecen al tocar y luego desaparecen.                    | Modo lectura limpio, sin menú ni publicidad invadiendo el texto.     |
| Personalización | Kindle, Kobo, Apple Books y BookFusion permiten cambiar fuente, tamaño, interlineado, márgenes y tema. | Debe estar en el MVP y guardarse por usuario.                        |
| Navegación      | Toque/clic en laterales, swipe, teclado y barra de progreso. Índice siempre accesible.                 | Soportar todos; no obligar a usar botones pequeños.                  |
| Continuidad     | La posición, marcadores y notas se sincronizan; el usuario retoma sin pensar.                          | Guardar progreso local inmediato y sincronizar con servidor.         |
| Consulta        | Diccionario, búsqueda, resaltados y notas convierten una lectura en una herramienta.                   | Búsqueda y marcadores primero; resaltados/notas como siguiente fase. |
| Accesibilidad   | Tipografía ajustable, contraste, modo oscuro y navegación por teclado.                                 | Debe ser requisito central, no extra.                                |

Kobo pone especial énfasis en fuente, tamaño, márgenes, interlineado, alineación, tema y transición de página; Apple Books añade navegación a una ubicación concreta, objetivos de lectura y controles de apariencia. [Kobo](https://help.kobo.com/hc/en-us/articles/360017865293-Adjust-page-margins-line-spacing-and-more-on-the-Kobo-Books-app-iOS-Android), [Apple Books](https://support.apple.com/guide/iphone/read-books-iphc1af7c57/ios)

Kindle y Google Play Books consolidan el otro núcleo: búsqueda interna, diccionario, resaltados, notas y marcadores. [Kindle](https://read.amazon.com/landing), [Google Play Books](https://support.google.com/googleplay/answer/3165868?co=GENIE.Platform%3DAndroid&hl=en)

## Qué dicen los lectores

Es investigación cualitativa, no una encuesta estadística, pero hay patrones muy claros:

* La tipografía no es decoración: los usuarios ajustan tamaño, márgenes e interlineado hasta encontrar una página que les resulte cómoda; describen menos fatiga y mejor seguimiento de línea. [Discusión en r/kobo](https://www.reddit.com/r/kobo/comments/1gewa20/i_think_ive_finally_found_my_perfect_page_setup/)
* Los detalles que parecen menores importan: barra de progreso útil, capítulo actual, hora, marcador visible y ajustes rápidos. Usuarios que comparan Kobo con Kindle valoran justamente esos elementos. [Comparación de usuarios](https://www.reddit.com/r/kobo/comments/1askpyw/kobo_vs_kindle_why_switch_to_kobo/)
* La lentitud, bloqueos o interrupciones rompen la lectura de inmediato. El paso de página y la restauración de posición deben sentirse instantáneos. [Queja de rendimiento Kindle](https://www.reddit.com/r/kindle/comments/1nw3ua2/these_kindle_updates_are_making_me_hate_my_kindle/)
* Los lectores agradecen poder leer en oscuro, buscar, usar diccionario y llevar una biblioteca completa; no piden una interfaz cargada de funciones sociales. [Experiencia de lectores](https://www.reddit.com/r/books/comments/l3ote8/is_enjoying_an_ereader_an_acquired_taste_first/)

Mi conclusión: la belleza del reader vendrá más de una tipografía excelente, mucho aire, movimiento fluido y controles discretos que de animaciones espectaculares.

## Propuesta de feature para OpenSpec

Nombre sugerido: `immersive-book-reader`

Capacidades:

1. `immersive-reading`

   * Canvas de lectura sin distracciones.
   * Barra superior temporal: volver, título, índice, ajustes.
   * Barra inferior temporal: capítulo, porcentaje y progreso.
   * Sin efecto “pasar hoja” por defecto; transición sutil y respetuosa de `reduce motion`.

2. `reader-navigation`

   * Toque/clic lateral, swipe horizontal y teclado: flechas, espacio, Page Up/Down.
   * Índice jerárquico desde `manifest.json`.
   * Barra de progreso con marcas de capítulos.
   * Volver a la ubicación anterior tras abrir índice o búsqueda.

3. `reading-preferences`

   * Temas: claro, sepia y oscuro.
   * Fuentes iniciales: una serif de lectura, una sans y una accesible.
   * Tamaño, interlineado y márgenes.
   * Alineación: justificada solo cuando haya separación silábica adecuada; si no, alineación izquierda para evitar espacios incómodos.
   * Preferencias guardadas por usuario y aplicadas antes de mostrar el texto.

4. `reading-progress`

   * Retomar exactamente donde se abandonó el libro.
   * Mostrar porcentaje y capítulo, no depender de “página 37 de 120” porque el texto se refluye según pantalla y fuente.
   * Progreso local instantáneo; guardado remoto en segundo plano.

5. `accessible-reader`

   * Contraste suficiente, foco visible, etiquetas para lectores de pantalla y navegación completa por teclado.
   * Imágenes con `alt` cuando el libro lo aporte.
   * No depender exclusivamente de gestos.

## Cómo encaja con tu formato actual

Tu `manifest.json` ya resuelve lo importante: total, índice y capítulos. Los `pag-N.html` son fragmentos lógicos, no páginas físicas. Por eso el reader debe:

* cargar el manifiesto;
* presentar el contenido como flujo continuo o paginación visual adaptable;
* usar `pag-N` internamente para cargar contenido y guardar posición;
* mostrar al lector porcentaje, capítulo y tiempo estimado, nunca la limitación técnica de esos fragmentos.

Para una primera versión hermosa y realista, recomiendo comenzar con lectura vertical continua en móvil y una opción de paginación visual para escritorio/tablet. La paginación horizontal perfecta puede ser una segunda iteración: requiere unir o virtualizar fragmentos para que el final de `pag-N` no produzca cortes artificiales.

## Prioridad

**MVP:** inmersión, índice, progreso guardado, temas, fuente/tamaño/interlineado/márgenes, navegación táctil-teclado y accesibilidad.

**Siguiente versión:** búsqueda interna, marcadores, resaltados y notas.

**Después:** perfiles de lectura guardados, exportación de notas, diccionario, lectura en voz alta y modo offline/PWA.

No pondría aún: red social, gamificación, animación de hoja, IA conversando sobre el libro ni demasiados botones. Son cosas que distraen del objetivo principal: que alguien abra PlanetaLibro y sienta ganas de quedarse leyendo.
