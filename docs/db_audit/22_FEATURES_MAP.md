# Features Map - Fase 2

Base de evidencia:

- Índice de queries: `docs/db_audit/20_QUERIES_INDEX.md`
- Uso por tabla: `docs/db_audit/21_TABLE_USAGE.md`
- Mapa archivo -> tablas: `docs/db_audit/23_FILE_TO_TABLE_MAP.md`

## 1. Auth/Login/Registro/Recuperacion

- Descripcion: El login, registro, recuperacion y callback OAuth consultan y escriben `user_table`. El flujo mezcla PDO en entrypoints de autenticacion y helpers legacy en otras rutas (`login.php:2-7`, `login_register.php:22-23`, `login_recover.php:30-35`, `google-callback.php:2-3`).
- Tablas involucradas: `user_table`
- Campos usados:
  - `user_table`: `email`, `p_hash`, `remember_token`, `userid`, `username`, `paid`, `img_url`, `date_joined`, `password`, `name`
- Lecturas: `Q0945`, `Q1028`, `Q1033`, `Q1034`
- Escrituras: `Q0946`, `Q1029`, `Q1035`
- Archivos clave:
  - `login.php:24-88`
  - `login_register.php:38-104`
  - `login_recover.php:88-139`
  - `google-callback.php:14-50`
- Reglas de negocio observadas:
  - El login valida credenciales con `mp_password_verify()` sobre `p_hash` y luego persiste `remember_token` (`login.php:52-62`).
  - El registro primero verifica unicidad por email y luego inserta `DATE_JOINED` (`login_register.php:57-84`).
  - Recuperacion solo envia correo si existe el email en `user_table` (`login_recover.php:100-139`).
  - El callback de Google inserta usuario nuevo si no encuentra email, pero usa `$connection` sin include visible de `login_dbconfig.php` en ese archivo (`google-callback.php:3`, `google-callback.php:25-41`).

## 2. Sesiones / cookies / tokens

- Descripcion: La persistencia de sesion se apoya en cookie `remember_token`, variables `$_SESSION` y redireccion diferida via `login_destino`. Hay implementaciones tanto en entrypoints como en `user_funcs.php` (`login.php:55-76`, `logout.php:17-44`, `user_funcs.php:1243-1271`, `user_funcs.php:2463-2475`).
- Tablas involucradas: `user_table`
- Campos usados:
  - `user_table`: `remember_token`, `userid`, `email`, `username`, `paid`
- Lecturas: `Q1028`, `Q1168`, `Q1200`, `Q1201`
- Escrituras: `Q1029`, `Q1036`
- Archivos clave:
  - `login.php:55-76`
  - `logout.php:17-44`
  - `user_funcs.php:1243-1271`
  - `user_funcs.php:2463-2475`
- Reglas de negocio observadas:
  - El login crea cookie persistente por un anio y actualiza `remember_token` en DB (`login.php:56-62`).
  - El logout borra `remember_token` en DB y elimina las cookies `useremail` y `remember_token` (`logout.php:17-40`).
  - Si no hay sesion, `user_funcs.php` intenta restaurarla con `remember_token` y, si falla, guarda `login_destino` y redirige a login (`user_funcs.php:1243-1271`).
  - En `user_funcs.php` conviven una version comentada con `prepare()` y una activa con `mpdb_get_value()` para el mismo lookup de `remember_token` (`user_funcs.php:2467-2475`).

## 3. Perfil de usuario

- Descripcion: El perfil reutiliza el estado de autenticacion y consume `user_table`; no se detecto en este corte un entrypoint dedicado con escritura de perfil equivalente a "editar datos". El uso real visible es de lectura de datos de sesion y de usuario (`login.php:65-70`, `user_funcs.php:1253-1260`, `mp_mailing.php:163-166`).
- Tablas involucradas: `user_table`
- Campos usados:
  - `user_table`: `userid`, `email`, `username`, `paid`, `img_url`
- Lecturas: `Q1028`, `Q1168`, `Q1201`, `Q1057`
- Escrituras: No detectadas en esta fase para un flujo de edicion de perfil
- Archivos clave:
  - `login.php:65-70`
  - `user_funcs.php:1253-1260`
  - `mp_mailing.php:163-166`
