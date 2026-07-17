## ADDED Requirements

### Requirement: Jerarquía visual acotada de encabezados
El reader SHALL presentar los elementos `h1` a `h6` sanitizados con una jerarquía visual descendente y SHALL limitar su escala para que el aumento del tamaño base de lectura no produzca un crecimiento desproporcionado de los encabezados.

#### Scenario: Tamaño de lectura predeterminado
- **WHEN** un fragmento contiene encabezados de distintos niveles y se muestra con la preferencia tipográfica predeterminada
- **THEN** cada nivel conserva una jerarquía reconocible sin recuperar ni ejecutar estilos arbitrarios del libro

#### Scenario: Tamaño de lectura máximo
- **WHEN** el usuario aumenta el tamaño base hasta el máximo admitido por el reader
- **THEN** los encabezados respetan sus límites visuales y el contenido del encabezado permanece completo y legible

### Requirement: Composición adaptable de títulos largos
El reader MUST envolver los encabezados largos dentro del ancho de lectura disponible, MUST NOT truncar su texto y MUST NOT producir desborde horizontal en modo paginado ni continuo.

#### Scenario: Título largo en viewport móvil
- **WHEN** un encabezado largo se muestra en un viewport móvil angosto
- **THEN** el texto se distribuye en las líneas necesarias dentro del área de lectura sin recorte ni desplazamiento horizontal

#### Scenario: Título largo en escritorio
- **WHEN** el mismo encabezado se muestra en un viewport de escritorio
- **THEN** aprovecha la medida de lectura disponible, conserva su jerarquía y no excede los límites definidos para su nivel

### Requirement: Reflujo estable por escala de encabezados
El reader SHALL aplicar la escala de encabezados en ambos modos de lectura y SHALL preservar el pasaje visible mediante el mecanismo de repaginación existente cuando cambien el viewport o las preferencias tipográficas.

#### Scenario: Cambio de tamaño en modo paginado
- **WHEN** el usuario cambia el tamaño de lectura mientras observa un pasaje en modo paginado
- **THEN** el contenido se repagina con la escala acotada y el pasaje anclado continúa visible en una posición coherente

#### Scenario: Cambio entre modos
- **WHEN** el usuario alterna entre paginación visual y scroll continuo en un sector que contiene encabezados
- **THEN** ambos modos usan la misma jerarquía tipográfica y conservan el mismo pasaje o su aproximación estable

### Requirement: Compatibilidad editorial y pública
El cambio MUST conservar las etiquetas semánticas, énfasis y separación editorial que sobreviven al sanitizado, y MUST NOT modificar fragmentos publicados, manifests, URLs, metadata, API, progreso ni el lector legacy.

#### Scenario: Libro con jerarquía válida
- **WHEN** un libro ya contiene una jerarquía correcta de `h1` a `h6`
- **THEN** el reader conserva esos elementos y sus relaciones, modificando únicamente su presentación visual acotada
