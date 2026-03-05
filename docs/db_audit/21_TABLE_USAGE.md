# Table Usage

Referencia base de tablas: `docs/db_audit/10_DB_CATALOG.md`.

## Tabla: `ab_events`

- Campos observados en c?digo: `experiment` (5), `event` (5), `variant` (4), `created_at` (4), `user_agent` (2), `session_id` (2), `fecha` (2)
- Reads: `Q0038`, `Q0039`, `Q0040`, `Q0041`, `Q0042`
- Writes: `Q0001`, `Q0002`
- Archivos involucrados: `ab_lib.php`, `adm/adminlte/ab_monitor_adm.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`

## Tabla: `avatars`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `blocked_ip_domains`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `books_tags`

- Campos observados en c?digo: `tag_id` (18), `book_id` (17), `id` (8), `ebooks_books_id` (8), `nombre_es` (4), `uri` (4), `views_last` (3), `ebooks_books_lang` (2), `lang` (2)
- Reads: `Q0043`, `Q0045`, `Q0353`, `Q0874`, `Q0964`, `Q0999`, `Q1000`, `Q1004`, `Q1122`, `Q1124`, `Q1203`, `Q1209`, `Q1210`, `Q1211`
- Writes: `Q0048`, `Q0049`, `Q0340`, `Q0347`
- Archivos involucrados: `adm/adminlte/adm_books_tags.php`, `adm/migrar_tags_20205.0.php`, `adm/migrar_tags_20205.php`, `adm/migrar_user_tags_from_library_2025.php`, `c_libro.php`, `libro.php`, `libro_funcs.php`, `tema.php`, `user_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Biblioteca del usuario / favoritos / guardar`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`

## Tabla: `categories`

- Campos observados en c?digo: `category_parent` (4), `category_id` (3), `name` (3), `category_name` (1), `title` (1)
- Reads: `Q0507`, `Q0508`, `Q0511`, `Q0537`, `Q0539`, `Q0546`, `Q0576`, `Q0592`, `Q0600`, `Q0631`, `Q0663`, `Q0726`, `Q0727`, `Q0760`, `Q0762`, `Q0797`, `Q0798`, `Q0799`, `Q0800`, `Q0827`, `Q0828`
- Writes: `Q0491`, `Q0492`, `Q0493`, `Q0494`, `Q0509`, `Q0562`, `Q0601`, `Q0633`, `Q0718`, `Q0720`
- Archivos involucrados: `blog/wp-admin/admin-db.php`, `blog/wp-admin/admin-functions.php`, `blog/wp-admin/import/dotclear.php`, `blog/wp-admin/import/textpattern.php`, `blog/wp-admin/index.php`, `blog/wp-admin/install.php`, `blog/wp-admin/link-import.php`, `blog/wp-admin/options-writing.php`, `blog/wp-admin/upgrade-functions.php`, `blog/wp-includes/cache.php`, `blog/wp-includes/functions-post.php`, `blog/wp-includes/functions.php`, `blog/wp-includes/template-functions-category.php`, `blog/wp-includes/template-functions-general.php`, `blog/xmlrpc.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `chats`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `comments`

- Campos observados en c?digo: `comment_date` (17), `comment_content` (15), `comment_id` (8), `spam` (7), `id` (3), `comment_parent` (1), `user_id` (1), `email` (1)
- Reads: `Q0520`, `Q0522`, `Q0523`, `Q0533`, `Q0540`, `Q0541`, `Q0545`, `Q0588`, `Q0590`, `Q0619`, `Q0634`, `Q0645`, `Q0646`, `Q0648`, `Q0649`, `Q0650`, `Q0653`, `Q0657`, `Q0658`, `Q0662`, `Q0669`, `Q0670`, `Q0672`, `Q0674`, `Q0675`, `Q0678`, `Q0681`, `Q0683`, `Q0684`, `Q0685`, `Q0686`, `Q0690`, `Q0692`, `Q0693`, `Q0761`, `Q0791`, `Q0793`, `Q0826`, `Q0829`, `Q0831`, `Q0832`
- Writes: `Q0565`, `Q0615`, `Q0620`, `Q0624`, `Q0625`, `Q0647`, `Q0651`, `Q0652`, `Q0668`, `Q0671`, `Q0677`, `Q0680`, `Q0687`, `Q0688`, `Q0689`, `Q0708`, `Q0723`
- Archivos involucrados: `blog/wp-admin/edit-comments.php`, `blog/wp-admin/edit.php`, `blog/wp-admin/index.php`, `blog/wp-admin/install.php`, `blog/wp-admin/menu.php`, `blog/wp-admin/moderation.php`, `blog/wp-admin/upgrade-functions.php`, `blog/wp-commentsrss2.php`, `blog/wp-content/plugins/akismet/akismet.php`, `blog/wp-content/themes/freedom-blue-plus/functions.php`, `blog/wp-content/themes/freedom-blue-plus/recent_comments.php`, `blog/wp-content/themes/redie-30/functions.php`, `blog/wp-includes/classes.php`, `blog/wp-includes/comment-functions.php`, `blog/wp-includes/functions-post.php`, `blog/wp-includes/functions.php`, `blog/wp-includes/pluggable-functions.php`, `blog/wp-trackback.php`, `blog/xmlrpc.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `download_log`

- Campos observados en c?digo: `download_log_object` (3), `download_log_status` (3), `download_log_type` (3), `ebooks_books_download_rank` (2), `ebooks_books_file` (2), `download_log_timestamp` (2), `ebooks_books_file_alternative` (1), `ebooks_books_ebookdate` (1), `libro` (1), `ebooks_books_doc_type` (1), `ebooks_books_subtitle` (1), `ebooks_books_title` (1), `ebooks_books_id` (1)
- Reads: `Q0912`, `Q0914`, `Q0915`, `Q0918`
- Writes: ninguno
- Archivos involucrados: `ebooks/adm/index.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `ebooks_authors`

