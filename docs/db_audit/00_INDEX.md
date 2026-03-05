# DB Audit - Fase 0

Estado: **Fase 3 completada**

## Alcance de esta fase

Esta fase solo prepara el relevamiento DB+PHP. El codigo y el dump revisados estan en:

- Codigo PHP: raiz del proyecto `planetalibro` y subcarpetas observadas en el arbol del repo (`index.php:13-30`, `autor.php:12-22`, `leerlibro.php:32-46`)
- Dump SQL de estructura: `docs/c2380538_main_stru.sql:1-31`

## Checklist de fases

- [x] **Fase 0 - Preparacion**
  - routing y entrypoints ubicados
  - conexion DB y helpers centrales ubicados
  - mapa inicial de modulos/carpetas armado
  - formato estricto del informe final definido
- [x] **Fase 1 - Relevamiento de tablas**
- [x] **Fase 2 - Relevamiento de features/queries**
- [x] **Fase 3 - Consolidacion final**

## Documentos de esta fase

- [01_ENTRYPOINTS.md](./01_ENTRYPOINTS.md)
- [02_DB_CONNECTION.md](./02_DB_CONNECTION.md)
- [03_MODULE_MAP.md](./03_MODULE_MAP.md)
- [04_OUTPUT_FORMAT.md](./04_OUTPUT_FORMAT.md)
- [10_DB_CATALOG.md](./10_DB_CATALOG.md)
- [20_QUERIES_INDEX.md](./20_QUERIES_INDEX.md)
- [21_TABLE_USAGE.md](./21_TABLE_USAGE.md)
- [22_FEATURES_MAP.md](./22_FEATURES_MAP.md)
- [23_FILE_TO_TABLE_MAP.md](./23_FILE_TO_TABLE_MAP.md)
- [PLANETALIBRO_DB_SYSTEM_REPORT.md](./PLANETALIBRO_DB_SYSTEM_REPORT.md)
- [30_LOGICAL_MODEL.md](./30_LOGICAL_MODEL.md)
- [31_RISKS_AND_DEBT.md](./31_RISKS_AND_DEBT.md)
- [32_API_READINESS_MAP.md](./32_API_READINESS_MAP.md)

## Modulos / areas detectadas

- **Home / catalogo**: `index.php`, `libro.php`, `autor.php`, `autores.php`, `buscar.php` (`index.php:13-30`, `libro.php:25-50`, `autor.php:12-22`, `autores.php:24-31`, `buscar.php:10-20`)
- **Lectura online**: `leerlibro.php`, carpeta `lector/`, carpeta `biblioteca/` (`leerlibro.php:1-18`, `leerlibro.php:32-46`)
- **Descargas**: `descargar.php`, `download.php`, `getfile.php` (`descargar.php:13-30`, `getfile.php:14-22`)
- **Auth / usuarios**: `login.php`, `login_register.php`, `google-callback.php`, `user_funcs.php` (`login.php:2-7`, `login_register.php:22-24`, `google-callback.php:2-3`)
- **Admin / backoffice**: `adm/`, `backend/`, `srvapi/` (`adm/.htaccess:1-5`, `backend/addreviews.php:1`, `srvapi/planetalibroadm.php:1`)
- **APIs**: `api/`, `xapi/v1/`, `chatgpt_desa/` (`api/v1/gptsearch.php:14-24`, `xapi/v1/index.php:2-21`, `chatgpt_desa/.htaccess:1-19`)
- **Blog / WordPress**: `blog/` (`blog/index.php:1-4`)
- **Assets / includes / librerias**: `assets/`, `inc/`, `lib/` (`bootstrap.php:122`, `lib/phpqrcode/qrlib.php:1`, `assets/js/main.js:1`)

## Observaciones de preparacion

- La configuracion principal de MySQL esta centralizada en `dbconf.php:26-31`.
- El helper principal de conexion/queries del sitio legacy esta en `mp_dbfuncs.php:68-135` y `mp_dbfuncs.php:272-299`.
- Ademas del stack principal con `mysqli`, hay rutas separadas con `PDO` en `login_dbconfig.php:27-31`, `chatgpt_desa/chatgpt_funcs.php:55-74` y `xapi/v1/utils.php:4-15`.
- El caso `google-callback.php` quedo documentado como resuelto en `docs/db_audit/02_DB_CONNECTION.md:200-236`.
