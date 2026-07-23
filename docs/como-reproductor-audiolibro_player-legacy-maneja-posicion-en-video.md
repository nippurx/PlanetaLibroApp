# Como el reproductor audiolibro_player guarda y recupera la posición de reproducción del usuario en el video de YouTube.


## 1. Resumen ejecutivo

El comportamiento legacy comprobado es:

1. El registro de progreso se crea únicamente cuando el usuario pulsa “Agregar audiolibro a mi biblioteca”.
2. El cliente obtiene `player.getCurrentTime()`, expresado por YouTube en segundos con decimales.
3. El endpoint aplica `intval()`, por lo que almacena segundos enteros truncados.
4. Se guarda al pausar y al abandonar la página. El intervalo de un segundo sólo actualiza la interfaz.
5. `max_min` no es un máximo real: cualquier posición distinta de cero reemplaza tanto `current_min` como `max_min`.
6. El reproductor no consulta la base de datos para recuperar el progreso.
7. La biblioteca consulta la fila, incorpora `current_min` a una URL como `/audiolibro_player/{uri}/{segundos}`, PHP lo convierte en `start_time` y `onReady` ejecuta `player.seekTo(start_time)`.
8. Abrir la página actualiza `last_read` inmediatamente, aunque el usuario no reproduzca el video.
9. La misma fila representa simultáneamente pertenencia a la biblioteca y progreso.
10. No se encontró uso de `localStorage`, `sessionStorage` ni cookies para almacenar la posición.

Nivel general de certeza: **comprobado en el código disponible**.

---

## 2. Flujo completo de alta

### 2.1 Presentación del botón

- Archivo: [template_funcs.php, líneas 418-466](D:/Desarrollo/MPWebs/www/planetalibro/src/template_funcs.php:418)
- Función: `boton_agregar_audiolibro_a_biblioteca()`
- Fragmento:

```php
$sql = "select id from user_video_audiolibros
        where user_id = ".$_SESSION['userid']."
        and ebooks_books_id = ".$gvar["libro"]["ebooks_books_id"];

<button ... onclick="f_user_video_audiolibros_insert()">
<input type="hidden" id="ebooks_books_id" ...>
```

- Explicación: si ya existe una fila para usuario/libro, oculta el botón de alta y muestra el enlace a la biblioteca. Si no existe, presenta el botón y un `ebooks_books_id` oculto.
- Certeza: **comprobado**.

El reproductor llama esta función cuando el audiolibro todavía no pertenece a la biblioteca:

- Archivo: [mp_booktube_funcs.php, líneas 130-135](D:/Desarrollo/MPWebs/www/planetalibro/src/mp_booktube_funcs.php:130)
- Función: `mp_booktube_audiolibro()`
- Fragmento:

```php
if (!user_audiolibro_esta_agregado($gvar['libro'])) {
    $s_libro_datos .= audiolibro_agregar_a_biblioteca($gvar['libro']);
}
```

- Certeza: **comprobado**.

La comprobación de pertenencia usa la misma tabla:

- Archivo: [user_funcs.php, líneas 1557-1576](D:/Desarrollo/MPWebs/www/planetalibro/src/user_funcs.php:1557)
- Función: `user_audiolibro_esta_agregado()`
- Fragmento:

```php
select id from user_video_audiolibros
where user_id = $_SESSION['userid']
and ebooks_books_id = $alibro['ebooks_books_id']
```

- Certeza: **comprobado**.

### 2.2 Petición de alta

La definición efectiva se encuentra en el JavaScript externo, aunque `template_audiolibro.php` contiene otra copia equivalente.

- Archivo: [mp_funciones.js, líneas 5-28](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_funciones.js:5)
- Función: `f_user_video_audiolibros_insert()`
- Fragmento:

```javascript
var ebooks_books_id = document.getElementById("ebooks_books_id").value;
var dataString = 'q=' + ebooks_books_id;

$.ajax({
    type: "GET",
    url: "https://planetalibro.net/f_user_video_audiolibros_insert.php",
    data: dataString
});

swap("mostrar_lista", "agregar_libro");
```

- Método: `GET`.
- Parámetro: `q={ebooks_books_id}`.
- Respuesta esperada por el cliente: ninguna; el callback está vacío.
- El cambio visual se hace inmediatamente, sin esperar que el servidor confirme la inserción.
- Certeza: **comprobado**.

