# Calibración y validación

## Fixture reproducible

`tests/fixtures/reader-heading-scale.html` contiene `h1` a `h6`, un título corto, un título largo y una palabra sin oportunidades de corte. Sus controles permiten alternar tamaños base de 14, 20 y 32 px y modos paginado/continuo. El contenido no aporta clases, IDs ni estilos editoriales a los encabezados.

## Línea base anterior

La escala sustituida era `2em`, `1.65em`, `1.4em`, `1.2em`, `1.05em` y `1em`. Por lo tanto, los tamaños calculados anteriores eran:

| Base | h1 | h2 | h3 | h4 | h5 | h6 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 14 px | 28 px | 23.1 px | 19.6 px | 16.8 px | 14.7 px | 14 px |
| 20 px | 40 px | 33 px | 28 px | 24 px | 21 px | 20 px |
| 32 px | 64 px | 52.8 px | 44.8 px | 38.4 px | 33.6 px | 32 px |

## Valores finales

| Nivel | Mínimo | Factor preferido | Máximo | Resultado a 14/20/32 px |
| --- | ---: | ---: | ---: | ---: |
| h1 | 26 px | 1.65 | 44 px | 26 / 33 / 44 px |
| h2 | 23 px | 1.45 | 40 px | 23 / 29 / 40 px |
| h3 | 20 px | 1.30 | 36 px | 20 / 26 / 36 px |
| h4 | 18 px | 1.15 | 34 px | 18 / 23 / 34 px |
| h5 | 16 px | 1.05 | 33 px | 16 / 21 / 33 px |
| h6 | 15 px | 1.00 | 32 px | 15 / 20 / 32 px |

La escala mantiene una progresión descendente en los tres tamaños soportados. En el extremo de accesibilidad, `h1` baja de 64 a 44 px y ningún nivel queda por debajo del cuerpo. `max-width: 100%`, `overflow-wrap: anywhere` y `text-wrap: balance` permiten envolver títulos y tokens largos sin truncamiento; los navegadores sin balanceado conservan el wrapping normal.

## Matriz visual pendiente

Validar el fixture en 390 × 844 y 1440 × 900, combinando ambos modos y los tres tamaños (12 escenarios). En cada uno comprobar: jerarquía completa, texto no truncado, `scrollWidth <= clientWidth`, continuidad después del encabezado largo y ausencia de encabezados aislados. Antes de cambiar tamaño, viewport o modo, anotar el texto visible en torno a `data-anchor`; después del reflujo confirmar que el mismo pasaje o su aproximación estable permanece visible.

La ejecución automatizada del 17 de julio de 2026 no pudo abrir `localhost:4173` porque el navegador integrado tiene ese origen bloqueado por una preferencia de seguridad del usuario. No se atribuyen resultados visuales ni de conservación de ancla hasta completar esta matriz.

## Riesgos y rollback

- Los topes reducen parte de la monumentalidad editorial de títulos grandes; semántica, peso, márgenes y cortes se conservan.
- La cantidad de columnas puede variar y exige completar la matriz de anclas antes del cierre.
- El soporte de `text-wrap: balance` es progresivo; `overflow-wrap` cubre el requisito crítico de no desbordar.
- Rollback: restaurar los seis `font-size` en `em`, retirar las variables `--reader-h*-*`, `max-width`, `overflow-wrap` y `text-wrap`. No hay datos, contenido publicado ni contratos que revertir.
