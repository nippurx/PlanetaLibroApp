# Guía de instalación del Panel de ejecución OpenSpec

Esta guía permite incorporar el **Panel de ejecución** en cualquier repositorio que use OpenSpec. El tablero se ejecuta localmente: lee los changes y sus tareas, muestra el avance y permite registrar evaluaciones operativas de prioridad, urgencia, importancia, esfuerzo y bloqueos.

## Requisitos

- Node.js instalado y disponible como comando `node`.
- Acceso local al repositorio fuente que contiene este instalador.
- Un repositorio destino con la carpeta `openspec/changes/`.

El proyecto destino no necesita `package.json` ni dependencias npm para ejecutar el tablero.

## Instalación

Abrir PowerShell en la raíz del repositorio que contiene el instalador y ejecutar:

```powershell
cd D:\Desarrollo\PlanetaLibroApp
npm run openspec:dashboard:install -- D:\Desarrollo\OtroProyecto
```

Reemplazar `D:\Desarrollo\OtroProyecto` por la ruta absoluta del repositorio OpenSpec destino.

El instalador valida que exista `openspec/changes/` y crea esta estructura:

```text
OtroProyecto/
├─ ABRIR_TABLERO_OPENSPEC.bat
└─ tools/
   └─ feature-monitor/
      ├─ server.mjs
      ├─ execution.mjs
      └─ public/
```

No cambia código de producto, artifacts OpenSpec, `package.json` ni dependencias del proyecto destino.

## Abrir el tablero

En el proyecto destino, hacer doble clic en:

```text
ABRIR_TABLERO_OPENSPEC.bat
```

El archivo inicia el servidor local si todavía no está activo y abre:

```text
http://127.0.0.1:4174/
```

Dejar abierta la consola del servidor mientras se usa el tablero. Para actualizar la información de las tareas después de editar OpenSpec, recargar la página del navegador.

## Actualizar una instalación existente

El instalador protege una carpeta `tools/feature-monitor/` que ya exista. Para actualizarla de forma intencional, usar:

```powershell
npm run openspec:dashboard:install -- D:\Desarrollo\OtroProyecto --force
```

`--force` sobrescribe los archivos runtime del monitor y el archivo BAT. No elimina artifacts OpenSpec, tareas ni evaluaciones ya guardadas en el proyecto destino.

## Datos y fuente de verdad

| Información | Origen |
| --- | --- |
| Changes activos y archivados | `openspec/changes/` y `openspec/changes/archive/` |
| Tareas y avance | `tasks.md` de cada change |
| Descripción y propuesta completa | `proposal.md` de cada change |
| Prioridad, urgencia, importancia, esfuerzo, bloqueo y nota | `docs/openspec-execution-assessments.json` |

El tablero es de lectura para los artifacts OpenSpec: no crea, edita ni marca tareas. Las evaluaciones operativas se guardan separadas de `tasks.md`.

## Problemas frecuentes

### El instalador indica que el destino no contiene `openspec/changes`

Indicar la raíz del repositorio OpenSpec, no la carpeta `openspec` ni una subcarpeta.

### El navegador abre un tablero de otro proyecto

El puerto 4174 ya está ocupado por otro monitor local. Cerrar la consola de esa instancia y volver a abrir el BAT del proyecto deseado.

### El BAT informa que no encuentra Node.js

Instalar Node.js o agregarlo al `PATH` de Windows. Abrir una nueva consola y comprobar con:

```powershell
node --version
```
