## Why

La API de PlanetaLibroApp necesita consumir la identidad y el estado de sesión sin quedar acoplada al mecanismo histórico con que PlanetaLibro legacy los administra. Esta frontera permite mejorar Legacy más adelante sin propagar cambios de sesión a los consumidores de la API.

## What Changes

- Definir un contrato de integración de sesión entre la API de PlanetaLibroApp y Legacy.
- Exigir que la API consulte una única función o adaptador de Legacy para obtener el contexto de sesión necesario.
- Prohibir que controladores, repositorios o clientes de la API dependan de cookies, variables de sesión, tablas, nombres internos o reglas de ciclo de vida de Legacy.
- Establecer respuestas explícitas y seguras para sesión ausente, inválida o no autorizada, sin revelar detalles internos.
- Mantener fuera de alcance la modificación del mecanismo de sesiones de Legacy y la definición de nuevos privilegios o suscripciones.

## Capabilities

### New Capabilities

- `legacy-session-contract`: frontera estable que encapsula la resolución de sesión de Legacy para la API de PlanetaLibroApp.

### Modified Capabilities

- Ninguna; no existen specs principales archivadas afectadas.

## Impact

- API PHP: punto de integración de autenticación/autorización y consumidores que necesitan contexto de usuario.
- Legacy: expone o adapta una función de lectura del contexto de sesión, sin requerir cambiar su implementación actual.
- Seguridad: evita duplicar o filtrar detalles de cookies, sesiones, tokens, permisos y datos personales.
- Compatibilidad: no cambia rutas públicas, contratos actuales ni el comportamiento de sesiones de Legacy durante esta etapa.
- SEO/GEO: sin impacto previsto; no modifica URLs, HTML indexable, metadata ni contenido público.
