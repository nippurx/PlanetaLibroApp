# Riesgos y Deuda Tecnica

## Criterio

Este documento resume riesgos detectados en la documentacion ya producida:

- estructura: `docs/db_audit/10_DB_CATALOG.md:1-1854`
- queries reales: `docs/db_audit/20_QUERIES_INDEX.md:1-19`
- uso por tabla: `docs/db_audit/21_TABLE_USAGE.md:5-429`
- features: `docs/db_audit/22_FEATURES_MAP.md:9-243`
- conexiones: `docs/db_audit/02_DB_CONNECTION.md:3-260`

## Criticos

### Integridad referencial debil

- Hallazgo: solo **2 tablas** del catalogo tienen FKs explicitas (`docs/db_audit/10_DB_CATALOG.md:1854`).
- Impacto: alto riesgo de orfandad, inconsistencias entre IDs/URIs y dificultad para migrar a servicios/API sin capa adicional de validacion.

### SQL distribuido y mayormente dinamico

- Hallazgo: el indice documenta **1368 queries** extraidas del codebase (`docs/db_audit/20_QUERIES_INDEX.md:3`).
- Hallazgo asociado: el stack legacy usa `mpdb_query()` y `mpdb_get_value()` sobre SQL concatenado (`docs/db_audit/02_DB_CONNECTION.md:51-76`).
- Impacto: cambios de esquema y refactors son caros; aumenta riesgo de regresion y de criterios inconsistentes entre archivos.

### Mezcla de stacks de acceso a datos

- Hallazgo: conviven `mysqli` helper-based y `PDO` en auth/APIs/subapps (`docs/db_audit/02_DB_CONNECTION.md:87-145`).
- Impacto: contratos de error, transacciones, escaping y testing quedan fragmentados.
- Señal operativa: el core usa `mysqli/helper`, mientras auth usa `PDO` y varios subsistemas quedan `NO_CONFIRMADO` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:5-17`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:68-73`).

### `google-callback.php` con disponibilidad de conexion no confirmada

- Hallazgo: el origen real de `$connection` es `login_dbconfig.php`, pero `google-callback.php` no lo incluye (`docs/db_audit/02_DB_CONNECTION.md:200-236`).
- Estado documentado: disponibilidad real **NO CONFIRMADA / probablemente ausente por include faltante** (`docs/db_audit/02_DB_CONNECTION.md:219-236`).
- Impacto: riesgo de fallo runtime en el flujo OAuth.

## Altos

### `user_table` concentra demasiadas responsabilidades

- Hallazgo: `user_table` soporta auth, sesion, premium, mailing y perfil (`docs/db_audit/21_TABLE_USAGE.md:381-388`, `docs/db_audit/22_FEATURES_MAP.md:9-62`, `docs/db_audit/22_FEATURES_MAP.md:146-163`).
- Impacto: cambios en identidad pueden romper features no obvias; dificulta separar bounded contexts.

### Identificadores heterogeneos

- Hallazgo: las relaciones funcionales alternan `userid`, `user_id`, `id`, `ebooks_books_id`, `book_id`, `uri`, `libro_uri`, `libro` (`docs/db_audit/21_TABLE_USAGE.md:85-92`, `docs/db_audit/21_TABLE_USAGE.md:349-388`, `docs/db_audit/21_TABLE_USAGE.md:421-436`).
- Impacto: complica DTOs, contratos de API, joins y migraciones.

### Relaciones por `uri` o `email` en lugar de claves numericas

- Hallazgo: varios vinculos centrales son por `uri` (`libros_pedidos`, `videos_book`, `videos_sugeridos`) o por `email` (`mailing_users` con `user_table`).
- Sustento: `docs/db_audit/30_LOGICAL_MODEL.md`
- Impacto: mayor acoplamiento a campos mutables o semanticos; mas fragilidad ante cambios de naming.

### Logica de negocio en helpers grandes

- Hallazgo: `user_funcs.php`, `libro_funcs.php`, `c_libro.php` y `mp_mailing.php` son nodos centrales con muchas queries (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:5-10`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:26-31`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:68-87`).
- Impacto: alto costo cognitivo, testing dificil y baja encapsulacion.

## Medios

### Tablas estructurales sin uso real detectado

- Hallazgo: varias tablas del catalogo no tienen uso detectado, por ejemplo `favorites`, `avatars`, `ebooks_packs`, `mp_config` (`docs/db_audit/21_TABLE_USAGE.md:13-28`, `docs/db_audit/21_TABLE_USAGE.md:197-204`).
- Impacto: deuda de esquema, ruido operacional y dudas durante refactor.

### Subsistemas laterales comparten repo pero no el mismo nivel de certeza

- Hallazgo: `blog/` y `userbase/` aparecen con muchas queries y varias conexiones `NO_CONFIRMADO` (`docs/db_audit/23_FILE_TO_TABLE_MAP.md:12-24`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:33-45`, `docs/db_audit/23_FILE_TO_TABLE_MAP.md:61-66`).
- Impacto: riesgo de mezclar alcance del core con subsistemas legacy de otro modelo.

### Fallback de conexion inconsistente

- Hallazgo: `mp_db_connect()` arma un espejo, pero la reconexion posterior vuelve a usar `$dbconfig[...]`; uso efectivo del espejo queda **NO CONFIRMADO** (`docs/db_audit/02_DB_CONNECTION.md:39-47`).
- Impacto: estrategia de contingencia poco confiable.

## Deuda tecnica priorizada

### Prioridad 1

1. Definir modelo canonico de identificadores: `user_id`, `book_id`, `author_id`, `tag_id`.
2. Crear capa unica de acceso a datos para el core.
3. Formalizar relaciones criticas con constraints o validaciones de aplicacion.
4. Resolver `google-callback.php` en el stack de auth.

### Prioridad 2

1. Separar bounded contexts del core frente a `blog/` y `userbase/`.
2. Reducir queries directas en helpers monoliticos.
3. Documentar tablas estructurales sin uso y decidir retiro o preservacion.

### Prioridad 3

1. Homologar nombres de columnas y recursos para futura API.
2. Mover telemetria y growth (`ab_events`, `failed_searches`, `mailing`) a servicios/layers propios.

## Recomendacion de mitigacion para iniciar una API

No conviene exponer la base legacy "tal cual". Conviene interponer una capa de dominio que:

- traduzca IDs y nombres inconsistentes
- encapsule joins inferidos
- proteja writes sobre `user_table`, `user_books`, `ebooks_books` y `mailing_users`
- trate `blog/` y `userbase/` como sistemas adyacentes, no como parte del primer corte del core
