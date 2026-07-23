# Agregados al esquema posteriores a la auditoría

Este documento registra tablas, columnas e índices propuestos o aplicados después del dump base auditado en `docs/c2380538_main_stru.sql`.

No reemplaza a `10_DB_CATALOG.md` ni a `10_DB_CATALOG.json`: esos archivos describen exclusivamente el esquema observado durante la auditoría. Una entrada sólo puede cambiar de `PROPOSED` a `APPLIED` después de ejecutar la migración en el entorno indicado y registrar evidencia de verificación.

## Estados

| Estado | Significado |
|---|---|
| `PROPOSED` | Diseño documentado; no se afirma que exista en ninguna base. |
| `APPLIED` | Migración ejecutada y verificada en el entorno consignado. |
| `ROLLED_BACK` | Cambio retirado mediante el procedimiento documentado. |
| `SUPERSEDED` | Reemplazado por otro diseño o migración identificada. |
| `REPORTED_APPLIED` | El propietario informa que se ejecutó, pero falta evidencia técnica para marcarlo `APPLIED`. |

---

## DB-ADD-001 — `user_book_annotations`

| Dato | Valor |
|---|---|
| Estado | **REPORTED_APPLIED — VERIFICATION PENDING** |
| Fecha de diseño | 2026-07-18 |
| Feature | `planeta-libro-app/FEAT-003` |
| OpenSpec | `reading-annotations` |
| Área | Reader / datos privados de usuario |
| Motor | InnoDB |
| Charset/collation | `utf8mb4` / `utf8mb4_unicode_ci` |
| Entorno aplicado | Base de datos de PlanetaLibro, informado por el propietario el 2026-07-18 |
| Evidencia de aplicación | Pendientes `SELECT VERSION()`, `SHOW CREATE TABLE` y `SHOW INDEX` |

### Objetivo

Persistir destacados y notas personales de usuarios autenticados. Ambas acciones comparten una entidad: `note_text IS NULL` representa un destacado y `note_text` con contenido representa una nota.

La tabla se relaciona directamente con `user_table.userid` y `ebooks_books.ebooks_books_id`; no depende de `user_books.id`. Quitar un libro de la biblioteca no debe eliminar sus anotaciones.

### Compatibilidad con el esquema auditado

- `user_table.userid` es `INT` signed, PK e InnoDB: puede recibir una foreign key desde la tabla nueva.
- `ebooks_books.ebooks_books_id` es `INT` signed, pero `ebooks_books` usa MyISAM: MySQL no permite crear una foreign key hacia esa tabla.
- La existencia del libro debe validarse en la API antes de insertar. `idx_uba_book` permite mantenimiento por libro.
- El frontend nunca debe conectarse directamente a MySQL; los writes pasan por una API autenticada.
- La versión productiva del servidor debe confirmarse con `SELECT VERSION()` antes de usar `DATETIME(6)`.

### Convención del ancla

`start_fragment` y `end_fragment` corresponden a números de fragmento `pag-N` y sólo funcionan como pistas de carga. No son páginas editoriales ni identidad canónica.

`start_offset` y `end_offset` se calculan sobre el texto visible normalizado mediante una convención versionada. No representan bytes UTF-8, posiciones dentro del HTML crudo, páginas visuales, nodos DOM ni píxeles.

El ancla también conserva `exact_text`, contexto anterior/posterior, `content_version` y `anchor_version` para validar o recuperar el pasaje después de cambios de layout o contenido.

### DDL propuesto

