-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-02-2026 a las 18:51:24
-- Versión del servidor: 5.7.44-log
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `c2380538_main`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ab_events`
--

CREATE TABLE `ab_events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `experiment` varchar(100) NOT NULL,
  `variant` varchar(100) NOT NULL,
  `event` enum('impression','click') NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatars`
--

CREATE TABLE `avatars` (
  `avatar_id` int(11) NOT NULL DEFAULT '0',
  `avatar_image` blob NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blocked_ip_domains`
--

CREATE TABLE `blocked_ip_domains` (
  `bid` int(255) NOT NULL,
  `ip` varchar(30) NOT NULL,
  `domain` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `refer` varchar(500) NOT NULL,
  `referaldomain` varchar(300) NOT NULL,
  `desci` varchar(2000) NOT NULL,
  `valid` int(3) NOT NULL,
  `type` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books_tags`
--

CREATE TABLE `books_tags` (
  `book_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category__auto_id` int(11) NOT NULL,
  `category_lang` char(4) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'es',
  `category_id` int(11) NOT NULL DEFAULT '0',
  `category_parent` int(11) NOT NULL DEFAULT '0',
  `category_name` char(32) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `category_uri` char(32) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `chat_time` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `chat_uid` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `chat_room` enum('all','friends') NOT NULL DEFAULT 'all',
  `chat_user` char(32) NOT NULL,
  `chat_text` char(255) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=latin1 MAX_ROWS=1000;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(20) NOT NULL,
  `comment_randkey` int(11) NOT NULL DEFAULT '0',
  `comment_parent` int(20) DEFAULT '0',
  `comment_link_id` int(20) NOT NULL DEFAULT '0',
  `comment_user_id` int(20) NOT NULL DEFAULT '0',
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_ip` varchar(24) COLLATE utf8_spanish_ci DEFAULT NULL,
  `comment_order` smallint(6) NOT NULL DEFAULT '0',
  `comment_votes` smallint(4) NOT NULL DEFAULT '0',
  `comment_karma` smallint(6) NOT NULL DEFAULT '0',
  `comment_content` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `download_log`
--

CREATE TABLE `download_log` (
  `download_log_id` int(11) NOT NULL,
  `download_log_object` varchar(255) DEFAULT NULL,
  `download_log_object_format` varchar(4) DEFAULT NULL,
  `download_log_remote_host` varchar(255) DEFAULT NULL,
  `download_log_user_ip` varchar(255) DEFAULT NULL,
  `download_log_user_id` int(11) DEFAULT NULL,
  `download_log_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `download_log_country_code` char(2) DEFAULT NULL,
  `download_log_status` varchar(16) DEFAULT NULL,
  `download_log_type` varchar(16) DEFAULT NULL,
  `ebooks_books_doc_type` varchar(255) NOT NULL DEFAULT 'books'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_authors`
--

CREATE TABLE `ebooks_authors` (
  `ebooks_authors_id` int(11) NOT NULL,
  `uri` varchar(255) NOT NULL DEFAULT '',
  `ebooks_authors_name` varchar(255) DEFAULT NULL,
  `ebooks_authors_surname` varchar(255) DEFAULT NULL,
  `ebooks_authors_htm_bio` text,
  `ebooks_authors_organisation` tinyint(1) DEFAULT '0',
  `ebooks_authors_fallecimiento` smallint(4) DEFAULT NULL,
  `ebooks_authors_rank` int(10) DEFAULT '0',
  `ebooks_authors_ranked` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `dompub` tinyint(1) UNSIGNED DEFAULT '0',
  `dompubreal` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_authors 2015-02`
--

CREATE TABLE `ebooks_authors 2015-02` (
  `ebooks_authors_id` int(11) NOT NULL,
  `uri` varchar(255) NOT NULL DEFAULT '',
  `ebooks_authors_name` varchar(255) DEFAULT NULL,
  `ebooks_authors_surname` varchar(255) DEFAULT NULL,
  `ebooks_authors_htm_bio` text,
  `ebooks_authors_organisation` tinyint(1) DEFAULT '0',
  `ebooks_authors_fallecimiento` smallint(4) DEFAULT NULL,
  `ebooks_authors_rank` int(10) DEFAULT NULL,
  `ebooks_authors_ranked` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `dompub` tinyint(1) UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_books`
--

CREATE TABLE `ebooks_books` (
  `ebooks_books_id` int(11) NOT NULL,
  `uri` varchar(255) NOT NULL DEFAULT '',
  `ebooks_books_title` varchar(255) NOT NULL DEFAULT '',
  `ebooks_books_subtitle` varchar(255) DEFAULT NULL,
  `ebooks_books_author` int(11) NOT NULL DEFAULT '0',
  `ebooks_books_author2` int(11) DEFAULT NULL,
  `ebooks_books_category` int(11) DEFAULT '0',
  `server` varchar(255) DEFAULT NULL,
  `texto_online` char(4) DEFAULT NULL,
  `ebooks_books_date` varchar(50) DEFAULT NULL,
  `ebooks_books_publisher` int(11) DEFAULT '0',
  `ebooks_books_cover` smallint(6) DEFAULT '0',
  `ebooks_books_file` varchar(255) DEFAULT '',
  `ebooks_books_txt_abs` longtext,
  `ebooks_books_txt_inf` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `ebooks_books_file_english` varchar(50) DEFAULT NULL,
  `ebooks_books_editor_english` int(11) DEFAULT NULL,
  `ebooks_books_file_alternative` text,
  `ebooks_books_file_audiobook` text,
  `ebooks_books_webAlternative` varchar(60) DEFAULT NULL,
  `ebooks_books_ebookversion` varchar(20) DEFAULT NULL,
  `ebooks_books_datePublicationdigital` date DEFAULT NULL,
  `descargar` tinyint(1) UNSIGNED ZEROFILL NOT NULL DEFAULT '1' COMMENT 'si = 1 cambia el path con ! para evitar descargar',
  `ebooks_format_mobi` tinyint(1) DEFAULT '0',
  `ebooks_format_pdf` tinyint(1) DEFAULT '0',
  `ebooks_format_epub` tinyint(1) DEFAULT '0',
  `ebooks_format_doc` tinyint(1) DEFAULT NULL,
  `external_pdf` varchar(50) DEFAULT NULL,
  `videos` mediumtext,
  `videos_sugeridos` mediumtext,
  `video_audiolibro` mediumtext,
  `video_audiolibro_revisado` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `has_video_review` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'si el libro tiene video reseña de pl',
  `read_online` tinyint(1) NOT NULL DEFAULT '0' COMMENT '	0 no tiene 		1 si tiene 		2 no publicar',
  `ebooks_books_download_rank` int(11) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `views_last` int(11) DEFAULT '0',
  `views_last_week` int(11) NOT NULL DEFAULT '0',
  `views_last_year` int(11) NOT NULL DEFAULT '0',
  `ebooks_books_last_download` datetime DEFAULT '0000-00-00 00:00:00',
  `ebooks_books_ebookdate` datetime DEFAULT NULL,
  `ebooks_books_labels` text,
  `ebooks_books_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ebooks_books_price` double NOT NULL DEFAULT '0',
  `ebooks_books_doc_type` varchar(255) NOT NULL DEFAULT 'books',
  `ebooks_books_video` text,
  `link_mercadolibre` varchar(255) DEFAULT NULL,
  `link_p2p` varchar(255) DEFAULT NULL,
  `link_hotmart` varchar(255) DEFAULT NULL,
  `link_amazon` smallint(1) DEFAULT '1',
  `url_amazon` varchar(100) NOT NULL,
  `ebooks_books_lang` char(2) DEFAULT 'es',
  `demo` smallint(1) NOT NULL DEFAULT '0',
  `dompub` smallint(1) NOT NULL DEFAULT '0',
  `dompub_status` smallint(1) NOT NULL DEFAULT '-1',
  `recomendado` smallint(1) UNSIGNED NOT NULL DEFAULT '0',
  `pinterest` smallint(1) UNSIGNED DEFAULT '0',
  `procesado` smallint(1) UNSIGNED DEFAULT '0',
  `cover_link` varchar(255) DEFAULT NULL COMMENT 'link a imagen del cover',
  `pubfbig` int(1) NOT NULL DEFAULT '0' COMMENT 'pubilcado en fb instagram',
  `resumen` tinyint(1) UNSIGNED ZEROFILL NOT NULL DEFAULT '0',
  `label_procesado` smallint(1) NOT NULL DEFAULT '0',
  `link_gpt` varchar(255) DEFAULT NULL,
  `pubfbig_readonline` int(1) NOT NULL DEFAULT '0',
  `release_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_categories`
--

CREATE TABLE `ebooks_categories` (
  `ebooks_categories_id` int(11) NOT NULL,
  `ebooks_categories_category` varchar(50) DEFAULT NULL,
  `ebooks_categories_nicename` varchar(50) DEFAULT NULL,
  `ebooks_categories_description` varchar(50) DEFAULT NULL,
  `ebooks_categories_rank` int(11) DEFAULT '0',
  `lang` varchar(2) NOT NULL DEFAULT 'es'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_digitalizar`
--

CREATE TABLE `ebooks_digitalizar` (
  `id` int(10) NOT NULL,
  `ebook_id` int(10) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `fecha_hecho` date DEFAULT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pend'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_formats`
--

CREATE TABLE `ebooks_formats` (
  `ebooks_formats_id` int(11) NOT NULL,
  `ebooks_formats_name` varchar(50) DEFAULT NULL,
  `ebooks_formats_extension` varchar(5) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_mva_textos`
--

CREATE TABLE `ebooks_mva_textos` (
  `id` int(11) NOT NULL,
  `texto` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='texto de las recomendaciones standars de mva marketing viral automatico';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_packs`
--

CREATE TABLE `ebooks_packs` (
  `ebooks_packs_id` int(11) NOT NULL,
  `ebooks_packs_code` varchar(255) NOT NULL DEFAULT '',
  `ebooks_packs_name` varchar(255) NOT NULL DEFAULT '',
  `ebooks_packs_price` double NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_packs_ebooks`
--

CREATE TABLE `ebooks_packs_ebooks` (
  `ebooks_packs_ebooks_id` int(11) NOT NULL,
  `ebooks_packs_code` varchar(255) NOT NULL DEFAULT '',
  `ebooks_books_id` int(11) NOT NULL DEFAULT '0',
  `ebooks_books_file` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_packs_users`
--

CREATE TABLE `ebooks_packs_users` (
  `ebooks_packs_users_id` int(11) NOT NULL,
  `sys_users_code` varchar(255) NOT NULL DEFAULT '',
  `ebooks_packs_code` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_publishers`
--

CREATE TABLE `ebooks_publishers` (
  `ebooks_publishers_id` int(11) NOT NULL,
  `ebooks_publishers_publisher` varchar(50) NOT NULL DEFAULT '',
  `ebooks_publishers_web` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_ranking_historic`
--

CREATE TABLE `ebooks_ranking_historic` (
  `ebooks_ranking_historic_id` int(11) NOT NULL,
  `ebooks_ranking_historic_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ebooks_ranking_historic_position` smallint(6) DEFAULT '0',
  `ebooks_ranking_historic_book` int(11) DEFAULT '0',
  `ebooks_ranking_historic_nro_requests` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_trivia_questions`
--

CREATE TABLE `ebooks_trivia_questions` (
  `id` int(10) UNSIGNED NOT NULL,
  `ebooks_books_id` int(10) UNSIGNED NOT NULL,
  `tema` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `punto_clave` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pregunta` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `respuesta_correcta` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `respuesta_falsa1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `respuesta_falsa2` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `explicacion` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ebooks_users_ebooks`
--

CREATE TABLE `ebooks_users_ebooks` (
  `ebooks_users_ebooks_id` int(11) NOT NULL,
  `ebooks_packs_code` varchar(255) NOT NULL DEFAULT '',
  `sys_users_code` varchar(255) NOT NULL DEFAULT '',
  `ebooks_books_id` int(11) NOT NULL DEFAULT '0',
  `ebooks_books_file` varchar(255) NOT NULL DEFAULT '',
  `ebooks_users_ebooks_current_page` int(11) NOT NULL DEFAULT '1',
  `ebooks_users_ebooks_first_read` datetime DEFAULT NULL,
  `ebooks_users_ebooks_last_read` datetime DEFAULT NULL,
  `ebooks_users_ebooks_last_read_from` varchar(255) DEFAULT NULL,
  `ebooks_users_ebooks_html_access` int(11) DEFAULT '0',
  `ebooks_users_ebooks_wap_access` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_login`
--

CREATE TABLE `failed_login` (
  `failedid` int(50) NOT NULL,
  `loc` varchar(10) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `sms` varchar(10) NOT NULL,
  `smstok` varchar(30) DEFAULT 'empty',
  `msg` varchar(100) NOT NULL,
  `inital_attempt` datetime NOT NULL,
  `current_attempt` datetime NOT NULL,
  `country` varchar(10) NOT NULL,
  `setid` int(50) NOT NULL,
  `ipad` varchar(30) NOT NULL,
  `refurl` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_searches`
--

CREATE TABLE `failed_searches` (
  `id` int(11) NOT NULL,
  `normalized_text` varchar(255) NOT NULL,
  `cantidad` int(11) DEFAULT '1',
  `agregado` tinyint(1) DEFAULT '0',
  `last_search` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites`
--

CREATE TABLE `favorites` (
  `favorite_user_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `favorite_link_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `favorite_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros_pedidos`
--

CREATE TABLE `libros_pedidos` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `libro` varchar(255) DEFAULT '',
  `pedido` smallint(15) UNSIGNED DEFAULT '0',
  `publicado` tinyint(15) DEFAULT '0',
  `userid` int(15) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros_pedidos_old`
--

CREATE TABLE `libros_pedidos_old` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `libro` varchar(255) DEFAULT '',
  `pedido` smallint(15) UNSIGNED DEFAULT '0',
  `publicado` tinyint(15) DEFAULT '0',
  `userid` int(15) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mailing`
--

CREATE TABLE `mailing` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_global` tinyint(1) DEFAULT '0',
  `completed` tinyint(1) DEFAULT '0',
  `last_mail` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mailing_users`
--

CREATE TABLE `mailing_users` (
  `id` int(11) NOT NULL,
  `mailing_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('pending','sent','failed') DEFAULT 'pending',
  `retries` int(11) DEFAULT '0',
  `error_message` text,
  `sent_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migracion_estado`
--

CREATE TABLE `migracion_estado` (
  `proceso` varchar(50) NOT NULL,
  `ultimo_id` int(11) DEFAULT '0',
  `actualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mp_antispam`
--

CREATE TABLE `mp_antispam` (
  `id_token` int(11) NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `tipo` smallint(6) NOT NULL,
  `spam` int(11) NOT NULL DEFAULT '0',
  `ham` int(11) NOT NULL DEFAULT '0',
  `freq` double NOT NULL DEFAULT '0',
  `error` double NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mp_config`
--

CREATE TABLE `mp_config` (
  `setting` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sneakers`
--

CREATE TABLE `sneakers` (
  `sneaker_id` char(24) NOT NULL,
  `sneaker_time` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `sneaker_user` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MEMORY DEFAULT CHARSET=latin1 MAX_ROWS=1000;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats_browser`
--

CREATE TABLE `stats_browser` (
  `browser_code` varchar(5) NOT NULL,
  `browser_name` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats_country_ip`
--

CREATE TABLE `stats_country_ip` (
  `ipstart` bigint(100) NOT NULL,
  `ipend` bigint(100) NOT NULL,
  `2letter` varchar(2) NOT NULL,
  `3letter` varchar(3) NOT NULL,
  `full` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats_country_iso_codes`
--

CREATE TABLE `stats_country_iso_codes` (
  `name` varchar(100) NOT NULL,
  `code` varchar(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stats_lang`
--

CREATE TABLE `stats_lang` (
  `langid` mediumint(4) NOT NULL,
  `lang_code` varchar(5) NOT NULL,
  `language` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_users`
--

CREATE TABLE `sys_users` (
  `sys_users_id` int(255) NOT NULL,
  `sys_users_code` varchar(255) NOT NULL DEFAULT '',
  `sys_users_email` varchar(255) NOT NULL DEFAULT '',
  `sys_users_movilcode` varchar(16) NOT NULL DEFAULT '',
  `sys_users_firstname` varchar(255) DEFAULT NULL,
  `sys_users_lastname` varchar(255) DEFAULT NULL,
  `sys_users_password` varchar(255) DEFAULT NULL,
  `sys_users_country` char(2) DEFAULT NULL,
  `sys_users_group` varchar(255) DEFAULT NULL,
  `sys_users_open_last_book` int(11) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sys_users_email`
--

CREATE TABLE `sys_users_email` (
  `sys_users_email_id` int(11) NOT NULL,
  `sys_users_email_timestamp` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `sys_users_email_from` varchar(255) NOT NULL DEFAULT '',
  `sys_users_email_to` varchar(255) NOT NULL DEFAULT '',
  `sys_users_email_subject` varchar(255) NOT NULL DEFAULT '',
  `sys_users_email_text` text,
  `sys_users_email_type` varchar(255) NOT NULL DEFAULT '',
  `sys_users_email_country_code` char(2) DEFAULT NULL,
  `sys_users_email_user_ip` varchar(255) NOT NULL DEFAULT '',
  `sys_users_email_doc` varchar(255) DEFAULT NULL,
  `sys_users_email_doc_id` int(11) DEFAULT '0',
  `sys_users_email_doc_type` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `uri` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_es` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ranking` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `script` varchar(50) NOT NULL,
  `interval` int(6) NOT NULL DEFAULT '0',
  `last_exec` datetime DEFAULT NULL,
  `next_exec` datetime DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT '0',
  `contador` int(11) DEFAULT '0',
  `prioridad` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `user_login` varchar(32) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_level` enum('disabled','normal','special','blogger','admin','god') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'normal',
  `user_avatar` tinyint(1) NOT NULL DEFAULT '0',
  `user_modification` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_validated_date` timestamp NULL DEFAULT NULL,
  `user_ip` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_pass` varchar(64) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_email` varchar(64) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_names` varchar(60) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_login_register` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_email_register` varchar(64) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_lang` tinyint(2) UNSIGNED NOT NULL DEFAULT '1',
  `user_comment_pref` tinyint(2) UNSIGNED NOT NULL DEFAULT '0',
  `user_karma` decimal(10,2) DEFAULT '6.00',
  `user_public_info` varchar(64) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_url` varchar(128) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_adcode` varchar(24) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_adchannel` varchar(12) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_country` varchar(2) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_copy`
--

CREATE TABLE `users_copy` (
  `user_id` int(20) NOT NULL,
  `user_login` varchar(32) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_level` enum('disabled','normal','special','blogger','admin','god') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'normal',
  `user_avatar` tinyint(1) NOT NULL DEFAULT '0',
  `user_modification` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_validated_date` timestamp NULL DEFAULT NULL,
  `user_ip` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_pass` varchar(64) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_email` varchar(64) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_names` varchar(60) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_login_register` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_email_register` varchar(64) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_lang` tinyint(2) UNSIGNED NOT NULL DEFAULT '1',
  `user_comment_pref` tinyint(2) UNSIGNED NOT NULL DEFAULT '0',
  `user_karma` decimal(10,2) DEFAULT '6.00',
  `user_public_info` varchar(64) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_url` varchar(128) COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `user_adcode` varchar(24) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_adchannel` varchar(12) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_country` varchar(2) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_books`
--

CREATE TABLE `user_books` (
  `id` int(10) NOT NULL,
  `user_id` int(20) NOT NULL DEFAULT '0',
  `ebooks_books_id` int(10) NOT NULL DEFAULT '0',
  `current_page` int(10) NOT NULL DEFAULT '0',
  `leidas` int(10) NOT NULL DEFAULT '1',
  `first_read` datetime DEFAULT NULL,
  `last_read` datetime DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `stat_web` int(11) NOT NULL DEFAULT '0',
  `stat_movil` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_books_log`
--

CREATE TABLE `user_books_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `page_number` smallint(5) UNSIGNED NOT NULL,
  `read_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_groups`
--

CREATE TABLE `user_groups` (
  `groupid` int(255) NOT NULL,
  `name` varchar(200) NOT NULL,
  `descip` varchar(4000) NOT NULL,
  `valid` int(2) NOT NULL,
  `group_type` int(2) NOT NULL DEFAULT '1',
  `fee` decimal(20,2) NOT NULL,
  `expire_in_days` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_groups_copy`
--

CREATE TABLE `user_groups_copy` (
  `groupid` int(255) NOT NULL,
  `name` varchar(200) NOT NULL,
  `descip` varchar(4000) NOT NULL,
  `valid` int(2) NOT NULL,
  `group_type` int(2) NOT NULL DEFAULT '1',
  `fee` decimal(20,2) NOT NULL,
  `expire_in_days` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_table`
--

CREATE TABLE `user_table` (
  `userid` int(255) NOT NULL,
  `username` varchar(200) NOT NULL,
  `screenname` varchar(200) NOT NULL,
  `p_hash` varchar(200) NOT NULL,
  `s_hash` varchar(100) NOT NULL,
  `valid` int(3) NOT NULL,
  `acti_code` varchar(300) NOT NULL,
  `ipad` varchar(30) NOT NULL,
  `date_joined` datetime NOT NULL,
  `lastip` varchar(30) NOT NULL,
  `last_visit` datetime NOT NULL,
  `email` varchar(200) NOT NULL,
  `gravtar_email` varchar(200) NOT NULL,
  `usergroup` int(255) NOT NULL,
  `temppass` varchar(100) NOT NULL,
  `tpdate` datetime NOT NULL,
  `tpip` varchar(30) NOT NULL,
  `tp_flag` int(1) NOT NULL,
  `browser` varchar(5) DEFAULT 'OBW',
  `os` varchar(5) DEFAULT 'OOS',
  `lang` varchar(5) DEFAULT 'ool',
  `country` varchar(5) DEFAULT 'ZZ',
  `refid` varchar(50) DEFAULT NULL,
  `refurl` varchar(1000) DEFAULT NULL,
  `refdomain` varchar(100) DEFAULT NULL,
  `contact` int(1) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `sname` varchar(50) DEFAULT NULL,
  `mobilenum` varchar(20) DEFAULT NULL,
  `screenres` varchar(30) NOT NULL,
  `searchengine` varchar(30) NOT NULL,
  `searchterm` varchar(300) NOT NULL,
  `smstok` varchar(30) DEFAULT NULL,
  `smsip` varchar(30) DEFAULT NULL,
  `smstimedate` datetime NOT NULL,
  `oneuse` int(1) NOT NULL DEFAULT '0',
  `landingpage` varchar(500) DEFAULT 'none',
  `openidurl` varchar(500) NOT NULL,
  `authentication_source` varchar(30) NOT NULL DEFAULT 'userbase',
  `img_flag` varchar(1) NOT NULL DEFAULT '0',
  `img_url` varchar(1000) NOT NULL,
  `cookie_id` varchar(1000) NOT NULL,
  `cookie_salt` varchar(50) NOT NULL,
  `cookie_expire` datetime NOT NULL,
  `paid` int(2) NOT NULL DEFAULT '0',
  `fee` decimal(20,2) NOT NULL,
  `credit` decimal(20,2) NOT NULL DEFAULT '0.00',
  `renew_date` datetime NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_table_copy`
--

CREATE TABLE `user_table_copy` (
  `userid` int(255) NOT NULL,
  `username` varchar(200) NOT NULL,
  `screenname` varchar(200) NOT NULL,
  `p_hash` varchar(200) NOT NULL,
  `s_hash` varchar(100) NOT NULL,
  `valid` int(3) NOT NULL,
  `acti_code` varchar(300) NOT NULL,
  `ipad` varchar(30) NOT NULL,
  `date_joined` datetime NOT NULL,
  `lastip` varchar(30) NOT NULL,
  `last_visit` datetime NOT NULL,
  `email` varchar(200) NOT NULL,
  `gravtar_email` varchar(200) NOT NULL,
  `usergroup` int(255) NOT NULL,
  `temppass` varchar(100) NOT NULL,
  `tpdate` datetime NOT NULL,
  `tpip` varchar(30) NOT NULL,
  `tp_flag` int(1) NOT NULL,
  `browser` varchar(5) DEFAULT 'OBW',
  `os` varchar(5) DEFAULT 'OOS',
  `lang` varchar(5) DEFAULT 'ool',
  `country` varchar(5) DEFAULT 'ZZ',
  `refid` varchar(50) DEFAULT NULL,
  `refurl` varchar(1000) DEFAULT NULL,
  `refdomain` varchar(100) DEFAULT NULL,
  `contact` int(1) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `sname` varchar(50) DEFAULT NULL,
  `mobilenum` varchar(20) DEFAULT NULL,
  `screenres` varchar(30) NOT NULL,
  `searchengine` varchar(30) NOT NULL,
  `searchterm` varchar(300) NOT NULL,
  `smstok` varchar(30) DEFAULT NULL,
  `smsip` varchar(30) DEFAULT NULL,
  `smstimedate` datetime NOT NULL,
  `oneuse` int(1) NOT NULL DEFAULT '0',
  `landingpage` varchar(500) DEFAULT 'none',
  `openidurl` varchar(500) NOT NULL,
  `authentication_source` varchar(30) NOT NULL DEFAULT 'userbase',
  `img_flag` varchar(1) NOT NULL DEFAULT '0',
  `img_url` varchar(1000) NOT NULL,
  `cookie_id` varchar(1000) NOT NULL,
  `cookie_salt` varchar(50) NOT NULL,
  `cookie_expire` datetime NOT NULL,
  `paid` int(2) NOT NULL DEFAULT '0',
  `fee` decimal(20,2) NOT NULL,
  `renew_date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tags`
--

CREATE TABLE `user_tags` (
  `user_id` int(20) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `cantidad` double DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_video_audiolibros`
--

CREATE TABLE `user_video_audiolibros` (
  `id` int(10) NOT NULL,
  `user_id` int(20) NOT NULL DEFAULT '0',
  `ebooks_books_id` int(10) NOT NULL DEFAULT '0',
  `current_min` int(10) NOT NULL DEFAULT '0',
  `max_min` int(10) NOT NULL DEFAULT '0',
  `first_read` datetime DEFAULT NULL,
  `last_read` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id` int(10) NOT NULL,
  `youtubeid` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `channelid` varchar(255) DEFAULT NULL,
  `description` mediumtext,
  `channeltitle` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos_book`
--

CREATE TABLE `videos_book` (
  `id` int(11) NOT NULL,
  `videoid` varchar(50) NOT NULL,
  `libro_uri` varchar(255) NOT NULL,
  `userid` int(20) NOT NULL,
  `fecha` date NOT NULL,
  `views` int(11) DEFAULT '0',
  `rank` int(11) DEFAULT '0',
  `lang` varchar(2) NOT NULL DEFAULT 'es',
  `is_short` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos_sugeridos`
--

CREATE TABLE `videos_sugeridos` (
  `id` int(10) NOT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `pagina` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `video_audiolibros`
--

CREATE TABLE `video_audiolibros` (
  `id` int(11) NOT NULL,
  `videoid` varchar(50) NOT NULL,
  `libro_uri` varchar(255) NOT NULL,
  `userid` int(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) DEFAULT '0',
  `rank` int(11) DEFAULT '0',
  `completo` int(1) UNSIGNED DEFAULT '0',
  `vozhumana` int(1) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visit_stats`
--

CREATE TABLE `visit_stats` (
  `visitid` int(15) NOT NULL,
  `reg_flag` int(1) NOT NULL,
  `browser` varchar(30) NOT NULL,
  `os` varchar(30) NOT NULL,
  `lang` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `date_visited` datetime NOT NULL,
  `refurl` varchar(500) NOT NULL,
  `refdomain` varchar(200) NOT NULL,
  `refid` varchar(50) NOT NULL,
  `screenres` varchar(30) NOT NULL,
  `userid` int(20) NOT NULL COMMENT 'if you really want to track users',
  `searchengine` varchar(100) NOT NULL,
  `searchterm` varchar(300) NOT NULL,
  `admin_flag` int(1) NOT NULL,
  `landingpage` varchar(500) DEFAULT 'none',
  `lp_flag` int(1) NOT NULL,
  `parent_id` int(15) NOT NULL,
  `landing_id` int(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ab_events`
--
ALTER TABLE `ab_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_exp_var` (`experiment`,`variant`),
  ADD KEY `idx_event` (`event`),
  ADD KEY `idx_created` (`created_at`);

--
-- Indices de la tabla `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`avatar_id`);

--
-- Indices de la tabla `blocked_ip_domains`
--
ALTER TABLE `blocked_ip_domains`
  ADD PRIMARY KEY (`bid`);

--
-- Indices de la tabla `books_tags`
--
ALTER TABLE `books_tags`
  ADD PRIMARY KEY (`book_id`,`tag_id`),
  ADD KEY `idx_book_id` (`book_id`),
  ADD KEY `idx_tag_id` (`tag_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category__auto_id`),
  ADD UNIQUE KEY `category_lang` (`category_lang`,`category_id`);

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD KEY `chat_time` (`chat_time`) USING BTREE;

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comment_link_id_2` (`comment_link_id`,`comment_date`),
  ADD KEY `comment_date` (`comment_date`),
  ADD KEY `comment_user_id` (`comment_user_id`,`comment_date`),
  ADD KEY `comment_link_id` (`comment_link_id`,`comment_order`);

--
-- Indices de la tabla `download_log`
--
ALTER TABLE `download_log`
  ADD PRIMARY KEY (`download_log_id`),
  ADD KEY `download_log_object` (`download_log_object`),
  ADD KEY `ndx_timestamp` (`download_log_timestamp`),
  ADD KEY `ndx_country_code` (`download_log_country_code`);

--
-- Indices de la tabla `ebooks_authors`
--
ALTER TABLE `ebooks_authors`
  ADD PRIMARY KEY (`ebooks_authors_id`),
  ADD UNIQUE KEY `uri` (`uri`),
  ADD UNIQUE KEY `ebooks_authors_name` (`ebooks_authors_name`),
  ADD KEY `ebooks_authors_id` (`ebooks_authors_id`);

--
-- Indices de la tabla `ebooks_authors 2015-02`
--
ALTER TABLE `ebooks_authors 2015-02`
  ADD PRIMARY KEY (`ebooks_authors_id`),
  ADD UNIQUE KEY `ebooks_authors_name` (`ebooks_authors_name`),
  ADD KEY `ebooks_authors_id` (`ebooks_authors_id`);

--
-- Indices de la tabla `ebooks_books`
--
ALTER TABLE `ebooks_books`
  ADD PRIMARY KEY (`ebooks_books_id`),
  ADD UNIQUE KEY `uri` (`uri`),
  ADD KEY `ebooks_books_category` (`ebooks_books_category`),
  ADD KEY `ebooks_books_title` (`ebooks_books_title`),
  ADD KEY `ebooks_books_download_rank` (`ebooks_books_download_rank`),
  ADD KEY `ebooks_books_ebookdate` (`ebooks_books_ebookdate`),
  ADD KEY `ebooks_books_author` (`ebooks_books_author`),
  ADD KEY `views` (`views`),
  ADD KEY `ebooks_books_lang` (`ebooks_books_lang`);
ALTER TABLE `ebooks_books` ADD FULLTEXT KEY `ebooks_books_labels` (`ebooks_books_labels`);

--
-- Indices de la tabla `ebooks_categories`
--
ALTER TABLE `ebooks_categories`
  ADD PRIMARY KEY (`ebooks_categories_id`),
  ADD UNIQUE KEY `ebooks_categories_nicename` (`ebooks_categories_nicename`);
ALTER TABLE `ebooks_categories` ADD FULLTEXT KEY `ebooks_categories_category` (`ebooks_categories_category`);

--
-- Indices de la tabla `ebooks_digitalizar`
--
ALTER TABLE `ebooks_digitalizar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ebook_id` (`ebook_id`);

--
-- Indices de la tabla `ebooks_formats`
--
ALTER TABLE `ebooks_formats`
  ADD PRIMARY KEY (`ebooks_formats_id`),
  ADD KEY `ebooks_formats_id` (`ebooks_formats_id`);

--
-- Indices de la tabla `ebooks_mva_textos`
--
ALTER TABLE `ebooks_mva_textos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ebooks_packs`
--
ALTER TABLE `ebooks_packs`
  ADD UNIQUE KEY `ebooks_packs_id` (`ebooks_packs_id`);

--
-- Indices de la tabla `ebooks_packs_ebooks`
--
ALTER TABLE `ebooks_packs_ebooks`
  ADD PRIMARY KEY (`ebooks_packs_ebooks_id`);

--
-- Indices de la tabla `ebooks_packs_users`
--
ALTER TABLE `ebooks_packs_users`
  ADD PRIMARY KEY (`ebooks_packs_users_id`);

--
-- Indices de la tabla `ebooks_publishers`
--
ALTER TABLE `ebooks_publishers`
  ADD PRIMARY KEY (`ebooks_publishers_id`),
  ADD KEY `ebooks_publishers_publisher` (`ebooks_publishers_publisher`),
  ADD KEY `ebooks_publishers_id` (`ebooks_publishers_id`);

--
-- Indices de la tabla `ebooks_ranking_historic`
--
ALTER TABLE `ebooks_ranking_historic`
  ADD PRIMARY KEY (`ebooks_ranking_historic_id`),
  ADD KEY `ebooks_ranking_historic_id` (`ebooks_ranking_historic_id`);

--
-- Indices de la tabla `ebooks_trivia_questions`
--
ALTER TABLE `ebooks_trivia_questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_trivia_unique` (`ebooks_books_id`,`tema`,`punto_clave`(255),`pregunta`(255));

--
-- Indices de la tabla `ebooks_users_ebooks`
--
ALTER TABLE `ebooks_users_ebooks`
  ADD PRIMARY KEY (`ebooks_users_ebooks_id`);

--
-- Indices de la tabla `failed_login`
--
ALTER TABLE `failed_login`
  ADD PRIMARY KEY (`failedid`);

--
-- Indices de la tabla `failed_searches`
--
ALTER TABLE `failed_searches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `normalized_text` (`normalized_text`);

--
-- Indices de la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD UNIQUE KEY `favorite_user_id` (`favorite_user_id`,`favorite_link_id`),
  ADD KEY `favorite_link_id` (`favorite_link_id`);

--
-- Indices de la tabla `libros_pedidos`
--
ALTER TABLE `libros_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `libro` (`libro`);

--
-- Indices de la tabla `libros_pedidos_old`
--
ALTER TABLE `libros_pedidos_old`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `libro` (`libro`);

--
-- Indices de la tabla `mailing`
--
ALTER TABLE `mailing`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mailing_users`
--
ALTER TABLE `mailing_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mailing_id` (`mailing_id`);

--
-- Indices de la tabla `migracion_estado`
--
ALTER TABLE `migracion_estado`
  ADD PRIMARY KEY (`proceso`);

--
-- Indices de la tabla `mp_antispam`
--
ALTER TABLE `mp_antispam`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `TOKEN` (`token`),
  ADD KEY `TIPO` (`tipo`);

--
-- Indices de la tabla `mp_config`
--
ALTER TABLE `mp_config`
  ADD PRIMARY KEY (`setting`);

--
-- Indices de la tabla `sneakers`
--
ALTER TABLE `sneakers`
  ADD UNIQUE KEY `sneaker_id` (`sneaker_id`);

--
-- Indices de la tabla `stats_browser`
--
ALTER TABLE `stats_browser`
  ADD PRIMARY KEY (`browser_code`);

--
-- Indices de la tabla `stats_country_ip`
--
ALTER TABLE `stats_country_ip`
  ADD KEY `ipstart` (`ipstart`),
  ADD KEY `ipend` (`ipend`);

--
-- Indices de la tabla `stats_country_iso_codes`
--
ALTER TABLE `stats_country_iso_codes`
  ADD PRIMARY KEY (`code`);

--
-- Indices de la tabla `stats_lang`
--
ALTER TABLE `stats_lang`
  ADD PRIMARY KEY (`langid`);

--
-- Indices de la tabla `sys_users`
--
ALTER TABLE `sys_users`
  ADD PRIMARY KEY (`sys_users_id`);

--
-- Indices de la tabla `sys_users_email`
--
ALTER TABLE `sys_users_email`
  ADD PRIMARY KEY (`sys_users_email_id`),
  ADD KEY `sys_users_email_doc` (`sys_users_email_doc`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uri` (`uri`),
  ADD UNIQUE KEY `nombre_es` (`nombre_es`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_login` (`user_login`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `user_karma` (`user_karma`);

--
-- Indices de la tabla `users_copy`
--
ALTER TABLE `users_copy`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_login` (`user_login`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `user_karma` (`user_karma`);

--
-- Indices de la tabla `user_books`
--
ALTER TABLE `user_books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_ebooks_books_id` (`user_id`,`ebooks_books_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ebooks_books_id` (`ebooks_books_id`);

--
-- Indices de la tabla `user_books_log`
--
ALTER TABLE `user_books_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `page_number` (`page_number`),
  ADD KEY `read_at` (`read_at`),
  ADD KEY `book_id_2` (`book_id`,`read_at`),
  ADD KEY `user_id_2` (`user_id`,`book_id`,`read_at`);

--
-- Indices de la tabla `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`groupid`);

--
-- Indices de la tabla `user_groups_copy`
--
ALTER TABLE `user_groups_copy`
  ADD PRIMARY KEY (`groupid`);

--
-- Indices de la tabla `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `usergroup` (`usergroup`),
  ADD KEY `last_visit` (`last_visit`);

--
-- Indices de la tabla `user_table_copy`
--
ALTER TABLE `user_table_copy`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `usergroup` (`usergroup`);

--
-- Indices de la tabla `user_tags`
--
ALTER TABLE `user_tags`
  ADD PRIMARY KEY (`user_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indices de la tabla `user_video_audiolibros`
--
ALTER TABLE `user_video_audiolibros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_ebooks_books_id` (`user_id`,`ebooks_books_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ebooks_books_id` (`ebooks_books_id`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `youtubeid` (`youtubeid`);

--
-- Indices de la tabla `videos_book`
--
ALTER TABLE `videos_book`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `videoid_libro_uri` (`videoid`,`libro_uri`),
  ADD KEY `libro_uri` (`libro_uri`);

--
-- Indices de la tabla `videos_sugeridos`
--
ALTER TABLE `videos_sugeridos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tema` (`uri`);

--
-- Indices de la tabla `video_audiolibros`
--
ALTER TABLE `video_audiolibros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `videoid_libro_uri` (`videoid`,`libro_uri`);

--
-- Indices de la tabla `visit_stats`
--
ALTER TABLE `visit_stats`
  ADD UNIQUE KEY `visitid` (`visitid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ab_events`
--
ALTER TABLE `ab_events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `blocked_ip_domains`
--
ALTER TABLE `blocked_ip_domains`
  MODIFY `bid` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category__auto_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `download_log`
--
ALTER TABLE `download_log`
  MODIFY `download_log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_authors`
--
ALTER TABLE `ebooks_authors`
  MODIFY `ebooks_authors_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_authors 2015-02`
--
ALTER TABLE `ebooks_authors 2015-02`
  MODIFY `ebooks_authors_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_books`
--
ALTER TABLE `ebooks_books`
  MODIFY `ebooks_books_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_categories`
--
ALTER TABLE `ebooks_categories`
  MODIFY `ebooks_categories_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_digitalizar`
--
ALTER TABLE `ebooks_digitalizar`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_formats`
--
ALTER TABLE `ebooks_formats`
  MODIFY `ebooks_formats_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_mva_textos`
--
ALTER TABLE `ebooks_mva_textos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_packs`
--
ALTER TABLE `ebooks_packs`
  MODIFY `ebooks_packs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_packs_ebooks`
--
ALTER TABLE `ebooks_packs_ebooks`
  MODIFY `ebooks_packs_ebooks_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_packs_users`
--
ALTER TABLE `ebooks_packs_users`
  MODIFY `ebooks_packs_users_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_publishers`
--
ALTER TABLE `ebooks_publishers`
  MODIFY `ebooks_publishers_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_ranking_historic`
--
ALTER TABLE `ebooks_ranking_historic`
  MODIFY `ebooks_ranking_historic_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_trivia_questions`
--
ALTER TABLE `ebooks_trivia_questions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ebooks_users_ebooks`
--
ALTER TABLE `ebooks_users_ebooks`
  MODIFY `ebooks_users_ebooks_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_login`
--
ALTER TABLE `failed_login`
  MODIFY `failedid` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_searches`
--
ALTER TABLE `failed_searches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libros_pedidos`
--
ALTER TABLE `libros_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libros_pedidos_old`
--
ALTER TABLE `libros_pedidos_old`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mailing`
--
ALTER TABLE `mailing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mailing_users`
--
ALTER TABLE `mailing_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mp_antispam`
--
ALTER TABLE `mp_antispam`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stats_lang`
--
ALTER TABLE `stats_lang`
  MODIFY `langid` mediumint(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sys_users`
--
ALTER TABLE `sys_users`
  MODIFY `sys_users_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sys_users_email`
--
ALTER TABLE `sys_users_email`
  MODIFY `sys_users_email_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_copy`
--
ALTER TABLE `users_copy`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_books`
--
ALTER TABLE `user_books`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_books_log`
--
ALTER TABLE `user_books_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_groups`
--
ALTER TABLE `user_groups`
  MODIFY `groupid` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_groups_copy`
--
ALTER TABLE `user_groups_copy`
  MODIFY `groupid` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_table`
--
ALTER TABLE `user_table`
  MODIFY `userid` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_table_copy`
--
ALTER TABLE `user_table_copy`
  MODIFY `userid` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_video_audiolibros`
--
ALTER TABLE `user_video_audiolibros`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `videos_book`
--
ALTER TABLE `videos_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `videos_sugeridos`
--
ALTER TABLE `videos_sugeridos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `video_audiolibros`
--
ALTER TABLE `video_audiolibros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visit_stats`
--
ALTER TABLE `visit_stats`
  MODIFY `visitid` int(15) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mailing_users`
--
ALTER TABLE `mailing_users`
  ADD CONSTRAINT `mailing_users_ibfk_1` FOREIGN KEY (`mailing_id`) REFERENCES `mailing` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_tags`
--
ALTER TABLE `user_tags`
  ADD CONSTRAINT `user_tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`userid`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
