import { access, cp, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(toolRoot, '..', '..');

async function exists(file) { try { await access(file); return true; } catch { return false; } }

export function launcherContents() {
  return `@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo No se encontro Node.js. Instalalo y volve a ejecutar este archivo.
  pause
  exit /b 1
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 4174 -State Listen -ErrorAction SilentlyContinue) { exit 0 } exit 1" >nul 2>&1
if errorlevel 1 start "Tablero OpenSpec" cmd /k "node tools\\feature-monitor\\server.mjs"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4174/"
endlocal
`;
}

export async function installDashboard(targetPath, options = {}) {
  const destinationRoot = path.resolve(targetPath);
  const source = path.resolve(options.sourceRoot || sourceRoot);
  if (destinationRoot === source) throw new Error('El destino debe ser otro repositorio OpenSpec');
  if (!await exists(path.join(destinationRoot, 'openspec', 'changes'))) throw new Error('El destino no contiene openspec/changes');
  const destinationTool = path.join(destinationRoot, 'tools', 'feature-monitor');
  if (await exists(destinationTool) && !options.force) throw new Error('El destino ya contiene tools/feature-monitor; usá --force para actualizarlo');
  await mkdir(destinationTool, { recursive: true });
  await cp(path.join(source, 'tools', 'feature-monitor', 'server.mjs'), path.join(destinationTool, 'server.mjs'), { force: true });
  await cp(path.join(source, 'tools', 'feature-monitor', 'execution.mjs'), path.join(destinationTool, 'execution.mjs'), { force: true });
  await cp(path.join(source, 'tools', 'feature-monitor', 'public'), path.join(destinationTool, 'public'), { recursive: true, force: true });
  await writeFile(path.join(destinationRoot, 'ABRIR_TABLERO_OPENSPEC.bat'), launcherContents(), 'utf8');
  return destinationRoot;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), force = args.includes('--force'), target = args.find((arg) => arg !== '--force');
  if (!target) {
    console.error('Uso: node tools/feature-monitor/install.mjs <ruta-del-repositorio-openspec> [--force]');
    process.exitCode = 1;
  } else {
    try { console.log(`Tablero instalado en ${await installDashboard(target, { force })}`); }
    catch (error) { console.error(`No se pudo instalar: ${error.message}`); process.exitCode = 1; }
  }
}