```sql
CREATE TABLE `user_book_annotations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    `user_id` INT NOT NULL,
    `ebooks_books_id` INT NOT NULL,

    `start_fragment` MEDIUMINT UNSIGNED NOT NULL,
    `start_offset` INT UNSIGNED NOT NULL,
    `end_fragment` MEDIUMINT UNSIGNED NOT NULL,
    `end_offset` INT UNSIGNED NOT NULL,

    `exact_text` TEXT NOT NULL,
    `prefix_text` VARCHAR(512) DEFAULT NULL,
    `suffix_text` VARCHAR(512) DEFAULT NULL,

    `content_version` VARCHAR(128)
        CHARACTER SET ascii
        COLLATE ascii_bin
        NOT NULL,
    `anchor_version` SMALLINT UNSIGNED NOT NULL DEFAULT 1,

    `note_text` TEXT DEFAULT NULL,
    `color_code` TINYINT UNSIGNED NOT NULL DEFAULT 1,

    `client_request_id` CHAR(36)
        CHARACTER SET ascii
        COLLATE ascii_bin
        DEFAULT NULL,

    `revision` INT UNSIGNED NOT NULL DEFAULT 1,

    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL
        DEFAULT CURRENT_TIMESTAMP(6)
        ON UPDATE CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`),

    KEY `idx_uba_user_book_location` (
        `user_id`,
        `ebooks_books_id`,
        `start_fragment`,
        `start_offset`,
        `id`
    ),

    KEY `idx_uba_user_updated` (
        `user_id`,
        `updated_at`,
        `id`
    ),

    KEY `idx_uba_book` (
        `ebooks_books_id`,
        `id`
    ),

    UNIQUE KEY `uq_uba_user_request` (
        `user_id`,
        `client_request_id`
    ),

    CONSTRAINT `fk_uba_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `user_table` (`userid`)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARACTER SET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Destacados y notas privadas ancladas al contenido de libros';
```

### Semántica de columnas

| Columna | Semántica |
|---|---|
| `id` | Identidad interna de 64 bits de la anotación. |
| `user_id` | Propietario obtenido exclusivamente desde la sesión server-side. |
| `ebooks_books_id` | Libro resuelto internamente desde su URI pública. |
| `start_fragment`, `end_fragment` | Pistas de fragmentos de inicio y fin dentro del manifest validado. |
| `start_offset`, `end_offset` | Offsets en el texto visible normalizado según `anchor_version`. |
| `exact_text` | Pasaje seleccionado; permite validar y recuperar el ancla. |
| `prefix_text`, `suffix_text` | Contexto acotado para desambiguar coincidencias. |
| `content_version` | Versión o huella del contenido contra el que se creó el ancla. |
| `anchor_version` | Versión de la normalización y serialización del ancla. |
| `note_text` | Comentario privado; `NULL` significa destacado sin nota. |
| `color_code` | Código de una paleta cerrada, no una categoría semántica. |
| `client_request_id` | UUID idempotente para reintentos de creación. |
| `revision` | Versión incremental para concurrencia optimista. |
| `created_at`, `updated_at` | Auditoría temporal y cursor de cambios del propietario. |

### Límites propuestos para API y UI

El DDL no intenta sustituir estas validaciones, porque distintas versiones de MySQL históricas ignoran o aplican de manera diferente algunos `CHECK`.

| Dato | Límite propuesto |
|---|---:|
| `exact_text` | 4.000 unidades UTF-16 normalizadas |
| `prefix_text` | 256 unidades UTF-16 normalizadas |
| `suffix_text` | 256 unidades UTF-16 normalizadas |
| `note_text` | 10.000 unidades UTF-16 normalizadas |
| `content_version` | 128 caracteres ASCII |
| `client_request_id` | UUID canónico de 36 caracteres ASCII |

Reglas adicionales:

- Los fragmentos deben existir en el manifest y ser mayores o iguales a 1.
- El final no puede preceder al inicio.
- Si inicio y fin están en el mismo fragmento, `end_offset` debe ser mayor que `start_offset`.
- `exact_text` no puede estar vacío después de normalizar.
- `anchor_version` debe ser mayor o igual que 1.
- Paleta inicial propuesta: `1 amarillo`, `2 azul`, `3 rosa`, `4 verde`; el valor predeterminado es amarillo.
- Una cadena vacía o formada sólo por espacios en `note_text` se normaliza a `NULL`.

### Justificación de índices

| Índice | Consulta atendida |
|---|---|
| `PRIMARY (id)` | Identificación y joins internos. |
| `idx_uba_user_book_location` | Cuaderno por libro, representación de rangos y cursor estable por ubicación. |
| `idx_uba_user_updated` | Cambios recientes y futura sincronización incremental del propietario. |
| `idx_uba_book` | Mantenimiento cuando un libro se retira o regenera; compensa la ausencia de FK a MyISAM. |
| `uq_uba_user_request` | Evitar duplicados al reintentar una creación con el mismo UUID. |

No se crea una tabla compartida de pasajes seleccionados. La deduplicación entre usuarios agregaría joins, concurrencia y limpieza de anclas con una reducción incierta de almacenamiento.

### Escritura idempotente esperada

```sql
INSERT INTO `user_book_annotations` (
    `user_id`,
    `ebooks_books_id`,
    `start_fragment`,
    `start_offset`,
    `end_fragment`,
    `end_offset`,
    `exact_text`,
    `prefix_text`,
    `suffix_text`,
    `content_version`,
    `anchor_version`,
    `note_text`,
    `color_code`,
    `client_request_id`
) VALUES (
    :session_user_id,
    :ebooks_books_id,
    :start_fragment,
    :start_offset,
    :end_fragment,
    :end_offset,
    :exact_text,
    :prefix_text,
    :suffix_text,
    :content_version,
    :anchor_version,
    NULLIF(TRIM(:note_text), ''),
    :color_code,
    :client_request_id
)
ON DUPLICATE KEY UPDATE
    `id` = LAST_INSERT_ID(`id`);
