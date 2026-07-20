## ADDED Requirements

### Requirement: Ancla de contenido estable
El sistema SHALL representar el progreso mediante un ancla interna derivada del contenido y MUST NOT usar como identidad principal un número `pag-N`, un número de página visual, un índice de columna o un desplazamiento en píxeles.

#### Scenario: Captura dentro de una página visual
- **GIVEN** el usuario leyendo un pasaje dentro de una página visual
- **WHEN** el lector captura progreso
- **THEN** registra contexto textual y estructural suficiente para volver al mismo pasaje o a una aproximación estable

#### Scenario: Cambio de dispositivo o layout
- **GIVEN** un ancla guardada en otro viewport, fuente o margen
- **WHEN** el lector restaura el libro y recalcula páginas visuales diferentes
- **THEN** resuelve el ancla al pasaje correspondiente sin utilizar el número de página visual anterior

### Requirement: Guardado local resiliente
El sistema SHALL guardar localmente el progreso por URI de forma limitada durante la lectura y al ocultar o abandonar la vista, sin bloquear la lectura.

#### Scenario: Salida del lector
- **GIVEN** una ubicación más reciente que el progreso guardado
- **WHEN** la vista se oculta o el usuario sale
- **THEN** el progreso local queda actualizado para ese libro

#### Scenario: Fallo de persistencia
- **GIVEN** que el almacenamiento local no está disponible
- **WHEN** el lector intenta guardar
- **THEN** la sesión de lectura continúa y el fallo no reemplaza una ubicación válida en memoria

### Requirement: Restauración con fallback
El sistema SHALL restaurar la mejor ancla válida disponible y SHALL degradar de ancla explícita a progreso local compatible, progreso remoto compatible cuando exista, inicio del contenido asociado a `manifest.paginicio` y finalmente inicio del libro.

#### Scenario: Progreso local compatible
- **GIVEN** progreso local válido para la versión publicada del libro
- **WHEN** el usuario vuelve a abrirlo sin ubicación explícita
- **THEN** el lector retoma el pasaje guardado

#### Scenario: Ancla ya no resoluble
- **GIVEN** una regeneración del libro en la que la coincidencia exacta del ancla ya no existe
- **WHEN** se restaura el libro
- **THEN** el lector intenta coincidencia contextual o estructural y, si falla, usa un inicio válido cercano sin tratar `pag-N` como identidad

### Requirement: Sincronización remota no bloqueante
Cuando exista un contrato remoto autenticado, el sistema SHALL sincronizar progreso en segundo plano y MUST mantener el progreso local y la lectura operativos si la sincronización falla.

#### Scenario: Primera lectura de un libro fuera de la biblioteca
- **GIVEN** un usuario autenticado y un libro válido sin fila correspondiente en `user_books`
- **WHEN** el reader presenta la primera ubicación visible y sincroniza el progreso
- **THEN** la API crea una única fila de biblioteca para el usuario y libro, guarda esa ubicación como `current_page` y comunica que la membresía fue creada

#### Scenario: Libro ya presente en la biblioteca
- **GIVEN** un usuario autenticado cuyo libro ya existe en `user_books`
- **WHEN** el reader sincroniza una ubicación posterior
- **THEN** la API actualiza `current_page`, `last_read` y `leidas` sin crear otra fila

#### Scenario: Aperturas concurrentes
- **GIVEN** un usuario autenticado que abre simultáneamente el mismo libro fuera de su biblioteca
- **WHEN** ambas aperturas intentan registrar progreso
- **THEN** la API serializa la comprobación y el alta y deja una sola pertenencia creada por este flujo

#### Scenario: Servicio remoto no disponible
- **GIVEN** progreso local actualizado y una sincronización remota configurada
- **WHEN** el servicio remoto falla
- **THEN** el lector conserva el progreso local, no interrumpe la lectura y permite un reintento posterior
