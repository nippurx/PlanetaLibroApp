## ADDED Requirements

### Requirement: Descubrimiento de anotaciones por visitantes
El sistema SHALL permitir que un visitante seleccione un pasaje y descubra las acciones `Destacar` y `Añadir nota`, pero MUST NOT persistir ni consultar anotaciones sin una sesión autenticada.

#### Scenario: Visitante intenta destacar
- **GIVEN** un visitante con un pasaje seleccionado
- **WHEN** activa `Destacar`
- **THEN** el sistema explica que una cuenta gratuita permite conservar y recuperar la anotación, y ofrece registrarse, iniciar sesión o cancelar sin alterar la lectura

#### Scenario: Continuidad después de autenticarse
- **GIVEN** un visitante que inició el flujo de autenticación desde una selección válida
- **WHEN** completa la autenticación y regresa por una ruta relativa aprobada
- **THEN** el reader restaura el libro, la ubicación y la intención, revalida el rango y permite confirmar la anotación sin persistirla silenciosamente

#### Scenario: Cancelación de la invitación
- **GIVEN** la invitación de autenticación abierta
- **WHEN** el visitante elige `Ahora no`
- **THEN** puede continuar leyendo y el sistema no crea datos locales permanentes ni remotos de la anotación

### Requirement: Creación de destacados y notas privadas
El sistema SHALL permitir a un usuario autenticado guardar un rango continuo válido de un libro como destacado o como nota personal privada.

#### Scenario: Crear un destacado
- **GIVEN** un usuario autenticado y un pasaje válido seleccionado
- **WHEN** confirma `Destacar`
- **THEN** se crea una anotación de su propiedad sin comentario y el rango queda representado con el color permitido seleccionado

#### Scenario: Crear una nota
- **GIVEN** un usuario autenticado y un pasaje válido seleccionado
- **WHEN** escribe un comentario dentro del límite y confirma `Añadir nota`
- **THEN** se crea una anotación de su propiedad con el comentario y el pasaje queda destacado

#### Scenario: Selección entre fragmentos
- **GIVEN** una selección continua que comienza en un fragmento y termina en el siguiente dentro del mismo libro
- **WHEN** el usuario confirma la anotación
- **THEN** el sistema conserva inicio, fin y evidencia textual del rango completo sin tratar el límite `pag-N` como corte editorial

#### Scenario: Selección inválida o excesiva
- **GIVEN** un rango vacío, invertido, fuera del libro o superior al límite configurado
- **WHEN** se intenta crear la anotación
- **THEN** el sistema no persiste datos y comunica cómo realizar una selección válida

### Requirement: Anclaje estable y recuperable
El sistema SHALL persistir coordenadas normalizadas, texto exacto, contexto, versión de contenido y versión de algoritmo suficientes para validar y recuperar una anotación sin depender de fuente, viewport, página visual o HTML crudo.

#### Scenario: Cambio de presentación
- **GIVEN** una anotación existente
- **WHEN** cambia fuente, tamaño, margen, orientación o modo paginado/continuo
- **THEN** el mismo pasaje permanece anotado aunque cambien su página visual y coordenadas de pantalla

#### Scenario: Misma versión de contenido
- **GIVEN** una anotación cuyas coordenadas y versión coinciden con el libro actual
- **WHEN** el reader la resuelve
- **THEN** valida que el texto de esas coordenadas coincide con el texto exacto antes de representarla

#### Scenario: Contenido regenerado
- **GIVEN** una anotación cuya versión de contenido ya no coincide
- **WHEN** el reader intenta resolverla
- **THEN** utiliza texto exacto, contexto y pista estructural para encontrar una coincidencia segura cerca del lugar original

#### Scenario: Ancla no localizable
- **GIVEN** que ninguna coincidencia segura representa el pasaje original
- **WHEN** el usuario consulta la anotación
- **THEN** conserva y muestra extracto y comentario, indica que el pasaje no puede ubicarse y permite editar o eliminar sin saltar a un lugar inventado

### Requirement: Cuaderno unificado por libro
El sistema SHALL presentar las anotaciones del usuario autenticado para el libro abierto en una experiencia unificada, ordenada por ubicación y con filtros `Todas`, `Destacados` y `Notas`.

#### Scenario: Consultar todas las anotaciones
- **GIVEN** un libro con destacados y notas del usuario
- **WHEN** abre `Mis anotaciones`
- **THEN** ve ambos tipos en orden de lectura con extracto, comentario cuando exista, color y acción para volver al pasaje

#### Scenario: Filtrar notas
- **GIVEN** el cuaderno con ambos tipos
- **WHEN** selecciona el filtro `Notas`
- **THEN** sólo aparecen anotaciones cuyo comentario no está vacío

#### Scenario: Volver al pasaje
- **GIVEN** una anotación localizable en el cuaderno
- **WHEN** activa su acción de navegación
- **THEN** el reader carga la zona necesaria, muestra el pasaje y enfoca o anuncia el destino sin perder la anotación