- Reglas de negocio observadas:
  - El estado de perfil expuesto a sesion incluye `userid`, `username`, `email`, `paid` e `img_url` (`login.php:65-70`).
  - `mp_mailing.php` personaliza correos usando `user_get($next_user['email'])`, lo que implica lookup de perfil por email (`mp_mailing.php:163-166`).
  - NO CONFIRMADO: pantalla propia de edicion de perfil con queries directas en el set revisado.

## 4. Catalogo de libros (listado/detalle)

- Descripcion: El catalogo consulta principalmente `ebooks_books` y `ebooks_authors`; se ordena por `views`, `views_last` y estado editorial. El detalle y varios listados viven en helpers (`buscar.php:287-321`, `libro_funcs.php:2262`, `backend/addreviews_main.php:136-171`).
- Tablas involucradas: `ebooks_books`, `ebooks_authors`, `videos_book`, `books_tags`, `tags`
- Campos usados:
  - `ebooks_books`: `ebooks_books_id`, `uri`, `ebooks_books_title`, `ebooks_books_subtitle`, `ebooks_books_author`, `ebooks_books_file_alternative`, `descargar`, `video_audiolibro`, `views`, `views_last`, `ebooks_books_lang`, `ebooks_books_updated`, `read_online`, `dompub`
  - `ebooks_authors`: `ebooks_authors_id`, `ebooks_authors_name`, `uri`
  - `videos_book`: `videoid`, `libro_uri`, `rank`, `lang`
- Lecturas: `Q0833`, `Q0834`, `Q0835`, `Q0836`, `Q0456`, `Q0457`, `Q0458`, `Q0459`, `Q0976`, `Q0977`, `Q0978`, `Q0979`, `Q0980`, `Q0981`, `Q0982`, `Q0983`, `Q0984`, `Q1013`
- Escrituras: `Q0450`, `Q0451`, `Q0452`, `Q0453`, `Q0454`, `Q0455`, `Q0460`
- Archivos clave:
  - `buscar.php:278-321`
  - `libro_funcs.php:1245-1368`
  - `libro_funcs.php:2262`
  - `backend/addreviews_main.php:61-119`
- Reglas de negocio observadas:
  - Los listados en `buscar.php` alternan orden por `views` o `views_last` y filtran por `ebooks_format_epub` y `video_audiolibro` segun el modo (`buscar.php:278-321`, `buscar.php:572-593`, `buscar.php:832-852`).
  - `backend/addreviews_main.php` usa libros sin video (`videos` vacio o null) para cola editorial y luego marca `procesado = 1` (`backend/addreviews_main.php:147-171`, `backend/addreviews_main.php:314-315`).

## 5. Lectura online + paginas + progreso

- Descripcion: El flujo de lectura actualiza pagina actual en `user_books`, registra eventos de pagina en `user_books_log` y puede disparar `libros_pedidos` si el libro no esta disponible online (`leerlibro.php:98-172`, `leerlibro_funcs.php:1073-1084`, `leerlibro_funcs.php:1318-1347`).
- Tablas involucradas: `user_books`, `user_books_log`, `ebooks_books`, `libros_pedidos`
- Campos usados:
  - `user_books`: `user_id`, `ebooks_books_id`, `current_page`, `last_read`, `leidas`
  - `user_books_log`: `user_id`, `book_id`, `page_number`, `read_at`
  - `ebooks_books`: `ebooks_books_id`, `uri`, `dompub`, `read_online`
  - `libros_pedidos`: `uri`
- Lecturas: `Q1127`, `Q1128`
- Escrituras: `Q0956`, `Q0957`, `Q0878`, `Q0879`, `Q0881`, `Q0882`, `Q0883`, `Q0884`, `Q0885`
- Archivos clave:
  - `leerlibro.php:98-172`
  - `leerlibro_funcs.php:1073-1084`
  - `leerlibro_funcs.php:1318-1347`
  - `template_funcs.php:320-324`
- Reglas de negocio observadas:
  - Si el libro no es `dompub` y la pagina no existe, se inserta pedido en `libros_pedidos` (`leerlibro.php:128-135`).
  - Cada avance actualiza `current_page`, `last_read` y acumula `leidas = leidas + 1` (`leerlibro_funcs.php:1083-1084`).
  - El log de lectura guarda `user_id`, `book_id`, `page_number` y `NOW()` como `read_at` (`leerlibro_funcs.php:1344-1347`).

