## 1. MVP — Validación de integración y fixtures

- [ ] 1.1 Verificar desde desarrollo y despliegue el acceso HTTP same-origin y las cabeceras de caché de `manifest.json`, `pag-N.html` y assets para al menos dos libros publicados; CORS no es un bloqueo porque `/app/` y `/lector/` comparten origen en producción.
- [x] 1.2 Resolver y documentar la fuente contractual de la carpeta del lector (`path_prefix` recibido o derivación aprobada) sin aceptar rutas arbitrarias.
- [x] 1.3 Seleccionar fixtures representativos: portada, índice multinivel, imágenes internas, libro largo, HTML histórico y recurso faltante.
- [x] 1.4 Documentar la decisión de ruta React (`/read/:libro_uri/:page` o migración compatible) y el fallback al lector legacy.
- [x] 1.5 Acordar si el MVP se limita a progreso local o incluye sincronización; si la incluye, especificar antes autenticación, payload, respuesta y compatibilidad con `user_books.current_page`.

## 2. MVP — Infraestructura de pruebas

- [ ] 2.1 Incorporar un runner de pruebas unitarias compatible con React/TypeScript y configurar scripts de ejecución reproducibles.
- [ ] 2.2 Incorporar pruebas de componentes con DOM y utilidades de accesibilidad para interacciones de teclado y foco.
- [ ] 2.3 Configurar pruebas end-to-end para viewports móvil y escritorio con respuestas de reader controladas.
- [x] 2.4 Crear fixtures locales de manifests, fragmentos y assets sin modificar ni depender del publicador EPUB.

## 3. MVP — Fuente y seguridad del contenido

- [x] 3.1 Implementar tipos y validación runtime del contrato `manifest.json` versión 2, incluidos rangos de páginas e índice.
- [x] 3.2 Implementar el resolvedor seguro de recursos del libro usando únicamente URI validada y la fuente de `path_prefix` acordada.
- [x] 3.3 Implementar el adaptador read-only para cargar manifest, fragmentos dentro de rango y assets con cancelación y errores tipados.
- [x] 3.4 Implementar sanitización inerte de fragmentos, protocolos permitidos y resolución confinada de recursos relativos.
- [ ] 3.5 Añadir pruebas unitarias para manifest válido/inválido, path traversal, página fuera de rango, scripts/handlers, enlaces y recursos inseguros.
- [ ] 3.6 Añadir estados de carga, error recuperable y salida a ficha/lector legacy, con pruebas de componente.
- [x] 3.7 Implementar `GET /api/v1/public/reader-manifest/{uri}` con resolución confinada, parser legacy limitado, validación de fragmentos y publicación atómica sin sobrescritura.
- [x] 3.8 Registrar mediante `UPSERT` idempotente cada materialización legacy en `ebook_regeneration_queue` con destino `epub2html2`.
- [x] 3.9 Implementar en el reader fallback exclusivo ante 404 de `manifest.json`, consumir el contrato devuelto por la API y conservar el error recuperable para los demás fallos.
- [ ] 3.10 Documentar y verificar manifest existente, legacy válido, URI/traversal, metadata inválida, fragmento faltante, concurrencia y fallo de escritura/cola.

## 4. MVP — Flujo inmersivo y rendimiento

- [x] 4.1 Separar el reader en estado/controlador, fuente de contenido y presentación, manteniendo la ruta existente funcional.
- [x] 4.2 Ajustar el modo inmersivo de `AppShell` para eliminar navegación global y respetar safe areas durante la lectura.
- [x] 4.3 Renderizar portada y fragmentos como un único flujo lógico y semántico sin numeración ni separadores `pag-N` visibles.
- [ ] 4.4 Completar el spike de columnas CSS con fixtures reales y verificar estabilidad con imágenes, bloques indivisibles, fuentes tardías y HTML histórico, sin implementar rangos DOM ni saltos artificiales en el MVP.
- [x] 4.5 Implementar paginación visual como modo predeterminado, calculando páginas de un viewport completo después de aplicar estilos y recursos críticos.
- [x] 4.6 Implementar scroll vertical continuo como modo alternativo sobre el mismo flujo y las mismas anclas.
- [x] 4.7 Implementar ventana inicial alrededor del ancla restaurada y precarga ordenada suficiente para calcular la página actual y siguiente.
- [x] 4.8 Implementar placeholders y repaginación desde ancla que eviten saltos perceptibles al cargar fuentes, imágenes o fragmentos y revelen el pasaje anclado inmediatamente.
- [x] 4.9 Implementar barras superior e inferior revelables, auto-ocultamiento seguro y paneles de índice/preferencias.
- [ ] 4.10 Añadir pruebas de componente para páginas que cruzan fragmentos, cambio de modo, controles con foco, panel abierto y errores parciales.
- [ ] 4.11 Medir apertura, paso de página, repaginación, memoria y estabilidad visual con un fixture largo en móvil y escritorio; registrar presupuesto y resultados antes de liberar.

