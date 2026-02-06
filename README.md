# PlanetaLibro App (/app) — Documentación Técnica

Este documento describe la arquitectura actual de **PlanetaLibro** y define con precisión
qué debe implementar un desarrollador para crear una **app web moderna (tipo Headway)**
sin romper el sitio existente.

---

## 1. Objetivo del proyecto

Crear una **aplicación web moderna, mobile-first (PWA)** montada en:

```

[https://planetalibro.net/app](https://planetalibro.net/app)

```

La app debe permitir:

- Descubrir libros (feed, recomendaciones)
- Buscar y filtrar
- Ver ficha de libro
- Guardar libros / progreso
- Enlazar a la lectura real del libro

⚠️ **La app NO reemplaza el sitio actual**, es una **capa adicional de navegación y experiencia**.

---

## 2. Qué YA existe (y NO se debe modificar)

### 2.1 Base de datos
- MySQL existente
- Contiene metadata de libros (título, autor, slugs, etc.)

⚠️ React **NO accede directo a MySQL**  
Debe hacerse vía **API en PHP** que devuelva JSON.

---

### 2.2 Estructura real de archivos (libros)

Cada libro tiene **dos árboles de carpetas distintos**:

---

## 3. Árbol A: Biblioteca (tapas, PDF, EPUB, etc.)

### Ejemplo
Libro: *Romeo y Julieta*  
Autor: William Shakespeare  

**URIs normalizadas**
- `libro_uri`: `shakespeare-william-romeo-y-julieta`
- `autor_uri`: `shakespeare-william`

### Web
```

[https://planetalibro.net/biblioteca/s/h/shakespeare/shakespeare-william-romeo-y-julieta/](https://planetalibro.net/biblioteca/s/h/shakespeare/shakespeare-william-romeo-y-julieta/)

```

### Local
```

/public_html/biblioteca/s/h/shakespeare/shakespeare-william-romeo-y-julieta/

```

### Contenido típico
```

shakespeare-william-romeo-y-julieta.pdf
shakespeare-william-romeo-y-julieta.epub
shakespeare-william-romeo-y-julieta.jpg
shakespeare-william-romeo-y-julieta.webp
shakespeare-william-romeo-y-julieta_th20.webp
shakespeare-william-romeo-y-julieta_th200.webp

```

📌 **Regla clave**  
Todos los archivos usan como nombre base el `libro_uri`.

---

## 4. Árbol B: Lector (páginas HTML del libro)

### Local
```

/public_html/lector/s/h/shakespeare/shakespeare-william-romeo-y-julieta/

```

### Contenido
```

images/
libroinfo.php
pag-1.html
pag-2.html
...
pag-n.html

```

### Acceso público (NO directo a pag-X.html)

La lectura se hace vía URL amigable:

```

[https://planetalibro.net/leerlibro/{libro_uri}/{numero_pagina}](https://planetalibro.net/leerlibro/{libro_uri}/{numero_pagina})

```

Ejemplo:
```

[https://planetalibro.net/leerlibro/shakespeare-william-romeo-y-julieta/3](https://planetalibro.net/leerlibro/shakespeare-william-romeo-y-julieta/3)

```

📌 **La app React SIEMPRE debe enlazar usando `/leerlibro/`**

---

## 5. Regla de carpetas por letras (routing)

Las rutas usan un esquema por letras del autor:

```

/biblioteca/{letra1}/{letra2}/{autor_normalizado}/{libro_uri}/
/lector/{letra1}/{letra2}/{autor_normalizado}/{libro_uri}/

```

Ejemplo:
```

s/h/shakespeare/shakespeare-william-romeo-y-julieta

```

⚠️ La app **NO debe inventar rutas**  
Debe recibir o derivar correctamente este `path_prefix`.

---

## 6. Qué debe construir el desarrollador

### 6.1 App frontend (React)

Ubicación:
```

/app

```

Características:
- React (Vite recomendado)
- Mobile-first
- Estilo tipo Headway (feed, tarjetas, progreso)
- SPA estática (NO SSR)
- `base: "/app/"` en build

La app:
- NO renderiza libros
- NO sirve imágenes
- NO maneja SEO
- SOLO consume JSON y enlaza a URLs reales

---

### 6.2 API mínima en PHP

Ubicación sugerida:
```

/api/

```

Ejemplos:
```

/api/libros.php
/api/libro.php?id=XXX
/api/buscar.php?q=texto

````

La API:
- Consulta MySQL
- Devuelve JSON
- NO devuelve HTML

---

## 7. Campos mínimos que debe devolver la API

Por cada libro:

```json
{
  "id": 123,
  "titulo": "Romeo y Julieta",
  "autor": "William Shakespeare",
  "autor_uri": "shakespeare-william",
  "libro_uri": "shakespeare-william-romeo-y-julieta",
  "path_prefix": "s/h/shakespeare",
  "descripcion": "Tragedia clásica...",
  "tags": ["teatro", "clásico", "romance"]
}
````

---

## 8. URLs que debe construir la app

### 8.1 Tapa del libro

Prioridad recomendada:

```
/biblioteca/{path_prefix}/{libro_uri}/{libro_uri}_th200.webp
```

Fallbacks posibles:

* `_th20.webp`
* `.webp`
* `.jpg`

---

### 8.2 Leer libro (siempre vía lector)

Página inicial:

```
/leerlibro/{libro_uri}/1
```

Página guardada:

```
/leerlibro/{libro_uri}/{pagina}
```

---

### 8.3 Descargas (opcional)

```
/biblioteca/{path_prefix}/{libro_uri}/{libro_uri}.pdf
/biblioteca/{path_prefix}/{libro_uri}/{libro_uri}.epub
```

---

## 9. Qué NO debe hacer el desarrollador

❌ Reescribir Planetalibro
❌ Mover archivos existentes
❌ Cambiar URLs históricas
❌ Acceder MySQL desde React
❌ Servir libros desde la app

---

## 10. Resumen mental (importante)

> Planetalibro sigue siendo un **sitio HTML clásico**.
> `/app` es una **app moderna de descubrimiento y hábito**, no un reemplazo.

Si esto se respeta, el proyecto escala sin romper nada.