- Campos observados en c?digo: `ebooks_authors_id` (56), `uri` (46), `ebooks_books_author` (38), `ebooks_authors_name` (35), `ebooks_books_title` (19), `ebooks_books_id` (17), `views` (15), `ebooks_books_file_alternative` (14), `ebooks_books_subtitle` (14), `dompub` (12), `ebooks_authors_rank` (11), `video_audiolibro` (10), `ebooks_books_txt_inf` (10), `descargar` (10), `ebooks_format_epub` (9), `views_last` (6), `ebooks_authors_surname` (5), `ebooks_authors_fallecimiento` (4), `read_online` (4), `ebooks_authors_ranked` (4), `libro` (3), `ebooks_books_updated` (3), `ebooks_books_lang` (3), `username` (2), `user_id` (2), `userid` (2), `email` (2), `ebooks_books_ebookdate` (2), `title` (2), `procesado` (2), `rank` (2), `ebooks_books_cover` (2), `id` (2), `video_audiolibro_revisado` (2), `link_p2p` (2), `pinterest` (2), `ebooks_format_pdf` (1), `recomendado` (1), `dompub_status` (1), `dompubreal` (1), `lang` (1)
- Reads: `Q0068`, `Q0070`, `Q0121`, `Q0122`, `Q0127`, `Q0128`, `Q0130`, `Q0239`, `Q0248`, `Q0251`, `Q0260`, `Q0264`, `Q0294`, `Q0296`, `Q0299`, `Q0329`, `Q0330`, `Q0332`, `Q0334`, `Q0372`, `Q0378`, `Q0382`, `Q0416`, `Q0418`, `Q0419`, `Q0422`, `Q0423`, `Q0425`, `Q0427`, `Q0429`, `Q0430`, `Q0432`, `Q0435`, `Q0441`, `Q0442`, `Q0443`, `Q0444`, `Q0446`, `Q0447`, `Q0464`, `Q0465`, `Q0469`, `Q0470`, `Q0833`, `Q0834`, `Q0835`, `Q0836`, `Q0841`, `Q0845`, `Q0860`, `Q0920`, `Q0922`, `Q0935`, `Q0953`, `Q0990`, `Q1027`, `Q1074`, `Q1075`, `Q1078`, `Q1092`, `Q1113`
- Writes: `Q0123`, `Q0240`, `Q0243`, `Q0245`, `Q0250`, `Q0380`, `Q0381`, `Q0448`, `Q0837`, `Q0838`, `Q0839`, `Q0840`, `Q0843`, `Q0887`, `Q0937`, `Q0938`
- Archivos involucrados: `adm/adminlte/canal_youtube_video_add.php`, `adm/adminlte/lanzamientos_adm.php`, `adm/autor_uris.php`, `adm/bkend_books_epub2html_lst.php`, `adm/blogpub.php`, `adm/dmca_admin.php`, `adm/dompub old.php`, `adm/dompub.php`, `adm/epub2html.php`, `adm/libro_video_publicar.php`, `adm/libroadm.php`, `adm/libroadm_abm_HACER.php`, `adm/list_autor_libros.php`, `adm/list_libros_top.php`, `adm/list_libros_top_publicar.php`, `adm/mejores_autores.php`, `adm/proc_copiar_covers.php`, `adm/rankear_autores.php`, `adm/sitemap_autor_crear.php`, `api/v1/gptsearch.php`, `app_list_autores_top.php`, `app_list_busqueda.php`, `app_list_libros_autor.php`, `app_list_libros_novedades.php`, `app_list_libros_recomendados.php`, `app_list_libros_top.php`, `app_list_libros_top_50.php`, `app_list_libros_usuario.php`, `autor.php`, `autor_funcs.php`, `autores.php`, `autores_funcs.php`, `backend/bkend_videos_audiolibros_lst.php`, `backend/bkend_videos_audiolibros_revisar.php`, `buscar.php`, `c_autor.php`, `c_libro.php`, `c_pl_autor.php`, `ebooks/adm/index.php`, `ebooks/adm/rankear_autores.php`, `indice_autores.php`, `libro_funcs.php`, `list_autores_top.php`, `pinterest.php`, `pinterest_rss.php`, `pl_funcs.php`, `sitemaps_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `B?squeda (texto, autor, tags, etc.)`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`

## Tabla: `ebooks_authors 2015-02`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_books`