La copia inline está en [template_audiolibro.php, líneas 319-343](D:/Desarrollo/MPWebs/www/planetalibro/src/template_audiolibro.php:319), y el archivo externo se incluye después en [template_audiolibro.php, línea 392](D:/Desarrollo/MPWebs/www/planetalibro/src/template_audiolibro.php:392).

### 2.3 Inserción SQL

- Archivo: [f_user_video_audiolibros_insert.php, líneas 23-39](D:/Desarrollo/MPWebs/www/planetalibro/src/f_user_video_audiolibros_insert.php:23)
- Función: código procedural
- Fragmento:

```php
$q = intval($_GET['q']);
$userid = $_SESSION['userid'];

$sql = "insert into user_video_audiolibros SET
 user_id = ".$userid.",
 last_read = now(),
 first_read = now(),
 ebooks_books_id = ".$q;
```

- Entrada cliente: exclusivamente `q`.
- Usuario: exclusivamente `$_SESSION['userid']`; no acepta `user_id` enviado por el cliente.
- Posiciones iniciales: no se incluyen en el `INSERT`; toman el valor predeterminado `0`.
- `first_read` y `last_read`: ambos se inicializan con `now()`.
- Certeza: **comprobado**.

### 2.4 Fila ya existente e índice único

- Archivo: [c2380538_main_stru.sql, líneas 957-965](D:/Desarrollo/MPWebs/www/planetalibro/docs/c2380538_main_stru.sql:957)
- Fragmento:

```sql
current_min int(10) NOT NULL DEFAULT '0',
max_min int(10) NOT NULL DEFAULT '0'
```

- Archivo: [c2380538_main_stru.sql, líneas 1433-1439](D:/Desarrollo/MPWebs/www/planetalibro/docs/c2380538_main_stru.sql:1433)
- Fragmento:

```sql
ADD UNIQUE KEY user_id_ebooks_books_id (user_id, ebooks_books_id)
```

- Explicación: una segunda inserción viola el índice único. No existe `INSERT IGNORE`, `ON DUPLICATE KEY UPDATE`, transacción ni recuperación explícita.
- Certeza: **comprobado en el esquema versionado**.

`mpdb_query()` devuelve el texto del error SQL, pero el endpoint lo descarta:

- Archivo: [mp_dbfuncs.php, líneas 272-279](D:/Desarrollo/MPWebs/www/planetalibro/src/mp_dbfuncs.php:272)
- Fragmento:

```php
$result = mysqli_query($conn, $query);
return mysqli_error($conn);
```

La respuesta HTTP pretendida por el código es cuerpo vacío, tanto en éxito como en error. El comportamiento exacto ante una excepción de `mysqli` depende de la configuración PHP de producción.

Certeza: **comprobado para el flujo de código; comportamiento HTTP exacto inferido**.

---

## 3. Flujo completo de guardado

### 3.1 Obtención y transporte de la posición

- Archivo: [template_audiolibro.php, líneas 293-316](D:/Desarrollo/MPWebs/www/planetalibro/src/template_audiolibro.php:293)
- Función: `f_user_video_audiolibros_updatetime()`
- Fragmento:

```javascript
p_time = player.getCurrentTime();
var dataString = 'bookid=' + bookid + '&time=' + p_time;

$.ajax({
    type: "GET",
    url: ".../f_user_video_audiolibros_updatetime.php",
    data: dataString
});
```

La definición equivalente también está en [mp_funciones.js, líneas 73-95](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_funciones.js:73).

- Fuente: `player.getCurrentTime()`.
- Unidad de origen: segundos, potencialmente fraccionarios.
- Método: `GET`.
- Parámetros: `bookid` y `time`.
- Certeza: **comprobado**.

### 3.2 Conversión y SQL

- Archivo: [f_user_video_audiolibros_updatetime.php, líneas 23-55](D:/Desarrollo/MPWebs/www/planetalibro/src/f_user_video_audiolibros_updatetime.php:23)
- Fragmento:

```php
$bookid = intval($_GET['bookid']);
$time = intval($_GET['time']);

if ($time == 0) {
    UPDATE ... SET current_min = $time ...
} else {
    UPDATE ... SET current_min = $time, max_min = $time ...
}
```

