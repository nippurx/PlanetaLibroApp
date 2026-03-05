# Queries Index

Fuente de extracci?n: PHP/INC/PHTML recursivo en la ra?z del proyecto, excluyendo `vendor/`. Total de queries indexadas: **1368**.

## Q0001

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `user_agent`, `experiment`, `session_id`, `variant`, `event`
- Archivo:l?nea: `ab_lib.php:60-69`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = " INSERT INTO ab_events (experiment, variant, event, session_id, user_agent) VALUES ( '".mpdb_escape($experiment)."', '".mpdb_escape($variant)."', 'impression', '".mpdb_escape($session_id)."', '".mpdb_escape($ua)."' ) ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en ab_lib.php:71

## Q0002

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `user_agent`, `experiment`, `session_id`, `variant`, `event`
- Archivo:l?nea: `ab_lib.php:90-99`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = " INSERT INTO ab_events (experiment, variant, event, session_id, user_agent) VALUES ( '".mpdb_escape($experiment)."', '".mpdb_escape($variant)."', 'click', '".mpdb_escape($session_id)."', '".mpdb_escape($ua)."' ) ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en ab_lib.php:102

## Q0003

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_inf`, `views`
- Archivo:l?nea: `adm/adm_books_funcs.php:22`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_txt_inf is null order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0004

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_inf`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:29`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_txt_inf is null or ebooks_books_txt_inf = '0' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0005

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_abs`, `url_amazon`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where (ebooks_books_txt_abs <> '!' or ebooks_books_txt_abs is null) and url_amazon <> '' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0006

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_inf`, `ebooks_books_lang`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:42`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_txt_inf = '0' and ebooks_books_lang = 'en' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0007

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `libros_pedidos`
- Columnas detectadas: `ebooks_books_txt_inf`, `views_last`, `publicado`, `pedido`, `libro`, `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:48-56`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT lp.*, eb.* FROM libros_pedidos lp INNER JOIN ebooks_books eb ON eb.uri = lp.libro WHERE lp.publicado = 1 and ebooks_books_txt_inf is null or ebooks_books_txt_inf = '0' ORDER BY lp.pedido DESC, eb.views_last DESC LIMIT 1 ";
```

- Notas: QUERY DIN?MICA

## Q0008

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:66`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:71

## Q0009

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_abs`, `url_amazon`
- Archivo:l?nea: `adm/adm_books_funcs.php:82`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where (ebooks_books_txt_abs <> '!' or ebooks_books_txt_abs is null) and url_amazon <> ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:83

## Q0010

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `url_amazon`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:247`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where url_amazon = '' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0011

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `url_amazon`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:253`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where url_amazon = '' and ebooks_books_lang = 'en' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:266

## Q0012

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:261`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:266

## Q0013

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `url_amazon`
- Archivo:l?nea: `adm/adm_books_funcs.php:277`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where url_amazon = ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:278

## Q0014

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `link_gpt`
- Archivo:l?nea: `adm/adm_books_funcs.php:366`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where link_gpt = '' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0015

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `views_last`, `link_gpt`
- Archivo:l?nea: `adm/adm_books_funcs.php:372`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where link_gpt = '' and ebooks_books_lang = 'en' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:385

## Q0016

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:380`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:385

## Q0017

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `link_gpt`
- Archivo:l?nea: `adm/adm_books_funcs.php:396`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where link_gpt = ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:397

## Q0018

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `label_procesado`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:486`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where label_procesado = 0 order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0019

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `label_procesado`, `read_online`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:492`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and label_procesado = 0 order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0020

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `libros_pedidos`
- Columnas detectadas: `label_procesado`, `views_last`, `publicado`, `pedido`, `libro`, `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:495-503`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT lp.*, eb.* FROM libros_pedidos lp INNER JOIN ebooks_books eb ON eb.uri = lp.libro WHERE lp.publicado = 1 and eb.label_procesado = 0 ORDER BY lp.pedido DESC, eb.views_last DESC LIMIT 1 ";
```

- Notas: QUERY DIN?MICA

## Q0021

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `read_online`, `lang`
- Archivo:l?nea: `adm/adm_books_funcs.php:511`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = '".$gvar['lang']."' and read_online = 1 order by ebooks_books_updated desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0022

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `label_procesado`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:520`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where label_procesado = 0 and ebooks_books_lang = 'en' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:533

## Q0023

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:528`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:533

## Q0024

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `label_procesado`
- Archivo:l?nea: `adm/adm_books_funcs.php:544`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where label_procesado = 0";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:545

## Q0025

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `label_procesado`
- Archivo:l?nea: `adm/adm_books_funcs.php:548`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where label_procesado = 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:549

## Q0026

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:674`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:679

## Q0027

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `libros_pedidos`
- Columnas detectadas: `read_online`, `views_last`, `publicado`, `pedido`, `libro`, `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:764-772`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT lp.*, eb.* FROM libros_pedidos lp INNER JOIN ebooks_books eb ON eb.uri = lp.libro WHERE lp.publicado = 1 and eb.read_online = 0 ORDER BY lp.pedido DESC, eb.views_last DESC LIMIT 1 ";
```

- Notas: QUERY DIN?MICA

## Q0028

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:781`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 0 order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0029

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `read_online`, `views_last`
- Archivo:l?nea: `adm/adm_books_funcs.php:787`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 0 and ebooks_books_lang = 'en' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:800

## Q0030

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_books_funcs.php:795`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:800

## Q0031

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`
- Archivo:l?nea: `adm/adm_books_funcs.php:811`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where read_online = 0";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:812

## Q0032

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`
- Archivo:l?nea: `adm/adm_books_funcs.php:815`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where read_online = 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_books_funcs.php:816

## Q0033

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_table`, `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adm_stats.php:81-84`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select u.username, b.ebooks_books_title from user_video_audiolibros as uv, ebooks_books as b, user_table as u where b.ebooks_books_id = uv.ebooks_books_id and uv.user_id = u.userid';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_stats.php:85

## Q0034

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_format_epub`, `uri`
- Archivo:l?nea: `adm/adm_upload_epub.php:214`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_format_epub = 1, ebooks_books_updated = NOW() where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/adm_upload_epub.php:216

## Q0035

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/adm_upload_epub.php:222`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql= "select * from ebooks_books where uri = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adm_upload_epub.php:223

## Q0036

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_epub`, `uri`
- Archivo:l?nea: `adm/adm_upload_epub.php:229`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_format_epub = -1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/adm_upload_epub.php:231

## Q0037

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/adm_upload_epub.php:237`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update libros_pedidos set publicado = 1 where libro = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/adm_upload_epub.php:238

## Q0038

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `experiment`
- Archivo:l?nea: `adm/adminlte/ab_monitor_adm.php:44`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT DISTINCT experiment FROM ab_events ORDER BY experiment";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/ab_monitor_adm.php:45

## Q0039

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `created_at`
- Archivo:l?nea: `adm/adminlte/ab_monitor_adm.php:52`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$min_fecha_row = mpdb_get_value("SELECT MIN(DATE(created_at)) AS min_fecha FROM ab_events", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0040

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `created_at`, `experiment`, `variant`, `fecha`, `event`
- Archivo:l?nea: `adm/adminlte/ab_monitor_adm.php:71-82`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT DATE(created_at) AS fecha, experiment, variant, SUM(event='impression') AS impresiones, SUM(event='click') AS clicks FROM ab_events WHERE $where GROUP BY fecha, experiment, variant ORDER BY fecha ASC, experiment ASC ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/ab_monitor_adm.php:84

## Q0041

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `created_at`, `experiment`, `variant`, `event`
- Archivo:l?nea: `adm/adminlte/ab_monitor_adm.php:92-103`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_resumen = " SELECT experiment, variant, SUM(event='impression') AS impresiones, SUM(event='click') AS clicks, COUNT(DISTINCT DATE(created_at)) AS dias_activos FROM ab_events WHERE $where GROUP BY experiment, variant ORDER BY experiment, variant ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/ab_monitor_adm.php:105

## Q0042

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ab_events`
- Columnas detectadas: `created_at`, `fecha`, `event`
- Archivo:l?nea: `adm/adminlte/ab_monitor_adm.php:113-121`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_clicks_totales = " SELECT DATE(created_at) AS fecha, SUM(event='click') AS clicks_totales FROM ab_events WHERE $where_rango GROUP BY fecha ORDER BY fecha ASC ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/ab_monitor_adm.php:123

## Q0043

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `tags`
- Columnas detectadas: `nombre_es`, `book_id`, `tag_id`, `id`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:132-137`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = " SELECT GROUP_CONCAT(t.nombre_es SEPARATOR '\n') AS tags FROM tags t INNER JOIN books_tags bt ON bt.tag_id = t.id WHERE bt.book_id = $book_id ";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:139

## Q0044

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:164`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '$book_uri' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:165

## Q0045

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `book_id`, `tag_id`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:173`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = "SELECT tag_id FROM books_tags WHERE book_id = $book_id";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:174

## Q0046

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `tags`
- Columnas detectadas: `nombre_es`, `ranking`, `uri`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:195-196`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_insert = "INSERT IGNORE INTO tags (uri, nombre_es, ranking) VALUES ('".mpdb_escape($uri)."', '".mpdb_escape($tag)."', 0)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:199

## Q0047

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`
- Columnas detectadas: `uri`, `id`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:202`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_id = "SELECT id FROM tags WHERE uri = '".mpdb_escape($uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:203

## Q0048

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `book_id`, `tag_id`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:219`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_bt = "INSERT IGNORE INTO books_tags (book_id, tag_id) VALUES ($book_id, $tag_id)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:220

## Q0049

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `book_id`, `tag_id`
- Archivo:l?nea: `adm/adminlte/adm_books_tags.php:232`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_del = "DELETE FROM books_tags WHERE book_id = $book_id AND tag_id IN ($ids_str)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/adminlte/adm_books_tags.php:233

## Q0050

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:81`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$sql_update = "UPDATE libros_pedidos SET publicado = 1 WHERE libro = '$libro'";
```

- Notas: QUERY DIN?MICA; usa helper query en adm/adminlte/adm_libros_pedidos.php:82

## Q0051

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `libro`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:120`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$sql_update = "DELETE from libros_pedidos WHERE libro = '$libro'";
```

- Notas: QUERY DIN?MICA; usa helper query en adm/adminlte/adm_libros_pedidos.php:121

## Q0052

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:128`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$sql_update = "UPDATE libros_pedidos SET publicado = 2 WHERE libro = '$libro'";
```

- Notas: QUERY DIN?MICA; usa helper query en adm/adminlte/adm_libros_pedidos.php:130

## Q0053

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:138-139`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$sql_update = "UPDATE libros_pedidos SET publicado = 3 WHERE libro = '$libro'";
```

- Notas: QUERY DIN?MICA; usa helper query en adm/adminlte/adm_libros_pedidos.php:140

## Q0054

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:148-149`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$sql_update = "UPDATE libros_pedidos SET publicado = 4 WHERE libro = '$libro'";
```

- Notas: QUERY DIN?MICA; usa helper query en adm/adminlte/adm_libros_pedidos.php:150

## Q0055

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `libros_pedidos`
- Columnas detectadas: `views_last`, `publicado`, `pedido`, `dompub`, `views`, `libro`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:188-195`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT lp.*, eb.dompub, eb.views_last as views_last, eb.views as views FROM libros_pedidos lp INNER JOIN ebooks_books eb ON eb.uri = lp.libro WHERE lp.publicado = ".$publicado_status." ORDER BY ".$_vista." DESC, lp.pedido DESC LIMIT 50 ";
```

- Notas: QUERY DIN?MICA

## Q0056

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `libros_pedidos`
- Columnas detectadas: `views_last`, `publicado`, `dompub`, `views`, `libro`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:198-205`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT lp.*, eb.dompub, eb.views_last as views_last, eb.views as views FROM libros_pedidos lp INNER JOIN ebooks_books eb ON eb.uri = lp.libro WHERE lp.publicado = ".$publicado_status." ORDER BY ".$_vista." DESC LIMIT 50 ";
```

- Notas: QUERY DIN?MICA

## Q0057

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:211-217`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT eb.* FROM ebooks_books eb WHERE eb.read_online = 0 ORDER BY ".$_vista." DESC LIMIT 50 ";
```

- Notas: QUERY DIN?MICA

## Q0058

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `libros_pedidos`
- Columnas detectadas: `read_online`, `libro`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:219-225`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT eb.* FROM ebooks_books eb LEFT JOIN libros_pedidos lp ON eb.uri = lp.libro WHERE eb.read_online = 0 AND lp.libro IS NULL ORDER BY ".$_vista." DESC LIMIT 50;
```

- Notas: QUERY DIN?MICA

## Q0059

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_id`, `read_online`, `user_id`, `pedido`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:234-251`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT COUNT(ub.user_id) AS pedido, b.* FROM ebooks_books AS b LEFT JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id WHERE b.read_online = 0 GROUP BY b.ebooks_books_id ORDER BY pedido DESC LIMIT 20 ";
```

- Notas: QUERY DIN?MICA

## Q0060

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`
- Archivo:l?nea: `adm/adminlte/adm_libros_pedidos.php:265`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$sql_count = "SELECT COUNT(*) as total FROM libros_pedidos WHERE publicado = 0";
```

- Notas: QUERY DIN?MICA; usa helper query en adm/adminlte/adm_libros_pedidos.php:266

## Q0061

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_books_title`, `videos`, `views`, `video`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/adminlte/adm_sin_video.php:82`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT uri, ebooks_books_title, views FROM `ebooks_books` WHERE videos = 'sin-video' order by ".$order." desc limit 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/adm_sin_video.php:83

## Q0062

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `id`
- Archivo:l?nea: `adm/adminlte/busquedas_fallidas_adm.php:24`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("DELETE FROM failed_searches WHERE id = $delete_id", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0063

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `normalized_text`, `cantidad`, `id`
- Archivo:l?nea: `adm/adminlte/busquedas_fallidas_adm.php:38`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$searches = mpdb_get_value("SELECT id, normalized_text, cantidad FROM failed_searches ORDER BY cantidad DESC", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0064

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `cantidad`
- Archivo:l?nea: `adm/adminlte/busquedas_fallidas_adm.php:80`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_searches = mpdb_get_value("SELECT SUM(cantidad) AS total FROM failed_searches", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0065

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `normalized_text`, `cantidad`, `id`
- Archivo:l?nea: `adm/adminlte/busquedas_fallidas_adm.php:101`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$searches = mpdb_get_value("SELECT id, normalized_text, cantidad FROM failed_searches ORDER BY cantidad DESC", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0066

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `has_video_review`, `recomendado`, `uri`
- Archivo:l?nea: `adm/adminlte/canal_youtube_video_add VIEJOOK.php:206`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set has_video_review = 1, recomendado = 1 where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/adminlte/canal_youtube_video_add VIEJOOK.php:208

## Q0067

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `has_video_review`, `recomendado`, `uri`
- Archivo:l?nea: `adm/adminlte/canal_youtube_video_add.php:165`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set has_video_review = 1, recomendado = 1 where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/adminlte/canal_youtube_video_add.php:167

## Q0068

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `ebooks_books_id`, `username`, `user_id`, `userid`, `email`, `uri`
- Archivo:l?nea: `adm/adminlte/canal_youtube_video_add.php:210-230`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT DISTINCT u.user_id as user_id, ut.username as username, ut.email, ea.ebooks_authors_name as autor_name, b.ebooks_books_title, b.uri FROM user_books u INNER JOIN user_table ut ON u.user_id = ut.userid INNER JOIN ebooks_books b ON u.ebooks_books_id = b.ebooks_books_id INNER JOIN ebooks_authors ea ON b.ebooks_books_author = ea.ebooks_authors_id WHERE b.ebooks_books_id IN ( SELECT ebooks_books_id FROM ebooks_books WHERE ebooks_books_author = ( SELECT ebooks_books_author FROM ebooks_books WHERE uri = '$book_uri_escaped' ) )";
```

- Notas: QUERY DIN?MICA

## Q0069

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_ebookdate`
- Archivo:l?nea: `adm/adminlte/lanzamientos_adm.php:44-49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT SUM(CASE WHEN DATE(ebooks_books_ebookdate) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) AS inminentes, SUM(CASE WHEN DATE(ebooks_books_ebookdate) > CURDATE() THEN 1 ELSE 0 END) AS futuros, SUM(CASE WHEN DATE(ebooks_books_ebookdate) < CURDATE() THEN 1 ELSE 0 END) AS pasados FROM ebooks_books WHERE ebooks_books_ebookdate IS NOT NULL";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/lanzamientos_adm.php:50

## Q0070

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_ebookdate`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `title`, `uri`
- Archivo:l?nea: `adm/adminlte/lanzamientos_adm.php:80-84`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.ebooks_books_title as title, b.uri, b.ebooks_books_ebookdate, a.ebooks_authors_name as autor FROM ebooks_books b LEFT JOIN ebooks_authors a ON b.ebooks_books_author = a.ebooks_authors_id WHERE b.ebooks_books_ebookdate IS NOT NULL AND $condicion ORDER BY b.ebooks_books_ebookdate $orden $limite";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/lanzamientos_adm.php:88

## Q0071

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/adminlte/mailing_adm.php:72`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_mails = mpdb_get_value("SELECT COUNT(*) AS total FROM mailing_users", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0072

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `status`
- Archivo:l?nea: `adm/adminlte/mailing_adm.php:73`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sent_mails = mpdb_get_value("SELECT COUNT(*) AS total FROM mailing_users WHERE status = 'sent'", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0073

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`
- Columnas detectadas: `completed`, `is_global`, `name`, `id`
- Archivo:l?nea: `adm/adminlte/mailing_adm.php:157`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_campaigns = "SELECT id, name, is_global, completed FROM mailing";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/mailing_adm.php:158

## Q0074

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`
- Archivo:l?nea: `adm/adminlte/mailing_adm.php:196`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_users = mpdb_get_value("SELECT COUNT(*) AS total FROM mailing_users WHERE mailing_id = $mailing_id", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0075

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`, `status`
- Archivo:l?nea: `adm/adminlte/mailing_adm.php:197`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sent_users = mpdb_get_value("SELECT COUNT(*) AS total FROM mailing_users WHERE mailing_id = $mailing_id AND status = 'sent'", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0076

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:54`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_pages_registered = mpdb_get_value("SELECT COUNT(*) AS total FROM user_books_log WHERE user_id IS NOT NULL", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0077

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:69`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_pages = mpdb_get_value("SELECT COUNT(*) AS total FROM user_books_log", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0078

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books_log`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `page_number`, `read_at`, `user_id`, `book_id`, `uri`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:92-97`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query = "SELECT b.ebooks_books_title, b.uri, COALESCE(COUNT(l.page_number), 0) AS total_paginas FROM ebooks_books b LEFT JOIN user_books_log l ON l.book_id = b.ebooks_books_id AND DATE(l.read_at) = CURDATE() WHERE (" . ($only_registered ? "l.user_id IS NOT NULL" : "1=1") . ") GROUP BY b.ebooks_books_id, b.ebooks_books_title, b.uri ORDER BY total_paginas DESC LIMIT 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:100

## Q0079

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:142-146`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_user_registered = "SELECT DATE(date_joined) AS fecha, COUNT(*) AS total FROM user_table WHERE date_joined >= '2025-02-17' GROUP BY DATE(date_joined) ORDER BY DATE(date_joined)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:147

## Q0080

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `user_id`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:158`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_registered = "SELECT DATE(read_at) as fecha, COUNT(*) as total FROM user_books_log WHERE user_id IS NOT NULL GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:159

## Q0081

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:170`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_daily = "SELECT DATE(read_at) as fecha, COUNT(*) as total FROM user_books_log GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:171

## Q0082

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `user_id`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:182`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_weekly = "SELECT YEARWEEK(read_at) as semana, COUNT(*) as total FROM user_books_log WHERE user_id IS NOT NULL GROUP BY semana ORDER BY semana ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:184

## Q0083

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `user_id`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:194`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_monthly = "SELECT DATE_FORMAT(read_at, '%Y-%m') as fecha, COUNT(*) as total FROM user_books_log WHERE user_id IS NOT NULL GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:196

## Q0084

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm - v1.php:385-389`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_user_registered = "SELECT DATE(date_joined) AS fecha, COUNT(*) AS total FROM user_table WHERE date_joined >= '2025-02-17' GROUP BY DATE(date_joined) ORDER BY DATE(date_joined)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm - v1.php:390

## Q0085

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:30`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$min_fecha_row = mpdb_get_value("SELECT MIN(DATE(read_at)) AS min_fecha FROM user_books_log", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0086

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:121`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_pages_registered = mpdb_get_value("SELECT COUNT(*) AS total FROM user_books_log WHERE user_id IS NOT NULL AND $where_rango_read", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0087

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:136`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_pages = mpdb_get_value("SELECT COUNT(*) AS total FROM user_books_log WHERE $where_rango_read", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0088

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books_log`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `page_number`, `user_id`, `book_id`, `uri`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:159-164`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query = "SELECT b.ebooks_books_title, b.uri, COALESCE(COUNT(l.page_number), 0) AS total_paginas FROM ebooks_books b LEFT JOIN user_books_log l ON l.book_id = b.ebooks_books_id AND $where_rango_read WHERE (" . ($only_registered ? "l.user_id IS NOT NULL" : "1=1") . ") GROUP BY b.ebooks_books_id, b.ebooks_books_title, b.uri ORDER BY total_paginas DESC LIMIT 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:167

## Q0089

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:209-213`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_user_registered = "SELECT DATE(date_joined) AS fecha, COUNT(*) AS total FROM user_table WHERE $where_rango_joined GROUP BY DATE(date_joined) ORDER BY DATE(date_joined)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:214

## Q0090

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `user_id`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:225`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_registered = "SELECT DATE(read_at) as fecha, COUNT(*) as total FROM user_books_log WHERE user_id IS NOT NULL AND $where_rango_read GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:226

## Q0091

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:237`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_daily = "SELECT DATE(read_at) as fecha, COUNT(*) as total FROM user_books_log WHERE $where_rango_read GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:238

## Q0092

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `user_id`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:249`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_weekly = "SELECT YEARWEEK(read_at) as semana, COUNT(*) as total FROM user_books_log WHERE user_id IS NOT NULL AND $where_rango_read GROUP BY semana ORDER BY semana ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:251

## Q0093

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `user_id`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:261`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_monthly = "SELECT DATE_FORMAT(read_at, '%Y-%m') as fecha, COUNT(*) as total FROM user_books_log WHERE user_id IS NOT NULL AND $where_rango_read GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:263

## Q0094

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm.php:452-456`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_user_registered = "SELECT DATE(date_joined) AS fecha, COUNT(*) AS total FROM user_table WHERE $where_rango_joined GROUP BY DATE(date_joined) ORDER BY DATE(date_joined)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm.php:457

## Q0095

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/adminlte/pages_read_adm2025-03-10.php:54`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$total_pages = mpdb_get_value("SELECT COUNT(*) AS total FROM user_books_log", $dbconn)[0]['total'];
```

- Notas: QUERY DIN?MICA

## Q0096

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books_log`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `page_number`, `read_at`, `user_id`, `book_id`, `uri`
- Archivo:l?nea: `adm/adminlte/pages_read_adm2025-03-10.php:77-82`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT b.ebooks_books_title, b.uri, COALESCE(COUNT(l.page_number), 0) AS total_paginas FROM ebooks_books b LEFT JOIN user_books_log l ON l.book_id = b.ebooks_books_id AND DATE(l.read_at) = CURDATE() WHERE (" . ($only_registered ? "l.user_id IS NOT NULL" : "1=1") . ") GROUP BY b.ebooks_books_id, b.ebooks_books_title, b.uri ORDER BY total_paginas DESC LIMIT 50";
```

- Notas: QUERY DIN?MICA

## Q0097

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books_log`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `page_number`, `read_at`, `book_id`, `uri`
- Archivo:l?nea: `adm/adminlte/pages_read_adm2025-03-10.php:85-89`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query = "SELECT b.ebooks_books_title, b.uri, COALESCE(COUNT(l.page_number), 0) AS total_paginas FROM ebooks_books b LEFT JOIN user_books_log l ON l.book_id = b.ebooks_books_id AND DATE(l.read_at) = CURDATE() GROUP BY b.ebooks_books_id, b.ebooks_books_title, b.uri ORDER BY total_paginas DESC LIMIT 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm2025-03-10.php:94

## Q0098

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm2025-03-10.php:136`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_daily = "SELECT DATE(read_at) as fecha, COUNT(*) as total FROM user_books_log GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm2025-03-10.php:137

## Q0099

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`
- Archivo:l?nea: `adm/adminlte/pages_read_adm2025-03-10.php:147`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_weekly = "SELECT YEARWEEK(read_at) as semana, COUNT(*) as total FROM user_books_log GROUP BY semana ORDER BY semana ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm2025-03-10.php:148

## Q0100

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `read_at`, `fecha`
- Archivo:l?nea: `adm/adminlte/pages_read_adm2025-03-10.php:158`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query_monthly = "SELECT DATE_FORMAT(read_at, '%Y-%m') as fecha, COUNT(*) as total FROM user_books_log GROUP BY fecha ORDER BY fecha ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/pages_read_adm2025-03-10.php:159

## Q0101

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books.php:104-110`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.*, ub.*, user_table.username as nomuser FROM ebooks_books AS b, user_books AS ub, user_table WHERE user_table.userid = ub.user_id AND b.ebooks_books_id = ub.ebooks_books_id AND ub.user_id = " . intval($user_id) . " AND user_table.username <> 'nippurx' ORDER BY ub.last_read DESC";
```

- Notas: QUERY DIN?MICA

## Q0102

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`, `uri`
- Archivo:l?nea: `adm/adminlte/user_books.php:112-118`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.*, ub.*, user_table.username as nomuser FROM ebooks_books AS b, user_books AS ub, user_table WHERE user_table.userid = ub.user_id AND b.ebooks_books_id = ub.ebooks_books_id AND b.uri = '" . mysqli_real_escape_string($dbconn, $book_uri) . "' AND user_table.username <> 'nippurx' ORDER BY ub.last_read DESC";
```

- Notas: QUERY DIN?MICA

## Q0103

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books.php:120-126`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.*, ub.*, user_table.username as nomuser FROM ebooks_books AS b, user_books AS ub, user_table WHERE user_table.userid = ub.user_id AND b.ebooks_books_id = ub.ebooks_books_id AND user_table.username <> 'nippurx' ORDER BY ub.last_read DESC LIMIT 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books.php:129

## Q0104

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `read_online`, `user_id`, `demo`, `uri`
- Archivo:l?nea: `adm/adminlte/user_books.php:218-223`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.ebooks_books_id, b.ebooks_books_title, b.uri, COUNT(ub.user_id) AS total_readers FROM ebooks_books AS b LEFT JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id WHERE b.read_online = 1 AND b.demo = 1 GROUP BY b.ebooks_books_id ORDER BY total_readers DESC";
```

- Notas: QUERY DIN?MICA

## Q0105

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `current_page`, `read_online`, `user_id`, `demo`, `uri`
- Archivo:l?nea: `adm/adminlte/user_books.php:227-232`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.ebooks_books_id, b.ebooks_books_title, b.uri, COUNT(ub.user_id) AS total_readers FROM ebooks_books AS b LEFT JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id WHERE b.read_online = 1 AND b.demo = 1 AND ub.current_page > 1 GROUP BY b.ebooks_books_id ORDER BY total_readers DESC";
```

- Notas: QUERY DIN?MICA

## Q0106

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `current_page`, `read_online`, `user_id`, `uri`
- Archivo:l?nea: `adm/adminlte/user_books.php:236-241`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.ebooks_books_id, b.ebooks_books_title, b.uri, COUNT(ub.user_id) AS total_readers FROM ebooks_books AS b LEFT JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id WHERE b.read_online = 1 AND ub.current_page > 1 GROUP BY b.ebooks_books_id ORDER BY total_readers DESC";
```

- Notas: QUERY DIN?MICA

## Q0107

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `read_online`, `user_id`, `uri`
- Archivo:l?nea: `adm/adminlte/user_books.php:245-250`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.ebooks_books_id, b.ebooks_books_title, b.uri, COUNT(ub.user_id) AS total_readers FROM ebooks_books AS b LEFT JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id WHERE b.read_online = 1 GROUP BY b.ebooks_books_id ORDER BY total_readers DESC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books.php:253

## Q0108

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `current_page`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books.php:300-309`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT user_table.username AS nomuser, SUM(ub.current_page) AS total_pages_read, AVG(ub.current_page) AS avg_pages_read, COUNT(ub.ebooks_books_id) AS total_books_read, ub.user_id FROM user_books AS ub INNER JOIN user_table ON user_table.userid = ub.user_id WHERE ub.current_page > 1 GROUP BY ub.user_id ORDER BY $order_by";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books.php:311

## Q0109

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `current_page`, `last_read`, `username`, `user_id`, `userid`, `id`
- Archivo:l?nea: `adm/adminlte/user_books.php:351-360`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT user_table.username AS nomuser, COUNT(ub.id) AS total_sessions, COUNT(DISTINCT ub.ebooks_books_id) AS total_books, ub.user_id, MAX(ub.last_read) AS last_access FROM user_books AS ub INNER JOIN user_table ON user_table.userid = ub.user_id WHERE ub.current_page > 1 GROUP BY ub.user_id ORDER BY $order_by";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books.php:362

## Q0110

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `current_page`, `user_id`
- Archivo:l?nea: `adm/adminlte/user_books.php:396-398`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_users = "SELECT COUNT(DISTINCT user_id) AS total_users FROM user_books WHERE current_page > 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books.php:399

## Q0111

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `current_page`
- Archivo:l?nea: `adm/adminlte/user_books.php:402-404`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_books = "SELECT COUNT(DISTINCT ebooks_books_id) AS total_books FROM user_books WHERE current_page > 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books.php:405

## Q0112

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `adm/adminlte/user_books0_ok.php:73`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books order by user_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books0_ok.php:87

## Q0113

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books0_ok.php:84`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select b.*, ub.*, user_table.username as nomuser from ebooks_books as b, user_books as ub, user_table where user_table.userid = ub.user_id and b.ebooks_books_id = ub.ebooks_books_id order by ub.last_read desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books0_ok.php:87

## Q0114

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:91`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.*, ub.*, user_table.username as nomuser FROM ebooks_books AS b, user_books AS ub, user_table WHERE user_table.userid = ub.user_id AND b.ebooks_books_id = ub.ebooks_books_id AND ub.user_id = " . intval($user_id) . " ORDER BY ub.last_read DESC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:96

## Q0115

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:93`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.*, ub.*, user_table.username as nomuser FROM ebooks_books AS b, user_books AS ub, user_table WHERE user_table.userid = ub.user_id AND b.ebooks_books_id = ub.ebooks_books_id ORDER BY ub.last_read DESC LIMIT 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:96

## Q0116

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `current_page`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:149-157`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT user_table.username AS nomuser, SUM(ub.current_page) AS total_pages_read, AVG(ub.current_page) AS avg_pages_read, COUNT(ub.ebooks_books_id) AS total_books_read, ub.user_id FROM user_books AS ub INNER JOIN user_table ON user_table.userid = ub.user_id GROUP BY ub.user_id ORDER BY $order_by";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:159

## Q0117

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `current_page`, `user_id`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:190-196`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.ebooks_books_id, b.ebooks_books_title, COUNT(ub.user_id) AS total_readers FROM ebooks_books AS b INNER JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id WHERE ub.current_page > 1 GROUP BY b.ebooks_books_id HAVING total_readers > 0 ORDER BY total_readers DESC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:198

## Q0118

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `current_page`, `user_id`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:229-231`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_users = "SELECT COUNT(DISTINCT user_id) AS total_users FROM user_books WHERE current_page > 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:232

## Q0119

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `current_page`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:235-237`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_books = "SELECT COUNT(DISTINCT ebooks_books_id) AS total_books FROM user_books WHERE current_page > 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:238

## Q0120

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `username`, `user_id`, `userid`, `id`
- Archivo:l?nea: `adm/adminlte/user_books_bak_temporal.php:263-271`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT user_table.username AS nomuser, COUNT(ub.id) AS total_sessions, COUNT(DISTINCT ub.ebooks_books_id) AS total_books, ub.user_id, MAX(ub.last_read) AS last_access FROM user_books AS ub INNER JOIN user_table ON user_table.userid = ub.user_id GROUP BY ub.user_id ORDER BY $order_by";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/adminlte/user_books_bak_temporal.php:273

## Q0121

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/autor_uris.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_authors where uri = ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/autor_uris.php:27

## Q0122

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `uri`
- Archivo:l?nea: `adm/autor_uris.php:32`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where uri = '' order by ebooks_authors_id limit 400";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/autor_uris.php:33

## Q0123

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `uri`
- Archivo:l?nea: `adm/autor_uris.php:50`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_authors set uri = '".mysql_real_escape_string($uri)."' where ebooks_authors_id = ".$aautores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/autor_uris.php:51

## Q0124

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`, `uri`
- Archivo:l?nea: `adm/bkend_books_epub2html_lst.php:56`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set video_audiolibro = 'sin-audiolibro' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/bkend_books_epub2html_lst.php:58

## Q0125

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`, `uri`
- Archivo:l?nea: `adm/bkend_books_epub2html_lst.php:77`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set video_audiolibro = '".mpdb_real_escape_string($p_videoid)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/bkend_books_epub2html_lst.php:78

## Q0126

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/bkend_books_epub2html_lst.php:102-105`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA

## Q0127

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_authors_id`, `video_audiolibro`, `views`
- Archivo:l?nea: `adm/bkend_books_epub2html_lst.php:114-120`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select a.ebooks_authors_name, l.* from ebooks_books as l, ebooks_authors as a where a.ebooks_authors_id = l.ebooks_books_author and (video_audiolibro is null or video_audiolibro = '') order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0128

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_authors_id`, `video_audiolibro`, `views_last`
- Archivo:l?nea: `adm/bkend_books_epub2html_lst.php:125-131`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select a.ebooks_authors_name, l.* from ebooks_books as l, ebooks_authors as a where a.ebooks_authors_id = l.ebooks_books_author and (video_audiolibro is null or video_audiolibro = '') order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/bkend_books_epub2html_lst.php:139

## Q0129

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/blogpub.php:54`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mysql_real_escape_string($p_ebook_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/blogpub.php:56

## Q0130

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`
- Archivo:l?nea: `adm/blogpub.php:59`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_id = ".$books[0]['ebooks_books_author'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/blogpub.php:61

## Q0131

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`
- Archivo:l?nea: `adm/categorias_actualizar.php:41-43`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_faltantes = "select count(*) as cant from ebooks_books where procesado = 0";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/categorias_actualizar.php:44

## Q0132

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`, `views`
- Archivo:l?nea: `adm/categorias_actualizar.php:48-51`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where procesado = 0 order by views desc limit 10";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/categorias_actualizar.php:52

## Q0133

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`, `uri`
- Archivo:l?nea: `adm/categorias_actualizar.php:89`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set procesado = 1 where uri='".$books[$i]['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/categorias_actualizar.php:90

## Q0134

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_nicename`
- Archivo:l?nea: `adm/categorias_actualizar.php:113-114`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into ebooks_categories (ebooks_categories_category, ebooks_categories_nicename) values ('".$label."', '".$nicename."')";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/categorias_actualizar.php:117

## Q0135

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/crearuris.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_books where uri = ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/crearuris.php:27

## Q0136

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `adm/crearuris.php:32`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '' order by ebooks_books_id limit 600";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/crearuris.php:33

## Q0137

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `adm/crearuris.php:51`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set uri = '".mysql_real_escape_string($uri)."' where ebooks_books_id = ".$alibros[$i]['ebooks_books_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/crearuris.php:52

## Q0138

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/Categories.php:462`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0139

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/Categories.php:464`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0140

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/CategoriesDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0141

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/CategoriesDelete.php:762`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0142

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/CategoriesList.php:1277`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0143

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/CategoriesList.php:1367`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0144

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/CategoriesView.php:667`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0145

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthors.php:619`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0146

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthors.php:621`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0147

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthorsDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0148

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthorsDelete.php:837`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0149

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthorsList.php:1343`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0150

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthorsList.php:1433`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0151

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksAuthorsView.php:678`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0152

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooks.php:1745`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0153

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooks.php:1747`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0154

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooksDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0155

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooksDelete.php:1212`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0156

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooksList.php:1850`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0157

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooksList.php:1940`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0158

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksBooksView.php:727`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0159

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategories.php:428`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0160

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategories.php:430`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0161

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategoriesDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0162

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategoriesDelete.php:749`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0163

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategoriesList.php:1265`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0164

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategoriesList.php:1355`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0165

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksCategoriesView.php:666`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0166

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextos.php:357`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0167

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextos.php:359`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0168

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextosDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0169

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextosDelete.php:712`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0170

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextosList.php:1227`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0171

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextosList.php:1317`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0172

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksMvaTextosView.php:663`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0173

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooks.php:594`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0174

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooks.php:596`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0175

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooksDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0176

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooksDelete.php:848`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0177

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooksList.php:1341`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0178

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooksList.php:1431`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0179

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/EbooksUsersEbooksView.php:675`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0180

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/Users.php:382`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0181

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/Users.php:384`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0182

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UsersDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0183

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UsersDelete.php:751`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0184

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UsersList.php:1147`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0185

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UsersList.php:1232`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0186

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UsersView.php:714`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0187

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2.php:1503`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0188

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2.php:1505`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0189

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2Delete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0190

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2Delete.php:1229`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0191

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2List.php:1804`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0192

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2List.php:1894`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0193

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserTable2View.php:709`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0194

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibros.php:543`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0195

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibros.php:545`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0196

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibrosDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0197

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibrosDelete.php:829`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0198

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibrosList.php:1027`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0199

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibrosList.php:1117`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0200

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/UserVideoAudiolibrosView.php:672`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0201

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibros.php:566`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0202

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibros.php:568`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0203

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibrosDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0204

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibrosDelete.php:866`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0205

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibrosList.php:1317`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0206

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibrosList.php:1407`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0207

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideoAudiolibrosView.php:675`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0208

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/Videos.php:474`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0209

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/Videos.php:476`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0210

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBook.php:506`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0211

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBook.php:508`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0212

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBookDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0213

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBookDelete.php:820`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0214

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBookList.php:1291`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0215

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBookList.php:1381`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0216

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosBookView.php:672`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0217

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0218

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosDelete.php:765`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0219

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosList.php:1291`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0220

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosList.php:1381`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0221

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridos.php:436`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM " . preg_replace($pattern, "", $sqlwrk);
```

- Notas: QUERY DIN?MICA

## Q0222

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridos.php:438`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlwrk = "SELECT COUNT(*) FROM (" . $sqlwrk . ") COUNT_TABLE";
```

- Notas: QUERY DIN?MICA

## Q0223

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridosDelete.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public $PageID = "delete";
```

- Notas: QUERY DIN?MICA

## Q0224

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridosDelete.php:771`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pageId = "delete";
```

- Notas: QUERY DIN?MICA

## Q0225

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridosList.php:1269`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$this->ListOptions->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0226

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridosList.php:1359`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$opt = $this->ListOptions["delete"];
```

- Notas: QUERY DIN?MICA

## Q0227

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosSugeridosView.php:669`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0228

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/models/VideosView.php:668`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$item = &$option->add("delete");
```

- Notas: QUERY DIN?MICA

## Q0229

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `type`
- Archivo:l?nea: `adm/cruds/src/DbField.php:1226-1229`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$ar = array_merge($this->Lookup->toClientList($currentPage), [ "lookupOptions" => $options, "multiple" => $this->HtmlTag == "SELECT" && $this->SelectMultiple || $this->HtmlTag == "CHECKBOX" && !$this->isBoolean() // Do not use isMultiSelect() since data type could be int ]);
```

- Notas: QUERY DIN?MICA

## Q0230

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/cruds/src/EmailTwoFactorAuthentication.php:71`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT " . QuotedName(Config("USER_EMAIL_FIELD_NAME"), Config("USER_TABLE_DBID")) . " FROM " . Config("USER_TABLE") . " WHERE " . $filter;
```

- Notas: QUERY DIN?MICA

## Q0231

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `error`, `name`, `type`
- Archivo:l?nea: `adm/cruds/src/FileUploadHandler.php:75-79`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
protected function handle_file_upload($uploaded_file, $name, $size, $type, $error, $index = null, $content_range = null) { // Delete all files in directory if replace if (Param("replace") == "1") { $upload_dir = $this->get_upload_path();
```

- Notas: QUERY DIN?MICA

## Q0232

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/src/FileUploadHandler.php:99-102`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public function post($print_response = true) { if ($this->get_query_param("_method") === "DELETE") { return $this->delete($print_response);
```

- Notas: QUERY DIN?MICA

## Q0233

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `msg`
- Archivo:l?nea: `adm/cruds/src/ListAction.php:33-41`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public function toJson($htmlEncode = false) { $ar = [ "msg" => $this->Message, "action" => $this->Action, "method" => $this->Method, "select" => $this->Select, "success" => $this->Success ];
```

- Notas: QUERY DIN?MICA

## Q0234

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/cruds/src/SmsTwoFactorAuthentication.php:71`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT " . QuotedName(Config("USER_PHONE_FIELD_NAME"), Config("USER_TABLE_DBID")) . " FROM " . Config("USER_TABLE") . " WHERE " . $filter;
```

- Notas: QUERY DIN?MICA

## Q0235

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `enabled`, `browser`, `setting`, `server`, `script`, `code`
- Archivo:l?nea: `adm/cruds/src/UploadHandler.php:45-124`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public function __construct($options = null, $initialize = true, $error_messages = null) { $this->options = array( 'script_url' => $this->get_full_url().'/'.$this->basename($this->get_server_var('SCRIPT_NAME')), 'upload_dir' => dirname($this->get_server_var('SCRIPT_FILENAME')).'/files/', 'upload_url' => $this->get_full_url().'/files/', 'input_stream' => 'php://input', 'user_dirs' => false, 'mkdir_mode' => 0755, 'param_name' => 'files', // Set the following option to 'POST', if your server does not support // DELETE requests. This is a parameter sent to the client: 'delete_type' => 'DELETE', 'access_control_allow_origin' => '*', 'access_control_allow_credentials' => false, 'access_control_allow_methods' => array( 'OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ), 'access_control_allow_headers' => array( 'Content-Type', 'Content-Range', 'Content-Disposition' ), // By default, allow redirects to the referer protocol+host: 'redirect_allow_target' => '/^'.preg_quote( parse_url($this->get_server_var('HTTP_REFERER') ?? "", PHP_URL_SCHEME) .'://' .parse_url($this->get_server_var('HTTP_REFERER') ?? "", PHP_URL_HOST) .'/', // Trailing slash to not match subdomains by mistake '/' // preg_quote delimiter param ).'/', // Enable to provide file downloads via GET requests to the PHP script: // 1. Set to 1 to download files via readfile method through PHP // 2. Set to 2 to send a X-Sendfile header for lighttpd/Apache // 3. Set to 3 to send a X-Accel-Redirect header for nginx // If set to 2 or 3, adjust the upload_url option to the base path of // the redirect parameter, e.g. '/files/'. 'download_via_php' => false, // Read files in chunks to avoid memory limits when download_via_php // is enabled, set to 0 to disable chunked reading of files: 'readfile_chunk_size' => 10 * 1024 * 1024, // 10 MiB // Defines which files can be displayed inline when downloaded: 'inline_file_types' => '/\.(gif|jpe?g|png)$/i', // Defines which files (based on their names) are accepted for upload. // By default, only allows file uploads with image file extensions. // Only change this setting after making sure that any allowed file // types cannot be executed by the webserver in the files directory, // e.g. PHP scripts, nor executed by the browser when downloaded, // e.g. HTML files with embedded JavaScript code. // Please also read the SECURITY.md document in this repository. 'accept_file_types' => '/\.(gif|jpe?g|png)$/i', // Replaces dots in filenames with the given string. // Can be disabled by setting it to false or an empty string. // Note that this is a security feature for servers that support // multiple file extensions, e.g. the Apache AddHandler Directive: // https://httpd.apache.org/docs/current/mod/mod_mime.html#addhandler // Before disabling it, make sure that files uploaded with multiple // extensions cannot be executed by the webserver, e.g. // "example.php.png" with embedded PHP code, nor executed by the // browser when downloaded, e.g. "example.html.gif" with embedded // JavaScript code. 'replace_dots_in_filenames' => '-', // The php.ini settings upload_max_filesize and post_max_size // take precedence over the following max_file_size setting: 'max_file_size' => null, 'min_file_size' => 1, // The maximum number of files for the upload directory: 'max_number_of_files' => null, // Reads first file bytes to identify and correct file extensions: 'correct_image_extensions' => false, // Image resolution restrictions: 'max_width' => null, 'max_height' => null, 'min_width' => 1, 'min_height' => 1,
```

- Notas: QUERY DIN?MICA

## Q0236

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/cruds/src/UploadHandler.php:1391-1393`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public function post($print_response = true) { if ($this->get_query_param('_method') === 'DELETE') { return $this->delete($print_response);
```

- Notas: QUERY DIN?MICA

## Q0237

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_format_pdf`, `uri`
- Archivo:l?nea: `adm/descargar_pdf_remotos.php:62-68`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri, ebooks_books_file_alternative from ebooks_books where ebooks_books_file_alternative is not null and (ebooks_format_pdf = 0 or ebooks_format_pdf = '' or ebooks_format_pdf is null) limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/descargar_pdf_remotos.php:73

## Q0238

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `title`
- Archivo:l?nea: `adm/dmca_admin.php:181`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_title = '".utf8_decode($libros[$j]['title'])."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dmca_admin.php:182

## Q0239

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_rank`, `procesado`
- Archivo:l?nea: `adm/dmca_admin.php:254`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where procesado = 0 order by ebooks_authors_rank desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dmca_admin.php:255

## Q0240

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `procesado`, `uri`
- Archivo:l?nea: `adm/dmca_admin.php:313`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_authors set procesado = 1 where uri = '".$aautor['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dmca_admin.php:314

## Q0241

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `adm/dmca_admin.php:357`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO ebooks_books (uri, ebooks_books_title, ebooks_books_author) VALUES ('".$abook['uri']."', '".$abook['libro_titulo']."',". $aautor['ebooks_authors_id'].")" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dmca_admin.php:358

## Q0242

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `uri`
- Archivo:l?nea: `adm/dmca_admin.php:400`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set descargar = ".$permiso." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dmca_admin.php:403

## Q0243

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_fallecimiento`, `ebooks_authors_id`, `dompub`
- Archivo:l?nea: `adm/dompub old.php:53-54`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_authors set dompub = 0, ebooks_authors_fallecimiento = ".$p_fallecimiento." where ebooks_authors_id = ".$p_ebooks_authors_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dompub old.php:56

## Q0244

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`
- Archivo:l?nea: `adm/dompub old.php:62`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "delete from ebooks_books where ebooks_books_author =".$p_ebooks_authors_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dompub old.php:64

## Q0245

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `dompub`
- Archivo:l?nea: `adm/dompub old.php:76-77`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_authors set dompub = 1 where ebooks_authors_id = ".$p_ebooks_authors_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dompub old.php:79

## Q0246

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `cantidad`
- Archivo:l?nea: `adm/dompub old.php:87`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_subidos = mpdb_get_value("select count(*) as cantidad from ebooks_books where `ebooks_books_file_alternative` is not null", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0247

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `cantidad`
- Archivo:l?nea: `adm/dompub old.php:88`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_no_subidos = mpdb_get_value("select count(*) as cantidad from ebooks_books where `ebooks_books_file_alternative` is null", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0248

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_rank`, `dompub`
- Archivo:l?nea: `adm/dompub old.php:138`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where dompub is null order by ebooks_authors_rank desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dompub old.php:139

## Q0249

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`
- Archivo:l?nea: `adm/dompub old.php:164`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql2 = "select ebooks_books_title from ebooks_books where ebooks_books_author = ".$aautor['ebooks_authors_id']." order by ebooks_books_download_rank desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dompub old.php:165

## Q0250

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_fallecimiento`, `ebooks_authors_id`, `dompub`
- Archivo:l?nea: `adm/dompub.php:87-88`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_authors set dompub = ".$dompub.", ebooks_authors_fallecimiento = ".$p_fallecimiento." where ebooks_authors_id = ".$p_ebooks_authors_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dompub.php:93

## Q0251

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_fallecimiento`, `ebooks_authors_rank`
- Archivo:l?nea: `adm/dompub.php:102`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_fallecimiento = 0 or ebooks_authors_fallecimiento is null order by ebooks_authors_rank desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dompub.php:103

## Q0252

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`
- Archivo:l?nea: `adm/dompub.php:128`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql2 = "select ebooks_books_title from ebooks_books where ebooks_books_author = ".$aautor['ebooks_authors_id']." order by ebooks_books_download_rank desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dompub.php:129

## Q0253

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`
- Archivo:l?nea: `adm/dompub_status.php:47`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_subidos = mpdb_get_value("select count(*) from ebooks_books where ebooks_books_file_alternative is null or ebooks_books_file_alternative = '' and dompub = 1", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0254

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`
- Archivo:l?nea: `adm/dompub_status.php:48`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_no_subidos = mpdb_get_value("select count(*) from ebooks_books where `ebooks_books_file_alternative` is not null or ebooks_books_file_alternative <> '' and dompub = 1", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0255

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views`
- Archivo:l?nea: `adm/dompub_status.php:108`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books order by `views` desc limit 20";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/dompub_status.php:109

## Q0256

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `dompub_status`, `status`, `uri`
- Archivo:l?nea: `adm/dompub_status.php:211`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set dompub_status = ".$status." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/dompub_status.php:214

## Q0257

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_inf`, `uri`
- Archivo:l?nea: `adm/editor_epub.php:565`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_txt_inf = '".$sinopsis."' where uri = '".$archivo_nombre."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/editor_epub.php:566

## Q0258

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/epub2html.php:243`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books.uri = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/epub2html.php:245

## Q0259

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `read_online`, `uri`
- Archivo:l?nea: `adm/epub2html.php:833`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set read_online = 1, ebooks_books_updated = NOW() where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/epub2html.php:835

## Q0260

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `adm/epub2html.php:844`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_authors.uri from ebooks_authors,ebooks_books where ebooks_books.uri = '".$p_libro."' and ebooks_books.ebooks_books_author = ebooks_authors.ebooks_authors_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/epub2html.php:846

## Q0261

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `demo`, `uri`
- Archivo:l?nea: `adm/epub2html.php:860`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set demo = 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/epub2html.php:862

## Q0262

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `username`, `user_id`, `userid`, `email`, `uri`
- Archivo:l?nea: `adm/epub2html.php:1184-1194`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT user_table.username, user_table.email, b.ebooks_books_title, b.uri FROM ebooks_books AS b JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id JOIN user_table ON user_table.userid = ub.user_id WHERE b.uri = '$book_uri_escaped' ";
```

- Notas: QUERY DIN?MICA

## Q0263

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `username`, `user_id`, `userid`, `email`, `uri`
- Archivo:l?nea: `adm/epub2html.php:1244-1254`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT user_table.username, user_table.email, b.ebooks_books_title, b.uri FROM ebooks_books AS b JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id JOIN user_table ON user_table.userid = ub.user_id WHERE b.uri = '$book_uri_escaped' ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/epub2html.php:1257

## Q0264

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `ebooks_books_id`, `username`, `user_id`, `userid`, `email`, `uri`
- Archivo:l?nea: `adm/epub2html.php:1339-1359`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT DISTINCT u.user_id as user_id, ut.username as username, ut.email, ea.ebooks_authors_name as autor_name, b.ebooks_books_title, b.uri FROM user_books u INNER JOIN user_table ut ON u.user_id = ut.userid INNER JOIN ebooks_books b ON u.ebooks_books_id = b.ebooks_books_id INNER JOIN ebooks_authors ea ON b.ebooks_books_author = ea.ebooks_authors_id WHERE b.ebooks_books_id IN ( SELECT ebooks_books_id FROM ebooks_books WHERE ebooks_books_author = ( SELECT ebooks_books_author FROM ebooks_books WHERE uri = '$book_uri_escaped' ) )";
```

- Notas: QUERY DIN?MICA

## Q0265

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `pubfbig`, `views`
- Archivo:l?nea: `adm/fbpub.php:26`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where pubfbig = 0 order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0266

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `pubfbig`
- Archivo:l?nea: `adm/fbpub.php:31`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where pubfbig = 0 order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/fbpub.php:43

## Q0267

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/fbpub.php:38`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/fbpub.php:43

## Q0268

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `pubfbig_readonline`, `views`
- Archivo:l?nea: `adm/fbpub.php:138`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where pubfbig_readonline = 0 order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0269

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `pubfbig_readonline`, `views_last`
- Archivo:l?nea: `adm/fbpub.php:143`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where pubfbig_readonline = 0 order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/fbpub.php:155

## Q0270

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/fbpub.php:150`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/fbpub.php:155

## Q0271

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`, `views`
- Archivo:l?nea: `adm/file_link.php:46`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_file_alternative = 'sin-doc' and dompub = 1 order by `views` desc limit 30";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/file_link.php:55

## Q0272

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`, `views`
- Archivo:l?nea: `adm/file_link.php:51`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where (ebooks_books_file_alternative is null or ebooks_books_file_alternative = '') and dompub = 1 order by `views` desc limit 30";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/file_link.php:55

## Q0273

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `uri`
- Archivo:l?nea: `adm/file_link_setbook_core.php:43-45`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set ebooks_books_file_alternative = 'sin-doc' where uri = '".mysql_real_escape_string($p_ebook_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/file_link_setbook_core.php:47

## Q0274

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `uri`
- Archivo:l?nea: `adm/file_link_setbook_core.php:56-58`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set ebooks_books_file_alternative = '".$_REQUEST['file_link']."' where uri = '".mysql_real_escape_string($p_ebook_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/file_link_setbook_core.php:60; posible SQLi

## Q0275

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/file_link_setbook_core.php:63`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mysql_real_escape_string($p_ebook_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/file_link_setbook_core.php:64

## Q0276

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/file_link_setbook_core.php:91-94`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " select * from ebooks_books where ".$_where;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/file_link_setbook_core.php:98

## Q0277

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`
- Archivo:l?nea: `adm/file_link_stats.php:45-46`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$no_subidos = "select count(*) from ebooks_books where (ebooks_books_file_alternative is null or ebooks_books_file_alternative = '') and dompub = 1" $libros_no_subidos = mpdb_get_value($no_subidos, $dbconn);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/file_link_stats.php:46

## Q0278

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`
- Archivo:l?nea: `adm/file_link_stats.php:47`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_subidos = mpdb_get_value("select count(*) from ebooks_books where (ebooks_books_file_alternative is not null or ebooks_books_file_alternative <> '') and dompub = 1", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0279

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `dompub`, `views`
- Archivo:l?nea: `adm/gmail_leer.php:143-146`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where dompub = 1 order by views desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/gmail_leer.php:150

## Q0280

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `read_online`
- Archivo:l?nea: `adm/index_cover_upd.php:34`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 order by ebooks_books_updated desc limit 6";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/index_cover_upd.php:35

## Q0281

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `pedido`
- Archivo:l?nea: `adm/kindle_pedidos.php:28`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from libros_pedidos where publicado = 0 order by pedido desc limit 150";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/kindle_pedidos.php:30

## Q0282

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `libro`, `uri`
- Archivo:l?nea: `adm/kindle_pedidos.php:85`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$alibros[$i]['libro']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/kindle_pedidos.php:86

## Q0283

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`
- Archivo:l?nea: `adm/kindle_stats.php:45`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_subidos = mpdb_get_value("select count(*) from libros_pedidos where publicado = 1", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0284

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`
- Archivo:l?nea: `adm/kindle_stats.php:47`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_no_subidos = mpdb_get_value("select count(*) from libros_pedidos where publicado = 0", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0285

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libro_duplicar.php:42`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mysql_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_duplicar.php:47

## Q0286

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_download_rank`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_books_txt_abs`, `ebooks_books_author`, `ebooks_books_labels`, `ebooks_books_title`, `ebooks_books_lang`, `dompub_status`, `descargar`, `dompub`, `views`, `uri`
- Archivo:l?nea: `adm/libro_duplicar.php:116-145`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "INSERT INTO ebooks_books (uri, ebooks_books_title, ebooks_books_subtitle, ebooks_books_author, ebooks_books_txt_abs, ebooks_books_download_rank, views, ebooks_books_labels, ebooks_books_file_alternative, ebooks_books_lang, ebooks_books_txt_inf, dompub, descargar, dompub_status ) VALUES ('". $abook['uri']."','". $abook['ebooks_books_title']."','". $abook['ebooks_books_subtitle']."','". $abook['ebooks_books_author']."','". $abook['ebooks_books_txt_abs']."',". $abook['ebooks_books_download_rank'].",". $abook['views'].",'". $abook['ebooks_books_labels']."','". $abook['ebooks_books_file_alternative']."','". $abook['ebooks_books_lang']."','". $abook['ebooks_books_txt_inf']."',". $abook['dompub'].",". $abook['descargar'].",". $abook['dompub_status'] .")" ;
```

- Notas: QUERY DIN?MICA

## Q0287

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libro_editinfo.php:32`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_editinfo.php:41

## Q0288

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `adm/libro_editinfo.php:37`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_id = ".mpdb_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_editinfo.php:41

## Q0289

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_inf`, `uri`
- Archivo:l?nea: `adm/libro_editinfo.php:58`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_txt_inf = '".mpdb_real_escape_string($p_info)."' where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libro_editinfo.php:66

## Q0290

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_txt_inf`, `ebooks_books_id`
- Archivo:l?nea: `adm/libro_editinfo.php:63`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_txt_inf = '".mpdb_real_escape_string($p_info)."' where ebooks_books_id=".$p_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libro_editinfo.php:66

## Q0291

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libro_editinfo.php:85`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_editinfo.php:94

## Q0292

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `adm/libro_editinfo.php:90`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_id = ".mpdb_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_editinfo.php:94

## Q0293

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libro_video_publicar.php:54`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".$p_ebook_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_video_publicar.php:55

## Q0294

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`
- Archivo:l?nea: `adm/libro_video_publicar.php:66`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_id = ".$alibro['ebooks_books_author'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libro_video_publicar.php:67

## Q0295

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libroadm.php:358`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mpdb_real_escape_string($p_libro)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libroadm.php:359

## Q0296

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `libro`
- Archivo:l?nea: `adm/libroadm.php:364`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_id = ".$gvar['libro']['ebooks_books_author'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libroadm.php:365

## Q0297

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/libroadm.php:381`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ".$p_campo." = ".mpdb_real_escape_string($p_valor).",ebooks_books_updated=NOW() where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libroadm.php:383

## Q0298

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libroadm_abm_HACER.php:315`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mpdb_real_escape_string($p_libro)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libroadm_abm_HACER.php:316

## Q0299

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `libro`
- Archivo:l?nea: `adm/libroadm_abm_HACER.php:321`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_id = ".$gvar['libro']['ebooks_books_author'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libroadm_abm_HACER.php:322

## Q0300

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/libroadm_abm_HACER.php:350`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ".$p_campo." = '".mpdb_real_escape_string($p_valor)."' where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libroadm_abm_HACER.php:352

## Q0301

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/libroadm_abm_HACER.php:371`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ".$p_campo." = ".mpdb_real_escape_string($p_valor).",ebooks_books_updated=NOW() where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libroadm_abm_HACER.php:373

## Q0302

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/libros_adm.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'P+' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_adm.php:28

## Q0303

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/libros_adm.php:33`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'P+*' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_adm.php:35

## Q0304

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/libros_adm.php:41`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'P*' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_adm.php:43

## Q0305

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/libros_adm.php:48`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'NOP' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_adm.php:50

## Q0306

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`
- Archivo:l?nea: `adm/libros_adm.php:56`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books order by ebooks_books_download_rank desc limit 100";
```

- Notas: QUERY DIN?MICA

## Q0307

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `ebooks_books_txt_inf`
- Archivo:l?nea: `adm/libros_adm.php:60`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_txt_inf is null order by ebooks_books_download_rank desc limit 100";
```

- Notas: QUERY DIN?MICA

## Q0308

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `read_online`
- Archivo:l?nea: `adm/libros_adm.php:66`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 0 order by ebooks_books_download_rank desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_adm.php:77

## Q0309

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `views`
- Archivo:l?nea: `adm/libros_adm.php:72`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 0 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_adm.php:77

## Q0310

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `views`
- Archivo:l?nea: `adm/libros_bloquear_descarga.php:33-36`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where descargar = 0 order by views desc limit 1000";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_bloquear_descarga.php:40

## Q0311

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `uri`
- Archivo:l?nea: `adm/libros_bloquear_descarga.php:86`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set descargar = ".$permiso." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_bloquear_descarga.php:89

## Q0312

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_epub`, `views`
- Archivo:l?nea: `adm/libros_faltantes.php:33-37`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where ebooks_format_epub = 0 order by views desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_faltantes.php:39

## Q0313

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`, `uri`
- Archivo:l?nea: `adm/libros_faltantes.php:99`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set procesado = 1 where uri = '".$books[$i]['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_faltantes.php:100

## Q0314

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `status`, `id`
- Archivo:l?nea: `adm/libros_pedidos.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update libros_pedidos set status = 'hecho' where id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_pedidos.php:27

## Q0315

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `status`, `id`
- Archivo:l?nea: `adm/libros_pedidos.php:30`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from libros_pedidos where status = 'pendiente' order by id limit 30";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_pedidos.php:32

## Q0316

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_epub`, `procesado`, `views`
- Archivo:l?nea: `adm/libros_que_faltan_subir.php:35-40`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where ebooks_format_epub = 1 and procesado = 0 order by views desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_que_faltan_subir.php:42

## Q0317

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`, `uri`
- Archivo:l?nea: `adm/libros_que_faltan_subir.php:98`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set procesado = 1 where uri = '".$books[$i]['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_que_faltan_subir.php:99

## Q0318

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `descargar`, `uri`
- Archivo:l?nea: `adm/libros_subir.php:206`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_updated = NOW(), ebooks_format_".$extension." = 1, descargar = 1 where uri='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_subir.php:208

## Q0319

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_cover`, `uri`
- Archivo:l?nea: `adm/libros_subir.php:216`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_updated = NOW(), ebooks_books_cover = 1 where uri='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_subir.php:218

## Q0320

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libros_subir.php:266`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mpdb_real_escape_string($uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_subir.php:268

## Q0321

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `descargar`, `uri`
- Archivo:l?nea: `adm/libros_subir_nuevos.php:206`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_updated = NOW(), ebooks_format_".$extension." = 1, descargar = 1 where uri='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_subir_nuevos.php:208

## Q0322

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `uri`
- Archivo:l?nea: `adm/libros_subir_nuevos.php:216`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_updated = NOW() where uri='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_subir_nuevos.php:218

## Q0323

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libros_subir_nuevos.php:267`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mysql_real_escape_string($uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_subir_nuevos.php:268

## Q0324

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `adm/libros_subir_nuevos.php:304`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO ebooks_books (uri, ebooks_books_title, ebooks_books_author) VALUES ('".$abook['uri']."', '".$abook['libro_titulo']."',". $aautor['ebooks_authors_id'].")" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_subir_nuevos.php:305

## Q0325

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `uri`
- Archivo:l?nea: `adm/libros_videos_lst.php:49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '".$p_video."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_videos_lst.php:51

## Q0326

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/libros_videos_lst.php:63-66`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_videos_lst.php:77

## Q0327

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_format_epub`, `videos`, `views`
- Archivo:l?nea: `adm/libros_videos_lst.php:69-74`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where videos is null and ebooks_format_epub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/libros_videos_lst.php:77

## Q0328

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`, `uri`
- Archivo:l?nea: `adm/libros_videos_lst.php:169`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set procesado = 1 where uri = '".$books[$i]['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/libros_videos_lst.php:170

## Q0329

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_format_pdf`, `ebooks_authors_id`, `read_online`, `uri`
- Archivo:l?nea: `adm/list_autor_libros.php:62-68`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select b.uri, b.ebooks_format_pdf from ebooks_books as b, ebooks_authors as a where b.read_online = 0 and ebooks_format_pdf is null and a.uri = '".$autor_uri."' and b.ebooks_books_author = a.ebooks_authors_id order by b.uri";
```

- Notas: QUERY DIN?MICA

## Q0330

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `ebooks_books_id`, `read_online`, `dompub`, `views`, `uri`
- Archivo:l?nea: `adm/list_libros_top.php:62-73`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.read_online = 1 and l.dompub = 1 and l.ebooks_books_author = a.ebooks_authors_id order by l.views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/list_libros_top.php:74

## Q0331

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `dompub`, `views`
- Archivo:l?nea: `adm/list_libros_top.php:77-80`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where dompub = 1 order by views desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/list_libros_top.php:84

## Q0332

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `ebooks_books_id`, `read_online`, `dompub`, `views`, `uri`
- Archivo:l?nea: `adm/list_libros_top_publicar.php:62-73`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.read_online = 1 and l.dompub = 1 and l.ebooks_books_author = a.ebooks_authors_id order by l.views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/list_libros_top_publicar.php:74

## Q0333

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `adm/list_libros_top_publicar.php:77-80`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 0 and dompub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/list_libros_top_publicar.php:84

## Q0334

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_authors_rank`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `adm/mejores_autores.php:54`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_authors_id,uri,ebooks_authors_name from ebooks_authors where ebooks_authors_rank > 0 order by `ebooks_authors_rank` desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/mejores_autores.php:55

## Q0335

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:105`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$res = mysqli_query($dbconn, "SELECT ultimo_id FROM migracion_estado WHERE proceso = '$proceso'");
```

- Notas: QUERY DIN?MICA

## Q0336

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:107`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
mysqli_query($dbconn, "INSERT INTO migracion_estado (proceso, ultimo_id) VALUES ('$proceso', 0)");
```

- Notas: QUERY DIN?MICA

## Q0337

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_labels`, `ebooks_books_id`, `ultimo_id`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:115-119`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_labels FROM ebooks_books WHERE ebooks_books_id > $ultimo_id ORDER BY ebooks_books_id ASC LIMIT $lote";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/migrar_tags_20205.0.php:121

## Q0338

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `nombre_es`, `ranking`, `uri`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:148-149`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_insert = "INSERT IGNORE INTO ebooks_tags (uri, nombre_es, ranking) VALUES ('".mpdb_escape($uri)."', '".mpdb_escape($tag)."', 0)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/migrar_tags_20205.0.php:150

## Q0339

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_tags`
- Columnas detectadas: `uri`, `id`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:155`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$res_tag = mysqli_query($dbconn, "SELECT id FROM ebooks_tags WHERE uri = '".mpdb_escape($uri)."' LIMIT 1");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0340

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `ebooks_books_id`, `tag_id`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:160-161`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_rel = "INSERT IGNORE INTO books_tags (ebooks_books_id, ebooks_tags_id) VALUES (".(int)$row['ebooks_books_id'].", $tag_id)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/migrar_tags_20205.0.php:162

## Q0341

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_tags_20205.0.php:169`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
mysqli_query($dbconn, "UPDATE migracion_estado SET ultimo_id = $max_id_lote WHERE proceso = '$proceso'");
```

- Notas: QUERY DIN?MICA

## Q0342

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_tags_20205.php:72`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$res = mysqli_query($dbconn, "SELECT ultimo_id FROM migracion_estado WHERE proceso = '$proceso'");
```

- Notas: QUERY DIN?MICA

## Q0343

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_tags_20205.php:74`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
mysqli_query($dbconn, "INSERT INTO migracion_estado (proceso, ultimo_id) VALUES ('$proceso', 0)");
```

- Notas: QUERY DIN?MICA

## Q0344

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_labels`, `ebooks_books_id`, `ultimo_id`
- Archivo:l?nea: `adm/migrar_tags_20205.php:81-85`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_labels FROM ebooks_books WHERE ebooks_books_id > $ultimo_id ORDER BY ebooks_books_id ASC LIMIT $lote";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/migrar_tags_20205.php:87

## Q0345

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `tags`
- Columnas detectadas: `nombre_es`, `ranking`, `uri`
- Archivo:l?nea: `adm/migrar_tags_20205.php:103-104`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_insert = "INSERT IGNORE INTO tags (uri, nombre_es, ranking) VALUES ('".mpdb_escape($uri)."', '".mpdb_escape($tag)."', 0)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/migrar_tags_20205.php:105

## Q0346

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`
- Columnas detectadas: `uri`, `id`
- Archivo:l?nea: `adm/migrar_tags_20205.php:109`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$res_tag = mysqli_query($dbconn, "SELECT id FROM tags WHERE uri = '".mpdb_escape($uri)."' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0347

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `book_id`, `tag_id`
- Archivo:l?nea: `adm/migrar_tags_20205.php:114-115`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_rel = "INSERT IGNORE INTO books_tags (book_id, tag_id) VALUES ($book_id, $tag_id)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en adm/migrar_tags_20205.php:116

## Q0348

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_tags_20205.php:122`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
mysqli_query($dbconn, "UPDATE migracion_estado SET ultimo_id = $max_id_lote WHERE proceso = '$proceso'");
```

- Notas: QUERY DIN?MICA

## Q0349

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_user_tags_from_library_2025.php:32`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$res = mysqli_query($dbconn, "SELECT ultimo_id FROM migracion_estado WHERE proceso = '$proceso'");
```

- Notas: QUERY DIN?MICA

## Q0350

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_user_tags_from_library_2025.php:34`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
mysqli_query($dbconn, "INSERT INTO migracion_estado (proceso, ultimo_id) VALUES ('$proceso', 0)");
```

- Notas: QUERY DIN?MICA

## Q0351

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ultimo_id`, `user_id`
- Archivo:l?nea: `adm/migrar_user_tags_from_library_2025.php:41`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_users = "SELECT DISTINCT user_id FROM user_books WHERE user_id > $ultimo_id ORDER BY user_id ASC LIMIT $lote";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/migrar_user_tags_from_library_2025.php:42

## Q0352

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`
- Archivo:l?nea: `adm/migrar_user_tags_from_library_2025.php:58`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_books = "SELECT ebooks_books_id FROM user_books WHERE user_id = $user_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/migrar_user_tags_from_library_2025.php:61

## Q0353

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `book_id`, `tag_id`
- Archivo:l?nea: `adm/migrar_user_tags_from_library_2025.php:67`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_tags = "SELECT tag_id FROM books_tags WHERE book_id = $book_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/migrar_user_tags_from_library_2025.php:68

## Q0354

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `migracion_estado`
- Columnas detectadas: `ultimo_id`, `proceso`
- Archivo:l?nea: `adm/migrar_user_tags_from_library_2025.php:83`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
mysqli_query($dbconn, "UPDATE migracion_estado SET ultimo_id = $max_id_lote WHERE proceso = '$proceso'");
```

- Notas: QUERY DIN?MICA

## Q0355

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`
- Archivo:l?nea: `adm/mobi_adm.php:45`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_subidos = mpdb_get_value("select count(*) from ebooks_books where ebooks_books_file_alternative is null or ebooks_books_file_alternative = '' and dompub = 1", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0356

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `dompub`
- Archivo:l?nea: `adm/mobi_adm.php:46`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_no_subidos = mpdb_get_value("select count(*) from ebooks_books where `ebooks_books_file_alternative` is not null or ebooks_books_file_alternative <> '' and dompub = 1", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0357

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_mobi`, `views`
- Archivo:l?nea: `adm/mobi_adm.php:66`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where ( ebooks_format_mobi is null ) order by `views` desc limit 20";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/mobi_adm.php:67

## Q0358

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_format_mobi`, `uri`
- Archivo:l?nea: `adm/mobi_adm_upload.php:213`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_format_mobi = 1, ebooks_books_updated = NOW() where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/mobi_adm_upload.php:215

## Q0359

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/mobi_adm_upload.php:221`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql= "select * from ebooks_books where uri = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/mobi_adm_upload.php:222

## Q0360

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_epub`, `uri`
- Archivo:l?nea: `adm/mobi_adm_upload.php:228`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_format_epub = -1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/mobi_adm_upload.php:230

## Q0361

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/mobi_adm_upload.php:236`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update libros_pedidos set publicado = 1 where libro = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/mobi_adm_upload.php:237

## Q0362

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `hua_locations`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/mp_dbfuncs.php:14-18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function get_location_by_id( $_location_id = 0 ) { if ( $_location_id ) { $_query = "SELECT * FROM hua_locations WHERE hua_location_id = '$_location_id'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0363

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `hua_locations`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/mp_dbfuncs.php:36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = "INSERT INTO hua_locations SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0364

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `links`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/mp_dbfuncs.php:112-116`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function get_link_by_url( $_link_url = "" ) { if ( $_link_url ) { $_query = "SELECT * FROM links WHERE link_url = '$_link_url'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0365

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `links`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/mp_dbfuncs.php:135`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "INSERT INTO links SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en adm/mp_dbfuncs.php:142; tabla fuera de 10_DB_CATALOG

## Q0366

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `adm/mp_dbfuncs.php:174`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "INSERT INTO ".$table." SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en adm/mp_dbfuncs.php:177

## Q0367

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/mp_dbfuncs.php:201`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "UPDATE ".$table." SET " . implode( ",", $_query_params )." WHERE ".$_key." = '". $_vars[$_key]."'";
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en adm/mp_dbfuncs.php:207

## Q0368

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `value`, `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/mp_dbfuncs.php:218-222`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function table_select( $table, $field, $value, $limit=100 ) { if ( $field ) { $_query = "SELECT * FROM ".$table." WHERE ".$field." = '".$value."' LIMIT ".$limit;
```

- Notas: QUERY DIN?MICA

## Q0369

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_format_pdf`, `uri`
- Archivo:l?nea: `adm/pdf_adm_upload.php:213`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_format_pdf = 1, ebooks_books_updated = NOW() where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/pdf_adm_upload.php:215

## Q0370

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/pdf_adm_upload.php:221`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql= "select * from ebooks_books where uri = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/pdf_adm_upload.php:222

## Q0371

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `libro`
- Archivo:l?nea: `adm/pdf_adm_upload.php:236`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update libros_pedidos set publicado = 1 where libro = '".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/pdf_adm_upload.php:237

## Q0372

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/proc_copiar_covers.php:23`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) from ebooks_authors where uri = ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/proc_copiar_covers.php:24

## Q0373

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`
- Archivo:l?nea: `adm/proc_copiar_covers.php:27`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/proc_copiar_covers.php:29

## Q0374

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_doc`, `dompub`, `views`
- Archivo:l?nea: `adm/procesar_libros.php:39-43`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select * from ebooks_books where dompub = 1 and ebooks_format_doc = 0 order by views desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/procesar_libros.php:45

## Q0375

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_doc`, `uri`
- Archivo:l?nea: `adm/procesar_un_libro.php:41-43`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set ebooks_format_doc = 1 where uri = '".mysql_real_escape_string($p_ebook_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/procesar_un_libro.php:45

## Q0376

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/procesar_un_libro.php:48`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mysql_real_escape_string($p_ebook_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/procesar_un_libro.php:49

## Q0377

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `adm/procesar_un_libro.php:76-79`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " select * from ebooks_books where ".$_where;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/procesar_un_libro.php:83

## Q0378

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_ranked`
- Archivo:l?nea: `adm/rankear_autores.php:48`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_ranked = 0 limit 200";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/rankear_autores.php:49

## Q0379

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `views`, `rank`
- Archivo:l?nea: `adm/rankear_autores.php:74`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select sum(views) as rank from ebooks_books where ebooks_books_author = ".$autores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/rankear_autores.php:77

## Q0380

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_rank`, `ebooks_authors_id`, `rank`
- Archivo:l?nea: `adm/rankear_autores.php:83`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_authors set ebooks_authors_rank = ".$autor_rank[0]['rank']." where ebooks_authors_id = ".$autores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/rankear_autores.php:84

## Q0381

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_ranked`, `ebooks_authors_id`
- Archivo:l?nea: `adm/rankear_autores.php:86`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_authors set ebooks_authors_ranked = 1"." where ebooks_authors_id = ".$autores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/rankear_autores.php:87

## Q0382

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/sitemap_autor_crear.php:21`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_authors";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/sitemap_autor_crear.php:22

## Q0383

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `adm/sitemap_crear.php:20`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_books";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/sitemap_crear.php:21

## Q0384

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `uri`
- Archivo:l?nea: `adm/sitemap_crear_en.php:22`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_books where ebooks_books_lang = 'en'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/sitemap_crear_en.php:23

## Q0385

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `uri`
- Archivo:l?nea: `adm/sitemap_readonline_crear.php:31`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri, read_online from ebooks_books";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/sitemap_readonline_crear.php:32

## Q0386

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `adm/stats.php:74`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(distinct user_id) as cant from user_video_audiolibros";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/stats.php:76

## Q0387

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `adm/stats.php:105`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(distinct ebooks_books_id) as cant from user_video_audiolibros";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/stats.php:107

## Q0388

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`
- Archivo:l?nea: `adm/stats.php:137-138`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select b.ebooks_books_title , count( ua.ebooks_books_id) as cant from user_video_audiolibros as ua, ebooks_books as b where b.ebooks_books_id = ua.ebooks_books_id group by ua.ebooks_books_id order by cant desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/stats.php:140

## Q0389

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_table`, `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `current_min`, `last_read`, `username`, `user_id`, `userid`
- Archivo:l?nea: `adm/stats.php:157-164`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = 'select uva.user_id, u.username, uva.ebooks_books_id, b.ebooks_books_title, uva.current_min, uva.last_read from user_video_audiolibros as uva, user_table as u, ebooks_books as b where u.userid = uva.user_id and uva.ebooks_books_id = b.ebooks_books_id and uva.current_min > 1 order by last_read desc, user_id asc';
```

- Notas: QUERY DIN?MICA

## Q0390

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `adm/stats.php:184`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT COUNT(DISTINCT user_id) AS cant FROM user_books";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/stats.php:186

## Q0391

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `adm/stats.php:207`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT COUNT(DISTINCT ebooks_books_id) AS cant FROM user_books";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/stats.php:209

## Q0392

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `current_page`, `last_read`, `username`, `user_id`, `userid`, `email`, `uri`
- Archivo:l?nea: `adm/testepub2html.php:37-45`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT b.ebooks_books_title, b.uri as uri, ub.last_read, user_table.username, user_table.email FROM ebooks_books AS b JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id JOIN user_table ON user_table.userid = ub.user_id WHERE b.uri = '$book_uri_escaped' AND ub.current_page = 1 ORDER BY ub.last_read DESC ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/testepub2html.php:50

## Q0393

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `current_page`, `last_read`, `username`, `user_id`, `userid`, `email`, `uri`
- Archivo:l?nea: `adm/testepub2html.php:124-132`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT b.ebooks_books_title, b.uri as uri, ub.last_read, user_table.username, user_table.email FROM ebooks_books AS b JOIN user_books AS ub ON b.ebooks_books_id = ub.ebooks_books_id JOIN user_table ON user_table.userid = ub.user_id WHERE b.uri = '$book_uri_escaped' AND ub.current_page = 1 ORDER BY ub.last_read DESC ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/testepub2html.php:137

## Q0394

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/textos_online.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'P+' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/textos_online.php:28

## Q0395

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/textos_online.php:33`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'P+*' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/textos_online.php:35

## Q0396

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/textos_online.php:41`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'P*' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/textos_online.php:43

## Q0397

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `texto_online`
- Archivo:l?nea: `adm/textos_online.php:48`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set texto_online = 'NOP' where ebooks_books_id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/textos_online.php:50

## Q0398

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `status`, `id`
- Archivo:l?nea: `adm/textos_online.php:57`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update libros_pedidos set status = 'hecho' where id = ".mysql_real_escape_string($p_id);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/textos_online.php:58

## Q0399

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`
- Archivo:l?nea: `adm/textos_online.php:62`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books order by ebooks_books_download_rank desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/textos_online.php:64

## Q0400

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `paid`
- Archivo:l?nea: `adm/user_suscripcion_mva_admin.php:112`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where refurl <>'' and paid = 0";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/user_suscripcion_mva_admin.php:113

## Q0401

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `uri`
- Archivo:l?nea: `adm/user_suscripcion_mva_admin.php:200`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set descargar = ".$permiso." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/user_suscripcion_mva_admin.php:203

## Q0402

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `refurl`
- Archivo:l?nea: `adm/user_suscripcion_odysee_admin.php:113`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where refurl = 'suscr-odysee' order by last_visit desc limit 30 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/user_suscripcion_odysee_admin.php:114

## Q0403

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `uri`
- Archivo:l?nea: `adm/user_suscripcion_odysee_admin.php:203`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set descargar = ".$permiso." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/user_suscripcion_odysee_admin.php:206

## Q0404

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `refurl`
- Archivo:l?nea: `adm/user_suscripcion_youtube_admin.php:113`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where refurl = 'suscr-youtube' order by last_visit desc limit 20 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/user_suscripcion_youtube_admin.php:114

## Q0405

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `uri`
- Archivo:l?nea: `adm/user_suscripcion_youtube_admin.php:218`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set descargar = ".$permiso." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/user_suscripcion_youtube_admin.php:221

## Q0406

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `refurl`
- Archivo:l?nea: `adm/user_suscripcion_youtube_video_admin.php:114`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where refurl <>'' order by last_visit desc limit 30 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/user_suscripcion_youtube_video_admin.php:115

## Q0407

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `descargar`, `uri`
- Archivo:l?nea: `adm/user_suscripcion_youtube_video_admin.php:219`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set descargar = ".$permiso." where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/user_suscripcion_youtube_video_admin.php:222

## Q0408

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `adm/usuarios_libros_borrar.php:64`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books order by user_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/usuarios_libros_borrar.php:77

## Q0409

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`, `user_table`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `user_id`, `userid`
- Archivo:l?nea: `adm/usuarios_libros_borrar.php:74`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books as b, user_books as ub, user_table where user_table.userid = ub.user_id and b.ebooks_books_id = ub.ebooks_books_id order by ub.last_read desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/usuarios_libros_borrar.php:77

## Q0410

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `video`
- Archivo:l?nea: `adm/videos_sugeridos_list.php:36`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "delete from videos_sugeridos where video = '".$p_video."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/videos_sugeridos_list.php:37

## Q0411

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `videos`, `uri`
- Archivo:l?nea: `adm/videos_sugeridos_list.php:47`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri,videos, videos_sugeridos from ebooks_books where uri='". $p_libro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en adm/videos_sugeridos_list.php:48

## Q0412

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `uri`
- Archivo:l?nea: `adm/videos_sugeridos_list.php:101`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = '".$videos_sugeridos."'".$sql_videos." where uri = '".$p_libro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/videos_sugeridos_list.php:103

## Q0413

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `video`
- Archivo:l?nea: `adm/videos_sugeridos_list.php:141`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "delete from videos_sugeridos where video = '".$p_video."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en adm/videos_sugeridos_list.php:143

## Q0414

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `video`
- Archivo:l?nea: `adm/videos_sugeridos_list.php:148`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$a_videos = mpdb_get_value("select * from videos_sugeridos where video is not null limit 30", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0415

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `api/siguiente-libro.php:44`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en api/siguiente-libro.php:45

## Q0416

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `ebooks_books_id`, `views_last`, `uri`
- Archivo:l?nea: `api/v1/gptsearch.php:53-62`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en api/v1/gptsearch.php:66

## Q0417

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_format_epub`, `ebooks_format_mobi`, `ebooks_format_pdf`, `ebooks_format_doc`, `read_online`, `dompub`, `videos`, `uri`
- Archivo:l?nea: `app_libro_info.php:48-56`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_format_mobi, ebooks_format_pdf, ebooks_format_epub, ebooks_format_doc, videos, read_online, dompub from ebooks_books where uri = '".$plibro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_libro_info.php:57

## Q0418

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_authors_rank`, `uri`
- Archivo:l?nea: `app_list_autores_top.php:51-52`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri, ebooks_authors_name from ebooks_authors order by ebooks_authors_rank desc limit ".$limit;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_autores_top.php:55

## Q0419

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `ebooks_books_id`, `descargar`, `views`, `uri`
- Archivo:l?nea: `app_list_busqueda.php:86-101`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, l.descargar, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where ( l.ebooks_format_epub = 1 or l.ebooks_format_epub = -1 ) and l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views desc limit 40";
```

- Notas: QUERY DIN?MICA

## Q0420

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `uri`
- Archivo:l?nea: `app_list_libros.php:45`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_books_title, uri from ebooks_books";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros.php:46

## Q0421

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `app_list_libros.php:49-52`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and dompub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros.php:55

## Q0422

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `ebooks_books_id`, `descargar`, `views`, `uri`
- Archivo:l?nea: `app_list_libros_autor.php:53-67`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, l.descargar, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_format_epub = 1 and l.ebooks_books_author = a.ebooks_authors_id and a.uri = '".$autor_uri."' order by l.views desc";
```

- Notas: QUERY DIN?MICA

## Q0423

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_updated`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `ebooks_books_id`, `descargar`, `uri`
- Archivo:l?nea: `app_list_libros_novedades.php:56-68`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, l.descargar, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_format_epub = 1 and l.ebooks_books_author = a.ebooks_authors_id order by ebooks_books_updated desc limit ".$limit;
```

- Notas: QUERY DIN?MICA

## Q0424

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `app_list_libros_novedades.php:74-77`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and dompub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros_novedades.php:80

## Q0425

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_updated`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `ebooks_books_id`, `recomendado`, `descargar`, `uri`
- Archivo:l?nea: `app_list_libros_recomendados.php:56-69`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, l.descargar, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_format_epub = 1 and l.ebooks_books_author = a.ebooks_authors_id and l.recomendado = 1 order by ebooks_books_updated desc limit ".$limit;
```

- Notas: QUERY DIN?MICA

## Q0426

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `app_list_libros_recomendados.php:76-79`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and dompub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros_recomendados.php:82

## Q0427

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `ebooks_books_id`, `descargar`, `views`, `uri`
- Archivo:l?nea: `app_list_libros_top.php:52-64`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, l.descargar, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_format_epub = 1 and l.ebooks_books_author = a.ebooks_authors_id order by l.views desc limit ".$limit;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros_top.php:66

## Q0428

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `app_list_libros_top.php:69-72`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and dompub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros_top.php:75

## Q0429

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `ebooks_books_id`, `read_online`, `dompub`, `views`, `uri`
- Archivo:l?nea: `app_list_libros_top_50.php:48-59`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.read_online = 1 and l.dompub = 1 and l.ebooks_books_author = a.ebooks_authors_id order by l.views desc limit 50";
```

- Notas: QUERY DIN?MICA

## Q0430

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_books_cover`, `ebooks_authors_id`, `ebooks_books_id`, `views`, `uri`
- Archivo:l?nea: `app_list_libros_top_50.php:62-73`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select l.ebooks_books_id, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_books_cover = 1 and l.ebooks_books_author = a.ebooks_authors_id order by l.views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros_top_50.php:75

## Q0431

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `app_list_libros_top_50.php:78-81`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and dompub = 1 order by views desc limit 50";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en app_list_libros_top_50.php:84

## Q0432

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `ebooks_books_id`, `descargar`, `views`, `uri`
- Archivo:l?nea: `app_list_libros_usuario.php:71-85`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_txt_inf, l.ebooks_books_file_alternative, l.descargar, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_format_epub = 1 and l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views desc";
```

- Notas: QUERY DIN?MICA

## Q0433

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `user_id`, `userid`, `libro`
- Archivo:l?nea: `audiolibro.php:332`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_video_audiolibros set last_read = now() where user_id = ".$_SESSION['userid']." and ebooks_books_id = ".$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en audiolibro.php:333

## Q0434

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `user_id`, `userid`, `libro`
- Archivo:l?nea: `audiolibro_player.php:321`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_video_audiolibros set last_read = now() where user_id = ".$_SESSION['userid']." and ebooks_books_id = ".$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en audiolibro_player.php:322

## Q0435

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `uri`
- Archivo:l?nea: `autor.php:54`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where uri = '".mpdb_real_escape_string($p_autor)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor.php:57

## Q0436

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`
- Archivo:l?nea: `autor.php:71`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_author = ".mpdb_real_escape_string($gvar['autor']['ebooks_authors_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor.php:72

## Q0437

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_books_cover`, `ebooks_authors_id`, `views`
- Archivo:l?nea: `autor.php:125`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_author = '".mpdb_real_escape_string($gvar['autor']['ebooks_authors_id'])."' and ebooks_books_cover = 1 order by views desc limit 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor.php:127

## Q0438

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_books_cover`, `ebooks_authors_id`, `views`
- Archivo:l?nea: `autor.php:176`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_author = '".mpdb_real_escape_string($gvar['autor']['ebooks_authors_id'])."' and ebooks_books_cover = 1 order by views desc limit 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor.php:178

## Q0439

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `views`
- Archivo:l?nea: `autor.php:210`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_author = ".mpdb_real_escape_string($gvar['autor']['ebooks_authors_id'])." order by views desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor.php:213

## Q0440

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `autor_funcs.php:15`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT count(*) as cant FROM videos_book WHERE libro_uri like '".$p_autor."%' ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor_funcs.php:17

## Q0441

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `uri`
- Archivo:l?nea: `autor_funcs.php:40`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_authors WHERE uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor_funcs.php:44

## Q0442

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `autor_funcs.php:65-68`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ea.* FROM ebooks_authors ea INNER JOIN ebooks_books eb ON ea.ebooks_authors_id = eb.ebooks_books_author WHERE eb.uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor_funcs.php:72

## Q0443

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `id`
- Archivo:l?nea: `autor_funcs.php:91`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_authors WHERE ebooks_authors_id = '".$id."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor_funcs.php:95

## Q0444

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_books_cover`, `ebooks_authors_id`, `views`, `uri`
- Archivo:l?nea: `autor_funcs.php:123-126`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books.uri FROM ebooks_books INNER JOIN ebooks_authors ON ebooks_books.ebooks_books_author = ebooks_authors.ebooks_authors_id WHERE ebooks_authors.uri = '".$p_autor."' and ebooks_books.ebooks_books_cover = 1 order by ebooks_books.views desc limit ".$cant_libros;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autor_funcs.php:128

## Q0445

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`
- Archivo:l?nea: `autores.php:113`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_author = ".mpdb_real_escape_string($gvar['autor']['ebooks_authors_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autores.php:114

## Q0446

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_authors_rank`
- Archivo:l?nea: `autores.php:302`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_name like '".mpdb_real_escape_string($letra)."%' order by ebooks_authors_rank desc limit 10";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autores.php:304

## Q0447

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`
- Archivo:l?nea: `autores.php:324`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_name like '".mpdb_real_escape_string($letra)."%' order by ebooks_authors_name";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en autores.php:326

## Q0448

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_surname`, `ebooks_authors_name`, `uri`
- Archivo:l?nea: `autores_funcs.php:27-36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql=' INSERT INTO ebooks_authors ( uri, ebooks_authors_name, ebooks_authors_surname ) VALUES ( '.$aautor['uri'].', '.$aautor['ebooks_authors_name'].', '.$aautor['ebooks_authors_surname'].' )';
```

- Notas: QUERY DIN?MICA

## Q0449

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `videoid`, `rank`
- Archivo:l?nea: `backend/addreviews_main.php:61`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select videoid from videos_book where libro_uri = '".$p_uri."' order by rank desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/addreviews_main.php:63

## Q0450

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `video`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:71`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = 'sin-video' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:73

## Q0451

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `video`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:76`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = 'sin-video' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:78

## Q0452

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:89`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '".mpdb_real_escape_string($p_video)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:91

## Q0453

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:93`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = '".mpdb_real_escape_string($p_video)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:95

## Q0454

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:113`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '".mpdb_real_escape_string($p_video1)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:115

## Q0455

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:117`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = '".mpdb_real_escape_string($p_video1)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:119

## Q0456

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `backend/addreviews_main.php:136-139`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA

## Q0457

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_books_lang`, `videos`, `views`
- Archivo:l?nea: `backend/addreviews_main.php:147-153`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books as b where (b.videos = '' or b.videos is null ) and ebooks_books_lang = '".$p_lang."' order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0458

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_books_lang`, `views_last`, `videos`
- Archivo:l?nea: `backend/addreviews_main.php:156-162`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books as b where (b.videos = '' or b.videos is null ) and ebooks_books_lang = '".$p_lang."' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0459

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `videos`
- Archivo:l?nea: `backend/addreviews_main.php:165-171`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books as b where (b.videos = '' or b.videos is null ) and ebooks_books_lang = '".$p_lang."' order by ebooks_books_updated desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0460

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `procesado`, `uri`
- Archivo:l?nea: `backend/addreviews_main.php:314`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set procesado = 1 where uri = '".$books[$i]['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/addreviews_main.php:315

## Q0461

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`, `uri`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_lst.php:61`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set video_audiolibro = 'sin-audiolibro' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/bkend_videos_audiolibros_lst.php:63

## Q0462

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`, `uri`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_lst.php:82`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set video_audiolibro = '".mpdb_real_escape_string($p_videoid)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/bkend_videos_audiolibros_lst.php:83

## Q0463

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_lst.php:112-115`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA

## Q0464

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_lang`, `ebooks_authors_id`, `video_audiolibro`, `views`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_lst.php:124-131`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select a.ebooks_authors_name, l.* from ebooks_books as l, ebooks_authors as a where a.ebooks_authors_id = l.ebooks_books_author and (video_audiolibro is null or video_audiolibro = '') and ebooks_books_lang = 'es' order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0465

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_lang`, `ebooks_authors_id`, `video_audiolibro`, `views_last`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_lst.php:136-143`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select a.ebooks_authors_name, l.* from ebooks_books as l, ebooks_authors as a where a.ebooks_authors_id = l.ebooks_books_author and (video_audiolibro is null or video_audiolibro = '') and ebooks_books_lang = 'es' order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_audiolibros_lst.php:150

## Q0466

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`, `uri`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_revisar.php:55`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set video_audiolibro = '' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/bkend_videos_audiolibros_revisar.php:57

## Q0467

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro_revisado`, `uri`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_revisar.php:74`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set video_audiolibro_revisado = 1 where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/bkend_videos_audiolibros_revisar.php:76

## Q0468

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_revisar.php:91-94`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA

## Q0469

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `video_audiolibro_revisado`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_authors_id`, `video_audiolibro`, `views_last`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_revisar.php:103-111`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select a.ebooks_authors_name, l.* from ebooks_books as l, ebooks_authors as a where a.ebooks_authors_id = l.ebooks_books_author and video_audiolibro_revisado = 0 and (video_audiolibro is not null and video_audiolibro != 'sin-audiolibro' and video_audiolibro != '' ) order by views_last desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0470

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `video_audiolibro_revisado`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_authors_id`, `video_audiolibro`, `views`
- Archivo:l?nea: `backend/bkend_videos_audiolibros_revisar.php:116-124`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select a.ebooks_authors_name, l.* from ebooks_books as l, ebooks_authors as a where a.ebooks_authors_id = l.ebooks_books_author and video_audiolibro_revisado = 0 and (video_audiolibro is not null and video_audiolibro != 'sin-audiolibro' and video_audiolibro != '' ) order by views desc limit 1";
```

- Notas: QUERY DIN?MICA

## Q0471

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `backend/bkend_videos_book_listado.php:80-83`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from videos_book where libro_uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_book_listado.php:85

## Q0472

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `fecha`
- Archivo:l?nea: `backend/bkend_videos_stats.php:176`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select date(fecha) as fec, count(*) as count from video_audiolibros where month(fecha) = ".$mes." group by fec order by fec desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:177

## Q0473

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`
- Archivo:l?nea: `backend/bkend_videos_stats.php:200`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) as count from ebooks_books where video_audiolibro = 'sin-audiolibro'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:201

## Q0474

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `video`
- Archivo:l?nea: `backend/bkend_videos_stats.php:220`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) as count from ebooks_books where videos = 'sin-video'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:221

## Q0475

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `backend/bkend_videos_stats.php:240`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select count(*) as count from ebooks_books';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:241

## Q0476

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`
- Archivo:l?nea: `backend/bkend_videos_stats.php:260`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) as count from ebooks_books where video_audiolibro is not null and video_audiolibro != 'sin-audiolibro' and video_audiolibro!=''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:261

## Q0477

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `video`
- Archivo:l?nea: `backend/bkend_videos_stats.php:280`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) as count from ebooks_books where videos is not null and videos != 'sin-video' and videos != ''";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:281

## Q0478

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `lang`
- Archivo:l?nea: `backend/bkend_videos_stats.php:300`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select count(*) as count from ebooks_books where ebooks_books_lang = '".$lang."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:302

## Q0479

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `userid`, `fecha`
- Archivo:l?nea: `backend/bkend_videos_stats.php:323`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select month(fecha) as fec, count(*) as count from video_audiolibros where userid = '.$userid.' and month(fecha) = '.$mes.' group by fec order by fec desc';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:329

## Q0480

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `fecha`
- Archivo:l?nea: `backend/bkend_videos_stats.php:325`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select month(fecha) as fec, count(*) as count from video_audiolibros group by fec order by fec desc';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:329

## Q0481

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `userid`, `fecha`
- Archivo:l?nea: `backend/bkend_videos_stats.php:349-352`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select date(fecha) as fec, count(*) as count from video_audiolibros where userid = '.$userid.' and month(fecha) = '.$mes.' group by fec order by fec desc';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:363

## Q0482

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `userid`, `fecha`
- Archivo:l?nea: `backend/bkend_videos_stats.php:355-357`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select date(fecha) as fec, count(*) as count from video_audiolibros where userid = '.$userid.' group by fec order by fec desc';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en backend/bkend_videos_stats.php:363

## Q0483

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `uri`
- Archivo:l?nea: `backend/f_libro_videos_insert.php:52`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '".mpdb_real_escape_string($p_video)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/f_libro_videos_insert.php:54

## Q0484

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `uri`
- Archivo:l?nea: `backend/f_libro_videos_insert.php:56`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = '".mpdb_real_escape_string($p_video)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en backend/f_libro_videos_insert.php:58

## Q0485

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:6`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT ID, post_title FROM $wpdb->posts WHERE post_status = 'draft' AND post_author = $user_id ORDER BY ID DESC";
```

- Notas: QUERY DIN?MICA

## Q0486

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:22`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$other_drafts = $wpdb->get_results("SELECT ID, post_title FROM $wpdb->posts WHERE post_status = 'draft' AND post_author IN ($editable) AND post_author != '$user_id' ");
```

- Notas: QUERY DIN?MICA

## Q0487

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:37`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$authors = $wpdb->get_results( "SELECT * FROM $wpdb->users WHERE ID IN ($editable) ORDER BY display_name" );
```

- Notas: QUERY DIN?MICA

## Q0488

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:57`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = '$level_key'";
```

- Notas: QUERY DIN?MICA

## Q0489

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:68`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = '$level_key' AND meta_value != '0'";
```

- Notas: QUERY DIN?MICA

## Q0490

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:77`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = '$level_key' AND meta_value = '0'";
```

- Notas: QUERY DIN?MICA

## Q0491

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_parent`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:112`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->categories (cat_ID, cat_name, category_nicename, category_description, category_parent) VALUES ('0', '$cat_name', '$category_nicename', '$category_description', '$category_parent')");
```

- Notas: QUERY DIN?MICA

## Q0492

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:120`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->categories SET category_nicename = '$category_nicename' WHERE cat_ID = '$cat_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0493

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:167`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->categories WHERE cat_ID = '$cat_ID'");
```

- Notas: QUERY DIN?MICA

## Q0494

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_parent`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:170`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->categories SET category_parent = '$parent' WHERE category_parent = '$cat_ID'");
```

- Notas: QUERY DIN?MICA

## Q0495

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:174`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->post2cat SET category_id='$default_cat' WHERE category_id='$cat_ID'");
```

- Notas: QUERY DIN?MICA

## Q0496

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:220`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_ids = $wpdb->get_col("SELECT ID FROM $wpdb->posts WHERE post_author = $id");
```

- Notas: QUERY DIN?MICA

## Q0497

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:228`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->links WHERE link_owner = $id");
```

- Notas: QUERY DIN?MICA

## Q0498

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:231`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_author = {$reassign} WHERE post_author = {$id}");
```

- Notas: QUERY DIN?MICA

## Q0499

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:232`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->links SET link_owner = {$reassign} WHERE link_owner = {$id}");
```

- Notas: QUERY DIN?MICA

## Q0500

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:236`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->users WHERE ID = $id");
```

- Notas: QUERY DIN?MICA

## Q0501

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`, `id`
- Archivo:l?nea: `blog/wp-admin/admin-db.php:237`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->usermeta WHERE user_id = '$id'");
```

- Notas: QUERY DIN?MICA

## Q0502

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:250`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$link = $wpdb->get_row("SELECT * FROM $wpdb->links WHERE link_id = '$link_id'");
```

- Notas: QUERY DIN?MICA

## Q0503

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:320-326`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->links SET link_url='$link_url', link_name='$link_name', link_image='$link_image', link_target='$link_target', link_category='$link_category', link_visible='$link_visible', link_description='$link_description', link_rating='$link_rating', link_rel='$link_rel', link_notes='$link_notes', link_rss = '$link_rss' WHERE link_id='$link_id'");
```

- Notas: QUERY DIN?MICA

## Q0504

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:328`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_image, link_target, link_category, link_description, link_visible, link_owner, link_rating, link_rel, link_notes, link_rss) VALUES('$link_url','$link_name', '$link_image', '$link_target', '$link_category', '$link_description', '$link_visible', '$link_owner', '$link_rating', '$link_rel', '$link_notes', '$link_rss')");
```

- Notas: QUERY DIN?MICA

## Q0505

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-db.php:360`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
return $wpdb->query("DELETE FROM $wpdb->links WHERE link_id = '$link_id'");
```

- Notas: QUERY DIN?MICA

## Q0506

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:86`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
return $wpdb->query("UPDATE $wpdb->posts SET post_parent = $new_ID WHERE post_parent = $old_ID");
```

- Notas: QUERY DIN?MICA

## Q0507

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:559-563`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$checked_categories = $wpdb->get_col(" SELECT category_id FROM $wpdb->categories, $wpdb->post2cat WHERE $wpdb->post2cat.category_id = cat_ID AND $wpdb->post2cat.post_id = '$post_ID' ");
```

- Notas: QUERY DIN?MICA

## Q0508

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:612`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$categories = $wpdb->get_results("SELECT * FROM $wpdb->categories ORDER BY cat_name");
```

- Notas: QUERY DIN?MICA

## Q0509

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:624`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$edit .= "<td><a href='" . wp_nonce_url("categories.php?action=delete&amp;cat_ID=$category->cat_ID", 'delete-category_' . $category->cat_ID ) . "' onclick=\"return deleteSomething( 'cat', $category->cat_ID, '" . sprintf(__("You are about to delete the category &quot;%s&quot;. All of its posts will go to the default category.\\n&quot;OK&quot; to delete, &quot;Cancel&quot; to stop."), js_escape($category->cat_name))."' );\" class='delete'>".__('Delete')."</a>";
```

- Notas: QUERY DIN?MICA

## Q0510

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:648`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pages = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE post_status = 'static' ORDER BY menu_order");
```

- Notas: QUERY DIN?MICA

## Q0511

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:684`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$categories = $wpdb->get_results("SELECT * FROM $wpdb->categories ORDER BY cat_name");
```

- Notas: QUERY DIN?MICA

## Q0512

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:689`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$count = $wpdb->get_var("SELECT COUNT(post_id) FROM $wpdb->post2cat WHERE category_id = $category->cat_ID");
```

- Notas: QUERY DIN?MICA

## Q0513

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:707`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT cat_id, cat_name, auto_toggle FROM $wpdb->linkcategories ORDER BY cat_id");
```

- Notas: QUERY DIN?MICA

## Q0514

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:883-887`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$keys = $wpdb->get_col(" SELECT meta_key FROM $wpdb->postmeta GROUP BY meta_key ORDER BY meta_key");
```

- Notas: QUERY DIN?MICA

## Q0515

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:894-899`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$keys = $wpdb->get_col(" SELECT meta_key FROM $wpdb->postmeta GROUP BY meta_key ORDER BY meta_id DESC LIMIT 10");
```

- Notas: QUERY DIN?MICA

## Q0516

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:950-954`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->query(" INSERT INTO $wpdb->postmeta (post_id,meta_key,meta_value) VALUES ('$post_ID','$metakey','$metavalue') ");
```

- Notas: QUERY DIN?MICA

## Q0517

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:961`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->query("DELETE FROM $wpdb->postmeta WHERE meta_id = '$mid'");
```

- Notas: QUERY DIN?MICA

## Q0518

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:969`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
return $wpdb->query("UPDATE $wpdb->postmeta SET meta_key = '$mkey', meta_value = '$mvalue' WHERE meta_id = '$mid'");
```

- Notas: QUERY DIN?MICA

## Q0519

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/admin-functions.php:1229`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$items = $wpdb->get_results("SELECT ID, post_parent, post_title FROM $wpdb->posts WHERE post_parent = $parent AND post_status = 'static' ORDER BY menu_order");
```

- Notas: QUERY DIN?MICA

## Q0520

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:47`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_id = $wpdb->get_var("SELECT comment_post_ID FROM $wpdb->comments WHERE comment_ID = $comment");
```

- Notas: QUERY DIN?MICA

## Q0521

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:48`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$authordata = get_userdata( $wpdb->get_var("SELECT post_author FROM $wpdb->posts WHERE ID = $post_id") );
```

- Notas: QUERY DIN?MICA

## Q0522

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`, `spam`
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:59-66`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE (comment_author LIKE '%$s%' OR comment_author_email LIKE '%$s%' OR comment_author_url LIKE ('%$s%') OR comment_author_IP LIKE ('%$s%') OR comment_content LIKE ('%$s%') ) AND comment_approved != 'spam' ORDER BY comment_date DESC");
```

- Notas: QUERY DIN?MICA

## Q0523

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:73`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_approved = '0' OR comment_approved = '1' ORDER BY comment_date DESC LIMIT $offset,20");
```

- Notas: QUERY DIN?MICA

## Q0524

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:86`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$authordata = get_userdata($wpdb->get_var("SELECT post_author FROM $wpdb->posts WHERE ID = $comment->comment_post_ID"));
```

- Notas: QUERY DIN?MICA

## Q0525

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:105`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_title = $wpdb->get_var("SELECT post_title FROM $wpdb->posts WHERE ID = $comment->comment_post_ID");
```

- Notas: QUERY DIN?MICA

## Q0526

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-comments.php:141`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$authordata = get_userdata($wpdb->get_var("SELECT post_author FROM $wpdb->posts WHERE ID = $comment->comment_post_ID"));
```

- Notas: QUERY DIN?MICA

## Q0527

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-form-advanced.php:288`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
<?php if ('edit' == $action) : $delete_nonce = wp_create_nonce( 'delete-post_' . $post_ID ); ?>
```

- Notas: QUERY DIN?MICA

## Q0528

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-link-form.php:7`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$nonce_action = 'update-bookmark_' . $link_id;
```

- Notas: QUERY DIN?MICA

## Q0529

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-page-form.php:13`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$nonce_action = 'update-post_' . $post_ID;
```

- Notas: QUERY DIN?MICA

## Q0530

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-page-form.php:224`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$delete_nonce = wp_create_nonce( 'delete-page_' . $post_ID ); ?>
```

- Notas: QUERY DIN?MICA

## Q0531

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit-pages.php:28`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$posts = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE post_status = 'static'");
```

- Notas: QUERY DIN?MICA

## Q0532

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/edit.php:87`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
<?php $arc_result = $wpdb->get_results("SELECT DISTINCT YEAR(post_date) AS yyear, MONTH(post_date) AS mmonth FROM $wpdb->posts WHERE post_date != '0000-00-00 00:00:00' ORDER BY post_date DESC");
```

- Notas: QUERY DIN?MICA

## Q0533

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`, `spam`, `id`
- Archivo:l?nea: `blog/wp-admin/edit.php:248`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = $id AND comment_approved != 'spam' ORDER BY comment_date");
```

- Notas: QUERY DIN?MICA

## Q0534

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/execute-pings.php:6-7`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
while ($ping = $wpdb->get_row("SELECT * FROM {$wpdb->posts}, {$wpdb->postmeta} WHERE {$wpdb->posts}.ID = {$wpdb->postmeta}.post_id AND {$wpdb->postmeta}.meta_key = '_pingme' LIMIT 1")) { $wpdb->query("DELETE FROM {$wpdb->postmeta} WHERE post_id = {$ping->ID} AND meta_key = '_pingme';");
```

- Notas: QUERY DIN?MICA

## Q0535

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/execute-pings.php:12-13`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
while ($enclosure = $wpdb->get_row("SELECT * FROM {$wpdb->posts}, {$wpdb->postmeta} WHERE {$wpdb->posts}.ID = {$wpdb->postmeta}.post_id AND {$wpdb->postmeta}.meta_key = '_encloseme' LIMIT 1")) { $wpdb->query("DELETE FROM {$wpdb->postmeta} WHERE post_id = {$enclosure->ID} AND meta_key = '_encloseme';");
```

- Notas: QUERY DIN?MICA

## Q0536

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/execute-pings.php:18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$trackbacks = $wpdb->get_results("SELECT ID FROM $wpdb->posts WHERE CHAR_LENGTH(TRIM(to_ping)) > 7 AND post_status != 'draft'");
```

- Notas: QUERY DIN?MICA

## Q0537

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`, `categories`
- Columnas detectadas: `name`
- Archivo:l?nea: `blog/wp-admin/import/dotclear.php:12`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$name = $wpdb->get_var('SELECT cat_ID FROM '.$wpdb->categories.' WHERE category_nicename="'.$category_nicename.'"');
```

- Notas: QUERY DIN?MICA

## Q0538

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/import/mt.php:33`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$users = $wpdb->get_results("SELECT * FROM $wpdb->users ORDER BY ID");
```

- Notas: QUERY DIN?MICA

## Q0539

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`, `categories`
- Columnas detectadas: `name`
- Archivo:l?nea: `blog/wp-admin/import/textpattern.php:12`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$name = $wpdb->get_var('SELECT cat_ID FROM '.$wpdb->categories.' WHERE category_nicename="'.$category_nicename.'"');
```

- Notas: QUERY DIN?MICA

## Q0540

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/index.php:35`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT comment_author, comment_author_url, comment_ID, comment_post_ID FROM $wpdb->comments WHERE comment_approved = '1' ORDER BY comment_date_gmt DESC LIMIT 5");
```

- Notas: QUERY DIN?MICA

## Q0541

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/index.php:36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numcomments = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->comments WHERE comment_approved = '0'");
```

- Notas: QUERY DIN?MICA

## Q0542

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `title`
- Archivo:l?nea: `blog/wp-admin/index.php:63-66`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $recentposts = $wpdb->get_results("SELECT ID, post_title FROM $wpdb->posts WHERE post_status = 'publish' AND post_date_gmt < '$today' ORDER BY post_date DESC LIMIT 5") ) : ?> <div> <h3><?php _e('Posts'); ?> <a href="edit.php" title="<?php _e('More posts...'); ?>">&raquo;</a></h3>
```

- Notas: QUERY DIN?MICA

## Q0543

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/index.php:82-90`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $scheduled = $wpdb->get_results("SELECT ID, post_title, post_date_gmt FROM $wpdb->posts WHERE post_status = 'publish' AND post_date_gmt > '$today' ORDER BY post_date ASC") ) : ?> <div> <h3><?php _e('Scheduled Entries:') ?></h3> <ul> <?php foreach ($scheduled as $post) { if ($post->post_title == '') $post->post_title = sprintf(__('Post #%s'), $post->ID);
```

- Notas: QUERY DIN?MICA

## Q0544

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/index.php:101`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numposts = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_status = 'publish'");
```

- Notas: QUERY DIN?MICA

## Q0545

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/index.php:104`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numcomms = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->comments WHERE comment_approved = '1'");
```

- Notas: QUERY DIN?MICA

## Q0546

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/index.php:107`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numcats = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->categories");
```

- Notas: QUERY DIN?MICA

## Q0547

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/inline-uploading.php:133`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$start = $wpdb->get_var("SELECT count(ID) FROM $wpdb->posts WHERE post_status = 'attachment' $and_user $and_post") - $num;
```

- Notas: QUERY DIN?MICA

## Q0548

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/inline-uploading.php:143`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$attachments = $wpdb->get_results("SELECT ID, post_date, post_title, post_mime_type, guid FROM $wpdb->posts WHERE post_status = 'attachment' $and_type $and_post $and_user ORDER BY $sort LIMIT $start, $double", ARRAY_A);
```

- Notas: QUERY DIN?MICA

## Q0549

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/inline-uploading.php:169`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$__delete = __('Delete');
```

- Notas: QUERY DIN?MICA

## Q0550

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `the`
- Columnas detectadas: `server`
- Archivo:l?nea: `blog/wp-admin/inline-uploading.php:182`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$__confirmdelete = __('Delete this file from the server?');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0551

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/inline-uploading.php:652-653`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
<?php if ( $attachments = $wpdb->get_results("SELECT ID FROM $wpdb->posts WHERE post_parent = '$post'") ) { ?> <li<?php echo $current_2; ?>><a href="<?php echo basename(__FILE__) . "?action=view&amp;post=$post&amp;all=false"; ?>"><?php _e('Browse'); ?></a></li>
```

- Notas: QUERY DIN?MICA

## Q0552

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:81`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$installed = $wpdb->get_results("SELECT * FROM $wpdb->users");
```

- Notas: QUERY DIN?MICA

## Q0553

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:149`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->linkcategories (cat_id, cat_name) VALUES (1, '".$wpdb->escape(__('Blogroll'))."')");
```

- Notas: QUERY DIN?MICA

## Q0554

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:150`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://blogs.linux.ie/xeer/', 'Donncha', 1, 'http://blogs.linux.ie/xeer/feed/', '');");
```

- Notas: QUERY DIN?MICA

## Q0555

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:151`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://zengun.org/weblog/', 'Michel', 1, 'http://zengun.org/weblog/feed/', '');");
```

- Notas: QUERY DIN?MICA

## Q0556

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:152`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://boren.nu/', 'Ryan', 1, 'http://boren.nu/feed/', '');");
```

- Notas: QUERY DIN?MICA

## Q0557

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:153`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://photomatt.net/', 'Matt', 1, 'http://xml.photomatt.net/feed/', '');");
```

- Notas: QUERY DIN?MICA

## Q0558

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:154`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://zed1.com/journalized/', 'Mike', 1, 'http://zed1.com/journalized/feed/', '');");
```

- Notas: QUERY DIN?MICA

## Q0559

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:155`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://www.alexking.org/', 'Alex', 1, 'http://www.alexking.org/blog/wp-rss2.php', '');");
```

- Notas: QUERY DIN?MICA

## Q0560

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:156`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://dougal.gunters.org/', 'Dougal', 1, 'http://dougal.gunters.org/feed/', '');");
```

- Notas: QUERY DIN?MICA

## Q0561

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:157`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->links (link_url, link_name, link_category, link_rss, link_notes) VALUES ('http://wordpress-es.sourceforge.net/', 'WordPress-ES', 1, 'http://wordpress-es.sourceforge.net/?feed=rss2', '');");
```

- Notas: QUERY DIN?MICA

## Q0562

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:160`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->categories (cat_ID, cat_name, category_nicename, category_count, category_description) VALUES ('0', '".$wpdb->escape(__('Uncategorized'))."', '".sanitize_title(__('Uncategorized'))."', '1', '')");
```

- Notas: QUERY DIN?MICA

## Q0563

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:165`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->posts (post_author, post_date, post_date_gmt, post_content, post_excerpt, post_title, post_category, post_name, post_modified, post_modified_gmt, comment_count, to_ping, pinged, post_content_filtered) VALUES ('1', '$now', '$now_gmt', '".$wpdb->escape(__('Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!'))."', '', '".$wpdb->escape(__('Hello world!'))."', '0', '".$wpdb->escape(__('hello-world'))."', '$now', '$now_gmt', '1', '', '', '')");
```

- Notas: QUERY DIN?MICA

## Q0564

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/install.php:167`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "INSERT INTO $wpdb->post2cat (`rel_id`, `post_id`, `category_id`) VALUES (1, 1, 1)" );
```

- Notas: QUERY DIN?MICA

## Q0565

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`
- Archivo:l?nea: `blog/wp-admin/install.php:170`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->comments (comment_post_ID, comment_author, comment_author_email, comment_author_url, comment_date, comment_date_gmt, comment_content) VALUES ('1', '".$wpdb->escape(__('Mr WordPress'))."', '', 'http://wordpress.org/', '$now', '$now_gmt', '".$wpdb->escape(__('Hi, this is a comment.<br />To delete a comment, just log in and view the post&#039;s comments. There you will have the option to edit or delete them.'))."')");
```

- Notas: QUERY DIN?MICA

## Q0566

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/install.php:173`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->posts (post_author, post_date, post_date_gmt, post_content, post_excerpt, post_title, post_category, post_name, post_modified, post_modified_gmt, post_status, to_ping, pinged, post_content_filtered) VALUES ('1', '$now', '$now_gmt', '".$wpdb->escape(__('This is an example of a WordPress page, you could edit this to put information about yourself or your site so readers know where you are coming from. You can create as many pages like this one or sub-pages as you like and manage all of your content inside of WordPress.'))."', '', '".$wpdb->escape(__('About'))."', '0', '".$wpdb->escape(__('about'))."', '$now', '$now_gmt', 'static', '', '', '')");
```

- Notas: QUERY DIN?MICA

## Q0567

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`, `user_email`, `user_pass`
- Archivo:l?nea: `blog/wp-admin/install.php:180`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->users (ID, user_login, user_pass, user_email, user_registered, display_name, user_nicename) VALUES ( '1', 'admin', MD5('$random_password'), '$admin_email', NOW(), '$display_name', 'admin')");
```

- Notas: QUERY DIN?MICA

## Q0568

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `user_level`, `user_id`
- Archivo:l?nea: `blog/wp-admin/install.php:181`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->usermeta (user_id, meta_key, meta_value) VALUES ({$wpdb->insert_id}, '{$table_prefix}user_level', '10');");
```

- Notas: QUERY DIN?MICA

## Q0569

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-admin/install.php:183`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->usermeta (user_id, meta_key, meta_value) VALUES ({$wpdb->insert_id}, '{$table_prefix}capabilities', '{$admin_caps}');");
```

- Notas: QUERY DIN?MICA

## Q0570

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-categories.php:74-78`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->linkcategories (cat_id, cat_name, auto_toggle, show_images, show_description, \n" . " show_rating, show_updated, sort_order, sort_desc, text_before_link, text_after_link, text_after_all, list_limit) \n" . " VALUES ('0', '$cat_name', '$auto_toggle', '$show_images', '$show_description', \n" . " '$show_rating', '$show_updated', '$sort_order', '$sort_desc', '$text_before_link', '$text_after_link', \n" . " '$text_after_all', $list_limit)");
```

- Notas: QUERY DIN?MICA

## Q0571

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-categories.php:96`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->linkcategories WHERE cat_id='$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0572

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-categories.php:97`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->links SET link_category=1 WHERE link_category='$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0573

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-categories.php:106-108`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$row = $wpdb->get_row("SELECT cat_id, cat_name, auto_toggle, show_images, show_description, " . " show_rating, show_updated, sort_order, sort_desc, text_before_link, text_after_link, " . " text_after_all, list_limit FROM $wpdb->linkcategories WHERE cat_id=$cat_id");
```

- Notas: QUERY DIN?MICA

## Q0574

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-categories.php:256-270`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->linkcategories set cat_name='$cat_name', auto_toggle='$auto_toggle', show_images='$show_images', show_description='$show_description', show_rating='$show_rating', show_updated='$show_updated', sort_order='$sort_order', sort_desc='$sort_desc', text_before_link='$text_before_link', text_after_link='$text_after_link', text_after_all='$text_after_all', list_limit=$list_limit WHERE cat_id=$cat_id ");
```

- Notas: QUERY DIN?MICA

## Q0575

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-categories.php:308-310`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT cat_id, cat_name, auto_toggle, show_images, show_description, " . " show_rating, show_updated, sort_order, sort_desc, text_before_link, text_after_link, " . " text_after_all, list_limit FROM $wpdb->linkcategories ORDER BY cat_id");
```

- Notas: QUERY DIN?MICA

## Q0576

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-import.php:49`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$categories = $wpdb->get_results("SELECT cat_id, cat_name, auto_toggle FROM $wpdb->linkcategories ORDER BY cat_id");
```

- Notas: QUERY DIN?MICA

## Q0577

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-import.php:110-111`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$query = "INSERT INTO $wpdb->links (link_url, link_name, link_target, link_category, link_description, link_owner, link_rss) VALUES('{$urls[$i]}', '".$wpdb->escape($names[$i])."', '', $cat_id, '".$wpdb->escape($descriptions[$i])."', $user_ID, '{$feeds[$i]}')\n";
```

- Notas: QUERY DIN?MICA; usa helper query en blog/wp-admin/link-import.php:112

## Q0578

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:56`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT link_id, link_owner FROM $wpdb->links LEFT JOIN $wpdb->users ON link_owner = ID WHERE link_id in ($all_links)");
```

- Notas: QUERY DIN?MICA

## Q0579

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:63`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $wpdb->query("update $wpdb->links SET link_owner='$newowner' WHERE link_id IN ($all_links)");
```

- Notas: QUERY DIN?MICA

## Q0580

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:82`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT link_id, link_visible FROM $wpdb->links WHERE link_id in ($all_links)");
```

- Notas: QUERY DIN?MICA

## Q0581

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:94`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $wpdb->query("update $wpdb->links SET link_visible='N' WHERE link_id IN ($all_linksoff)");
```

- Notas: QUERY DIN?MICA

## Q0582

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:99`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $wpdb->query("update $wpdb->links SET link_visible='Y' WHERE link_id IN ($all_linkson)");
```

- Notas: QUERY DIN?MICA

## Q0583

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:120`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $wpdb->query("update $wpdb->links SET link_category='$category' WHERE link_id IN ($all_links)");
```

- Notas: QUERY DIN?MICA

## Q0584

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/link-manager.php:281`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT cat_id, cat_name, auto_toggle FROM $wpdb->linkcategories ORDER BY cat_id");
```

- Notas: QUERY DIN?MICA

## Q0585

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`
- Archivo:l?nea: `blog/wp-admin/link-manager.php:338-343`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT link_url, link_name, link_image, link_description, link_visible, link_category AS cat_id, cat_name AS category, $wpdb->users.user_login, link_id, link_rating, link_rel FROM $wpdb->links LEFT JOIN $wpdb->linkcategories ON $wpdb->links.link_category = $wpdb->linkcategories.cat_id LEFT JOIN $wpdb->users ON $wpdb->users.ID = $wpdb->links.link_owner ";
```

- Notas: QUERY DIN?MICA

## Q0586

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`
- Archivo:l?nea: `blog/wp-admin/link-manager.php:409`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT ID, user_login FROM $wpdb->users ORDER BY ID");
```

- Notas: QUERY DIN?MICA

## Q0587

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/list-manipulation.php:73-74`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
if ( $wpdb->query("DELETE FROM $wpdb->linkcategories WHERE cat_id='$id'") ) { $wpdb->query("UPDATE $wpdb->links SET link_category=1 WHERE link_category='$id'");
```

- Notas: QUERY DIN?MICA

## Q0588

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/menu.php:27`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$awaiting_mod = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->comments WHERE comment_approved = '0'");
```

- Notas: QUERY DIN?MICA

## Q0589

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `value`
- Archivo:l?nea: `blog/wp-admin/moderation.php:45-47`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
foreach($comment as $key => $value) { if ($feelinglucky && 'later' == $value) $value = 'delete';
```

- Notas: QUERY DIN?MICA

## Q0590

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/moderation.php:125`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_approved = '0'");
```

- Notas: QUERY DIN?MICA

## Q0591

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/moderation.php:143`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_title = $wpdb->get_var("SELECT post_title FROM $wpdb->posts WHERE ID='$comment->comment_post_ID'");
```

- Notas: QUERY DIN?MICA

## Q0592

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/options-writing.php:36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$categories = $wpdb->get_results("SELECT * FROM $wpdb->categories ORDER BY cat_name");
```

- Notas: QUERY DIN?MICA

## Q0593

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/options.php:150`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$options = $wpdb->get_results("SELECT * FROM $wpdb->options ORDER BY option_name");
```

- Notas: QUERY DIN?MICA

## Q0594

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `title`
- Archivo:l?nea: `blog/wp-admin/plugins.php:95`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$action = "<a href='" . wp_nonce_url("plugins.php?action=deactivate&amp;plugin=$plugin_file", 'deactivate-plugin_' . $plugin_file) . "' title='".__('Deactivate this plugin')."' class='delete'>".__('Deactivate')."</a>";
```

- Notas: QUERY DIN?MICA

## Q0595

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/post.php:22`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$action = "delete";
```

- Notas: QUERY DIN?MICA

## Q0596

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/update-links.php:8`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$link_uris = $wpdb->get_col("SELECT link_url FROM $wpdb->links");
```

- Notas: QUERY DIN?MICA

## Q0597

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `uri`
- Archivo:l?nea: `blog/wp-admin/update-links.php:41`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->links SET link_updated = '$time' WHERE link_url = '$uri'");
```

- Notas: QUERY DIN?MICA

## Q0598

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:45`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$posts = $wpdb->get_results("SELECT ID, post_title, post_name FROM $wpdb->posts WHERE post_name = ''");
```

- Notas: QUERY DIN?MICA

## Q0599

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:50`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_name = '$newtitle' WHERE ID = '$post->ID'");
```

- Notas: QUERY DIN?MICA

## Q0600

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:55`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$categories = $wpdb->get_results("SELECT cat_ID, cat_name, category_nicename FROM $wpdb->categories");
```

- Notas: QUERY DIN?MICA

## Q0601

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:59`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->categories SET category_nicename = '$newtitle' WHERE cat_ID = '$category->cat_ID'");
```

- Notas: QUERY DIN?MICA

## Q0602

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:64-66`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->options SET option_value = REPLACE(option_value, 'wp-links/links-images/', 'wp-images/links/') WHERE option_name LIKE 'links_rating_image%' AND option_value LIKE 'wp-links/links-images/%'");
```

- Notas: QUERY DIN?MICA

## Q0603

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:68`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$done_ids = $wpdb->get_results("SELECT DISTINCT post_id FROM $wpdb->post2cat");
```

- Notas: QUERY DIN?MICA

## Q0604

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:78`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$allposts = $wpdb->get_results("SELECT ID, post_category FROM $wpdb->posts WHERE post_category != '0' $catwhere");
```

- Notas: QUERY DIN?MICA

## Q0605

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:82`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cat = $wpdb->get_row("SELECT * FROM $wpdb->post2cat WHERE post_id = $post->ID AND category_id = $post->post_category");
```

- Notas: QUERY DIN?MICA

## Q0606

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:84-89`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query(" INSERT INTO $wpdb->post2cat (post_id, category_id) VALUES ('$post->ID', '$post->post_category') ");
```

- Notas: QUERY DIN?MICA

## Q0607

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:113`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$users = $wpdb->get_results("SELECT ID, user_nickname, user_nicename FROM $wpdb->users");
```

- Notas: QUERY DIN?MICA

## Q0608

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:117`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->users SET user_nicename = '$newname' WHERE ID = '$user->ID'");
```

- Notas: QUERY DIN?MICA

## Q0609

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_pass`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:121`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$users = $wpdb->get_results("SELECT ID, user_pass from $wpdb->users");
```

- Notas: QUERY DIN?MICA

## Q0610

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`, `users`
- Columnas detectadas: `user_pass`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:124`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query('UPDATE '.$wpdb->users.' SET user_pass = MD5(\''.$row->user_pass.'\') WHERE ID = \''.$row->ID.'\'');
```

- Notas: QUERY DIN?MICA

## Q0611

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:149`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$got_gmt_fields = ($wpdb->get_var("SELECT MAX(post_date_gmt) FROM $wpdb->posts") == '0000-00-00 00:00:00') ? false : true;
```

- Notas: QUERY DIN?MICA

## Q0612

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:156`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_date_gmt = DATE_ADD(post_date, INTERVAL '$add_hours:$add_minutes' HOUR_MINUTE)");
```

- Notas: QUERY DIN?MICA

## Q0613

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:157`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_modified = post_date");
```

- Notas: QUERY DIN?MICA

## Q0614

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:158`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_modified_gmt = DATE_ADD(post_modified, INTERVAL '$add_hours:$add_minutes' HOUR_MINUTE) WHERE post_modified != '0000-00-00 00:00:00'");
```

- Notas: QUERY DIN?MICA

## Q0615

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:159`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->comments SET comment_date_gmt = DATE_ADD(comment_date, INTERVAL '$add_hours:$add_minutes' HOUR_MINUTE)");
```

- Notas: QUERY DIN?MICA

## Q0616

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:160`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->users SET user_registered = DATE_ADD(user_registered, INTERVAL '$add_hours:$add_minutes' HOUR_MINUTE)");
```

- Notas: QUERY DIN?MICA

## Q0617

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:169`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$posts = $wpdb->get_results("SELECT ID, post_title, post_content, post_excerpt, guid, post_date, post_name, post_status, post_author FROM $wpdb->posts");
```

- Notas: QUERY DIN?MICA

## Q0618

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:180`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_title = '$post_title', post_content = '$post_content', post_excerpt = '$post_excerpt', guid = '$guid' WHERE ID = '$post->ID'");
```

- Notas: QUERY DIN?MICA

## Q0619

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:185`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT comment_ID, comment_author, comment_content FROM $wpdb->comments");
```

- Notas: QUERY DIN?MICA

## Q0620

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:190`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->comments SET comment_content = '$comment_content', comment_author = '$comment_author' WHERE comment_ID = '$comment->comment_ID'");
```

- Notas: QUERY DIN?MICA

## Q0621

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:195`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$links = $wpdb->get_results("SELECT link_id, link_name, link_description FROM $wpdb->links");
```

- Notas: QUERY DIN?MICA

## Q0622

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:200`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->links SET link_name = '$link_name', link_description = '$link_description' WHERE link_id = '$link->link_id'");
```

- Notas: QUERY DIN?MICA

## Q0623

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:206`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->options SET option_value = 'posts' WHERE option_name = 'what_to_show'");
```

- Notas: QUERY DIN?MICA

## Q0624

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:225`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->comments SET comment_type='trackback', comment_content = REPLACE(comment_content, '<trackback />', '') WHERE comment_content LIKE '<trackback />%'");
```

- Notas: QUERY DIN?MICA

## Q0625

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:226`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->comments SET comment_type='pingback', comment_content = REPLACE(comment_content, '<pingback />', '') WHERE comment_content LIKE '<pingback />%'");
```

- Notas: QUERY DIN?MICA

## Q0626

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:229`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$options = $wpdb->get_results("SELECT option_name, COUNT(option_name) AS dupes FROM `$wpdb->options` GROUP BY option_name");
```

- Notas: QUERY DIN?MICA

## Q0627

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:233`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dupe_ids = $wpdb->get_col("SELECT option_id FROM $wpdb->options WHERE option_name = '$option->option_name' LIMIT $limit");
```

- Notas: QUERY DIN?MICA

## Q0628

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:235`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->options WHERE option_id IN ($dupe_ids)");
```

- Notas: QUERY DIN?MICA

## Q0629

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:247`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$users = $wpdb->get_results("SELECT * FROM $wpdb->users");
```

- Notas: QUERY DIN?MICA

## Q0630

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:278`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->users SET display_name = '$id' WHERE ID = '$user->ID'");
```

- Notas: QUERY DIN?MICA

## Q0631

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:297`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$categories = $wpdb->get_col("SELECT cat_ID FROM $wpdb->categories");
```

- Notas: QUERY DIN?MICA

## Q0632

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:299`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$count = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->post2cat, $wpdb->posts WHERE $wpdb->posts.ID=$wpdb->post2cat.post_id AND post_status='publish' AND category_id = '$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0633

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:300`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->categories SET category_count = '$count' WHERE cat_ID = '$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0634

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:305`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results( "SELECT comment_post_ID, COUNT(*) as c FROM $wpdb->comments WHERE comment_approved = '1' GROUP BY comment_post_ID" );
```

- Notas: QUERY DIN?MICA

## Q0635

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:308`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET comment_count = $comment->c WHERE ID = '$comment->comment_post_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0636

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:315`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$objects = $wpdb->get_results("SELECT ID, post_type FROM $wpdb->posts WHERE post_status = 'object'");
```

- Notas: QUERY DIN?MICA

## Q0637

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:317-320`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_status = 'attachment', post_mime_type = '$object->post_type', post_type = '' WHERE ID = $object->ID");
```

- Notas: QUERY DIN?MICA

## Q0638

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:398-402`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ($options = $wpdb->get_results("SELECT option_name, option_value FROM $wpdb->options")) { foreach ($options as $option) { // "When trying to design a foolproof system, // never underestimate the ingenuity of the fools :)" -- Dougal if ('siteurl' == $option->option_name) $option->option_value = preg_replace('|/+$|', '', $option->option_value);
```

- Notas: QUERY DIN?MICA

## Q0639

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `setting`
- Archivo:l?nea: `blog/wp-admin/upgrade-functions.php:415`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$option = $wpdb->get_var("SELECT option_value FROM $wpdb->options WHERE option_name = '$setting'");
```

- Notas: QUERY DIN?MICA

## Q0640

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/upgrade-schema.php:246`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->options SET `autoload` = 'no' WHERE option_name = '$fatoption'");
```

- Notas: QUERY DIN?MICA

## Q0641

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`
- Archivo:l?nea: `blog/wp-admin/users.php:104`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$all_logins = $wpdb->get_results("SELECT ID, user_login FROM $wpdb->users ORDER BY user_login");
```

- Notas: QUERY DIN?MICA

## Q0642

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/users.php:147`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$userids = $wpdb->get_col("SELECT ID FROM $wpdb->users;");
```

- Notas: QUERY DIN?MICA

## Q0643

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-admin/users.php:238`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numposts = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_author = '$user_object->ID' and post_status = 'publish'");
```

- Notas: QUERY DIN?MICA

## Q0644

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `status`
- Archivo:l?nea: `blog/wp-comments-post.php:8`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$status = $wpdb->get_row("SELECT post_status, comment_status FROM $wpdb->posts WHERE ID = '$comment_post_ID'");
```

- Notas: QUERY DIN?MICA

## Q0645

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`, `id`
- Archivo:l?nea: `blog/wp-commentsrss2.php:31-37`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT comment_ID, comment_author, comment_author_email, comment_author_url, comment_date, comment_date_gmt, comment_content, comment_post_ID, $wpdb->posts.ID, $wpdb->posts.post_password FROM $wpdb->comments LEFT JOIN $wpdb->posts ON comment_post_id = id WHERE comment_post_ID = '$id' AND $wpdb->comments.comment_approved = '1' AND $wpdb->posts.post_status IN ('publish', 'static', 'object') AND post_date_gmt < '" . gmdate("Y-m-d H:i:59") . "' ORDER BY comment_date_gmt DESC LIMIT " . get_settings('posts_per_rss') );
```

- Notas: QUERY DIN?MICA

## Q0646

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`, `id`
- Archivo:l?nea: `blog/wp-commentsrss2.php:39-44`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT comment_ID, comment_author, comment_author_email, comment_author_url, comment_date, comment_date_gmt, comment_content, comment_post_ID, $wpdb->posts.ID, $wpdb->posts.post_password FROM $wpdb->comments LEFT JOIN $wpdb->posts ON comment_post_id = id WHERE $wpdb->posts.post_status IN ('publish', 'static', 'object') AND $wpdb->comments.comment_approved = '1' AND post_date_gmt < '" . gmdate("Y-m-d H:i:s") . "' ORDER BY comment_date_gmt DESC LIMIT " . get_settings('posts_per_rss') );
```

- Notas: QUERY DIN?MICA

## Q0647

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `spam`
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:147`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->comments WHERE DATE_SUB('$now_gmt', INTERVAL 15 DAY) > comment_date_gmt AND comment_approved = 'spam'");
```

- Notas: QUERY DIN?MICA

## Q0648

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:163`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comment = $wpdb->get_row("SELECT * FROM $wpdb->comments WHERE comment_ID = '$comment_id'");
```

- Notas: QUERY DIN?MICA

## Q0649

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:176`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comment = $wpdb->get_row("SELECT * FROM $wpdb->comments WHERE comment_ID = '$comment_id'");
```

- Notas: QUERY DIN?MICA

## Q0650

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `spam`
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:197`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$count = $wpdb->get_var("SELECT COUNT(comment_ID) FROM $wpdb->comments WHERE comment_approved = 'spam'");
```

- Notas: QUERY DIN?MICA

## Q0651

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:220`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->comments SET comment_approved = '1' WHERE comment_ID = '$comment'");
```

- Notas: QUERY DIN?MICA

## Q0652

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `spam`
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:231`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$nuked = $wpdb->query( "DELETE FROM $wpdb->comments WHERE comment_approved = 'spam' AND '$delete_time' > comment_date_gmt" );
```

- Notas: QUERY DIN?MICA

## Q0653

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`, `spam`
- Archivo:l?nea: `blog/wp-content/plugins/akismet/akismet.php:267`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_approved = 'spam' ORDER BY comment_date DESC LIMIT 150");
```

- Notas: QUERY DIN?MICA

## Q0654

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/plugins/wp-db-backup.php:202`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$rec_count = $wpdb->get_var("SELECT count(*) FROM {$table}");
```

- Notas: QUERY DIN?MICA

## Q0655

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/plugins/wp-db-backup.php:499`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$table_data = $wpdb->get_results("SELECT * FROM $table LIMIT {$row_start}, {$row_inc}", ARRAY_A);
```

- Notas: QUERY DIN?MICA

## Q0656

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/plugins/wp-db-backup.php:508`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$entries = 'INSERT INTO ' . $this->backquote($table) . ' VALUES (';
```

- Notas: QUERY DIN?MICA

## Q0657

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`
- Archivo:l?nea: `blog/wp-content/themes/freedom-blue-plus/functions.php:35-37`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$request = "SELECT ID, comment_ID, comment_content, comment_author, comment_author_url, comment_date, post_title, comment_type FROM $wpdb->comments LEFT JOIN $wpdb->posts ON $wpdb->posts.ID=$wpdb->comments.comment_post_ID WHERE post_status IN ('publish','static')";
```

- Notas: QUERY DIN?MICA

## Q0658

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`
- Archivo:l?nea: `blog/wp-content/themes/freedom-blue-plus/recent_comments.php:35-37`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$request = "SELECT ID, comment_ID, comment_content, comment_author, comment_author_url, comment_date, post_title, comment_type FROM $wpdb->comments LEFT JOIN $wpdb->posts ON $wpdb->posts.ID=$wpdb->comments.comment_post_ID WHERE post_status IN ('publish','static')";
```

- Notas: QUERY DIN?MICA

## Q0659

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/themes/fresh/bottom.php:7-10`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $recentposts = $wpdb->get_results("SELECT ID, post_title FROM $wpdb->posts WHERE post_status = 'publish' AND post_date_gmt < '$today' ORDER BY post_date DESC LIMIT 10")): ?> <h2><?php _e("Recent"); ?><span><?php _e(" Entries"); ?></span></h2>
```

- Notas: QUERY DIN?MICA

## Q0660

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/themes/fresh-compact/bottom.php:7-10`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $recentposts = $wpdb->get_results("SELECT ID, post_title FROM $wpdb->posts WHERE post_status = 'publish' AND post_date_gmt < '$today' ORDER BY post_date DESC LIMIT 10")): ?> <h2><?php _e("Recent"); ?><span><?php _e(" Entries"); ?></span></h2>
```

- Notas: QUERY DIN?MICA

## Q0661

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-content/themes/greyidea-10/functions.php:66`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$link_cats = $wpdb->get_results("SELECT cat_id, cat_name FROM $wpdb->linkcategories");
```

- Notas: QUERY DIN?MICA

## Q0662

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`
- Archivo:l?nea: `blog/wp-content/themes/redie-30/functions.php:30-32`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$request = "SELECT ID, comment_ID, comment_content, comment_author, comment_author_url, comment_date, post_title, comment_type FROM $wpdb->comments LEFT JOIN $wpdb->posts ON $wpdb->posts.ID=$wpdb->comments.comment_post_ID WHERE post_status IN ('publish','static')";
```

- Notas: QUERY DIN?MICA

## Q0663

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/cache.php:190-192`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ($dogs = $wpdb->get_results("SELECT * FROM $wpdb->categories")) { foreach ($dogs as $catt) $this->cache['category'][$catt->cat_ID] = $catt;
```

- Notas: QUERY DIN?MICA

## Q0664

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/cache.php:207-208`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if (!$options = $wpdb->get_results("SELECT option_name, option_value FROM $wpdb->options WHERE autoload = 'yes'")) { $options = $wpdb->get_results("SELECT option_name, option_value FROM $wpdb->options");
```

- Notas: QUERY DIN?MICA

## Q0665

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `WHERE`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/classes.php:642`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$start_date = $wpdb->get_var("SELECT max(post_date) FROM $wpdb->posts $join WHERE (1=1) $where GROUP BY year(post_date), month(post_date), dayofmonth(post_date) ORDER BY post_date DESC LIMIT $startrow,1");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0666

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `WHERE`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/classes.php:644`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$end_date = $wpdb->get_var("SELECT min(post_date) FROM $wpdb->posts $join WHERE (1=1) $where GROUP BY year(post_date), month(post_date), dayofmonth(post_date) ORDER BY post_date DESC LIMIT $endrow,1");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0667

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `WHERE`
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `blog/wp-includes/classes.php:662`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$request = " SELECT $distinct * FROM $wpdb->posts $join WHERE 1=1" . $where . " GROUP BY " . $groupby . " ORDER BY " . $orderby . " $limits";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0668

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/classes.php:821-822`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
if ( $wpdb->query("update $wpdb->comments set comment_approved = '0' where comment_ID = '$comment'") ) { $cnt++;
```

- Notas: QUERY DIN?MICA

## Q0669

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:17`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND comment_approved = '1' ORDER BY comment_date");
```

- Notas: QUERY DIN?MICA

## Q0670

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:21`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post->ID' AND ( comment_approved = '1' OR ( comment_author = '$author_db' AND comment_author_email = '$email_db' AND comment_approved = '0' ) ) ORDER BY comment_date");
```

- Notas: QUERY DIN?MICA

## Q0671

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_parent`, `comment_date`, `user_id`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:81-85`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->query("INSERT INTO $wpdb->comments (comment_post_ID, comment_author, comment_author_email, comment_author_url, comment_author_IP, comment_date, comment_date_gmt, comment_content, comment_approved, comment_agent, comment_type, comment_parent, user_id) VALUES ('$comment_post_ID', '$comment_author', '$comment_author_email', '$comment_author_url', '$comment_author_IP', '$comment_date', '$comment_date_gmt', '$comment_content', '$comment_approved', '$comment_agent', '$comment_type', '$comment_parent', '$user_id') ");
```

- Notas: QUERY DIN?MICA

## Q0672

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:90`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$count = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->comments WHERE comment_post_ID = '$comment_post_ID' AND comment_approved = '1'");
```

- Notas: QUERY DIN?MICA

## Q0673

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:91`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET comment_count = $count WHERE ID = '$comment_post_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0674

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:113`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dupe = "SELECT comment_ID FROM $wpdb->comments WHERE comment_post_ID = '$comment_post_ID' AND ( comment_author = '$comment_author' ";
```

- Notas: QUERY DIN?MICA

## Q0675

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:121-122`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $lasttime = $wpdb->get_var("SELECT comment_date_gmt FROM $wpdb->comments WHERE comment_author_IP = '$comment_author_IP' OR comment_author_email = '$comment_author_email' ORDER BY comment_date DESC LIMIT 1") ) { $time_lastcomment = mysql2date('U', $lasttime);
```

- Notas: QUERY DIN?MICA

## Q0676

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:133`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_author = $wpdb->get_var("SELECT post_author FROM $wpdb->posts WHERE ID = '$comment_post_ID' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0677

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`, `comment_date`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:176-184`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->query( "UPDATE $wpdb->comments SET comment_content = '$comment_content', comment_author = '$comment_author', comment_author_email = '$comment_author_email', comment_approved = '$comment_approved', comment_author_url = '$comment_author_url', comment_date = '$comment_date' WHERE comment_ID = $comment_ID" );
```

- Notas: QUERY DIN?MICA

## Q0678

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:188`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$c = $wpdb->get_row( "SELECT count(*) as c FROM {$wpdb->comments} WHERE comment_post_ID = '$comment_post_ID' AND comment_approved = '1'" );
```

- Notas: QUERY DIN?MICA

## Q0679

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:190`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET comment_count = '$c->c' WHERE ID = '$comment_post_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0680

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:203-204`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
if ( ! $wpdb->query("DELETE FROM $wpdb->comments WHERE comment_ID='$comment_id' LIMIT 1") ) return false;
```

- Notas: QUERY DIN?MICA

## Q0681

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:208`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$count = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->comments WHERE comment_post_ID = '$post_id' AND comment_approved = '1'");
```

- Notas: QUERY DIN?MICA

## Q0682

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:209`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET comment_count = $count WHERE ID = '$post_id'" );
```

- Notas: QUERY DIN?MICA

## Q0683

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:557`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastcommentmodified = $wpdb->get_var("SELECT comment_date_gmt FROM $wpdb->comments WHERE comment_date_gmt <= '$now' ORDER BY comment_date_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0684

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_date`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:560`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastcommentmodified = $wpdb->get_var("SELECT comment_date FROM $wpdb->comments WHERE comment_date_gmt <= '$now' ORDER BY comment_date_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0685

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:563`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastcommentmodified = $wpdb->get_var("SELECT DATE_ADD(comment_date_gmt, INTERVAL '$add_seconds_server' SECOND) FROM $wpdb->comments WHERE comment_date_gmt <= '$now' ORDER BY comment_date_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0686

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:576`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT * FROM $wpdb->comments WHERE comment_ID = '$comment_ID'";
```

- Notas: QUERY DIN?MICA

## Q0687

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:785`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "UPDATE $wpdb->comments SET comment_approved='0' WHERE comment_ID='$comment_id' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q0688

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:788`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$query = "UPDATE $wpdb->comments SET comment_approved='1' WHERE comment_ID='$comment_id' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper query en blog/wp-includes/comment-functions.php:800

## Q0689

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`, `spam`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:791`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$query = "UPDATE $wpdb->comments SET comment_approved='spam' WHERE comment_ID='$comment_id' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper query en blog/wp-includes/comment-functions.php:800

## Q0690

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:805`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$c = $wpdb->get_row( "SELECT count(*) as c FROM {$wpdb->comments} WHERE comment_post_ID = '$comment_post_ID' AND comment_approved = '1'" );
```

- Notas: QUERY DIN?MICA

## Q0691

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:807`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET comment_count = '$c->c' WHERE ID = '$comment_post_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0692

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:817`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->get_var("SELECT comment_approved FROM $wpdb->comments WHERE comment_ID='$comment_id' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0693

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `email`
- Archivo:l?nea: `blog/wp-includes/comment-functions.php:875`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$ok_to_comment = $wpdb->get_var("SELECT comment_approved FROM $wpdb->comments WHERE comment_author = '$author' AND comment_author_email = '$email' and comment_approved = '1' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0694

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:105-107`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_name_check = ('publish' == $post_status) ? $wpdb->get_var("SELECT post_name FROM $wpdb->posts WHERE post_name = '$post_name' AND post_status = 'publish' AND ID != '$post_ID' LIMIT 1") : $wpdb->get_var("SELECT post_name FROM $wpdb->posts WHERE post_name = '$post_name' AND post_status = 'static' AND ID != '$post_ID' AND post_parent = '$post_parent' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0695

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:113-115`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post_name_check = ('publish' == $post_status) ? $wpdb->get_var("SELECT post_name FROM $wpdb->posts WHERE post_name = '$alt_post_name' AND post_status = 'publish' AND ID != '$post_ID' LIMIT 1") : $wpdb->get_var("SELECT post_name FROM $wpdb->posts WHERE post_name = '$alt_post_name' AND post_status = 'static' AND ID != '$post_ID' AND post_parent = '$post_parent' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0696

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:123-143`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE IGNORE $wpdb->posts SET post_author = '$post_author', post_date = '$post_date', post_date_gmt = '$post_date_gmt', post_content = '$post_content', post_content_filtered = '$post_content_filtered', post_title = '$post_title', post_excerpt = '$post_excerpt', post_status = '$post_status', comment_status = '$comment_status', ping_status = '$ping_status', post_password = '$post_password', post_name = '$post_name', to_ping = '$to_ping', pinged = '$pinged', post_modified = '".current_time('mysql')."', post_modified_gmt = '".current_time('mysql',1)."', post_parent = '$post_parent', menu_order = '$menu_order' WHERE ID = $post_ID");
```

- Notas: QUERY DIN?MICA

## Q0697

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:145-149`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "INSERT IGNORE INTO $wpdb->posts (post_author, post_date, post_date_gmt, post_content, post_content_filtered, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_parent, menu_order, post_mime_type) VALUES ('$post_author', '$post_date', '$post_date_gmt', '$post_content', '$post_content_filtered', '$post_title', '$post_excerpt', '$post_status', '$comment_status', '$ping_status', '$post_password', '$post_name', '$to_ping', '$pinged', '$post_date', '$post_date_gmt', '$post_parent', '$menu_order', '$post_mime_type')");
```

- Notas: QUERY DIN?MICA

## Q0698

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:155`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET post_name = '$post_name' WHERE ID = '$post_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0699

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:169`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET guid = '" . get_permalink($post_ID) . "' WHERE ID = '$post_ID'");
```

- Notas: QUERY DIN?MICA

## Q0700

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:174`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET guid = '" . get_permalink($post_ID) . "' WHERE ID = '$post_ID'");
```

- Notas: QUERY DIN?MICA

## Q0701

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:186-190`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->query(" INSERT INTO $wpdb->postmeta (post_id,meta_key,meta_value) VALUES ('$post_ID','_pingme','1') ");
```

- Notas: QUERY DIN?MICA

## Q0702

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:191-195`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->query(" INSERT INTO $wpdb->postmeta (post_id,meta_key,meta_value) VALUES ('$post_ID','_encloseme','1') ");
```

- Notas: QUERY DIN?MICA

## Q0703

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:299-320`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET post_author = '$post_author', post_date = '$post_date', post_date_gmt = '$post_date_gmt', post_content = '$post_content', post_title = '$post_title', post_excerpt = '$post_excerpt', post_status = '$post_status', comment_status = '$comment_status', ping_status = '$ping_status', post_password = '$post_password', post_name = '$post_name', to_ping = '$to_ping', pinged = '$pinged', post_modified = '".current_time('mysql')."', post_modified_gmt = '".current_time('mysql',1)."', post_parent = '$post_parent', menu_order = '$menu_order', post_mime_type = '$post_mime_type', guid = '$guid' WHERE ID = $post_ID");
```

- Notas: QUERY DIN?MICA

## Q0704

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:322-326`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "INSERT INTO $wpdb->posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_parent, menu_order, post_mime_type, guid) VALUES ('$post_author', '$post_date', '$post_date_gmt', '$post_content', '$post_title', '$post_excerpt', '$post_status', '$comment_status', '$ping_status', '$post_password', '$post_name', '$to_ping', '$pinged', '$post_date', '$post_date_gmt', '$post_parent', '$menu_order', '$post_mime_type', '$guid')");
```

- Notas: QUERY DIN?MICA

## Q0705

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:332`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "UPDATE $wpdb->posts SET post_name = '$post_name' WHERE ID = '$post_ID'" );
```

- Notas: QUERY DIN?MICA

## Q0706

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:355-356`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( !$post = $wpdb->get_row("SELECT * FROM $wpdb->posts WHERE ID = '$postid'") ) return $post;
```

- Notas: QUERY DIN?MICA

## Q0707

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:364`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->posts WHERE ID = '$postid'");
```

- Notas: QUERY DIN?MICA

## Q0708

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:366`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->comments WHERE comment_post_ID = '$postid'");
```

- Notas: QUERY DIN?MICA

## Q0709

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:368`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->post2cat WHERE post_id = '$postid'");
```

- Notas: QUERY DIN?MICA

## Q0710

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:370`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->postmeta WHERE post_id = '$postid'");
```

- Notas: QUERY DIN?MICA

## Q0711

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:374-375`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if (! $foo = $wpdb->get_row("SELECT meta_id FROM $wpdb->postmeta WHERE meta_key = '_wp_attachment_metadata' AND meta_value LIKE '%".$wpdb->escape($meta['thumb'])."%' AND post_id <> '$postid'")) @ unlink(str_replace(basename($file), $meta['thumb'], $file));
```

- Notas: QUERY DIN?MICA

## Q0712

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:410`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT * FROM $wpdb->posts WHERE post_status IN ('publish', 'draft', 'private') ORDER BY post_date DESC $limit";
```

- Notas: QUERY DIN?MICA

## Q0713

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:461-464`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT category_id FROM $wpdb->post2cat WHERE post_id = '$post_ID' ORDER BY category_id";
```

- Notas: QUERY DIN?MICA

## Q0714

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:483-486`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$old_categories = $wpdb->get_col(" SELECT category_id FROM $wpdb->post2cat WHERE post_id = $post_ID");
```

- Notas: QUERY DIN?MICA

## Q0715

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:499-503`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query(" DELETE FROM $wpdb->post2cat WHERE category_id = $del AND post_id = $post_ID ");
```

- Notas: QUERY DIN?MICA

## Q0716

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:512-514`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query(" INSERT INTO $wpdb->post2cat (post_id, category_id) VALUES ($post_ID, $new_cat)");
```

- Notas: QUERY DIN?MICA

## Q0717

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:521`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$count = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->post2cat, $wpdb->posts WHERE $wpdb->posts.ID=$wpdb->post2cat.post_id AND post_status='publish' AND category_id = '$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0718

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:522`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->categories SET category_count = '$count' WHERE cat_ID = '$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0719

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:531-532`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( !$post = $wpdb->get_row("SELECT * FROM $wpdb->posts WHERE ID = $postid") ) return $post;
```

- Notas: QUERY DIN?MICA

## Q0720

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:543`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->categories SET category_count = category_count - 1 WHERE cat_ID = '$cat_id'");
```

- Notas: QUERY DIN?MICA

## Q0721

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:550`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET post_parent = $post->post_parent WHERE post_parent = $postid AND post_status = 'static'");
```

- Notas: QUERY DIN?MICA

## Q0722

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:552`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->posts WHERE ID = $postid");
```

- Notas: QUERY DIN?MICA

## Q0723

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:554`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->comments WHERE comment_post_ID = $postid");
```

- Notas: QUERY DIN?MICA

## Q0724

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:556`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->post2cat WHERE post_id = $postid");
```

- Notas: QUERY DIN?MICA

## Q0725

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:558`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->postmeta WHERE post_id = $postid");
```

- Notas: QUERY DIN?MICA

## Q0726

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: `name`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:582`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$name = $wpdb->get_var("SELECT cat_name FROM $wpdb->categories WHERE cat_ID=$cat_id");
```

- Notas: QUERY DIN?MICA

## Q0727

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:591`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cid = $wpdb->get_var("SELECT cat_ID FROM $wpdb->categories WHERE cat_name='$cat_name'");
```

- Notas: QUERY DIN?MICA

## Q0728

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:699`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post = $wpdb->get_row("SELECT * FROM $wpdb->posts WHERE ID = $post_id");
```

- Notas: QUERY DIN?MICA

## Q0729

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:703`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET to_ping = '' WHERE ID = '$post_id'");
```

- Notas: QUERY DIN?MICA

## Q0730

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:727`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET to_ping = TRIM(REPLACE(to_ping, '$tb_ping', '')) WHERE ID = '$post_id'");
```

- Notas: QUERY DIN?MICA

## Q0731

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:734`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pung = $wpdb->get_var("SELECT pinged FROM $wpdb->posts WHERE ID = $post_id");
```

- Notas: QUERY DIN?MICA

## Q0732

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:762`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$to_ping = $wpdb->get_var("SELECT to_ping FROM $wpdb->posts WHERE ID = $post_id");
```

- Notas: QUERY DIN?MICA

## Q0733

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:771`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pung = $wpdb->get_var("SELECT pinged FROM $wpdb->posts WHERE ID = $post_id");
```

- Notas: QUERY DIN?MICA

## Q0734

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:777`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
return $wpdb->query("UPDATE $wpdb->posts SET pinged = '$new' WHERE ID = $post_id");
```

- Notas: QUERY DIN?MICA

## Q0735

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions-post.php:798`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$posts = get_page_hierarchy($wpdb->get_results("SELECT ID, post_name, post_parent FROM $wpdb->posts WHERE post_status = 'static'"));
```

- Notas: QUERY DIN?MICA

## Q0736

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-includes/functions-post.php:811`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$attachments = $wpdb->get_results("SELECT ID, post_name, post_parent FROM $wpdb->posts WHERE post_status = 'attachment' AND post_parent = '$id'");
```

- Notas: QUERY DIN?MICA

## Q0737

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:117`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastpostdate = $wpdb->get_var("SELECT post_date_gmt FROM $wpdb->posts WHERE post_date_gmt <= '$now' AND post_status = 'publish' ORDER BY post_date_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0738

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:120`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastpostdate = $wpdb->get_var("SELECT post_date FROM $wpdb->posts WHERE post_date_gmt <= '$now' AND post_status = 'publish' ORDER BY post_date_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0739

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:123`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastpostdate = $wpdb->get_var("SELECT DATE_ADD(post_date_gmt, INTERVAL '$add_seconds_server' SECOND) FROM $wpdb->posts WHERE post_date_gmt <= '$now' AND post_status = 'publish' ORDER BY post_date_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0740

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:141`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastpostmodified = $wpdb->get_var("SELECT post_modified_gmt FROM $wpdb->posts WHERE post_modified_gmt <= '$now' AND post_status = 'publish' ORDER BY post_modified_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0741

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:144`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastpostmodified = $wpdb->get_var("SELECT post_modified FROM $wpdb->posts WHERE post_modified_gmt <= '$now' AND post_status = 'publish' ORDER BY post_modified_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0742

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:147`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$lastpostmodified = $wpdb->get_var("SELECT DATE_ADD(post_modified_gmt, INTERVAL '$add_seconds_server' SECOND) FROM $wpdb->posts WHERE post_modified_gmt <= '$now' AND post_status = 'publish' ORDER BY post_modified_gmt DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0743

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `setting`
- Archivo:l?nea: `blog/wp-includes/functions.php:309`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$row = $wpdb->get_row("SELECT option_value FROM $wpdb->options WHERE option_name = '$setting' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0744

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:358-359`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( !$options = $wpdb->get_results("SELECT option_name, option_value FROM $wpdb->options WHERE autoload = 'yes'") ) { $options = $wpdb->get_results("SELECT option_name, option_value FROM $wpdb->options");
```

- Notas: QUERY DIN?MICA

## Q0745

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:402`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->options SET option_value = '$newvalue' WHERE option_name = '$option_name'");
```

- Notas: QUERY DIN?MICA

## Q0746

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `description`, `value`, `name`
- Archivo:l?nea: `blog/wp-includes/functions.php:432`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->options (option_name, option_value, option_description, autoload) VALUES ('$name', '$value', '$description', '$autoload')");
```

- Notas: QUERY DIN?MICA

## Q0747

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `name`
- Archivo:l?nea: `blog/wp-includes/functions.php:440`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$option_id = $wpdb->get_var("SELECT option_id FROM $wpdb->options WHERE option_name = '$name'");
```

- Notas: QUERY DIN?MICA

## Q0748

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `name`
- Archivo:l?nea: `blog/wp-includes/functions.php:442`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->options WHERE option_name = '$name'");
```

- Notas: QUERY DIN?MICA

## Q0749

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `value`
- Archivo:l?nea: `blog/wp-includes/functions.php:463`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->postmeta (post_id,meta_key,meta_value) VALUES ('$post_id','$key','$value')");
```

- Notas: QUERY DIN?MICA

## Q0750

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:474`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$meta_id = $wpdb->get_var("SELECT meta_id FROM $wpdb->postmeta WHERE post_id = '$post_id' AND meta_key = '$key'");
```

- Notas: QUERY DIN?MICA

## Q0751

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `value`
- Archivo:l?nea: `blog/wp-includes/functions.php:476`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$meta_id = $wpdb->get_var("SELECT meta_id FROM $wpdb->postmeta WHERE post_id = '$post_id' AND meta_key = '$key' AND meta_value = '$value'");
```

- Notas: QUERY DIN?MICA

## Q0752

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:483`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->postmeta WHERE post_id = '$post_id' AND meta_key = '$key'");
```

- Notas: QUERY DIN?MICA

## Q0753

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `value`
- Archivo:l?nea: `blog/wp-includes/functions.php:486`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->postmeta WHERE post_id = '$post_id' AND meta_key = '$key' AND meta_value = '$value'");
```

- Notas: QUERY DIN?MICA

## Q0754

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:511`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$metalist = $wpdb->get_results("SELECT meta_value FROM $wpdb->postmeta WHERE post_id = '$post_id' AND meta_key = '$key'", ARRAY_N);
```

- Notas: QUERY DIN?MICA

## Q0755

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `value`
- Archivo:l?nea: `blog/wp-includes/functions.php:551`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->postmeta SET meta_value = '$value' WHERE meta_key = '$key' AND post_id = '$post_id'");
```

- Notas: QUERY DIN?MICA

## Q0756

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `value`
- Archivo:l?nea: `blog/wp-includes/functions.php:557`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->postmeta SET meta_value = '$value' WHERE meta_key = '$key' AND post_id = '$post_id' AND meta_value = '$prev_value'");
```

- Notas: QUERY DIN?MICA

## Q0757

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:614`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT * FROM $wpdb->posts WHERE ID = '$post' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q0758

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:652`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT * FROM $wpdb->posts WHERE post_parent = $post_parent";
```

- Notas: QUERY DIN?MICA

## Q0759

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:717-720`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
} elseif ( $_page = wp_cache_get($page, 'pages') ) { // Got it. } else { $query = "SELECT * FROM $wpdb->posts WHERE ID= '$page' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q0760

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:770-771`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( ! $_category = wp_cache_get($category, 'category') ) { $_category = $wpdb->get_row("SELECT * FROM $wpdb->categories WHERE cat_ID = '$category' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0761

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:808`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_comment = $wpdb->get_row("SELECT * FROM $wpdb->comments WHERE comment_ID = '$comment' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0762

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:834-835`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( ! $cat_ids = wp_cache_get('all_category_ids', 'category') ) { $cat_ids = $wpdb->get_col("SELECT cat_ID FROM $wpdb->categories");
```

- Notas: QUERY DIN?MICA

## Q0763

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:845-846`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( ! $page_ids = wp_cache_get('all_page_ids', 'pages') ) { $page_ids = $wpdb->get_col("SELECT ID FROM $wpdb->posts WHERE post_status='static'");
```

- Notas: QUERY DIN?MICA

## Q0764

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:946`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->posts SET pinged = CONCAT(pinged, '\n', '$tb_url') WHERE ID = '$ID'");
```

- Notas: QUERY DIN?MICA

## Q0765

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:947`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
return $wpdb->query("UPDATE $wpdb->posts SET to_ping = TRIM(REPLACE(to_ping, '$tb_url', '')) WHERE ID = '$ID'");
```

- Notas: QUERY DIN?MICA

## Q0766

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:1083-1084`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query( "INSERT INTO `$wpdb->postmeta` ( `post_id` , `meta_key` , `meta_value` ) VALUES ( '$post_ID', 'enclosure' , '$meta_value')" );
```

- Notas: QUERY DIN?MICA

## Q0767

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`, `{COL_DYNAMIC}`
- Archivo:l?nea: `blog/wp-includes/functions.php:1375-1380`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$posts = $wpdb->get_results( "SELECT DISTINCT * FROM $wpdb->posts " . ( empty( $r['category'] ) ? "" : ", $wpdb->post2cat " ) . " WHERE post_date <= '$now' AND (post_status = 'publish') ". ( empty( $r['category'] ) ? "" : "AND $wpdb->posts.ID = $wpdb->post2cat.post_id AND $wpdb->post2cat.category_id = " . $r['category']. " " ) . " GROUP BY $wpdb->posts.ID ORDER BY " . $r['orderby'] . " " . $r['order'] . " LIMIT " . $r['offset'] . ',' . $r['numberposts'] );
```

- Notas: QUERY DIN?MICA

## Q0768

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:1439`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dogs = $wpdb->get_results("SELECT post_id, category_id FROM $wpdb->post2cat WHERE post_id IN ($post_ids)");
```

- Notas: QUERY DIN?MICA

## Q0769

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `flat`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/functions.php:1468-1470`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $meta_list = $wpdb->get_results("SELECT post_id, meta_key, meta_value FROM $wpdb->postmeta WHERE post_id IN($post_id_list) ORDER BY post_id, meta_key", ARRAY_A) ) { // Change from flat structure to hierarchical: $post_meta_cache = array();
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0770

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2248`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$metas = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->usermeta WHERE user_id = '$user_id' AND meta_key = '$meta_key'");
```

- Notas: QUERY DIN?MICA

## Q0771

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2250`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$metas = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->usermeta WHERE user_id = '$user_id'");
```

- Notas: QUERY DIN?MICA

## Q0772

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2290`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cur = $wpdb->get_row("SELECT * FROM $wpdb->usermeta WHERE user_id = '$user_id' AND meta_key = '$meta_key'");
```

- Notas: QUERY DIN?MICA

## Q0773

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2292-2294`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("INSERT INTO $wpdb->usermeta ( user_id, meta_key, meta_value ) VALUES ( '$user_id', '$meta_key', '$meta_value' )");
```

- Notas: QUERY DIN?MICA

## Q0774

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2296`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->usermeta SET meta_value = '$meta_value' WHERE user_id = '$user_id' AND meta_key = '$meta_key'");
```

- Notas: QUERY DIN?MICA

## Q0775

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2319`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->usermeta WHERE user_id = '$user_id' AND meta_key = '$meta_key' AND meta_value = '$meta_value'");
```

- Notas: QUERY DIN?MICA

## Q0776

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/functions.php:2321`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("DELETE FROM $wpdb->usermeta WHERE user_id = '$user_id' AND meta_key = '$meta_key'");
```

- Notas: QUERY DIN?MICA

## Q0777

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:31`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT cat_id FROM $wpdb->linkcategories WHERE cat_name='$cat_name'");
```

- Notas: QUERY DIN?MICA

## Q0778

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:54-56`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cat = $wpdb->get_row("SELECT cat_id, cat_name, auto_toggle, show_images, show_description, " . " show_rating, show_updated, sort_order, sort_desc, text_before_link, text_after_link, " . " text_after_all, list_limit FROM $wpdb->linkcategories WHERE cat_name='$category'");
```

- Notas: QUERY DIN?MICA

## Q0779

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:89-91`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cat = $wpdb->get_row("SELECT cat_id, cat_name, auto_toggle, show_images, show_description, " . " show_rating, show_updated, sort_order, sort_desc, text_before_link, text_after_link, " . " text_after_all, list_limit FROM $wpdb->linkcategories WHERE cat_id=$category");
```

- Notas: QUERY DIN?MICA

## Q0780

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:194`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT link_url, link_name, link_image, link_target, link_description, link_rating, link_rel $length $recently_updated_test $get_updated FROM $wpdb->links WHERE link_visible = 'Y' " . $category_query;
```

- Notas: QUERY DIN?MICA

## Q0781

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:296`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$results = $wpdb->get_results("SELECT cat_id FROM $wpdb->linkcategories WHERE cat_name='$cat_name'");
```

- Notas: QUERY DIN?MICA

## Q0782

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:343`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT * FROM $wpdb->links WHERE link_visible = 'Y'";
```

- Notas: QUERY DIN?MICA

## Q0783

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-includes/links.php:452`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cat_name = $wpdb->get_var("SELECT cat_name FROM $wpdb->linkcategories WHERE cat_id=$id");
```

- Notas: QUERY DIN?MICA

## Q0784

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `blog/wp-includes/links.php:464`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$auto_toggle = $wpdb->get_var("SELECT auto_toggle FROM $wpdb->linkcategories WHERE cat_id=$id");
```

- Notas: QUERY DIN?MICA

## Q0785

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:480-483`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function links_popup_script($text = 'Links', $width=400, $height=400, $file='links.all.php', $count = true) { if ($count == true) { $counts = $wpdb->get_var("SELECT count(*) FROM $wpdb->links");
```

- Notas: QUERY DIN?MICA

## Q0786

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/links.php:530-538`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cats = $wpdb->get_results(" SELECT DISTINCT link_category, cat_name, show_images, show_description, show_rating, show_updated, sort_order, sort_desc, list_limit FROM `$wpdb->links` LEFT JOIN `$wpdb->linkcategories` ON (link_category = cat_id) WHERE link_visible = 'Y' AND list_limit <> 0 ORDER BY $cat_order $direction ", ARRAY_A);
```

- Notas: QUERY DIN?MICA

## Q0787

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:72-73`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( !$user = $wpdb->get_row("SELECT * FROM $wpdb->users WHERE ID = '$user_id' LIMIT 1") ) return false;
```

- Notas: QUERY DIN?MICA

## Q0788

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:76`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$metavalues = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->usermeta WHERE user_id = '$user_id'");
```

- Notas: QUERY DIN?MICA

## Q0789

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:123-124`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( !$user = $wpdb->get_row("SELECT * FROM $wpdb->users WHERE user_login = '$user_login'") ) return false;
```

- Notas: QUERY DIN?MICA

## Q0790

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `user_id`
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:127`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$metavalues = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->usermeta WHERE user_id = '$user->ID'");
```

- Notas: QUERY DIN?MICA

## Q0791

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_id`
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:410`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comment = $wpdb->get_row("SELECT * FROM $wpdb->comments WHERE comment_ID='$comment_id' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0792

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:411`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$post = $wpdb->get_row("SELECT * FROM $wpdb->posts WHERE ID='$comment->comment_post_ID' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0793

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/pluggable-functions.php:414`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments_waiting = $wpdb->get_var("SELECT count(comment_ID) FROM $wpdb->comments WHERE comment_approved = '0'");
```

- Notas: QUERY DIN?MICA

## Q0794

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `user_email`, `user_pass`, `user_url`
- Archivo:l?nea: `blog/wp-includes/registration-functions.php:77`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "UPDATE $wpdb->users SET user_pass='$user_pass', user_email='$user_email', user_url='$user_url', user_nicename = '$user_nicename', display_name = '$display_name' WHERE ID = '$ID'";
```

- Notas: QUERY DIN?MICA

## Q0795

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`, `user_email`, `user_pass`, `user_url`
- Archivo:l?nea: `blog/wp-includes/registration-functions.php:82-85`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "INSERT INTO $wpdb->users (user_login, user_pass, user_email, user_url, user_registered, user_nicename, display_name) VALUES ('$user_login', '$user_pass', '$user_email', '$user_url', '$user_registered', '$user_nicename', '$display_name')";
```

- Notas: QUERY DIN?MICA

## Q0796

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`
- Archivo:l?nea: `blog/wp-includes/template-functions-author.php:183`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "SELECT ID, user_nicename from $wpdb->users " . ($exclude_admin ? "WHERE user_login <> 'admin' " : '') . "ORDER BY display_name";
```

- Notas: QUERY DIN?MICA

## Q0797

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_parent`, `category_id`
- Archivo:l?nea: `blog/wp-includes/template-functions-category.php:191-198`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = " SELECT cat_ID, cat_name, category_nicename,category_parent, COUNT($wpdb->post2cat.post_id) AS cat_count, DAYOFMONTH(MAX(post_date)) AS lastday, MONTH(MAX(post_date)) AS lastmonth FROM $wpdb->categories LEFT JOIN $wpdb->post2cat ON (cat_ID = category_id) LEFT JOIN $wpdb->posts ON (ID = post_id) WHERE cat_ID > 0 ";
```

- Notas: QUERY DIN?MICA

## Q0798

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_parent`
- Archivo:l?nea: `blog/wp-includes/template-functions-category.php:298-302`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = " SELECT cat_ID, cat_name, category_nicename, category_description, category_parent, category_count FROM $wpdb->categories WHERE cat_ID > 0 $exclusions ORDER BY $sort_column $sort_order";
```

- Notas: QUERY DIN?MICA

## Q0799

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_id`
- Archivo:l?nea: `blog/wp-includes/template-functions-category.php:308-312`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cat_dates = $wpdb->get_results(" SELECT category_id, UNIX_TIMESTAMP( MAX(post_date) ) AS ts FROM $wpdb->posts, $wpdb->post2cat, $wpdb->categories WHERE post_status = 'publish' AND post_id = ID $exclusions GROUP BY category_id");
```

- Notas: QUERY DIN?MICA

## Q0800

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: `category_name`, `title`
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:164`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$title = $wpdb->get_var("SELECT cat_name FROM $wpdb->categories WHERE category_nicename = '$category_name'");
```

- Notas: QUERY DIN?MICA

## Q0801

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `title`
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:174`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$title = $wpdb->get_var("SELECT display_name FROM $wpdb->users WHERE user_nicename = '$author_name'");
```

- Notas: QUERY DIN?MICA

## Q0802

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `name`
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:220`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$p = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = '$name'");
```

- Notas: QUERY DIN?MICA

## Q0803

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:333`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$arcresults = $wpdb->get_results("SELECT DISTINCT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM $wpdb->posts WHERE post_date < '$now' AND post_date != '0000-00-00 00:00:00' AND post_status = 'publish' GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC" . $limit);
```

- Notas: QUERY DIN?MICA

## Q0804

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:348`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$arcresults = $wpdb->get_results("SELECT DISTINCT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, DAYOFMONTH(post_date) AS `dayofmonth` FROM $wpdb->posts WHERE post_date < '$now' AND post_date != '0000-00-00 00:00:00' AND post_status = 'publish' ORDER BY post_date DESC" . $limit);
```

- Notas: QUERY DIN?MICA

## Q0805

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:359`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$arcresults = $wpdb->get_results("SELECT DISTINCT WEEK(post_date, $start_of_week) AS `week`, YEAR(post_date) AS yr, DATE_FORMAT(post_date, '%Y-%m-%d') AS yyyymmdd FROM $wpdb->posts WHERE post_date < '$now' AND post_status = 'publish' ORDER BY post_date DESC" . $limit);
```

- Notas: QUERY DIN?MICA

## Q0806

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:376`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$arcresults = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE post_date < '$now' AND post_status = 'publish' ORDER BY post_date DESC" . $limit);
```

- Notas: QUERY DIN?MICA

## Q0807

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:408`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$gotsome = $wpdb->get_var("SELECT ID from $wpdb->posts WHERE post_status = 'publish' AND post_date < '$now' ORDER BY post_date DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0808

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:429`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$thismonth = $wpdb->get_var("SELECT DATE_FORMAT((DATE_ADD('${thisyear}0101', INTERVAL $d DAY) ), '%m')");
```

- Notas: QUERY DIN?MICA

## Q0809

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:445-450`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$previous = $wpdb->get_row("SELECT DISTINCT MONTH(post_date) AS month, YEAR(post_date) AS year FROM $wpdb->posts WHERE post_date < '$thisyear-$thismonth-01' AND post_status = 'publish' ORDER BY post_date DESC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0810

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:451-458`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$next = $wpdb->get_row("SELECT DISTINCT MONTH(post_date) AS month, YEAR(post_date) AS year FROM $wpdb->posts WHERE post_date > '$thisyear-$thismonth-01' AND post_date < '$now' AND MONTH( post_date ) != MONTH( '$thisyear-$thismonth-01' ) AND post_status = 'publish' ORDER BY post_date ASC LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0811

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:512-516`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dayswithposts = $wpdb->get_results("SELECT DISTINCT DAYOFMONTH(post_date) FROM $wpdb->posts WHERE MONTH(post_date) = '$thismonth' AND YEAR(post_date) = '$thisyear' AND post_status = 'publish' AND post_date < '" . current_time('mysql') . '\'', ARRAY_N);
```

- Notas: QUERY DIN?MICA

## Q0812

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-general.php:533-539`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$ak_post_titles = $wpdb->get_results("SELECT post_title, DAYOFMONTH(post_date) as dom " ."FROM $wpdb->posts " ."WHERE YEAR(post_date) = '$thisyear' " ."AND MONTH(post_date) = '$thismonth' " ."AND post_date < '".current_time('mysql')."' " ."AND post_status = 'publish'" );
```

- Notas: QUERY DIN?MICA

## Q0813

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-links.php:468`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numposts = $wpdb->get_var("SELECT COUNT(DISTINCT ID) FROM $fromwhere");
```

- Notas: QUERY DIN?MICA

## Q0814

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-links.php:512`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$numposts = $wpdb->get_var("SELECT COUNT(DISTINCT ID) FROM $fromwhere");
```

- Notas: QUERY DIN?MICA

## Q0815

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `flat`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-includes/template-functions-post.php:208-210`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ( $meta_list = $wpdb->get_results("SELECT post_id, meta_key, meta_value FROM $wpdb->postmeta WHERE post_id = '$post_id' ORDER BY post_id, meta_key", ARRAY_A) ) { // Change from flat structure to hierarchical: $post_meta_cache = array();
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0816

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `blog/wp-includes/template-functions-post.php:323-327`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pages = $wpdb->get_results("SELECT * " . "FROM $wpdb->posts " . "WHERE post_status = 'static' " . "$exclusions " . "ORDER BY " . $r['sort_column'] . " " . $r['sort_order']);
```

- Notas: QUERY DIN?MICA

## Q0817

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-links-opml.php:15`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$cat_name = $wpdb->get_var("SELECT $wpdb->linkcategories.cat_name FROM $wpdb->linkcategories WHERE $wpdb->linkcategories.cat_id = $link_cat");
```

- Notas: QUERY DIN?MICA

## Q0818

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-links-opml.php:29-34`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
<?php $sql = "SELECT $wpdb->links.link_url, link_rss, $wpdb->links.link_name, $wpdb->links.link_category, $wpdb->linkcategories.cat_name, link_updated FROM $wpdb->links JOIN $wpdb->linkcategories on $wpdb->links.link_category = $wpdb->linkcategories.cat_id AND $wpdb->links.link_visible = 'Y' $sql_cat ORDER BY $wpdb->linkcategories.cat_name, $wpdb->links.link_name \n";
```

- Notas: QUERY DIN?MICA

## Q0819

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`
- Archivo:l?nea: `blog/wp-login.php:106`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->users SET user_activation_key = '$key' WHERE user_login = '$user_login'");
```

- Notas: QUERY DIN?MICA

## Q0820

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-login.php:133`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$user = $wpdb->get_row("SELECT * FROM $wpdb->users WHERE user_activation_key = '$key'");
```

- Notas: QUERY DIN?MICA

## Q0821

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `users`
- Columnas detectadas: `user_login`, `user_pass`
- Archivo:l?nea: `blog/wp-login.php:140`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$wpdb->query("UPDATE $wpdb->users SET user_pass = MD5('$new_pass'), user_activation_key = '' WHERE user_login = '$user->user_login'");
```

- Notas: QUERY DIN?MICA

## Q0822

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_email`
- Archivo:l?nea: `blog/wp-mail.php:67`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->get_row("SELECT ID FROM $wpdb->users WHERE user_email='$author' LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q0823

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `users`
- Columnas detectadas: `user_email`
- Archivo:l?nea: `blog/wp-register.php:40`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$email_exists = $wpdb->get_row("SELECT user_email FROM $wpdb->users WHERE user_email = '$user_email'");
```

- Notas: QUERY DIN?MICA

## Q0824

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-settings.php:120`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$db_check = $wpdb->get_var("SELECT option_value FROM $wpdb->options WHERE option_name = 'siteurl'");
```

- Notas: QUERY DIN?MICA

## Q0825

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-trackback.php:65`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$pingstatus = $wpdb->get_var("SELECT ping_status FROM $wpdb->posts WHERE ID = $tb_id");
```

- Notas: QUERY DIN?MICA

## Q0826

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/wp-trackback.php:87`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dupe = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$comment_post_ID' AND comment_author_url = '$comment_author_url'");
```

- Notas: QUERY DIN?MICA

## Q0827

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/xmlrpc.php:792-794`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ($cats = $wpdb->get_results("SELECT cat_ID,cat_name FROM $wpdb->categories", ARRAY_A)) { foreach ($cats as $cat) { $struct['categoryId'] = $cat['cat_ID'];
```

- Notas: QUERY DIN?MICA

## Q0828

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/xmlrpc.php:911-913`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
if ($cats = $wpdb->get_results("SELECT cat_ID, cat_name FROM $wpdb->categories", ARRAY_A)) { foreach ($cats as $cat) { $struct['categoryId'] = $cat['cat_ID'];
```

- Notas: QUERY DIN?MICA

## Q0829

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`
- Archivo:l?nea: `blog/xmlrpc.php:1014`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT comment_author_url, comment_content, comment_author_IP, comment_type FROM $wpdb->comments WHERE comment_post_ID = $post_ID");
```

- Notas: QUERY DIN?MICA

## Q0830

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `title`
- Archivo:l?nea: `blog/xmlrpc.php:1124`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT ID FROM $wpdb->posts WHERE post_title RLIKE '$title'";
```

- Notas: QUERY DIN?MICA

## Q0831

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `blog/xmlrpc.php:1153`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$result = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_post_ID = '$post_ID' AND comment_author_url = '$pagelinkedfrom'");
```

- Notas: QUERY DIN?MICA

## Q0832

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `comments`
- Columnas detectadas: `comment_content`
- Archivo:l?nea: `blog/xmlrpc.php:1249`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$comments = $wpdb->get_results("SELECT comment_author_url, comment_content, comment_author_IP, comment_type FROM $wpdb->comments WHERE comment_post_ID = $post_ID");
```

- Notas: QUERY DIN?MICA

## Q0833

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `video_audiolibro`, `ebooks_books_id`, `descargar`, `link_p2p`, `views`, `uri`
- Archivo:l?nea: `buscar.php:287-303`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_file_alternative, l.descargar, l.video_audiolibro, l.link_p2p, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where ( l.ebooks_format_epub = 1 or l.ebooks_format_epub = -1 ) and l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views desc limit 40";
```

- Notas: QUERY DIN?MICA

## Q0834

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `video_audiolibro`, `ebooks_books_id`, `views_last`, `descargar`, `link_p2p`, `uri`
- Archivo:l?nea: `buscar.php:307-321`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_file_alternative, l.descargar, l.video_audiolibro, l.link_p2p, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views_last desc limit 40";
```

- Notas: QUERY DIN?MICA

## Q0835

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_authors_id`, `video_audiolibro`, `ebooks_books_id`, `views_last`, `descargar`, `uri`
- Archivo:l?nea: `buscar.php:580-593`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_file_alternative, l.descargar, l.video_audiolibro, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views_last desc limit 40";
```

- Notas: QUERY DIN?MICA

## Q0836

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_subtitle`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_format_epub`, `ebooks_authors_id`, `video_audiolibro`, `ebooks_books_id`, `descargar`, `views`, `uri`
- Archivo:l?nea: `buscar.php:838-852`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select l.ebooks_books_id, a.uri as author_uri, l.uri, l.ebooks_books_title, l.ebooks_books_subtitle, l.ebooks_books_file_alternative, l.descargar, l.video_audiolibro, a.ebooks_authors_name from ebooks_books as l, ebooks_authors as a where l.ebooks_format_epub = 0 and l.ebooks_books_author = a.ebooks_authors_id". $s_where. " order by l.views desc limit 40";
```

- Notas: QUERY DIN?MICA

## Q0837

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_surname`, `ebooks_authors_name`, `uri`
- Archivo:l?nea: `c_autor.php:35-44`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql=' INSERT INTO ebooks_authors ( uri, ebooks_authors_name, ebooks_authors_surname ) VALUES ( '."'".$aautor['uri']."',". "'".mp_utf8_decode($aautor['ebooks_authors_name'])."',". "'".mp_utf8_decode($aautor['ebooks_authors_surname'])."'". ')';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:47

## Q0838

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `dompub`, `uri`
- Archivo:l?nea: `c_autor.php:92-95`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = " UPDATE ebooks_authors SET dompub = 1 WHERE uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:96

## Q0839

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `dompub_status`, `dompub`, `uri`
- Archivo:l?nea: `c_autor.php:99-106`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = " UPDATE ebooks_books SET dompub = 1, dompub_status = 1 WHERE ebooks_books_author IN ( SELECT ebooks_authors_id FROM ebooks_authors WHERE uri = '".$uri."' )";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:107

## Q0840

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `dompub`, `uri`
- Archivo:l?nea: `c_autor.php:124-126`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_authors SET dompub = $escaped_dompub WHERE uri = '$escaped_uri'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:127

## Q0841

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `uri`
- Archivo:l?nea: `c_autor.php:133-135`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_authors_id FROM ebooks_authors WHERE uri = '$escaped_uri'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_autor.php:136

## Q0842

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `dompub`
- Archivo:l?nea: `c_autor.php:145-147`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET dompub = $escaped_dompub WHERE ebooks_books_author = $author_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:148

## Q0843

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `dompub`, `uri`
- Archivo:l?nea: `c_autor.php:175-177`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_authors SET dompub = $escaped_dompub WHERE uri = '$escaped_uri'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:179

## Q0844

- Tipo: `ROLLBACK`
- READ/WRITE: `OTHER`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `c_autor.php:181`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("ROLLBACK", $dbconn); // Revertir si falla
```

- Notas: QUERY DIN?MICA

## Q0845

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `uri`
- Archivo:l?nea: `c_autor.php:186-188`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "SELECT ebooks_authors_id FROM ebooks_authors WHERE uri = '$escaped_uri'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:191

## Q0846

- Tipo: `ROLLBACK`
- READ/WRITE: `OTHER`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `c_autor.php:193`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("ROLLBACK", $dbconn); // Revertir si falla
```

- Notas: QUERY DIN?MICA

## Q0847

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `dompub`
- Archivo:l?nea: `c_autor.php:200-202`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET dompub = $escaped_dompub WHERE ebooks_books_author = $author_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:205

## Q0848

- Tipo: `ROLLBACK`
- READ/WRITE: `OTHER`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `c_autor.php:207`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("ROLLBACK", $dbconn); // Revertir si falla
```

- Notas: QUERY DIN?MICA

## Q0849

- Tipo: `COMMIT`
- READ/WRITE: `OTHER`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `c_autor.php:212`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "COMMIT";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_autor.php:213

## Q0850

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_nicename`
- Archivo:l?nea: `c_category.php:25-26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into ebooks_categories (ebooks_categories_category, ebooks_categories_nicename) values ('".$label."', '".$nicename."')";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_category.php:29

## Q0851

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `tags`
- Columnas detectadas: `nombre_es`, `ranking`, `uri`
- Archivo:l?nea: `c_category.php:72-73`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_insert = "INSERT IGNORE INTO tags (uri, nombre_es, ranking) VALUES ('".mpdb_escape($uri)."', '".mpdb_escape($tag)."', 0)";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en c_category.php:76

## Q0852

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`
- Columnas detectadas: `uri`, `id`
- Archivo:l?nea: `c_category.php:91`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_id = "SELECT id FROM tags WHERE uri = '".mpdb_escape($uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en c_category.php:92

## Q0853

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`
- Columnas detectadas: `id`
- Archivo:l?nea: `c_category.php:110`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_id = "SELECT * FROM tags WHERE id = ".$id." LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en c_category.php:111

## Q0854

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`
- Columnas detectadas: `uri`
- Archivo:l?nea: `c_category.php:125`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql_id = "SELECT * FROM tags WHERE uri = '".$uri."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en c_category.php:126

## Q0855

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_books_author`, `ebooks_books_labels`, `ebooks_books_title`, `ebooks_books_cover`, `ebooks_books_lang`, `descargar`, `dompub`, `uri`
- Archivo:l?nea: `c_libro.php:12-35`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "INSERT INTO ebooks_books( uri, ebooks_books_title, ebooks_books_subtitle, ebooks_books_author, ebooks_books_cover, ebooks_books_txt_inf, descargar, ebooks_books_labels, ebooks_books_lang, dompub ) VALUES (". "'".$new_libro['uri']."',". "'".mp_utf8_decode($new_libro['ebooks_books_title'])."',". "'".mp_utf8_decode($new_libro['ebooks_books_subtitle'])."',". $new_libro['ebooks_books_author'].",". $new_libro['ebooks_books_cover'].",". "'".mp_utf8_decode($new_libro['ebooks_books_txt_inf'])."',". $new_libro['descargar'].",". "'".mp_utf8_decode($new_libro['ebooks_books_labels'])."',". "'".$new_libro['ebooks_books_lang']."',". $new_libro['dompub']. ")" ;
```

- Notas: QUERY DIN?MICA

## Q0856

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `c_libro.php:109`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".pg_escape_string($uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libro.php:111

## Q0857

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `url_amazon`, `uri`
- Archivo:l?nea: `c_libro.php:133-135`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET url_amazon ='".$_url_amazon."' WHERE uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:138

## Q0858

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `value`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `c_libro.php:176-178`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ".$table." SET ". $field." ='".$value."' WHERE uri = '".$key."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:181

## Q0859

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `value`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `c_libro.php:200-202`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ".$table." SET ". $field." =".$value." WHERE uri = '".$key."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:205

## Q0860

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `c_libro.php:218`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT a.* FROM ebooks_authors as a, ebooks_books as b WHERE a.ebooks_authors_id = b.ebooks_books_author and b.uri ='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libro.php:222

## Q0861

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `c_libro.php:246`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ".$p_campo." = '".mpdb_real_escape_string($p_valor)."' where uri = '".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:248

## Q0862

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `videos`, `uri`
- Archivo:l?nea: `c_libro.php:274`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '".mpdb_real_escape_string($p_video)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:276

## Q0863

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `uri`
- Archivo:l?nea: `c_libro.php:278`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = '".mpdb_real_escape_string($p_video)."' where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:280

## Q0864

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `c_libro.php:316`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE uri = '" . $uri . "'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libro.php:319

## Q0865

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `c_libro.php:335`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_id = " . $libro_id ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libro.php:338

## Q0866

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM user_books WHERE ebooks_books_id = (SELECT ebooks_books_id FROM ebooks_books WHERE uri = '$escaped_uri')
```

- Notas: QUERY DIN?MICA

## Q0867

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `ebooks_users_ebooks`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM ebooks_users_ebooks WHERE ebooks_books_id = (SELECT ebooks_books_id FROM ebooks_books WHERE uri = '$escaped_uri')
```

- Notas: QUERY DIN?MICA

## Q0868

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM user_video_audiolibros WHERE ebooks_books_id = (SELECT ebooks_books_id FROM ebooks_books WHERE uri = '$escaped_uri')
```

- Notas: QUERY DIN?MICA

## Q0869

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM videos_book WHERE libro_uri = '$escaped_uri'
```

- Notas: QUERY DIN?MICA

## Q0870

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM videos_sugeridos WHERE uri = '$escaped_uri'
```

- Notas: QUERY DIN?MICA

## Q0871

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM video_audiolibros WHERE libro_uri = '$escaped_uri'
```

- Notas: QUERY DIN?MICA

## Q0872

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `c_libro.php:378-386`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
DELETE FROM ebooks_books WHERE uri = '$escaped_uri'
```

- Notas: QUERY DIN?MICA

## Q0873

- Tipo: `COMMIT`
- READ/WRITE: `OTHER`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `c_libro.php:403`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "COMMIT";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libro.php:404

## Q0874

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `tags`
- Columnas detectadas: `book_id`, `tag_id`, `id`
- Archivo:l?nea: `c_libro.php:416-421`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = " SELECT t.* FROM tags t INNER JOIN books_tags bt ON bt.tag_id = t.id WHERE bt.book_id = $book_id ";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en c_libro.php:423

## Q0875

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `respuesta_correcta`, `ebooks_books_id`, `explicacion`, `ebook_id`, `pregunta`, `tema`, `id`
- Archivo:l?nea: `c_libro.php:446-449`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id, pregunta, respuesta_correcta, explicacion FROM ebooks_trivia_questions WHERE ebooks_books_id = $ebook_id AND tema = 'FAQ'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libro.php:453

## Q0876

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `libro`
- Archivo:l?nea: `c_libros_pedidos.php:14`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM libros_pedidos WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libros_pedidos.php:15

## Q0877

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_verificar = "SELECT pedido FROM libros_pedidos WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_libros_pedidos.php:50

## Q0878

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:56`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_actualizar = "UPDATE libros_pedidos SET pedido = pedido + 1 WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:57

## Q0879

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `publicado`, `pedido`, `email`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:62`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_insertar = "INSERT INTO libros_pedidos (email, libro, pedido,publicado) VALUES ('$email_escapado', '$libro_escapado', 1, $publicado)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:65

## Q0880

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `email`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:72`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_verificar = "SELECT email FROM libros_pedidos WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:73

## Q0881

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `email`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:80-83`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_actualizar = "UPDATE libros_pedidos SET pedido = pedido + 1, email = CONCAT_WS(',', email, '$email_escapado') WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:90

## Q0882

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:86-88`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_actualizar = "UPDATE libros_pedidos SET pedido = pedido + 1 WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:90

## Q0883

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `email`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:93-94`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_insertar = "INSERT INTO libros_pedidos (email, libro, pedido) VALUES ('$email_escapado', '$libro_escapado', 1)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:95

## Q0884

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:103`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_actualizar = "UPDATE libros_pedidos SET pedido = pedido + 1 WHERE libro = '$libro_escapado'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:104

## Q0885

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `email`, `libro`
- Archivo:l?nea: `c_libros_pedidos.php:107`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_insertar = "INSERT INTO libros_pedidos (email, libro, pedido) VALUES ('$email_escapado', '$libro_escapado', 1)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_libros_pedidos.php:108

## Q0886

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `logs`
- Columnas detectadas: `script`
- Archivo:l?nea: `c_log.php:16-22`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO logs ( script, log ) VALUES (". "'".$script."',". "'".$log."'". ")" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_log.php:24; tabla fuera de 10_DB_CATALOG

## Q0887

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_fallecimiento`, `ebooks_authors_surname`, `ebooks_authors_name`, `dompubreal`, `dompub`, `uri`
- Archivo:l?nea: `c_pl_autor.php:26-41`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "INSERT INTO ebooks_authors( uri, ebooks_authors_name, ebooks_authors_surname, ebooks_authors_fallecimiento, dompub, dompubreal ) VALUES (". "'".$new_autor['uri']."',". "'".$new_autor['ebooks_authors_name']."',". "'".$new_autor['ebooks_authors_surname']."',". $new_autor['ebooks_authors_fallecimiento'].",". $new_autor['dompub'].",". $new_autor['dompubreal']. ")" ;
```

- Notas: QUERY DIN?MICA

## Q0888

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `ebooks_books_subtitle`, `ebooks_books_txt_inf`, `ebooks_books_author`, `ebooks_books_labels`, `ebooks_books_title`, `ebooks_books_cover`, `ebooks_books_lang`, `descargar`, `dompub`, `videos`, `views`, `uri`
- Archivo:l?nea: `c_pl_libro.php:26-53`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "INSERT INTO ebooks_books( uri, ebooks_books_title, ebooks_books_subtitle, ebooks_books_author, ebooks_books_cover, ebooks_books_txt_inf, descargar, videos, views, ebooks_books_labels, ebooks_books_lang, dompub ) VALUES (". "'".$new_libro['uri']."',". "'".utf8_decode($new_libro['ebooks_books_title'])."',". "'".utf8_decode($new_libro['ebooks_books_subtitle'])."',". $new_libro['ebooks_books_author'].",". $new_libro['ebooks_books_cover'].",". "'".utf8_decode($new_libro['ebooks_books_txt_inf'])."',". $new_libro['descargar'].",". "'".$new_libro['videos']."',". $new_libro['views'].",". "'".utf8_decode($new_libro['ebooks_books_labels'])."',". "'".$new_libro['ebooks_books_lang']."',". $new_libro['dompub']. ")" ;
```

- Notas: QUERY DIN?MICA

## Q0889

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tareas`
- Columnas detectadas: `prioridad`, `next_exec`, `enabled`
- Archivo:l?nea: `c_tarea.php:16`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from tareas where enabled = 1 and next_exec < NOW() order by prioridad";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_tarea.php:19

## Q0890

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tareas`
- Columnas detectadas: `script`
- Archivo:l?nea: `c_tarea.php:38`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from tareas where script = '".$tarea_script."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_tarea.php:39

## Q0891

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `tareas`
- Columnas detectadas: `last_exec`, `next_exec`, `contador`, `id`
- Archivo:l?nea: `c_tarea.php:75-79`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE tareas SET contador = contador + 1, next_exec ='".$next_exec."', last_exec ='".$last_exec."' WHERE id = ".$tarea['id'] ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_tarea.php:82

## Q0892

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `tareas`
- Columnas detectadas: `enabled`, `script`, `value`
- Archivo:l?nea: `c_tarea.php:98-100`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE tareas SET enabled = ".$value." WHERE script = '".$tarea['script']."'" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_tarea.php:103

## Q0893

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_nicename`
- Archivo:l?nea: `c_tema.php:12`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_categories where ebooks_categories_nicename ='".mpdb_real_escape_string($nicename)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_tema.php:14

## Q0894

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_nicename`, `name`
- Archivo:l?nea: `c_tema.php:32`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_categories where ebooks_categories_nicename = '".mpdb_real_escape_string($name)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en c_tema.php:34

## Q0895

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_nicename`, `ebooks_categories_rank`, `tema`
- Archivo:l?nea: `c_tema.php:49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_categories set ebooks_categories_rank = ebooks_categories_rank + 1 where ebooks_categories_nicename = '".$tema."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_tema.php:50

## Q0896

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_nicename`, `lang`
- Archivo:l?nea: `c_tema.php:69-70`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into ebooks_categories (ebooks_categories_category, ebooks_categories_nicename, lang ) values ('".$label."', '".$nicename."', '".$lang."')";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en c_tema.php:73

## Q0897

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `chatgpt_desa/bibliotecario_chat_gpt_refactor_chatgpt.php:160-164`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function buscar_link_libro(PDO $pdo, string $titulo, ?string $autor=null): ?string { // IMPORTANTE: ajustar a tu esquema real // Ejemplos de estrategias: // 1) Búsqueda exacta por título $q = $pdo->prepare('SELECT url FROM libros WHERE titulo = :t LIMIT 1');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0898

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `chatgpt_desa/bibliotecario_chat_gpt_refactor_chatgpt.php:171`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $pdo->prepare('SELECT url FROM libros WHERE slug = :s LIMIT 1');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0899

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `chatgpt_desa/bibliotecario_chat_gpt_refactor_chatgpt.php:178`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $pdo->prepare('SELECT url FROM libros WHERE titulo LIKE :t AND autor LIKE :a LIMIT 1');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0900

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `chatgpt_desa/chatgpt_funcs.php:214-218`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function buscar_link_libro(PDO $pdo, string $titulo, ?string $autor=null): ?string { // IMPORTANTE: ajustar a tu esquema real // Ejemplos de estrategias: // 1) Búsqueda exacta por título $q = $pdo->prepare('SELECT url FROM libros WHERE titulo = :t LIMIT 1');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0901

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `chatgpt_desa/chatgpt_funcs.php:225`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $pdo->prepare('SELECT url FROM libros WHERE slug = :s LIMIT 1');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0902

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `chatgpt_desa/chatgpt_funcs.php:232`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$q = $pdo->prepare('SELECT url FROM libros WHERE titulo LIKE :t AND autor LIKE :a LIMIT 1');
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0903

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views`, `uri`
- Archivo:l?nea: `descargar.php:139`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views = views + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en descargar.php:141

## Q0904

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `ebooks/adm/actualizar_categorias.php:10-15`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$_query = " SELECT * FROM ebooks_categories ";
```

- Notas: QUERY DIN?MICA; usa helper query en ebooks/adm/actualizar_categorias.php:19

## Q0905

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_nicename`, `ebooks_categories_id`
- Archivo:l?nea: `ebooks/adm/actualizar_categorias.php:56-58`
- Conexi?n/helper: `helper/NO_CONFIRMADO` / `query`
- Query:

```php
$query=" UPDATE ebooks_categories SET ebooks_categories_nicename = '".$nicename ."'". " WHERE ebooks_categories_id = ".$_categories[$i]['ebooks_categories_id'];
```

- Notas: QUERY DIN?MICA; usa helper query en ebooks/adm/actualizar_categorias.php:62

## Q0906

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_rank`
- Archivo:l?nea: `ebooks/adm/index.php:124-129`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = "SELECT ebooks_categories_category AS Categor�a, ebooks_categories_rank AS Ranking FROM ebooks_categories ORDER BY Ranking DESC LIMIT 0 , 30";
```

- Notas: QUERY DIN?MICA

## Q0907

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `sys_users_email`
- Columnas detectadas: `sys_users_email_timestamp`, `sys_users_email_type`, `sys_users_email`, `libro`
- Archivo:l?nea: `ebooks/adm/index.php:134-141`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT DAYOFYEAR( sys_users_email_timestamp) AS D�a, count(*) AS Recomendaciones FROM sys_users_email WHERE sys_users_email_type = 'recomendar-libro' GROUP BY DAYOFYEAR( sys_users_email_timestamp) ORDER BY DAYOFYEAR( sys_users_email_timestamp) DESC";
```

- Notas: QUERY DIN?MICA

## Q0908

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `sys_users_email`
- Columnas detectadas: `sys_users_email_timestamp`, `sys_users_email_doc_type`, `sys_users_email_type`, `sys_users_email`, `libro`
- Archivo:l?nea: `ebooks/adm/index.php:146-155`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT DAYOFYEAR( sys_users_email_timestamp) AS D�a, count(*) AS Recomendaciones FROM sys_users_email WHERE sys_users_email_type = 'recomendar-libro' AND sys_users_email_doc_type = 'books' GROUP BY DAYOFYEAR( sys_users_email_timestamp) ORDER BY DAYOFYEAR( sys_users_email_timestamp) DESC ";
```

- Notas: QUERY DIN?MICA

## Q0909

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `sys_users_email`, `videos`
- Columnas detectadas: `sys_users_email_timestamp`, `sys_users_email_doc_type`, `sys_users_email_type`, `sys_users_email`, `videos`, `libro`
- Archivo:l?nea: `ebooks/adm/index.php:160-169`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT DAYOFYEAR( sys_users_email_timestamp) AS D�a, count(*) AS Recomendaciones FROM sys_users_email WHERE sys_users_email_type = 'recomendar-libro' AND sys_users_email_doc_type = 'videos' GROUP BY DAYOFYEAR( sys_users_email_timestamp) ORDER BY DAYOFYEAR( sys_users_email_timestamp) DESC ";
```

- Notas: QUERY DIN?MICA

## Q0910

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `sys_users_email`
- Columnas detectadas: `sys_users_email_timestamp`, `sys_users_email_type`, `sys_users_email`
- Archivo:l?nea: `ebooks/adm/index.php:174-181`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT DAYOFYEAR( sys_users_email_timestamp) AS D�a, count(*) AS Recomendaciones FROM sys_users_email WHERE sys_users_email_type = 'recomendar-pl.movil' GROUP BY DAYOFYEAR( sys_users_email_timestamp) ORDER BY DAYOFYEAR( sys_users_email_timestamp) DESC";
```

- Notas: QUERY DIN?MICA

## Q0911

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `sys_users_email`
- Columnas detectadas: `sys_users_email_doc`, `sys_users_email`
- Archivo:l?nea: `ebooks/adm/index.php:186-193`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT sys_users_email_doc AS Obra, count(*) AS Downloads FROM sys_users_email GROUP BY sys_users_email_doc ORDER BY Downloads DESC ";
```

- Notas: QUERY DIN?MICA

## Q0912

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `download_log`, `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_download_rank`, `ebooks_books_ebookdate`, `download_log_object`, `download_log_status`, `download_log_type`, `ebooks_books_file`, `libro`
- Archivo:l?nea: `ebooks/adm/index.php:199-218`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT download_log_object as libro, count( * ) as downloads, DATEDIFF( NOW(), ebooks_books_ebookdate), ebooks_books_download_rank, ebooks_books_download_rank / DATEDIFF( NOW(), ebooks_books_ebookdate) FROM download_log, ebooks_books WHERE download_log_object = ebooks_books_file AND download_log_status = 'downloaded' AND ebooks_books_file_alternative IS NULL AND DATEDIFF( NOW(), ebooks_books_ebookdate) > 100 AND download_log_type = 'free' GROUP BY download_log_object ORDER BY ebooks_books_download_rank / DATEDIFF( NOW(), ebooks_books_ebookdate) LIMIT 0 , 30 ";
```

- Notas: QUERY DIN?MICA

## Q0913

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `ebooks_books_file`
- Archivo:l?nea: `ebooks/adm/index.php:223-233`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT ebooks_books_file as Libro, ebooks_books_download_rank as Bajados FROM ebooks_books ORDER BY ebooks_books_download_rank DESC LIMIT 0 , 40 ";
```

- Notas: QUERY DIN?MICA

## Q0914

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `download_log`, `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `download_log_timestamp`, `ebooks_books_doc_type`, `ebooks_books_subtitle`, `download_log_object`, `ebooks_books_title`, `ebooks_books_file`, `ebooks_books_id`
- Archivo:l?nea: `ebooks/adm/index.php:239-256`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT COUNT(*) AS ebooks_books_download_rank, download_log_object, ebooks_books.ebooks_books_title, CONCAT_WS('<br>', ebooks_books.ebooks_books_title,ebooks_books.ebooks_books_subtitle) as book_title, ebooks_books.ebooks_books_id FROM download_log, ebooks_books WHERE DAYOFYEAR( download_log_timestamp ) <= DAYOFYEAR(now()) AND DAYOFYEAR( download_log_timestamp ) >= DAYOFYEAR(now())- 60 AND ebooks_books.ebooks_books_file = download_log.download_log_object AND ebooks_books.ebooks_books_doc_type = 'books' GROUP BY download_log_object ORDER BY ebooks_books_download_rank DESC ";
```

- Notas: QUERY DIN?MICA

## Q0915

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `download_log`
- Columnas detectadas: `download_log_object`, `download_log_status`, `download_log_type`
- Archivo:l?nea: `ebooks/adm/index.php:261-273`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT download_log_object as Pagina, count( * ) as Accesos FROM download_log WHERE download_log_status = 'viewed' AND download_log_type = 'embed' GROUP BY download_log_object ORDER BY Accesos DESC LIMIT 0 , 30 ";
```

- Notas: QUERY DIN?MICA

## Q0916

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_users_ebooks`
- Columnas detectadas: `ebooks_users_ebooks_last_read_from`, `ebooks_users_ebooks_current_page`, `ebooks_users_ebooks_html_access`, `ebooks_users_ebooks_wap_access`, `ebooks_users_ebooks_first_read`, `ebooks_users_ebooks_last_read`, `ebooks_books_file`, `sys_users_code`, `pagina`, `libro`
- Archivo:l?nea: `ebooks/adm/index.php:284-298`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT sys_users_code as usuario, ebooks_books_file as libro, ebooks_users_ebooks_current_page as pagina, ebooks_users_ebooks_first_read as inicio, ebooks_users_ebooks_last_read as ultimo, DATEDIFF(ebooks_users_ebooks_last_read, ebooks_users_ebooks_first_read ) as dias, ebooks_users_ebooks_last_read_from as leido_desde, ebooks_users_ebooks_html_access as html, ebooks_users_ebooks_wap_access as wap FROM `ebooks_users_ebooks` ORDER BY `ebooks_users_ebooks_last_read` DESC LIMIT 0 , 30 ";
```

- Notas: QUERY DIN?MICA

## Q0917

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_users_ebooks`
- Columnas detectadas: `ebooks_users_ebooks_last_read_from`, `ebooks_users_ebooks_current_page`, `ebooks_users_ebooks_html_access`, `ebooks_users_ebooks_wap_access`, `ebooks_users_ebooks_first_read`, `ebooks_users_ebooks_last_read`, `ebooks_books_file`, `sys_users_code`, `pagina`, `libro`
- Archivo:l?nea: `ebooks/adm/index.php:307-321`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT sys_users_code as usuario, ebooks_books_file as libro, ebooks_users_ebooks_current_page as pagina, ebooks_users_ebooks_first_read as inicio, ebooks_users_ebooks_last_read as ultimo, DATEDIFF(ebooks_users_ebooks_last_read, ebooks_users_ebooks_first_read ) as dias, ebooks_users_ebooks_last_read_from as leido_desde, ebooks_users_ebooks_html_access as html, ebooks_users_ebooks_wap_access as wap FROM `ebooks_users_ebooks` WHERE DATEDIFF(ebooks_users_ebooks_last_read, ebooks_users_ebooks_first_read ) > 0 ORDER BY `ebooks_users_ebooks_last_read` DESC ";
```

- Notas: QUERY DIN?MICA

## Q0918

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `download_log`
- Columnas detectadas: `download_log_timestamp`, `download_log_status`, `download_log_type`
- Archivo:l?nea: `ebooks/adm/index.php:329-339`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT DAYOFYEAR( download_log_timestamp) AS D�a, COUNT(*) AS Clicks FROM download_log WHERE download_log_status = 'clicked' AND download_log_type = 'buscar_precios' GROUP BY DAYOFYEAR( download_log_timestamp) ORDER BY DAYOFYEAR( download_log_timestamp) DESC ";
```

- Notas: QUERY DIN?MICA

## Q0919

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `id`
- Archivo:l?nea: `ebooks/adm/index.php:347-350`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT CONCAT('http://planetalibro.net/ebooks/eam/ebook_view.php?ebooks_books_id=',ebooks_books_id) as id FROM ebooks_books ";
```

- Notas: QUERY DIN?MICA

## Q0920

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `id`
- Archivo:l?nea: `ebooks/adm/index.php:358-361`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT CONCAT('http://planetalibro.net/ebooks/eam/index.php?author=',ebooks_authors_id) as id FROM `ebooks_authors` ";
```

- Notas: QUERY DIN?MICA

## Q0921

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `id`
- Archivo:l?nea: `ebooks/adm/index.php:370-373`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT CONCAT('http://planetalibro.net/ebooks/eam/ebook_view.php?ebooks_books_id=',ebooks_books_id) as id FROM ebooks_books ";
```

- Notas: QUERY DIN?MICA

## Q0922

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_authors_id`
- Archivo:l?nea: `ebooks/adm/index.php:464-470`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = " SELECT ebooks_authors_name FROM ebooks_authors WHERE ebooks_authors_id = ".$_author_id;
```

- Notas: QUERY DIN?MICA

## Q0923

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `hua_locations`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:14-18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function get_location_by_id( $_location_id = 0 ) { if ( $_location_id ) { $_query = "SELECT * FROM hua_locations WHERE hua_location_id = '$_location_id'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0924

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `hua_locations`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = "INSERT INTO hua_locations SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0925

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `links`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:112-116`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function get_link_by_url( $_link_url = "" ) { if ( $_link_url ) { $_query = "SELECT * FROM links WHERE link_url = '$_link_url'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q0926

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `links`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:135`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "INSERT INTO links SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en ebooks/adm/mp_dbfuncs.php:142; tabla fuera de 10_DB_CATALOG

## Q0927

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:174`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "INSERT INTO ".$table." SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en ebooks/adm/mp_dbfuncs.php:177

## Q0928

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:201`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "UPDATE ".$table." SET " . implode( ",", $_query_params )." WHERE ".$_key." = '". $_vars[$_key]."'";
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en ebooks/adm/mp_dbfuncs.php:207

## Q0929

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `value`, `{COL_DYNAMIC}`
- Archivo:l?nea: `ebooks/adm/mp_dbfuncs.php:218-222`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function table_select( $table, $field, $value, $limit=100 ) { if ( $field ) { $_query = "SELECT * FROM ".$table." WHERE ".$field." = '".$value."' LIMIT ".$limit;
```

- Notas: QUERY DIN?MICA

## Q0930

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `cantidad`
- Archivo:l?nea: `ebooks/adm/mp_megaupload.php:39`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_subidos = mpdb_get_value("select count(*) as cantidad from ebooks_books where `ebooks_books_megaupload` is not null", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0931

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `cantidad`
- Archivo:l?nea: `ebooks/adm/mp_megaupload.php:40`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$libros_no_subidos = mpdb_get_value("select count(*) as cantidad from ebooks_books where `ebooks_books_megaupload` is null", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0932

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_download_rank`, `ebooks_books_title`, `ebooks_books_file`, `ebooks_books_id`
- Archivo:l?nea: `ebooks/adm/mp_megaupload.php:60-66`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$books = mpdb_get_value(" select ebooks_books_id,ebooks_books_title,ebooks_books_file,ebooks_books_file_alternative,ebooks_books_download_rank from ebooks_books where `ebooks_books_megaupload` is null order by `ebooks_books_download_rank` desc limit 20", $dbconn);
```

- Notas: QUERY DIN?MICA

## Q0933

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `ebooks/adm/mp_megaupload_setbook_core.php:37-39`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set ebooks_books_megaupload = '".$_REQUEST['megaupload_code']."' where ebooks_books_id = ".$p_ebook_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en ebooks/adm/mp_megaupload_setbook_core.php:41; posible SQLi

## Q0934

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_file_alternative`, `ebooks_books_title`, `ebooks_books_file`, `ebooks_books_id`, `{COL_DYNAMIC}`
- Archivo:l?nea: `ebooks/adm/mp_megaupload_setbook_core.php:58-61`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " select ebooks_books_id,ebooks_books_title,ebooks_books_file,ebooks_books_file_alternative,ebooks_books_megaupload from ebooks_books where ".$_where;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en ebooks/adm/mp_megaupload_setbook_core.php:65

## Q0935

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_ranked`
- Archivo:l?nea: `ebooks/adm/rankear_autores.php:37`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_ranked = 0 limit 200";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en ebooks/adm/rankear_autores.php:38

## Q0936

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `ebooks_authors_id`, `ebooks_books_id`, `rank`
- Archivo:l?nea: `ebooks/adm/rankear_autores.php:61`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select sum(ebooks_books_download_rank) as rank from ebooks_books where ebooks_books_id = ".$autores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en ebooks/adm/rankear_autores.php:64

## Q0937

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_rank`, `ebooks_authors_id`, `rank`
- Archivo:l?nea: `ebooks/adm/rankear_autores.php:70`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_authors set ebooks_authors_rank = ".$autor_rank[0]['rank']." where ebooks_authors_id = ".$autores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en ebooks/adm/rankear_autores.php:71

## Q0938

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_ranked`, `ebooks_authors_id`
- Archivo:l?nea: `ebooks/adm/rankear_autores.php:73`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_authors set ebooks_authors_ranked = 1"." where ebooks_authors_id = ".$autores[$i]['ebooks_authors_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en ebooks/adm/rankear_autores.php:74

## Q0939

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `first_read`, `last_read`, `user_id`, `userid`
- Archivo:l?nea: `f_user_video_audiolibros_insert.php:31-35`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into user_video_audiolibros SET user_id = ".$userid.", last_read = now(), first_read = now(), ebooks_books_id = ".$q;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en f_user_video_audiolibros_insert.php:38

## Q0940

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `current_min`, `user_id`, `userid`
- Archivo:l?nea: `f_user_video_audiolibros_updatetime.php:44`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_video_audiolibros set current_min = ".$time." where user_id=".$userid." and ebooks_books_id=".$bookid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en f_user_video_audiolibros_updatetime.php:55

## Q0941

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `current_min`, `user_id`, `max_min`, `userid`
- Archivo:l?nea: `f_user_video_audiolibros_updatetime.php:49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_video_audiolibros set current_min = ".$time.", max_min = ".$time." where user_id=".$userid." and ebooks_books_id=".$bookid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en f_user_video_audiolibros_updatetime.php:55

## Q0942

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `videoid`, `rank`
- Archivo:l?nea: `f_video_subirrank.php:33`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update videos_book set rank = rank + 1 where videoid = '".$p_videoid."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en f_video_subirrank.php:35

## Q0943

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_rechazados`
- Columnas detectadas: `tema`, `ip`, `{COL_DYNAMIC}`
- Archivo:l?nea: `funciones.php:535`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into videos_rechazados set ".$p_tipo_objeto." = '".$p_objetoid."', tema='".$p_tema."', ip='".$ip."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en funciones.php:539; tabla fuera de 10_DB_CATALOG

## Q0944

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mp_dictionary`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `funciones.php:1539`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM mp_dictionary WHERE word = '".$word."'" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en funciones.php:1543; tabla fuera de 10_DB_CATALOG

## Q0945

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `google-callback.php:25`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE EMAIL=:email");
```

- Notas: QUERY DIN?MICA

## Q0946

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `password`, `email`, `name`
- Archivo:l?nea: `google-callback.php:35`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$insert_query = $connection->prepare("INSERT INTO user_table (EMAIL, PASSWORD, NAME) VALUES (:email, :password, :name)");
```

- Notas: QUERY DIN?MICA

## Q0947

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `read_online`, `title`, `demo`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `index.php:384`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_title AS title, uri FROM ebooks_books WHERE demo = 1 AND read_online = 1 ORDER BY ".$orderby." DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA

## Q0948

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `read_online`, `title`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `index.php:389`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_title AS title, uri FROM ebooks_books WHERE read_online = 1 ORDER BY ".$orderby." DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en index.php:401

## Q0949

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_labels`, `ebooks_books_title`, `ebooks_books_id`, `read_online`, `title`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `index.php:394`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_title AS title, uri FROM ebooks_books WHERE read_online = 1 AND ebooks_books_labels like '%".$_tema."%' ORDER BY ".$orderby." DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en index.php:401

## Q0950

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `read_online`, `title`, `demo`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `index_2025.0.php:369`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_title AS title, uri FROM ebooks_books WHERE demo = 1 AND read_online = 1 ORDER BY ".$orderby." DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA

## Q0951

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `ebooks_books_id`, `read_online`, `title`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `index_2025.0.php:374`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_title AS title, uri FROM ebooks_books WHERE read_online = 1 ORDER BY ".$orderby." DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en index_2025.0.php:386

## Q0952

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_labels`, `ebooks_books_title`, `ebooks_books_id`, `read_online`, `title`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `index_2025.0.php:379`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id, ebooks_books_title AS title, uri FROM ebooks_books WHERE read_online = 1 AND ebooks_books_labels like '%".$_tema."%' ORDER BY ".$orderby." DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en index_2025.0.php:386

## Q0953

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_authors_rank`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `indice_autores.php:49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_authors_id,uri,ebooks_authors_name from ebooks_authors where ebooks_authors_rank > 0 order by `ebooks_authors_rank` desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en indice_autores.php:50

## Q0954

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `libro`
- Archivo:l?nea: `kindle_pedir.php:59`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update libros_pedidos set pedido = pedido + ".$pedido_peso." where libro = '".mpdb_real_escape_string($p_libro)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en kindle_pedir.php:60

## Q0955

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `pedido`, `libro`
- Archivo:l?nea: `kindle_pedir.php:63`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into libros_pedidos set libro = '".mpdb_real_escape_string($p_libro)."',"." pedido = ".$pedido_peso;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en kindle_pedir.php:65

## Q0956

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `current_page`, `last_read`, `user_id`, `leidas`, `userid`, `libro`
- Archivo:l?nea: `leerlibro_funcs.php:1083`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_books set current_page = ".$p_pagina.", last_read = now(), leidas = leidas + 1 where user_id = ".$_SESSION['userid']." and ebooks_books_id = ".$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en leerlibro_funcs.php:1084

## Q0957

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `page_number`, `read_at`, `user_id`, `book_id`
- Archivo:l?nea: `leerlibro_funcs.php:1344-1345`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO user_books_log (user_id, book_id, page_number, read_at) VALUES ($user_id, $book_id, $page, NOW())";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en leerlibro_funcs.php:1347

## Q0958

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `lib/facebook-sdk/Facebook.php:418-427`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
public function delete($endpoint, array $params = [], $accessToken = null, $eTag = null, $graphVersion = null) { return $this->sendRequest( 'DELETE', $endpoint, $params, $accessToken, $eTag, $graphVersion );
```

- Notas: QUERY DIN?MICA

## Q0959

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views`, `uri`
- Archivo:l?nea: `libro.php:168`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views = views + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro.php:169

## Q0960

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `uri`
- Archivo:l?nea: `libro.php:172`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views_last = views_last + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro.php:173

## Q0961

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last_week`, `uri`
- Archivo:l?nea: `libro.php:176`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views_last_week = views_last_week + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro.php:177

## Q0962

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last_year`, `views_last_week`, `uri`
- Archivo:l?nea: `libro.php:180`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views_last_week = views_last_year + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro.php:181

## Q0963

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last_year`, `views_last_week`, `views_last`, `views`, `uri`
- Archivo:l?nea: `libro.php:184-189`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET views = views + 1, views_last = views_last + 1, views_last_week = views_last_week + 1, views_last_year = views_last_year + 1 WHERE uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro.php:190

## Q0964

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `tags`
- Columnas detectadas: `nombre_es`, `book_id`, `tag_id`, `uri`, `id`
- Archivo:l?nea: `libro.php:904-908`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = "SELECT t.nombre_es, t.uri FROM books_tags bt JOIN tags t ON bt.tag_id = t.id WHERE bt.book_id = $book_id ORDER BY t.nombre_es ASC";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en libro.php:910

## Q0965

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views`, `uri`
- Archivo:l?nea: `libro_2023.php:154`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views = views + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_2023.php:155

## Q0966

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `uri`
- Archivo:l?nea: `libro_2023.php:158`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views_last = views_last + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_2023.php:159

## Q0967

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `libro`, `id`
- Archivo:l?nea: `libro_2023.php:406`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_books where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_2023.php:408

## Q0968

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `libro`, `id`
- Archivo:l?nea: `libro_2023.php:423`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_books where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_2023.php:425

## Q0969

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views`, `uri`
- Archivo:l?nea: `libro_2024x1.php:154`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views = views + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_2024x1.php:155

## Q0970

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `uri`
- Archivo:l?nea: `libro_2024x1.php:158`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views_last = views_last + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_2024x1.php:159

## Q0971

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`, `uri`
- Archivo:l?nea: `libro_funcs.php:565`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_download_rank = ebooks_books_download_rank + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:566

## Q0972

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `video_audiolibro`, `libro`, `uri`
- Archivo:l?nea: `libro_funcs.php:1116`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set video_audiolibro = '".$video_audiolibro."' where uri = '".$libro['uri']."'" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:1118

## Q0973

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`
- Archivo:l?nea: `libro_funcs.php:1132`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET views_last = 0" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:1134

## Q0974

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last_week`
- Archivo:l?nea: `libro_funcs.php:1151`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET views_last_week = 0" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:1153

## Q0975

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last_year`
- Archivo:l?nea: `libro_funcs.php:1170`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE ebooks_books SET views_last_year = 0" ;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:1172

## Q0976

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `rank`
- Archivo:l?nea: `libro_funcs.php:1244-1248`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "select * from videos_book where libro_uri = '".$libro_uri."' order by rank desc LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q0977

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`
- Archivo:l?nea: `libro_funcs.php:1253-1258`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$libro_uri."' AND is_short = 1 ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1259

## Q0978

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `rank`
- Archivo:l?nea: `libro_funcs.php:1268-1273`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$libro_uri."' AND is_short = 0 ORDER BY rank DESC LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1274

## Q0979

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `rank`
- Archivo:l?nea: `libro_funcs.php:1321-1325`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from videos_book where libro_uri = '".$libro_uri."' order by rank desc LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1335

## Q0980

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `id`
- Archivo:l?nea: `libro_funcs.php:1331-1334`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT MIN(id) AS min_id, MAX(id) AS max_id FROM videos_book WHERE libro_uri = '".$libro_uri."' AND is_short = 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1335

## Q0981

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `id`
- Archivo:l?nea: `libro_funcs.php:1344-1349`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$libro_uri."' AND is_short = 1 AND id >= ".$rand_id." LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1350

## Q0982

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`
- Archivo:l?nea: `libro_funcs.php:1354-1358`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$libro_uri."' AND is_short = 1 LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1359

## Q0983

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `rank`
- Archivo:l?nea: `libro_funcs.php:1367-1372`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$libro_uri."' AND is_short = 0 ORDER BY rank DESC LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1373

## Q0984

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `videoid`, `fecha`, `rank`, `lang`, `uri`
- Archivo:l?nea: `libro_funcs.php:1730`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select libro_uri as uri, videoid, fecha, rank, lang from videos_book where rank > 99000 and lang = '".$p_lang."' group by videoid order by fecha DESC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1732

## Q0985

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos`
- Columnas detectadas: `channelid`, `videos`, `id`
- Archivo:l?nea: `libro_funcs.php:1821`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos WHERE channelid= '".$p_canal."' or channelid= '".$gvar['youtube'][$p_canal]."' order by id desc limit 10";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1829

## Q0986

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos`
- Columnas detectadas: `videos`, `id`
- Archivo:l?nea: `libro_funcs.php:1824`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos WHERE order by id desc limit 10";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:1829

## Q0987

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `lang`
- Archivo:l?nea: `libro_funcs.php:2190`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = '".$gvar['lang']."' order by ebooks_books_updated desc limit 18";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2191

## Q0988

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`
- Archivo:l?nea: `libro_funcs.php:2223`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = 'en' order by ebooks_books_updated desc limit 12";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2224

## Q0989

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `video_audiolibro`
- Archivo:l?nea: `libro_funcs.php:2262`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = '".$_lang."' and video_audiolibro <> '' and video_audiolibro <> 'sin-audiolibro' order by ebooks_books_updated desc limit 18";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2263

## Q0990

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_books_ebookdate`, `ebooks_authors_name`, `ebooks_books_author`, `ebooks_books_title`, `ebooks_books_lang`, `ebooks_authors_id`, `title`, `lang`, `uri`
- Archivo:l?nea: `libro_funcs.php:2300-2305`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.ebooks_books_title as title, b.uri, b.ebooks_books_ebookdate, a.ebooks_authors_name as autor FROM ebooks_books b LEFT JOIN ebooks_authors a ON b.ebooks_books_author = a.ebooks_authors_id WHERE b.ebooks_books_ebookdate IS NOT NULL AND DATE(b.ebooks_books_ebookdate) > CURDATE() and ebooks_books_lang = '".$gvar['lang']."' ORDER BY b.ebooks_books_ebookdate ASC LIMIT 12";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2308

## Q0991

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `recomendado`, `lang`
- Archivo:l?nea: `libro_funcs.php:2341`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where recomendado = 1 and ebooks_books_lang = '".$gvar['lang']."' order by ebooks_books_updated desc limit 12";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2342

## Q0992

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `link_hotmart`, `lang`
- Archivo:l?nea: `libro_funcs.php:2376`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where link_hotmart IS NOT NULL and ebooks_books_lang = '".$gvar['lang']."' order by ebooks_books_updated desc limit 12";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2379

## Q0993

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `views_last`
- Archivo:l?nea: `libro_funcs.php:2561`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = '".$p_lang."' order by views_last desc limit 30";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2562

## Q0994

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_lang`, `ebooks_books_id`, `user_id`
- Archivo:l?nea: `libro_funcs.php:2593-2601`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT eb.*, COUNT(ub.user_id) AS total_readers FROM ebooks_books eb LEFT JOIN user_books ub ON eb.ebooks_books_id = ub.ebooks_books_id WHERE eb.ebooks_books_lang = '".$p_lang."' GROUP BY eb.ebooks_books_id ORDER BY total_readers DESC LIMIT 30 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2603

## Q0995

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_lang`, `read_online`, `lang`
- Archivo:l?nea: `libro_funcs.php:2634`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = '".$gvar['lang']."' and read_online = 1 order by ebooks_books_updated desc limit 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2635

## Q0996

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_id`, `last_read`, `user_id`, `userid`
- Archivo:l?nea: `libro_funcs.php:2671-2676`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT user_books.*, ebooks_books.* FROM user_books JOIN ebooks_books ON user_books.ebooks_books_id = ebooks_books.ebooks_books_id WHERE user_books.user_id = ".$_SESSION['userid']." ORDER BY user_books.last_read DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA

## Q0997

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_id`, `read_online`, `last_read`, `user_id`, `userid`
- Archivo:l?nea: `libro_funcs.php:2679-2685`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT user_books.*, ebooks_books.* FROM user_books JOIN ebooks_books ON user_books.ebooks_books_id = ebooks_books.ebooks_books_id WHERE user_books.user_id = ".$_SESSION['userid']." AND ebooks_books.read_online = 1 ORDER BY user_books.last_read DESC LIMIT 15";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2687

## Q0998

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_format_mobi`, `ebooks_books_lang`, `views`, `lang`
- Archivo:l?nea: `libro_funcs.php:2725`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_lang = '".$gvar['lang']."' and ebooks_format_mobi = 1 order by views limit 12";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2727

## Q0999

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`, `tags`
- Columnas detectadas: `ebooks_books_lang`, `ebooks_books_id`, `book_id`, `tag_id`, `lang`, `uri`, `id`
- Archivo:l?nea: `libro_funcs.php:2793-2802`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT b.* FROM ebooks_books b JOIN books_tags bt ON bt.book_id = b.ebooks_books_id JOIN tags t ON t.id = bt.tag_id WHERE b.ebooks_books_lang = '".$gvar['lang']."' $sql_read_online AND t.uri = '".$tag_uri."' ORDER BY $orderby DESC LIMIT ".$_cant;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2806

## Q1000

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`, `tags`
- Columnas detectadas: `ebooks_books_lang`, `ebooks_books_id`, `nombre_es`, `book_id`, `tag_id`, `lang`, `id`
- Archivo:l?nea: `libro_funcs.php:2908-2917`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT b.* FROM ebooks_books b JOIN books_tags bt ON bt.book_id = b.ebooks_books_id JOIN tags t ON t.id = bt.tag_id WHERE b.ebooks_books_lang = '".$gvar['lang']."' $sql_read_online AND t.nombre_es LIKE '%".$tema_search."%' ORDER BY $orderby DESC LIMIT ".$_cant;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:2921

## Q1001

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_author`, `ebooks_books_lang`, `ebooks_authors_id`, `lang`, `{COL_DYNAMIC}`
- Archivo:l?nea: `libro_funcs.php:2996-3000`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_author = '".$p_aautor['ebooks_authors_id']."' AND ebooks_books_lang = '".$gvar['lang']."' ORDER BY ".$orderby." DESC LIMIT ".$_cant;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3004

## Q1002

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`
- Archivo:l?nea: `libro_funcs.php:3183`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_title = '".$titulo."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3186

## Q1003

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `libro_funcs.php:3207`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3208

## Q1004

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `tags`
- Columnas detectadas: `nombre_es`, `book_id`, `tag_id`, `id`
- Archivo:l?nea: `libro_funcs.php:3569-3573`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$sql = "SELECT t.nombre_es FROM books_tags bt JOIN tags t ON bt.tag_id = t.id WHERE bt.book_id = $book_id ORDER BY t.nombre_es ASC";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en libro_funcs.php:3575

## Q1005

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`
- Archivo:l?nea: `libro_funcs.php:3596`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT COUNT(*) as total FROM ebooks_books WHERE read_online = 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3597

## Q1006

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `dompub`
- Archivo:l?nea: `libro_funcs.php:3620`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT COUNT(*) as total FROM ebooks_books WHERE dompub = 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3621

## Q1007

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `libro_funcs.php:3688`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_uri = "SELECT uri FROM ebooks_books WHERE ebooks_books_id = " . $libro_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3689

## Q1008

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `read_online`, `uri`
- Archivo:l?nea: `libro_funcs.php:3717`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set read_online = 0, ebooks_books_updated = NOW() where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:3719

## Q1009

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_labels`, `uri`
- Archivo:l?nea: `libro_funcs.php:3741-3750`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = " UPDATE ebooks_books SET ebooks_books_labels = CASE WHEN ebooks_books_labels IS NULL OR TRIM(ebooks_books_labels) = '' THEN '$p_tag' ELSE CONCAT(ebooks_books_labels, '\n', '$p_tag') END WHERE uri = '$p_uri' AND NOT FIND_IN_SET('$p_tag', REPLACE(ebooks_books_labels, '\n', ',')) > 0 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en libro_funcs.php:3753

## Q1010

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `book_id`
- Archivo:l?nea: `libro_funcs.php:3839`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT COUNT(*) AS total_users FROM user_books WHERE ebooks_books_id = ".$book_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3841

## Q1011

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_lang`, `lang`, `uri`, `{COL_DYNAMIC}`
- Archivo:l?nea: `libro_funcs.php:3905-3916`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT uri FROM ( SELECT uri FROM ebooks_books WHERE ebooks_books_lang = '".$gvar['lang']."' ".$sql_read_online." ORDER BY ".$orderby." DESC LIMIT 10 ) AS top10 ORDER BY RAND() LIMIT 1 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3918

## Q1012

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `libro_funcs.php:3935`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".mpdb_escape($p_uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3937

## Q1013

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `ebooks_books_id`, `book_id`, `id`
- Archivo:l?nea: `libro_funcs.php:3946-3948`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id FROM ebooks_trivia_questions WHERE ebooks_books_id = $book_id LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_funcs.php:3952

## Q1014

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `lang`
- Archivo:l?nea: `libro_zapping_funcs.php:226`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book where lang = '".$lang."' ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:228

## Q1015

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `libro_zapping_funcs.php:282`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'SELECT * FROM videos_book ORDER BY rand() LIMIT 1';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:283

## Q1016

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`, `v_ebooks_books_top`
- Columnas detectadas: `libro_uri`, `uri`
- Archivo:l?nea: `libro_zapping_funcs.php:307-313`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'SELECT * FROM videos_book WHERE libro_uri IN ( SELECT uri FROM v_ebooks_books_top ) ORDER BY rand() LIMIT 1';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:314; tabla fuera de 10_DB_CATALOG

## Q1017

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `libro_zapping_funcs.php:361`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book where libro_uri ='".$_uri."' ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:362

## Q1018

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `libro_zapping_funcs.php:411`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book where libro_uri ='".$_uri."' ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:412

## Q1019

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `uri`
- Archivo:l?nea: `libro_zapping_funcs.php:444`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'SELECT uri FROM ebooks_books ORDER BY views_last DESC LIMIT '.$cant;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:445

## Q1020

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books_log`
- Columnas detectadas: `uri`
- Archivo:l?nea: `libro_zapping_funcs.php:465`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT uri FROM user_books_log ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:466

## Q1021

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `libro_zapping_funcs.php:482`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri like '".$p_autor."%' ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1022

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `id`
- Archivo:l?nea: `libro_zapping_funcs.php:496`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE id = ".$p_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:510

## Q1023

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `libro_zapping_funcs.php:522`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'SELECT * FROM videos_book ORDER BY rand() LIMIT 1';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:523

## Q1024

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`
- Archivo:l?nea: `libro_zapping_funcs.php:543`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$p_uri."' ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1025

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `id`
- Archivo:l?nea: `libro_zapping_funcs.php:558`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE libro_uri = '".$p_uri."' ORDER BY id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en libro_zapping_funcs.php:559

## Q1026

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `videoid`
- Archivo:l?nea: `libro_zapping_funcs.php:627`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT * FROM videos_book WHERE videoid = '".$p_videoid."' ORDER BY rand() LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1027

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_name`, `ebooks_authors_rank`, `ebooks_authors_id`, `uri`
- Archivo:l?nea: `list_autores_top.php:49`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_authors_id,uri,ebooks_authors_name from ebooks_authors where ebooks_authors_rank > 0 order by `ebooks_authors_rank` desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en list_autores_top.php:50

## Q1028

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `login.php:31`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE EMAIL=:email");
```

- Notas: QUERY DIN?MICA

## Q1029

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `remember_token`, `userid`
- Archivo:l?nea: `login.php:60`
- Conexi?n/helper: `PDO/NO_CONFIRMADO` / `prepare`
- Query:

```php
$sql = "UPDATE user_table SET remember_token = ? WHERE userid = ?";
```

- Notas: QUERY DIN?MICA; usa helper prepare en login.php:61

## Q1030

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `login2.php:43`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE EMAIL=:email");
```

- Notas: QUERY DIN?MICA

## Q1031

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `userid`
- Archivo:l?nea: `login2.php:61`
- Conexi?n/helper: `PDO/NO_CONFIRMADO` / `prepare`
- Query:

```php
$sql = "UPDATE user_table SET last_visit=? WHERE userid=?";
```

- Notas: QUERY DIN?MICA; usa helper prepare en login2.php:62

## Q1032

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `login_recover - 0.php:82`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE email=:email");
```

- Notas: QUERY DIN?MICA

## Q1033

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `login_recover.php:101`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE email=:email");
```

- Notas: QUERY DIN?MICA

## Q1034

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `login_register.php:57`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE email=:email");
```

- Notas: QUERY DIN?MICA

## Q1035

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `username`, `email`
- Archivo:l?nea: `login_register.php:77`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("INSERT INTO user_table(USERNAME,P_HASH,EMAIL,DATE_JOINED) VALUES (:username,:password_hash,:email,:date_joined)");
```

- Notas: QUERY DIN?MICA

## Q1036

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `remember_token`, `userid`
- Archivo:l?nea: `logout.php:19`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE user_table SET remember_token = NULL WHERE userid = ".$_SESSION['userid'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en logout.php:21

## Q1037

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `libro`, `rank`, `uri`
- Archivo:l?nea: `mp_booktube_funcs.php:348-352`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from videos_book where libro_uri = '".$gvar['libro']['uri']."' order by rank desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_booktube_funcs.php:355

## Q1038

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `rank`
- Archivo:l?nea: `mp_booktube_funcs.php:662-666`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from videos_book where libro_uri = '".$p_libro_uri."' order by rank desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_booktube_funcs.php:668

## Q1039

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `uri`
- Archivo:l?nea: `mp_booktube_funcs.php:759`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_updated = NOW() where uri='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_booktube_funcs.php:761

## Q1040

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `hua_locations`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `mp_dbfuncs.php:14-18`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function get_location_by_id( $_location_id = 0 ) { if ( $_location_id ) { $_query = "SELECT * FROM hua_locations WHERE hua_location_id = '$_location_id'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1041

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `hua_locations`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `mp_dbfuncs.php:36`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = "INSERT INTO hua_locations SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1042

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `links`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `mp_dbfuncs.php:142-146`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function get_link_by_url( $_link_url = "" ) { if ( $_link_url ) { $_query = "SELECT * FROM links WHERE link_url = '$_link_url'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1043

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `links`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `mp_dbfuncs.php:165`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$_query = "INSERT INTO links SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en mp_dbfuncs.php:172; tabla fuera de 10_DB_CATALOG

## Q1044

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `mp_dbfuncs.php:204`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$_query = "INSERT INTO ".$table." SET " . implode( ",", $_query_params );
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en mp_dbfuncs.php:207

## Q1045

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `{COL_DYNAMIC}`
- Archivo:l?nea: `mp_dbfuncs.php:231`
- Conexi?n/helper: `mysqli` / `mysqli_query`
- Query:

```php
$_query = "UPDATE ".$table." SET " . implode( ",", $_query_params )." WHERE ".$_key." = '". $_vars[$_key]."'";
```

- Notas: QUERY DIN?MICA; usa helper mysqli_query en mp_dbfuncs.php:237

## Q1046

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: `value`, `{COL_DYNAMIC}`
- Archivo:l?nea: `mp_dbfuncs.php:248-252`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function table_select( $table, $field, $value, $limit=100 ) { if ( $field ) { $_query = "SELECT * FROM ".$table." WHERE ".$field." = '".$value."' LIMIT ".$limit;
```

- Notas: QUERY DIN?MICA

## Q1047

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing`
- Columnas detectadas: `is_global`, `message`, `subject`, `name`
- Archivo:l?nea: `mp_mailing.php:52-53`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO mailing (name, subject, message, is_global) VALUES ('$name', '$subject', '$message', $is_global)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:55

## Q1048

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: `id`
- Archivo:l?nea: `mp_mailing.php:57`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_last_id = "SELECT LAST_INSERT_ID() AS id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:58

## Q1049

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`, `user_email`, `email`
- Archivo:l?nea: `mp_mailing.php:71-72`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_insert = "INSERT INTO mailing_users (mailing_id, email) VALUES ($mailing_id, '$user_email')";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:74

## Q1050

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`, `status`, `id`
- Archivo:l?nea: `mp_mailing.php:83-85`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM mailing_users WHERE mailing_id = $mailing_id AND (status = 'pending' OR status = 'failed') ORDER BY id ASC LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:87

## Q1051

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `email`
- Archivo:l?nea: `mp_mailing.php:133-134`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM mailing_users WHERE email = '" . $next_user['email']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:137

## Q1052

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `message`, `subject`, `id`
- Archivo:l?nea: `mp_mailing.php:148`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_campaign = "SELECT subject, message FROM mailing WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:149

## Q1053

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `sent_at`, `status`, `id`
- Archivo:l?nea: `mp_mailing.php:194-196`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_update = "UPDATE mailing_users SET status = 'sent', sent_at = NOW() WHERE id = " . (int)$next_user['id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:204

## Q1054

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `retries`, `status`, `id`
- Archivo:l?nea: `mp_mailing.php:198-200`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_update = "UPDATE mailing_users SET status = 'pending', retries = retries + 1 WHERE id = " . (int)$next_user['id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:204

## Q1055

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `last_mail`, `id`
- Archivo:l?nea: `mp_mailing.php:208`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_update_last_mail = "UPDATE mailing SET last_mail = CURDATE() WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:209

## Q1056

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`, `status`
- Archivo:l?nea: `mp_mailing.php:214-215`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_check_pending = "SELECT COUNT(*) AS pending FROM mailing_users WHERE mailing_id = $mailing_id AND (status = 'pending' or status = 'failed' )";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:217

## Q1057

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `mp_mailing.php:236`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_users = "SELECT email FROM user_table";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:238

## Q1058

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`, `user_email`, `email`
- Archivo:l?nea: `mp_mailing.php:243-244`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_insert = "INSERT INTO mailing_users (mailing_id, email) VALUES ($mailing_id, '$user_email')";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:246

## Q1059

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`
- Columnas detectadas: `completed`, `id`
- Archivo:l?nea: `mp_mailing.php:255`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id FROM mailing WHERE completed = 0 ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:257

## Q1060

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `completed`, `id`
- Archivo:l?nea: `mp_mailing.php:271-273`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE mailing SET completed = 1 WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:275

## Q1061

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `completed`, `id`
- Archivo:l?nea: `mp_mailing.php:287-289`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT completed FROM mailing WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:291

## Q1062

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `id`
- Archivo:l?nea: `mp_mailing.php:308`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_check_campaign = "SELECT id FROM mailing WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:309

## Q1063

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`
- Archivo:l?nea: `mp_mailing.php:316`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_delete_users = "DELETE FROM mailing_users WHERE mailing_id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:318

## Q1064

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `id`
- Archivo:l?nea: `mp_mailing.php:321`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_delete_campaign = "DELETE FROM mailing WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:323

## Q1065

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`
- Columnas detectadas: `completed`, `last_mail`, `id`
- Archivo:l?nea: `mp_mailing.php:339-341`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id FROM mailing WHERE completed = 1 AND last_mail IS NOT NULL AND DATEDIFF(NOW(), last_mail) > 7";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:343

## Q1066

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `mailing_id`
- Archivo:l?nea: `mp_mailing.php:354`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_delete_users = "DELETE FROM mailing_users WHERE mailing_id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:356

## Q1067

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `id`
- Archivo:l?nea: `mp_mailing.php:355`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_delete_campaign = "DELETE FROM mailing WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:357

## Q1068

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing`, `mailing_users`
- Columnas detectadas: `mailing_id`, `id`
- Archivo:l?nea: `mp_mailing.php:371-372`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id FROM mailing WHERE id NOT IN (SELECT DISTINCT mailing_id FROM mailing_users)";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_mailing.php:374

## Q1069

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `mailing`
- Columnas detectadas: `mailing_id`, `id`
- Archivo:l?nea: `mp_mailing.php:385`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql_delete_campaign = "DELETE FROM mailing WHERE id = $mailing_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en mp_mailing.php:386

## Q1070

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `videos`
- Columnas detectadas: `youtubeid`, `videoid`, `videos`
- Archivo:l?nea: `mp_youtube_funcs.php:400`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from videos where youtubeid = '".mpdb_real_escape_string($videoid)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en mp_youtube_funcs.php:401

## Q1071

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos`
- Columnas detectadas: `channeltitle`, `thumbnail`, `youtubeid`, `channelid`, `videoid`, `videos`, `title`
- Archivo:l?nea: `mp_youtube_funcs.php:467-472`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = "INSERT INTO videos SET youtubeid='".$avideo['videoid']."', title='".utf8_decode($avideo['title'])."', thumbnail='".$avideo['thumbnail']."', channelid='".$avideo['channelid']."', channeltitle='".utf8_decode($avideo['channeltitle'])."'";
```

- Notas: QUERY DIN?MICA

## Q1072

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `libros_pedidos`
- Columnas detectadas: `email`, `libro`
- Archivo:l?nea: `pedir_libro.php:47`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into libros_pedidos set email = '".mysql_real_escape_string($p_email)."',libro = '".mysql_real_escape_string($p_libro)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pedir_libro.php:49

## Q1073

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `pinterest`, `views`
- Archivo:l?nea: `pinterest.php:29-33`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$n_views = "select * from ebooks_books where pinterest = 0 order by views desc limit 5";
```

- Notas: QUERY DIN?MICA

## Q1074

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_surname`, `ebooks_books_author`, `ebooks_format_epub`, `ebooks_authors_id`, `pinterest`, `views`
- Archivo:l?nea: `pinterest.php:36-43`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select e.*, a.ebooks_authors_surname from ebooks_books as e, ebooks_authors as a where e.ebooks_books_author = a.ebooks_authors_id and e.pinterest = 0 and e.ebooks_format_epub = 1 order by e.views desc limit 3";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pinterest.php:46

## Q1075

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`, `ebooks_books`
- Columnas detectadas: `ebooks_authors_surname`, `ebooks_books_updated`, `ebooks_books_author`, `ebooks_authors_id`, `pinterest`
- Archivo:l?nea: `pinterest_rss.php:17-23`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$n_views = "select e.*, a.ebooks_authors_surname from ebooks_books as e, ebooks_authors as a where e.ebooks_books_author = a.ebooks_authors_id and e.pinterest = 0 order by e.ebooks_books_updated desc limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pinterest_rss.php:28

## Q1076

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `pinterest`, `uri`
- Archivo:l?nea: `pinterest_rss.php:100`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set pinterest = 2 where uri = '".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pinterest_rss.php:103

## Q1077

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_nicename`, `ebooks_categories_rank`, `ebooks_categories_id`
- Archivo:l?nea: `pl_funcs.php:21-29`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$_query = "SELECT ebooks_categories_id, ebooks_categories_category, ebooks_categories_nicename, ebooks_categories_rank FROM ebooks_categories ORDER BY ebooks_categories_rank DESC ";
```

- Notas: QUERY DIN?MICA

## Q1078

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_rank`
- Archivo:l?nea: `pl_funcs.php:155`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors order by ebooks_authors_rank desc limit 20";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:156

## Q1079

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_download_rank`
- Archivo:l?nea: `pl_funcs.php:190`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books order by ebooks_books_download_rank desc limit 20";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:191

## Q1080

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `recomendado`
- Archivo:l?nea: `pl_funcs.php:219`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where recomendado = 1 order by ebooks_books_updated desc limit 3";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:221

## Q1081

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `ebooks_books_cover`
- Archivo:l?nea: `pl_funcs.php:248`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_cover = 1 order by ebooks_books_updated desc limit 9";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:250

## Q1082

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `dompub`, `views`
- Archivo:l?nea: `pl_funcs.php:293`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where read_online = 1 and dompub = 1 order by views desc limit 3";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:294

## Q1083

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `video_audiolibro`, `views_last`
- Archivo:l?nea: `pl_funcs.php:359`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_cover = 1 and (video_audiolibro is not null and video_audiolibro <> 'sin-audiolibro') order by views_last desc limit 51";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:368

## Q1084

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `ebooks_books_lang`, `views_last`, `lang`
- Archivo:l?nea: `pl_funcs.php:365`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_cover = 1 and ebooks_books_lang = '".$gvar['lang']."' order by views_last desc limit 54";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:368

## Q1085

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `ebooks_books_lang`
- Archivo:l?nea: `pl_funcs.php:412-416`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_cover = 1 AND ebooks_books_lang = '".$p_lang."' ORDER BY $order_column DESC LIMIT ".$p_cantidad;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:418

## Q1086

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`, `user_books`
- Columnas detectadas: `ebooks_books_lang`, `ebooks_books_id`, `user_id`
- Archivo:l?nea: `pl_funcs.php:452-459`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT eb.*, COUNT(ub.user_id) AS total_readers FROM ebooks_books eb LEFT JOIN user_books ub ON eb.ebooks_books_id = ub.ebooks_books_id WHERE eb.ebooks_books_lang = '".$p_lang."' GROUP BY eb.ebooks_books_id ORDER BY total_readers DESC LIMIT ".$p_cantidad;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:461

## Q1087

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `video_audiolibro`, `views_last`
- Archivo:l?nea: `pl_funcs.php:497`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_cover = 1 and (video_audiolibro is not null and video_audiolibro <> 'sin-audiolibro') order by views_last desc limit 51";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:505

## Q1088

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `ebooks_books_lang`, `views_last`
- Archivo:l?nea: `pl_funcs.php:502`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_cover = 1 and ebooks_books_lang = '".$p_lang."' order by views_last desc limit ".$p_cantidad;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:505

## Q1089

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views_last`, `dompub`
- Archivo:l?nea: `pl_funcs.php:553`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where dompub = 1 ".$sql_audiolibro." order by views_last desc limit ".$cant;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:555

## Q1090

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `pl_funcs.php:644`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_id = ".mpdb_real_escape_string($p_libro);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:655

## Q1091

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `pl_funcs.php:649`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where uri = '".mpdb_real_escape_string($p_libro)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:655

## Q1092

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_books_author`, `ebooks_authors_id`, `libro`
- Archivo:l?nea: `pl_funcs.php:689`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_authors where ebooks_authors_id = ".$gvar['libro']['ebooks_books_author'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en pl_funcs.php:690

## Q1093

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `libro`, `uri`
- Archivo:l?nea: `pl_funcs.php:1350`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_cover = 1 where uri='".$libro['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_funcs.php:1351

## Q1094

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `libro`, `uri`
- Archivo:l?nea: `pl_funcs.php:1359`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_cover = 0 where uri='".$libro['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_funcs.php:1360

## Q1095

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_cover`, `libro`, `uri`
- Archivo:l?nea: `pl_funcs.php:1392`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_cover = 1 where uri='".$libro['uri']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_funcs.php:1393

## Q1096

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `uri`
- Archivo:l?nea: `pl_funcs.php:1409`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set ebooks_books_updated = NOW() where uri='".$uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_funcs.php:1411

## Q1097

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `videoid`, `userid`, `fecha`, `rank`, `lang`
- Archivo:l?nea: `pl_videos_funcs.php:25`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO videos_book (videoid, libro_uri, userid, fecha, rank, lang, is_short) VALUES ('".$videoid."','".$libro_uri."',".$userid.",'".$fecha."',".$rank.",'".$lang."',".$is_short.")";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:28

## Q1098

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `libro_uri`, `videoid`, `videos`, `uri`
- Archivo:l?nea: `pl_videos_funcs.php:53`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '".mpdb_real_escape_string($videoid)."' where uri = '".$libro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:56

## Q1099

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `libro_uri`, `videoid`, `uri`
- Archivo:l?nea: `pl_videos_funcs.php:59`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos_sugeridos = '".mpdb_real_escape_string($videoid)."' where uri = '".$libro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:61

## Q1100

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `videoid`, `rank`
- Archivo:l?nea: `pl_videos_funcs.php:64`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update videos_book set rank = rank + 1 where videoid = '".$videoid."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:66

## Q1101

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `videoid`, `rank`
- Archivo:l?nea: `pl_videos_funcs.php:93`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update videos_book set rank = 99999 where videoid = '".mpdb_real_escape_string($videoid)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:95

## Q1102

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `videoid`
- Archivo:l?nea: `pl_videos_funcs.php:108`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "delete from videos_book where videoid = '".$videoid."' and libro_uri='".$libro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:110

## Q1103

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`, `videos`
- Columnas detectadas: `libro_uri`, `videos`, `uri`
- Archivo:l?nea: `pl_videos_funcs.php:114`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$query = "update ebooks_books set videos = '' where uri = '".$libro_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:115

## Q1104

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `video_audiolibros`
- Columnas detectadas: `libro_uri`, `vozhumana`, `completo`, `videoid`, `userid`
- Archivo:l?nea: `pl_videos_funcs.php:139`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "INSERT INTO video_audiolibros (videoid, libro_uri, userid, completo, vozhumana) VALUES ('".$videoid."','".$libro_uri."',".$userid.",'".$completo."',".$vozhumana.")";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en pl_videos_funcs.php:141

## Q1105

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `views`, `uri`
- Archivo:l?nea: `resumen.php:47`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update ebooks_books set views = views + 1 where uri='".$p_libro."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en resumen.php:49

## Q1106

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `libro`, `id`
- Archivo:l?nea: `resumen.php:171`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_books where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en resumen.php:173

## Q1107

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `normalized_text`, `cantidad`, `id`
- Archivo:l?nea: `search_funcs.php:25`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id, cantidad FROM failed_searches WHERE normalized_text = '$normalized' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en search_funcs.php:26

## Q1108

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `cantidad`, `id`
- Archivo:l?nea: `search_funcs.php:31`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$update_sql = "UPDATE failed_searches SET cantidad = cantidad + 1 WHERE id = $search_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en search_funcs.php:32

## Q1109

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `failed_searches`
- Columnas detectadas: `normalized_text`
- Archivo:l?nea: `search_funcs.php:35`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$insert_sql = "INSERT INTO failed_searches (normalized_text) VALUES ('$normalized')";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en search_funcs.php:36

## Q1110

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `siguiente_libro.php:44`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en siguiente_libro.php:45

## Q1111

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `uri`
- Archivo:l?nea: `sitemaps_funcs.php:41`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_books order by ebooks_books_updated desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en sitemaps_funcs.php:42

## Q1112

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `read_online`, `uri`
- Archivo:l?nea: `sitemaps_funcs.php:101`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_books where read_online = 1 order by ebooks_books_updated desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en sitemaps_funcs.php:102

## Q1113

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_authors`
- Columnas detectadas: `ebooks_authors_id`, `uri`
- Archivo:l?nea: `sitemaps_funcs.php:169`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_authors order by ebooks_authors_id desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en sitemaps_funcs.php:170

## Q1114

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `read_online`, `uri`
- Archivo:l?nea: `sitemaps_funcs.php:228`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri, read_online from ebooks_books";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en sitemaps_funcs.php:229

## Q1115

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `videoid`, `userid`, `fecha`, `rank`, `lang`
- Archivo:l?nea: `srvapi/planetalibroadm-vok.php:40-43`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$stmt = $conn->prepare(" INSERT INTO videos_book (videoid, libro_uri, userid, fecha, rank, lang, is_short) VALUES (?, ?, ?, ?, ?, ?, ?) ");
```

- Notas: QUERY DIN?MICA

## Q1116

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `videoid`, `userid`, `fecha`, `rank`, `lang`
- Archivo:l?nea: `srvapi/planetalibroadm.php:40-43`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$stmt = $conn->prepare(" INSERT INTO videos_book (videoid, libro_uri, userid, fecha, rank, lang, is_short) VALUES (?, ?, ?, ?, ?, ?, ?) ");
```

- Notas: QUERY DIN?MICA

## Q1117

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `libro_uri`, `is_short`, `videoid`, `userid`, `fecha`, `rank`, `lang`
- Archivo:l?nea: `srvapi/planetalibroadm_v1 ok.php:40-43`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$stmt = $conn->prepare(" INSERT INTO videos_book (videoid, libro_uri, userid, fecha, rank, lang, is_short) VALUES (?, ?, ?, ?, ?, ?, ?) ");
```

- Notas: QUERY DIN?MICA

## Q1118

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `uri`
- Archivo:l?nea: `sugerir_video.php:56`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_books_title from ebooks_books where uri = '".$p_uri."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en sugerir_video.php:59

## Q1119

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_sugeridos`
- Columnas detectadas: `videos_sugeridos`, `email`, `video`, `uri`
- Archivo:l?nea: `sugerir_video.php:74`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into videos_sugeridos set email = '".mpdb_real_escape_string($p_email)."',video = '".mpdb_real_escape_string($p_video)."', uri='".mpdb_real_escape_string($p_uri)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en sugerir_video.php:76

## Q1120

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_nicename`
- Archivo:l?nea: `tema.php:89`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_categories where ebooks_categories_nicename ='".mpdb_real_escape_string($p_tema)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en tema.php:91

## Q1121

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_nicename`
- Archivo:l?nea: `tema.php:185`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select ebooks_categories_category from ebooks_categories where ebooks_categories_nicename ='".mpdb_real_escape_string($p_tema)."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en tema.php:186

## Q1122

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`, `tags`
- Columnas detectadas: `ebooks_books_id`, `views_last`, `book_id`, `tag_id`, `uri`, `id`
- Archivo:l?nea: `tema.php:214-222`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT b.* FROM ebooks_books b JOIN books_tags bt ON b.ebooks_books_id = bt.book_id JOIN tags t ON bt.tag_id = t.id WHERE t.uri = '" . mpdb_escape($p_tema) . "' ORDER BY b.views_last DESC LIMIT 100 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en tema.php:224

## Q1123

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_labels`, `views_last`
- Archivo:l?nea: `tema.php:398`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books.ebooks_books_labels like '%".mp_utf8_decode($tema_name)."%' order by views_last desc limit 30";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en tema.php:402

## Q1124

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`, `tags`
- Columnas detectadas: `ebooks_books_id`, `views_last`, `book_id`, `tag_id`, `uri`, `id`
- Archivo:l?nea: `tema.php:456-464`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT b.* FROM ebooks_books b JOIN books_tags bt ON b.ebooks_books_id = bt.book_id JOIN tags t ON bt.tag_id = t.id WHERE t.uri = '" . mpdb_escape($p_tema) . "' ORDER BY b.views_last DESC LIMIT 30 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en tema.php:468

## Q1125

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`, `ebooks_categories_rank`
- Archivo:l?nea: `temas.php:183`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_categories where ebooks_categories_category like '".mpdb_real_escape_string($letra)."%' order by ebooks_categories_rank desc limit 10";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en temas.php:185

## Q1126

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_categories`
- Columnas detectadas: `ebooks_categories_category`
- Archivo:l?nea: `temas.php:203`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_categories where ebooks_categories_category like '".mpdb_real_escape_string($letra)."%' order by ebooks_categories_category limit 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en temas.php:205

## Q1127

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `libro`, `id`
- Archivo:l?nea: `template_funcs.php:267`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_books where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en template_funcs.php:269

## Q1128

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `libro`, `id`
- Archivo:l?nea: `template_funcs.php:357`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_books where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en template_funcs.php:360

## Q1129

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `libro`, `id`
- Archivo:l?nea: `template_funcs.php:435`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_video_audiolibros where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$gvar["libro"]["ebooks_books_id"];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en template_funcs.php:437

## Q1130

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `libros`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `test/iscroll.php:12`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$consulta = "SELECT * FROM libros ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1131

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `uri`
- Archivo:l?nea: `test/iscroll.php:14`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select uri from ebooks_books ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en test/iscroll.php:16

## Q1132

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `test/testjquery2.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql="select * from ebooks_books where ebooks_books_id= ".$q;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en test/testjquery2.php:28

## Q1133

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`
- Archivo:l?nea: `test/testjquery2.php:33`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$sql = "insert into user_books SET user_id = 1, ebooks_books_id = 231";
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en test/testjquery2.php:35

## Q1134

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`
- Archivo:l?nea: `test/testtemplate.php:122`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books order by ebooks_books_updated desc limit 12";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en test/testtemplate.php:123

## Q1135

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `trivia_funcs.php:13`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".mpdb_escape($p_uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:15

## Q1136

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `ebooks_books_id`, `book_id`
- Archivo:l?nea: `trivia_funcs.php:26`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM ebooks_trivia_questions WHERE ebooks_books_id = $book_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en trivia_funcs.php:27

## Q1137

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `respuesta_correcta`, `respuesta_falsa1`, `respuesta_falsa2`, `ebooks_books_id`, `punto_clave`, `explicacion`, `pregunta`, `book_id`, `tema`
- Archivo:l?nea: `trivia_funcs.php:53-64`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "INSERT INTO ebooks_trivia_questions (ebooks_books_id, tema, punto_clave, pregunta, respuesta_correcta, respuesta_falsa1, respuesta_falsa2,explicacion) VALUES ( $book_id, '".mpdb_escape($tema)."', '".mpdb_escape($pc)."', '".mpdb_escape($pregunta)."', '".mpdb_escape($resp)."', '".mpdb_escape($f1)."', '".mpdb_escape($f2)."', '".mpdb_escape($explicacion)."' )";
```

- Notas: QUERY DIN?MICA

## Q1138

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `trivia_funcs.php:93`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".mpdb_escape($p_uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:94

## Q1139

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `respuesta_correcta`, `respuesta_falsa1`, `respuesta_falsa2`, `ebooks_books_id`, `punto_clave`, `pregunta`, `book_id`, `tema`, `id`
- Archivo:l?nea: `trivia_funcs.php:103-109`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tema as t, punto_clave AS pc, pregunta AS q, respuesta_correcta AS a, respuesta_falsa1 AS f1, respuesta_falsa2 AS f2 FROM ebooks_trivia_questions WHERE ebooks_books_id = $book_id ORDER BY id ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:111

## Q1140

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `trivia_funcs.php:122`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".mpdb_escape($p_uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:123

## Q1141

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `respuesta_correcta`, `respuesta_falsa1`, `respuesta_falsa2`, `ebooks_books_id`, `punto_clave`, `explicacion`, `pregunta`, `book_id`, `tema`, `id`
- Archivo:l?nea: `trivia_funcs.php:132-139`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tema, punto_clave AS pc, pregunta AS q, respuesta_correcta AS a, respuesta_falsa1 AS f1, respuesta_falsa2 AS f2, explicacion AS ex FROM ebooks_trivia_questions WHERE ebooks_books_id = $book_id ORDER BY id ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:141

## Q1142

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `trivia_funcs.php:166`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".mpdb_escape($p_uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:167

## Q1143

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `respuesta_correcta`, `respuesta_falsa1`, `respuesta_falsa2`, `ebooks_books_id`, `punto_clave`, `explicacion`, `pregunta`, `book_id`, `tema`, `id`
- Archivo:l?nea: `trivia_funcs.php:176-186`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tema AS t, punto_clave AS pc, pregunta AS q, respuesta_correcta AS a, respuesta_falsa1 AS f1, respuesta_falsa2 AS f2, explicacion AS ex FROM ebooks_trivia_questions WHERE ebooks_books_id = $book_id ORDER BY id ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:189

## Q1144

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `uri`
- Archivo:l?nea: `trivia_funcs.php:210`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books WHERE uri = '".mpdb_escape($p_uri)."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:211

## Q1145

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_trivia_questions`
- Columnas detectadas: `respuesta_correcta`, `respuesta_falsa1`, `respuesta_falsa2`, `ebooks_books_id`, `punto_clave`, `explicacion`, `pregunta`, `book_id`, `tema`, `id`
- Archivo:l?nea: `trivia_funcs.php:220-230`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tema, punto_clave AS pc, pregunta AS q, respuesta_correcta AS a, respuesta_falsa1 AS f1, respuesta_falsa2 AS f2, explicacion AS ex FROM ebooks_trivia_questions WHERE ebooks_books_id = $book_id ORDER BY id ASC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en trivia_funcs.php:232

## Q1146

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `first_read`, `last_read`, `user_id`, `userid`
- Archivo:l?nea: `user_books_delete.php:29-33`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into user_books SET user_id = ".$_SESSION['userid'].", last_read = now(), first_read = now(), ebooks_books_id = ".$q;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_books_delete.php:41

## Q1147

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`, `into`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`
- Archivo:l?nea: `user_books_delete.php:35-37`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM into user_books WHERE user_id = ".$_SESSION['userid'].", AND ebooks_books_id = ".$q;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_books_delete.php:41; tabla fuera de 10_DB_CATALOG

## Q1148

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `user_funcs.php:34`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where email = '".$email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:36

## Q1149

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `has_video_review`
- Archivo:l?nea: `user_funcs.php:439`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select * from ebooks_books where has_video_review = 1 order by ebooks_books_updated desc limit 1';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:440

## Q1150

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `has_video_review`
- Archivo:l?nea: `user_funcs.php:452`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select * from ebooks_books where has_video_review = 1 ORDER BY RAND() LIMIT 1;';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:453

## Q1151

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `has_video_review`
- Archivo:l?nea: `user_funcs.php:488`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select * from ebooks_books where has_video_review = 1 order by ebooks_books_updated desc limit 1';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:489

## Q1152

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `has_video_review`
- Archivo:l?nea: `user_funcs.php:500`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select * from ebooks_books where has_video_review = 1 ORDER BY RAND() LIMIT 1;';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:501

## Q1153

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_updated`, `has_video_review`
- Archivo:l?nea: `user_funcs.php:545`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select * from ebooks_books where has_video_review = 1 order by ebooks_books_updated desc limit 1';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:546

## Q1154

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `has_video_review`
- Archivo:l?nea: `user_funcs.php:557`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = 'select * from ebooks_books where has_video_review = 1 ORDER BY RAND() LIMIT 1;';
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:558

## Q1155

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `password`, `p_hash`, `email`
- Archivo:l?nea: `user_funcs.php:804`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set p_hash = '".$password."' where email = '".$email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:806

## Q1156

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `renew_date`, `email`, `paid`
- Archivo:l?nea: `user_funcs.php:821-824`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "UPDATE user_table SET paid = 1, renew_date = DATE_ADD(NOW(), INTERVAL 1 YEAR) WHERE email = '".$email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:827

## Q1157

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `email`
- Archivo:l?nea: `user_funcs.php:872`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set refurl = '".$refurl."' where email = '".$email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:875

## Q1158

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`, `paid`
- Archivo:l?nea: `user_funcs.php:889`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set paid = 1 where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:891

## Q1159

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `email`
- Archivo:l?nea: `user_funcs.php:907`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set refurl = '' where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:909

## Q1160

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`, `paid`
- Archivo:l?nea: `user_funcs.php:926`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set paid = 1 where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:928

## Q1161

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`, `paid`
- Archivo:l?nea: `user_funcs.php:945`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set paid = 1 where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:947

## Q1162

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `email`
- Archivo:l?nea: `user_funcs.php:963`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set refurl = '' where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:965

## Q1163

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `email`
- Archivo:l?nea: `user_funcs.php:998`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set refurl = '' where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1000

## Q1164

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`, `paid`
- Archivo:l?nea: `user_funcs.php:1019`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set paid = 1 where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1021

## Q1165

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `email`
- Archivo:l?nea: `user_funcs.php:1036`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set refurl = '' where email = '".$p_mail."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1038

## Q1166

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `paid`
- Archivo:l?nea: `user_funcs.php:1174`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where refurl <>'' and paid = 0 and refurl='suscr-youtube'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1175

## Q1167

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `refurl`, `paid`
- Archivo:l?nea: `user_funcs.php:1206`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where refurl <> '' and paid = 0 ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1207

## Q1168

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `remember_token`
- Archivo:l?nea: `user_funcs.php:1250`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM user_table WHERE remember_token = '$remember_token' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1251

## Q1169

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `user_funcs.php:1348`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where email = '".$user_profile['email']."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1353

## Q1170

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `user_funcs.php:1384`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where userid = ".$p_userid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1389

## Q1171

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `credit`, `email`, `value`
- Archivo:l?nea: `user_funcs.php:1420`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set credit = credit + ".$value." where email = '".$p_user_email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1422

## Q1172

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `credit`, `email`, `value`
- Archivo:l?nea: `user_funcs.php:1441`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "update user_table set credit = credit - ".$value." where email = '".$p_user_email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1443

## Q1173

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `credit`, `email`
- Archivo:l?nea: `user_funcs.php:1466`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select credit from user_table where email = '".$p_user_email."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1468

## Q1174

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `user_funcs.php:1494`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE email=:email");
```

- Notas: QUERY DIN?MICA

## Q1175

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `userid`, `id`
- Archivo:l?nea: `user_funcs.php:1562`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select id from user_video_audiolibros where user_id = ".$_SESSION['userid'].' and ebooks_books_id = '.$alibro['ebooks_books_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1564

## Q1176

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `book_id`, `userid`
- Archivo:l?nea: `user_funcs.php:1630-1632`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM user_video_audiolibros WHERE user_id = ".$_SESSION['userid']." AND ebooks_books_id = ".$book_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1635

## Q1177

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `book_id`, `userid`
- Archivo:l?nea: `user_funcs.php:1649-1651`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM user_books WHERE user_id = ".$_SESSION['userid']." AND ebooks_books_id = ".$book_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:1654

## Q1178

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`
- Archivo:l?nea: `user_funcs.php:1666`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM user_books WHERE user_id = $user_id ORDER BY last_read DESC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1667

## Q1179

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:1701`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_id = " . mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1702

## Q1180

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:1706`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("DELETE FROM user_books WHERE ebooks_books_id = " . mpdb_real_escape_string($librouser['ebooks_books_id']), $dbconn);
```

- Notas: QUERY DIN?MICA

## Q1181

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`
- Archivo:l?nea: `user_funcs.php:1759`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM user_books WHERE user_id = $user_id ORDER BY last_read DESC";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1760

## Q1182

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:1772`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_id = " . mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1773

## Q1183

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:1777`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("DELETE FROM user_books WHERE ebooks_books_id = " . mpdb_real_escape_string($librouser['ebooks_books_id']), $dbconn);
```

- Notas: QUERY DIN?MICA

## Q1184

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `user_funcs.php:1831`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1835

## Q1185

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `user_funcs.php:1848`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1852

## Q1186

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:1880`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_id = ".mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1883

## Q1187

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:1889`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$sql = "delete from user_books where ebooks_books_id = ".mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en user_funcs.php:1890

## Q1188

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `user_funcs.php:1997`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_video_audiolibros where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:1998

## Q1189

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2032`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT * FROM ebooks_books WHERE ebooks_books_id = " . mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2033

## Q1190

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2037`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
mpdb_query("DELETE FROM user_books WHERE ebooks_books_id = " . mpdb_real_escape_string($librouser['ebooks_books_id']), $dbconn);
```

- Notas: QUERY DIN?MICA

## Q1191

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2057`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$sql = "delete from user_video_audiolibros where ebooks_books_id = ".mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en user_funcs.php:2058

## Q1192

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `user_funcs.php:2157`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_video_audiolibros where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2161

## Q1193

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2183`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from ebooks_books where ebooks_books_id = ".mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2185

## Q1194

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_video_audiolibros`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2199`
- Conexi?n/helper: `mysql_legacy` / `mysql_query`
- Query:

```php
$sql = "delete from user_video_audiolibros where ebooks_books_id = ".mpdb_real_escape_string($librouser['ebooks_books_id']);
```

- Notas: QUERY DIN?MICA; usa helper mysql_query en user_funcs.php:2200

## Q1195

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `first_read`, `last_read`, `user_id`, `userid`
- Archivo:l?nea: `user_funcs.php:2302-2306`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "insert into user_books SET user_id = ".$userid.", last_read = now(), first_read = now(), ebooks_books_id = ".$p_id;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:2310

## Q1196

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`
- Archivo:l?nea: `user_funcs.php:2389-2390`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$p_user_id." and ebooks_books_id = ".$abook['ebooks_books_id'];
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2393

## Q1197

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `sent_at`, `email`
- Archivo:l?nea: `user_funcs.php:2418-2419`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_check_pending = "SELECT COUNT(*) AS pending FROM mailing_users WHERE email = '$user_mail' AND sent_at IS NULL";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2423

## Q1198

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `mailing_users`
- Columnas detectadas: `sent_at`, `status`, `email`
- Archivo:l?nea: `user_funcs.php:2430-2432`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT MAX(sent_at) AS last_mail_date FROM mailing_users WHERE email = '$user_mail' AND status = 'sent'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2434

## Q1199

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `user_funcs.php:2442`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql_diff = "SELECT DATEDIFF(NOW(), '{$result[0]['last_mail_date']}') AS days_since_last_mail";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2443

## Q1200

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `remember_token`, `token`
- Archivo:l?nea: `user_funcs.php:2468`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query = $connection->prepare("SELECT * FROM user_table WHERE remember_token = :token LIMIT 1");
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2475

## Q1201

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `remember_token`
- Archivo:l?nea: `user_funcs.php:2474`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$query = "SELECT * FROM user_table WHERE remember_token = '".$remember_token."' LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2475

## Q1202

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_tags`, `cantidad`
- Columnas detectadas: `cantidad`, `user_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2575-2578`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = " INSERT INTO user_tags (user_id, tag_id, cantidad) VALUES ($user_id, $tag_id, $peso) ON DUPLICATE KEY UPDATE cantidad = cantidad + $peso;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en user_funcs.php:2583; tabla fuera de 10_DB_CATALOG

## Q1203

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`
- Columnas detectadas: `book_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2598`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tag_id FROM books_tags WHERE book_id = $book_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2599

## Q1204

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2668`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT ebooks_books_id FROM ebooks_books ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2669

## Q1205

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_tags`
- Columnas detectadas: `cantidad`, `user_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2694-2697`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tag_id FROM user_tags WHERE user_id = $user_id ORDER BY cantidad DESC LIMIT 10";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2698

## Q1206

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_tags`
- Columnas detectadas: `user_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2702-2703`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tag_id FROM user_tags WHERE user_id = $user_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2704

## Q1207

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`
- Columnas detectadas: `tag_id`, `id`
- Archivo:l?nea: `user_funcs.php:2708`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT id AS tag_id FROM tags ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2709

## Q1208

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_tags`
- Columnas detectadas: `cantidad`, `user_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2713-2716`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT tag_id FROM user_tags WHERE user_id = $user_id ORDER BY cantidad DESC LIMIT 100";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2717

## Q1209

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `book_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2751-2755`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.ebooks_books_id FROM ebooks_books b JOIN books_tags bt ON bt.book_id = b.ebooks_books_id WHERE bt.tag_id = $tag_id ORDER BY b.$random_view_field DESC LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1210

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `book_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2760-2764`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT b.ebooks_books_id FROM ebooks_books b JOIN books_tags bt ON bt.book_id = b.ebooks_books_id WHERE bt.tag_id = $tag_id ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1211

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `books_tags`, `ebooks_books`
- Columnas detectadas: `ebooks_books_id`, `views_last`, `book_id`, `tag_id`
- Archivo:l?nea: `user_funcs.php:2769-2773`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT b.ebooks_books_id FROM ebooks_books b JOIN books_tags bt ON bt.book_id = b.ebooks_books_id WHERE bt.tag_id = $tag_id ORDER BY b.views_last DESC LIMIT 20";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2775

## Q1212

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_id`
- Archivo:l?nea: `user_funcs.php:2789`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$fallback_sql = "SELECT ebooks_books_id FROM ebooks_books ORDER BY RAND() LIMIT 1";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2790

## Q1213

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`, `user_tags`
- Columnas detectadas: `nombre_es`, `cantidad`, `user_id`, `tag_id`, `uri`, `id`
- Archivo:l?nea: `user_funcs.php:2828-2835`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT t.nombre_es, t.uri, ut.cantidad FROM user_tags ut JOIN tags t ON t.id = ut.tag_id WHERE ut.user_id = $user_id ORDER BY ut.cantidad DESC LIMIT $max_tags ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2837

## Q1214

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `tags`, `user_tags`
- Columnas detectadas: `nombre_es`, `cantidad`, `user_id`, `tag_id`, `id`
- Archivo:l?nea: `user_funcs.php:2897-2904`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = " SELECT t.nombre_es, ut.cantidad FROM user_tags ut JOIN tags t ON t.id = ut.tag_id WHERE ut.user_id = $user_id ORDER BY ut.cantidad DESC LIMIT $max_tags ";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2906

## Q1215

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `ebooks_books_id`, `user_id`, `book_id`
- Archivo:l?nea: `user_funcs.php:2950`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "SELECT user_id FROM user_books WHERE ebooks_books_id = $book_id";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en user_funcs.php:2951

## Q1216

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `groupid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:19`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT * FROM user_groups WHERE groupid IN ($new_str)";
```

- Notas: QUERY DIN?MICA

## Q1217

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `renew_date`, `userid`, `paid`, `fee`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:74-76`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetFeeDate = " SELECT ut.userid, ut.fee, DATE_FORMAT(ut.renew_date,'%d/%m/%Y') AS renew_date, ut.paid " ." FROM user_table AS ut " ." WHERE userid='$userid' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1218

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `renew_date`, `userid`, `paid`, `fee`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:95-97`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateFeeDate = " UPDATE user_table " ." SET paid=1, fee='$fee', renew_date=DATE_FORMAT(STR_TO_DATE('$date','%d/%m/%Y'),'%Y/%m/%d') " ." WHERE userid='$userid'";
```

- Notas: QUERY DIN?MICA

## Q1219

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `payments`
- Columnas detectadas: `userid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:128-129`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetPaymentHistory = " SELECT $select FROM payments " ." WHERE userid='$userid' $restricted ORDER BY date_time ASC LIMIT $limit";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1220

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `payments`
- Columnas detectadas: `userid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:135`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser_count = "SELECT count(pid) AS counter FROM payments WHERE userid='$userid' $restricted; ";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1221

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:183`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("payments",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1222

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `renew_date`, `userid`, `valid`, `paid`, `fee`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:236`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_update_user = "UPDATE user_table SET valid='".$data['valid']."', fee='$amount', paid='".$data['paid']."',renew_date=DATE_ADD( now( ) , INTERVAL ".$data['expire']." DAY ) WHERE userid='".$data['userid']."'";
```

- Notas: QUERY DIN?MICA

## Q1223

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `renew_date`, `usergroup`, `userid`, `paid`, `fee`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:270`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_update_user = "UPDATE user_table SET fee='$amount', renew_date=DATE_ADD( renew_date , INTERVAL ".$data['expire']." DAY ), paid='".$data['paid']."', usergroup ='".$data['group']."',fee='$amount' WHERE userid='".$data['userid']."'";
```

- Notas: QUERY DIN?MICA

## Q1224

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `renew_date`, `userid`, `paid`, `fee`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:300`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_update_user = "UPDATE user_table SET fee='$amount',renew_date=DATE_ADD( now( ) , INTERVAL ".$data['expire']." DAY ), paid='".$data['paid']."' WHERE userid='".$data['userid']."'";
```

- Notas: QUERY DIN?MICA

## Q1225

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:313`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("payments",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1226

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `failed_login`, `stats_country_iso_codes`
- Columnas detectadas: `current_attempt`, `inital_attempt`, `failedid`, `country`, `refurl`, `setid`, `ipad`, `code`, `name`, `loc`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:399-414`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetAlerts = " SELECT setid, loc, LOWER(name) AS name, DATE_FORMAT(MAX(current_attempt), '%d/%m/%Y %H:%i:%s') AS todate, DATE_FORMAT(inital_attempt, '%d/%m/%Y %H:%i:%s') AS fromdate, ipad, refurl, failedid, COUNT(failedid) AS counter FROM failed_login, stats_country_iso_codes WHERE code = country $loc_sql GROUP BY setid ORDER BY inital_attempt DESC LIMIT $limit ";
```

- Notas: QUERY DIN?MICA

## Q1227

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `failed_login`, `stats_country_iso_codes`
- Columnas detectadas: `failedid`, `country`, `setid`, `code`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:430-434`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_count = " SELECT COUNT(setid) AS total_count FROM failed_login, stats_country_iso_codes WHERE code = country $loc_sql AND setid=failedid ";
```

- Notas: QUERY DIN?MICA

## Q1228

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `screenname`, `userid`, `email`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:548`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUsersNew = "SELECT screenname, userid, email AS graveimg, DATE_FORMAT(date_joined,'%d/%m/%Y %H:%i:%S') AS date_joined_formatted, date_joined FROM user_table WHERE valid=1 OR valid=0 ORDER BY date_joined DESC LIMIT 0,10";
```

- Notas: QUERY DIN?MICA

## Q1229

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:618`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlDeleteUser = "DELETE FROM user_table WHERE userid='$userid' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1230

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `status`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:645`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeUserStatus = "UPDATE user_table SET valid='".$status."' WHERE userid=".$userid;
```

- Notas: QUERY DIN?MICA

## Q1231

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `usergroup`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:681`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeUserGroup = "UPDATE user_table SET usergroup = $newGroup WHERE userid=".$this->userId;
```

- Notas: QUERY DIN?MICA

## Q1232

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `expire_in_days`, `group_type`, `groupid`, `descip`, `name`, `fee`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:708`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeUserGroup = "UPDATE user_groups SET expire_in_days='$group_expire', fee='$group_fee',group_type='$group_type', name = '$newName', descip='$groupDesc' WHERE groupid=".$groupid;
```

- Notas: QUERY DIN?MICA

## Q1233

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `usergroup`, `groupid`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:739`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_check = "SELECT userid FROM user_table WHERE usergroup = '$groupid'";
```

- Notas: QUERY DIN?MICA

## Q1234

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `groupid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:745`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_delete_group = "DELETE FROM user_groups WHERE groupid=".$groupid;
```

- Notas: QUERY DIN?MICA

## Q1235

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `groupid`, `status`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:794`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeUserGroup = "UPDATE user_groups SET valid = '$status' WHERE groupid=".$groupid;
```

- Notas: QUERY DIN?MICA

## Q1236

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_groups`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:830`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("user_groups",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1237

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `groupid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:851`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetPage = "SELECT * FROM user_groups WHERE groupid =".$groupId;
```

- Notas: QUERY DIN?MICA

## Q1238

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `searchengine`, `landingpage`, `searchterm`, `screenres`, `parent_id`, `reg_flag`, `lp_flag`, `browser`, `refurl`, `refid`, `lang`, `loc`, `os`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:889`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlInsertVisit = "INSERT INTO visit_stats VALUES (NULL,'$reg_flag','$browser','$os','$lang','$loc',now(),'$refurl','$refdom','$refid','$screenres',0,'$searchengine','$searchterm','$admin','$landingpage','$lp_flag','$parent_id','$lp_id');";
```

- Notas: QUERY DIN?MICA

## Q1239

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:916`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("visit_stats",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1240

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `landing_id`, `visitid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:927`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_lp_leader = "UPDATE visit_stats SET landing_id ='".$dataPostBack[0]."' WHERE visitid='".$dataPostBack[0]."'";
```

- Notas: QUERY DIN?MICA

## Q1241

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1068`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("user_table",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1242

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: `description`, `type`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1140-1142`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateBlock = "UPDATE security_blocks SET blockvalue='$block',description='$desc', type ='$type', blockarea='$area' WHERE blockid='$blockid'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1243

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1158`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetBlock = "SELECT * FROM security_blocks WHERE blockid =".$blockid;
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1244

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1199`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("security_blocks",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1245

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1246`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetBlock = "SELECT * FROM security_blocks WHERE $valid_sql $query_1 ORDER BY blockid ASC LIMIT ".$limit;
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1246

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1251`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetBlock_count = "SELECT count(blockid) AS counter FROM security_blocks WHERE $valid_sql $query_1";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1247

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: `status`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1283`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlDelete = "UPDATE security_blocks SET valid='$status' WHERE blockid=".$blockid;
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1248

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_country_iso_codes`
- Columnas detectadas: `name`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1305`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetCountries = 'SELECT * FROM stats_country_iso_codes ORDER BY name';
```

- Notas: QUERY DIN?MICA

## Q1249

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_lang`
- Columnas detectadas: `language`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1306`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetLang = 'SELECT * FROM stats_lang ORDER BY language';
```

- Notas: QUERY DIN?MICA

## Q1250

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_os`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1307`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetOS = 'SELECT * FROM stats_os ORDER BY os_name';
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1251

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_browser`
- Columnas detectadas: `browser_name`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1308`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetBrowser = 'SELECT * FROM stats_browser ORDER BY browser_name';
```

- Notas: QUERY DIN?MICA

## Q1252

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `groupid`, `valid`, `name`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1309`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUserGroups = 'SELECT groupid,name FROM user_groups WHERE valid=1 ORDER BY name';
```

- Notas: QUERY DIN?MICA

## Q1253

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_browser`, `stats_country_iso_codes`, `stats_lang`, `user_groups`, `user_table`
- Columnas detectadas: `browser_code`, `browser_name`, `date_joined`, `screenname`, `last_visit`, `mobilenum`, `lang_code`, `refdomain`, `usergroup`, `language`, `groupid`, `browser`, `country`, `contact`, `lastip`, `userid`, `refurl`, `email`, `valid`, `refid`, `ipad`, `code`, `lang`, `name`, `os`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1437-1442`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = " SELECT ug.name AS groupname, ug.groupid, ut.userid, ut.ipad, ut.screenname, ut.email, DATE_FORMAT(ut.last_visit, '%d/%m/%Y %H:%i:%s') AS last_visit, sb.browser_name, sb.browser_code, " ." ut.valid AS status_valid, ut.lastip, DATE_FORMAT(ut.date_joined, '%d/%m/%Y %H:%i:%s') AS date_joined, sl.language, sl.lang_code, ut.refid,ut.refurl, so.os_code,so.os_name," ." (IF(last_visit>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS useractive30," ." sc.name AS conname, sc.code,ut.refdomain, ut.mobilenum AS phone, ut.contact " ." FROM user_table AS ut,stats_browser AS sb,stats_os AS so,stats_lang AS sl,stats_country_iso_codes AS sc, user_groups AS ug " ." WHERE ut.userid =".$userid." AND ut.country=sc.code AND ut.browser=sb.browser_code AND ut.os=so.os_code AND ut.lang = sl.lang_code AND ug.groupid = ut.usergroup LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1254

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `last_visit`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1485-1492`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$SQL_members = " SELECT SUM(IF(last_visit>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS activeusers, " ." SUM(IF(date_joined>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS lastmonthmembers, " ." SUM(IF(valid=0,1,0)) AS waiting, " ." SUM(IF(valid=2,1,0)) AS blocked, " ." SUM(IF(valid=1,1,0)) AS active, " ." SUM(IF(valid=0 AND date_joined<DATE_SUB(NOW(),INTERVAL 7 DAY),1,0)) AS waiting_week, " ." SUM(IF(valid=0 AND date_joined<DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS waiting_month " ." FROM user_table ";
```

- Notas: QUERY DIN?MICA

## Q1255

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`, `visit_stats`
- Columnas detectadas: `date_visited`, `date_joined`, `reg_flag`, `visitid`, `lp_flag`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1494-1500`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$SQL_members_total = " SELECT *, FORMAT(IFNULL(ut.thirty_day - ut.sixty_day ,0),0) AS difference,COALESCE(ROUND(((ut.thirty_day/(vs.thirty_day_visit))*100),1),0) AS precent30,COALESCE(ROUND(((ut.total/(vs.total_visits))*100),1),0) AS precent_all " ." FROM (SELECT FORMAT(IFNULL(COUNT(userid),0),0) AS total, " ." SUM(IF(date_joined>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS thirty_day, " ." SUM(IF(date_joined>DATE_SUB(NOW(),INTERVAL 60 DAY),1,0)) AS sixty_day " ." FROM user_table ) AS ut, " ." (SELECT COUNT(visitid) AS total_visits, SUM(IF(reg_flag=0,1,0)) AS total_visits_regflag, " ." SUM(IF(date_visited>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS thirty_day_visit,SUM(IF(date_visited>DATE_SUB(NOW(),INTERVAL 30 DAY),IF(reg_flag=0,1,0),0)) AS thirty_day_visit_regflag FROM visit_stats WHERE lp_flag=1 ) AS vs ";
```

- Notas: QUERY DIN?MICA

## Q1256

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `screenname`, `last_visit`, `mobilenum`, `refdomain`, `usergroup`, `username`, `groupid`, `browser`, `country`, `contact`, `lastip`, `status`, `userid`, `domain`, `refurl`, `email`, `valid`, `refid`, `ipad`, `lang`, `os`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1771-1772`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateUser = " UPDATE user_table SET email='$email' $passsql ,usergroup='$groupid',screenname='$username', username='$username', country='$country',lang='$lang',refid='$refid', refurl='$refurl',valid='$status',os='$os',browser='$browser', contact='$contact', mobilenum='$phone', refdomain='$domain', ipad='$regip',date_joined='$regdate', lastip='$lastip',last_visit='$lastdate' " ." WHERE userid='$userid' ; ";
```

- Notas: QUERY DIN?MICA

## Q1257

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_country_iso_codes`, `user_groups`, `user_table`
- Columnas detectadas: `date_joined`, `screenname`, `last_visit`, `usergroup`, `groupid`, `country`, `lastip`, `userid`, `email`, `valid`, `ipad`, `code`, `name`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1938-1940`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT sc.name AS country,sc.code AS country_code, ut.userid,ug.name, ut.screenname,ut.email,DATE_FORMAT(ut.date_joined, '%d/%m/%Y %H:%i:%s') AS date_joined,ut.ipad,ut.lastip,DATE_FORMAT(ut.last_visit, '%d/%m/%Y %H:%i:%s') AS last_visit,ut.valid $detailed_view_sqlextra" ." FROM user_table AS ut,user_groups AS ug, stats_country_iso_codes AS sc, $detailed_from_sqlextra " ." WHERE ut.usergroup=ug.groupid AND sc.code=ut.country AND ut.valid!=3 $whereSql $detailed_where_sqlextra $orderbySql $orderbySql_2 LIMIT $limit";
```

- Notas: QUERY DIN?MICA

## Q1258

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_country_iso_codes`, `user_groups`, `user_table`
- Columnas detectadas: `usergroup`, `groupid`, `country`, `userid`, `code`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1948`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser_count = "SELECT count(userid) AS row_count FROM user_table AS ut,user_groups,stats_country_iso_codes, $detailed_from_sqlextra WHERE ut.usergroup=groupid AND ut.country=code $whereSql $detailed_where_sqlextra ";
```

- Notas: QUERY DIN?MICA

## Q1259

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_country_iso_codes`, `user_groups`, `user_table`
- Columnas detectadas: `date_joined`, `screenname`, `last_visit`, `usergroup`, `groupid`, `country`, `lastip`, `userid`, `email`, `valid`, `ipad`, `code`, `name`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:1961-1963`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetHistory = "SELECT sc.name AS country,sc.code AS country_code, ut.userid,ug.name, ut.screenname,ut.email,DATE_FORMAT(ut.date_joined, '%d/%m/%Y %H:%i:%s') AS date_joined,ut.ipad,ut.lastip,DATE_FORMAT(ut.last_visit, '%d/%m/%Y %H:%i:%s') AS last_visit,ut.valid $detailed_view_sqlextra" ." FROM user_table AS ut,user_groups AS ug, stats_country_iso_codes AS sc, $detailed_from_sqlextra " ." WHERE ut.usergroup=ug.groupid AND sc.code=ut.country AND ut.valid!=3 AND ut.userid IN (".dbase::globalMagic($_SESSION['history']).") $detailed_where_sqlextra ";
```

- Notas: QUERY DIN?MICA

## Q1260

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `valid`, `name`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2010`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetGroup = "SELECT * FROM user_groups WHERE valid=1 ORDER BY name ASC LIMIT $limit";
```

- Notas: QUERY DIN?MICA

## Q1261

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `groupid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2019`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetGroup_count = "SELECT count(groupid) AS counter FROM user_groups WHERE valid=1";
```

- Notas: QUERY DIN?MICA

## Q1262

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `stats_browser`, `stats_country_iso_codes`, `stats_lang`, `user_groups`, `user_table`
- Columnas detectadas: `usergroup`, `groupid`, `country`, `userid`, `valid`, `code`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2189-2191`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_update_mass_status = " UPDATE user_table SET valid ='$new_status' WHERE userid IN ( SELECT work_around.userid FROM ( SELECT ut.userid" ." FROM user_table AS ut,user_groups AS ug, stats_country_iso_codes AS sc,stats_os AS so, stats_browser AS sb, stats_lang AS sl " ." WHERE ut.usergroup=ug.groupid AND sc.code=ut.country AND ut.valid!=3 $whereSql $detailed_where_sqlextra ) AS work_around);";
```

- Notas: QUERY DIN?MICA

## Q1263

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_country_iso_codes`, `user_groups`, `user_table`
- Columnas detectadas: `screenname`, `usergroup`, `groupid`, `country`, `contact`, `userid`, `email`, `sname`, `fname`, `valid`, `refid`, `code`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2354-2356`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetMailingList = "SELECT ut.userid,ut.fname,ut.sname,ut.screenname,ut.email,ut.refid,IF(ut.contact=0,'NO','YES') AS contact" ." FROM user_table AS ut,user_groups AS ug, stats_country_iso_codes AS sc, $detailed_from_sqlextra " ." WHERE ut.usergroup=ug.groupid AND sc.code=ut.country AND ut.valid!=3 $whereSql $detailed_where_sqlextra $orderbySql $orderbySql_2 ";
```

- Notas: QUERY DIN?MICA

## Q1264

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2413`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("notes",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1265

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`, `notes`
- Columnas detectadas: `screenname`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2426`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUserNotes = "SELECT n.*, u.screenname, DATE_FORMAT(n.dateposted,'%D %M %Y (%k:%i:%s)') AS postdate FROM notes AS n, user_table AS u WHERE u.userid=n.userid AND n.valid=1 AND n.elementid='$userid' AND n.element_type=2 ORDER BY n.dateposted DESC";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1266

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`, `notes`
- Columnas detectadas: `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2430`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUserNotes_count = "SELECT COUNT(n.noteid) AS counter FROM notes AS n, user_table AS u WHERE u.userid=n.userid AND n.valid=1 AND n.elementid='$userid' AND n.element_type=2";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1267

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_groups`
- Columnas detectadas: `valid`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2475`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetGroup = "SELECT * FROM user_groups WHERE valid=1";
```

- Notas: QUERY DIN?MICA

## Q1268

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `authentication_source`, `openidurl`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2512`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_check = "SELECT * FROM user_table WHERE openidurl='$openid_url' AND authentication_source='$source'";
```

- Notas: QUERY DIN?MICA

## Q1269

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `lastip`, `userid`, `ipad`
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2540-2541`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateUser = "UPDATE user_table SET last_visit=now(), lastip='$ipad' " ." WHERE userid='".$userData["userid"]."' ;";
```

- Notas: QUERY DIN?MICA

## Q1270

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_adminclass.php:2628`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries('user_table',false,$keys_values,'INSERT',false);
```

- Notas: QUERY DIN?MICA

## Q1271

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:237`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " INSERT INTO $table ($keys_sql) VALUES ($values_sql);";
```

- Notas: QUERY DIN?MICA

## Q1272

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:254`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "DELETE $table WHERE $delete_sql";
```

- Notas: QUERY DIN?MICA

## Q1273

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:287`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " UPDATE $table SET $update_sql WHERE $where_sql ";
```

- Notas: QUERY DIN?MICA

## Q1274

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:321`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = " SELECT $select_sql FROM $table $where_sql ";
```

- Notas: QUERY DIN?MICA

## Q1275

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:341`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries($table,false,$key_values,'INSERT',false);
```

- Notas: QUERY DIN?MICA

## Q1276

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:354`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries($table,$id_key,$key_values,'UPDATE',false);
```

- Notas: QUERY DIN?MICA

## Q1277

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:367`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries($table,$id_key,$key_values,'DELETE',false);
```

- Notas: QUERY DIN?MICA

## Q1278

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_db.php:380`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries($table,$id_key,$key_values,'SELECT',$loop);
```

- Notas: QUERY DIN?MICA

## Q1279

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `stats_country_ip`
- Columnas detectadas: `2letter`, `ipstart`, `ipend`
- Archivo:l?nea: `userbase/includes/lightwork_general.php:74-76`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$country_SQL = "SELECT 2letter FROM stats_country_ip ". "WHERE ipstart<=inet_aton('".dbase::globalMagic($_SERVER['REMOTE_ADDR'])."') ". "AND ipend>=inet_aton('".dbase::globalMagic($_SERVER['REMOTE_ADDR'])."') ";
```

- Notas: QUERY DIN?MICA

## Q1280

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: `valid`, `ipad`, `type`
- Archivo:l?nea: `userbase/includes/lightwork_general.php:648`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlBlock = " SELECT blockid FROM security_blocks WHERE (( blockvalue='$ipad' AND type=1 ) $sql_where ) AND valid=1 AND blockarea IN (2,3) ";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1281

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_general.php:669`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = "SELECT $item FROM $table $where LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1282

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:320-325`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend = "SELECT (count(ut.userid)) AS counter, DATE_FORMAT(ut.date_joined,'%H') AS trend_date " ." FROM user_table AS ut " ." WHERE ut.valid IN (0,1,2) " ." AND ut.date_joined > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_user## $lp_u " ." GROUP BY DATE_FORMAT(ut.date_joined,'%H') ORDER BY ut.date_joined ASC";
```

- Notas: QUERY DIN?MICA

## Q1283

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `visitid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:327-332`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend_vs = "SELECT (count(vs.visitid)) AS counter, DATE_FORMAT(vs.date_visited,'%H') AS trend_date " ." FROM visit_stats AS vs " ." WHERE " ." vs.date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_visit## $lp_v" ." GROUP BY DATE_FORMAT(vs.date_visited,'%H') ORDER BY vs.date_visited ASC";
```

- Notas: QUERY DIN?MICA

## Q1284

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:336-341`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend = "SELECT (count(ut.userid)) AS counter, DATE_FORMAT(ut.date_joined,'%d/%m/%Y') AS trend_date " ." FROM user_table AS ut " ." WHERE ut.valid IN (0,1,2) " ." AND ut.date_joined > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_user## $lp_u " ." GROUP BY DATE_FORMAT(ut.date_joined,'%d/%m/%Y') ORDER BY ut.date_joined ASC";
```

- Notas: QUERY DIN?MICA

## Q1285

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `visitid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:343-348`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend_vs = "SELECT (count(vs.visitid)) AS counter, DATE_FORMAT(vs.date_visited,'%d/%m/%Y') AS trend_date " ." FROM visit_stats AS vs " ." WHERE " ." vs.date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_visit## $lp_v" ." GROUP BY DATE_FORMAT(vs.date_visited,'%d/%m/%Y') ORDER BY vs.date_visited ASC";
```

- Notas: QUERY DIN?MICA

## Q1286

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:398-403`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend = "SELECT (count(ut.userid)*10) AS counter, DATE_FORMAT(ut.date_joined,'%H') AS trend_date " ." FROM user_table AS ut " ." WHERE ut.valid IN (0,1,2) " ." AND ut.date_joined > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_user## $lp_u " ." GROUP BY DATE_FORMAT(ut.date_joined,'%H') ORDER BY ut.date_joined ASC";
```

- Notas: QUERY DIN?MICA

## Q1287

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `visitid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:405-410`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend_vs = "SELECT (count(vs.visitid)*10) AS counter, DATE_FORMAT(vs.date_visited,'%H') AS trend_date " ." FROM visit_stats AS vs " ." WHERE " ." vs.date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_visit## $lp_v" ." GROUP BY DATE_FORMAT(vs.date_visited,'%H') ORDER BY vs.date_visited ASC";
```

- Notas: QUERY DIN?MICA

## Q1288

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:414-419`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend = "SELECT (count(ut.userid)*10) AS counter, DATE_FORMAT(ut.date_joined,'%d/%m/%Y') AS trend_date " ." FROM user_table AS ut " ." WHERE ut.valid IN (0,1,2) " ." AND ut.date_joined > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_user## $lp_u " ." GROUP BY DATE_FORMAT(ut.date_joined,'%d/%m/%Y') ORDER BY ut.date_joined ASC";
```

- Notas: QUERY DIN?MICA

## Q1289

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `visitid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:421-426`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend_vs = "SELECT (count(vs.visitid)*10) AS counter, DATE_FORMAT(vs.date_visited,'%d/%m/%Y') AS trend_date " ." FROM visit_stats AS vs " ." WHERE " ." vs.date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_visit## $lp_v" ." GROUP BY DATE_FORMAT(vs.date_visited,'%d/%m/%Y') ORDER BY vs.date_visited ASC";
```

- Notas: QUERY DIN?MICA

## Q1290

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:457-462`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend = "SELECT count(ut.userid) AS counter, DATE_FORMAT(ut.date_joined,'%H') AS trend_date " ." FROM user_table AS ut " ." WHERE ut.valid IN (0,1,2) " ." AND ut.date_joined > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_user## " ." GROUP BY DATE_FORMAT(ut.date_joined,'%H') ORDER BY ut.date_joined ASC";
```

- Notas: QUERY DIN?MICA

## Q1291

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `visitid`, `lp_flag`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:464-469`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend_vs = "SELECT count(vs.visitid) AS counter, DATE_FORMAT(vs.date_visited,'%H') AS trend_date " ." FROM visit_stats AS vs " ." WHERE " ." vs.date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) AND vs.lp_flag=1" ." ##narrow_visit## " ." GROUP BY DATE_FORMAT(vs.date_visited,'%H') ORDER BY vs.date_visited ASC";
```

- Notas: QUERY DIN?MICA

## Q1292

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:630-635`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend = "SELECT count(ut.userid) AS counter, DATE_FORMAT(ut.date_joined,'%d/%m/%Y') AS trend_date " ." FROM user_table AS ut " ." WHERE ut.valid IN (0,1,2) " ." AND ut.date_joined > DATE_SUB(NOW(),INTERVAL $days DAY) " ." ##narrow_user## " ." GROUP BY DATE_FORMAT(ut.date_joined,'%d/%m/%Y') ORDER BY ut.date_joined ASC";
```

- Notas: QUERY DIN?MICA

## Q1293

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `visitid`, `lp_flag`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:637-642`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_trend_vs = "SELECT count(vs.visitid) AS counter, DATE_FORMAT(vs.date_visited,'%d/%m/%Y') AS trend_date " ." FROM visit_stats AS vs " ." WHERE " ." vs.date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) AND vs.lp_flag=1" ." ##narrow_visit## " ." GROUP BY DATE_FORMAT(vs.date_visited,'%d/%m/%Y') ORDER BY vs.date_visited ASC";
```

- Notas: QUERY DIN?MICA

## Q1294

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `date_joined`, `landingpage`, `last_visit`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:1211-1219`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$SQL_members = " SELECT SUM(IF(last_visit>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS activeusers, " ." SUM(IF(date_joined>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS lastmonthmembers, " ." SUM(IF(valid=0,1,0)) AS waiting, " ." SUM(IF(valid=2,1,0)) AS blocked, " ." SUM(IF(valid=1,1,0)) AS active, " ." SUM(IF(valid=0 AND date_joined<DATE_SUB(NOW(),INTERVAL 7 DAY),1,0)) AS waiting_week, " ." SUM(IF(valid=0 AND date_joined<DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS waiting_month " ." FROM user_table " ." WHERE landingpage = '$url_lp' ";
```

- Notas: QUERY DIN?MICA

## Q1295

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`, `visit_stats`
- Columnas detectadas: `date_visited`, `date_joined`, `landingpage`, `visitid`, `lp_flag`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:1221-1227`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$SQL_members_total = " SELECT *, FORMAT(IFNULL(ut.thirty_day - ut.sixty_day,0),0) AS difference,COALESCE(ROUND(((ut.thirty_day/(vs.thirty_day_visit))*100),1),0) AS precent30,COALESCE(ROUND(((ut.total/(vs.total_visits))*100),1),0) AS precent_all " ." FROM (SELECT FORMAT(COUNT(userid),0) AS total, " ." SUM(IF(date_joined>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS thirty_day, " ." SUM(IF(date_joined>DATE_SUB(NOW(),INTERVAL 60 DAY),1,0)) AS sixty_day " ." FROM user_table WHERE landingpage = '$url_lp' ) AS ut, " ." (SELECT COUNT(visitid) AS total_visits, " ." SUM(IF(date_visited>DATE_SUB(NOW(),INTERVAL 30 DAY),1,0)) AS thirty_day_visit FROM visit_stats WHERE landingpage = '$url_lp' AND lp_flag = 1 ) AS vs ";
```

- Notas: QUERY DIN?MICA

## Q1296

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `landingpage`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:1362-1364`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_pv = " SELECT FORMAT(pageview,0) AS pageviews, landingpage FROM (SELECT IFNULL(COUNT(landingpage),0) AS pageview, landingpage FROM visit_stats " ." WHERE date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) $search_vs" ." GROUP BY landingpage ) AS t1 ORDER BY $order LIMIT $limiter ";
```

- Notas: QUERY DIN?MICA

## Q1297

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `landingpage`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:1366-1369`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_pvc = " SELECT COUNT(*) AS pagecount FROM( " ." SELECT COUNT(landingpage) AS pagecount FROM visit_stats " ." WHERE date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) $search_vs" ." GROUP BY landingpage ) AS t";
```

- Notas: QUERY DIN?MICA

## Q1298

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `refurl`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:1409-1411`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_ref = " SELECT FORMAT(pageview,0) AS pageviews, refurl FROM (SELECT IFNULL(COUNT(refurl),0) AS pageview, refurl FROM visit_stats " ." WHERE date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) $search_vs" ." GROUP BY refurl ) AS t1 ORDER BY $order LIMIT $limiter ";
```

- Notas: QUERY DIN?MICA

## Q1299

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `visit_stats`
- Columnas detectadas: `date_visited`, `refurl`
- Archivo:l?nea: `userbase/includes/lightwork_sitestats.php:1413-1416`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_refc = " SELECT COUNT(*) AS pagecount FROM( " ." SELECT COUNT(refurl) AS pagecount FROM visit_stats " ." WHERE date_visited > DATE_SUB(NOW(),INTERVAL $days DAY) $search_vs" ." GROUP BY refurl ) AS t";
```

- Notas: QUERY DIN?MICA

## Q1300

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `username`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:27-28`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT * FROM user_table WHERE LOWER(username)='".strtolower($username)."'" ." AND (valid=1 OR valid=0) ";
```

- Notas: QUERY DIN?MICA

## Q1301

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `smstimedate`, `screenname`, `username`, `smstok`, `smsip`, `ipad`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:97-98`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateUser = "UPDATE user_table SET smstimedate=now(), smstok='$smstok', smsip='$ipad' " ." WHERE screenname='$username' ;";
```

- Notas: QUERY DIN?MICA

## Q1302

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `cookie_id`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:164-171`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_cookie = " SELECT * FROM user_table AS ut WHERE cookie_id='".dbase::globalMagic($cookie_array[0])."' AND valid=1 ";
```

- Notas: QUERY DIN?MICA

## Q1303

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `cookie_expire`, `cookie_salt`, `cookie_id`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:211-212`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCookie = "UPDATE user_table SET cookie_id='$cookie_token', cookie_salt='".$_SESSION['tempsalt']."', cookie_expire=date_add(now(), INTERVAL ".REMEMBER_DURATION." DAY)" ." WHERE userid='".$_SESSION['userid']."' ;";
```

- Notas: QUERY DIN?MICA

## Q1304

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `lastip`, `userid`, `ipad`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:232-233`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateUser = "UPDATE user_table SET last_visit=now(), lastip='$ipad' " ." WHERE userid='".$dataPostBack[0]['userid']."' ;";
```

- Notas: QUERY DIN?MICA

## Q1305

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `cookie_expire`, `cookie_salt`, `cookie_id`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:252-253`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCookie = "UPDATE user_table SET cookie_id='', cookie_salt='', cookie_expire='0000-00-00 00:00:00'" ." WHERE userid='".$dataPostBack[0]['userid']."' ;";
```

- Notas: QUERY DIN?MICA

## Q1306

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `smstimedate`, `username`, `smstok`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:321-322`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT * FROM user_table WHERE LOWER(username)='".strtolower($username)."'" ." AND (valid=1 OR valid=0) AND smstok='$smstok' AND smstimedate>DATE_SUB(NOW(),INTERVAL 1 DAY)";
```

- Notas: QUERY DIN?MICA

## Q1307

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `username`, `smstok`, `oneuse`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:325-326`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT * FROM user_table WHERE LOWER(username)='".strtolower($username)."'" ." AND (valid=1 OR valid=0) AND smstok='$smstok' AND oneuse=0";
```

- Notas: QUERY DIN?MICA

## Q1308

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `username`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:333-334`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT * FROM user_table WHERE LOWER(username)='".strtolower($username)."'" ." AND (valid=1 OR valid=0) ";
```

- Notas: QUERY DIN?MICA

## Q1309

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `cookie_expire`, `cookie_salt`, `cookie_id`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:421-422`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCookie = "UPDATE user_table SET cookie_id='$cookie_token', cookie_salt='".$_SESSION['tempsalt']."', cookie_expire=date_add(now(), INTERVAL ".REMEMBER_DURATION." DAY)" ." WHERE userid='".$_SESSION['userid']."' ;";
```

- Notas: QUERY DIN?MICA

## Q1310

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `last_visit`, `lastip`, `userid`, `oneuse`, `ipad`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:442-443`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateUser = "UPDATE user_table SET last_visit=now(), lastip='$ipad' $oneuse " ." WHERE userid='".$userData["userid"]."' ;";
```

- Notas: QUERY DIN?MICA

## Q1311

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `failed_login`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:554`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("failed_login",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1312

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `failed_login`
- Columnas detectadas: `failedid`, `setid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:560`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_setid = "UPDATE failed_login SET setid='".$dataPostBack[0]."' WHERE failedid='".$dataPostBack[0]."'" ;
```

- Notas: QUERY DIN?MICA

## Q1313

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`, `username`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:583`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeUN = 'UPDATE user_table SET username="'.$username.'",screenname="'.$username.'" WHERE userid='.$userid ;
```

- Notas: QUERY DIN?MICA

## Q1314

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `s_hash`, `p_hash`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:602`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangePs = 'UPDATE user_table SET p_hash="'.$ph.'",s_hash="'.$sh.'" WHERE userid='.$userid ;
```

- Notas: QUERY DIN?MICA

## Q1315

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `username`, `userid`, `email`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:614`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT userid,username,email FROM user_table WHERE userid='$userid'";
```

- Notas: QUERY DIN?MICA

## Q1316

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`, `email`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:661`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeEmail = 'UPDATE user_table SET email="'.$email.'" WHERE userid='.$userid ;
```

- Notas: QUERY DIN?MICA

## Q1317

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `acti_code`, `userid`, `email`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:669`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlChangeEmail = "UPDATE user_table SET email='$email', valid=0,acti_code='$acti_code' WHERE userid='$userid'" ;
```

- Notas: QUERY DIN?MICA

## Q1318

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `acti_code`, `username`, `userid`, `email`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:717`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT userid,username,email FROM user_table WHERE acti_code='$activationcode'";
```

- Notas: QUERY DIN?MICA

## Q1319

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `acti_code`, `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:725`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlActivate = "UPDATE user_table SET valid=1 WHERE userid='".$userData['userid']."' AND (valid=0 OR valid=1) AND acti_code='$activationcode'";
```

- Notas: QUERY DIN?MICA

## Q1320

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `email`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:775`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = 'SELECT * FROM user_table WHERE LOWER(email) = "'.strtolower($username_email).'"';
```

- Notas: QUERY DIN?MICA

## Q1321

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:779`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = 'SELECT * FROM user_table WHERE LOWER(screenname) = "'.strtolower($username_email).'"';
```

- Notas: QUERY DIN?MICA

## Q1322

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `temppass`, `tp_flag`, `tpdate`, `email`, `tpip`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:817`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlAddTempPass = "UPDATE user_table SET temppass = '$tempPassEn', tpdate=now(), tpip='$tpip', tp_flag=1 WHERE LOWER(email) = '".strtolower($username_email)."'";
```

- Notas: QUERY DIN?MICA

## Q1323

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`, `temppass`, `tp_flag`, `tpdate`, `tpip`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:821`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlAddTempPass = "UPDATE user_table SET temppass = '$tempPassEn', tpdate=now(), tpip='$tpip', tp_flag=1 WHERE LOWER(screenname) = '".strtolower($username_email)."'";
```

- Notas: QUERY DIN?MICA

## Q1324

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `temppass`, `tp_flag`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_userclass.php:882`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlUpdateTempPass = "UPDATE user_table SET tp_flag=0 AND temppass='' WHERE userid='$userid' AND tp_flag=1";
```

- Notas: QUERY DIN?MICA

## Q1325

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:255`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckUsername = "SELECT userid FROM user_table WHERE LOWER(screenname)='".strtolower($u)."'";
```

- Notas: QUERY DIN?MICA

## Q1326

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:276`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckUsername = "SELECT userid FROM user_table WHERE LOWER(screenname)='".strtolower($u)."' AND userid!='$userid'";
```

- Notas: QUERY DIN?MICA

## Q1327

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:295`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckUsername = "SELECT userid FROM user_table WHERE LOWER(screenname)='".strtolower($u)."' AND userid!='$userid'";
```

- Notas: QUERY DIN?MICA

## Q1328

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `screenname`, `userid`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:313`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckUsername = "SELECT userid FROM user_table WHERE LOWER(screenname)='".strtolower($u)."'";
```

- Notas: QUERY DIN?MICA

## Q1329

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`, `email`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:395`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckEmail = "SELECT userid FROM user_table WHERE LOWER(email)='".strtolower($e)."'";
```

- Notas: QUERY DIN?MICA

## Q1330

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`, `email`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:418`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckEmail = "SELECT userid FROM user_table WHERE LOWER(email)='".strtolower($e)."' AND userid != '$userid'";
```

- Notas: QUERY DIN?MICA

## Q1331

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`, `email`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:440`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCheckEmail = "SELECT userid FROM user_table WHERE LOWER(email)='".strtolower($e)."'";
```

- Notas: QUERY DIN?MICA

## Q1332

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`, `valid`
- Archivo:l?nea: `userbase/includes/lightwork_validate.php:490-491`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlGetUser = "SELECT * FROM user_table WHERE userid='$userid'" ." AND (valid=1 OR valid=0) ";
```

- Notas: QUERY DIN?MICA

## Q1333

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightworks_functions.php:131`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$masterQ1S = "INSERT INTO ".$tableSelect." (";
```

- Notas: QUERY DIN?MICA

## Q1334

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightworks_functions.php:197`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$masterQ1S = "INSERT INTO ".$tableSelect." (";
```

- Notas: QUERY DIN?MICA

## Q1335

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightworks_functions.php:230`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$masterQ1S = "UPDATE ".$tableSelect." ";
```

- Notas: QUERY DIN?MICA

## Q1336

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `{TABLE_DYNAMIC}`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/lightworks_functions.php:275`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$masterQ1S = "SELECT # FROM ".$tableSelect." ";
```

- Notas: QUERY DIN?MICA

## Q1337

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: `email`, `valid`, `ipad`, `type`
- Archivo:l?nea: `userbase/includes/no_script_includes/register_inc.php:245`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlBlock = " SELECT blockid FROM security_blocks WHERE (( blockvalue='$ipad' AND type=1 ) OR ( blockvalue='$email' AND type=3 ) $sql_where ) AND valid=1 AND blockarea IN (1,3) ";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1338

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/oAuth/twitter/twitteroauth.php:167-168`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
function delete($url, $parameters = array()) { $response = $this->oAuthRequest($url, 'DELETE', $parameters);
```

- Notas: QUERY DIN?MICA

## Q1339

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/payment_inc/ca_inc.php:44`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("payments",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1340

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/payment_inc/sc_inc.php:145`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("payments",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1341

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `userbase/includes/payment_inc/sc_inc.php:151`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_delete_failed_user = "DELETE FROM user_table WHERE userid='$userid' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1342

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/payment_inc/sp_inc.php:145`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("payments",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1343

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `userbase/includes/payment_inc/sp_inc.php:151`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_delete_failed_user = "DELETE FROM user_table WHERE userid='$userid' LIMIT 1";
```

- Notas: QUERY DIN?MICA

## Q1344

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: NO CONFIRMADO
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/includes/payment_inc/up_inc.php:46`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$dataPostBack = dbase::basic_queries("payments",false,$keys_values,"INSERT",false);
```

- Notas: QUERY DIN?MICA

## Q1345

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: `email`, `valid`, `ipad`, `type`
- Archivo:l?nea: `userbase/index/ajax/ub_register_user.php:341`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlBlock = " SELECT blockid FROM security_blocks WHERE (( blockvalue='$ipad' AND type=1 ) OR ( blockvalue='$email' AND type=3 ) $sql_where ) AND valid=1 AND blockarea IN (1,3) ";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1346

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `cookie_expire`, `cookie_salt`, `cookie_id`, `userid`
- Archivo:l?nea: `userbase/index/logout.php:15-16`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCookie = "UPDATE user_table SET cookie_id='', cookie_salt='', cookie_expire='0000-00-00 00:00:00'" ." WHERE userid='".$_SESSION['userid']."' ;";
```

- Notas: QUERY DIN?MICA

## Q1347

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `security_blocks`
- Columnas detectadas: `email`, `valid`, `ipad`, `type`
- Archivo:l?nea: `userbase/index (copia)/ajax/ub_register_user.php:341`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlBlock = " SELECT blockid FROM security_blocks WHERE (( blockvalue='$ipad' AND type=1 ) OR ( blockvalue='$email' AND type=3 ) $sql_where ) AND valid=1 AND blockarea IN (1,3) ";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1348

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `user_table`
- Columnas detectadas: `cookie_expire`, `cookie_salt`, `cookie_id`, `userid`
- Archivo:l?nea: `userbase/index (copia)/logout.php:15-16`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sqlCookie = "UPDATE user_table SET cookie_id='', cookie_salt='', cookie_expire='0000-00-00 00:00:00'" ." WHERE userid='".$_SESSION['userid']."' ;";
```

- Notas: QUERY DIN?MICA

## Q1349

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `ipn_logs`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/ipn/ipn.php:432`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_ipn = "INSERT INTO ipn_logs VALUES ($set,'$notification',now())";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1350

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `payments`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `userbase/ipn/ipn.php:460`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql_invoice = "SELECT * FROM payments WHERE pid='$invoice'";
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1351

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `usuario_biblioteca.php:120`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where userid = ".$p_userid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca.php:126

## Q1352

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `usuario_biblioteca.php:143`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca.php:145

## Q1353

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `usuario_biblioteca_audiolibros.php:104`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where userid = ".$p_userid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca_audiolibros.php:110

## Q1354

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `usuario_biblioteca_audiolibros.php:127`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca_audiolibros.php:129

## Q1355

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `usuario_biblioteca_libros.php:124`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where userid = ".$p_userid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca_libros.php:130

## Q1356

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `usuario_biblioteca_libros.php:150`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca_libros.php:152

## Q1357

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_table`
- Columnas detectadas: `userid`
- Archivo:l?nea: `usuario_biblioteca_libros2024.php:94`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_table where userid = ".$p_userid;
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca_libros2024.php:100

## Q1358

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `user_books`
- Columnas detectadas: `last_read`, `user_id`, `userid`
- Archivo:l?nea: `usuario_biblioteca_libros2024.php:117`
- Conexi?n/helper: `mysqli/helper` / `mpdb_get_value`
- Query:

```php
$sql = "select * from user_books where user_id = ".$gvar['usuario']['userid']." order by last_read desc";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_get_value en usuario_biblioteca_libros2024.php:119

## Q1359

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `videoid`
- Archivo:l?nea: `video_funcs.php:22`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM videos_book WHERE videoid ='".$videoid."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en video_funcs.php:23

## Q1360

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `videoid`
- Archivo:l?nea: `video_funcs.php:27`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM videos_book WHERE videoid ='".$videoid."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en video_funcs.php:28

## Q1361

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `videos_book`
- Columnas detectadas: `youtubeid`, `videoid`
- Archivo:l?nea: `video_funcs.php:31`
- Conexi?n/helper: `mysqli/helper` / `mpdb_query`
- Query:

```php
$sql = "DELETE FROM videos_book WHERE youtubeid ='".$videoid."'";
```

- Notas: QUERY DIN?MICA; usa helper mpdb_query en video_funcs.php:32

## Q1362

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `ebooks_books`
- Columnas detectadas: `ebooks_books_title`, `title`
- Archivo:l?nea: `xapi/v1/index.php:17`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = $dbConn->prepare("SELECT * FROM ebooks_books where ebooks_books_title=:title LIMIT 1");
```

- Notas: QUERY DIN?MICA

## Q1363

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `posts`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `xapi/v1/index.php:27`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = $dbConn->prepare("SELECT * FROM posts");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1364

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `posts`
- Columnas detectadas: `id`
- Archivo:l?nea: `xapi/v1/post.php:16`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = $dbConn->prepare("SELECT * FROM posts where id=:id");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1365

- Tipo: `SELECT`
- READ/WRITE: `READ`
- Tablas detectadas: `posts`
- Columnas detectadas: NO CONFIRMADO
- Archivo:l?nea: `xapi/v1/post.php:25`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$sql = $dbConn->prepare("SELECT * FROM posts");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1366

- Tipo: `INSERT`
- READ/WRITE: `WRITE`
- Tablas detectadas: `posts`
- Columnas detectadas: `user_id`, `status`, `title`
- Archivo:l?nea: `xapi/v1/post.php:38-41`
- Conexi?n/helper: `PDO/NO_CONFIRMADO` / `prepare`
- Query:

```php
$sql = "INSERT INTO posts (title, status, content, user_id) VALUES (:title, :status, :content, :user_id)";
```

- Notas: QUERY DIN?MICA; usa helper prepare en xapi/v1/post.php:42; tabla fuera de 10_DB_CATALOG

## Q1367

- Tipo: `DELETE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `posts`
- Columnas detectadas: `id`
- Archivo:l?nea: `xapi/v1/post.php:59`
- Conexi?n/helper: `NO_CONFIRMADO` / `NO_CONFIRMADO`
- Query:

```php
$statement = $dbConn->prepare("DELETE FROM posts where id=:id");
```

- Notas: QUERY DIN?MICA; tabla fuera de 10_DB_CATALOG

## Q1368

- Tipo: `UPDATE`
- READ/WRITE: `WRITE`
- Tablas detectadas: `posts`
- Columnas detectadas: `id`
- Archivo:l?nea: `xapi/v1/post.php:73-77`
- Conexi?n/helper: `PDO/NO_CONFIRMADO` / `prepare`
- Query:

```php
$sql = " UPDATE posts SET $fields WHERE id='$postId' ";
```

- Notas: QUERY DIN?MICA; usa helper prepare en xapi/v1/post.php:79; tabla fuera de 10_DB_CATALOG