- Campos observados en c?digo: `uri` (197), `ebooks_books_id` (102), `ebooks_books_title` (57), `views` (56), `ebooks_books_author` (50), `ebooks_authors_id` (45), `read_online` (44), `views_last` (42), `ebooks_books_lang` (34), `ebooks_books_updated` (33), `dompub` (32), `ebooks_books_file_alternative` (31), `user_id` (28), `ebooks_authors_name` (25), `descargar` (22), `ebooks_books_txt_inf` (21), `video_audiolibro` (21), `{COL_DYNAMIC}` (20), `videos` (18), `ebooks_books_subtitle` (18), `userid` (17), `ebooks_format_epub` (16), `ebooks_books_cover` (16), `username` (14), `ebooks_books_download_rank` (14), `lang` (13), `libro` (12), `last_read` (12), `book_id` (11), `title` (10), `ebooks_books_labels` (9), `has_video_review` (8), `procesado` (8), `texto_online` (8), `videos_sugeridos` (8), `tag_id` (7), `url_amazon` (6), `label_procesado` (6), `email` (6), `id` (6), `publicado` (5), `pedido` (5), `video` (5), `recomendado` (5), `demo` (5), `current_page` (5), `ebooks_books_file` (5), `ebooks_books_ebookdate` (4), `page_number` (4), `ebooks_format_pdf` (4), `cantidad` (4), `ebooks_format_mobi` (4), `views_last_week` (4), `pinterest` (4), `ebooks_books_txt_abs` (3), `link_gpt` (3), `read_at` (3), `dompub_status` (3), `ebooks_format_doc` (3), `video_audiolibro_revisado` (3), `views_last_year` (3), `libro_uri` (3), `pubfbig` (2), `pubfbig_readonline` (2), `ultimo_id` (2), `rank` (2), `link_p2p` (2), `download_log_object` (2), `ebooks_authors_surname` (2), `videoid` (2), `status` (1), `current_min` (1), `download_log_status` (1), `download_log_type` (1), `download_log_timestamp` (1), `ebooks_books_doc_type` (1), `link_hotmart` (1), `nombre_es` (1)
- Reads: `Q0003`, `Q0004`, `Q0005`, `Q0006`, `Q0007`, `Q0008`, `Q0009`, `Q0010`, `Q0011`, `Q0012`, `Q0013`, `Q0014`, `Q0015`, `Q0016`, `Q0017`, `Q0018`, `Q0019`, `Q0020`, `Q0021`, `Q0022`, `Q0023`, `Q0024`, `Q0025`, `Q0026`, `Q0027`, `Q0028`, `Q0029`, `Q0030`, `Q0031`, `Q0032`, `Q0033`, `Q0035`, `Q0044`, `Q0055`, `Q0056`, `Q0057`, `Q0058`, `Q0059`, `Q0061`, `Q0068`, `Q0069`, `Q0070`, `Q0078`, `Q0088`, `Q0096`, `Q0097`, `Q0101`, `Q0102`, `Q0103`, `Q0104`, `Q0105`, `Q0106`, `Q0107`, `Q0113`, `Q0114`, `Q0115`, `Q0117`, `Q0126`, `Q0127`, `Q0128`, `Q0129`, `Q0131`, `Q0132`, `Q0135`, `Q0136`, `Q0237`, `Q0238`, `Q0246`, `Q0247`, `Q0249`, `Q0252`, `Q0253`, `Q0254`, `Q0255`, `Q0258`, `Q0260`, `Q0262`, `Q0263`, `Q0264`, `Q0265`, `Q0266`, `Q0267`, `Q0268`, `Q0269`, `Q0270`, `Q0271`, `Q0272`, `Q0275`, `Q0276`, `Q0277`, `Q0278`, `Q0279`, `Q0280`, `Q0282`, `Q0285`, `Q0287`, `Q0288`, `Q0291`, `Q0292`, `Q0293`, `Q0295`, `Q0298`, `Q0306`, `Q0307`, `Q0308`, `Q0309`, `Q0310`, `Q0312`, `Q0316`, `Q0320`, `Q0323`, `Q0326`, `Q0327`, `Q0329`, `Q0330`, `Q0331`, `Q0332`, `Q0333`, `Q0337`, `Q0344`, `Q0355`, `Q0356`, `Q0357`, `Q0359`, `Q0370`, `Q0373`, `Q0374`, `Q0376`, `Q0377`, `Q0379`, `Q0383`, `Q0384`, `Q0385`, `Q0388`, `Q0389`, `Q0392`, `Q0393`, `Q0399`, `Q0409`, `Q0411`, `Q0415`, `Q0416`, `Q0417`, `Q0419`, `Q0420`, `Q0421`, `Q0422`, `Q0423`, `Q0424`, `Q0425`, `Q0426`, `Q0427`, `Q0428`, `Q0429`, `Q0430`, `Q0431`, `Q0432`, `Q0436`, `Q0437`, `Q0438`, `Q0439`, `Q0442`, `Q0444`, `Q0445`, `Q0456`, `Q0457`, `Q0458`, `Q0459`, `Q0463`, `Q0464`, `Q0465`, `Q0468`, `Q0469`, `Q0470`, `Q0473`, `Q0474`, `Q0475`, `Q0476`, `Q0477`, `Q0478`, `Q0833`, `Q0834`, `Q0835`, `Q0836`, `Q0856`, `Q0860`, `Q0864`, `Q0865`, `Q0912`, `Q0913`, `Q0914`, `Q0919`, `Q0921`, `Q0930`, `Q0931`, `Q0932`, `Q0934`, `Q0936`, `Q0947`, `Q0948`, `Q0949`, `Q0950`, `Q0951`, `Q0952`, `Q0987`, `Q0988`, `Q0989`, `Q0990`, `Q0991`, `Q0992`, `Q0993`, `Q0994`, `Q0995`, `Q0996`, `Q0997`, `Q0998`, `Q0999`, `Q1000`, `Q1001`, `Q1002`, `Q1003`, `Q1005`, `Q1006`, `Q1007`, `Q1011`, `Q1012`, `Q1019`, `Q1073`, `Q1074`, `Q1075`, `Q1079`, `Q1080`, `Q1081`, `Q1082`, `Q1083`, `Q1084`, `Q1085`, `Q1086`, `Q1087`, `Q1088`, `Q1089`, `Q1090`, `Q1091`, `Q1110`, `Q1111`, `Q1112`, `Q1114`, `Q1118`, `Q1122`, `Q1123`, `Q1124`, `Q1131`, `Q1132`, `Q1134`, `Q1135`, `Q1138`, `Q1140`, `Q1142`, `Q1144`, `Q1149`, `Q1150`, `Q1151`, `Q1152`, `Q1153`, `Q1154`, `Q1179`, `Q1182`, `Q1186`, `Q1189`, `Q1193`, `Q1204`, `Q1209`, `Q1210`, `Q1211`, `Q1212`, `Q1362`
- Writes: `Q0034`, `Q0036`, `Q0066`, `Q0067`, `Q0124`, `Q0125`, `Q0133`, `Q0137`, `Q0241`, `Q0242`, `Q0244`, `Q0256`, `Q0257`, `Q0259`, `Q0261`, `Q0273`, `Q0274`, `Q0286`, `Q0289`, `Q0290`, `Q0297`, `Q0300`, `Q0301`, `Q0302`, `Q0303`, `Q0304`, `Q0305`, `Q0311`, `Q0313`, `Q0317`, `Q0318`, `Q0319`, `Q0321`, `Q0322`, `Q0324`, `Q0325`, `Q0328`, `Q0358`, `Q0360`, `Q0369`, `Q0375`, `Q0394`, `Q0395`, `Q0396`, `Q0397`, `Q0401`, `Q0403`, `Q0405`, `Q0407`, `Q0412`, `Q0450`, `Q0451`, `Q0452`, `Q0453`, `Q0454`, `Q0455`, `Q0460`, `Q0461`, `Q0462`, `Q0466`, `Q0467`, `Q0483`, `Q0484`, `Q0839`, `Q0842`, `Q0847`, `Q0855`, `Q0857`, `Q0861`, `Q0862`, `Q0863`, `Q0866`, `Q0867`, `Q0868`, `Q0872`, `Q0888`, `Q0903`, `Q0933`, `Q0959`, `Q0960`, `Q0961`, `Q0962`, `Q0963`, `Q0965`, `Q0966`, `Q0969`, `Q0970`, `Q0971`, `Q0972`, `Q0973`, `Q0974`, `Q0975`, `Q1008`, `Q1009`, `Q1039`, `Q1076`, `Q1093`, `Q1094`, `Q1095`, `Q1096`, `Q1098`, `Q1099`, `Q1103`, `Q1105`
- Archivos involucrados: `adm/adm_books_funcs.php`, `adm/adm_stats.php`, `adm/adm_upload_epub.php`, `adm/adminlte/adm_books_tags.php`, `adm/adminlte/adm_libros_pedidos.php`, `adm/adminlte/adm_sin_video.php`, `adm/adminlte/canal_youtube_video_add VIEJOOK.php`, `adm/adminlte/canal_youtube_video_add.php`, `adm/adminlte/lanzamientos_adm.php`, `adm/adminlte/pages_read_adm - v1.php`, `adm/adminlte/pages_read_adm.php`, `adm/adminlte/pages_read_adm2025-03-10.php`, `adm/adminlte/user_books.php`, `adm/adminlte/user_books0_ok.php`, `adm/adminlte/user_books_bak_temporal.php`, `adm/bkend_books_epub2html_lst.php`, `adm/blogpub.php`, `adm/categorias_actualizar.php`, `adm/crearuris.php`, `adm/descargar_pdf_remotos.php`, `adm/dmca_admin.php`, `adm/dompub old.php`, `adm/dompub.php`, `adm/dompub_status.php`, `adm/editor_epub.php`, `adm/epub2html.php`, `adm/fbpub.php`, `adm/file_link.php`, `adm/file_link_setbook_core.php`, `adm/file_link_stats.php`, `adm/gmail_leer.php`, `adm/index_cover_upd.php`, `adm/kindle_pedidos.php`, `adm/libro_duplicar.php`, `adm/libro_editinfo.php`, `adm/libro_video_publicar.php`, `adm/libroadm.php`, `adm/libroadm_abm_HACER.php`, `adm/libros_adm.php`, `adm/libros_bloquear_descarga.php`, `adm/libros_faltantes.php`, `adm/libros_que_faltan_subir.php`, `adm/libros_subir.php`, `adm/libros_subir_nuevos.php`, `adm/libros_videos_lst.php`, `adm/list_autor_libros.php`, `adm/list_libros_top.php`, `adm/list_libros_top_publicar.php`, `adm/migrar_tags_20205.0.php`, `adm/migrar_tags_20205.php`, `adm/mobi_adm.php`, `adm/mobi_adm_upload.php`, `adm/pdf_adm_upload.php`, `adm/proc_copiar_covers.php`, `adm/procesar_libros.php`, `adm/procesar_un_libro.php`, `adm/rankear_autores.php`, `adm/sitemap_crear.php`, `adm/sitemap_crear_en.php`, `adm/sitemap_readonline_crear.php`, `adm/stats.php`, `adm/testepub2html.php`, `adm/textos_online.php`, `adm/user_suscripcion_mva_admin.php`, `adm/user_suscripcion_odysee_admin.php`, `adm/user_suscripcion_youtube_admin.php`, `adm/user_suscripcion_youtube_video_admin.php`, `adm/usuarios_libros_borrar.php`, `adm/videos_sugeridos_list.php`, `api/siguiente-libro.php`, `api/v1/gptsearch.php`, `app_libro_info.php`, `app_list_busqueda.php`, `app_list_libros.php`, `app_list_libros_autor.php`, `app_list_libros_novedades.php`, `app_list_libros_recomendados.php`, `app_list_libros_top.php`, `app_list_libros_top_50.php`, `app_list_libros_usuario.php`, `autor.php`, `autor_funcs.php`, `autores.php`, `backend/addreviews_main.php`, `backend/bkend_videos_audiolibros_lst.php`, `backend/bkend_videos_audiolibros_revisar.php`, `backend/bkend_videos_stats.php`, `backend/f_libro_videos_insert.php`, `buscar.php`, `c_autor.php`, `c_libro.php`, `c_pl_libro.php`, `descargar.php`, `ebooks/adm/index.php`, `ebooks/adm/mp_megaupload.php`, `ebooks/adm/mp_megaupload_setbook_core.php`, `ebooks/adm/rankear_autores.php`, `index.php`, `index_2025.0.php`, `libro.php`, `libro_2023.php`, `libro_2024x1.php`, `libro_funcs.php`, `libro_zapping_funcs.php`, `mp_booktube_funcs.php`, `pinterest.php`, `pinterest_rss.php`, `pl_funcs.php`, `pl_videos_funcs.php`, `resumen.php`, `siguiente_libro.php`, `sitemaps_funcs.php`, `sugerir_video.php`, `tema.php`, `test/iscroll.php`, `test/testjquery2.php`, `test/testtemplate.php`, `trivia_funcs.php`, `user_funcs.php`, `xapi/v1/index.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `B?squeda (texto, autor, tags, etc.)`, `Biblioteca del usuario / favoritos / guardar`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`, `Video rese?as / reviews`

