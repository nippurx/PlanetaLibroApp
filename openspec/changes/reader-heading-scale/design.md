## Context

Los fragmentos pasan por `sanitizeFragment`, que elimina `<style>`, `class`, `id` y atributos `style`, pero conserva `h1` a `h6`. La presentación queda completamente bajo `src/index.css`: el cuerpo usa `--reader-font-size` y cada encabezado usa hoy un múltiplo en `em` (`2em` para `h1`). Por ello, aumentar la preferencia del cuerpo amplifica también los títulos sin un límite independiente.

El cambio es visual, pero altera el reflujo y la cantidad de columnas. Debe funcionar con el mecanismo de repaginación y anclas existente, en modo paginado y continuo, y respetar la prioridad constitucional de legibilidad y accesibilidad.

## Goals / Non-Goals

**Goals:**

- Mantener una jerarquía reconocible entre `h1` y `h6`.
- Acotar cada nivel con una escala que combine el tamaño elegido por el usuario y límites absolutos razonables.
- Mejorar el ajuste de encabezados largos sin truncarlos.
- Mantener estable el pasaje durante el reflujo provocado por preferencias o viewport.
- Validar el resultado en móvil y escritorio, paginado y continuo, con tamaños base mínimo, predeterminado y máximo.

**Non-Goals:**

- Corregir la semántica de los encabezados producidos por `epub2html2`.
- Inferir dinámicamente si un encabezado es título de libro, capítulo o subtítulo a partir de su longitud.
- Recuperar clases, fuentes o estilos originales eliminados por el sanitizador.
- Cambiar contenido publicado, manifests, navegación, persistencia, API o lector legacy.

## Decisions

### Usar una escala fluida acotada por nivel

Cada encabezado tendrá un `font-size` con `clamp()` cuyo valor preferido deriva de `--reader-font-size`, pero con mínimos y máximos propios. Así la preferencia del usuario sigue influyendo en la jerarquía sin permitir que un `h1` crezca indefinidamente con el cuerpo.

Los valores concretos se concentrarán como variables CSS del reader para poder calibrarlos sin repartir números por selectores. La implementación conservará una progresión estrictamente descendente de `h1` a `h6` en la configuración predeterminada.

Alternativa considerada: reducir los multiplicadores actuales en `em`. Se descarta porque reduce el problema pero mantiene el crecimiento ilimitado. También se descarta igualar todos los niveles, porque borraría jerarquía y personalidad editorial.

### Tratar títulos largos mediante composición, no clasificación de contenido

Se permitirá envolver texto, se conservará `overflow-wrap` seguro y se aplicará composición equilibrada cuando el navegador la soporte. No se usarán selectores o JavaScript basados en cantidad de caracteres: serían heurísticos, sensibles al idioma y añadirían repaginación dependiente del contenido.

Alternativa considerada: asignar una clase de “título largo” durante el sanitizado. Se descarta en este alcance porque mezcla semántica editorial con una heurística visual y amplía pruebas y lógica de dominio.

### Mantener espaciado relativo y cortes editoriales existentes

Se conservarán `break-after: avoid`, peso, márgenes relativos y el salto de columna entre fragmentos que comienzan con encabezado. El cambio se limita a escala y composición tipográfica para no rediseñar la estructura del libro.

### Validar con un fixture representativo y comprobación visual

La validación cubrirá los seis niveles, un encabezado corto y uno largo, cuerpo mínimo/predeterminado/máximo, móvil/escritorio y ambos modos. Se comprobará que no haya recorte ni desborde horizontal y que el pasaje visible se conserve al cambiar preferencias.

## Risks / Trade-offs

- [Los límites absolutos reducen la diferencia entre encabezado y cuerpo con tamaños de accesibilidad muy grandes] → Mantener un mínimo por nivel, peso y espaciado; validar especialmente el tamaño máximo permitido por el reader.
- [Un `h1` legítimamente monumental pierde parte de la personalidad del libro] → Preservar semántica, peso, márgenes y jerarquía; limitar sólo la escala necesaria para la legibilidad del sistema.
- [La nueva métrica cambia la cantidad de páginas visuales] → Reutilizar la repaginación y restauración por ancla ya existentes y probar cambios de preferencia y viewport.
- [Los máximos elegidos resultan demasiado conservadores o grandes en un dispositivo real] → Centralizar valores en variables CSS y tratarlos como calibración visual reversible antes de cerrar el cambio.

## Migration Plan

1. Añadir el fixture o caso reproducible de encabezados.
2. Incorporar las variables y reglas acotadas únicamente bajo `.reader-content`.
3. Ejecutar build, validación OpenSpec y comprobaciones visuales móvil/escritorio.
4. Publicar junto con el bundle habitual de la app, sin migración de datos ni regeneración de libros.

Rollback: restaurar las reglas anteriores de `font-size` para `h1` a `h6`; no hay datos ni contratos que revertir.

## Open Questions

- Los valores numéricos finales de mínimos, factores y máximos requieren calibración visual antes de considerarse cerrados.
