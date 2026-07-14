## ADDED Requirements

### Requirement: Operación completa sin gestos
El sistema SHALL ofrecer mediante teclado y controles visibles todas las acciones esenciales de lectura y MUST NOT exigir hover, toque lateral o gesto como única alternativa.

#### Scenario: Uso exclusivo de teclado
- **GIVEN** un usuario que no utiliza puntero ni gestos
- **WHEN** recorre controles, abre índice, navega, abre preferencias y sale
- **THEN** puede completar cada acción con orden de foco lógico y foco visible

### Requirement: Estructura y nombres accesibles
El sistema SHALL preservar el orden y la semántica útiles del contenido, proporcionar nombres y estados accesibles a controles y paneles, y gestionar el foco al abrir y cerrar superficies superpuestas.

#### Scenario: Panel de índice
- **GIVEN** el foco en el botón de índice
- **WHEN** abre y luego cierra el panel
- **THEN** el panel tiene nombre accesible, el foco entra en él y después regresa al botón que lo abrió

### Requirement: Contraste, zoom y reflujo accesibles
El sistema SHALL cumplir contraste WCAG AA para texto y controles propios y SHALL conservar contenido y acciones utilizables con zoom y texto ampliado.

#### Scenario: Tema oscuro con texto ampliado
- **GIVEN** el tema oscuro y tamaño de texto aumentado
- **WHEN** el usuario lee y abre controles en un viewport móvil
- **THEN** texto, foco y controles mantienen contraste suficiente y no quedan recortados ni superpuestos de forma que impida usarlos

### Requirement: Movimiento reducido
El sistema SHALL respetar `prefers-reduced-motion` y MUST NOT usar animación de paso de hoja en el MVP.

#### Scenario: Preferencia de movimiento reducido activa
- **GIVEN** que el sistema operativo solicita movimiento reducido
- **WHEN** se muestran controles o cambia la ubicación
- **THEN** el lector elimina transiciones no esenciales y conserva una actualización comprensible

### Requirement: Paginación accesible
El modo paginado SHALL conservar un orden de lectura semántico, SHALL ofrecer controles visibles y teclado equivalentes a toque/swipe, y MUST NOT ocultar contenido a tecnología asistiva de forma que impida recorrer el libro.

#### Scenario: Navegación paginada con lector de pantalla
- **GIVEN** el modo paginado y una tecnología asistiva activa
- **WHEN** el usuario recorre el contenido y solicita avanzar
- **THEN** el orden semántico continúa desde el final de la página visual actual y la nueva ubicación se comunica sin depender del gesto

### Requirement: Alternativas textuales del libro
El sistema SHALL conservar el atributo `alt` provisto por las imágenes del libro y SHALL tratar `alt=""` como imagen decorativa sin inventar descripciones.

#### Scenario: Imagen con texto alternativo
- **GIVEN** una imagen cuyo fragmento contiene un `alt` no vacío
- **WHEN** el contenido se sanitiza y renderiza
- **THEN** el texto alternativo permanece disponible para tecnología asistiva
