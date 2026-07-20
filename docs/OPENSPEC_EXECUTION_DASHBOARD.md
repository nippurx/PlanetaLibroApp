# Tablero de ejecución OpenSpec

El tablero local responde a preguntas de dirección del trabajo de **PlanetaLibroApp**: qué changes siguen activos, cuántas tareas faltan, cuál está bloqueado y con qué conviene continuar. No es una pantalla de producto ni se publica bajo `/app/`.

## Abrirlo

Desde la raíz del repositorio, ejecutar:

```powershell
npm run openspec:dashboard
```

`npm run features:monitor` se conserva como alias compatible. Abrir `http://127.0.0.1:4174`.

En Windows también se puede hacer doble clic en `ABRIR_TABLERO_OPENSPEC.bat`, ubicado en la raíz del proyecto. El archivo abre una consola con el servidor local y, tras una breve espera, el tablero en el navegador.

## Instalarlo en otro proyecto OpenSpec

Desde esta raíz, ejecutar:

```powershell
npm run openspec:dashboard:install -- D:\Desarrollo\OtroProyecto
```

El destino debe contener `openspec/changes/`. El instalador copia el runtime del tablero a `tools/feature-monitor/` y crea `ABRIR_TABLERO_OPENSPEC.bat`; no requiere modificar `package.json` del proyecto destino. Si el destino ya contiene esa herramienta, usar `--force` de forma explícita para actualizar sus archivos.

## Qué muestra

- Todos los directorios inmediatos de `openspec/changes/` como changes activos.
- Todos los directorios inmediatos de `openspec/changes/archive/` como changes archivados.
- Cada checkbox Markdown de `tasks.md`, su estado y los conteos completado, total y pendiente.
- La disponibilidad de propuesta, diseño, specs y tareas.
- Un resumen global de trabajo activo y una lista de cambios bloqueados.

Un change sin `tasks.md` se indica como **tareas no disponibles**. No se interpreta como cero trabajo.

## Priorizar trabajo

Para cada change se puede guardar una evaluación operativa:

| Campo | Uso |
| --- | --- |
| Prioridad | Impacto relativo para el proyecto. |
| Urgencia | Necesidad temporal de actuar. |
| Importancia | Valor o riesgo que aborda el change. |
| Esfuerzo | Tamaño aproximado para desempatar. |
| Bloqueado | Lo excluye de la recomendación y lo hace visible. |
| Nota | Motivo, dependencia o decisión del propietario. |

La recomendación considera sólo changes activos, no bloqueados, con tareas pendientes y con una prioridad asignada. Ordena de forma determinista por prioridad, urgencia, importancia y esfuerzo; muestra los factores y el puntaje para que la decisión sea auditable. Si todavía no se evaluó ningún change, no inventa una recomendación. No estima fechas ni capacidad de equipo.

## Fuentes de verdad

Las tareas y el progreso provienen siempre de los artifacts OpenSpec. El tablero no puede crear, editar ni marcar tareas. La evaluación operativa se guarda de manera atómica y versionada en `docs/openspec-execution-assessments.json`, separada de `tasks.md` y de `docs/features-backlog.json`.
