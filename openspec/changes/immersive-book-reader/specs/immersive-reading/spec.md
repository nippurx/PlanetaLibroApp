## ADDED Requirements

### Requirement: Contenido publicado en un lienzo inmersivo
El sistema SHALL cargar un libro compatible desde su `manifest.json` y sus fragmentos `pag-N.html` y SHALL presentarlo en un lienzo refluible sin navegación global, publicidad ni elementos ajenos a la lectura.

#### Scenario: Apertura de un libro compatible
- **GIVEN** un libro con manifest válido y fragmento inicial disponible
- **WHEN** el lector abre la ruta del libro
- **THEN** muestra el contenido del libro adaptado al viewport y los controles de lectura permanecen discretos

#### Scenario: Recurso requerido no disponible
- **GIVEN** un manifest inválido o un fragmento requerido que no puede cargarse
- **WHEN** el lector intenta mostrar el libro
- **THEN** muestra un error recuperable con una salida hacia la ficha o lector legacy y no presenta contenido parcial como lectura completa

### Requirement: Fragmentación técnica invisible
El sistema MUST tratar los números `pag-N` como unidades internas de transporte y MUST NOT utilizarlos como límites de página visual, identidad persistida, cortes editoriales o numeración visible al lector.

#### Scenario: Cruce entre fragmentos
- **GIVEN** que el final de un fragmento y el inicio del siguiente están disponibles
- **WHEN** una página visual contiene contenido procedente de ambos fragmentos
- **THEN** el contenido mantiene el orden de lectura sin un separador ni etiqueta “Página N”

### Requirement: Paginación visual predeterminada
El MVP SHALL usar por defecto paginación visual refluible de una pantalla por viewport y SHALL calcular sus límites desde el contenido ya estilizado, independientemente de los límites `pag-N`.

#### Scenario: Apertura con configuración predeterminada
- **GIVEN** un libro compatible y ninguna preferencia previa de modo
- **WHEN** el usuario abre el lector
- **THEN** ve una página visual adaptada al viewport y no un flujo vertical como modo inicial

#### Scenario: Contenido ocupa varias pantallas
- **GIVEN** un fragmento lógico cuyo contenido excede el viewport
- **WHEN** el motor lo pagina
- **THEN** crea las páginas visuales necesarias sin equipararlas al número del fragmento

### Requirement: Scroll continuo alternativo
El MVP SHALL ofrecer desplazamiento vertical continuo como modo alternativo y SHALL conservar el mismo pasaje al cambiar entre modos.

#### Scenario: Cambio a scroll continuo
- **GIVEN** el usuario leyendo un pasaje en modo paginado
- **WHEN** selecciona scroll continuo
- **THEN** el lector muestra ese mismo pasaje o su aproximación estable en el flujo vertical

### Requirement: Carga rápida para ambos modos
El MVP SHALL permitir carga progresiva y precarga acotada de fragmentos sin bloquear la página visual disponible ni el modo continuo.

#### Scenario: Libro extenso
- **GIVEN** un libro con más fragmentos que la ventana de carga inicial
- **WHEN** el usuario se aproxima a una página visual que necesita contenido aún no cargado
- **THEN** el lector incorpora los fragmentos necesarios en orden sin descargar obligatoriamente todo el libro al inicio

### Requirement: Contenido seguro
El sistema MUST renderizar los fragmentos como contenido inerte y sanitizado, impedir código ejecutable y restringir recursos y enlaces a protocolos y ubicaciones permitidos.

#### Scenario: Fragmento con contenido activo
- **GIVEN** un fragmento que contiene script, handler, iframe o URL no permitida
- **WHEN** el fragmento se procesa
- **THEN** el contenido activo no se ejecuta ni obtiene acceso al contexto de la app

### Requirement: Controles revelables sin pérdida de ubicación
El sistema SHALL permitir mostrar u ocultar controles inmersivos sin cambiar la ubicación de lectura y SHALL mantenerlos visibles mientras tengan foco o un panel esté abierto.

#### Scenario: Apertura de preferencias
- **GIVEN** el usuario leyendo con controles ocultos
- **WHEN** revela los controles y abre preferencias
- **THEN** conserva la misma ubicación y los controles no se ocultan durante la interacción
