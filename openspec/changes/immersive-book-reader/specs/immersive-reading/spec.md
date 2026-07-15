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

### Requirement: Barra de marca PlanetaLibro persistente
El reader SHALL mostrar permanentemente una barra superior negra de 44 px de altura visual, más `safe-area-inset-top` cuando corresponda. La barra SHALL mostrar el logo de 32 px de alto desde `https://planetalibro.net/img/icono40.png` a la izquierda, con 6 px de aire arriba y abajo, y el texto blanco exacto `PlanetaLibro.com` centrado respecto del viewport completo. La barra MUST NOT contener enlaces, botones, foco ni acciones, y el contenido SHALL reservar su altura para no quedar oculto ni alterar la paginación por columnas.

#### Scenario: Apertura y navegación del libro
- **GIVEN** cualquier libro abierto en modo paginado o continuo
- **WHEN** el usuario avanza, retrocede, hace scroll o revela/oculta los controles
- **THEN** la barra negra de marca permanece visible, el logo conserva 32 px de alto y el dominio continúa centrado sin acciones interactivas

#### Scenario: Reflujo y safe area
- **GIVEN** un reader abierto en un dispositivo con o sin safe area
- **WHEN** cambia orientación, tamaño de ventana, fuente o tamaño de texto
- **THEN** la barra conserva 44 px de área visual bajo el safe area, el contenido comienza debajo de ella y el pasaje anclado se repagina sin quedar oculto

### Requirement: Compatibilidad materializada para libros legacy
Cuando la solicitud directa de `manifest.json` responda 404 y exista una publicación legacy válida, el sistema SHALL solicitar a la API un manifest v2 de compatibilidad. La API MUST derivar la carpeta desde una URI validada, MUST NOT ejecutar entrada arbitraria ni aceptar rutas físicas, SHALL validar `libroinfo.php` y los fragmentos declarados, SHALL crear el manifest ausente de forma atómica sin sobrescribir uno existente y SHALL devolver el contrato en la misma respuesta.

#### Scenario: Primera apertura de libro legacy válido
- **GIVEN** un libro registrado que carece de `manifest.json`, contiene `libroinfo.php` válido y tiene fragmentos contiguos
- **WHEN** el reader recibe 404 al solicitar el manifest directo
- **THEN** la API reconstruye y devuelve un manifest v2, lo materializa para próximas lecturas y el reader continúa sin enviar al usuario al lector clásico

#### Scenario: Registro de regeneración pendiente
- **GIVEN** que la API materializa un manifest desde datos legacy
- **WHEN** finaliza la validación del libro
- **THEN** realiza un `UPSERT` idempotente en `ebook_regeneration_queue` con destino `epub2html2`, sin duplicar trabajos por aperturas concurrentes

#### Scenario: Legacy inválido o no escribible
- **GIVEN** que falta `libroinfo.php`, sus datos son inválidos, los fragmentos no son contiguos o no puede publicarse atómicamente el manifest
- **WHEN** la API intenta materializar la compatibilidad
- **THEN** no deja un manifest parcial, devuelve un error tipado y el reader conserva la salida recuperable a ficha o lector clásico

### Requirement: Fragmentación técnica invisible
El sistema MUST tratar los números `pag-N` como unidades internas de transporte y MUST NOT utilizarlos como límites de página visual, identidad persistida ni cortes editoriales. La barra inferior MAY mostrar el primer fragmento visible como `Pág. N de total`, junto con un porcentaje aproximado, sin presentarlo como página visual ni ubicación persistida.

#### Scenario: Cruce entre fragmentos
- **GIVEN** que el final de un fragmento y el inicio del siguiente están disponibles
- **WHEN** una página visual contiene contenido procedente de ambos fragmentos
- **THEN** el contenido mantiene el orden de lectura sin un separador ni etiqueta entre fragmentos; la barra inferior puede indicar el primer fragmento visible como referencia compacta

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