#### Scenario: Listado extenso
- **GIVEN** más anotaciones que el límite de una respuesta
- **WHEN** el usuario recorre el cuaderno
- **THEN** el sistema carga páginas por cursor en orden estable sin duplicar ni omitir filas

### Requirement: Edición y eliminación controladas por propietario
El sistema SHALL permitir que sólo el propietario autenticado edite el comentario o color y elimine una anotación.

#### Scenario: Convertir destacado en nota
- **GIVEN** un destacado propiedad del usuario
- **WHEN** agrega y confirma un comentario válido
- **THEN** la misma anotación conserva su rango y pasa a mostrarse como nota

#### Scenario: Quitar el comentario
- **GIVEN** una nota propiedad del usuario
- **WHEN** elimina su comentario y confirma
- **THEN** la misma anotación conserva el rango y pasa a mostrarse como destacado

#### Scenario: Acceso a anotación ajena
- **GIVEN** un usuario autenticado que intenta leer, modificar o eliminar una anotación de otro usuario
- **WHEN** la API procesa la solicitud
- **THEN** no realiza la operación ni revela si la anotación existe

#### Scenario: Edición concurrente
- **GIVEN** dos dispositivos con versiones distintas de la misma anotación
- **WHEN** el dispositivo desactualizado intenta guardar
- **THEN** la API rechaza la sobrescritura, devuelve un conflicto seguro y conserva el estado más reciente

### Requirement: Persistencia SQL escalable
El sistema SHALL almacenar cada anotación en `user_book_annotations`, vinculada directamente al usuario y al libro, con tamaños acotados e índices para consultas por propietario, libro, ubicación y actualización.

#### Scenario: Libro fuera de la biblioteca
- **GIVEN** un usuario autenticado leyendo un libro sin fila en `user_books`
- **WHEN** crea una anotación
- **THEN** la anotación puede persistirse sin depender de `user_books.id`

#### Scenario: Libro retirado de la biblioteca
- **GIVEN** un libro con anotaciones del usuario
- **WHEN** el usuario lo quita de su biblioteca
- **THEN** las anotaciones no se eliminan implícitamente

#### Scenario: Reintento de creación
- **GIVEN** que una creación confirmada se reintenta por un fallo de red con la misma clave idempotente válida
- **WHEN** la API recibe el reintento
- **THEN** devuelve el resultado original y no crea una fila duplicada

### Requirement: Privacidad y seguridad de las anotaciones
El sistema MUST obtener la identidad desde la sesión server-side, proteger todos los writes, tratar notas y extractos como datos privados y evitar su almacenamiento en cachés o registros públicos.

#### Scenario: Identidad manipulada por el cliente
- **GIVEN** una solicitud que incluye un `user_id` ajeno en path, query o body
- **WHEN** la API procesa la operación
- **THEN** ignora esa identidad, utiliza exclusivamente la sesión y aplica la comprobación de propiedad

#### Scenario: Solicitud de escritura sin defensa válida
- **GIVEN** una sesión ausente o un write que no satisface la defensa CSRF/Origin definida
- **WHEN** intenta crear, actualizar o eliminar
- **THEN** la API rechaza la operación sin modificar datos

#### Scenario: Respuesta con datos personales
- **GIVEN** una respuesta autenticada que contiene una anotación
- **WHEN** la API la entrega
- **THEN** utiliza política de caché privada `no-store` y el service worker o una caché compartida no la persiste

#### Scenario: Compartir una cita anotada
- **GIVEN** un pasaje que contiene una nota personal
- **WHEN** el usuario activa la función general de compartir del reader
- **THEN** el comentario personal no se incorpora al enlace, metadata social ni contenido compartido salvo una futura confirmación explícita fuera de este alcance

### Requirement: Selección compatible con navegación y accesibilidad
El sistema SHALL preservar la selección nativa, impedir navegación gestual accidental durante la interacción y ofrecer controles accesibles para crear y gestionar anotaciones.

#### Scenario: Selección en modo paginado
- **GIVEN** un usuario arrastrando para seleccionar texto
- **WHEN** el gesto termina sobre una zona lateral
- **THEN** el reader conserva la selección y no avanza ni retrocede de página

#### Scenario: Ajuste estable de asas en Android paginado
- **GIVEN** un usuario de Android ajustando las asas nativas de una selección en modo paginado
- **WHEN** extiende o reduce el rango dentro de la página visible o cerca de un límite de columna
- **THEN** las asas mantienen su orden y posición visibles sin saltar al inicio de la página ni seleccionar texto no solicitado

#### Scenario: Operación mediante teclado
- **GIVEN** un usuario que navega por teclado y selecciona texto mediante mecanismos compatibles
- **WHEN** abre las acciones de anotación
- **THEN** puede destacar, añadir una nota, cancelar y volver al texto con nombres accesibles y foco visible
