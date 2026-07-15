# Plan incremental futuro

En todas las fases: no tocar tablas ni credenciales sin cambio separado; rollback por despliegue del artefacto anterior; tests con fixtures, nunca cuentas reales.

## Fase 1: consulta de sesión

Objetivo: `GET /session` anónimo/autenticado, no-store. Probables archivos: router, nuevo controlador/servicio/repositorio y tests bajo `api/v1`; no tocar login ni React. Pruebas: cookie ausente, sesión válida, token inválido, headers, SQL parametrizado. Rollback: retirar ruta/clases. Riesgo: flags/cookie PHP. Aceptación: identidad mínima correcta sin secretos.

## Fase 2: estado en React

Objetivo: provider/hook de sesión consumiendo la API. Probables: `src/api`, contexto y shell; no tocar legacy/BD. Pruebas: loading/anónimo/auth/error/logout visual. Rollback: feature flag. Riesgo: caché/flash de usuario. Aceptación: no persiste datos sensibles y revalida servidor.

## Fase 3: redirect legacy y retorno

Objetivo: CTA a login con retorno seguro `/app/...`. Probables: adapter pequeño de retorno en login y frontend; no tocar hashing/tablas. Pruebas: paths válidos, externos, `//evil`, encoding doble, expiración/nonce. Rollback: retorno fijo `/app/`. Riesgo: open redirect. Aceptación: ningún destino externo.

## Fase 4: logout global

Objetivo: POST CSRF que revoque token y sesión para legacy/app. Probables: servicio auth/API y adaptación mínima de logout legacy; no tocar otros dominios sin diseño. Pruebas: sesión/token/solo cookie/idempotencia/CSRF. Rollback: enlace legacy existente. Riesgo: sesión residual. Aceptación: `/session` anónimo inmediatamente.

## Fase 5: biblioteca y progreso

Objetivo: endpoints ownership-safe usando `userid` server-side. Probables: repositorios/controladores de biblioteca/lectura; no reutilizar `user_books_delete.php`. Pruebas: propiedad, idempotencia, concurrencia, límites, Premium. Rollback: UI read-only/enlaces legacy. Riesgo: corrupción/CSRF. Aceptación: no acepta user_id del cliente.

## Fase 6: endurecimiento

Objetivo: token hasheado/rotatorio/expirable, CSRF, rate limits, recovery seguro, no-cache y secretos en entorno. Requiere cambio y migración propios; no mezclar con features. Pruebas de downgrade/rotación/replay/expiry. Rollback compatible con ventana dual limitada. Riesgo: cerrar sesiones existentes. Aceptación: checklist de `07_SECURITY_RISKS.md` resuelto.

## Fase 7: capa compartida

Objetivo: migrar login/restauración/logout/recovery/OAuth a servicios PHP comunes. Probables: paquete `Identity` y adapters legacy/API; no reescribir UI simultáneamente. Pruebas de paridad y canary por función. Rollback por adapter antiguo. Riesgo: divergencia temporal PDO/mysqli. Aceptación: una única implementación para credenciales, sesión y entitlements.