- Unidad almacenada: **segundos enteros**, no minutos.
- Redondeo: `intval()` trunca la parte decimal; no usa `round()`.
- Ejemplo: `125.9` se almacena como `125`.
- Certeza: **comprobado**.

### 3.3 Cuándo se guarda

**Al pausar:**

- Archivo: [mp_youtube_script.v9.js, líneas 69-77](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_youtube_script.v9.js:69)
- Función: `onPlayerStateChange()`
- Fragmento:

```javascript
if (event.data == 2) {
    f_user_video_audiolibros_updatetime();
}
```

**Al abandonar o recargar la página:**

- Archivo: [mp_youtube_script.v9.js, líneas 9-12](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_youtube_script.v9.js:9)
- Fragmento:

```javascript
window.onbeforeunload = function() {
    f_user_video_audiolibros_updatetime();
}
```

**No se guarda periódicamente:**

- Archivo: [mp_youtube_script.v9.js, líneas 50-60](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_youtube_script.v9.js:50)
- Fragmento:

```javascript
setInterval(function () {
    updateTimerDisplay();
    updateProgressBar();
}, 1000);
```

Ese intervalo sólo actualiza texto y barra de progreso.

No hay guardado explícito al reproducir, hacer seek, avanzar, retroceder, finalizar el video o cada N segundos. Los seeks quedan registrados posteriormente sólo si ocurre pausa o descarga de página.

Certeza: **comprobado**.

### 3.4 Respuestas y errores

El endpoint no emite `echo`, JSON, códigos HTTP personalizados ni cabeceras. El cliente:

- tiene únicamente callback `success`;
- ignora su contenido;
- no define `error`, `complete`, reintento ni cola;
- no usa `sendBeacon` ni `fetch(..., {keepalive:true})`.

Por ello, una petición durante `beforeunload` puede cancelarse y perderse.

Certeza: **comprobado en código; posibilidad de cancelación inferida del mecanismo utilizado**.

---

## 4. Flujo completo de recuperación

### 4.1 Consulta exacta

- Archivo: [user_funcs.php, líneas 2002-2010](D:/Desarrollo/MPWebs/www/planetalibro/src/user_funcs.php:2002)
- Función: `list_usuario_audiolibros()`
- Fragmento:

```php
$sql = "select * from user_video_audiolibros
        where user_id = ".$gvar['usuario']['userid']."
        order by last_read desc";
$alibros = mpdb_get_value($sql, $dbconn);
```

Esta consulta recupera `current_min`, `max_min`, `first_read` y `last_read`.

La página que invoca el listado fuerza que el usuario sea el de la sesión en [usuario_biblioteca_audiolibros.php, líneas 62-83](D:/Desarrollo/MPWebs/www/planetalibro/src/usuario_biblioteca_audiolibros.php:62), y llama a la función en [línea 260](D:/Desarrollo/MPWebs/www/planetalibro/src/usuario_biblioteca_audiolibros.php:260).

Certeza: **comprobado**.

### 4.2 Fallback `current_min` → `max_min`

- Archivo: [user_funcs.php, líneas 2058-2063](D:/Desarrollo/MPWebs/www/planetalibro/src/user_funcs.php:2058)
- Fragmento:

```php
if ($librouser['current_min'] == 0 && $librouser['max_min'] > 0) {
    $librouser['current_min'] = $librouser['max_min'];
}
```

Es una sustitución local para generar el enlace; no corrige la base de datos.

Certeza: **comprobado**.

### 4.3 Paso de PHP a JavaScript

La biblioteca construye:

- Archivo: [user_funcs.php, líneas 2092-2098](D:/Desarrollo/MPWebs/www/planetalibro/src/user_funcs.php:2092)
- Fragmento:

```php
$link = sys_url.'/audiolibro_player/'.
        $libro[0]['uri'].'/'.
        $librouser['current_min'];
```

La reescritura entrega todo el sufijo a PHP:

- Archivo: [.htaccess, líneas 16-17](D:/Desarrollo/MPWebs/www/planetalibro/src/.htaccess:16)
- Fragmento:

```apache
RewriteRule ^audiolibro_player/(.+)$ /audiolibro_player.php?libro=$1
```

El reproductor separa URI y posición:

- Archivo: [audiolibro_player.php, líneas 23-39](D:/Desarrollo/MPWebs/www/planetalibro/src/audiolibro_player.php:23)
- Fragmento:

