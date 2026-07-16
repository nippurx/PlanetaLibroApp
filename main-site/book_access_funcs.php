<?php
/**
 * FUNCIONES DE ACCESO DE USUARIOS A LIBROS
 *
 * Requiere las funciones de mp_dbfuncs.php y una conexion disponible en
 * la variable global $dbconn.
 *
 * Convencion de las escrituras:
 * - Devuelven una cadena vacia cuando la consulta se ejecuto correctamente.
 * - Devuelven el mensaje de MySQL cuando ocurre un error.
 * - Devuelven -1 cuando los parametros recibidos no son validos.
 */

/**
 * Retorna los tipos de origen admitidos por user_book_entitlements.
 */
function book_access_source_types()
{
    return array('manual_grant', 'gift', 'purchase', 'promotion', 'license');
}

/**
 * Retorna los estados admitidos por user_book_entitlements.
 */
function book_access_statuses()
{
    return array('active', 'revoked', 'expired');
}

/**
 * Valida y normaliza una fecha para utilizarla en una consulta SQL.
 * Acepta fechas en formato Y-m-d H:i:s. NULL se utiliza para fechas opcionales.
 */
function book_access_normalize_date($date, $allow_null = true)
{
    if (($date === null || $date === '') && $allow_null) {
        return null;
    }

    if (!is_string($date)) {
        return false;
    }

    $date_object = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    $date_errors = DateTime::getLastErrors();

    if ($date_object === false) {
        return false;
    }

    if (is_array($date_errors)
        && ($date_errors['warning_count'] > 0 || $date_errors['error_count'] > 0)) {
        return false;
    }

    if ($date_object->format('Y-m-d H:i:s') !== $date) {
        return false;
    }

    return $date;
}

/**
 * Concede acceso a un libro.
 *
 * $starts_at y $expires_at deben usar el formato Y-m-d H:i:s.
 * Si $starts_at se omite, el acceso comienza inmediatamente.
 */
function book_access_grant(
    $user_id,
    $book_id,
    $source_type = 'manual_grant',
    $expires_at = null,
    $granted_by_user_id = 0,
    $note = '',
    $starts_at = null
) {
    global $dbconn;

    $user_id = (int) $user_id;
    $book_id = (int) $book_id;
    $granted_by_user_id = (int) $granted_by_user_id;

    if ($user_id <= 0 || $book_id <= 0) {
        return -1;
    }

    if (!in_array($source_type, book_access_source_types(), true)) {
        return -1;
    }

    $starts_at = book_access_normalize_date($starts_at, true);
    $expires_at = book_access_normalize_date($expires_at, true);

    if ($starts_at === false || $expires_at === false) {
        return -1;
    }

    if ($starts_at !== null && $expires_at !== null && $expires_at <= $starts_at) {
        return -1;
    }

    $source_type = mpdb_real_escape_string($source_type);
    $note = mpdb_real_escape_string($note);

    $starts_at_sql = ($starts_at === null)
        ? 'NOW()'
        : "'".mpdb_real_escape_string($starts_at)."'";

    $expires_at_sql = ($expires_at === null)
        ? 'NULL'
        : "'".mpdb_real_escape_string($expires_at)."'";

    $granted_by_sql = ($granted_by_user_id > 0)
        ? $granted_by_user_id
        : 'NULL';

    $note_sql = ($note === '') ? 'NULL' : "'".$note."'";

    $sql = "INSERT INTO user_book_entitlements SET
            user_id = ".$user_id.",
            book_id = ".$book_id.",
            status = 'active',
            source_type = '".$source_type."',
            starts_at = ".$starts_at_sql.",
            expires_at = ".$expires_at_sql.",
            granted_at = NOW(),
            granted_by_user_id = ".$granted_by_sql.",
            note = ".$note_sql;

    return mpdb_query($sql, $dbconn);
}

/**
 * Retorna el primer acceso vigente de un usuario a un libro.
 * Devuelve un array con la fila o 0 si no existe un acceso vigente.
 */
