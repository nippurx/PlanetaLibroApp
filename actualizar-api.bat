@echo off
setlocal

set "PROYECTO=%~dp0"
set "ORIGEN=%PROYECTO%api\v1"
set "DESTINO=D:\Desarrollo\MPWebs\www\planetalibro\src\api\v1"

echo.
echo ========================================
echo   Actualizacion de PlanetaLibro API v1
echo ========================================
echo.

if not exist "%DESTINO%\src\bootstrap.php" (
    echo ERROR: No se encontro la API de destino:
    echo %DESTINO%
    exit /b 1
)

if not exist "%ORIGEN%\src\bootstrap.php" (
    echo Primera ejecucion: importando la API existente al proyecto...
    if not exist "%ORIGEN%" mkdir "%ORIGEN%"

    call :copiar_carpeta "%DESTINO%\src" "%ORIGEN%\src"
    if errorlevel 1 exit /b 1
    call :copiar_carpeta "%DESTINO%\public" "%ORIGEN%\public"
    if errorlevel 1 exit /b 1
    call :copiar_carpeta "%DESTINO%\docs" "%ORIGEN%\docs"
    if errorlevel 1 exit /b 1

    if exist "%DESTINO%\gptsearch.php" copy /Y "%DESTINO%\gptsearch.php" "%ORIGEN%\gptsearch.php" >nul
    echo Importacion terminada.
    echo.
)

echo Copiando la API actualizada al sitio...
call :copiar_carpeta "%ORIGEN%\src" "%DESTINO%\src"
if errorlevel 1 exit /b 1
call :copiar_carpeta "%ORIGEN%\public" "%DESTINO%\public"
if errorlevel 1 exit /b 1
call :copiar_carpeta "%ORIGEN%\docs" "%DESTINO%\docs"
if errorlevel 1 exit /b 1

if exist "%ORIGEN%\gptsearch.php" copy /Y "%ORIGEN%\gptsearch.php" "%DESTINO%\gptsearch.php" >nul

echo.
echo API actualizada correctamente.
echo Probar: /api/v1/public/libros/top-leidos?limit=15^&lang=es
exit /b 0

:copiar_carpeta
if not exist "%~1" exit /b 0
if not exist "%~2" mkdir "%~2"
robocopy "%~1" "%~2" /E /COPY:DAT /DCOPY:DAT /R:2 /W:1 /NFL /NDL /NJH /NJS /NP
if errorlevel 8 (
    echo ERROR copiando "%~1" a "%~2".
    exit /b 1
)
exit /b 0