```

La API obtiene el identificador con `SELECT LAST_INSERT_ID()`. El mismo `client_request_id` sólo deduplica reintentos del mismo usuario; no impide crear deliberadamente varias anotaciones sobre un rango.

### Actualización con concurrencia optimista

```sql
UPDATE `user_book_annotations`
SET
    `note_text` = NULLIF(TRIM(:note_text), ''),
    `color_code` = :color_code,
    `revision` = `revision` + 1
WHERE `id` = :annotation_id
  AND `user_id` = :session_user_id
  AND `revision` = :expected_revision;
```

Cero filas afectadas significa anotación inexistente, ajena o desactualizada. La API debe resolver el resultado sin revelar la existencia de anotaciones de otros usuarios.

### Eliminación por propietario

```sql
DELETE FROM `user_book_annotations`
WHERE `id` = :annotation_id
  AND `user_id` = :session_user_id;
```

`user_id` nunca se acepta como identidad confiable desde path, query o body.

### Consultas de verificación antes de aplicar

```sql
SELECT VERSION() AS database_version;

SHOW TABLE STATUS
WHERE Name IN ('user_table', 'ebooks_books', 'user_books');

SHOW CREATE TABLE `user_table`;
SHOW CREATE TABLE `ebooks_books`;

SELECT COUNT(*) AS invalid_users
FROM `user_table`
WHERE `userid` IS NULL OR `userid` <= 0;
```

La migración debe detenerse si el tipo real de `user_table.userid` difiere de `INT` signed, si `user_table` no es InnoDB o si la versión no admite la precisión temporal utilizada.

### Verificación después de aplicar

```sql
SHOW CREATE TABLE `user_book_annotations`;

SHOW INDEX FROM `user_book_annotations`;

SELECT
    ENGINE,
    TABLE_COLLATION
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'user_book_annotations';

SELECT
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'user_book_annotations'
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

Antes de cambiar esta entrada a `APPLIED`, registrar:

- fecha y entorno;
- versión de MySQL/MariaDB;
- resultado de `SHOW CREATE TABLE`;
- presencia de los cuatro índices secundarios, PK y FK a usuario;
- prueba transaccional de insert, reintento idempotente, update con revisión y delete;
- `EXPLAIN` de listado por usuario/libro y consulta por actualización;
- confirmación de que no se creó una FK inválida hacia `ebooks_books`.

### Privacidad y operación

- Las respuestas que contengan estas filas deben usar `Cache-Control: private, no-store`.
- `note_text`, `exact_text`, `prefix_text` y `suffix_text` no deben escribirse en logs ni telemetría.
- El service worker y las cachés compartidas deben excluir endpoints de anotaciones.
- La eliminación de una cuenta se propaga por `fk_uba_user ... ON DELETE CASCADE`.
- Quitar un libro de `user_books` no elimina anotaciones.
- Si una publicación desaparece, las anotaciones se conservan hasta una política explícita de retención/exportación.

### Rollback

El rollback operativo predeterminado es desactivar UI y endpoints conservando la tabla. No se debe eliminar contenido personal para revertir una aplicación.

Sólo si la tabla acaba de crearse, nunca recibió datos reales y una verificación devuelve cero filas:

```sql
SELECT COUNT(*) AS annotation_count
FROM `user_book_annotations`;
```

se puede autorizar explícitamente:

```sql
DROP TABLE `user_book_annotations`;
```

Una vez que existan anotaciones reales, cualquier eliminación física requiere exportación o una decisión documentada de retención y privacidad.

---

## DB-ADD-002 — tipos de anotación y preparación para señaladores

