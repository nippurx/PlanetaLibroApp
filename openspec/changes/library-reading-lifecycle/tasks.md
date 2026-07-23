## 1. Investigación y decisiones de dominio

- [x] 1.1 Auditar en esquema, `docs/db_audit/`, queries y código legacy de solo lectura los usos reales de `user_books`, `user_books_log` y cualquier dato relacionado con incorporación, primera/última lectura, finalización y abandono.
- [x] 1.2 Documentar en `design.md` la fuente canónica y las reglas mutuamente excluyentes para `unread`, `in_progress`, `completed` y `abandoned`, resolviendo los `NO CONFIRMADO` con evidencia o decisión del propietario.
- [x] 1.3 Verificar si existe un total de páginas confiable para todo el catálogo y documentar cuándo puede exponerse porcentaje y cuándo debe mostrarse solo página o posición.
- [x] 1.4 Definir el contrato API aditivo para resumen, cantidades, listado filtrado, búsqueda, criterios de ordenamiento y paginación, incluyendo autorización, errores y límites.
- [x] 1.5 Confirmar que la clasificación se deriva de datos existentes y que no se requieren tablas, campos ni migraciones nuevas.

## 2. Contrato y backend de biblioteca

- [x] 2.1 Implementar en el repositorio PHP la clasificación canónica y el orden de cada estado sin depender de la posición del resultado.
- [ ] 2.2 Implementar consultas acotadas para los resúmenes Continuar, Por leer y Terminados con cantidades totales calculadas por las mismas reglas que los listados.
- [x] 2.3 Implementar los listados completos con filtros de estado, búsqueda por título/autor, ordenamiento estable aplicado antes de paginar y límites del servidor.
- [x] 2.4 Exponer progreso de lectura y audio por separado y omitir el porcentaje cuando no exista un denominador confiable.
- [x] 2.5 Ampliar controladores y respuestas JSON de forma compatible, validando filtros, búsqueda, límites, cursores o páginas y la sesión autenticada.
- [ ] 2.6 Añadir pruebas PHP del contrato para clasificación exclusiva, orden predeterminado e inverso, cantidades, filtros, búsqueda, paginación, progreso y aislamiento entre usuarios.
- [x] 2.7 Comprobar mediante tests que los campos y consumidores actuales de `/api/v1/public/library` siguen siendo compatibles o documentar y aprobar una transición explícita.

## 3. Modelo y acceso a datos del frontend

- [x] 3.1 Añadir tipos TypeScript para estado canónico, cantidades, progreso opcional y metadatos de paginación sin duplicar reglas de negocio del backend.
- [x] 3.2 Implementar servicios tipados para cargar el resumen y los listados completos filtrados y buscables mediante el cliente API central.
- [x] 3.3 Sustituir los cortes posicionales de libros por un modelo de vista basado exclusivamente en las colecciones y cantidades del contrato.
- [x] 3.4 Definir URLs o estado de navegación restaurable para Todos, Ver todo, filtros, búsqueda, ordenamiento y paginación.
- [x] 3.5 Añadir pruebas de la lógica pura de navegación y presentación, incluyendo ausencia de porcentaje inventado y conservación de filtros y orden durante búsqueda, recarga y retorno.

## 4. Componentes y experiencia de Biblioteca

- [x] 4.1 Crear o adaptar una tarjeta de resumen reutilizable que muestre portada, título, autor, tipo de medio y progreso honesto.
- [x] 4.2 Crear una fila reutilizable para las vistas completas con portada, título de hasta dos líneas, autor de una línea, progreso, zona estable de acciones y separador.
- [x] 4.3 Conservar acciones explícitas Leer y Escuchar según disponibilidad, evitar que activen la navegación primaria de la fila y limitar el menú contextual a acciones secundarias implementadas.
- [x] 4.4 Implementar el carrusel accesible de resumen para móvil con desbordamiento perceptible, teclado, gestos y foco visible.
- [x] 4.5 Implementar el encabezado compacto de Ver todo con volver, nombre de la colección, cantidad total y control de ordenamiento accesible.
- [x] 4.6 Implementar las vistas completas como listas verticales de una columna en móvil y escritorio, con ancho máximo legible centrado en pantallas grandes y sin conversión a cuadrícula.
- [x] 4.7 Implementar paginación o carga incremental que conserve filtro, búsqueda y orden y mantenga accesibles todos los resultados.
- [x] 4.8 Implementar la portada con Continuar, Por leer y Terminados, mostrando cantidades reales y Ver todo funcional para cada sección aplicable.
- [x] 4.9 Implementar Todos con búsqueda dentro de la biblioteca, filtros de estado, Abandonados como filtro secundario y acceso paginado a todos los resultados.
- [x] 4.10 Implementar estados diferenciados de carga, biblioteca vacía, filtro vacío, error recuperable con reintento y éxito.
- [x] 4.11 Eliminar pestañas estáticas, enlaces `#`, botones sin comportamiento y el bloque promocional principal de DNF.
- [x] 4.12 Verificar que ningún estado muestre Nuevo libro, Añadir libro, descarga offline ni controles equivalentes sin contrato, y dirigir el descubrimiento a Buscar.
- [x] 4.13 Cambiar la identidad móvil de `/app/library` a Biblioteca con icono apropiado y evitar el título principal duplicado.
- [x] 4.14 Corregir el texto español afectado por mojibake y verificar que los archivos y respuestas implicados usen UTF-8.

## 5. Validación y entrega

- [x] 5.1 Ejecutar las pruebas PHP de biblioteca y registrar los casos de autorización, errores, límites y compatibilidad.
- [x] 5.2 Ejecutar las pruebas frontend aplicables y `npm run build` sin errores TypeScript ni Vite.
- [ ] 5.3 Validar visualmente la portada y las listas completas en móvil y escritorio, incluyendo ancho máximo, separación de filas, títulos de dos líneas, autores largos, acciones estables, vacíos y bibliotecas grandes.
- [ ] 5.4 Validar por teclado y tecnología asistiva nombres accesibles, orden de foco, carruseles, filas, ordenamiento, filtros, menús, Leer, Escuchar y reintento.
- [ ] 5.5 Validar navegación interna, enlace directo y recarga de `/app/library`, Ver todo, filtros, búsqueda y ordenamiento, además del límite de sesión no autenticada.
- [ ] 5.6 Medir las consultas y respuestas de resumen/listado para confirmar límites, paginación y ausencia de carga completa no acotada.
- [x] 5.7 Confirmar que no cambiaron URLs públicas, canonicalización, metadatos, sitemaps, robots ni contenido indexable.
- [ ] 5.8 Ejecutar `git diff --check`, revisar que el diff permanezca dentro del alcance y comprobar el rollback documentado.
- [x] 5.9 Ejecutar `openspec validate library-reading-lifecycle --strict` y resolver todas las observaciones antes de solicitar aprobación para implementar o cerrar.
