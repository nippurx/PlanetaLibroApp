## Why

PlanetaLibroApp no cuenta con una vista operativa que consolide el estado real de los changes OpenSpec y sus tareas pendientes. El monitor de features existente está orientado a portfolios multiproyecto y sólo proyecta un contador, por lo que no permite decidir con evidencia qué trabajo continuar ni cómo asignar prioridad y recursos.

## What Changes

- Crear un tablero local de ejecución para este repositorio que descubra los changes OpenSpec activos y archivados, y lea sus artefactos de planificación.
- Mostrar resumen global y por change: estado, avance, tareas completadas, pendientes y disponibilidad de los artefactos.
- Permitir expandir cada change para consultar las tareas de `tasks.md` con su estado, y filtrar u ordenar la vista para identificar trabajo pendiente.
- Mostrar por change el comando sugerido `/opsx:apply <slug>` y las instrucciones de aplicación que devuelve el CLI local de OpenSpec.
- Registrar una evaluación operativa por change —prioridad, urgencia, importancia, esfuerzo estimado y bloqueo— separada de los datos derivados de OpenSpec.
- Calcular una recomendación transparente de siguiente trabajo a partir de las evaluaciones guardadas y de las tareas pendientes; no modificar ni marcar tareas OpenSpec desde el tablero.
- Retirar la necesidad de registro multiproyecto para esta interfaz y mantener los datos de planificación dentro de la raíz del repositorio.

## Capabilities

### New Capabilities

- `openspec-execution-dashboard`: Tablero local de ejecución que reúne cambios, tareas, progreso y señales de priorización de PlanetaLibroApp.

### Modified Capabilities

Ninguna. El monitor de portfolio anterior no posee una especificación principal sincronizada; esta propuesta introduce una capacidad operativa nueva y reutiliza su implementación sólo como detalle técnico.

## Impact

- Afecta `tools/feature-monitor/` y sus comandos npm, pruebas y documentación.
- Añade metadata operativa versionada en `docs/` sin alterar los artifacts OpenSpec ni el código de producto o legacy.
- No cambia URLs públicas, APIs de producto, base de datos, SEO/GEO ni el despliegue de la aplicación bajo `/app/`.