## Tabla: `ebooks_categories`

- Campos observados en c?digo: `ebooks_categories_nicename` (10), `ebooks_categories_category` (8), `ebooks_categories_rank` (4), `ebooks_categories_id` (2), `name` (1), `tema` (1), `lang` (1)
- Reads: `Q0893`, `Q0894`, `Q0904`, `Q0906`, `Q1077`, `Q1120`, `Q1121`, `Q1125`, `Q1126`
- Writes: `Q0134`, `Q0850`, `Q0895`, `Q0896`, `Q0905`
- Archivos involucrados: `adm/categorias_actualizar.php`, `c_category.php`, `c_tema.php`, `ebooks/adm/actualizar_categorias.php`, `ebooks/adm/index.php`, `pl_funcs.php`, `tema.php`, `temas.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Cat?logo de libros (listado/detalle)`

## Tabla: `ebooks_digitalizar`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_formats`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_mva_textos`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_packs`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_packs_ebooks`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_packs_users`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_publishers`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_ranking_historic`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `ebooks_trivia_questions`

- Campos observados en c?digo: `ebooks_books_id` (8), `book_id` (7), `respuesta_correcta` (6), `pregunta` (6), `tema` (6), `id` (6), `explicacion` (5), `respuesta_falsa1` (5), `respuesta_falsa2` (5), `punto_clave` (5), `ebook_id` (1)
- Reads: `Q0875`, `Q1013`, `Q1139`, `Q1141`, `Q1143`, `Q1145`
- Writes: `Q1136`, `Q1137`
- Archivos involucrados: `c_libro.php`, `libro_funcs.php`, `trivia_funcs.php`
- Features relacionadas: `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`

## Tabla: `ebooks_users_ebooks`

- Campos observados en c?digo: `ebooks_users_ebooks_last_read_from` (2), `ebooks_users_ebooks_current_page` (2), `ebooks_users_ebooks_html_access` (2), `ebooks_users_ebooks_wap_access` (2), `ebooks_users_ebooks_first_read` (2), `ebooks_users_ebooks_last_read` (2), `ebooks_books_file` (2), `sys_users_code` (2), `pagina` (2), `libro` (2), `ebooks_books_id` (1), `uri` (1)
- Reads: `Q0916`, `Q0917`
- Writes: `Q0867`
- Archivos involucrados: `c_libro.php`, `ebooks/adm/index.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `failed_login`

- Campos observados en c?digo: `failedid` (3), `setid` (3), `country` (2), `code` (2), `current_attempt` (1), `inital_attempt` (1), `refurl` (1), `ipad` (1), `name` (1), `loc` (1)
- Reads: `Q1226`, `Q1227`
- Writes: `Q1311`, `Q1312`
- Archivos involucrados: `userbase/includes/lightwork_adminclass.php`, `userbase/includes/lightwork_userclass.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `failed_searches`

- Campos observados en c?digo: `id` (5), `cantidad` (5), `normalized_text` (4)
- Reads: `Q0063`, `Q0064`, `Q0065`, `Q1107`
- Writes: `Q0062`, `Q1108`, `Q1109`
- Archivos involucrados: `adm/adminlte/busquedas_fallidas_adm.php`, `search_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `B?squeda (texto, autor, tags, etc.)`, `Descargas (dominio p?blico, l?mites)`

## Tabla: `favorites`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `libros_pedidos`

- Campos observados en c?digo: `libro` (27), `publicado` (17), `pedido` (15), `uri` (6), `email` (6), `views_last` (5), `{COL_DYNAMIC}` (3), `status` (3), `id` (3), `read_online` (2), `dompub` (2), `views` (2), `ebooks_books_txt_inf` (1), `label_procesado` (1)
- Reads: `Q0007`, `Q0020`, `Q0027`, `Q0055`, `Q0056`, `Q0058`, `Q0060`, `Q0281`, `Q0283`, `Q0284`, `Q0315`, `Q0876`, `Q0877`, `Q0880`
- Writes: `Q0037`, `Q0050`, `Q0051`, `Q0052`, `Q0053`, `Q0054`, `Q0314`, `Q0361`, `Q0371`, `Q0398`, `Q0878`, `Q0879`, `Q0881`, `Q0882`, `Q0883`, `Q0884`, `Q0885`, `Q0954`, `Q0955`, `Q1072`
- Archivos involucrados: `adm/adm_books_funcs.php`, `adm/adm_upload_epub.php`, `adm/adminlte/adm_libros_pedidos.php`, `adm/kindle_pedidos.php`, `adm/kindle_stats.php`, `adm/libros_pedidos.php`, `adm/mobi_adm_upload.php`, `adm/pdf_adm_upload.php`, `adm/textos_online.php`, `c_libros_pedidos.php`, `kindle_pedir.php`, `pedir_libro.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Lectura online + p?ginas + progreso`

## Tabla: `libros_pedidos_old`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `mailing`

- Campos observados en c?digo: `id` (12), `mailing_id` (9), `completed` (5), `is_global` (2), `name` (2), `message` (2), `subject` (2), `last_mail` (2)
- Reads: `Q0073`, `Q1052`, `Q1059`, `Q1061`, `Q1062`, `Q1065`, `Q1068`
- Writes: `Q1047`, `Q1055`, `Q1060`, `Q1064`, `Q1067`, `Q1069`
- Archivos involucrados: `adm/adminlte/mailing_adm.php`, `mp_mailing.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`

## Tabla: `mailing_users`

- Campos observados en c?digo: `mailing_id` (9), `status` (7), `email` (5), `id` (4), `sent_at` (3), `user_email` (2), `retries` (1)
- Reads: `Q0071`, `Q0072`, `Q0074`, `Q0075`, `Q1050`, `Q1056`, `Q1068`, `Q1197`, `Q1198`
- Writes: `Q1049`, `Q1051`, `Q1053`, `Q1054`, `Q1058`, `Q1063`, `Q1066`
- Archivos involucrados: `adm/adminlte/mailing_adm.php`, `mp_mailing.php`, `user_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Biblioteca del usuario / favoritos / guardar`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`

