## Why

Las ideas de producto necesitan una fuente de verdad persistente antes de convertirse en trabajo formal. Como este flujo se repite en todos los proyectos, mantener un monitor por repositorio duplicaría código, fragmentaría la vista de prioridades y dificultaría decidir dónde concentrar esfuerzo.

## What Changes

- Añadir un backlog JSON versionado y legible por humanos para registrar features, estado, prioridad, área, notas y cambio OpenSpec asociado.
- Añadir un único monitor web local multiproyecto para buscar, filtrar y ordenar features, cambiar su prioridad y actualizar estados permitidos.
- Mantener un backlog versionado dentro de cada proyecto y un registro global que únicamente permita descubrir proyectos aprobados.
- Exponer un servicio local acotado que persista las ediciones en el backlog del proyecto seleccionado, sin base de datos ni dependencia de servicios externos.
- Derivar el progreso agregado de cada feature enlazada leyendo las tareas OpenSpec del proyecto correspondiente.
- Presentar identificadores con namespace `<project-id>/<feature-id>` para evitar colisiones entre repositorios.
- Registrar inicialmente el cambio existente `immersive-book-reader` para que el portfolio refleje el trabajo en curso.
- Documentar el flujo de promoción desde idea hasta change OpenSpec y su archivo al finalizar.
- No cambiar URLs públicas, contratos de la aplicación, API de producción, base de datos ni comportamiento SEO/GEO.

## Capabilities

### New Capabilities

- `feature-portfolio`: Registro y administración trazable de ideas de producto y su ciclo de vida.
- `feature-monitor`: Interfaz local para consultar, priorizar y actualizar el portfolio y observar progreso OpenSpec.

### Modified Capabilities

Ninguna.

## Impact

- Nuevos archivos de datos y documentación bajo `docs/`.
- Herramienta portable bajo `tools/feature-monitor/`, con configuración de proyectos en el perfil local y scripts para registrar proyectos, ejecutarla y validarla.
- Lectura de `docs/features-backlog.json` y `openspec/changes/*/tasks.md` exclusivamente dentro de raíces previamente registradas; las tareas OpenSpec siguen siendo la fuente de verdad del progreso detallado.
- No se añaden dependencias: Node analiza JSON de forma nativa.
- Sin impacto previsto en `/app/`, en el frontend público, en el legacy, en SEO/GEO o en contratos de datos de producción.