```php
$url_args = explode('/', $_REQUEST['libro']);
$p_libro = $url_args[0];
$p_minuto = $url_args[1];

if (!$p_minuto) {
    $p_minuto = 0;
}
```

Luego genera JavaScript:

- Archivo: [mp_booktube_funcs.php, líneas 231-242](D:/Desarrollo/MPWebs/www/planetalibro/src/mp_booktube_funcs.php:231)
- Función: `mp_booktube_audiolibro()`
- Fragmento:

```php
var youtubevideoid = '...';
var start_time = $p_minuto;
var bookid = ...;
```

La variable JavaScript de recuperación es `start_time`.

Certeza: **comprobado**.

### 4.4 Posicionamiento de YouTube

- Archivo: [mp_youtube_script.v9.js, líneas 26-40](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_youtube_script.v9.js:26)
- Función: `onYouTubeIframeAPIReady()`
- Fragmento:

```javascript
player = new YT.Player('video-placeholder', {
    videoId: youtubevideoid,
    events: {
        onReady: initialize,
        onStateChange: onPlayerStateChange
    }
});
```

- Archivo: [mp_youtube_script.v9.js, líneas 44-67](D:/Desarrollo/MPWebs/www/planetalibro/src/js/mp_youtube_script.v9.js:44)
- Función: `initialize()`
- Fragmento:

```javascript
player.seekTo(start_time);
player.playVideo();
```

La restauración ocurre en `onReady` y la versión v9 inicia automáticamente la reproducción.

Certeza: **comprobado**.

### 4.5 Casos límite

- Sin fila: no aparece en la biblioteca; acceder directamente al reproductor usa `start_time = 0`.
- Fila con `current_min=0`, `max_min>0`: la biblioteca usa `max_min`.
- Ambos en cero: comienza desde cero.
- Posición superior a duración: no hay validación; se pasa directamente a `seekTo`.
- Video cambiado: la posición permanece vinculada sólo al libro y se aplica al nuevo `video_audiolibro`.
- Video eliminado: no existe ajuste o invalidación de progreso.
- `localStorage`, `sessionStorage` y cookies de progreso: no se encontraron referencias en la cadena completa del reproductor ni en los JavaScript involucrados.

Certeza: **comprobado para la ausencia de controles; resultado concreto de YouTube ante una posición excesiva, inferido**.

---

## 5. Semántica de la tabla

| Campo | Semántica real comprobada |
|---|---|
| `current_min` | Última posición guardada, en segundos enteros. Puede avanzar o retroceder. |
| `max_min` | Copia de cualquier posición guardada distinta de cero. No es un máximo histórico fiable. |
| `first_read` | Momento de creación/agregado a biblioteca, no necesariamente primera reproducción. |
| `last_read` | Momento de creación y, después, última apertura de la página legacy. No se actualiza al guardar posición. |

Condición exacta del endpoint:

```text
time == 0  → actualizar sólo current_min
time != 0  → actualizar current_min y max_min con el mismo valor
```

Consecuencias:

- `current_min` puede disminuir al retroceder.
- `max_min` también puede disminuir.
- El “máximo” no se compara en servidor.
- El cliente tampoco envía un máximo.
- Un valor negativo distinto de cero puede establecer ambos campos en negativo.
- `last_read` se actualiza por separado.

Certeza: **comprobado**.

---

## 6. Diagrama textual de llamadas

```text
usuario_biblioteca_audiolibros.php
→ list_usuario_audiolibros()
→ SELECT * FROM user_video_audiolibros ORDER BY last_read DESC
→ fallback local current_min = max_min cuando current_min=0 y max_min>0
→ genera /audiolibro_player/{uri}/{current_min}

.htaccess
→ audiolibro_player.php?libro={uri}/{segundos}

audiolibro_player.php
→ explode($_REQUEST['libro'])
→ $p_libro + $p_minuto
→ mp_booktube_audiolibro($p_minuto)
→ var start_time = $p_minuto
→ carga iframe_api + mp_youtube_script.v9.js

onYouTubeIframeAPIReady()
→ new YT.Player(...)
→ onReady: initialize()
→ player.seekTo(start_time)
→ player.playVideo()

pausa o beforeunload
→ player.getCurrentTime()
→ GET f_user_video_audiolibros_updatetime.php
   ?bookid={ebooks_books_id}
   &time={segundos_con_decimales}
→ intval(time)
→ UPDATE user_video_audiolibros
```

