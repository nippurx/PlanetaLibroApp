# Investigación para PlanetaLibro Reading Style Standard

https://chatgpt.com/g/g-p-69864a26ef5c8191938e158674235645-planetalibroapp/c/6a58b37d-f30c-83e9-9cfe-dc28d058e5b7

## Resumen ejecutivo y metodología

### Resumen ejecutivo

La conclusión central es nítida: **PlanetaLibro Reader no debería “aplanar” todos los EPUB hasta volverlos visualmente idénticos, pero tampoco debería obedecer ciegamente el CSS del editor**. En libros reflowable, la política más robusta es una combinación de cuatro principios: **preservar semántica**, **estandarizar la lectura continua**, **dar prioridad a accesibilidad y preferencias del usuario**, y **tratar como excepciones controladas los formatos cuyo espaciado o composición sí tienen significado**. Ese enfoque coincide con el modelo de EPUB como contenido semántico reflowable, con WCAG cuando exige que el contenido tolere cambios de espaciado, ancho y color, y con Readium CSS cuando clasifica fuente, tamaño, interlineado, alineación, hyphenation, longitud de línea y temas como ajustes que un reading system debe poder imponer si los expone al usuario. citeturn6search0turn6search19turn20search3turn20search7turn5search2turn5search4turn5search6

En otras palabras, **el estándar visual de PlanetaLibro debe dominar el cuerpo de lectura**, mientras que **la fidelidad editorial debe reservarse para estructuras semánticamente cargadas**: poesía, teatro, código, tablas, notas, cartas, epígrafes, imágenes, SVG con función informativa, texto RTL/vertical y fixed-layout. Además, **el contenido del libro no debería vivir en el mismo contexto CSS/DOM que la interfaz del reader**; la estrategia más segura es renderizar el contenido en un contexto aislado, idealmente un `iframe` sandboxeado y servido desde origen separado, reforzado por CSP, con sanitización previa del HTML/CSS y una capa posterior de normalización estructural. Shadow DOM y `@layer` ayudan, pero no sustituyen una frontera de seguridad real. citeturn18search2turn18search8turn18search18turn6search3turn24search2turn21search1turn21search2turn21search17turn21search9turn22search0

La respuesta directa a la pregunta final del encargo es esta: **PlanetaLibro Reader debería eliminar lo peligroso, reemplazar lo meramente decorativo, limitar lo desproporcionado y conservar lo que porta significado**. Eso implica, por ejemplo, **reemplazar** tipografía de cuerpo, colores de texto/fondo del cuerpo, márgenes, tamaños absolutos extremos y espaciados arbitrarios; **limitar** encabezados, imágenes, tablas, sangrías, anchos/altos fijos y fuentes embebidas; **conservar** `em`, `strong`, `blockquote`, listas, notas, semántica de secciones, `lang`, `dir`, `writing-mode` y las estructuras de poemas/teatro/código; y **eliminar** scripts, eventos inline, `position: fixed`, `z-index` agresivo, `iframe`, formularios, recursos remotos no autorizados, `@import` remotos y CSS capaz de interferir con la UI. citeturn34view1turn34view2turn34view3turn7search5turn7search9turn21search0turn21search17turn22search0

### Decisiones recomendadas para PlanetaLibro

Las decisiones más importantes, orientadas a una v1 realista, son estas:

- **Usar modo predeterminado “Estándar PlanetaLibro”** para EPUB reflowable; no usar “diseño original del editor” como default. La mayoría de los lectores dominantes privilegia algún grado de control del usuario sobre fuente, tamaño, espaciado o tema, incluso cuando también ofrece una opción “Original” o “Publisher”. citeturn16search6turn16search3turn17search0turn17search5turn25search6turn27search0
- **Separar reflowable y fixed-layout desde el ingreso**. Si `rendition:layout` es `pre-paginated`, no aplicar el estándar de reflow como si fuera una novela. EPUB y los principales ecosistemas tratan fixed-layout como una categoría distinta. citeturn6search1turn6search16turn6search4turn17search2turn27search2turn37search4
- **Dar prioridad jerárquica a**: seguridad y accesibilidad → preferencia explícita del usuario → estándar PlanetaLibro → estilos editoriales semánticamente necesarios → estilos decorativos del EPUB. Readium CSS y WCAG empujan precisamente en esa dirección. citeturn5search2turn5search4turn5search6turn20search3turn20search7
- **Bloquear por defecto recursos remotos**, incluidas fuentes remotas, salvo un caso muy controlado y auditado. EPUB Reading Systems y EPUB 3 advierten riesgos de seguridad, privacidad y tracking por recursos remotos. citeturn34view2turn34view3turn7search14turn7search9
- **No permitir que el CSS del libro toque la UI del reader**. El contenido debe renderizarse en un contexto aislado; si eso no es posible, la alternativa mínima es sanitización severa, rehacer selectores y namespacear clases, sabiendo que es más frágil. citeturn21search2turn21search17turn21search9turn22search0
- **Definir una escala tipográfica propia** para cuerpo y encabezados, basada en `rem` y en una escala moderada, no en `px` heredados del libro. Readium CSS recomienda una `typeScale` configurable y base font size/line height centralizados. citeturn5search3turn5search5
- **Usar ancho de línea configurable y expresado como límite del cuerpo**, no como márgenes internos sueltos. Readium CSS migró explícitamente de “page margins” a “line length”; WCAG AAA recomienda no superar 80 caracteres o glifos, 40 en CJK. citeturn20search1turn20search18turn20search20turn20search3
- **No justificar por defecto en todos los casos**. La opción más sólida es: `start` por defecto en pantallas estrechas o cuando no haya hyphenation fiable; `justify` solo cuando el idioma esté marcado y la silabación funcione, siempre como preferencia configurable. Readium CSS vincula explícitamente alineación e hyphenation, y WCAG AAA desaconseja justificado como requisito de presentación visual. citeturn5search4turn23search0turn23search16turn20search3turn20search20
- **Aplicar una política de párrafos consistente**: o sangría o separación vertical, pero no ambas de forma acumulativa; y primer párrafo de sección sin sangría por defecto. Esto refleja práctica editorial consolidada y evita errores típicos de EPUBs convertidos desde Word/PDF. citeturn5search3turn5search6turn9search15
- **Preservar sin normalización agresiva poemas, teatro, código, tablas y notas**. En estos casos el layout sí es parte del sentido. DAISY lo subraya en poesía, notas, tablas y orden de lectura; Kindle y Apple también documentan semántica específica para notas. citeturn18search2turn18search1turn18search8turn18search18turn28search10turn28search22
- **Permitir fuentes embebidas solo como excepción controlada**, no como norma del cuerpo de texto. Kindle permite desactivar publisher fonts; Apple Books exige metadatos específicos para respetarlas; varios lectores ofrecen selección de fuente de usuario. citeturn25search6turn16search1turn16search6turn30search4turn27search0
- **En modo oscuro y sepia, reescribir el color del cuerpo y el fondo del cuerpo**. Los colores del EPUB solo deberían mantenerse cuando transmiten significado o forman parte de una imagen/SVG informativo. Apple Books exige atención explícita a color accesible y ofrece mecanismos especiales para dark themes; Google, Thorium y Readium también tratan tema y color como ajustes del reader. citeturn29search1turn29search10turn17search0turn17search5turn27search0turn5search4
- **Dar zoom o ampliación a imágenes grandes e informativas** en vez de forzarlas a un tamaño ilegible. Calibre y Thorium documentan ampliación de imágenes; DAISY insiste en alternativas textuales cuando hay texto relevante en imágenes. citeturn10view0turn27search9turn18search13
- **Versionar el estándar** mediante `style_version` y perfilar por libro qué transformaciones se aplicaron. EPUB heterogéneo exige trazabilidad para no romper obras especiales con futuras revisiones. citeturn6search0turn6search19turn5search3

