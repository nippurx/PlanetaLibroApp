## Context

`tools/feature-monitor/` actualmente lee backlogs JSON de varios repositorios y proyecta para cada feature un único contador de `tasks.md`. PlanetaLibroApp necesita, en cambio, una vista local del trabajo que ya está planificado en `openspec/changes/`: changes activos, archivados y las tareas individuales que determinan su avance. La fuente de verdad de alcance y trabajo seguirá siendo cada artifact OpenSpec; la evaluación de prioridad es una decisión operativa adicional del propietario.

## Goals / Non-Goals

**Goals:**

- Servir una interfaz local, acotada a la raíz de PlanetaLibroApp, para inspeccionar changes y tareas OpenSpec.
- Derivar progreso y listas de tareas exclusivamente de `tasks.md`, sin duplicarlas ni permitir que la interfaz las edite.
- Persistir por change las señales de decisión que no existen en OpenSpec: prioridad, urgencia, importancia, esfuerzo, bloqueo y nota de decisión.
- Hacer visible una recomendación explicable de próximo trabajo, además de los bloqueos y de la carga pendiente.

**Non-Goals:**

- Gestionar proyectos externos, registrar rutas arbitrarias o reemplazar OpenSpec.
- Crear, archivar, editar o marcar tareas OpenSpec desde el navegador.
- Estimar fechas, capacidad de personas, costes o dependencias no documentadas.
- Cambiar código de producto, APIs públicas, legacy, base de datos o superficies SEO/GEO.

## Decisions

### Descubrimiento limitado a los árboles OpenSpec del repositorio

El servidor resolverá su propia raíz de repositorio y enumerará exclusivamente directorios inmediatos de `openspec/changes/` y `openspec/changes/archive/`. Cada elemento se identifica por su slug y origen (`active` o `archived`); el cliente nunca envía rutas. Esto permite incluir un change aunque no tenga `tasks.md` y evita que un archivo no OpenSpec se trate como tarea. La alternativa de conservar el registro multiproyecto fue descartada porque oculta el trabajo real de este repositorio y amplía innecesariamente la frontera de lectura.

### Parser pequeño y tolerante de `tasks.md`

Una función pura leerá líneas con checkboxes Markdown (`- [ ]`, `- [x]` o `- [X]`) y devolverá texto, estado y ordinal. Los totales se derivan de esa misma salida. Las líneas no marcadas se conservan fuera del contador y una tarea sin archivo se comunica como no disponible, nunca como cero tareas.

### Instrucciones de aplicación acotadas

Para cada slug ya descubierto, el servidor puede ejecutar únicamente `openspec instructions apply --change <slug> --json`, con argumentos fijos, cwd en la raíz del repositorio y timeout corto. En Windows usa `cmd.exe` porque la instalación local de OpenSpec es un script `.ps1`; el único valor interpolado es el slug validado contra el patrón interno. La respuesta expone el texto `instruction` y el estado; nunca ejecuta `/opsx:apply`, no acepta rutas desde el navegador ni reenvía argumentos arbitrarios. Un fallo o una instalación ausente de OpenSpec se muestra como instrucción no disponible sin impedir el resto del tablero. La alternativa de inferir el siguiente paso desde los archivos se descarta porque perdería las indicaciones dinámicas del esquema OpenSpec.

### Metadata operativa versionada y separada

`docs/openspec-execution-assessments.json` almacenará un objeto por slug con `priority`, `urgency`, `importance`, `effort`, `blocked` y `note`. El servidor validará enums, longitud de nota y slugs descubiertos, y escribirá mediante reemplazo atómico. Esta metadata no cambia `tasks.md`; el dashboard mostrará visualmente qué datos son derivados y cuáles son evaluación manual. Mantenerla en el backlog de features fue descartado porque los changes pueden no tener una feature enlazada y la interfaz ya no depende del portfolio.

### Recomendación determinista, no una falsa promesa de planificación

Para cada change activo con tareas pendientes, sin bloqueo y con prioridad asignada, el servidor calcula un puntaje documentado: prioridad, urgencia e importancia pesan de mayor a menor; un esfuerzo menor desempata para favorecer una entrega factible. Orden alfabético del slug resuelve empates. Sin prioridad explícita no hay recomendación: evita presentar un orden alfabético como decisión. La respuesta expone los factores y el puntaje; la UI usa el resultado como “siguiente recomendado”, no como decisión automática. Los bloqueados se separan para que sean visibles aunque nunca encabecen la recomendación.

### Misma herramienta local y compatibilidad de comando

Se reutilizarán `tools/feature-monitor/server.mjs` y `npm run features:monitor` para no crear otro servicio local. Se sustituirá la API y el contenido de la interfaz, y los módulos de registry multiproyecto dejarán de ser parte de su ruta de ejecución. La alternativa de publicar una pantalla de administración dentro de la SPA `/app/` se descarta: no es una función de usuarios, no debe desplegarse públicamente y requeriría modificaciones ajenas al alcance.

## Risks / Trade-offs

- [Los checkboxes no representan dependencias ni complejidad] → El tablero comunica conteos objetivos y expone evaluación manual; no infiere fechas ni recursos exactos.
- [Un `tasks.md` con formato no estándar puede omitir trabajo] → Se informa la cantidad detectada y la ausencia de tareas; las pruebas cubren mayúsculas y archivos faltantes.
- [La metadata puede quedar obsoleta tras renombrar o archivar un change] → Sólo se edita metadata de slugs descubiertos; entradas huérfanas se ignoran y se mantienen para recuperabilidad hasta una limpieza explícita.
- [La nueva utilidad puede parecer una fuente de verdad alternativa] → La interfaz etiqueta las tareas como “leídas desde OpenSpec” y las decisiones como “evaluación operativa”; no ofrece controles de edición de tareas.

## Migration Plan

1. Añadir el parser, almacenamiento de evaluaciones, API local y nueva interfaz.
2. El primer arranque crea el archivo de evaluaciones vacío si aún no existe; no migra ni modifica `docs/features-backlog.json`.
3. Validar parser, API, persistencia, renderizado y build.
4. Si debe revertirse, restaurar los archivos de `tools/feature-monitor/` y eliminar el archivo de evaluaciones sólo si no contiene decisiones que se deseen conservar. El producto y los artifacts OpenSpec no habrán sido modificados por la aplicación.

## Open Questions

- Ninguna para esta primera versión. La prioridad y los demás criterios son evaluación explícita del propietario, no datos que el tablero deba inventar.