Alta independiente:

```text
botón “Agregar audiolibro”
→ f_user_video_audiolibros_insert()
→ GET f_user_video_audiolibros_insert.php?q={ebooks_books_id}
→ user_id desde $_SESSION
→ INSERT user_video_audiolibros
```

---

## 7. Parámetros y respuestas legacy

| Endpoint | Método | Entrada | Identidad | Respuesta observable |
|---|---|---|---|---|
| `f_user_video_audiolibros_insert.php` | GET | `q`: ID entero del libro | `$_SESSION['userid']` | Cuerpo vacío; errores SQL descartados |
| `f_user_video_audiolibros_updatetime.php` | GET | `bookid`: entero; `time`: segundos, convertido con `intval()` | `$_SESSION['userid']` | Cuerpo vacío; si no hay usuario, salida inmediata |

Ninguno declara `Content-Type`, JSON ni código de estado específico.

Certeza: **comprobado**.

---

## 8. Riesgos y defectos

1. **Autenticación incompleta.** Los endpoints no llaman `session_start()`, `user_logged_check()` ni otro guard explícito. `updatetime` sólo verifica que `$_SESSION['userid']` no sea vacío; `insert` ni siquiera hace esa comprobación. Su funcionamiento depende de que la sesión ya haya sido inicializada por la configuración del entorno. **Comprobado/inferido respecto del entorno.**

2. **Sin CSRF.** Las dos mutaciones usan `GET` y no reciben token, `Origin` validado ni nonce. **Comprobado.**

3. **Sin consultas preparadas.** El SQL se concatena. `q`, `bookid` y `time` pasan por `intval()`, lo que reduce inyección desde esos parámetros, pero no convierte el diseño en seguro. **Comprobado.**

4. **Sin validación de entidad.** No se comprueba que `bookid` exista, que sea audiolibro ni que conserve el mismo video de YouTube. El esquema versionado tampoco muestra claves foráneas para esta tabla. **Comprobado.**

5. **`max_min` no es monotónico.** Un retroceso seguido de pausa reduce tanto `current_min` como `max_min`. **Comprobado.**

6. **Valores inválidos.** El endpoint acepta negativos y valores muy superiores a la duración. `intval()` también convierte entradas no numéricas en cero. **Comprobado.**

7. **Carrera INSERT/UPDATE.** El alta y el guardado son AJAX independientes. Si una pausa o descarga dispara el `UPDATE` antes de finalizar el `INSERT`, el update afecta cero filas y no se reintenta. **Inferido con evidencia directa del flujo asíncrono.**

8. **Carreras entre guardados.** Dos peticiones concurrentes pueden llegar fuera de orden y una posición antigua sobrescribir una nueva. **Inferido.**

9. **Pérdida en `beforeunload`.** jQuery AJAX no garantiza completar una petición al descargar el documento. **Inferido.**

10. **Duplicados mal manejados.** El índice único protege la integridad, pero el endpoint no implementa upsert ni comunica el duplicado. La interfaz se actualiza como si hubiera éxito. **Comprobado.**

11. **Posible inyección JavaScript en `start_time`.** `$p_minuto` sólo pasa por `mpdb_real_escape_string()` y se emite sin comillas como código JavaScript; no se valida con `intval()` ni se serializa con `json_encode()`. **Comprobado como defecto de codificación; explotabilidad depende del enrutamiento/runtime.**

12. **Actividad semánticamente incorrecta.** `last_read` se actualiza al abrir la página, no al reproducir ni guardar. En `audiolibro.php` esto sucede aunque el reproductor activo esté comentado. Evidencia: [audiolibro.php, líneas 95-99 y 222-234](D:/Desarrollo/MPWebs/www/planetalibro/src/audiolibro.php:95). **Comprobado.**

---

## 9. Evidencia pendiente o no localizada