### Fuentes y metodología

La investigación se realizó el **16 de julio de 2026** y priorizó **fuentes primarias**: especificaciones W3C/EPUB, documentación oficial de Apple, Amazon, Google, EDRLab/Thorium y Readium, además de la base técnica de DAISY. Se usaron fuentes secundarias solo cuando un producto no documenta públicamente su comportamiento interno o cuando la evidencia primaria es muy escasa, algo especialmente evidente en Adobe Digital Editions, Kobo para “publisher default”, Moon+ Reader y Lithium. citeturn6search0turn6search19turn35search0turn16search1turn25search6turn17search0turn27search2turn18search1

| Fuente | Fecha consultada | Tipo | Confiabilidad | Uso principal |
|---|---:|---|---|---|
| W3C EPUB 3.3 y EPUB Reading Systems 3.3/3.4 | 2026-07-16 | Especificación | Muy alta | Reflow/fixed-layout, seguridad, redes, formularios, spine, semántica |
| WCAG 2.2 y Understanding docs | 2026-07-16 | Estándar | Muy alta | Text spacing, visual presentation, idioma, landmarks |
| Readium CSS docs | 2026-07-16 | Documentación técnica oficial | Muy alta | Jerarquía de overrides, rangos recomendados, line length, themes |
| EDRLab Thorium docs | 2026-07-16 | Documentación oficial | Alta | Ajustes reales de un reader de referencia |
| Apple Books Asset Guide y User Guides | 2026-07-16 | Documentación oficial | Alta | Embedded fonts, dark themes, pop-up footnotes, user font “Original” |
| Amazon KDP docs | 2026-07-16 | Documentación oficial | Alta | Embedded fonts, footnotes, fixed-layout vs reflowable |
| Google Play Books Help/Partner docs | 2026-07-16 | Documentación oficial | Alta | Fuentes, espaciado, temas, fixed-layout support |
| DAISY Accessible Publishing KB | 2026-07-16 | Guías técnicas de organismo reconocido | Alta | Poesía, notas, imágenes, tablas, orden lógico |
| MDN / web.dev | 2026-07-16 | Documentación técnica de plataforma | Alta | `iframe` sandbox, CSP, Shadow DOM, `@layer`, `hyphens` |
| Manuales oficiales o listados oficiales de apps | 2026-07-16 | Manual / listing oficial | Media | PocketBook, FBReader, Moon+, Lithium, Calibre |
| Foros/comunidades o documentos institucionales de terceros | 2026-07-16 | Evidencia secundaria | Media-baja | ADE y comportamientos no documentados |

Las principales limitaciones fueron tres. Primero, **varios readers propietarios no publican cómo resuelven internamente la cascada CSS del EPUB**. Segundo, **la terminología comercial no siempre distingue bien entre EPUB reflowable, fixed-layout y “print replica”**. Tercero, **las apps móviles con poca documentación oficial obligan a inferir capacidades a partir de listados oficiales y changelogs**, por lo que en la comparación competitiva se separan expresamente las celdas **confirmadas**, **inferidas** y **no documentadas**. citeturn12search13turn12search7turn30search4turn13search3turn13search1turn31search3

## Estándares técnicos y hechos consolidados

### Estándares técnicos relevantes

**EPUB distingue de forma estructural entre reflowable y pre-paginated**. El atributo `rendition:layout` puede ser `reflowable` o `pre-paginated`; si no está presente, el valor por defecto es `reflowable`. Eso significa que un reader moderno no debería aplicar una normalización “novela-like” a obras fixed-layout, porque el propio estándar reconoce que allí el diseño forma parte esencial de la obra. citeturn6search1turn6search16turn6search4

**EPUB Reading Systems no obliga a soportar todo el modelo web**. La especificación deja como opcional el soporte de scripting, DOM completo y envío de formularios; además advierte que dar acceso de red incrementa riesgos de seguridad y privacidad, y recomienda notificar actividad de red y permitir su bloqueo. También señala que recursos remotos pueden ser comprometidos y usados para tracking, y que las cabeceras web clásicas de control de origen no funcionan limpiamente porque el origen real del EPUB depende de cada implementación. Para PlanetaLibro, esto justifica una postura fuerte: **sin scripts**, **sin formularios**, **sin iframes**, **sin red**, salvo excepciones muy controladas. citeturn34view1turn34view2turn34view3

**WCAG impone límites claros a cualquier intento de “uniformidad”**. La guía de visual presentation recomienda una anchura de hasta **80 caracteres o glifos**, no justificar como requisito, y permitir que el usuario seleccione colores; la guía de text spacing exige que el contenido siga funcionando si el usuario aumenta interlineado, espaciado entre párrafos, palabras y letras. Eso vuelve incompatible cualquier estándar que dependa de cajas rígidas, alturas fijas, clipping o hacks cuyo equilibrio se rompa al cambiar tamaño y espaciado. citeturn20search3turn20search20turn20search7

**Readium CSS es hoy la referencia técnica más útil para un reading system web moderno**. No es un estándar W3C, pero sí un marco consolidado y explícitamente orientado a implementadores. Clasifica `font-family` y `font-size` como user overrides imprescindibles; considera `line-height`, `text-align`, `hyphens`, espaciado de párrafos, indentación, `letter-spacing`, `word-spacing` y line length como overrides recomendables; y centraliza la presentación con variables para escala tipográfica, ritmo vertical, temas, márgenes/line length y color. En la práctica, es el modelo más cercano a lo que PlanetaLibro necesita construir. citeturn5search2turn5search3turn5search4turn5search5turn20search18

**DAISY refuerza una idea clave**: la semántica editorial importa más que la apariencia aislada. Sus guías insisten en marcar correctamente notas, poesía, asides, tablas, orden lógico de lectura e imágenes con alternativas textuales. En un reader que busca coherencia visual, esto obliga a **normalizar presentación sin destruir señales estructurales**. Un bloque poético no es “un párrafo raro”; una nota no es “un texto pequeño”; una tabla no es “un grupo de divs”. citeturn18search1turn18search2turn18search8turn18search18turn18search20turn18search13

### Preservación semántica

Las estructuras que **no deben destruirse** son, como mínimo, estas: jerarquía de encabezados; secciones y partes; listas; citas; versos y saltos de línea significativos; código y preformateado; tablas; figuras y captions; notas y enlaces de nota; idioma (`lang`); dirección (`dir`); modos de escritura (`writing-mode`); y cualquier semántica explícita `epub:type` que aporte navegación o comportamiento de lectura. El motivo no es académico: estas estructuras afectan navegación, screen readers, hyphenation correcta, orden de lectura y, en algunos casos, funciones nativas como pop-up footnotes. citeturn6search2turn24search0turn24search8turn24search12turn18search5turn18search16turn28search10turn28search22

