@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo No se encontro Node.js. Instala Node.js y volve a ejecutar este archivo.
  pause
  exit /b 1
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 4174 -State Listen -ErrorAction SilentlyContinue) { exit 0 } exit 1" >nul 2>&1
if errorlevel 1 start "Tablero OpenSpec - PlanetaLibroApp" cmd /k "node tools\feature-monitor\server.mjs"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4174/"
endlocal
