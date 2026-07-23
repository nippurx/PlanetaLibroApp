# Migracion segura de sesiones Legacy y compatibilidad con PlanetaLibroApp

## Proposito

Este documento indica que debe conservar o implementar el equipo de PlanetaLibro legacy cuando reemplace el manejo de sesiones. El objetivo es mejorar la seguridad de Legacy sin obligar a modificar los controladores, repositorios ni el frontend de PlanetaLibroApp.

La API no debe conocer cookies, tokens, tablas, variables globales ni reglas internas del nuevo sistema. Solo recibe un contexto de aplicacion pequeño y estable.

## Regla principal

La unica integracion de PlanetaLibroApp con la sesion Legacy es el adaptador de sesion configurado en:

`api/v1/src/bootstrap.php`

Los detalles actuales estan encapsulados en:

`api/v1/src/Auth/LegacyPhpSessionResolver.php`

Cuando Legacy cambie, se debe crear o actualizar una implementacion de:

`api/v1/src/Auth/LegacySessionResolver.php`

No se deben modificar los controladores de biblioteca, progreso, anotaciones o sesion para que entiendan el nuevo mecanismo.

## Contrato obligatorio

La nueva implementacion debe satisfacer la interfaz `LegacySessionResolver`.

```php
interface LegacySessionResolver
{
    public function resolve(): SessionContext;
    public function rememberReturnTo(string $returnTo): bool;
    public function csrfToken(): string;
    public function validateCsrfToken(string $token): bool;
    public function allowAction(string $bucket, int $limit, int $windowSeconds): bool;
}
```

El metodo importante para identidad es `resolve()`. Puede usar el mecanismo seguro que Legacy decida: nueva cookie, token opaco, sesion almacenada en base de datos, Redis u otro proveedor. Su resultado debe ser siempre un `SessionContext`, nunca una estructura Legacy sin filtrar.

### Resultado de `resolve()`

| Situacion | Resultado requerido |
| --- | --- |
| Sin sesion, sesion vencida, token invalido o usuario revocado | `SessionContext::anonymous()` |
| Usuario autenticado | `SessionContext::authenticated(...)` con ID positivo, nombre visible, avatar opcional y capacidades derivadas |

La capacidad que actualmente requiere la API es `premium`. Si Legacy cambia como calcula suscripciones, debe seguir entregando un booleano derivado para esa capacidad; no debe devolver los campos internos de facturacion o suscripcion.

No exponer en `SessionContext` ni en respuestas JSON:

- cookies o IDs de sesion;
- access tokens, refresh tokens, hashes o secretos;
- nombres de tablas o variables `$_SESSION`;
- email, IP, estado crudo `valid`, fechas de renovacion o datos de pago, salvo un cambio especifico que lo autorice.

## Comportamiento publico que se debe preservar

El cambio de sesiones no debe cambiar estas respuestas de la API.

| Operacion | Sin sesion valida | Con sesion valida |
| --- | --- | --- |
| `GET /api/v1/public/session` | `200`, `authenticated:false`, `user:null`, `premium:false`, sin CSRF | `200`, perfil minimo, capacidad `premium` y token CSRF |
| `GET /api/v1/public/library` | `401 unauthenticated` | biblioteca del ID autenticado |
| `GET/POST /api/v1/public/reader-progress/{uri}` | `401 unauthenticated` | lectura o escritura del progreso propio |
| anotaciones y marcadores | `401 unauthenticated` | datos exclusivamente del usuario autenticado |
| escrituras autenticadas | no corresponde | CSRF invalido u origen invalido: `403 forbidden`; exceso: `429 rate_limited` |

Los mensajes no deben revelar si una cookie concreta existe, por que fallo un token, que tabla se consulto ni datos de otra cuenta.

## Reglas para el nuevo sistema seguro

El diseno del nuevo sistema Legacy es responsabilidad de su equipo, pero debe cumplir como minimo:

1. Validar autenticacion, expiracion, revocacion y estado de usuario antes de crear un contexto autenticado.
2. Regenerar o rotar la sesion cuando corresponda, especialmente despues del login o de una restauracion de identidad.
3. Usar cookies `Secure`, `HttpOnly`, `SameSite=Lax` o una politica mas restrictiva compatible, y `Path=/` si la API vive en el mismo host.
4. Mantener el flujo same-origin entre `/app/`, `/api/v1/` y Legacy. Si se cambian host o dominio, se requiere un diseno de transferencia de sesion separado; no se pueden compartir cookies entre `.net` y `.com`.
5. Mantener CSRF ligado a la sesion para escrituras basadas en cookies. El token debe ser impredecible y validarse con comparacion segura.
6. No registrar tokens, cookies, contrasenas ni el contexto completo de la sesion.
7. Conservar la validacion de retorno: `rememberReturnTo()` solo acepta rutas relativas bajo `/app`.

## Plan de migracion recomendado

1. Implementar y probar el nuevo sistema de sesiones en Legacy sin cambiar aun el adaptador activo de la API.
2. Crear una nueva clase, por ejemplo `SecureLegacySessionResolver`, que implemente `LegacySessionResolver` y traduzca el nuevo mecanismo a `SessionContext`.
3. Probar esa clase con un usuario autenticado, uno anonimo, token invalido, sesion vencida, usuario revocado y usuario sin premium.
4. Cambiar en `api/v1/src/bootstrap.php` solo la instanciacion del adaptador:

   ```php
   'sessionService' => new SessionService(new SecureLegacySessionResolver(/* dependencias */)),
   ```

5. Ejecutar las pruebas de contrato de la API y las comprobaciones HTTP same-origin descritas abajo.
6. Desplegar primero en un entorno no productivo con datos y cookies de prueba.
7. Supervisar `GET /session`, biblioteca, progreso y anotaciones antes de habilitar el nuevo sistema a todos los usuarios.

## Validacion antes de produccion

Ejecutar en un entorno same-origin con navegadores/cuentas de prueba:

- usuario anonimo: `/session` responde `200` y no entrega token CSRF;
- usuario autenticado: `/session` responde perfil minimo, `premium` correcto y token CSRF;
- cookie o token invalido/vencido/revocado: se comporta como anonimo, sin detalles internos;
- biblioteca, progreso y anotaciones anonimos: `401 unauthenticated`;
- escritura con CSRF incorrecto u origen incorrecto: `403 forbidden`;
- escritura valida: afecta solo al usuario autenticado;
- login y logout: no queda una sesion anterior reutilizable;
- retorno a `/app/...`: funciona; una URL externa o fuera de `/app` se rechaza.

Tambien ejecutar localmente:

```powershell
php api/v1/tests/SessionBoundaryContractTest.php
php api/v1/tests/ReaderProgressContractTest.php
php api/v1/tests/AnnotationsContractTest.php
openspec validate legacy-session-boundary --strict
```

## Rollback

Mantener disponible el adaptador anterior `LegacyPhpSessionResolver` hasta que la validacion en produccion este cerrada. Si el nuevo mecanismo deja usuarios anonimos por error o altera respuestas de la API, restaurar en `bootstrap.php` el adaptador anterior y desplegar; no modificar controladores ni datos de usuarios como medida de rollback.

## Responsabilidades

- Equipo Legacy: implementa el mecanismo seguro y el adaptador compatible, prueba login/logout/restauracion y no filtra secretos.
- Equipo PlanetaLibroApp: mantiene estable `SessionContext`, los contratos HTTP y las pruebas de consumidores.
- Revision de seguridad: aprueba la politica de cookies, expiracion, rotacion, revocacion, CSRF, registros y el plan de despliegue antes de produccion.