La normalización estructural de PlanetaLibro debería reconocer patrones frecuentes de EPUB defectuoso y **transformarlos a una representación canónica sin perder sentido**. Ejemplos típicos: títulos hechos con `p` más `span` gigantes; sangrías hechas con `&nbsp;`; poemas simulados con múltiples `br`; notas como `sup` sin `noteref`; captions como párrafos sueltos después de una imagen; tablas convertidas a maquetas de bloques; y documentos sin `lang` o `dir`. En estos casos, el objetivo no es “limpiar por estilo”, sino **reconstruir una base semántica estable** para que el estándar visual del reader opere sobre algo coherente. Esa necesidad está alineada con EPUB, WCAG y la guía DAISY sobre orden de lectura y estructuras semánticas. citeturn18search18turn18search2turn18search8turn24search0turn24search2turn23search16

Conservar semántica también significa **no extrapolar de forma simplista el estilo del cuerpo a todo el documento**. `pre`, `code`, versos, dramatis personae, bibliografías, glosarios y definiciones deberían tener reglas propias. La documentación de Calibre y DAISY muestra justamente que el contenido no reflowable o ancho —como `pre` y tablas— necesita tratamiento especial; aplicar reglas generales de párrafo o justificación suele romperlo. citeturn10view0turn18search8turn18search18

## Comparación de lectores y patrones

### Comparación de lectores

**Leyenda**:  
**C** = confirmado por documentación oficial o manual oficial.  
**I** = inferido a partir de evidencia secundaria confiable.  
**ND** = no documentado públicamente con suficiente precisión.

#### Matriz comparativa

| Lector / plataforma | Fuente editor respetada | Desactivar fuente editor | Elegir fuente usuario | Cambiar tamaño | Interlineado | Márgenes / ancho | Alineación | Tema oscuro | Scroll vertical | Paginación | Fixed-layout | Notas al pie / popup | Configuración por libro / global | Uniformidad entre libros |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Amazon Kindle | C | C | C | C | I | I | I | C | I | C | C | C | I | Alta |
| Kobo | ND | ND | C | C | C | C | ND | C | ND | C | ND | ND | ND | Media-alta |
| Apple Books | C | C | C | C | C | C | C | C | C | C | C | C | I | Alta |
| Google Play Books | C | ND | C | C | C | I | C | C | C | C | C | ND | ND | Alta |
| Readium CSS / apps basadas en Readium | C | I | C | C | C | C | C | C | C | C | C | I | I | Alta |
| Thorium Reader | C | I | C | C | C | C | C | C | C | C | C | C | I | Alta |
| PocketBook | ND | ND | C | C | C | C | ND | C | ND | C | C | ND | ND | Media |
| Adobe Digital Editions | ND | ND | ND | C | ND | ND | ND | ND | ND | I | I | ND | ND | Baja-media |
| Calibre Ebook Viewer | C | I | C | C | I | C | I | C | C | C | C | I | C | Alta |
| Moon+ Reader | ND | ND | I | C | C | ND | C | C | C | C | ND | ND | ND | Media-alta |
| Lithium | ND | ND | ND | I | ND | ND | ND | C | C | C | ND | ND | ND | Alta |
| FBReader | C | C | C | C | I | C | C | C | ND | C | I | ND | ND | Media |

#### Notas de confirmación y límites

Kindle confirma soporte de fuentes embebidas y que el usuario puede activar o desactivar publisher-provided fonts; la guía de KDP también documenta el marcado recomendado para footnotes y la separación entre reflowable y fixed-layout / Print Replica. Sin embargo, **Amazon no documenta públicamente con detalle fino cómo resuelve cada conflicto CSS interno**, así que varias celdas quedan como inferidas. citeturn25search6turn28search10turn37search4turn37search7turn37search23

Apple Books documenta de forma especialmente clara la convivencia entre preferencia de usuario y estilo editorial: el usuario puede elegir fuente, incluyendo “Original”; el sistema respeta fuentes embebidas solo si el EPUB declara correctamente que contiene fuentes; soporta pop-up footnotes con marcado semántico; y su Asset Guide da reglas específicas para dark themes y contraste. Por eso aparece como el lector con **comportamiento oficial más explícito** entre los sistemas comerciales principales. citeturn16search6turn16search3turn16search1turn27search20turn29search10turn29search1

Google Play Books documenta cambio de fuente, tamaño, interlineado, alineación, color y layouts de página; además su Partner Center confirma soporte para fixed-layout en EPUB 2 y EPUB 3. No documenta tan claramente la política interna de respeto o anulación de estilos editoriales, aunque la existencia de opción “Original” en UX actual es ampliamente conocida; por prudencia, la matriz deja ese punto como confirmado solo cuando la ayuda lo dice de forma explícita para “algunos ebooks”. citeturn17search0turn17search5turn31search9turn31search16turn17search2

Thorium y, en términos de implementación, Readium CSS, son las referencias más útiles para PlanetaLibro. Thorium expone tipografía, tamaño, espaciados, márgenes, word spacing, letter spacing, scroll/pagination, columnas, justificación, zoom de imágenes y fixed-layout; Readium CSS explica además qué overrides deberían considerarse del usuario y cuáles pertenecen al chrome del reading system. citeturn27search0turn27search2turn27search9turn5search2turn5search4turn20search18

PocketBook, Calibre, FBReader, Moon+ Reader y Lithium muestran un patrón común: **la lectura confortable se logra imponiendo bastantes ajustes del reader sobre el libro**, incluso cuando se soportan EPUB/CSS relativamente amplios. PocketBook documenta tamaño, interlineado, márgenes y hyphenation; Calibre usa hoja de estilo global aplicada a todos los libros y ofrece paged/flow; FBReader expone preferencias para aplicar o ignorar CSS del EPUB y soporta fuentes embebidas; Moon+ y Lithium declaran opciones fuertes de tema, paginación/scroll y personalización, pero con documentación técnica pública mucho más pobre. citeturn11search0turn11search9turn10view0turn31search13turn15search1turn13search3turn13search1turn31search3

Adobe Digital Editions sigue siendo importante por ecosistema y DRM, pero su comportamiento tipográfico y CSS público está **mucho peor documentado** que el de Thorium, Apple, Google o Readium. La evidencia oficial accesible hoy confirma al menos ajuste de tamaño de texto EPUB y soporte de alto contraste / screen readers, pero no ofrece una guía pública detallada sobre anulación de CSS. Por eso, **no conviene usar ADE como modelo principal** para definir el estándar futuro de PlanetaLibro. citeturn12search13turn12search7turn12search11

### Patrones comunes que sí aparecen de forma consistente

Aun con diferencias, hay un patrón muy estable en el mercado: **los lectores más maduros tienden a uniformar el cuerpo del texto y a reservar la fidelidad editorial para casos especiales**. Fuente del usuario, tamaño, tema, layout paginado o scroll, y en muchos casos espaciado o alineación, son controles cada vez más estándar. Lo inusual no es que el reader intervenga, sino que no intervenga. citeturn16search3turn17search5turn25search6turn27search0turn30search4turn10view0

