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
El sistema SHALL mostrar capítulo actual y porcentaje de avance normalizado y MUST NOT describir los fragmentos como “página X de Y”.

#### Scenario: Actualización al leer
- **GIVEN** el usuario avanzando por páginas visuales o desplazándose en modo continuo
- **WHEN** cambia su ubicación lógica
- **THEN** el porcentaje y el capítulo se actualizan desde el ancla de contenido sin depender de `pag-N`

### Requirement: Navegación no destructiva
El sistema SHALL conservar la ubicación al abrir y cerrar índice o preferencias y SHALL ofrecer una acción para regresar a la ficha u origen disponible.

#### Scenario: Cerrar índice sin seleccionar destino
- **GIVEN** el índice abierto sobre una ubicación de lectura
- **WHEN** el usuario lo cierra
- **THEN** el foco y la lectura regresan a esa ubicación