## 6. Biblioteca del usuario / favoritos / guardar

- Descripcion: La biblioteca usa `user_books` para ebooks y `user_video_audiolibros` para audiolibros. El agregado puede dispararse desde botones en templates, entrypoints dedicados y helpers (`template_funcs.php:267-292`, `user_books_insert.php:36-73`, `f_user_video_audiolibros_insert.php:31-38`).
- Tablas involucradas: `user_books`, `user_video_audiolibros`, `ebooks_books`, `libros_pedidos`
- Campos usados:
  - `user_books`: `id`, `user_id`, `ebooks_books_id`, `first_read`, `last_read`, `current_page`
  - `user_video_audiolibros`: `id`, `user_id`, `ebooks_books_id`, `first_read`, `last_read`, `current_min`, `max_min`
  - `ebooks_books`: `ebooks_books_id`, `ebooks_books_title`, `read_online`, `dompub`, `uri`
  - `libros_pedidos`: `uri`
- Lecturas: `Q1127`, `Q1128`, `Q1129`
- Escrituras: `Q1195`, `Q0939`, `Q0940`, `Q0941`
- Archivos clave:
  - `template_funcs.php:267-292`
  - `template_funcs.php:435-453`
  - `user_books_insert.php:36-73`
  - `f_user_video_audiolibros_insert.php:31-38`
  - `f_user_video_audiolibros_updatetime.php:41-55`
- Reglas de negocio observadas:
  - El agregado de libro a biblioteca inserta `first_read` y `last_read` con `now()` (`user_funcs.php:2286-2310`).
  - Si el libro agregado no es `dompub` y no esta online, tambien se genera pedido (`user_books_insert.php:55-60`).
  - El agregado de audiolibro crea registro en `user_video_audiolibros` y luego actualiza `current_min` o `max_min` segun el tiempo recibido (`f_user_video_audiolibros_insert.php:31-38`, `f_user_video_audiolibros_updatetime.php:42-50`).

## 7. Descargas (dominio publico, limites)

- Descripcion: `descargar.php` mezcla control de acceso, alta en biblioteca y contador de vistas. El codigo diferencia descarga tradicional de lectura online con campos de `ebooks_books` (`descargar.php:76-123`, `descargar.php:139-162`, `descargar.php:312-431`).
- Tablas involucradas: `ebooks_books`, `user_books`, `mailing`, `mailing_users`
- Campos usados:
  - `ebooks_books`: `uri`, `views`, `descargar`, `read_online`
  - `user_books`: `user_id`, `ebooks_books_id`, `first_read`, `last_read`
- Lecturas: `Q1048`, `Q1050`, `Q1052`, `Q1056`
- Escrituras: `Q0903`, `Q1047`, `Q1049`, `Q1053`, `Q1054`, `Q1055`
- Archivos clave:
  - `descargar.php:30-49`
  - `descargar.php:76-123`
  - `descargar.php:139-162`
  - `descargar.php:312-431`
- Reglas de negocio observadas:
  - Si el usuario no esta autenticado, guarda `login_destino` apuntando a `/descargar.php?uri=...` (`descargar.php:76-85`).
  - La descarga incrementa `views` del libro (`descargar.php:139-141`).
  - Si `read_online` esta activo, el flujo inserta el libro en biblioteca (`descargar.php:159-162`, `descargar.php:271-274`).
  - La UI solo muestra descarga directa cuando `descargar == 1` y `!read_online` (`descargar.php:312`, `descargar.php:431`).

## 8. Premium / +18 / sin anuncios / suscripciones

- Descripcion: El gating real visible en PHP se apoya en `user_paid` de sesion y en la deteccion de tag `+18`. No se detecto en este corte una tabla de suscripciones dedicada dentro del catalogo principal (`leerlibro.php:101-105`, `user_funcs.php:2518-2547`, `libro_funcs.php:3799`).
- Tablas involucradas: `user_table`, `books_tags`, `tags`, `ebooks_books`
- Campos usados:
  - `user_table`: `paid`, `userid`
  - `ebooks_books`: `uri`