El segundo patrón es que **fixed-layout se maneja como otra especie de libro**. Apple, Google, Thorium, EPUB/W3C y Amazon lo tratan así. De ahí se deduce una decisión fuerte: **PlanetaLibro Reader v1 no debería intentar unificar fixed-layout y reflowable bajo una sola política visual**. Necesitan pipelines distintos. citeturn6search1turn6search16turn17search2turn27search2turn37search4

El tercer patrón es que **las notas semánticamente bien marcadas reciben mejor tratamiento**. Apple y Amazon documentan pop-up footnotes; Thorium tiene soporte específico y discusión pública sobre este comportamiento; DAISY insiste en el uso correcto de notas y `epub:type`. Esto favorece una estrategia de PlanetaLibro basada en semántica detectada, no en heurísticas meramente visuales. citeturn27search20turn28search10turn27search1turn18search1turn18search5

## Recomendación tipográfica y políticas de estilo

### Estándares tipográficos de lectura

Para **cuerpo de lectura prolongada**, la recomendación más sólida no es un número único, sino un sistema con topes y ajustes. La base debería definirse en `rem`, con una escala tipográfica controlada por variables del reader. Readium CSS usa justamente un tamaño base y una `typeScale` configurable; además recomienda un rango de usuario del **75% al 250%** para font-size y de **1 a 2** para line-height. Como estándar inicial de PlanetaLibro, conviene partir de un **cuerpo base de 1rem** con presets equivalentes aproximadamente a **15–22 px** para lectura habitual y un rango accesible más amplio a través del slider. citeturn5search3turn5search5turn5search4

Para **interlineado**, el mejor compromiso inicial está alrededor de **1.45–1.65** para prosa continua, dejando al usuario subir hasta **2** cuando lo necesite. WCAG AAA usa 1.5 como referencia de presentación visual; el Low Vision Task Force y varias guías accesibles también convergen hacia 1.5 o más para reducir fatiga visual. En poesía, teatro y formatos de ritmo visual deliberado, el interlineado original puede ser semántico y no debería sobrescribirse agresivamente. citeturn20search3turn36search14turn5search4turn18search2

Para **longitud de línea**, la orientación fuerte es limitar el ancho del bloque principal, no “achicar fuentes hasta que entren”. WCAG recomienda no superar **80 caracteres o glifos** —**40 en CJK**— y la literatura de legibilidad en pantalla converge aproximadamente en **50–75 caracteres**, con zonas útiles algo más amplias según fuente y dispositivo. En PlanetaLibro, el estándar debería usar un `max-inline-size` / `max-width` expresado en `ch` o con presets equivalentes, con defaults orientativos de:
- **móvil vertical**: sin columna múltiple, objetivo práctico **45–65 caracteres**;
- **tablet**: **50–75 caracteres**;
- **escritorio**: **55–80 caracteres**, evitando bloques excesivamente anchos;
- **CJK**: tope más bajo, en torno a **40 glifos** cuando aplique. citeturn20search3turn20search20turn20search2turn20search18

Para **márgenes y ancho de lectura**, conviene pensar en ellos como una sola decisión: el usuario debería poder elegir **ancho compacto / medio / amplio**, mientras el contenedor externo del viewport gestiona gutters físicos y el cuerpo interno gestiona line length. Readium CSS abandonó el ajuste de “page margins” en favor de “line length”, lo que es especialmente valioso en un reader web responsivo. citeturn20search1turn20search9turn20search15

Para **párrafos**, la decisión editorial más robusta es impedir la combinación de **gran sangría + gran espacio vertical**. En estándar PlanetaLibro, la prosa ordinaria debería usar una de estas dos convenciones:
- **novela / narrativa clásica**: sangría de primera línea moderada, sin espacio vertical entre párrafos;
- **ensayo / no ficción / lectura web-like**: sin sangría, con espacio vertical moderado.  
Además, el **primer párrafo después de título, subtítulo, separador o escena** debería comenzar **sin sangría**. La sangría recomendada, cuando se use, debería quedar en un rango de **1–1.5em**; si el usuario controla indentación, el rango razonable expuesto puede llegar hasta **3rem** como hace Readium, pero el default del estándar debe ser mucho más conservador. citeturn5search4turn5search6

Para **alineación**, la mejor regla práctica es esta: `text-align: start` como valor seguro y accesible; `justify` habilitable cuando el idioma esté bien marcado y la hyphenation funcione. Hyphenation automática depende del idioma y del soporte del motor; por eso `lang` no es adorno, sino infraestructura de legibilidad. citeturn23search0turn23search16turn24search0turn5search4

### Política de fuentes

La política de fuentes recomendada para PlanetaLibro debería separar claramente **fuente del usuario**, **fuente editorial embebida**, **fuente decorativa** y **fuente remota**.

La **fuente del usuario debe dominar el cuerpo de lectura** en modo estándar. Eso se alinea con Readium CSS, Apple Books, Google Play Books, Kobo, Thorium y Kindle, todos ecosistemas que exponen tipografías de lectura como control principal del usuario. citeturn5search2turn5search4turn16search3turn16search6turn17search5turn30search4turn27search0turn25search6

Las **fuentes editoriales embebidas** deberían tratarse así:

- **Fixed-layout**: respetarlas, salvo que generen un fallo técnico grave.
- **Reflowable en modo estándar**: no usarlas para cuerpo de texto por defecto.
- **Reflowable en modo “usar diseño del editor”**: permitirlas, siempre que sean locales al EPUB y pasen controles de licencia y cobertura de glifos.
- **Títulos decorativos muy específicos**: permitirlas caso por caso, si no rompen contraste ni legibilidad.

Esta política reproduce un patrón observable: Apple Books respeta embedded fonts solo si el EPUB declara correctamente que contiene fuentes; Kindle soporta embedded fonts, pero en dispositivos y apps KF8 el lector puede activar o desactivar publisher fonts. citeturn16search1turn25search6

Las **fuentes remotas cargadas desde Internet** deberían bloquearse en v1. EPUB permite ciertos recursos remotos, incluidas fuentes, pero tanto la especificación como EPUB Reading Systems destacan los riesgos de seguridad, privacidad y tracking. Para PlanetaLibro, el costo de permitirlas es mayor que el beneficio. citeturn7search14turn34view2turn34view3

Sobre **serif vs sans**, no hay una única respuesta universal para todos los lectores y todas las discapacidades. Para lectura general prolongada, una serif de pantalla bien elegida sigue siendo válida; para baja visión, varias guías accesibles favorecen sans serif; para dislexia, la evidencia sobre fuentes “especiales” como OpenDyslexic o Dyslexie es mixta o directamente débil, por lo que no conviene imponer una fuente “dislexia-friendly” como default universal. La mejor política es ofrecer al usuario:
- una **serif de lectura**;
- una **sans humanista**;
- una **sans de alta legibilidad**;
- una **monospace**;
- opcionalmente una **fuente accesible tipo dyslexia** como preferencia opt-in, no como estándar obligatorio. citeturn36search10turn36search3turn36search8turn36search2turn36search1