| Dato | Valor |
|---|---|
| Estado | **REPORTED_APPLIED — VERIFICATION PENDING** |
| Fecha informada | 2026-07-19 |
| Tabla | `user_book_annotations` |
| Feature actual | Señaladores simples del reader |
| Feature futura relacionada | `planeta-libro-app/FEAT-008` |
| Entorno aplicado | Base de datos de PlanetaLibro, informado por el propietario |
| Versión informada | MySQL `5.7.44-log` |
| Evidencia pendiente | `SHOW CREATE TABLE user_book_annotations` y `SHOW INDEX FROM user_book_annotations` |

### Objetivo

Evolucionar la entidad unificada de anotaciones para distinguir explícitamente subrayados, notas y señaladores. Los tres tipos se consultan desde el mismo cuaderno, pero conservan interacciones diferentes en el reader.

El señalador se representa como un ancla puntual: `start_fragment = end_fragment` y `start_offset = end_offset`. No selecciona texto, por lo que usa `exact_text = ''` y `note_text = NULL`; `prefix_text` y `suffix_text` conservan contexto para mostrar y recuperar la ubicación. `color_code` permanece en la tabla y usa inicialmente un único valor visible.

### ALTER TABLE informado como aplicado

```sql
ALTER TABLE `user_book_annotations`
    ADD COLUMN `annotation_type`
        ENUM('highlight', 'note', 'bookmark')
        NOT NULL
        DEFAULT 'highlight'
        AFTER `ebooks_books_id`;
```

### Clasificación y normalización informadas como aplicadas

```sql
UPDATE `user_book_annotations`
SET `annotation_type` = 'note'
WHERE `note_text` IS NOT NULL
  AND CHAR_LENGTH(TRIM(`note_text`)) > 0;

UPDATE `user_book_annotations`
SET `annotation_type` = 'highlight'
WHERE `note_text` IS NULL
   OR CHAR_LENGTH(TRIM(`note_text`)) = 0;

UPDATE `user_book_annotations`
SET `note_text` = NULL
WHERE `note_text` IS NOT NULL
  AND CHAR_LENGTH(TRIM(`note_text`)) = 0;
```

### Índice informado como aplicado

```sql
ALTER TABLE `user_book_annotations`
    ADD KEY `idx_uba_user_book_type_location` (
        `user_id`,
        `ebooks_books_id`,
        `annotation_type`,
        `start_fragment`,
        `start_offset`,
        `id`
    );
```

El índice atiende el listado y los filtros por tipo y ubicación. `idx_uba_user_book_location` continúa atendiendo el listado unificado sin filtro.

### Comentario informado como aplicado

```sql
ALTER TABLE `user_book_annotations`
    COMMENT = 'Señaladores, subrayados y notas privadas ancladas al contenido de libros';
```

### Restricción condicional de duplicados no aplicada

Se intentó agregar las columnas generadas `bookmark_user_id`, `bookmark_book_id`, `bookmark_fragment` y `bookmark_offset`, junto con `uq_uba_bookmark_location`. MySQL rechazó el `ALTER TABLE` durante el renombrado de su tabla temporal:

```text
#1025 - Error en el renombrado de la tabla temporal
(Error: 150 - Foreign key constraint is incorrectly formed)
```

La operación se considera **NO APLICADA** hasta comprobar lo contrario. No se debe asumir que existen esas columnas ni el índice único. MySQL `5.7.44-log` admite columnas generadas almacenadas; el error apunta a la recreación de una foreign key existente durante el rebuild.

La primera versión controlará duplicados mediante la API, `client_request_id`, bloqueo transitorio de la interacción y eliminación por ubicación. La restricción física queda diferida hasta revisar `SHOW CREATE TABLE user_book_annotations`, `SHOW CREATE TABLE user_table` y `LATEST FOREIGN KEY ERROR` de InnoDB.

### Verificación pendiente

```sql
SHOW CREATE TABLE `user_book_annotations`;
SHOW INDEX FROM `user_book_annotations`;

SHOW COLUMNS
FROM `user_book_annotations`
LIKE 'bookmark_%';

SELECT
    `annotation_type`,
    COUNT(*) AS `total`
FROM `user_book_annotations`
GROUP BY `annotation_type`;
```

Para elevar el estado a `APPLIED`, se debe confirmar la presencia de `annotation_type` e `idx_uba_user_book_type_location`, la ausencia de las columnas `bookmark_*` y de `uq_uba_bookmark_location`, y la conservación de la PK, índices anteriores y `fk_uba_user`.