- Lecturas: `Q1028`, `Q1168`, `Q1201`
- Escrituras: No detectadas en el flujo principal del sitio publico
- Archivos clave:
  - `leerlibro.php:101-105`
  - `user_funcs.php:2518-2547`
  - `libro_funcs.php:3799`
  - `descargar.php:53-54`
- Reglas de negocio observadas:
  - Si el libro es `+18`, `leerlibro.php` fuerza `user_is_subscribed()` (`leerlibro.php:101-105`).
  - `user_is_subscribed()` redirige a login si no hay sesion y a `usuario_solo_adultos.php` si `$_SESSION['user_paid']` esta vacio (`user_funcs.php:2528-2547`).
  - `descargar.php` copia `paid` a sesion como `user_paid` (`descargar.php:53-54`).

## 9. Audiolibros (YouTube u otros)

- Descripcion: El sitio modela audiolibros con el campo `video_audiolibro` en `ebooks_books` y el progreso del usuario en `user_video_audiolibros`. El playback actualiza `last_read`, `current_min` y `max_min` (`audiolibro.php:71-74`, `audiolibro.php:332-333`, `audiolibro_player.php:74-77`, `audiolibro_player.php:321-322`).
- Tablas involucradas: `ebooks_books`, `user_video_audiolibros`
- Campos usados:
  - `ebooks_books`: `ebooks_books_id`, `video_audiolibro`, `uri`
  - `user_video_audiolibros`: `user_id`, `ebooks_books_id`, `last_read`, `current_min`, `max_min`, `first_read`
- Lecturas: `Q1129`
- Escrituras: `Q0433`, `Q0434`, `Q0939`, `Q0940`, `Q0941`
- Archivos clave:
  - `audiolibro.php:71-74`
  - `audiolibro.php:332-333`
  - `audiolibro_player.php:74-77`
  - `audiolibro_player.php:321-322`
  - `f_user_video_audiolibros_insert.php:31-38`
  - `f_user_video_audiolibros_updatetime.php:42-50`
- Reglas de negocio observadas:
  - Si `video_audiolibro` esta vacio o vale `sin-audiolibro`, el flujo redirige a descarga (`audiolibro.php:71-74`, `audiolibro_player.php:74-77`).
  - La reproduccion marca `last_read = now()` sobre el registro del usuario (`audiolibro.php:332-333`, `audiolibro_player.php:321-322`).

## 10. Video resenas / reviews

- Descripcion: Hay un circuito de sugerencia publica y un circuito editorial/backend para fijar videos reseña en `ebooks_books` y registrar variantes en `videos_book` y `videos_sugeridos` (`sugerir_video.php:56-76`, `backend/addreviews_main.php:58-126`).
- Tablas involucradas: `ebooks_books`, `videos_book`, `videos_sugeridos`
- Campos usados:
  - `ebooks_books`: `uri`, `videos`, `videos_sugeridos`, `ebooks_books_lang`, `views`, `views_last`, `ebooks_books_updated`, `procesado`
  - `videos_book`: `videoid`, `libro_uri`, `rank`, `lang`
  - `videos_sugeridos`: `email`, `video`, `uri`
- Lecturas: `Q0449`, `Q0456`, `Q0457`, `Q0458`, `Q0459`, `Q1118`
- Escrituras: `Q0450`, `Q0451`, `Q0452`, `Q0453`, `Q0454`, `Q0455`, `Q0460`, `Q1119`
- Archivos clave:
  - `sugerir_video.php:56-76`
  - `backend/addreviews_main.php:58-126`
  - `backend/addreviews_main.php:134-180`
- Reglas de negocio observadas:
  - La sugerencia publica inserta `email`, `video` y `uri` en `videos_sugeridos` (`sugerir_video.php:74-76`).
  - El backend toma el mejor `videoid` por `rank desc`, o marca `sin-video`, y actualiza tanto `videos` como `videos_sugeridos` en `ebooks_books` (`backend/addreviews_main.php:61-95`).
  - El backend tambien arma una cola de libros sin video por `views`, `views_last` y `ebooks_books_updated` (`backend/addreviews_main.php:147-171`).

## 11. Busqueda (texto, autor, tags, etc.)

