# Gestión de ideas y features

Cada proyecto conserva `docs/features-backlog.json` como fuente de verdad de su portfolio. Una única instalación del monitor agrega los proyectos registrados; OpenSpec sigue siendo la fuente de verdad del alcance, diseño, requisitos y tareas de cada feature elegida para desarrollo.

## Ciclo de vida

`idea` → `candidate` → `planned` → `in-progress` → `completed`

`on-hold` pausa una idea o feature sin descartarla. `discarded` registra una decisión de no continuar. Las prioridades válidas son `critical`, `high`, `medium`, `low` y `none`.

## Cómo registrar una idea

Cada idea recibe un ID `FEAT-NNN` que no cambia aunque se renombre. Debe contener título, resumen orientado al resultado, estado, prioridad, área, fechas, notas y, solo cuando corresponda, `openspec_change`.

La prioridad la decide el propietario. El asistente puede recomendarla, detectar duplicados, reorganizar notas y mantener los estados, pero no debe promover silenciosamente una idea a desarrollo.

## Cómo promoverla a desarrollo

1. Explorar la idea y pasarla a `candidate` cuando merezca evaluación.
2. Cuando el propietario decida desarrollarla, crear `openspec/changes/<slug>/` mediante el flujo OpenSpec completo.
3. Completar y revisar `proposal.md`, `design.md`, specs y `tasks.md`.
4. Guardar el slug en `openspec_change` y pasarla a `planned`.
5. Al comenzar la implementación, pasarla a `in-progress`.
6. Validar requisitos y tareas; al terminar, marcarla `completed` y archivar el change con OpenSpec.

El monitor nunca crea changes implícitamente. Esto conserva la revisión explícita exigida por la Constitución.

## Validación actual

- Nueve pruebas automatizadas del esquema, mutaciones, registro multiproyecto, colisiones, aislamiento, rutas API y progreso: aprobadas.
- TypeScript, build de la app y validación OpenSpec estricta: aprobados el 2026-07-17.
- Smoke test HTTP del HTML y la API global: aprobado; cargó 5 features de PlanetaLibroApp, resolvió `planeta-libro-app/FEAT-001` y el lector reportó 53/84 tareas.
- Revisión visual automatizada móvil/escritorio: pendiente porque la política del navegador disponible bloqueó el acceso a `127.0.0.1`. La interfaz incorpora breakpoints a 850 px y 540 px, semántica, foco visible y reducción de movimiento, pero debe hacerse una comprobación visual manual antes de archivar el change.

## Monitor local

### Registrar proyectos

PlanetaLibroApp se registra automáticamente la primera vez que se inicia el monitor sin configuración. Es el proyecto de modernización y navegación sobre los datos de PlanetaLibro. El sitio PHP de producción es otro proyecto, `PlanetaLibro`, y debe registrarse separadamente cuando tenga su propio backlog.

Para añadir otro repositorio que ya contenga `docs/features-backlog.json`:

```bash
npm run features:register -- D:\Desarrollo\OtroProyecto --id=otro-proyecto --name="Otro proyecto"
```

El registro local se guarda por defecto en `%USERPROFILE%/.feature-monitor/projects.json`. Puede elegirse otro archivo con `FEATURE_MONITOR_CONFIG`. Este registro solo contiene ID, nombre, ruta y estado; las features nunca se copian fuera de su proyecto.

Los IDs se muestran con namespace, por ejemplo `planeta-libro-app/FEAT-003`, de modo que distintos proyectos pueden mantener su propia numeración.

### Ejecutar el único monitor

Ejecutar:

```bash
npm run features:monitor
```

Abrir `http://127.0.0.1:4174`. El monitor permite filtrar por proyecto, buscar, ordenar y editar prioridad y estado. Las ediciones se escriben atómicamente solo en el backlog del proyecto propietario. Un proyecto roto se informa sin ocultar los demás. El progreso se calcula desde `tasks.md`; no se copia al backlog.

## Fuentes de verdad

| Información | Fuente |
|---|---|
| Proyectos autorizados y sus rutas | `%USERPROFILE%/.feature-monitor/projects.json` |
| Idea, prioridad, estado y área | `docs/features-backlog.json` de cada proyecto |
| Motivo y alcance aprobado | `proposal.md` del change |
| Decisiones técnicas | `design.md` del change |
| Comportamiento requerido | specs del change |
| Trabajo y progreso detallado | `tasks.md` del change |