---

### Pendientes originales de DB-ADD-001

1. Confirmar versión productiva mediante `SELECT VERSION()` y compatibilidad con `DATETIME(6)`.
2. Confirmar límites y paleta como decisiones de producto definitivas.
3. Fijar la unidad reproducible de offsets y el formato de `content_version`.
4. Revisar `EXPLAIN` con un volumen representativo antes de considerar completos los índices.
5. Definir el procedimiento de migración por entorno y quién registra el cambio a `APPLIED`.

---

## DB-ADD-002 — `user_audiobook_annotations`

### Estado

**APPLIED (informado por el propietario el 2026-07-22).**

La tabla fue creada en la base productiva `c2380538_main`, informada como MySQL `5.7.44-log`. Este documento registra el DDL acordado y la confirmación de aplicación del propietario. Queda pendiente adjuntar como evidencia operativa la salida completa de `SHOW CREATE TABLE` y `SHOW INDEX`.

### Objetivo

Persistir múltiples señaladores privados de audiolibro por usuario, libro, medio y segundo, con una nota opcional. Esta entidad se mantiene separada de:

- `user_video_audiolibros`, que conserva una única posición de reproducción para reanudar;
- `user_book_annotations`, cuyas coordenadas obligatorias representan anclas textuales del ebook.

Un segundo intento de crear un señalador en la misma ubicación no debe borrar el registro existente. La API debe recuperar el señalador ya creado y ofrecer la edición explícita de su nota.

### DDL informado como aplicado

```sql
CREATE TABLE `user_audiobook_annotations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `ebooks_books_id` INT NOT NULL,
    `media_id` VARCHAR(2048) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    `media_hash` BINARY(32)
        GENERATED ALWAYS AS (UNHEX(SHA2(`media_id`, 256))) STORED,
    `position_seconds` INT UNSIGNED NOT NULL,
    `note_text` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `client_request_id` CHAR(36) CHARACTER SET ascii COLLATE ascii_bin DEFAULT NULL,
    `revision` INT UNSIGNED NOT NULL DEFAULT 1,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_uaba_user_request` (`user_id`, `client_request_id`),
    UNIQUE KEY `uq_uaba_location` (
        `user_id`, `ebooks_books_id`, `media_hash`, `position_seconds`
    ),
    KEY `idx_uaba_user_book_position` (
        `user_id`, `ebooks_books_id`, `position_seconds`, `id`
    ),
    KEY `idx_uaba_user_updated` (`user_id`, `updated_at`, `id`),
    KEY `idx_uaba_book` (`ebooks_books_id`, `id`),
    CONSTRAINT `fk_uaba_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `user_table` (`userid`)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARACTER SET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Señaladores y notas privadas de audiolibros';
```

### Decisiones y restricciones

- `position_seconds` utiliza segundos enteros, igual que el contrato vigente de progreso de audiolibro.
- `media_id` identifica la versión concreta del video. Un cambio de medio no debe trasladar silenciosamente los señaladores anteriores.
- `media_hash` permite indexar y deduplicar un identificador de medio de hasta 2.048 caracteres sin usar un índice de prefijo ambiguo.
- `uq_uaba_location` impide dos filas del mismo usuario, libro, medio y segundo.
- `uq_uaba_user_request` proporciona idempotencia para reintentos de creación mediante UUID.
- `revision` queda reservado para concurrencia optimista al editar la nota.
- `note_text` es privado, opcional y debe limitarse en la API a 10.000 caracteres.
- La identidad del usuario debe proceder exclusivamente de la sesión server-side. Los writes requieren mismo origen, CSRF, sentencias preparadas y respuestas privadas sin caché.
- No existe foreign key hacia `ebooks_books`: el esquema auditado confirma que esa tabla usa MyISAM. La API debe validar la existencia del libro y que `media_id` continúe asociado a él.

### Verificación operativa pendiente de adjuntar

```sql
SHOW CREATE TABLE `user_audiobook_annotations`;
SHOW INDEX FROM `user_audiobook_annotations`;
```

La verificación debe confirmar motor InnoDB, charset/collation, columna generada `media_hash`, tres índices de consulta, dos restricciones únicas y `fk_uaba_user`. La ausencia de una FK hacia `ebooks_books` es intencional.