Para **fallback por idioma y script**, PlanetaLibro debe escoger stacks distintos para latín, CJK, RTL y vertical writing. Readium CSS ya dispone de estilosheets diferenciados para RTL y CJK, y MDN recuerda que `font-size-adjust` puede ayudar cuando el fallback cambia drásticamente la x-height. citeturn24search11turn15search12

### Política de colores y temas

El criterio general debería ser: **el reader controla color de cuerpo y fondos; el libro conserva solo colores con función semántica o gráfica real**.

En **modo claro**, el estándar puede permitir algún acento editorial normalizado —por ejemplo en links, separadores o blockquotes—, siempre que contraste y tema queden bajo control del reader. En **modo sepia, oscuro y alto contraste**, el fondo del cuerpo, el color principal del texto y la selección deben ser variables del reader. Readium CSS plantea explícitamente una API de temas basada en variables del usuario o del sistema, y Apple y Google exponen el tema como ajuste normal del lector. citeturn5search4turn17search0turn17search5turn16search6turn29search9

Los siguientes colorados del EPUB deberían **reemplazarse por defecto** en reflowable estándar:
- `background` y `background-color` del `html`, `body` y contenedores de lectura;
- `color` del cuerpo de texto, salvo excepciones semánticas;
- colores forzados negro/blanco que vuelvan invisible el texto en oscuro o sepia;
- bordes y sombras puramente decorativos que dependan de contraste fijo.  
Apple Books incluso documenta que, si se quieren mantener custom text colors en dark themes, hay que declararlo explícitamente y seguir reglas accesibles; esa excepcionalidad confirma que el default seguro es precisamente **no respetarlos indiscriminadamente**. citeturn29search10turn29search1

Los colores que sí deberían **conservarse o reinterpretarse** son:
- enlaces;
- semántica de aviso/éxito/error cuando el color no sea el único canal;
- código sintáctico, si existe;
- gráficos, diagramas, mapas y SVG informativos;
- resaltados del usuario y anotaciones.  
Apple Books insiste en que el color no debe ser el único medio para transmitir información y fija contrastes mínimos en fixed-layout; ese mismo principio debe trasladarse a reflowable. citeturn29search1

Para **imágenes transparentes y SVG en oscuro**, no conviene auto-invertir fotos ni ilustraciones de manera global. La política recomendada es:
- **fotos / raster**: nunca invertir automáticamente;
- **SVG/diagramas inline semánticos**: conservar color original, pero si el contraste se pierde, renderizarlos sobre una “canvas card” neutra del reader;
- **íconos decorativos no semánticos**: adaptarlos a tema si forman parte del layout estandarizado del reader, no del libro.  
Esto evita el clásico error de volver ilegible un mapa, una notación o un gráfico científico al “forzar dark mode”. citeturn18search13turn29search1

### Política de imágenes y formatos especiales

La regla general para imágenes debería ser **preservar proporción, limitar exceso, ofrecer ampliación**. En términos CSS y UX:
- `img`, `svg`, `video` con `max-width: 100%` y `height: auto`;
- límite vertical razonable en inline flow, por ejemplo alrededor de **70–85vh** según contexto;
- si la imagen excede eso o contiene texto/significado fino, habilitar **tap/click para zoom** o viewer ampliado.  
Calibre y Thorium documentan ampliación de imágenes; esa es la pista correcta para v1. citeturn10view0turn27search9

Las **imágenes pequeñas** y elementos inline no deberían escalarse arbitrariamente hasta llenar ancho; las **ilustraciones, mapas y diagramas** sí deberían poder expandirse. Las **portadas dentro del flujo** deberían normalizarse como `figure` o bloque centrado, pero no repetir una portada gigante si ya existe otra experiencia de portada en la UI. Las **capciones** deberían estandarizarse tipográficamente, pero conservar su relación con la imagen. citeturn18search13turn19search2

Las **tablas** deben conservar su semántica HTML, no convertirse en imágenes por defecto. En pantallas estrechas, el comportamiento recomendado es `overflow-x: auto` en un wrapper, manteniendo encabezados, asociaciones y notas cercanas. DAISY recomienda situar notas de tabla fuera de `tfoot` y agrupar tabla y notas dentro de `figure` cuando corresponda. citeturn18search8turn18search18

Los **poemas** exigen la política más cuidadosa de toda la v1. DAISY subraya que estructurar líneas y versos mejora el acceso para usuarios que no perciben la maquetación visual. La consecuencia práctica es: **no justificar**, **no colapsar saltos de línea significativos**, **no reindentarlos como prosa**, y aplicar en pantallas estrechas una preservación basada en `white-space: pre-wrap` o en estructura de líneas/versos si el HTML la ofrece. citeturn18search2

**Teatro, diarios, cartas y diálogos con nombres de personaje** deberían entrar en la categoría “layout con valor semántico medio-alto”. Se puede normalizar tipografía y color, pero hay que conservar alineaciones, espacios predecibles y separación funcional de voces o entradas. Algo similar vale para **código y preformateado**: debe conservar monospace y whitespace significativo, con wrapping controlado o scroll horizontal, nunca con body font normalizada. Calibre documenta precisamente que `pre` y las tablas son casos que a menudo requieren modo especial o CSS específico. citeturn10view0

En **notas**, la semántica ideal es `noteref` + `aside` / `footnote`. Amazon y Apple documentan exactamente ese patrón, y Thorium refuerza su relevancia operativa. PlanetaLibro debería soportar tres representaciones sobre la misma semántica:
- popup o sheet contextual en móvil;
- lateral / modal en escritorio si la experiencia lo permite;
- navegación al bloque de nota cuando la semántica sea incompleta o el lector lo prefiera. citeturn28search10turn28search22turn27search1

### Tabla de propiedades CSS

La siguiente tabla es una **recomendación normativa preliminar para PlanetaLibro Reader v1**.  
**Fases**: **S** = sanitización de seguridad; **N** = normalización estructural; **V** = estándar visual; **U** = preferencia del usuario. La clasificación sintetiza EPUB/W3C, WCAG, DAISY, Readium CSS y patrones observados en readers consolidados. citeturn6search0turn6search19turn20search3turn5search2turn5search4turn18search1turn21search2turn21search17

