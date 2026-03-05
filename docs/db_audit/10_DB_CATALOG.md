# DB Catalog - Fase 1

Fuente: `docs/c2380538_main_stru.sql`

Alcance: cat?logo estructural de tablas, columnas, PK, ?ndices y FK expl?citas.

## Tabla: `ab_events`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `bigint(20) UNSIGNED` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `experiment` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `variant` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `event` | `enum('impression','click')` | `NO` | `NO DEFINIDO` | `-` |
| `session_id` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `user_agent` | `varchar(255)` | `YES` | `NULL` | `-` |
| `created_at` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD KEY `idx_exp_var` (`experiment`,`variant`)`
  - `ADD KEY `idx_event` (`event`)`
  - `ADD KEY `idx_created` (`created_at`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `created_at`
- Posibles flags/enum: `event`

## Tabla: `avatars`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `utf8`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `avatar_id` | `int(11)` | `NO` | `'0'` | `-` |
| `avatar_image` | `blob` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `avatar_id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `blocked_ip_domains`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `bid` | `int(255)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ip` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `domain` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `email` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `refer` | `varchar(500)` | `NO` | `NO DEFINIDO` | `-` |
| `referaldomain` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `desci` | `varchar(2000)` | `NO` | `NO DEFINIDO` | `-` |
| `valid` | `int(3)` | `NO` | `NO DEFINIDO` | `-` |
| `type` | `int(2)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `bid`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `bid`

## Tabla: `books_tags`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8mb4`
- Collation por defecto: `utf8mb4_unicode_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `book_id` | `int(11)` | `NO` | `NO DEFINIDO` | `-` |
| `tag_id` | `int(11)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `book_id`, `tag_id`
- ?ndices:
  - `ADD KEY `idx_book_id` (`book_id`)`
  - `ADD KEY `idx_tag_id` (`tag_id`)`
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `categories`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `utf8`
- Collation por defecto: `utf8_spanish_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `category__auto_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `category_lang` | `char(4) COLLATE utf8_spanish_ci` | `NO` | `'es'` | `-` |
| `category_id` | `int(11)` | `NO` | `'0'` | `-` |
| `category_parent` | `int(11)` | `NO` | `'0'` | `-` |
| `category_name` | `char(32) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `category_uri` | `char(32) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |

### Claves

- PK: `category__auto_id`
- ?ndices:
  - `ADD UNIQUE KEY `category_lang` (`category_lang`,`category_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `category__auto_id`

## Tabla: `chats`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MEMORY`
- Charset por defecto: `latin1`
- Max rows: `1000`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `chat_time` | `int(10) UNSIGNED` | `NO` | `'0'` | `-` |
| `chat_uid` | `int(10) UNSIGNED` | `NO` | `'0'` | `-` |
| `chat_room` | `enum('all','friends')` | `NO` | `'all'` | `-` |
| `chat_user` | `char(32)` | `NO` | `NO DEFINIDO` | `-` |
| `chat_text` | `char(255)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: NO DEFINIDA
- ?ndices:
  - `ADD KEY `chat_time` (`chat_time`) USING BTREE`
- FK: NO DEFINIDAS

### Notas

- Posibles flags/enum: `chat_room`

## Tabla: `comments`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `utf8`
- Collation por defecto: `utf8_spanish_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `comment_id` | `int(20)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `comment_randkey` | `int(11)` | `NO` | `'0'` | `-` |
| `comment_parent` | `int(20)` | `YES` | `'0'` | `-` |
| `comment_link_id` | `int(20)` | `NO` | `'0'` | `-` |
| `comment_user_id` | `int(20)` | `NO` | `'0'` | `-` |
| `comment_date` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |
| `comment_ip` | `varchar(24) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `comment_order` | `smallint(6)` | `NO` | `'0'` | `-` |
| `comment_votes` | `smallint(4)` | `NO` | `'0'` | `-` |
| `comment_karma` | `smallint(6)` | `NO` | `'0'` | `-` |
| `comment_content` | `text COLLATE utf8_spanish_ci` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `comment_id`
- ?ndices:
  - `ADD KEY `comment_link_id_2` (`comment_link_id`,`comment_date`)`
  - `ADD KEY `comment_date` (`comment_date`)`
  - `ADD KEY `comment_user_id` (`comment_user_id`,`comment_date`)`
  - `ADD KEY `comment_link_id` (`comment_link_id`,`comment_order`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `comment_id`
- Campos fecha/timestamp: `comment_date`

## Tabla: `download_log`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `download_log_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `download_log_object` | `varchar(255)` | `YES` | `NULL` | `-` |
| `download_log_object_format` | `varchar(4)` | `YES` | `NULL` | `-` |
| `download_log_remote_host` | `varchar(255)` | `YES` | `NULL` | `-` |
| `download_log_user_ip` | `varchar(255)` | `YES` | `NULL` | `-` |
| `download_log_user_id` | `int(11)` | `YES` | `NULL` | `-` |
| `download_log_timestamp` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |
| `download_log_country_code` | `char(2)` | `YES` | `NULL` | `-` |
| `download_log_status` | `varchar(16)` | `YES` | `NULL` | `-` |
| `download_log_type` | `varchar(16)` | `YES` | `NULL` | `-` |
| `ebooks_books_doc_type` | `varchar(255)` | `NO` | `'books'` | `-` |

### Claves

- PK: `download_log_id`
- ?ndices:
  - `ADD KEY `download_log_object` (`download_log_object`)`
  - `ADD KEY `ndx_timestamp` (`download_log_timestamp`)`
  - `ADD KEY `ndx_country_code` (`download_log_country_code`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `download_log_id`
- Campos fecha/timestamp: `download_log_timestamp`

## Tabla: `ebooks_authors`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`
- Row format: `DYNAMIC`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_authors_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `uri` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_authors_name` | `varchar(255)` | `YES` | `NULL` | `-` |
| `ebooks_authors_surname` | `varchar(255)` | `YES` | `NULL` | `-` |
| `ebooks_authors_htm_bio` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_authors_organisation` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `ebooks_authors_fallecimiento` | `smallint(4)` | `YES` | `NULL` | `-` |
| `ebooks_authors_rank` | `int(10)` | `YES` | `'0'` | `-` |
| `ebooks_authors_ranked` | `tinyint(1) UNSIGNED` | `NO` | `'0'` | `-` |
| `dompub` | `tinyint(1) UNSIGNED` | `YES` | `'0'` | `-` |
| `dompubreal` | `tinyint(1) UNSIGNED` | `NO` | `'0'` | `-` |

### Claves

- PK: `ebooks_authors_id`
- ?ndices:
  - `ADD UNIQUE KEY `uri` (`uri`)`
  - `ADD UNIQUE KEY `ebooks_authors_name` (`ebooks_authors_name`)`
  - `ADD KEY `ebooks_authors_id` (`ebooks_authors_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_authors_id`
- Posibles flags/enum: `ebooks_authors_organisation`, `ebooks_authors_ranked`, `dompub`, `dompubreal`

## Tabla: `ebooks_authors 2015-02`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`
- Row format: `DYNAMIC`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_authors_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `uri` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_authors_name` | `varchar(255)` | `YES` | `NULL` | `-` |
| `ebooks_authors_surname` | `varchar(255)` | `YES` | `NULL` | `-` |
| `ebooks_authors_htm_bio` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_authors_organisation` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `ebooks_authors_fallecimiento` | `smallint(4)` | `YES` | `NULL` | `-` |
| `ebooks_authors_rank` | `int(10)` | `YES` | `NULL` | `-` |
| `ebooks_authors_ranked` | `tinyint(1) UNSIGNED` | `NO` | `'0'` | `-` |
| `dompub` | `tinyint(1) UNSIGNED` | `YES` | `NULL` | `-` |

### Claves

- PK: `ebooks_authors_id`
- ?ndices:
  - `ADD UNIQUE KEY `ebooks_authors_name` (`ebooks_authors_name`)`
  - `ADD KEY `ebooks_authors_id` (`ebooks_authors_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_authors_id`
- Posibles flags/enum: `ebooks_authors_organisation`, `ebooks_authors_ranked`, `dompub`

## Tabla: `ebooks_books`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`
- Row format: `DYNAMIC`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_books_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `uri` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_books_title` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_books_subtitle` | `varchar(255)` | `YES` | `NULL` | `-` |
| `ebooks_books_author` | `int(11)` | `NO` | `'0'` | `-` |
| `ebooks_books_author2` | `int(11)` | `YES` | `NULL` | `-` |
| `ebooks_books_category` | `int(11)` | `YES` | `'0'` | `-` |
| `server` | `varchar(255)` | `YES` | `NULL` | `-` |
| `texto_online` | `char(4)` | `YES` | `NULL` | `-` |
| `ebooks_books_date` | `varchar(50)` | `YES` | `NULL` | `-` |
| `ebooks_books_publisher` | `int(11)` | `YES` | `'0'` | `-` |
| `ebooks_books_cover` | `smallint(6)` | `YES` | `'0'` | `-` |
| `ebooks_books_file` | `varchar(255)` | `YES` | `''` | `-` |
| `ebooks_books_txt_abs` | `longtext` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_books_txt_inf` | `longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_books_file_english` | `varchar(50)` | `YES` | `NULL` | `-` |
| `ebooks_books_editor_english` | `int(11)` | `YES` | `NULL` | `-` |
| `ebooks_books_file_alternative` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_books_file_audiobook` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_books_webAlternative` | `varchar(60)` | `YES` | `NULL` | `-` |
| `ebooks_books_ebookversion` | `varchar(20)` | `YES` | `NULL` | `-` |
| `ebooks_books_datePublicationdigital` | `date` | `YES` | `NULL` | `-` |
| `descargar` | `tinyint(1) UNSIGNED ZEROFILL` | `NO` | `'1'` | `COMMENT 'si = 1 cambia el path con ! para evitar descargar'` |
| `ebooks_format_mobi` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `ebooks_format_pdf` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `ebooks_format_epub` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `ebooks_format_doc` | `tinyint(1)` | `YES` | `NULL` | `-` |
| `external_pdf` | `varchar(50)` | `YES` | `NULL` | `-` |
| `videos` | `mediumtext` | `YES` | `NO DEFINIDO` | `-` |
| `videos_sugeridos` | `mediumtext` | `YES` | `NO DEFINIDO` | `-` |
| `video_audiolibro` | `mediumtext` | `YES` | `NO DEFINIDO` | `-` |
| `video_audiolibro_revisado` | `tinyint(1) UNSIGNED` | `NO` | `'0'` | `-` |
| `has_video_review` | `tinyint(1)` | `NO` | `'0'` | `COMMENT 'si el libro tiene video reseña de pl'` |
| `read_online` | `tinyint(1)` | `NO` | `'0'` | `COMMENT '	0 no tiene 		1 si tiene 		2 no publicar'` |
| `ebooks_books_download_rank` | `int(11)` | `YES` | `'0'` | `-` |
| `views` | `int(11)` | `YES` | `'0'` | `-` |
| `views_last` | `int(11)` | `YES` | `'0'` | `-` |
| `views_last_week` | `int(11)` | `NO` | `'0'` | `-` |
| `views_last_year` | `int(11)` | `NO` | `'0'` | `-` |
| `ebooks_books_last_download` | `datetime` | `YES` | `'0000-00-00 00:00:00'` | `-` |
| `ebooks_books_ebookdate` | `datetime` | `YES` | `NULL` | `-` |
| `ebooks_books_labels` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `ebooks_books_updated` | `timestamp` | `YES` | `CURRENT_TIMESTAMP` | `-` |
| `ebooks_books_price` | `double` | `NO` | `'0'` | `-` |
| `ebooks_books_doc_type` | `varchar(255)` | `NO` | `'books'` | `-` |
| `ebooks_books_video` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `link_mercadolibre` | `varchar(255)` | `YES` | `NULL` | `-` |
| `link_p2p` | `varchar(255)` | `YES` | `NULL` | `-` |
| `link_hotmart` | `varchar(255)` | `YES` | `NULL` | `-` |
| `link_amazon` | `smallint(1)` | `YES` | `'1'` | `-` |
| `url_amazon` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `ebooks_books_lang` | `char(2)` | `YES` | `'es'` | `-` |
| `demo` | `smallint(1)` | `NO` | `'0'` | `-` |
| `dompub` | `smallint(1)` | `NO` | `'0'` | `-` |
| `dompub_status` | `smallint(1)` | `NO` | `'-1'` | `-` |
| `recomendado` | `smallint(1) UNSIGNED` | `NO` | `'0'` | `-` |
| `pinterest` | `smallint(1) UNSIGNED` | `YES` | `'0'` | `-` |
| `procesado` | `smallint(1) UNSIGNED` | `YES` | `'0'` | `-` |
| `cover_link` | `varchar(255)` | `YES` | `NULL` | `COMMENT 'link a imagen del cover'` |
| `pubfbig` | `int(1)` | `NO` | `'0'` | `COMMENT 'pubilcado en fb instagram'` |
| `resumen` | `tinyint(1) UNSIGNED ZEROFILL` | `NO` | `'0'` | `-` |
| `label_procesado` | `smallint(1)` | `NO` | `'0'` | `-` |
| `link_gpt` | `varchar(255)` | `YES` | `NULL` | `-` |
| `pubfbig_readonline` | `int(1)` | `NO` | `'0'` | `-` |
| `release_date` | `date` | `YES` | `NULL` | `-` |

### Claves

- PK: `ebooks_books_id`
- ?ndices:
  - `ADD UNIQUE KEY `uri` (`uri`)`
  - `ADD KEY `ebooks_books_category` (`ebooks_books_category`)`
  - `ADD KEY `ebooks_books_title` (`ebooks_books_title`)`
  - `ADD KEY `ebooks_books_download_rank` (`ebooks_books_download_rank`)`
  - `ADD KEY `ebooks_books_ebookdate` (`ebooks_books_ebookdate`)`
  - `ADD KEY `ebooks_books_author` (`ebooks_books_author`)`
  - `ADD KEY `views` (`views`)`
  - `ADD KEY `ebooks_books_lang` (`ebooks_books_lang`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_books_id`
- Campos fecha/timestamp: `ebooks_books_datePublicationdigital`, `ebooks_books_last_download`, `ebooks_books_ebookdate`, `ebooks_books_updated`, `release_date`
- Posibles flags/enum: `descargar`, `ebooks_format_mobi`, `ebooks_format_pdf`, `ebooks_format_epub`, `ebooks_format_doc`, `video_audiolibro_revisado`, `has_video_review`, `read_online`, `link_amazon`, `demo`, `dompub`, `dompub_status` ...

## Tabla: `ebooks_categories`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_categories_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_categories_category` | `varchar(50)` | `YES` | `NULL` | `-` |
| `ebooks_categories_nicename` | `varchar(50)` | `YES` | `NULL` | `-` |
| `ebooks_categories_description` | `varchar(50)` | `YES` | `NULL` | `-` |
| `ebooks_categories_rank` | `int(11)` | `YES` | `'0'` | `-` |
| `lang` | `varchar(2)` | `NO` | `'es'` | `-` |

### Claves

- PK: `ebooks_categories_id`
- ?ndices:
  - `ADD UNIQUE KEY `ebooks_categories_nicename` (`ebooks_categories_nicename`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_categories_id`

## Tabla: `ebooks_digitalizar`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(10)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebook_id` | `int(10)` | `NO` | `NO DEFINIDO` | `-` |
| `fecha_pedido` | `date` | `NO` | `NO DEFINIDO` | `-` |
| `fecha_hecho` | `date` | `YES` | `NULL` | `-` |
| `status` | `varchar(15)` | `NO` | `'pend'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `ebook_id` (`ebook_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `fecha_pedido`, `fecha_hecho`

## Tabla: `ebooks_formats`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_formats_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_formats_name` | `varchar(50)` | `YES` | `NULL` | `-` |
| `ebooks_formats_extension` | `varchar(5)` | `YES` | `NULL` | `-` |

### Claves

- PK: `ebooks_formats_id`
- ?ndices:
  - `ADD KEY `ebooks_formats_id` (`ebooks_formats_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_formats_id`

## Tabla: `ebooks_mva_textos`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `texto` | `varchar(300)` | `YES` | `NULL` | `-` |

### Claves

- PK: `id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`

## Tabla: `ebooks_packs`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_packs_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_packs_code` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_packs_name` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_packs_price` | `double` | `NO` | `'0'` | `-` |

### Claves

- PK: NO DEFINIDA
- ?ndices:
  - `ADD UNIQUE KEY `ebooks_packs_id` (`ebooks_packs_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_packs_id`

## Tabla: `ebooks_packs_ebooks`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_packs_ebooks_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_packs_code` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_books_id` | `int(11)` | `NO` | `'0'` | `-` |
| `ebooks_books_file` | `varchar(255)` | `NO` | `''` | `-` |

### Claves

- PK: `ebooks_packs_ebooks_id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_packs_ebooks_id`

## Tabla: `ebooks_packs_users`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_packs_users_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `sys_users_code` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_packs_code` | `varchar(255)` | `NO` | `''` | `-` |

### Claves

- PK: `ebooks_packs_users_id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_packs_users_id`

## Tabla: `ebooks_publishers`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_publishers_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_publishers_publisher` | `varchar(50)` | `NO` | `''` | `-` |
| `ebooks_publishers_web` | `varchar(50)` | `YES` | `NULL` | `-` |

### Claves

- PK: `ebooks_publishers_id`
- ?ndices:
  - `ADD KEY `ebooks_publishers_publisher` (`ebooks_publishers_publisher`)`
  - `ADD KEY `ebooks_publishers_id` (`ebooks_publishers_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_publishers_id`

## Tabla: `ebooks_ranking_historic`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_ranking_historic_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_ranking_historic_date` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `ON UPDATE CURRENT_TIMESTAMP` |
| `ebooks_ranking_historic_position` | `smallint(6)` | `YES` | `'0'` | `-` |
| `ebooks_ranking_historic_book` | `int(11)` | `YES` | `'0'` | `-` |
| `ebooks_ranking_historic_nro_requests` | `int(11)` | `YES` | `'0'` | `-` |

### Claves

- PK: `ebooks_ranking_historic_id`
- ?ndices:
  - `ADD KEY `ebooks_ranking_historic_id` (`ebooks_ranking_historic_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_ranking_historic_id`
- Campos fecha/timestamp: `ebooks_ranking_historic_date`

## Tabla: `ebooks_trivia_questions`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8mb4`
- Collation por defecto: `utf8mb4_unicode_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(10) UNSIGNED` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_books_id` | `int(10) UNSIGNED` | `NO` | `NO DEFINIDO` | `-` |
| `tema` | `varchar(255) COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `punto_clave` | `text COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `pregunta` | `text COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `respuesta_correcta` | `text COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `respuesta_falsa1` | `text COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `respuesta_falsa2` | `text COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `explicacion` | `text COLLATE utf8mb4_unicode_ci` | `YES` | `NO DEFINIDO` | `-` |
| `created_at` | `datetime` | `YES` | `CURRENT_TIMESTAMP` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `uq_trivia_unique` (`ebooks_books_id`,`tema`,`punto_clave`(255),`pregunta`(255))`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `created_at`

## Tabla: `ebooks_users_ebooks`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ebooks_users_ebooks_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `ebooks_packs_code` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_code` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_books_id` | `int(11)` | `NO` | `'0'` | `-` |
| `ebooks_books_file` | `varchar(255)` | `NO` | `''` | `-` |
| `ebooks_users_ebooks_current_page` | `int(11)` | `NO` | `'1'` | `-` |
| `ebooks_users_ebooks_first_read` | `datetime` | `YES` | `NULL` | `-` |
| `ebooks_users_ebooks_last_read` | `datetime` | `YES` | `NULL` | `-` |
| `ebooks_users_ebooks_last_read_from` | `varchar(255)` | `YES` | `NULL` | `-` |
| `ebooks_users_ebooks_html_access` | `int(11)` | `YES` | `'0'` | `-` |
| `ebooks_users_ebooks_wap_access` | `int(11)` | `YES` | `'0'` | `-` |

### Claves

- PK: `ebooks_users_ebooks_id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `ebooks_users_ebooks_id`
- Campos fecha/timestamp: `ebooks_users_ebooks_first_read`, `ebooks_users_ebooks_last_read`

## Tabla: `failed_login`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `failedid` | `int(50)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `loc` | `varchar(10)` | `NO` | `NO DEFINIDO` | `-` |
| `username` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `password` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `sms` | `varchar(10)` | `NO` | `NO DEFINIDO` | `-` |
| `smstok` | `varchar(30)` | `YES` | `'empty'` | `-` |
| `msg` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `inital_attempt` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `current_attempt` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `country` | `varchar(10)` | `NO` | `NO DEFINIDO` | `-` |
| `setid` | `int(50)` | `NO` | `NO DEFINIDO` | `-` |
| `ipad` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `refurl` | `varchar(1000)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `failedid`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `failedid`
- Campos fecha/timestamp: `inital_attempt`, `current_attempt`

## Tabla: `failed_searches`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `normalized_text` | `varchar(255)` | `NO` | `NO DEFINIDO` | `-` |
| `cantidad` | `int(11)` | `YES` | `'1'` | `-` |
| `agregado` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `last_search` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `ON UPDATE CURRENT_TIMESTAMP` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `normalized_text` (`normalized_text`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `last_search`
- Posibles flags/enum: `agregado`

## Tabla: `favorites`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `utf8`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `favorite_user_id` | `int(10) UNSIGNED` | `NO` | `'0'` | `-` |
| `favorite_link_id` | `int(10) UNSIGNED` | `NO` | `'0'` | `-` |
| `favorite_date` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |

### Claves

- PK: NO DEFINIDA
- ?ndices:
  - `ADD UNIQUE KEY `favorite_user_id` (`favorite_user_id`,`favorite_link_id`)`
  - `ADD KEY `favorite_link_id` (`favorite_link_id`)`
- FK: NO DEFINIDAS

### Notas

- Campos fecha/timestamp: `favorite_date`

## Tabla: `libros_pedidos`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `email` | `varchar(255)` | `NO` | `''` | `-` |
| `libro` | `varchar(255)` | `YES` | `''` | `-` |
| `pedido` | `smallint(15) UNSIGNED` | `YES` | `'0'` | `-` |
| `publicado` | `tinyint(15)` | `YES` | `'0'` | `-` |
| `userid` | `int(15) UNSIGNED` | `YES` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `libro` (`libro`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`

## Tabla: `libros_pedidos_old`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `email` | `varchar(255)` | `NO` | `''` | `-` |
| `libro` | `varchar(255)` | `YES` | `''` | `-` |
| `pedido` | `smallint(15) UNSIGNED` | `YES` | `'0'` | `-` |
| `publicado` | `tinyint(15)` | `YES` | `'0'` | `-` |
| `userid` | `int(15) UNSIGNED` | `YES` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `libro` (`libro`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`

## Tabla: `mailing`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `name` | `varchar(255)` | `NO` | `NO DEFINIDO` | `-` |
| `subject` | `varchar(255)` | `NO` | `NO DEFINIDO` | `-` |
| `message` | `text` | `NO` | `NO DEFINIDO` | `-` |
| `created_at` | `datetime` | `YES` | `CURRENT_TIMESTAMP` | `-` |
| `is_global` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `completed` | `tinyint(1)` | `YES` | `'0'` | `-` |
| `last_mail` | `date` | `YES` | `NULL` | `-` |

### Claves

- PK: `id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `created_at`, `last_mail`
- Posibles flags/enum: `is_global`, `completed`

## Tabla: `mailing_users`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `mailing_id` | `int(11)` | `NO` | `NO DEFINIDO` | `-` |
| `email` | `varchar(255)` | `NO` | `NO DEFINIDO` | `-` |
| `status` | `enum('pending','sent','failed')` | `YES` | `'pending'` | `-` |
| `retries` | `int(11)` | `YES` | `'0'` | `-` |
| `error_message` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `sent_at` | `datetime` | `YES` | `NULL` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD KEY `mailing_id` (`mailing_id`)`
- FK:
  - `ADD CONSTRAINT `mailing_users_ibfk_1` FOREIGN KEY (`mailing_id`) REFERENCES `mailing` (`id`) ON DELETE CASCADE`

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `sent_at`
- Posibles flags/enum: `status`

## Tabla: `migracion_estado`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `proceso` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `ultimo_id` | `int(11)` | `YES` | `'0'` | `-` |
| `actualizado` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `ON UPDATE CURRENT_TIMESTAMP` |

### Claves

- PK: `proceso`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- Campos fecha/timestamp: `actualizado`

## Tabla: `mp_antispam`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id_token` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `token` | `varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci` | `NO` | `NO DEFINIDO` | `-` |
| `tipo` | `smallint(6)` | `NO` | `NO DEFINIDO` | `-` |
| `spam` | `int(11)` | `NO` | `'0'` | `-` |
| `ham` | `int(11)` | `NO` | `'0'` | `-` |
| `freq` | `double` | `NO` | `'0'` | `-` |
| `error` | `double` | `NO` | `'1'` | `-` |

### Claves

- PK: `id_token`
- ?ndices:
  - `ADD KEY `TOKEN` (`token`)`
  - `ADD KEY `TIPO` (`tipo`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id_token`

## Tabla: `mp_config`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `setting` | `varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci` | `NO` | `NO DEFINIDO` | `-` |
| `value` | `text CHARACTER SET utf8 COLLATE utf8_spanish_ci` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `setting`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `sneakers`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MEMORY`
- Charset por defecto: `latin1`
- Max rows: `1000`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `sneaker_id` | `char(24)` | `NO` | `NO DEFINIDO` | `-` |
| `sneaker_time` | `int(10) UNSIGNED` | `NO` | `'0'` | `-` |
| `sneaker_user` | `int(10) UNSIGNED` | `NO` | `'0'` | `-` |

### Claves

- PK: NO DEFINIDA
- ?ndices:
  - `ADD UNIQUE KEY `sneaker_id` (`sneaker_id`)`
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `stats_browser`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `browser_code` | `varchar(5)` | `NO` | `NO DEFINIDO` | `-` |
| `browser_name` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `browser_code`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `stats_country_ip`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `ipstart` | `bigint(100)` | `NO` | `NO DEFINIDO` | `-` |
| `ipend` | `bigint(100)` | `NO` | `NO DEFINIDO` | `-` |
| `2letter` | `varchar(2)` | `NO` | `NO DEFINIDO` | `-` |
| `3letter` | `varchar(3)` | `NO` | `NO DEFINIDO` | `-` |
| `full` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: NO DEFINIDA
- ?ndices:
  - `ADD KEY `ipstart` (`ipstart`)`
  - `ADD KEY `ipend` (`ipend`)`
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `stats_country_iso_codes`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `name` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `code` | `varchar(4)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `code`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- Sin notas estructurales adicionales

## Tabla: `stats_lang`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `langid` | `mediumint(4)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `lang_code` | `varchar(5)` | `NO` | `NO DEFINIDO` | `-` |
| `language` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `langid`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `langid`

## Tabla: `sys_users`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `sys_users_id` | `int(255)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `sys_users_code` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_email` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_movilcode` | `varchar(16)` | `NO` | `''` | `-` |
| `sys_users_firstname` | `varchar(255)` | `YES` | `NULL` | `-` |
| `sys_users_lastname` | `varchar(255)` | `YES` | `NULL` | `-` |
| `sys_users_password` | `varchar(255)` | `YES` | `NULL` | `-` |
| `sys_users_country` | `char(2)` | `YES` | `NULL` | `-` |
| `sys_users_group` | `varchar(255)` | `YES` | `NULL` | `-` |
| `sys_users_open_last_book` | `int(11)` | `YES` | `'1'` | `-` |

### Claves

- PK: `sys_users_id`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `sys_users_id`

## Tabla: `sys_users_email`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `sys_users_email_id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `sys_users_email_timestamp` | `datetime` | `NO` | `'0000-00-00 00:00:00'` | `-` |
| `sys_users_email_from` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_email_to` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_email_subject` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_email_text` | `text` | `YES` | `NO DEFINIDO` | `-` |
| `sys_users_email_type` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_email_country_code` | `char(2)` | `YES` | `NULL` | `-` |
| `sys_users_email_user_ip` | `varchar(255)` | `NO` | `''` | `-` |
| `sys_users_email_doc` | `varchar(255)` | `YES` | `NULL` | `-` |
| `sys_users_email_doc_id` | `int(11)` | `YES` | `'0'` | `-` |
| `sys_users_email_doc_type` | `varchar(255)` | `YES` | `NULL` | `-` |

### Claves

- PK: `sys_users_email_id`
- ?ndices:
  - `ADD KEY `sys_users_email_doc` (`sys_users_email_doc`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `sys_users_email_id`
- Campos fecha/timestamp: `sys_users_email_timestamp`

## Tabla: `tags`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8mb4`
- Collation por defecto: `utf8mb4_unicode_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `uri` | `varchar(255) COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `nombre_es` | `varchar(255) COLLATE utf8mb4_unicode_ci` | `NO` | `NO DEFINIDO` | `-` |
| `nombre_en` | `varchar(255) COLLATE utf8mb4_unicode_ci` | `YES` | `NULL` | `-` |
| `ranking` | `int(11)` | `YES` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `uri` (`uri`)`
  - `ADD UNIQUE KEY `nombre_es` (`nombre_es`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`

## Tabla: `tareas`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `name` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `script` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `interval` | `int(6)` | `NO` | `'0'` | `-` |
| `last_exec` | `datetime` | `YES` | `NULL` | `-` |
| `next_exec` | `datetime` | `YES` | `NULL` | `-` |
| `enabled` | `tinyint(4)` | `YES` | `'0'` | `-` |
| `contador` | `int(11)` | `YES` | `'0'` | `-` |
| `prioridad` | `int(11)` | `NO` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `name` (`name`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `last_exec`, `next_exec`

## Tabla: `users`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8`
- Collation por defecto: `utf8_spanish_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `user_id` | `int(20)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `user_login` | `varchar(32) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_level` | `enum('disabled','normal','special','blogger','admin','god') COLLATE utf8_spanish_ci` | `NO` | `'normal'` | `-` |
| `user_avatar` | `tinyint(1)` | `NO` | `'0'` | `-` |
| `user_modification` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |
| `user_date` | `timestamp` | `NO` | `'0000-00-00 00:00:00'` | `-` |
| `user_validated_date` | `timestamp` | `YES` | `NULL` | `-` |
| `user_ip` | `varchar(32) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_pass` | `varchar(64) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_email` | `varchar(64) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_names` | `varchar(60) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_login_register` | `varchar(32) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_email_register` | `varchar(64) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_lang` | `tinyint(2) UNSIGNED` | `NO` | `'1'` | `-` |
| `user_comment_pref` | `tinyint(2) UNSIGNED` | `NO` | `'0'` | `-` |
| `user_karma` | `decimal(10,2)` | `YES` | `'6.00'` | `-` |
| `user_public_info` | `varchar(64) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_url` | `varchar(128) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_adcode` | `varchar(24) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_adchannel` | `varchar(12) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_country` | `varchar(2) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |

### Claves

- PK: `user_id`
- ?ndices:
  - `ADD UNIQUE KEY `user_login` (`user_login`)`
  - `ADD KEY `user_email` (`user_email`)`
  - `ADD KEY `user_karma` (`user_karma`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `user_id`
- Campos fecha/timestamp: `user_modification`, `user_date`, `user_validated_date`
- Posibles flags/enum: `user_level`, `user_avatar`

## Tabla: `users_copy`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `utf8`
- Collation por defecto: `utf8_spanish_ci`
- Row format: `DYNAMIC`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `user_id` | `int(20)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `user_login` | `varchar(32) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_level` | `enum('disabled','normal','special','blogger','admin','god') COLLATE utf8_spanish_ci` | `NO` | `'normal'` | `-` |
| `user_avatar` | `tinyint(1)` | `NO` | `'0'` | `-` |
| `user_modification` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |
| `user_date` | `timestamp` | `NO` | `'0000-00-00 00:00:00'` | `-` |
| `user_validated_date` | `timestamp` | `YES` | `NULL` | `-` |
| `user_ip` | `varchar(32) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_pass` | `varchar(64) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_email` | `varchar(64) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_names` | `varchar(60) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_login_register` | `varchar(32) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_email_register` | `varchar(64) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_lang` | `tinyint(2) UNSIGNED` | `NO` | `'1'` | `-` |
| `user_comment_pref` | `tinyint(2) UNSIGNED` | `NO` | `'0'` | `-` |
| `user_karma` | `decimal(10,2)` | `YES` | `'6.00'` | `-` |
| `user_public_info` | `varchar(64) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_url` | `varchar(128) COLLATE utf8_spanish_ci` | `NO` | `''` | `-` |
| `user_adcode` | `varchar(24) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_adchannel` | `varchar(12) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |
| `user_country` | `varchar(2) COLLATE utf8_spanish_ci` | `YES` | `NULL` | `-` |

### Claves

- PK: `user_id`
- ?ndices:
  - `ADD UNIQUE KEY `user_login` (`user_login`)`
  - `ADD KEY `user_email` (`user_email`)`
  - `ADD KEY `user_karma` (`user_karma`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `user_id`
- Campos fecha/timestamp: `user_modification`, `user_date`, `user_validated_date`
- Posibles flags/enum: `user_level`, `user_avatar`

## Tabla: `user_books`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(10)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `user_id` | `int(20)` | `NO` | `'0'` | `-` |
| `ebooks_books_id` | `int(10)` | `NO` | `'0'` | `-` |
| `current_page` | `int(10)` | `NO` | `'0'` | `-` |
| `leidas` | `int(10)` | `NO` | `'1'` | `-` |
| `first_read` | `datetime` | `YES` | `NULL` | `-` |
| `last_read` | `datetime` | `YES` | `NULL` | `-` |
| `device` | `varchar(255)` | `YES` | `NULL` | `-` |
| `stat_web` | `int(11)` | `NO` | `'0'` | `-` |
| `stat_movil` | `int(11)` | `NO` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `user_id_ebooks_books_id` (`user_id`,`ebooks_books_id`)`
  - `ADD KEY `user_id` (`user_id`)`
  - `ADD KEY `ebooks_books_id` (`ebooks_books_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `first_read`, `last_read`

## Tabla: `user_books_log`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8mb4`
- Collation por defecto: `utf8mb4_unicode_ci`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `bigint(20) UNSIGNED` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `user_id` | `int(10) UNSIGNED` | `YES` | `NULL` | `-` |
| `book_id` | `int(10) UNSIGNED` | `NO` | `NO DEFINIDO` | `-` |
| `page_number` | `smallint(5) UNSIGNED` | `NO` | `NO DEFINIDO` | `-` |
| `read_at` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD KEY `user_id` (`user_id`)`
  - `ADD KEY `book_id` (`book_id`)`
  - `ADD KEY `page_number` (`page_number`)`
  - `ADD KEY `read_at` (`read_at`)`
  - `ADD KEY `book_id_2` (`book_id`,`read_at`)`
  - `ADD KEY `user_id_2` (`user_id`,`book_id`,`read_at`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `read_at`

## Tabla: `user_groups`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `groupid` | `int(255)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `name` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `descip` | `varchar(4000)` | `NO` | `NO DEFINIDO` | `-` |
| `valid` | `int(2)` | `NO` | `NO DEFINIDO` | `-` |
| `group_type` | `int(2)` | `NO` | `'1'` | `-` |
| `fee` | `decimal(20,2)` | `NO` | `NO DEFINIDO` | `-` |
| `expire_in_days` | `int(11)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `groupid`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `groupid`

## Tabla: `user_groups_copy`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`
- Row format: `DYNAMIC`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `groupid` | `int(255)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `name` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `descip` | `varchar(4000)` | `NO` | `NO DEFINIDO` | `-` |
| `valid` | `int(2)` | `NO` | `NO DEFINIDO` | `-` |
| `group_type` | `int(2)` | `NO` | `'1'` | `-` |
| `fee` | `decimal(20,2)` | `NO` | `NO DEFINIDO` | `-` |
| `expire_in_days` | `int(11)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `groupid`
- ?ndices: NO DEFINIDOS
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `groupid`

## Tabla: `user_table`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `userid` | `int(255)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `username` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `screenname` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `p_hash` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `s_hash` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `valid` | `int(3)` | `NO` | `NO DEFINIDO` | `-` |
| `acti_code` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `ipad` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `date_joined` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `lastip` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `last_visit` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `email` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `gravtar_email` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `usergroup` | `int(255)` | `NO` | `NO DEFINIDO` | `-` |
| `temppass` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `tpdate` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `tpip` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `tp_flag` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `browser` | `varchar(5)` | `YES` | `'OBW'` | `-` |
| `os` | `varchar(5)` | `YES` | `'OOS'` | `-` |
| `lang` | `varchar(5)` | `YES` | `'ool'` | `-` |
| `country` | `varchar(5)` | `YES` | `'ZZ'` | `-` |
| `refid` | `varchar(50)` | `YES` | `NULL` | `-` |
| `refurl` | `varchar(1000)` | `YES` | `NULL` | `-` |
| `refdomain` | `varchar(100)` | `YES` | `NULL` | `-` |
| `contact` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `fname` | `varchar(50)` | `YES` | `NULL` | `-` |
| `sname` | `varchar(50)` | `YES` | `NULL` | `-` |
| `mobilenum` | `varchar(20)` | `YES` | `NULL` | `-` |
| `screenres` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `searchengine` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `searchterm` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `smstok` | `varchar(30)` | `YES` | `NULL` | `-` |
| `smsip` | `varchar(30)` | `YES` | `NULL` | `-` |
| `smstimedate` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `oneuse` | `int(1)` | `NO` | `'0'` | `-` |
| `landingpage` | `varchar(500)` | `YES` | `'none'` | `-` |
| `openidurl` | `varchar(500)` | `NO` | `NO DEFINIDO` | `-` |
| `authentication_source` | `varchar(30)` | `NO` | `'userbase'` | `-` |
| `img_flag` | `varchar(1)` | `NO` | `'0'` | `-` |
| `img_url` | `varchar(1000)` | `NO` | `NO DEFINIDO` | `-` |
| `cookie_id` | `varchar(1000)` | `NO` | `NO DEFINIDO` | `-` |
| `cookie_salt` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `cookie_expire` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `paid` | `int(2)` | `NO` | `'0'` | `-` |
| `fee` | `decimal(20,2)` | `NO` | `NO DEFINIDO` | `-` |
| `credit` | `decimal(20,2)` | `NO` | `'0.00'` | `-` |
| `renew_date` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `remember_token` | `varchar(255)` | `YES` | `NULL` | `-` |

### Claves

- PK: `userid`
- ?ndices:
  - `ADD UNIQUE KEY `email` (`email`)`
  - `ADD KEY `usergroup` (`usergroup`)`
  - `ADD KEY `last_visit` (`last_visit`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `userid`
- Campos fecha/timestamp: `date_joined`, `last_visit`, `tpdate`, `smstimedate`, `cookie_expire`, `renew_date`

## Tabla: `user_table_copy`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`
- Row format: `DYNAMIC`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `userid` | `int(255)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `username` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `screenname` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `p_hash` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `s_hash` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `valid` | `int(3)` | `NO` | `NO DEFINIDO` | `-` |
| `acti_code` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `ipad` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `date_joined` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `lastip` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `last_visit` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `email` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `gravtar_email` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `usergroup` | `int(255)` | `NO` | `NO DEFINIDO` | `-` |
| `temppass` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `tpdate` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `tpip` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `tp_flag` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `browser` | `varchar(5)` | `YES` | `'OBW'` | `-` |
| `os` | `varchar(5)` | `YES` | `'OOS'` | `-` |
| `lang` | `varchar(5)` | `YES` | `'ool'` | `-` |
| `country` | `varchar(5)` | `YES` | `'ZZ'` | `-` |
| `refid` | `varchar(50)` | `YES` | `NULL` | `-` |
| `refurl` | `varchar(1000)` | `YES` | `NULL` | `-` |
| `refdomain` | `varchar(100)` | `YES` | `NULL` | `-` |
| `contact` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `fname` | `varchar(50)` | `YES` | `NULL` | `-` |
| `sname` | `varchar(50)` | `YES` | `NULL` | `-` |
| `mobilenum` | `varchar(20)` | `YES` | `NULL` | `-` |
| `screenres` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `searchengine` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `searchterm` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `smstok` | `varchar(30)` | `YES` | `NULL` | `-` |
| `smsip` | `varchar(30)` | `YES` | `NULL` | `-` |
| `smstimedate` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `oneuse` | `int(1)` | `NO` | `'0'` | `-` |
| `landingpage` | `varchar(500)` | `YES` | `'none'` | `-` |
| `openidurl` | `varchar(500)` | `NO` | `NO DEFINIDO` | `-` |
| `authentication_source` | `varchar(30)` | `NO` | `'userbase'` | `-` |
| `img_flag` | `varchar(1)` | `NO` | `'0'` | `-` |
| `img_url` | `varchar(1000)` | `NO` | `NO DEFINIDO` | `-` |
| `cookie_id` | `varchar(1000)` | `NO` | `NO DEFINIDO` | `-` |
| `cookie_salt` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `cookie_expire` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `paid` | `int(2)` | `NO` | `'0'` | `-` |
| `fee` | `decimal(20,2)` | `NO` | `NO DEFINIDO` | `-` |
| `renew_date` | `datetime` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: `userid`
- ?ndices:
  - `ADD KEY `usergroup` (`usergroup`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `userid`
- Campos fecha/timestamp: `date_joined`, `last_visit`, `tpdate`, `smstimedate`, `cookie_expire`, `renew_date`

## Tabla: `user_tags`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8mb4`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `user_id` | `int(20)` | `NO` | `NO DEFINIDO` | `-` |
| `tag_id` | `int(11)` | `NO` | `NO DEFINIDO` | `-` |
| `cantidad` | `double` | `YES` | `'0'` | `-` |

### Claves

- PK: `user_id`, `tag_id`
- ?ndices:
  - `ADD KEY `tag_id` (`tag_id`)`
- FK:
  - `ADD CONSTRAINT `user_tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`userid`) ON DELETE CASCADE`
  - `ADD CONSTRAINT `user_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE`

### Notas

- Sin notas estructurales adicionales

## Tabla: `user_video_audiolibros`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`
- Row format: `COMPACT`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(10)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `user_id` | `int(20)` | `NO` | `'0'` | `-` |
| `ebooks_books_id` | `int(10)` | `NO` | `'0'` | `-` |
| `current_min` | `int(10)` | `NO` | `'0'` | `-` |
| `max_min` | `int(10)` | `NO` | `'0'` | `-` |
| `first_read` | `datetime` | `YES` | `NULL` | `-` |
| `last_read` | `datetime` | `YES` | `NULL` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `user_id_ebooks_books_id` (`user_id`,`ebooks_books_id`)`
  - `ADD KEY `user_id` (`user_id`)`
  - `ADD KEY `ebooks_books_id` (`ebooks_books_id`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `first_read`, `last_read`

## Tabla: `videos`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `utf8`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(10)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `youtubeid` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `title` | `varchar(255)` | `YES` | `NULL` | `-` |
| `thumbnail` | `varchar(255)` | `YES` | `NULL` | `-` |
| `channelid` | `varchar(255)` | `YES` | `NULL` | `-` |
| `description` | `mediumtext` | `YES` | `NO DEFINIDO` | `-` |
| `channeltitle` | `varchar(255)` | `YES` | `NULL` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `youtubeid` (`youtubeid`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`

## Tabla: `videos_book`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `videoid` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `libro_uri` | `varchar(255)` | `NO` | `NO DEFINIDO` | `-` |
| `userid` | `int(20)` | `NO` | `NO DEFINIDO` | `-` |
| `fecha` | `date` | `NO` | `NO DEFINIDO` | `-` |
| `views` | `int(11)` | `YES` | `'0'` | `-` |
| `rank` | `int(11)` | `YES` | `'0'` | `-` |
| `lang` | `varchar(2)` | `NO` | `'es'` | `-` |
| `is_short` | `tinyint(1)` | `NO` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `videoid_libro_uri` (`videoid`,`libro_uri`)`
  - `ADD KEY `libro_uri` (`libro_uri`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `fecha`
- Posibles flags/enum: `is_short`

## Tabla: `videos_sugeridos`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `utf8`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(10)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `uri` | `varchar(255)` | `YES` | `NULL` | `-` |
| `video` | `varchar(255)` | `YES` | `NULL` | `-` |
| `pagina` | `varchar(255)` | `YES` | `NULL` | `-` |
| `email` | `varchar(255)` | `YES` | `NULL` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD KEY `tema` (`uri`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`

## Tabla: `video_audiolibros`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `InnoDB`
- Charset por defecto: `latin1`
- Row format: `COMPACT`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `id` | `int(11)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `videoid` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `libro_uri` | `varchar(255)` | `NO` | `NO DEFINIDO` | `-` |
| `userid` | `int(20)` | `NO` | `NO DEFINIDO` | `-` |
| `fecha` | `datetime` | `NO` | `CURRENT_TIMESTAMP` | `-` |
| `views` | `int(11)` | `YES` | `'0'` | `-` |
| `rank` | `int(11)` | `YES` | `'0'` | `-` |
| `completo` | `int(1) UNSIGNED` | `YES` | `'0'` | `-` |
| `vozhumana` | `int(1) UNSIGNED` | `YES` | `'0'` | `-` |

### Claves

- PK: `id`
- ?ndices:
  - `ADD UNIQUE KEY `videoid_libro_uri` (`videoid`,`libro_uri`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `id`
- Campos fecha/timestamp: `fecha`

## Tabla: `visit_stats`

- Descripci?n: NO DEFINIDO EN FASE 1
- Motor: `MyISAM`
- Charset por defecto: `latin1`

### Columnas

| col | tipo | null | default | extra |
|---|---|---|---|---|
| `visitid` | `int(15)` | `NO` | `NO DEFINIDO` | `AUTO_INCREMENT` |
| `reg_flag` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `browser` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `os` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `lang` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `country` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `date_visited` | `datetime` | `NO` | `NO DEFINIDO` | `-` |
| `refurl` | `varchar(500)` | `NO` | `NO DEFINIDO` | `-` |
| `refdomain` | `varchar(200)` | `NO` | `NO DEFINIDO` | `-` |
| `refid` | `varchar(50)` | `NO` | `NO DEFINIDO` | `-` |
| `screenres` | `varchar(30)` | `NO` | `NO DEFINIDO` | `-` |
| `userid` | `int(20)` | `NO` | `NO DEFINIDO` | `COMMENT 'if you really want to track users'` |
| `searchengine` | `varchar(100)` | `NO` | `NO DEFINIDO` | `-` |
| `searchterm` | `varchar(300)` | `NO` | `NO DEFINIDO` | `-` |
| `admin_flag` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `landingpage` | `varchar(500)` | `YES` | `'none'` | `-` |
| `lp_flag` | `int(1)` | `NO` | `NO DEFINIDO` | `-` |
| `parent_id` | `int(15)` | `NO` | `NO DEFINIDO` | `-` |
| `landing_id` | `int(15)` | `NO` | `NO DEFINIDO` | `-` |

### Claves

- PK: NO DEFINIDA
- ?ndices:
  - `ADD UNIQUE KEY `visitid` (`visitid`)`
- FK: NO DEFINIDAS

### Notas

- AUTO_INCREMENT: `visitid`
- Campos fecha/timestamp: `date_visited`

## Resumen estad?stico

- cantidad de tablas: **56**
- tablas sin PK: **6**
  - `chats`, `ebooks_packs`, `favorites`, `sneakers`, `stats_country_ip`, `visit_stats`
- tablas con FKs expl?citas: **2**
- cantidad total de FKs expl?citas: **3**
  - `mailing_users`, `user_tags`
- top 20 tablas con m?s columnas:
  - `ebooks_books`: 65 columnas
  - `user_table`: 49 columnas
  - `user_table_copy`: 47 columnas
  - `users`: 21 columnas
  - `users_copy`: 21 columnas
  - `visit_stats`: 19 columnas
  - `failed_login`: 13 columnas
  - `sys_users_email`: 12 columnas
  - `comments`: 11 columnas
  - `download_log`: 11 columnas
  - `ebooks_authors`: 11 columnas
  - `ebooks_users_ebooks`: 11 columnas
  - `ebooks_authors 2015-02`: 10 columnas
  - `ebooks_trivia_questions`: 10 columnas
  - `sys_users`: 10 columnas
  - `user_books`: 10 columnas
  - `blocked_ip_domains`: 9 columnas
  - `tareas`: 9 columnas
  - `video_audiolibros`: 9 columnas
  - `videos_book`: 9 columnas

## Relaciones inferibles por nombre

- Se omiten en Fase 1 para evitar falsas relaciones autom?ticas. Solo se listan FK expl?citas en la secci?n de cada tabla.