- No se pudo comprobar si producción utiliza `session.auto_start` o un `auto_prepend_file`; no está configurado en los archivos inspeccionados.
- No se verificó que el dump de esquema coincida exactamente con la base de producción actual.
- No se ejecutaron peticiones autenticadas ni consultas a producción, por la restricción de sólo lectura de código.
- No se comprobó que el archivo servido actualmente en `/js/mp_youtube_script.v9.js` sea byte a byte el mismo del repositorio.
- El comportamiento exacto de `seekTo()` cuando la posición supera la duración pertenece al runtime de YouTube; el legacy no lo controla.
- No existe una consulta directa de progreso dentro de `audiolibro_player.php`. La única recuperación localizada es la consulta del listado y el transporte por URL.
- No se encontró ningún consumidor específico de `first_read`; `last_read` sólo ordena la biblioteca, `current_min` genera enlaces/muestra tiempo y `max_min` funciona como fallback.

---

## 10. Recomendaciones para PlanetaLibroApp

### Equivalencias propuestas

| Legacy | Campo recomendado | Observación de migración |
|---|---|---|
| `current_min` | `position_seconds` | Tratar el dato legacy como segundos, no minutos. |
| `max_min` | `furthest_position_seconds` | Mantenerlo monotónico con `GREATEST`; reparar datos legacy usando al menos `max(current_min, max_min, 0)`. |
| `first_read` | `progress_created_at` | Si biblioteca y progreso se separan, usar además `added_to_library_at`. |
| `last_read` | `last_opened_at` | Preserva la semántica legacy; crear `last_playback_activity_at` para actividad real. |

Recomendaciones principales:

- Separar pertenencia a biblioteca de progreso.
- Identificar el progreso por usuario y audiolibro; asociarlo además a una versión estable del medio/video.
- Validar `position_seconds >= 0` y contra duración con una tolerancia razonable.
- Calcular el máximo exclusivamente en servidor.
- Usar upsert transaccional.
- Rechazar libros inexistentes o sin audiolibro.
- Autenticación obligatoria y CSRF para sesiones basadas en cookies.
- Respuestas JSON y códigos de error estables.
- Guardar mediante heartbeat moderado, pausa, finalización y un mecanismo confiable de cierre (`sendBeacon` o `keepalive`).
- Añadir número de versión o secuencia para impedir que una petición antigua sobrescriba una nueva.

### Contrato preliminar: GET

```http
GET /api/v1/public/audiobook-progress/{uri}
Authorization: Bearer …
```

Respuesta `200`:

```json
{
  "data": {
    "audiobook_uri": "gabriel-garcia-marquez-la-mujer-que-llegaba-a-las-seis",
    "has_progress": true,
    "position_seconds": 125,
    "furthest_position_seconds": 480,
    "media_id": "youtube:VIDEO_ID",
    "progress_created_at": "2026-07-21T12:00:00Z",
    "last_opened_at": "2026-07-21T13:00:00Z",
    "last_playback_activity_at": "2026-07-21T13:02:10Z",
    "version": 7
  }
}
```

Para un usuario sin progreso recomiendo `200` con `has_progress:false` y posiciones cero, evitando que el reproductor trate una situación normal como error.

Errores:

- `401`: no autenticado.
- `404`: URI inexistente o sin audiolibro.
- `409`: medio asociado cambiado y progreso incompatible, si se decide no migrarlo automáticamente.

### Contrato preliminar: POST

```http
POST /api/v1/public/audiobook-progress/{uri}
Authorization: Bearer …
Content-Type: application/json
X-CSRF-Token: …   # obligatorio si se usan cookies
```

Cuerpo:

```json
{
  "position_seconds": 125,
  "media_id": "youtube:VIDEO_ID",
  "event": "pause",
  "playback_session_id": "uuid",
  "expected_version": 6
}
```

Reglas recomendadas:

```text
position_seconds = posición actual validada
furthest_position_seconds =
    max(valor almacenado, position_seconds)

expected_version evita escrituras fuera de orden
media_id evita aplicar progreso de un video anterior a otro distinto
POST crea la fila si no existe y actualiza si existe
```

Respuesta `200` o `201`:

```json
{
  "data": {
    "position_seconds": 125,
    "furthest_position_seconds": 480,
    "last_playback_activity_at": "2026-07-21T13:02:10Z",
    "version": 7
  }
}
```

Errores recomendados:

- `400`: JSON o evento inválido.
- `401`: no autenticado.
- `403`: CSRF inválido.
- `404`: audiolibro inexistente.
- `409`: versión o `media_id` incompatible.
- `422`: posición negativa, no finita o excesiva.