## Tabla: `migracion_estado`

- Campos observados en c?digo: `ultimo_id` (9), `proceso` (9)
- Reads: `Q0335`, `Q0342`, `Q0349`
- Writes: `Q0336`, `Q0341`, `Q0343`, `Q0348`, `Q0350`, `Q0354`
- Archivos involucrados: `adm/migrar_tags_20205.0.php`, `adm/migrar_tags_20205.php`, `adm/migrar_user_tags_from_library_2025.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`

## Tabla: `mp_antispam`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `mp_config`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `sneakers`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `stats_browser`

- Campos observados en c?digo: `browser_name` (2), `usergroup` (2), `groupid` (2), `country` (2), `userid` (2), `valid` (2), `code` (2), `browser_code` (1), `date_joined` (1), `screenname` (1), `last_visit` (1), `mobilenum` (1), `lang_code` (1), `refdomain` (1), `language` (1), `browser` (1), `contact` (1), `lastip` (1), `refurl` (1), `email` (1), `refid` (1), `ipad` (1), `lang` (1), `name` (1), `os` (1)
- Reads: `Q1251`, `Q1253`
- Writes: `Q1262`
- Archivos involucrados: `userbase/includes/lightwork_adminclass.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `stats_country_ip`

- Campos observados en c?digo: `2letter` (1), `ipstart` (1), `ipend` (1)
- Reads: `Q1279`
- Writes: ninguno
- Archivos involucrados: `userbase/includes/lightwork_general.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `stats_country_iso_codes`

- Campos observados en c?digo: `country` (8), `code` (8), `usergroup` (6), `groupid` (6), `userid` (6), `name` (5), `valid` (5), `ipad` (4), `screenname` (4), `email` (4), `date_joined` (3), `last_visit` (3), `lastip` (3), `failedid` (2), `refurl` (2), `setid` (2), `contact` (2), `refid` (2), `current_attempt` (1), `inital_attempt` (1), `loc` (1), `browser_code` (1), `browser_name` (1), `mobilenum` (1), `lang_code` (1), `refdomain` (1), `language` (1), `browser` (1), `lang` (1), `os` (1), `sname` (1), `fname` (1)
- Reads: `Q1226`, `Q1227`, `Q1248`, `Q1253`, `Q1257`, `Q1258`, `Q1259`, `Q1263`
- Writes: `Q1262`
- Archivos involucrados: `userbase/includes/lightwork_adminclass.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `stats_lang`

- Campos observados en c?digo: `language` (2), `usergroup` (2), `groupid` (2), `country` (2), `userid` (2), `valid` (2), `code` (2), `browser_code` (1), `browser_name` (1), `date_joined` (1), `screenname` (1), `last_visit` (1), `mobilenum` (1), `lang_code` (1), `refdomain` (1), `browser` (1), `contact` (1), `lastip` (1), `refurl` (1), `email` (1), `refid` (1), `ipad` (1), `lang` (1), `name` (1), `os` (1)
- Reads: `Q1249`, `Q1253`
- Writes: `Q1262`
- Archivos involucrados: `userbase/includes/lightwork_adminclass.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `sys_users`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `sys_users_email`

- Campos observados en c?digo: `sys_users_email` (5), `sys_users_email_timestamp` (4), `sys_users_email_type` (4), `libro` (3), `sys_users_email_doc_type` (2), `videos` (1), `sys_users_email_doc` (1)
- Reads: `Q0907`, `Q0908`, `Q0909`, `Q0910`, `Q0911`
- Writes: ninguno
- Archivos involucrados: `ebooks/adm/index.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `tags`

- Campos observados en c?digo: `id` (15), `uri` (12), `tag_id` (11), `nombre_es` (9), `book_id` (8), `ebooks_books_id` (4), `ranking` (3), `ebooks_books_lang` (2), `lang` (2), `views_last` (2), `cantidad` (2), `user_id` (2)
- Reads: `Q0043`, `Q0047`, `Q0346`, `Q0852`, `Q0853`, `Q0854`, `Q0874`, `Q0964`, `Q0999`, `Q1000`, `Q1004`, `Q1122`, `Q1124`, `Q1207`, `Q1213`, `Q1214`
- Writes: `Q0046`, `Q0345`, `Q0851`
- Archivos involucrados: `adm/adminlte/adm_books_tags.php`, `adm/migrar_tags_20205.php`, `c_category.php`, `c_libro.php`, `libro.php`, `libro_funcs.php`, `tema.php`, `user_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Biblioteca del usuario / favoritos / guardar`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`

## Tabla: `tareas`

- Campos observados en c?digo: `next_exec` (2), `enabled` (2), `script` (2), `prioridad` (1), `last_exec` (1), `contador` (1), `id` (1), `value` (1)
- Reads: `Q0889`, `Q0890`
- Writes: `Q0891`, `Q0892`
- Archivos involucrados: `c_tarea.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `users`

- Campos observados en c?digo: `user_login` (9), `user_pass` (6), `user_email` (5), `id` (2), `user_url` (2), `user_id` (1), `title` (1)
- Reads: `Q0487`, `Q0538`, `Q0552`, `Q0578`, `Q0585`, `Q0586`, `Q0607`, `Q0609`, `Q0629`, `Q0641`, `Q0642`, `Q0787`, `Q0789`, `Q0796`, `Q0801`, `Q0820`, `Q0822`, `Q0823`
- Writes: `Q0500`, `Q0567`, `Q0608`, `Q0610`, `Q0616`, `Q0630`, `Q0794`, `Q0795`, `Q0819`, `Q0821`
- Archivos involucrados: `blog/wp-admin/admin-db.php`, `blog/wp-admin/import/mt.php`, `blog/wp-admin/install.php`, `blog/wp-admin/link-manager.php`, `blog/wp-admin/upgrade-functions.php`, `blog/wp-admin/users.php`, `blog/wp-includes/pluggable-functions.php`, `blog/wp-includes/registration-functions.php`, `blog/wp-includes/template-functions-author.php`, `blog/wp-includes/template-functions-general.php`, `blog/wp-login.php`, `blog/wp-mail.php`, `blog/wp-register.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `users_copy`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `user_books`