function book_access_get_active($user_id, $book_id)
{
    global $dbconn;

    $user_id = (int) $user_id;
    $book_id = (int) $book_id;

    if ($user_id <= 0 || $book_id <= 0) {
        return 0;
    }

    $sql = "SELECT *
            FROM user_book_entitlements
            WHERE user_id = ".$user_id."
              AND book_id = ".$book_id."
              AND status = 'active'
              AND starts_at <= NOW()
              AND (expires_at IS NULL OR expires_at > NOW())
            ORDER BY
              CASE WHEN expires_at IS NULL THEN 1 ELSE 0 END DESC,
              expires_at DESC,
              id DESC
            LIMIT 1";

    $data = mpdb_get_value($sql, $dbconn);

    if (count($data)) {
        return $data[0];
    }

    return 0;
}

/**
 * Indica si un usuario esta autorizado para leer un libro.
 */
function book_access_user_can_read($user_id, $book_id)
{
    return book_access_get_active($user_id, $book_id) ? 1 : 0;
}

/**
 * Retorna todos los accesos vigentes de un usuario junto con los datos del libro.
 */
function book_access_get_user_books($user_id)
{
    global $dbconn;

    $user_id = (int) $user_id;

    if ($user_id <= 0) {
        return array();
    }

    $sql = "SELECT
                ube.*,
                eb.uri,
                eb.ebooks_books_title,
                eb.ebooks_books_subtitle,
                eb.ebooks_books_author,
                eb.ebooks_books_cover,
                eb.read_online
            FROM user_book_entitlements ube
            INNER JOIN ebooks_books eb
                ON eb.ebooks_books_id = ube.book_id
            WHERE ube.user_id = ".$user_id."
              AND ube.status = 'active'
              AND ube.starts_at <= NOW()
              AND (ube.expires_at IS NULL OR ube.expires_at > NOW())
            ORDER BY ube.granted_at DESC, ube.id DESC";

    return mpdb_get_value($sql, $dbconn);
}

/**
 * Retorna el historial completo de accesos de un usuario a un libro.
 */
function book_access_get_history($user_id, $book_id)
{
    global $dbconn;

    $user_id = (int) $user_id;
    $book_id = (int) $book_id;

    if ($user_id <= 0 || $book_id <= 0) {
        return array();
    }

    $sql = "SELECT *
            FROM user_book_entitlements
            WHERE user_id = ".$user_id."
              AND book_id = ".$book_id."
            ORDER BY granted_at DESC, id DESC";

    return mpdb_get_value($sql, $dbconn);
}

/**
 * Revoca una concesion de acceso concreta.
 */
function book_access_revoke($entitlement_id, $note = '')
{
    global $dbconn;

    $entitlement_id = (int) $entitlement_id;

    if ($entitlement_id <= 0) {
        return -1;
    }

    $note = mpdb_real_escape_string($note);
    $note_sql = ($note === '')
        ? 'note'
        : "'".$note."'";

    $sql = "UPDATE user_book_entitlements SET
                status = 'revoked',
                revoked_at = NOW(),
                note = ".$note_sql."
            WHERE id = ".$entitlement_id."
              AND status = 'active'";

    return mpdb_query($sql, $dbconn);
}

/**
 * Cambia el vencimiento de una concesion y vuelve a activarla.
 * $expires_at debe usar Y-m-d H:i:s o ser NULL para acceso sin vencimiento.
 */
function book_access_renew($entitlement_id, $expires_at = null)
{
    global $dbconn;

    $entitlement_id = (int) $entitlement_id;
    $expires_at = book_access_normalize_date($expires_at, true);

    if ($entitlement_id <= 0 || $expires_at === false) {
        return -1;
    }

    $expires_at_sql = ($expires_at === null)
        ? 'NULL'
        : "'".mpdb_real_escape_string($expires_at)."'";

    $sql = "UPDATE user_book_entitlements SET
                status = 'active',
                expires_at = ".$expires_at_sql.",
                revoked_at = NULL
            WHERE id = ".$entitlement_id;

    return mpdb_query($sql, $dbconn);
}

/**
 * Marca como expirados los accesos cuya fecha de vencimiento ya paso.
 * Puede ejecutarse desde una tarea programada; la autorizacion no depende de ella,
 * porque book_access_get_active tambien comprueba expires_at.
 */
function book_access_expire_due()
{
    global $dbconn;

    $sql = "UPDATE user_book_entitlements SET
                status = 'expired'
            WHERE status = 'active'
              AND expires_at IS NOT NULL
              AND expires_at <= NOW()";

    return mpdb_query($sql, $dbconn);
}

?>
