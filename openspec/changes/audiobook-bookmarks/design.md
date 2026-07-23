## Context

El reproductor React expone la posición viva mediante `AudiobookPlayerHandle.getCurrentTime()` y sincroniza un único progreso local/remoto en segundos enteros. Las anotaciones del ebook usan `user_book_annotations`, pero sus anclas textuales obligatorias no representan tiempo de audio. El propietario creó `user_audiobook_annotations` en MySQL 5.7.44 con medio, segundo, nota, UUID idempotente, revisión y unicidad por ubicación.

La API v1 ya dispone de frontera de sesión legacy, CSRF, mismo origen, rate limiting, PDO y respuestas privadas. El nuevo contrato debe reutilizar esos mecanismos sin mezclar el progreso automático con actos deliberados del usuario.

## Goals / Non-Goals

**Goals:**

- Crear inmediatamente un señalador en el segundo vivo del reproductor y ofrecer después una nota opcional.
- Listar señaladores del libro y medio actual, navegar con `seekTo`, editar notas y eliminar explícitamente.
- Evitar duplicados y pérdida de notas por activaciones repetidas o reintentos.
- Conservar privacidad, ownership, compatibilidad y comportamiento móvil/teclado.

**Non-Goals:**

- Mezclar señaladores con la fila única de progreso o con anclas textuales del ebook.
- Transcribir audio, capturar texto, publicar automáticamente notas privadas o permitir señaladores anónimos durables.
- Ejecutar DDL, modificar URLs públicas/legacy o migrar señaladores cuando cambia el video.
- Añadir colores, categorías o búsqueda global.

## Decisions

1. La API expondrá recursos específicos bajo el libro: listado/creación en `/books/{uri}/audiobook-bookmarks` y actualización/eliminación por `/audiobook-bookmarks/{id}`. La URI pública resuelve internamente el libro; el usuario nunca llega desde el cliente.
2. La creación recibe `position_seconds`, `media_id` y `client_request_id`. El repositorio bloquea el libro durante la validación, compara exactamente el medio vigente y usa la unicidad física para devolver el registro existente en la misma ubicación. Repetir no funciona como toggle ni elimina datos.
3. El listado devuelve solo el medio vigente por defecto, ordenado por segundo e id. Los registros de medios anteriores permanecen en SQL; no se aplican al video nuevo.
4. La nota se edita mediante PATCH con `revision`; una revisión obsoleta devuelve 409. La eliminación es idempotente y filtra simultáneamente por usuario e id.
5. El frontend toma `getCurrentTime()` al activar, lo normaliza con la misma función del progreso, crea primero y abre un modal con la nota actual. Cancelar el modal conserva el señalador.
6. El botón usa el icono Material Symbols `bookmark_add`, texto accesible, foco visible y hit target táctil. Se deshabilita hasta que el reproductor y el progreso estén listos. No pausa el audio.
7. Un botón `bookmarks`, equivalente funcionalmente al cuaderno del ebook pero estilizado con la paleta de la app, abre un panel modal lateral. Cada fila muestra tiempo, nota y acciones explícitas para ir, editar y borrar. Navegar usa `seekTo`, actualiza la posición y cierra el panel para devolver el foco al reproductor.
8. Un visitante recibe la invitación de autenticación existente. La posición pendiente se conserva solo en memoria durante la interacción; no se afirma persistencia local de datos privados.
9. Cada señalador ofrece una acción `share`. El mensaje compartido es temporal y está separado de la nota privada; una nota nunca se incluye automáticamente.
10. El control `share` del reproductor captura el segundo al abrir el compositor. Para usuarios autenticados, confirmar “Guardar y compartir” crea o reutiliza el señalador mediante el contrato idempotente antes de invocar Web Share. Para visitantes comparte sin persistir.
11. Los enlaces usan `/listen/{uri}?t={seconds}`. El parámetro entero válido tiene prioridad sobre el progreso guardado durante la carga inicial, posiciona el reproductor sin autoplay y no expone identificadores ni datos privados.
12. La entrega usa Web Share cuando está disponible y copia al portapapeles como fallback. Cancelar el diálogo nativo no se informa como error; si el señalador ya se creó, permanece guardado.
13. El compositor no muestra opciones relativas a la tapa. Cuando existe una, el frontend intenta adjuntarla automáticamente: obtiene la imagen, la convierte en `File` y solo la entrega cuando `navigator.canShare({ files })` confirma soporte; si la plataforma no admite archivos, conserva texto y enlace sin bloquear el compartir.
14. El control visual de velocidad conserva su nombre accesible completo, pero muestra únicamente el icono y el valor compacto `1.0`.
15. Cada tarjeta del cuaderno separa jerárquicamente sus controles del contenido: tiempo y acciones en la primera fila, nota debajo a ancho completo. Los señaladores sin nota no muestran texto sustituto ni reservan espacio para una nota.
16. El estado anónimo del panel de señaladores reutiliza las acciones del aviso de guardado: cierre mediante “Más tarde” y enlace “Crear cuenta o iniciar sesión” con retorno a la ubicación actual.
17. El breadcrumb del reproductor se oculta en el viewport móvil y permanece visible desde el breakpoint `sm`. En móvil se conserva un encabezado independiente con el título del libro antes del reproductor; el `h1` del bloque descriptivo se muestra desde `sm` para evitar duplicados.
18. Dentro de la tarjeta del reproductor, inmediatamente después de los controles, se presenta un CTA dorado “Escúchalo con narración profesional”, visible antes del contenido secundario en escritorio y móvil. Su destino legacy se resuelve mediante un helper central equivalente a `sys_url`, con `VITE_SITE_URL` opcional y el origen actual como fallback; el dominio no se codifica en el componente.
19. El bloque del reproductor usa espaciado vertical compacto: tiempos y barra quedan casi contiguos, se reducen separaciones entre controles y los anuncios vacíos no reservan altura.
20. En móvil el CTA mantiene su texto en una línea con tipografía y padding compactos; el icono decorativo aparece desde `sm`. El contenido principal reserva espacio inferior adicional para poder desplazar el CTA por encima de barras inferiores dinámicas del navegador.
21. La sección secundaria “Up Next in Queue” se oculta completamente por debajo de `sm` y permanece disponible en tablet y escritorio.
22. La flecha superior conserva navegación hacia atrás cuando React Router identifica una entrada interna. En una carga directa (`location.key === "default"`), como un enlace abierto desde WhatsApp, navega a la raíz legacy resuelta mediante el helper equivalente a `sys_url`, aunque el historial global de la pestaña contenga páginas externas.