- Campos observados en c?digo: `user_id` (55), `ebooks_books_id` (50), `userid` (35), `last_read` (24), `username` (16), `current_page` (13), `uri` (12), `ebooks_books_title` (11), `id` (7), `read_online` (6), `email` (6), `libro` (6), `book_id` (3), `ebooks_authors_name` (2), `ebooks_books_author` (2), `ebooks_authors_id` (2), `demo` (2), `ebooks_books_lang` (2), `first_read` (2), `pedido` (1), `ultimo_id` (1), `leidas` (1)
- Reads: `Q0059`, `Q0068`, `Q0101`, `Q0102`, `Q0103`, `Q0104`, `Q0105`, `Q0106`, `Q0107`, `Q0108`, `Q0109`, `Q0110`, `Q0111`, `Q0112`, `Q0113`, `Q0114`, `Q0115`, `Q0116`, `Q0117`, `Q0118`, `Q0119`, `Q0120`, `Q0262`, `Q0263`, `Q0264`, `Q0351`, `Q0352`, `Q0390`, `Q0391`, `Q0392`, `Q0393`, `Q0408`, `Q0409`, `Q0967`, `Q0968`, `Q0994`, `Q0996`, `Q0997`, `Q1010`, `Q1086`, `Q1106`, `Q1127`, `Q1128`, `Q1178`, `Q1181`, `Q1184`, `Q1185`, `Q1196`, `Q1215`, `Q1352`, `Q1354`, `Q1356`, `Q1358`
- Writes: `Q0866`, `Q0956`, `Q1133`, `Q1146`, `Q1147`, `Q1177`, `Q1180`, `Q1183`, `Q1187`, `Q1190`, `Q1195`
- Archivos involucrados: `adm/adminlte/adm_libros_pedidos.php`, `adm/adminlte/canal_youtube_video_add.php`, `adm/adminlte/user_books.php`, `adm/adminlte/user_books0_ok.php`, `adm/adminlte/user_books_bak_temporal.php`, `adm/epub2html.php`, `adm/migrar_user_tags_from_library_2025.php`, `adm/stats.php`, `adm/testepub2html.php`, `adm/usuarios_libros_borrar.php`, `c_libro.php`, `leerlibro_funcs.php`, `libro_2023.php`, `libro_funcs.php`, `pl_funcs.php`, `resumen.php`, `template_funcs.php`, `test/testjquery2.php`, `user_books_delete.php`, `user_funcs.php`, `usuario_biblioteca.php`, `usuario_biblioteca_audiolibros.php`, `usuario_biblioteca_libros.php`, `usuario_biblioteca_libros2024.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Biblioteca del usuario / favoritos / guardar`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`

## Tabla: `user_books_log`

- Campos observados en c?digo: `read_at` (16), `user_id` (12), `fecha` (8), `page_number` (5), `book_id` (5), `uri` (5), `ebooks_books_title` (4), `ebooks_books_id` (4)
- Reads: `Q0076`, `Q0077`, `Q0078`, `Q0080`, `Q0081`, `Q0082`, `Q0083`, `Q0085`, `Q0086`, `Q0087`, `Q0088`, `Q0090`, `Q0091`, `Q0092`, `Q0093`, `Q0095`, `Q0096`, `Q0097`, `Q0098`, `Q0099`, `Q0100`, `Q1020`
- Writes: `Q0957`
- Archivos involucrados: `adm/adminlte/pages_read_adm - v1.php`, `adm/adminlte/pages_read_adm.php`, `adm/adminlte/pages_read_adm2025-03-10.php`, `leerlibro_funcs.php`, `libro_zapping_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Lectura online + p?ginas + progreso`

## Tabla: `user_groups`

- Campos observados en c?digo: `groupid` (13), `valid` (10), `name` (6), `usergroup` (6), `country` (6), `userid` (6), `code` (6), `screenname` (4), `email` (4), `date_joined` (3), `last_visit` (3), `lastip` (3), `ipad` (3), `contact` (2), `refid` (2), `expire_in_days` (1), `group_type` (1), `descip` (1), `fee` (1), `status` (1), `browser_code` (1), `browser_name` (1), `mobilenum` (1), `lang_code` (1), `refdomain` (1), `language` (1), `browser` (1), `refurl` (1), `lang` (1), `os` (1), `sname` (1), `fname` (1)
- Reads: `Q1216`, `Q1237`, `Q1252`, `Q1253`, `Q1257`, `Q1258`, `Q1259`, `Q1260`, `Q1261`, `Q1263`, `Q1267`
- Writes: `Q1232`, `Q1234`, `Q1235`, `Q1236`, `Q1262`
- Archivos involucrados: `userbase/includes/lightwork_adminclass.php`
- Features relacionadas: NO CONFIRMADO

## Tabla: `user_groups_copy`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `user_table`

- Campos observados en c?digo: `userid` (80), `email` (47), `username` (28), `valid` (27), `date_joined` (20), `ebooks_books_id` (19), `user_id` (19), `screenname` (15), `refurl` (13), `paid` (13), `last_visit` (13), `last_read` (12), `usergroup` (10), `ebooks_books_title` (8), `groupid` (8), `ipad` (8), `uri` (7), `country` (7), `lastip` (7), `renew_date` (6), `code` (6), `cookie_id` (6), `current_page` (5), `remember_token` (5), `fee` (5), `cookie_expire` (5), `cookie_salt` (5), `fecha` (4), `name` (4), `credit` (3), `contact` (3), `refid` (3), `smstok` (3), `acti_code` (3), `temppass` (3), `tp_flag` (3), `ebooks_authors_name` (2), `ebooks_books_author` (2), `ebooks_authors_id` (2), `id` (2), `password` (2), `p_hash` (2), `value` (2), `status` (2), `mobilenum` (2), `refdomain` (2), `browser` (2), `lang` (2), `os` (2), `date_visited` (2), `visitid` (2), `lp_flag` (2), `landingpage` (2), `smstimedate` (2), `oneuse` (2), `tpdate` (2), `tpip` (2), `current_min` (1), `token` (1), `browser_code` (1), `browser_name` (1), `lang_code` (1), `language` (1), `reg_flag` (1), `domain` (1), `sname` (1), `fname` (1), `authentication_source` (1), `openidurl` (1), `smsip` (1), `s_hash` (1)
- Reads: `Q0033`, `Q0068`, `Q0079`, `Q0084`, `Q0089`, `Q0094`, `Q0101`, `Q0102`, `Q0103`, `Q0108`, `Q0109`, `Q0113`, `Q0114`, `Q0115`, `Q0116`, `Q0120`, `Q0262`, `Q0263`, `Q0264`, `Q0389`, `Q0392`, `Q0393`, `Q0400`, `Q0402`, `Q0404`, `Q0406`, `Q0409`, `Q0945`, `Q1028`, `Q1030`, `Q1032`, `Q1033`, `Q1034`, `Q1057`, `Q1148`, `Q1166`, `Q1167`, `Q1168`, `Q1169`, `Q1170`, `Q1173`, `Q1174`, `Q1200`, `Q1201`, `Q1217`, `Q1228`, `Q1233`, `Q1253`, `Q1254`, `Q1255`, `Q1257`, `Q1258`, `Q1259`, `Q1263`, `Q1265`, `Q1266`, `Q1268`, `Q1282`, `Q1284`, `Q1286`, `Q1288`, `Q1290`, `Q1292`, `Q1294`, `Q1295`, `Q1300`, `Q1302`, `Q1306`, `Q1307`, `Q1308`, `Q1315`, `Q1318`, `Q1320`, `Q1321`, `Q1325`, `Q1326`, `Q1327`, `Q1328`, `Q1329`, `Q1330`, `Q1331`, `Q1332`, `Q1351`, `Q1353`, `Q1355`, `Q1357`
- Writes: `Q0946`, `Q1029`, `Q1031`, `Q1035`, `Q1036`, `Q1155`, `Q1156`, `Q1157`, `Q1158`, `Q1159`, `Q1160`, `Q1161`, `Q1162`, `Q1163`, `Q1164`, `Q1165`, `Q1171`, `Q1172`, `Q1218`, `Q1222`, `Q1223`, `Q1224`, `Q1229`, `Q1230`, `Q1231`, `Q1241`, `Q1256`, `Q1262`, `Q1269`, `Q1270`, `Q1301`, `Q1303`, `Q1304`, `Q1305`, `Q1309`, `Q1310`, `Q1313`, `Q1314`, `Q1316`, `Q1317`, `Q1319`, `Q1322`, `Q1323`, `Q1324`, `Q1341`, `Q1343`, `Q1346`, `Q1348`
- Archivos involucrados: `adm/adm_stats.php`, `adm/adminlte/canal_youtube_video_add.php`, `adm/adminlte/pages_read_adm - v1.php`, `adm/adminlte/pages_read_adm.php`, `adm/adminlte/user_books.php`, `adm/adminlte/user_books0_ok.php`, `adm/adminlte/user_books_bak_temporal.php`, `adm/epub2html.php`, `adm/stats.php`, `adm/testepub2html.php`, `adm/user_suscripcion_mva_admin.php`, `adm/user_suscripcion_odysee_admin.php`, `adm/user_suscripcion_youtube_admin.php`, `adm/user_suscripcion_youtube_video_admin.php`, `adm/usuarios_libros_borrar.php`, `google-callback.php`, `login.php`, `login2.php`, `login_recover - 0.php`, `login_recover.php`, `login_register.php`, `logout.php`, `mp_mailing.php`, `user_funcs.php`, `userbase/includes/lightwork_adminclass.php`, `userbase/includes/lightwork_sitestats.php`, `userbase/includes/lightwork_userclass.php`, `userbase/includes/lightwork_validate.php`, `userbase/includes/payment_inc/sc_inc.php`, `userbase/includes/payment_inc/sp_inc.php`, `userbase/index (copia)/logout.php`, `userbase/index/logout.php`, `usuario_biblioteca.php`, `usuario_biblioteca_audiolibros.php`, `usuario_biblioteca_libros.php`, `usuario_biblioteca_libros2024.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Auth/Login/Registro/Recuperaci?n`, `Biblioteca del usuario / favoritos / guardar`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`, `Sesiones / cookies / tokens`

