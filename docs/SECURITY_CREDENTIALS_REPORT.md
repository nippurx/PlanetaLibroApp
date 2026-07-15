# Informe inicial de credenciales y archivos sensibles

- **Fecha:** 2026-07-15
- **Alcance:** `PlanetaLibroApp` y revisión en modo lectura de `D:\Desarrollo\MPWebs\www\planetalibro`
- **Tratamiento:** este informe no reproduce valores, tokens, claves ni contraseñas.

## Resultado ejecutivo

La búsqueda automatizada encontró indicadores de credenciales embebidas y múltiples archivos versionados cuyo nombre o función implica material sensible en el repositorio legacy. Deben tratarse como exposición potencial hasta revisar cada caso de forma controlada. No se modificó ni rotó ninguna credencial.

En `PlanetaLibroApp`, `.env.local` está ignorado y la variable detectada es `VITE_API_BASE`; no se copió su valor. La documentación de auditoría menciona conexiones/consultas, por lo que debe mantenerse libre de valores reales.

## Prioridad crítica: revisar y rotar si contienen valores activos

- `D:\Desarrollo\MPWebs\www\planetalibro\dbconf.php`
- `D:\Desarrollo\MPWebs\www\planetalibro\dbconf - planetalibro.com.php`
- `D:\Desarrollo\MPWebs\www\planetalibro\wp-config.php`
- `D:\Desarrollo\MPWebs\www\planetalibro\login_dbconfig.php`
- `D:\Desarrollo\MPWebs\www\planetalibro\planetalibro-280021-67afe73460ac.json`
- `D:\Desarrollo\MPWebs\www\planetalibro\api\v1\config\config.php` y copias `api/v1 - bak1/`, `api/v1 - bak2/`
- `D:\Desarrollo\MPWebs\www\planetalibro\xapi\v1\config.php`
- `D:\Desarrollo\MPWebs\www\planetalibro\amazon_config.php`
- `D:\Desarrollo\MPWebs\www\planetalibro\google-callback.php`

## Indicadores de secretos o tokens en código y utilidades

La detección por patrones señaló, entre otros:

- `chatgpt_desa/` y sus scripts de prueba/integración;
- `old_chatgpt_funcs.php`;
- `mp_youtube_funcs.php`;
- `mp_searchbooklink.php` y su test;
- `srvapi/planetalibroadm*.php`;
- `restore/mpdump.php` y el dump `restore/ebook_data_planetal_main.sql`;
- scripts bajo `test/chatgpt/`, `test/testjson.php` y `test/testmail.php`;
- `planetalibro.net-local.php`.

Los bundles JavaScript y librerías de terceros también produjeron coincidencias y pueden ser falsos positivos; no deben priorizarse sobre archivos de configuración y código propio.

## Acciones recomendadas

1. Inventariar qué credenciales siguen activas, quién las usa y su nivel de privilegio, sin copiarlas a tickets ni documentación.
2. Rotar primero base de datos, cuentas de servicio, OAuth, APIs de IA, correo y proveedores de pago que estén versionadas.
3. Mover configuración a variables de entorno o archivos locales fuera de Git; mantener solo plantillas sin valores (`.env.example`).
4. Reducir privilegios y separar credenciales por entorno y servicio.
5. Tras rotar, retirar secretos del historial Git con un procedimiento coordinado; reescribir historial sin coordinación puede afectar clones y despliegues.
6. Añadir escaneo de secretos en pre-commit y CI, con allowlist explícita para falsos positivos.
7. Revisar y restringir dumps, backups, logs y scripts de prueba accesibles desde el document root.
8. Verificar que cualquier clave privada o JSON de cuenta de servicio haya sido revocada y reemplazada, no solo eliminada del archivo actual.

## Limitaciones

La búsqueda fue estática y deliberadamente evitó exponer valores. No confirma por sí sola si cada credencial es válida, si está publicada por el servidor web o si ya fue revocada. Esa comprobación requiere una auditoría de seguridad separada y autorizada.

