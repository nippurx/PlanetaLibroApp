## ADDED Requirements

### Requirement: Apariencia de lectura configurable
El sistema SHALL permitir elegir modo paginado o scroll continuo; tema claro, sepia u oscuro; familia serif, sans o accesible; tamaño tipográfico; interlineado; y ancho o márgenes dentro de límites legibles. El modo paginado SHALL ser el predeterminado cuando no exista una preferencia válida.

#### Scenario: Aplicar una preferencia
- **GIVEN** un libro abierto
- **WHEN** el usuario cambia modo, tamaño, interlineado, fuente, tema o ancho
- **THEN** el contenido refleja el ajuste sin alterar su orden ni ocultar controles esenciales

### Requirement: Preferencias persistentes y válidas
El sistema SHALL guardar localmente preferencias versionadas, SHALL reutilizarlas en otros libros y SHALL descartar valores ausentes, obsoletos o fuera de rango.

#### Scenario: Nueva sesión
- **GIVEN** preferencias válidas guardadas anteriormente
- **WHEN** el usuario abre otro libro
- **THEN** el lector aplica esas preferencias antes de revelar el contenido cuando sea técnicamente posible

#### Scenario: Datos locales inválidos
- **GIVEN** preferencias locales corruptas o fuera de rango
- **WHEN** inicia el lector
- **THEN** usa valores predeterminados legibles y sigue funcionando

### Requirement: Reflujo sin perder la lectura
El sistema MUST preservar la ubicación lógica cuando una preferencia o cambio de viewport provoca reflujo y MUST mostrar inmediatamente el pasaje anclado en la nueva página visual. El sistema SHOULD ubicarlo dentro de la mitad superior cuando los límites naturales de columnas lo permitan. El sistema MUST NOT utilizar rangos DOM ni saltos artificiales para mantener una primera línea o posición vertical exacta.

#### Scenario: Aumento de fuente
- **GIVEN** el usuario leyendo un pasaje en una página visual
- **WHEN** aumenta el tamaño de fuente
- **THEN** el lector repagina y muestra inmediatamente el mismo pasaje o su aproximación estable mediante el ancla, preferentemente dentro de la mitad superior, no mediante el número de página visual ni píxeles

#### Scenario: Redistribución vertical natural
- **GIVEN** un pasaje anclado que permanece resoluble después de cambiar fuente, márgenes o viewport
- **WHEN** los límites naturales de columnas colocan texto anterior en la nueva página visual
- **THEN** el pasaje anclado permanece visible inmediatamente aunque cambie su posición vertical y no se fuerza la primera línea superior mediante rangos DOM o saltos artificiales

### Requirement: Alineación legible
El MVP SHALL usar alineación izquierda y MUST NOT ofrecer texto justificado hasta que exista separación silábica adecuada para el idioma.

#### Scenario: Texto normal del libro
- **GIVEN** un párrafo sin tratamiento editorial especial
- **WHEN** se renderiza en el MVP
- **THEN** aparece alineado a la izquierda sin espacios artificiales de justificación
