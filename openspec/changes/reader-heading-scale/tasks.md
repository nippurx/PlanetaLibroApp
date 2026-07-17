## 1. Caso de validación

- [x] 1.1 Preparar un fragmento o fixture reproducible con `h1` a `h6`, un título corto y un título largo, sin estilos editoriales confiables.
- [ ] 1.2 Registrar la apariencia actual en viewport móvil y escritorio con tamaños de lectura mínimo, predeterminado y máximo.

## 2. Escala tipográfica

- [x] 2.1 Definir en el ámbito del reader las variables CSS de tamaño mínimo, factor preferido y máximo para cada nivel de encabezado.
- [x] 2.2 Sustituir los multiplicadores ilimitados de `h1` a `h6` por la escala fluida acotada, conservando peso, márgenes y reglas de corte.
- [x] 2.3 Ajustar la composición de encabezados largos para envolver el texto sin truncamiento ni desborde horizontal.

## 3. Validación del reader

- [ ] 3.1 Verificar los encabezados en móvil y escritorio, en modo paginado y continuo, con tamaños de lectura mínimo, predeterminado y máximo.
- [ ] 3.2 Verificar que los cambios de tamaño, viewport y modo repaginen conservando el pasaje visible.
- [x] 3.3 Ejecutar `npm run build`, `git diff --check` y `openspec validate reader-heading-scale --strict`.
- [x] 3.4 Documentar los valores finales calibrados, resultados visuales, riesgos pendientes y rollback antes de cerrar el cambio.
