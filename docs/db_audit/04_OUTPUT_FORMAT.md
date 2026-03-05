# Formato Estricto del Informe Final (Fases 1-3)

## Regla general

Cada afirmación del informe final deberá incluir al menos una referencia `archivo:línea` o `archivo:rango`. Si no se puede respaldar algo con código/dump, se debe marcar **NO CONFIRMADO**.

## Estructura obligatoria

El informe final deberá tener exactamente estas 4 secciones:

1. **A) Diccionario de tablas**
2. **B) Diccionario por feature**
3. **C) Mapa archivo -> tablas/queries**
4. **D) Diagrama lógico textual**

## A) Diccionario de tablas

### Plantilla estricta por tabla

```md
## Tabla: <table_name>

- Fuente primaria:
  - dump: <archivo.sql:líneas>
  - uso en PHP: <archivo.php:líneas>
- Propósito probable:
  - <1-3 líneas, solo con evidencia o inferencia explícita>
- PK:
  - <campo o NO CONFIRMADO>
- Columnas relevantes:
  - <campo> - <tipo> - <observación>
  - <campo> - <tipo> - <observación>
- Índices / claves:
  - <detalle o NO CONFIRMADO>
- Relaciones detectadas:
  - <tabla_a.campo> -> <tabla_b.campo> (<evidencia>)
- Archivos PHP que la usan:
  - <archivo.php:líneas> - <tipo de operación>
- Queries detectadas:
  - SELECT: <archivo.php:líneas>
  - INSERT: <archivo.php:líneas>
  - UPDATE: <archivo.php:líneas>
  - DELETE: <archivo.php:líneas>
- Observaciones:
  - <riesgo, inconsistencia, o NO CONFIRMADO>
```

### Ejemplo corto

```md
## Tabla: books

- Fuente primaria:
  - dump: docs/schema.sql:120-160
  - uso en PHP: libro.php:40-75
- Propósito probable:
  - catálogo principal de libros
- PK:
  - books_id
- Columnas relevantes:
  - books_id - int - identificador
  - title - varchar - título visible
  - author_id - int - referencia a authors
- Índices / claves:
  - PRIMARY KEY (books_id)
- Relaciones detectadas:
  - books.author_id -> authors.author_id
- Archivos PHP que la usan:
  - libro.php:40-75 - SELECT
  - c_libro.php:10-35 - INSERT
- Queries detectadas:
  - SELECT: libro.php:40-75
  - INSERT: c_libro.php:10-35
- Observaciones:
  - NO CONFIRMADO si existe foreign key física
```

## B) Diccionario por feature

### Plantilla estricta por feature

```md
## Feature: <nombre_feature>

- Objetivo funcional:
  - <qué hace>
- Entrypoints:
  - <archivo.php:líneas>
- Tablas involucradas:
  - <tabla> (<tipo de uso>)
- Flujo resumido:
  1. <paso con evidencia>
  2. <paso con evidencia>
  3. <paso con evidencia>
- Helpers / servicios usados:
  - <helper o include>
- Riesgos / dudas:
  - <NO CONFIRMADO si aplica>
```

### Ejemplo corto

```md
## Feature: Login

- Objetivo funcional:
  - autenticar usuarios por email y password
- Entrypoints:
  - login.php:24-90
- Tablas involucradas:
  - users (SELECT)
  - users (UPDATE remember_token)
- Flujo resumido:
  1. recibe email/password
  2. busca usuario por email
  3. valida password y actualiza token persistente
- Helpers / servicios usados:
  - login_dbconfig.php
- Riesgos / dudas:
  - NO CONFIRMADO si existe auditoría de login
```

## C) Mapa archivo -> tablas/queries

### Plantilla estricta por archivo

```md
## Archivo: <archivo.php>

- Rol:
  - <entrypoint/helper/model/template>
- Includes clave:
  - <archivo:líneas>
- Tablas tocadas:
  - <tabla> - <SELECT|INSERT|UPDATE|DELETE>
- Queries detectadas:
  - <tipo> - <fragmento resumido> - <líneas>
- Dependencias:
  - <helpers o globals>
- Observaciones:
  - <por ejemplo SQL dinámico, prepared statements, NO CONFIRMADO>
```

### Ejemplo corto

```md
## Archivo: books.php

- Rol:
  - entrypoint de listado de libros
- Includes clave:
  - db.php:1-20
  - book_helpers.php:1-80
- Tablas tocadas:
  - books - SELECT
  - authors - SELECT
- Queries detectadas:
  - SELECT - lista de libros por autor - books.php:30-55
- Dependencias:
  - $db
- Observaciones:
  - arma SQL dinámico con filtros opcionales
```

## D) Diagrama lógico textual

### Plantilla estricta

```md
## Relaciones lógicas detectadas

- <tabla_a>.<campo> -> <tabla_b>.<campo>
  - Evidencia en dump: <archivo.sql:líneas>
  - Evidencia en código: <archivo.php:líneas>
  - Tipo:
    - <FK física | join implícito | inferencia>

## Flujos principales

- <Feature 1>:
  - <tabla_a> -> <tabla_b> -> <tabla_c>
- <Feature 2>:
  - <tabla_x> -> <tabla_y>
```

### Ejemplo corto

```md
## Relaciones lógicas detectadas

- books.author_id -> authors.author_id
  - Evidencia en dump: docs/schema.sql:120-160
  - Evidencia en código: libro.php:40-60
  - Tipo:
    - join implícito

- downloads.book_id -> books.book_id
  - Evidencia en dump: docs/schema.sql:300-340
  - Evidencia en código: download.php:20-45
  - Tipo:
    - inferencia

## Flujos principales

- Catálogo:
  - authors -> books
- Descargas:
  - users -> downloads -> books
```

## Convenciones de redacción obligatorias

- No resumir una tabla sin citar al menos el dump o una query real.
- Separar siempre evidencia directa de inferencia.
- Marcar como **NO CONFIRMADO** cualquier relación, índice o uso no verificable.
- Si un archivo usa SQL dinámico por concatenación, indicarlo explícitamente.
- Si un archivo usa `prepare()/bind*()`, indicarlo explícitamente.
