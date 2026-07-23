## Why

La pantalla “Mi Biblioteca” debe representar el estado real de cada lectura y permitir que el usuario retome, encuentre y administre sus libros sin controles aparentes o clasificaciones basadas en la posición del resultado. La experiencia actual conserva acciones útiles de lectura y audio, pero necesita un contrato de estados, cantidades, progreso y navegación verificable, especialmente en móvil.

## What Changes

- Organizar la biblioteca en las secciones funcionales **Continuar**, **Por leer**, **Terminados** y **Todos**, con **Abandonados** como filtro secundario.
- Conservar las acciones explícitas **Leer** y **Escuchar**, la diferenciación entre ebook, audiolibro y contenido mixto, y el contexto de autor, progreso y disponibilidad de audio.
- Definir estados de biblioteca derivados de datos reales y mutuamente coherentes; ningún libro se clasificará por su posición en la respuesta.
- Mostrar cantidades reales y ofrecer una acción funcional **Ver todo** para cada sección resumida.
- Presentar carruseles horizontales de portadas en los resúmenes móviles y listas verticales compactas y responsive en todas las vistas “Ver todo”, también en escritorio.
- Mantener las acciones secundarias en el menú contextual de cada libro.
- Mantener la incorporación y el descubrimiento de libros en **Buscar**; “Mi Biblioteca” no mostrará controles “Nuevo libro” ni “Añadir libro”.
- Eliminar o no mostrar pestañas, enlaces, cantidades y botones que no tengan comportamiento real.
- Corregir los textos visibles con problemas de codificación relacionados con esta pantalla.
- Incluir estados explícitos de carga, vacío, error recuperable y éxito.
- No incluye en este cambio descargas offline, un reproductor persistente, cambios de URLs públicas, cambios en PlanetaLibro legacy ni decisiones sobre límites de suscripción.
- La experiencia bajo `/app/library` seguirá requiriendo una sesión autenticada y conservará la navegación existente hacia lector, reproductor y detalle.
- El cambio no modifica contenido indexable público ni URLs SEO. El impacto SEO/GEO esperado es neutro porque la biblioteca es una superficie autenticada; se deberá comprobar que no cambien rutas públicas, metadatos ni respuestas indexables.

## Capabilities

### New Capabilities

- `personal-library-lifecycle`: Clasificación real de la biblioteca personal, resúmenes por estado y vistas completas en lista vertical, con progreso verificable, acciones de lectura/audio y comportamiento responsive accesible.

### Modified Capabilities

Ninguna.

## Impact

- Frontend: `src/pages/PersonalLibraryPage.tsx`, componentes reutilizables de biblioteca, navegación móvil en `src/layout/AppShell.tsx`, lógica de dominio bajo `src/features/library/` y contratos tipados en `src/api/`.
- API: el contrato autenticado de biblioteca deberá exponer datos suficientes para clasificar, contar, ordenar y paginar sin duplicar reglas críticas en el frontend.
- Datos: se deberán investigar los usos reales de `user_books` y columnas relacionadas antes de definir cómo se representan “por leer”, “terminado” y “abandonado”; cualquier dato no comprobado permanecerá `NO CONFIRMADO`.
- Compatibilidad: se preservan `/app/library`, las URIs canónicas de libros, las rutas actuales de lectura, audio y detalle, y el límite entre React, API PHP y PlanetaLibro legacy.
- Validación: requerirá pruebas del contrato de clasificación y navegación, compilación TypeScript/Vite, validación móvil y escritorio, accesibilidad por teclado y `openspec validate library-reading-lifecycle --strict`.
