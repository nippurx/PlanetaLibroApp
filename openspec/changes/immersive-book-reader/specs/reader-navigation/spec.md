## ADDED Requirements

### Requirement: Navegación por página visual
En el modo predeterminado, el sistema SHALL avanzar o retroceder exactamente una página visual mediante toque o clic lateral, swipe horizontal, controles visibles y teclado.

#### Scenario: Avance por teclado
- **GIVEN** que el foco no está en un control que consume la tecla
- **WHEN** el usuario pulsa Page Down o Space
- **THEN** el lector avanza exactamente a la página visual siguiente sin saltar contenido

#### Scenario: Avance mediante toque lateral
- **GIVEN** una página visual siguiente y ningún elemento interactivo activado en la zona
- **WHEN** el usuario toca o hace clic en el lateral de avance
- **THEN** el lector muestra exactamente la página visual siguiente

#### Scenario: Zonas relativas al área de lectura
- **GIVEN** un viewport de lectura con márgenes o superficies externas
- **WHEN** el usuario toca el 20 % izquierdo, el 60 % central o el 20 % derecho del viewport
- **THEN** el lector retrocede, alterna controles o avanza respectivamente usando coordenadas relativas al viewport

#### Scenario: Apertura inmersiva y controles superpuestos
- **GIVEN** que el lector termina de preparar el contenido
- **WHEN** se presenta la primera página visual
- **THEN** las herramientas están ocultas y el contenido aprovecha el alto disponible sin reservar espacio para las barras revelables

#### Scenario: Conflicto con scroll, selección o controles
- **GIVEN** una interacción vertical, prolongada, multitáctil, cancelada, con selección activa o iniciada sobre un elemento interactivo
- **WHEN** finaliza el Pointer Event
- **THEN** el lector no cambia de página ni alterna controles y conserva el comportamiento nativo correspondiente

#### Scenario: Retroceso mediante swipe
- **GIVEN** que existe contenido anterior
- **WHEN** el usuario realiza el swipe horizontal de retroceso
- **THEN** el lector muestra exactamente la página visual anterior y mantiene el orden lógico

#### Scenario: Alternativa visible a los gestos
- **GIVEN** un usuario que no puede utilizar zonas laterales ni swipe
- **WHEN** activa el control visible de avance o retroceso
- **THEN** obtiene el mismo cambio de una página visual

### Requirement: Navegación en modo continuo
Cuando el usuario seleccione scroll continuo, el sistema SHALL permitir navegación mediante scroll nativo, controles y teclado sin cambiar el ancla canónica del pasaje.

#### Scenario: Avance en modo continuo
- **GIVEN** el modo scroll continuo activo
- **WHEN** el usuario usa rueda, gesto vertical o Page Down
- **THEN** el lector avanza por el flujo vertical en orden

### Requirement: Índice jerárquico
El sistema SHALL construir el índice desde `manifest.index`, respetar `titulo`, `pag` y `nivel`, y SHALL navegar al destino válido seleccionado.

#### Scenario: Selección de capítulo
- **GIVEN** un índice con elementos de distintos niveles
- **WHEN** el usuario selecciona un elemento
- **THEN** el lector carga su fragmento, lleva el contenido al destino y comunica el capítulo actual sin mostrar el número técnico

#### Scenario: Entrada de índice fuera de rango
- **GIVEN** una entrada cuyo `pag` no pertenece a `1..manifest.pages`
- **WHEN** se construye el índice
- **THEN** esa entrada no permite navegar fuera del libro y el resto del índice válido continúa disponible

### Requirement: Progreso comprensible
El sistema SHALL mostrar en la barra inferior compacta `Pág. N de total` y porcentaje, donde `N` es el primer fragmento con contenido visible y `total` es `manifest.pages`. Esa referencia MUST NOT convertirse en identidad persistida ni afirmar que es una página visual.

#### Scenario: Actualización al leer
- **GIVEN** el usuario avanzando por páginas visuales o desplazándose en modo continuo
- **WHEN** cambia su ubicación lógica
- **THEN** la referencia de página y el porcentaje se actualizan desde el primer fragmento visible, usando la misma selección que Compartir

### Requirement: Navegación no destructiva
El sistema SHALL conservar la ubicación al abrir y cerrar índice o preferencias y SHALL ofrecer una acción para regresar a la ficha u origen disponible.

#### Scenario: Cerrar índice sin seleccionar destino
- **GIVEN** el índice abierto sobre una ubicación de lectura
- **WHEN** el usuario lo cierra
- **THEN** el foco y la lectura regresan a esa ubicación

### Requirement: URL de lectura compartible por fragmento
El sistema SHALL usar `/read/{libro_uri}/` como URL normal sin modificarla durante el avance y SHALL generar, al activar Compartir, `/read/{libro_uri}/{fragmento}` con el primer fragmento HTML que tenga contenido visible. El fragmento explícito SHALL tener prioridad sobre el progreso local al abrirse y MUST actuar sólo como una pista de carga aproximada, no como identidad canónica del progreso.

#### Scenario: Compartir una pantalla que cruza fragmentos
- **GIVEN** una pantalla visual con contenido de más de un fragmento HTML
- **WHEN** el usuario activa Compartir
- **THEN** el enlace contiene el número del primer fragmento con contenido visible, aunque sólo se vea una porción mínima

#### Scenario: Abrir un enlace compartido
- **GIVEN** una URL `/read/{libro_uri}/17` y progreso local en otra ubicación
- **WHEN** el reader abre un manifest que contiene el fragmento 17
- **THEN** carga una ventana cuyo primer contenido pertenece al fragmento 17, sin renderizar texto del fragmento 16, y muestra el inicio del destino

#### Scenario: Vista previa en un cliente que no ejecuta JavaScript
- **GIVEN** una URL compartible válida y un manifest que declara una tapa publicada
- **WHEN** WhatsApp u otro crawler solicita la URL sin ejecutar React
- **THEN** recibe HTML con `og:image` absoluto hacia la tapa, título, descripción y `og:url`, mientras un navegador normal carga el mismo reader en la misma dirección