## 5. MVP — Navegación

- [x] 5.1 Diseñar y probar un ancla versionada que combine ruta estructural, offset y contexto textual, sin persistir `pag-N`, página visual, columna ni píxeles como identidad principal.
- [x] 5.2 Implementar captura y resolución del ancla con coincidencia exacta, contextual/estructural y fallback cercano para contenido regenerado.
- [x] 5.3 Implementar avance y retroceso de exactamente una página visual mediante toque/clic lateral, swipe horizontal, controles, Page Up/Down, Space y flechas sin interferir con elementos interactivos.
- [x] 5.3.1 Robustecer Pointer Events con zonas 20/60/20 relativas al viewport, bloqueo de eje, pulsación larga, selección, `pointercancel`, multitouch, interactivos y bloqueo breve de repetición.
- [x] 5.4 Implementar navegación vertical natural y por teclado cuando el modo scroll esté activo, conservando la misma ancla.
- [x] 5.5 Implementar índice jerárquico desde `manifest.index`, filtrado de destinos inválidos y salto con foco/anuncio al destino.
- [x] 5.6 Implementar detección de capítulo actual desde el índice/chapters válido.
- [x] 5.7 Implementar porcentaje normalizado desde el flujo/ancla, independiente de `pag-N` y sin regresiones bruscas por precarga.
- [x] 5.8 Implementar regreso a la ficha u origen y conservación del ancla al abrir/cerrar paneles.
- [ ] 5.9 Añadir pruebas automatizadas de toque lateral, swipe, teclado, límites, cambio de modo, índice multinivel, capítulo y porcentaje.
- [x] 5.9.1 Añadir pruebas unitarias de clasificación gestual para zonas, swipes, umbral, eje vertical, interactivos, selección, límites, cancelación, multitouch y pulsación larga.
- [x] 5.10 Implementar URL raíz estable, apertura explícita que comience exactamente en el fragmento solicitado y Compartir basado en el primer fragmento visible, con fallback de copiado cuando Web Share no esté disponible.
- [x] 5.11 Implementar shell HTML y rewrite desplegables con la app para metadata Open Graph de URLs compartibles, resolviendo la tapa desde assets confinados del manifest sin ejecutar PHP legacy.
- [ ] 5.12 Hacer que Compartir use como texto del mensaje la selección activa y no vacía realizada dentro del contenido del libro, mantenga el enlace al fragmento que contiene el inicio de esa selección y conserve el texto estándar y el primer fragmento visible como fallback cuando no haya una selección válida.

## 6. MVP — Preferencias

- [x] 6.1 Definir modo paginado como predeterminado y rangos/valores para modo, temas, familias disponibles, tamaño, interlineado y ancho/márgenes.
- [x] 6.2 Implementar controles accesibles para modo paginado/continuo y cada preferencia visual, aplicando alineación izquierda por defecto.
- [x] 6.3 Implementar almacenamiento local versionado, validación y fallback de preferencias corruptas.
- [x] 6.4 Aplicar preferencias antes de revelar contenido cuando sea posible para evitar destellos de tema o tipografía.
- [x] 6.5 Capturar el ancla, repaginar o refluir y restaurar el pasaje visible inmediatamente al cambiar modo, preferencias, viewport, orientación o zoom, priorizando la mitad superior cuando los límites naturales de columnas lo permitan.
- [ ] 6.6 Añadir pruebas automatizadas para modo predeterminado, aplicación, persistencia, datos inválidos y repaginación que mantenga visible el pasaje anclado, sin exigir la misma primera línea ni posición vertical exacta.

## 7. MVP — Progreso

- [x] 7.1 Implementar almacenamiento local versionado por URI con ancla de contenido y versión/fecha del manifest, sin guardar `pag-N` o página visual como identidad principal.
- [x] 7.2 Guardar progreso con debounce durante lectura y flush acotado al ocultar o abandonar la vista.
- [x] 7.3 Implementar la prioridad de restauración y fallbacks para ancla explícita, local, remota opcional, inicio asociado a `paginicio` e inicio del libro.
- [x] 7.4 Manejar manifest regenerado, ancla no resoluble, fragmento de carga fuera de rango y almacenamiento indisponible sin bloquear lectura.
- [ ] 7.5 Si se aprobó contrato remoto para el MVP, implementar un adaptador autenticado no bloqueante y su política de conflicto sin modificar el publicador.
- [ ] 7.6 Añadir pruebas automatizadas de guardado, retorno, fallos, versiones incompatibles y sincronización sólo si fue aprobada.