- Descripcion: La busqueda principal consulta `ebooks_books` y `ebooks_authors`; cuando falla, persiste el termino normalizado en `failed_searches` (`buscar.php:278-321`, `search_funcs.php:25-36`).
- Tablas involucradas: `ebooks_books`, `ebooks_authors`, `failed_searches`
- Campos usados:
  - `ebooks_books`: `ebooks_books_id`, `uri`, `ebooks_books_title`, `ebooks_books_subtitle`, `ebooks_books_file_alternative`, `descargar`, `video_audiolibro`, `ebooks_books_author`, `ebooks_format_epub`, `views`, `views_last`, `ebooks_books_lang`
  - `ebooks_authors`: `ebooks_authors_id`, `ebooks_authors_name`, `uri`
  - `failed_searches`: `id`, `normalized_text`, `cantidad`
- Lecturas: `Q0833`, `Q0834`, `Q0835`, `Q0836`, `Q1107`
- Escrituras: `Q1108`, `Q1109`
- Archivos clave:
  - `buscar.php:278-321`
  - `buscar.php:572-593`
  - `buscar.php:832-852`
  - `search_funcs.php:25-36`
- Reglas de negocio observadas:
  - Los filtros de busqueda incluyen variantes por idioma y por presencia de `video_audiolibro` (`buscar.php:278-281`, `buscar.php:572`, `buscar.php:832`).
  - Las busquedas fallidas acumulan contador por `normalized_text` en vez de insertar siempre una fila nueva (`search_funcs.php:25-35`).

## 12. Admin / logs / analytics / AB testing

- Descripcion: El backoffice cubre AB testing (`ab_events`), mailing (`mailing`, `mailing_users`), paneles de lectura (`user_books_log`) y edicion editorial sobre libros y videos (`ab_lib.php:60-102`, `mp_mailing.php:44-388`, `backend/addreviews_main.php:58-315`).
- Tablas involucradas: `ab_events`, `mailing`, `mailing_users`, `user_books_log`, `ebooks_books`, `videos_book`, `videos_sugeridos`, `user_table`
- Campos usados:
  - `ab_events`: `experiment`, `variant`, `event`, `session_id`, `user_agent`
  - `mailing`: `id`, `name`, `subject`, `message`, `is_global`, `last_mail`, `completed`
  - `mailing_users`: `mailing_id`, `email`, `status`, `sent_at`, `retries`, `id`
  - `user_books_log`: `user_id`, `book_id`, `page_number`, `read_at`
  - `ebooks_books`: `uri`, `videos`, `videos_sugeridos`, `procesado`
- Lecturas: `Q1048`, `Q1050`, `Q1052`, `Q1056`, `Q1057`, `Q1059`, `Q1061`, `Q1062`, `Q1065`, `Q1068`, `Q0449`
- Escrituras: `Q0001`, `Q0002`, `Q1047`, `Q1049`, `Q1051`, `Q1053`, `Q1054`, `Q1055`, `Q1058`, `Q1060`, `Q1063`, `Q1064`, `Q1066`, `Q1067`, `Q1069`, `Q0450`, `Q0451`, `Q0452`, `Q0453`, `Q0454`, `Q0455`, `Q0460`
- Archivos clave:
  - `ab_lib.php:60-102`
  - `mp_mailing.php:44-388`
  - `backend/addreviews_main.php:58-315`
  - `adm/adminlte/pages_read_adm.php:1-94`
- Reglas de negocio observadas:
  - AB testing solo registra eventos `impression` y `click` en `ab_events` (`ab_lib.php:60-69`, `ab_lib.php:90-99`).
  - Mailing elimina direcciones invalidas de la cola, reintenta errores y marca campania completa cuando no quedan pendientes (`mp_mailing.php:130-140`, `mp_mailing.php:193-220`, `mp_mailing.php:266-275`).
  - El cleanup borra campanias completadas con mas de 7 dias desde `last_mail` y campanias sin usuarios asociados (`mp_mailing.php:335-388`).

## Observaciones generales

- `favorites` existe en catalogo estructural, pero en este relevamiento no se detecto uso real de queries sobre esa tabla (`docs/db_audit/21_TABLE_USAGE.md`, seccion `favorites`).
- Hay features parcialmente soportadas por subsistemas externos (`blog/`, `userbase/`), pero este mapa prioriza el flujo principal del sitio PlanetaLibro y las tablas del catalogo principal.