## Risks / Trade-offs

- [El video cambia entre carga y escritura] → comparar `media_id` dentro de una transacción y devolver 409 con el medio vigente.
- [Doble activación crea duplicados] → bloqueo de UI, UUID idempotente y restricción única por usuario/libro/hash/segundo.
- [Un segundo clic elimina una nota] → creación no-toggle; la eliminación vive únicamente en una acción explícita.
- [El heartbeat está atrasado] → capturar directamente `getCurrentTime()`, no reutilizar la última posición remota.
- [Edición concurrente pisa una nota] → revisión optimista y recarga del listado ante 409.
- [La API expone notas privadas] → ownership server-side, `private, no-store`, ausencia de contenido de notas en logs y errores genéricos.
- [La tabla no existe en otro entorno] → error recuperable; rollback de UI/API sin borrar filas productivas.
- [Cambio visual afecta móvil] → control compacto con hit target accesible, lista responsive y validación de build.
- [WhatsApp/navegador no acepta archivos compartidos] → detectar `canShare`, degradar a texto y enlace y no prometer una miniatura Open Graph automática.

## Migration Plan

1. Verificar la tabla informada como aplicada sin ejecutar DDL desde la app.
2. Desplegar repositorio, controlador y rutas compatibles; validar contratos y errores.
3. Desplegar cliente y UI del reproductor.
4. Verificar creación repetida, nota, navegación, eliminación, sesión y cambio de medio.
5. Rollback: retirar control y rutas; conservar `user_audiobook_annotations` para no destruir datos privados.

La sincronización local de la API usa `actualizar-api.bat` y su destino canónico es `D:\Desarrollo\MPWebs\www\planetalibro\src\api\v1`, coherente con el document root que también contiene `src/app`. Apuntar a `planetalibro\api\v1` publica fuera del árbol servido y deja al frontend frente a un router anterior.

## Open Questions

No quedan decisiones bloqueantes. La evidencia completa de `SHOW CREATE TABLE`/`SHOW INDEX` sigue siendo una verificación operativa recomendada, pero el propietario confirmó la creación con el DDL documentado.