| Propiedad CSS | Conservar | Limitar | Reemplazar | Eliminar | Excepciones | Justificación | Fase |
|---|---|---|---|---|---|---|---|
| `font-family` | Semánticas especiales | Sí | Cuerpo sí | Remotas | `code`, poesía decorativa, FXL | Usuario debe controlar cuerpo; editor solo en casos especiales | S/V/U |
| `font-size` | Relativos locales | Sí | Cuerpo sí | Extremos absolutos | `sup/sub`, captions, notas | Escala propia con topes | N/V/U |
| `font-weight` | Sí | Sí | No | No | evitar pesos extremos si faltan glyphs | Valor semántico fuerte | V |
| `font-style` | Sí | No | No | No | `oblique` raro si rompe fallback | Valor semántico | V |
| `line-height` | Especiales | Sí | Cuerpo sí | No | poesía/código/FXL | Debe tolerar override del usuario | V/U |
| `letter-spacing` | Especiales | Sí | Cuerpo normalmente sí | Extremos | logotipos/titulares decorativos | WCAG exige adaptabilidad; abuso daña lectura | V/U |
| `word-spacing` | Especiales | Sí | Cuerpo normalmente sí | Extremos | poesía concreta / tablas raras | Igual que arriba | V/U |
| `text-align` | `center/right` intencional | Sí | Cuerpo normalmente sí | No | poesía, teatro, epígrafes | `justify` solo con hyphenation fiable | N/V/U |
| `text-indent` | Sí | Sí | Prosa común sí | No | poesía/código/listas | Evitar mezcla indebida con `margin-bottom` | N/V/U |
| `text-transform` | Sí | Sí | No | No | small caps falsas problemáticas | Puede ser semántico o decorativo leve | V |
| `text-decoration` | Sí | Sí | Links sí | No | tachado/subrayado con valor | Importa para énfasis y enlaces | V |
| `color` | Semántico | Sí | Cuerpo sí | Colores invisibles | diagramas/código/SVG | Temas del reader mandan en cuerpo | S/V/U |
| `background` | Imágenes/diagramas | Sí | Cuerpo sí | Fondos conflictivos | cards de tabla/SVG | Dark/sepia requieren control del reader | S/V |
| `margin` | Estructural moderado | Sí | Cuerpo sí | Negativos agresivos | imágenes, quotes, listas | Evitar saltos y acumulación errática | S/N/V |
| `padding` | Estructural moderado | Sí | A veces | Excesivo que rompa layout | tablas, cajas semánticas | Similar a márgenes | S/N/V |
| `width` | Especiales | Sí | Frecuente | Fijos problemáticos | tablas/FXL/figuras | Reflow no tolera anchuras rígidas | S/V |
| `height` | Especiales | Sí | Frecuente | Fijos problemáticos | FXL/media | Reflow + zoom lo rompen | S/V |
| `max-width` | Sí | Sí | No | No | imágenes/tablas/figuras | Muy útil para contener overflow | V |
| `max-height` | Sí | Sí | No | No | imágenes/zoom/media | Limitar sin deformar | V |
| `float` | Raro | Sí | Sí en móvil | Si rompe orden | maquetas heredadas puntuales | Floats suelen romper lectura estrecha | S/N/V |
| `position` | `static/relative` | Sí | Sí | `fixed` y absoluto peligroso | FXL | Riesgo de solapar UI y romper reflow | S |
| `display` | Sí | Sí | A veces | No | tablas/listas/inline semantics | No destruir semántica nativa | N/V |
| `overflow` | Local útil | Sí | A veces | `hidden` peligroso | tablas/código | Oculta texto y rompe zoom | S/V |
| `white-space` | Sí | Sí | No | No | poesía, `pre`, código | Muchas excepciones semánticas | N/V |
| `break-before` | Sí | Sí | A veces | No | capítulos, partes | Útil para secciones | N/V |
| `break-after` | Sí | Sí | A veces | No | capítulos, partes | Ídem | N/V |
| `break-inside` | Sí | Sí | A veces | No | figuras, tablas | Evitar cortes feos | V |
| `column-*` | Reader | Sí | Sí | Del EPUB en reflow | FXL | Columnas pertenecen al chrome del reader | V/U |
| `writing-mode` | Sí | No | No | No | vertical / CJK / casos especiales | Semántica internacional crítica | N/V |
| `direction` | Sí | No | No | No | RTL | Semántica internacional crítica | N/V |
| `hyphens` | Sí | Sí | Cuerpo quizá | No | depende de `lang` y motor | Debe coordinarse con alineación | V/U |
| `orphans` | Sí | Sí | No | No | soporte desigual | Tipografía fina, bajo riesgo | V |
| `widows` | Sí | Sí | No | No | soporte desigual | Tipografía fina, bajo riesgo | V |
| `z-index` | Casi nunca | Sí | No | Alto/agresivo | FXL muy controlado | Riesgo directo sobre la UI | S |

### Matriz por elemento HTML

La matriz siguiente define **el tratamiento recomendado por elemento**. Es una propuesta para la futura documentación `READING_STYLE_STANDARD.md`, no código final. Se apoya en HTML semántico, WCAG, DAISY y la práctica de readers modernos. citeturn6search10turn18search1turn18search2turn18search8turn24search0turn24search2

| Elemento | Función semántica | Estilo base recomendado | Conservar del original | Normalizar | Excepciones |
|---|---|---|---|---|---|
| `h1` | Título de parte/capítulo | Escala alta, peso fuerte, margen superior amplio | cursiva/peso/capitalización razonable | tamaño, color, espacios extremos | títulos decorativos opcionales |
| `h2` | Subtítulo / sección | Escala media-alta | idem `h1` | idem | idem |
| `h3` a `h6` | Jerarquía menor | Escala decreciente controlada | peso/itálica | tamaño y color | no permitir gigantismo |
| `p` | Prosa corriente | cuerpo estándar | `em/strong` internos | fuente, tamaño, color, márgenes, indent | no tocar si es reconocido como verso/carta |
| `blockquote` | Cita en bloque | margen/indent moderado, tamaño igual o levemente menor | alineación especial justificada si intencional | fuente, color | epígrafes y poemas citados |
| `q` | Cita inline | estilo inline normal | comillas/idioma | no mucho |  |
| `cite` | Referencia / obra / autor | itálica o estilo neutral | itálica | fuente/tamaño |  |
| `em` | Énfasis | itálica | sí | no |  |
| `strong` | Énfasis fuerte | bold | sí | no |  |
| `small` | Texto secundario | 0.875em aprox. controlado | sí | tamaños extremos | notas/captions |
| `sup` | Superíndice / noteref | tamaño reducido y baseline seguro | sí | tamaño extremo | enlaces de nota |
| `sub` | Subíndice | tamaño reducido y baseline seguro | sí | tamaño extremo | fórmulas químicas |
| `pre` | Texto preformateado | monospace, fondo opcional suave, wrap controlado o scroll | whitespace y monospace | color/fondo si chocan con tema | poesía concreta, ASCII art |
| `code` | Código inline o bloque | monospace | sí | color si ilegible |  |
| `ul` | Lista no ordenada | sangría y bullets estables | `list-style` razonable | márgenes extremos |  |
| `ol` | Lista ordenada | sangría y números visibles | inicio/numeración | márgenes extremos |  |
| `li` | Ítem de lista | ritmo compacto | alineación interna | márgenes extraños |  |
| `dl` | Definiciones | término destacado + cuerpo claro | estructura | espaciados extremos | glosarios |
| `table` | Datos tabulares | tipografía reducida suave + wrapper con scroll | semántica y estructura | ancho rígido, colores conflictivos | tablas muy simples pueden reflow parcial |
| `figure` | Agrupación figura + caption | bloque centrado y espaciado | estructura | márgenes extremos |  |
| `figcaption` | Caption | pequeño legible, contraste suficiente | itálica/align moderado | tamaño/color extremos |  |
| `img` | Imagen raster | `max-width:100%`, `height:auto`, zoomable | proporción | width/height fijos absurdos | iconos inline pequeños |
| `svg` | Gráfico vectorial | como imagen, con canvas neutra si hace falta | color semántico | tamaños extremos | inline SVG temático especial |
| `hr` | Separador / cambio de escena | línea o regla estándar del reader | uso de separación | estilos recargados | símbolos ornamentales semánticos |
| `aside` | Nota / contenido secundario | estilo secundario claro | semántica y enlaces | color/fondo conflictivos | pop-up footnotes |
| `section` | Agrupación semántica | sin exceso visual | estructura | nada salvo espaciado global |  |
| Enlaces de notas | Navegación note/endnote | superíndice legible y accesible | relación destino-origen | color/posición extremos | popup / modal / salto tradicional |

