## Context

El repositorio ya usa OpenSpec y un backlog de features, pero el mismo problema existe en otros proyectos. El monitor inicial fija `repoRoot` al repositorio que contiene el servidor, por lo que duplicarlo produciría múltiples instalaciones y ninguna vista transversal. OpenSpec no tiene stores globales registrados actualmente, de modo que el descubrimiento requiere un registro explícito propio.

## Goals / Non-Goals

**Goals:**

- Mantener un backlog versionado, legible y editable dentro de cada proyecto.
- Ejecutar una sola instalación del monitor para todos los proyectos registrados.
- Ofrecer una vista agregada y filtros por proyecto sin duplicar features.
- Permitir administración local segura de prioridad y estado.
- Mostrar progreso agregado sin duplicar las tareas de OpenSpec.
- Mantener la herramienta separada de la aplicación pública y de sus contratos.
- Hacer reproducible la validación del esquema y del vínculo con OpenSpec.

**Non-Goals:**

- Publicar el monitor en producción o integrarlo en `/app/`.
- Reemplazar OpenSpec como sistema de planificación detallada.
- Crear automáticamente un change al cambiar un estado.
- Añadir autenticación, colaboración multiusuario o base de datos.
- Mover todos los backlogs a un archivo central o explorar automáticamente el disco.
- Alterar código legacy, API pública, URLs o SEO/GEO.

## Decisions

### Backlog JSON como fuente de verdad

`docs/features-backlog.json` contendrá una versión de esquema y una colección de features con identificador estable. JSON sigue siendo revisable en Git y Node lo analiza de forma nativa, a diferencia de `localStorage`, que no es compartible ni auditable. Se prefirió a YAML porque la dependencia necesaria no está disponible sin acceso externo y no se implementará un parser artesanal.

Cada proyecto conserva su propio backlog. La vista global combina `project.id` y `feature.id` como clave de presentación, sin migrar IDs locales ni copiar datos.

### Registro global de proyectos

El monitor leerá un archivo de configuración local en `%USERPROFILE%/.feature-monitor/projects.json`, sustituible mediante `FEATURE_MONITOR_CONFIG`. Cada entrada tendrá `id`, `name`, ruta absoluta y estado habilitado. Un comando explícito registrará proyectos y verificará que contengan un backlog válido. La configuración no se versiona porque contiene rutas específicas de la máquina.

La alternativa de explorar directorios automáticamente se descarta por coste, ambigüedad y riesgo de leer repositorios no autorizados. Los stores OpenSpec podrían convertirse en otra fuente de descubrimiento en el futuro, pero actualmente no hay ninguno registrado.

### Servidor Node local y acotado

`tools/feature-monitor/server.mjs` servirá activos estáticos y una API local. Escuchará en loopback por defecto, resolverá un `project-id` únicamente desde el registro cargado, validará identificadores y valores enumerados, y solo escribirá el backlog del proyecto mediante reemplazo atómico. No ejecutará comandos OpenSpec ni aceptará rutas proporcionadas por el cliente.

Alternativas consideradas:

- HTML con `localStorage`: descartado porque crea una segunda fuente de verdad no versionada.
- Integración en la app React: descartada porque mezcla una herramienta interna con el producto público.
- Base de datos: descartada por complejidad innecesaria para un repositorio y propietario únicos.

### Progreso derivado de OpenSpec

Para cada proyecto habilitado, el servidor resolverá únicamente `openspec/changes/<openspec_change>/tasks.md`, comprobará que el slug sea seguro y contará checkboxes completados y totales. El backlog guardará el vínculo, no los contadores. Un proyecto inválido se reportará como error aislado sin impedir la lectura de los demás.

### Transiciones controladas

Los estados admitidos serán `idea`, `candidate`, `planned`, `in-progress`, `on-hold`, `completed` y `discarded`; las prioridades serán `critical`, `high`, `medium`, `low` y `none`. La API rechazará valores desconocidos. El monitor permitirá actualizarlos deliberadamente, pero no creará carpetas OpenSpec de forma implícita.

### Incorporación del trabajo existente

El backlog inicial incluirá `immersive-book-reader` con estado `in-progress` y vínculo al change actual. El nuevo monitor también se registrará como feature en curso para que el propio sistema sea trazable.

## Risks / Trade-offs

- [Dos procesos editan el JSON simultáneamente] → Escritura atómica y edición orientada a una sola instancia local; el último guardado válido prevalece.
- [JSON manual inválido] → Validación al cargar, endpoint de salud y comando de prueba reproducible.
- [Vínculo OpenSpec obsoleto] → Mostrar estado no disponible/archivado sin inventar progreso.
- [Monitor expuesto en red] → Escuchar solo en `127.0.0.1` por defecto y no incluir secretos.
- [Estados del backlog divergen de OpenSpec] → Mostrar progreso y disponibilidad derivados; documentar que la promoción y archivo requieren el flujo OpenSpec explícito.
- [La configuración concede acceso a varios repositorios] → Registro explícito, IDs validados, rutas resueltas en servidor y API sin parámetros de filesystem.
- [Un proyecto roto bloquea la vista global] → Aislar errores por proyecto y devolverlos junto a los proyectos saludables.

## Migration Plan

1. Conservar el backlog existente de PlanetaLibroApp sin migrar sus IDs.
2. Añadir el registro multiproyecto y registrar PlanetaLibroApp explícitamente; PlanetaLibro PHP permanece como un proyecto distinto.
3. Adaptar API, interfaz, pruebas y documentación a la agregación.
4. Ejecutar pruebas, build y validación OpenSpec estricta.
5. Rollback: usar el backlog directamente o volver al servidor de proyecto único; no se modifican datos de producción.

## Open Questions

Ninguna bloqueante. La automatización de creación de changes desde el monitor queda fuera de alcance hasta que el uso real justifique sus reglas y confirmaciones.