## Tabla: `user_table_copy`

- Campos observados en c?digo: Sin uso detectado
- Reads: ninguno
- Writes: ninguno
- Archivos involucrados: ninguno
- Features relacionadas: ninguna

## Tabla: `user_tags`

- Campos observados en c?digo: `user_id` (6), `tag_id` (6), `cantidad` (5), `nombre_es` (2), `id` (2), `uri` (1)
- Reads: `Q1205`, `Q1206`, `Q1208`, `Q1213`, `Q1214`
- Writes: `Q1202`
- Archivos involucrados: `user_funcs.php`
- Features relacionadas: `Biblioteca del usuario / favoritos / guardar`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`

## Tabla: `user_video_audiolibros`

- Campos observados en c?digo: `ebooks_books_id` (15), `user_id` (13), `userid` (12), `last_read` (6), `ebooks_books_title` (3), `current_min` (3), `libro` (3), `username` (2), `id` (2), `uri` (1), `first_read` (1), `max_min` (1), `book_id` (1)
- Reads: `Q0033`, `Q0386`, `Q0387`, `Q0388`, `Q0389`, `Q1129`, `Q1175`, `Q1188`, `Q1192`
- Writes: `Q0433`, `Q0434`, `Q0868`, `Q0939`, `Q0940`, `Q0941`, `Q1176`, `Q1191`, `Q1194`
- Archivos involucrados: `adm/adm_stats.php`, `adm/stats.php`, `audiolibro.php`, `audiolibro_player.php`, `c_libro.php`, `f_user_video_audiolibros_insert.php`, `f_user_video_audiolibros_updatetime.php`, `template_funcs.php`, `user_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Audiolibros (YouTube u otros)`, `Biblioteca del usuario / favoritos / guardar`, `Lectura online + p?ginas + progreso`, `Perfil de usuario`, `Premium / +18 / sin anuncios / suscripciones`

## Tabla: `videos`

- Campos observados en c?digo: `videos` (23), `uri` (12), `views` (4), `video` (4), `ebooks_books_lang` (4), `videoid` (3), `ebooks_books_title` (2), `ebooks_format_epub` (2), `dompub` (2), `channelid` (2), `id` (2), `youtubeid` (2), `libro_uri` (2), `{COL_DYNAMIC}` (1), `videos_sugeridos` (1), `ebooks_format_mobi` (1), `ebooks_format_pdf` (1), `ebooks_format_doc` (1), `read_online` (1), `views_last` (1), `ebooks_books_updated` (1), `ebooks_books_subtitle` (1), `ebooks_books_txt_inf` (1), `ebooks_books_author` (1), `ebooks_books_labels` (1), `ebooks_books_cover` (1), `descargar` (1), `sys_users_email_timestamp` (1), `sys_users_email_doc_type` (1), `sys_users_email_type` (1), `sys_users_email` (1), `libro` (1), `channeltitle` (1), `thumbnail` (1), `title` (1)
- Reads: `Q0061`, `Q0327`, `Q0411`, `Q0417`, `Q0457`, `Q0458`, `Q0459`, `Q0474`, `Q0477`, `Q0909`, `Q0985`, `Q0986`, `Q1070`
- Writes: `Q0325`, `Q0450`, `Q0452`, `Q0454`, `Q0483`, `Q0862`, `Q0888`, `Q1071`, `Q1098`, `Q1103`
- Archivos involucrados: `adm/adminlte/adm_sin_video.php`, `adm/libros_videos_lst.php`, `adm/videos_sugeridos_list.php`, `app_libro_info.php`, `backend/addreviews_main.php`, `backend/bkend_videos_stats.php`, `backend/f_libro_videos_insert.php`, `c_libro.php`, `c_pl_libro.php`, `ebooks/adm/index.php`, `libro_funcs.php`, `mp_youtube_funcs.php`, `pl_videos_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`, `Video rese?as / reviews`

## Tabla: `videos_book`

- Campos observados en c?digo: `libro_uri` (26), `rank` (15), `videoid` (14), `is_short` (10), `lang` (6), `fecha` (5), `id` (4), `userid` (4), `uri` (3), `libro` (1), `youtubeid` (1)
- Reads: `Q0440`, `Q0449`, `Q0471`, `Q0976`, `Q0977`, `Q0978`, `Q0979`, `Q0980`, `Q0981`, `Q0982`, `Q0983`, `Q0984`, `Q1014`, `Q1015`, `Q1016`, `Q1017`, `Q1018`, `Q1021`, `Q1022`, `Q1023`, `Q1024`, `Q1025`, `Q1026`, `Q1037`, `Q1038`
- Writes: `Q0869`, `Q0942`, `Q1097`, `Q1100`, `Q1101`, `Q1102`, `Q1115`, `Q1116`, `Q1117`, `Q1359`, `Q1360`, `Q1361`
- Archivos involucrados: `autor_funcs.php`, `backend/addreviews_main.php`, `backend/bkend_videos_book_listado.php`, `c_libro.php`, `f_video_subirrank.php`, `libro_funcs.php`, `libro_zapping_funcs.php`, `mp_booktube_funcs.php`, `pl_videos_funcs.php`, `srvapi/planetalibroadm-vok.php`, `srvapi/planetalibroadm.php`, `srvapi/planetalibroadm_v1 ok.php`, `video_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Cat?logo de libros (listado/detalle)`, `Descargas (dominio p?blico, l?mites)`, `Video rese?as / reviews`

## Tabla: `videos_sugeridos`

- Campos observados en c?digo: `videos_sugeridos` (13), `uri` (10), `video` (5), `videos` (1), `libro_uri` (1), `videoid` (1), `email` (1)
- Reads: `Q0411`, `Q0414`
- Writes: `Q0410`, `Q0412`, `Q0413`, `Q0451`, `Q0453`, `Q0455`, `Q0484`, `Q0863`, `Q0870`, `Q1099`, `Q1119`
- Archivos involucrados: `adm/videos_sugeridos_list.php`, `backend/addreviews_main.php`, `backend/f_libro_videos_insert.php`, `c_libro.php`, `pl_videos_funcs.php`, `sugerir_video.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Video rese?as / reviews`

## Tabla: `video_audiolibros`

- Campos observados en c?digo: `fecha` (5), `userid` (4), `libro_uri` (2), `vozhumana` (1), `completo` (1), `videoid` (1)
- Reads: `Q0472`, `Q0479`, `Q0480`, `Q0481`, `Q0482`
- Writes: `Q0871`, `Q1104`
- Archivos involucrados: `backend/bkend_videos_stats.php`, `c_libro.php`, `pl_videos_funcs.php`
- Features relacionadas: `Admin / logs / analytics / AB testing`, `Video rese?as / reviews`

## Tabla: `visit_stats`

- Campos observados en c?digo: `date_visited` (12), `visitid` (9), `lp_flag` (5), `landingpage` (4), `refurl` (3), `reg_flag` (2), `date_joined` (2), `userid` (2), `searchengine` (1), `searchterm` (1), `screenres` (1), `parent_id` (1), `browser` (1), `refid` (1), `lang` (1), `loc` (1), `os` (1), `landing_id` (1)
- Reads: `Q1255`, `Q1283`, `Q1285`, `Q1287`, `Q1289`, `Q1291`, `Q1293`, `Q1295`, `Q1296`, `Q1297`, `Q1298`, `Q1299`
- Writes: `Q1238`, `Q1239`, `Q1240`
- Archivos involucrados: `userbase/includes/lightwork_adminclass.php`, `userbase/includes/lightwork_sitestats.php`
- Features relacionadas: NO CONFIRMADO

## Tablas fuera de 10_DB_CATALOG

- `WHERE`: queries `Q0665`, `Q0666`, `Q0667`; archivos `blog/wp-includes/classes.php`
- `cantidad`: queries `Q1202`; archivos `user_funcs.php`
- `ebooks_tags`: queries `Q0339`; archivos `adm/migrar_tags_20205.0.php`
- `flat`: queries `Q0769`, `Q0815`; archivos `blog/wp-includes/functions.php`, `blog/wp-includes/template-functions-post.php`
- `hua_locations`: queries `Q0362`, `Q0363`, `Q0923`, `Q0924`, `Q1040`, `Q1041`; archivos `adm/mp_dbfuncs.php`, `ebooks/adm/mp_dbfuncs.php`, `mp_dbfuncs.php`
- `into`: queries `Q1147`; archivos `user_books_delete.php`
- `ipn_logs`: queries `Q1349`; archivos `userbase/ipn/ipn.php`
- `libros`: queries `Q0897`, `Q0898`, `Q0899`, `Q0900`, `Q0901`, `Q0902`, `Q1130`; archivos `chatgpt_desa/bibliotecario_chat_gpt_refactor_chatgpt.php`, `chatgpt_desa/chatgpt_funcs.php`, `test/iscroll.php`
- `links`: queries `Q0364`, `Q0365`, `Q0925`, `Q0926`, `Q1042`, `Q1043`; archivos `adm/mp_dbfuncs.php`, `ebooks/adm/mp_dbfuncs.php`, `mp_dbfuncs.php`
- `logs`: queries `Q0886`; archivos `c_log.php`
- `mp_dictionary`: queries `Q0944`; archivos `funciones.php`
- `notes`: queries `Q1265`, `Q1266`; archivos `userbase/includes/lightwork_adminclass.php`
- `payments`: queries `Q1219`, `Q1220`, `Q1350`; archivos `userbase/includes/lightwork_adminclass.php`, `userbase/ipn/ipn.php`
- `posts`: queries `Q1363`, `Q1364`, `Q1365`, `Q1366`, `Q1367`, `Q1368`; archivos `xapi/v1/index.php`, `xapi/v1/post.php`
- `security_blocks`: queries `Q1242`, `Q1243`, `Q1245`, `Q1246`, `Q1247`, `Q1280`, `Q1337`, `Q1345`, `Q1347`; archivos `userbase/includes/lightwork_adminclass.php`, `userbase/includes/lightwork_general.php`, `userbase/includes/no_script_includes/register_inc.php`, `userbase/index (copia)/ajax/ub_register_user.php`, `userbase/index/ajax/ub_register_user.php`
- `stats_os`: queries `Q1250`; archivos `userbase/includes/lightwork_adminclass.php`
- `the`: queries `Q0550`; archivos `blog/wp-admin/inline-uploading.php`
- `v_ebooks_books_top`: queries `Q1016`; archivos `libro_zapping_funcs.php`
- `videos_rechazados`: queries `Q0943`; archivos `funciones.php`
- `{TABLE_DYNAMIC}`: queries `Q0366`, `Q0367`, `Q0368`, `Q0537`, `Q0539`, `Q0568`, `Q0569`, `Q0610`, `Q0654`, `Q0655`, `Q0656`, `Q0858`, `Q0859`, `Q0927`, `Q0928`, `Q0929`, `Q1044`, `Q1045`, `Q1046`, `Q1271`, `Q1272`, `Q1273`, `Q1274`, `Q1275`, `Q1276`, `Q1277`, `Q1278`, `Q1281`, `Q1333`, `Q1334`, `Q1335`, `Q1336`; archivos `adm/mp_dbfuncs.php`, `blog/wp-admin/import/dotclear.php`, `blog/wp-admin/import/textpattern.php`, `blog/wp-admin/install.php`, `blog/wp-admin/upgrade-functions.php`, `blog/wp-content/plugins/wp-db-backup.php`, `c_libro.php`, `ebooks/adm/mp_dbfuncs.php`, `mp_dbfuncs.php`, `userbase/includes/lightwork_db.php`, `userbase/includes/lightwork_general.php`, `userbase/includes/lightworks_functions.php`