### Propuesta de niveles de fidelidad

PlanetaLibro debería ofrecer cuatro modos, pero **uno solo como predeterminado**:

| Modo | Descripción | Recomendación |
|---|---|---|
| **Estándar PlanetaLibro** | Cuerpo, color, espaciado y jerarquía visual del reader; semántica preservada; excepciones para formatos especiales | **Predeterminado** |
| **Respetar parcialmente el diseño editorial** | Conserva algunos rasgos editoriales seguros, como decoraciones de títulos o captions, sin ceder control del cuerpo | Recomendado como opción |
| **Diseño original del editor** | Máxima fidelidad posible dentro de la sanitización y sin dejar que el libro afecte la UI | Opción avanzada, no default |
| **Accesibilidad / alto contraste** | Paleta forzada, controles ampliados, menor dependencia de color, mayor tolerancia a zoom y spacing | Opción permanente y visible |

La razón para no usar “Diseño original del editor” como default es empírica y técnica: los lectores dominantes exponen control del usuario, los EPUB son muy heterogéneos y WCAG exige que el contenido siga siendo usable al cambiar espaciados, colores y tamaño. citeturn16search3turn17search5turn27search0turn20search3turn20search7

## Arquitectura, sanitización y propuesta v1

### Sanitización e aislamiento

La arquitectura de cuatro capas propuesta en el encargo es **correcta en lo esencial**, pero conviene ajustarla a **cinco** capas conceptuales:

- **Clasificación previa**: detectar reflowable vs fixed-layout, idioma, dirección, riesgos y perfil del libro.
- **Sanitización de seguridad**.
- **Normalización estructural**.
- **Estándar visual de PlanetaLibro**.
- **Preferencias del usuario**.

Esa capa previa evita que un fixed-layout o un poema caigan por error en la misma plantilla que una novela lineal. EPUB ya da señales para separar renditions y layout; `lang`, `dir` y `writing-mode` aportan señales adicionales decisivas. citeturn6search1turn6search16turn24search0turn24search2turn6search3

La recomendación técnica más fuerte es esta: **no insertar el HTML del libro dentro del mismo DOM/CSS de la interfaz de PlanetaLibro**. El mejor patrón para v1 es un **`iframe` sandboxeado**, idealmente servido desde un **origen separado** o con aislamiento equivalente, con **CSP estricta** y una API mínima de comunicación con la interfaz mediante mensajes. MDN advierte que el sandbox del `iframe` pierde gran parte de su valor si el contenido puede escapar a un contexto sin aislamiento; y web.dev recuerda que Shadow DOM aísla estilos, pero no constituye por sí sola una frontera de seguridad. citeturn21search17turn21search0turn21search2turn21search9

**Shadow DOM** puede ser útil dentro del propio chrome del reader o para encapsular componentes UI, y también puede ayudar a que las reglas del libro no “caminen” por toda la aplicación. Pero no reemplaza una sanitización seria ni el aislamiento de origen/capacidades. **`@layer`** también es útil para ordenar prioridades de estilos dentro del contenido ya saneado, pero no neutraliza estilos inline peligrosos ni un DOM hostil. citeturn21search1turn21search9

La estrategia recomendada queda así:

| Alternativa | Ventajas | Desventajas | Compatibilidad | Recomendación |
|---|---|---|---|---|
| `iframe` sandbox + CSP + origen separado | Mejor aislamiento real; protege UI; reduce XSS/CSS bleed | Más complejidad en selección, medición, mensajería | Alta en navegadores modernos | **Primera opción** |
| Shadow DOM | Aisla estilos del árbol local | No es frontera de seguridad; integración compleja con selección/globales | Alta-moderada | Complementaria, no suficiente |
| Prefijado de selectores | Implementación relativamente simple | Frágil ante inline styles, globales y colisiones inesperadas | Alta | Solo como refuerzo |
| `@layer` | Orden claro de cascada | No resuelve estilos hostiles ni inline peligrosos | Alta | Útil tras saneamiento |
| Sanitización en tiempo de lectura | Flexible | Coste en runtime | Alta | Mejor evitar depender solo de esto |
| Transformación previa EPUB→HTML normalizado | Consistencia, testabilidad, menor coste en runtime | Requiere pipeline más robusto | Alta | **Muy recomendable** |
| Inyección directa en mismo DOM | Simple | Riesgo alto de colisión y seguridad | Alta | **No recomendado** |

La **sanitización de seguridad** debería bloquear de forma sistemática:
- `script`, `noscript` con efectos extraños y eventos inline;
- `iframe`, `object`, `embed`, formularios y controles interactivos no autorizados;
- recursos remotos no aprobados;
- `position: fixed`, `z-index` altos, `overflow: hidden` agresivo;
- selectores globales sobre `html`, `body`, `*` si no pasan whitelist;
- `@import` remotos, animaciones no esenciales y cualquier scriptable surface.  
EPUB Reading Systems ya advierte explícitamente que scripting, red y user-generated content amplían la superficie de riesgo; la especificación incluso recomienda tratar el contenido nuevo o sideloaded como inseguro. citeturn34view1turn34view2turn34view3

### Propuesta para PlanetaLibro Reader v1

La especificación preliminar para v1 debería asentarse sobre estas reglas:

**Regla de prioridad**
1. Seguridad y accesibilidad.  
2. Preferencias explícitas del usuario.  
3. Estándar visual PlanetaLibro.  
4. Estilos editoriales necesarios para comprender la obra.  
5. Estilos decorativos del EPUB. citeturn5search2turn5search4turn20search3

**Regla de clasificación**
- Si `rendition:layout=pre-paginated`: pipeline fixed-layout.  
- Si no: pipeline reflowable. citeturn6search1turn6search16

**Regla de cuerpo**
- Cuerpo en fuente del usuario o fuente estándar del reader.
- Tamaño, interlineado, ancho de lectura y tema como variables del reader.
- Color de texto y fondo del cuerpo reescritos según tema. citeturn5search3turn5search4turn16search3turn17search5

**Regla de jerarquía**
- Encabezados `h1–h6` mapeados a escala propia con topes mínimos y máximos.
- No respetar tamaños extremos del EPUB.  
- Conservar peso, itálica, small caps razonables y alineaciones distintivas cuando no rompan legibilidad. citeturn5search3turn5search5

**Regla de párrafo**
- PlanetaLibro elige uno de dos perfiles de párrafo por libro o por género detectado: con sangría o con separación vertical.
- Nunca combinar ambos en nivel alto por defecto.
- Primer párrafo post-título/escena sin sangría. citeturn5search4turn5search6

