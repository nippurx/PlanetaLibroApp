## 1. Modelo local de ejecución

- [x] 1.1 Implementar el descubrimiento acotado de changes activos y archivados y el parser de checkboxes de `tasks.md`.
- [x] 1.2 Implementar el esquema, validación y persistencia atómica de evaluaciones operativas por change.
- [x] 1.3 Implementar el resumen global, detección de bloqueos y recomendación determinista de siguiente trabajo.
- [x] 1.4 Añadir pruebas unitarias para descubrimiento, progreso, evaluación y priorización.

## 2. Servicio local

- [x] 2.1 Sustituir la API de portfolio por endpoints acotados de overview y actualización de evaluaciones, sin rutas suministradas por cliente.
- [x] 2.2 Conservar el arranque local por loopback y devolver errores JSON recuperables.
- [x] 2.3 Añadir pruebas HTTP para overview, guardado válido y rechazo de entradas inválidas.

## 3. Tablero operativo

- [x] 3.1 Reemplazar la interfaz de cards de features por resumen global, recomendación y visibilidad de bloqueos.
- [x] 3.2 Mostrar, filtrar, ordenar y expandir changes con sus tareas derivadas de OpenSpec.
- [x] 3.3 Añadir controles accesibles para guardar evaluación operativa y estados de carga, vacío, éxito y error.
- [ ] 3.4 Verificar manualmente el tablero en escritorio y viewport móvil.
- [x] 3.5 Mostrar en cada encabezado el avance, hechas en verde y pendientes en rojo.
- [x] 3.6 Mostrar una descripción breve derivada de `proposal.md` en cada change.
- [x] 3.7 Mostrar la propuesta completa al desplegar un change y corregir la extracción de descripción.
- [x] 3.8 Renombrar la cabecera del tablero como “Panel de ejecución”.
- [x] 3.9 Aumentar la tipografía de las descripciones a 1rem.
- [x] 3.10 Aumentar a 1.1rem las descripciones y la propuesta completa.

## 4. Documentación y validación

- [x] 4.1 Actualizar los comandos, la documentación de uso y la fuente de verdad de la herramienta.
- [x] 4.2 Ejecutar pruebas del monitor, build de la aplicación, validación OpenSpec estricta y revisión de diff.
- [x] 4.3 Añadir un acceso directo BAT en la raíz para iniciar y abrir el tablero local.
- [x] 4.4 Añadir y probar un instalador portable para otro repositorio OpenSpec.
- [x] 4.5 Documentar la instalación portable para desarrolladores humanos.