## 8. MVP — Accesibilidad

- [x] 8.1 Definir landmarks, article, headings y nombres/estados accesibles de todos los controles propios.
- [x] 8.2 Implementar orden de foco, foco visible, trapping cuando corresponda, Escape y devolución de foco en paneles.
- [x] 8.3 Implementar anuncios no intrusivos para saltos solicitados y cambios de capítulo relevantes.
- [x] 8.4 Verificar que sanitización conserva `alt` del libro y mantiene `alt=""` como decorativo.
- [x] 8.5 Aplicar `prefers-reduced-motion` y eliminar transiciones no esenciales sin animación de hoja.
- [ ] 8.6 Verificar que el modo paginado conserva el orden semántico y que contenido visualmente fuera de página sigue siendo recorrible de forma comprensible por tecnología asistiva.
- [ ] 8.7 Automatizar comprobaciones de accesibilidad y navegación completa por teclado en ambos modos.
- [ ] 8.8 Realizar prueba manual de paginación y scroll con lector de pantalla al menos en una combinación de escritorio y una móvil disponible.

## 9. MVP — Validación y liberación

- [ ] 9.1 Ejecutar pruebas unitarias, de componentes, end-to-end, build TypeScript/Vite y validación OpenSpec.
- [ ] 9.2 Probar manualmente paginación predeterminada, toque lateral, swipe, teclado, scroll alternativo, índice, controles, preferencias y retorno en móvil, tablet y escritorio.
- [ ] 9.3 Probar manualmente red lenta, offline posterior a carga, fragmento faltante, manifest inválido, imagen rota y libro largo.
- [ ] 9.4 Probar manualmente que el pasaje anclado quede visible inmediatamente y, cuando sea posible, en la mitad superior al cambiar orientación, viewport, zoom 200 %, texto, fuente, márgenes, modo y movimiento reducido; aceptar la redistribución vertical natural.
- [ ] 9.5 Confirmar mediante inspección visual y de accesibilidad que ninguna superficie presenta `pag-N` como página visible.
- [x] 9.6 Verificar que `/leerlibro/...`, los manifests v2 existentes, `pag-N.html`, `libroinfo.php` y el publicador EPUB permanecen sin modificaciones; la compatibilidad sólo crea manifests ausentes.
- [x] 9.7 Habilitar el reader nuevo de forma reversible y documentar rollback hacia la ficha o lector legacy.
- [x] 9.8 Verificar manualmente en paginado y scroll que Compartir elige el primer fragmento visible y que el enlace abre ese destino en PC y celular.
- [x] 9.9 Desplegar el shell social y verificar con una URL nueva que WhatsApp muestra tapa, título y enlace correcto sin impedir la apertura del reader.
- [x] 9.10 Crear una barra de marca persistente, semántica y no interactiva con logo PlanetaLibro y dominio centrado exactamente respecto del viewport.
- [x] 9.11 Integrar una variable de altura de marca con safe area, viewport, columnas CSS, overlays y restauración de ancla sin duplicar compensaciones.
- [x] 9.12 Validar mediante build y revisión de código el contrato visual/semántico de la barra, incluida la independencia ante fallo de carga del logo.
- [ ] 9.13 Probar manualmente la barra en móvil y escritorio, cambios de fuente, reflujo, rotación y recarga conservando el pasaje anclado.

## 10. Mejoras posteriores — Robustez avanzada de layout

- [ ] 10.1 Optimizar virtualización y caché del motor paginado con libros excepcionalmente largos después de medir el MVP.
- [ ] 10.2 Evaluar diseños de dos páginas para pantallas anchas sin cambiar el ancla canónica ni el modo predeterminado de una pantalla.
- [ ] 10.3 Mejorar anclas ante ediciones profundas del texto mediante un índice textual versionado si los fallbacks del MVP resultan insuficientes.

## 11. Mejoras posteriores — Funciones de lectura

- [ ] 11.1 Diseñar un índice de texto limpio antes de implementar búsqueda interna, sin parsear todos los fragmentos en cada consulta.
- [ ] 11.2 Especificar y luego implementar marcadores con ubicaciones resistentes al reflujo y regeneración del libro.
- [ ] 11.3 Especificar y luego implementar resaltados y notas con anclaje textual y estrategia de exportación.
- [ ] 11.4 Evaluar diccionario, lectura en voz alta y perfiles de preferencias como capacidades separadas.
- [ ] 11.5 Diseñar caché offline/PWA con controles de tamaño, actualización y derechos antes de almacenar libros completos.