**Regla de formatos especiales**
- Poemas, teatro, `pre/code`, tablas, cartas, diarios, notas y bibliografías salen del tratamiento “cuerpo estándar” y pasan a una whitelist de preservación estructural. citeturn18search1turn18search2turn18search8turn10view0

**Regla de imágenes**
- Límite proporcional en flujo; zoom siempre disponible para imágenes significativas; caption normalizada. citeturn10view0turn27search9

**Regla de fuentes**
- Remotas bloqueadas.
- Embebidas permitidas solo en modo parcial/original o en fixed-layout.
- Fallback por script e idioma. citeturn7search14turn25search6turn16search1turn24search11

**Regla de versionado**
- Cada libro o cada conversión guarda `style_version`, perfil del pipeline y flags de excepción.  
- Ejemplo conceptual:
```json
{
  "style_version": "planetalibro-reader-v1",
  "rendition_mode": "reflowable-standard",
  "preserve_editor_fonts": false,
  "notes_mode": "popup",
  "poetry_mode": "preserve-linebreaks",
  "table_mode": "scroll-wrapper"
}
```
La utilidad de esta metadata no viene de EPUB como obligación formal, sino de una necesidad de mantenimiento, QA y compatibilidad progresiva en un catálogo heterogéneo. citeturn6search0turn6search19turn5search3

## Riesgos, casos pendientes y validación

### Riesgos y casos pendientes

El mayor riesgo de regresión no es visual, sino **semántico**: que una normalización bienintencionada convierta poesía, teatro, código o notas en “prosa bonita pero incorrecta”. El segundo gran riesgo es de **seguridad e interfaz**: que el HTML/CSS del libro modifique botones, menús, barras o controles del reader. El tercero es de **mantenimiento**: cuanto más se intente resolver con CSS reactivo en runtime y menos con una transformación previa verificable, más difícil será depurar casos límite. citeturn18search2turn18search1turn21search17turn22search0

Los casos que probablemente deban quedar **parcialmente postergados** en v1, pero sin bloquear futura expansión, son:
- escritura vertical avanzada y todas las sutilezas tipográficas CJK;
- ruby y variantes complejas;
- maquetas híbridas con mucha interactividad heredada;
- MathML con accesibilidad completa más allá del soporte básico;
- heurísticas sofisticadas para reconstruir semántica en EPUB pésimamente exportados desde PDF.  
No porque no importen, sino porque son caros y deben validarse sobre fixtures específicos. EPUB, CSS Writing Modes, Readium CSS y DAISY muestran que estos temas existen y son relevantes, pero también que requieren tratamiento especializado. citeturn6search3turn24search11turn18search3

### Plan de validación

El conjunto mínimo de libros de prueba para validar el estándar debería cubrir, al menos, estos perfiles:

| Perfil de prueba | Qué debe validar |
|---|---|
| Novela reflowable bien construida | Cuerpo, títulos, primer párrafo, notas simples |
| Novela con CSS excesivo | Reemplazo correcto de fuentes, tamaños, colores y márgenes |
| EPUB sin CSS | Aplicación limpia del estándar base |
| EPUB exportado desde Word | Corrección de espacios, sangrías, títulos falsos |
| EPUB exportado desde PDF | Robustez ante HTML deficiente, imágenes y cajas raras |
| Poesía | Preservación de versos, sangrías y alineaciones significativas |
| Teatro | Separación de hablante/texto, ritmo, whitespace |
| Ensayo con muchas notas | `noteref`, popups y navegación ida/vuelta |
| Libro técnico con código | monospace, `pre`, tablas, figuras, enlaces internos |
| Libro con tablas complejas | scroll horizontal, asociaciones de encabezados, notas de tabla |
| Libro muy ilustrado | límites de imágenes, zoom, captions |
| Fixed-layout | no aplicar normalización de reflow |
| Libro RTL | `dir`, alineación lógica, navegación y noteref |
| Libro con escrituras no latinas | fallback de glifos y fuentes |
| Libro con fuentes embebidas indispensables | modo parcial/original y fallback seguro |

Los **criterios objetivos de aceptación** deberían ser estos:

- el CSS del libro no altera la UI del reader;
- el cuerpo de texto logra coherencia visual entre EPUBs heterogéneos;
- el usuario puede cambiar tamaño, fuente, interlineado, ancho y tema sin colisiones graves;
- el contenido sigue siendo legible con ajustes equivalentes a WCAG text spacing;
- poemas, código, tablas y notas no pierden estructura funcional;
- fixed-layout no se rompe por “correcciones” de reflow;
- no hay texto invisible en light/sepia/dark/high-contrast;
- no se cargan recursos remotos no autorizados;
- el orden de lectura y la navegación por teclado/screen reader siguen siendo razonables. citeturn20search3turn20search7turn18search18turn34view2turn34view3

### Conclusión directa

**¿Qué debe hacer PlanetaLibro Reader con cada parte del diseño original de un EPUB para ofrecer una experiencia uniforme, cómoda, accesible y fiel al significado del libro?**

Debe hacer esto:

1. **Conservar siempre** la semántica y las estructuras necesarias para comprender la obra: encabezados, secciones, listas, citas, notas, captions, tablas, idioma, dirección, writing-mode, versos, código y cualquier marcado que determine orden de lectura o navegación. citeturn18search1turn18search2turn18search8turn24search0turn24search2  
2. **Conservar pero limitar** lo editorial que puede seguir aportando identidad sin romper la experiencia: peso, cursiva, capitalización, ciertas alineaciones, decoraciones de títulos, fuentes embebidas en casos especiales, tamaños relativos razonables, saltos de sección e imágenes informativas. citeturn25search6turn16search1turn5search6  
3. **Reemplazar por el estándar PlanetaLibro** el cuerpo de lectura: fuente principal, tamaño base, line-height, longitud de línea, márgenes/ancho de lectura, colores del cuerpo y del fondo, jerarquía tipográfica global y espaciado ordinario de párrafos. citeturn5search3turn5search4turn20search1turn20search20  
4. **Eliminar por completo** lo que sea peligroso o incompatible con una lectura accesible y segura: scripts, eventos inline, iframes, formularios, recursos remotos no aprobados, `position: fixed`, `z-index` agresivo, overflow ocultador, selectores globales hostiles y dependencias que intenten tomar control de la interfaz. citeturn34view1turn34view2turn34view3turn21search17turn22search0  
5. **Transformar a representación normalizada** todo lo defectuoso o ambiguo: títulos simulados con párrafos, sangrías hechas con espacios, captions sueltas, notas sin semántica clara, poemas codificados con hacks, tablas “falsas” y EPUBs exportados desde herramientas que degradan HTML/CSS. citeturn18search18turn10view0turn9search15  
6. **Separar fixed-layout de reflowable** desde el principio: fixed-layout debe respetarse mucho más; reflowable debe estandarizarse mucho más. citeturn6search1turn17search2turn27search2turn37search4  
7. **Poner al usuario por encima del decorado editorial**, pero no por encima de lo semánticamente indispensable. Esa es la síntesis correcta entre coherencia visual, intención editorial y accesibilidad. citeturn5search2turn5search4turn20search7turn20search3

Esa es, en términos prácticos, la base más sólida para definir el futuro **PlanetaLibro Reading Style Standard**.
