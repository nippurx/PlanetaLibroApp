# Señaladores del lector

## Estado

**Implementado y validado el 19 de julio de 2026.**

El lector permite que cada usuario autenticado guarde varios señaladores privados por libro. La implementación fue comprobada funcionalmente en computadora y celular, incluida la persistencia, el regreso desde **Mis anotaciones** y el redibujado del señalador en la página de destino.

La especificación y el historial técnico permanecen en `openspec/changes/reader-bookmarks/`. Este documento describe el comportamiento entregado; el change no se archiva todavía.

## Comportamiento entregado

- Un toque o clic en el control de la esquina superior derecha agrega un señalador en la ubicación visible.
- Si la página visible ya contiene un señalador, la misma acción lo elimina.
- Se pueden guardar múltiples señaladores en un mismo libro.
- La zona táctil tiene tamaño ergonómico y es exclusiva: activarla no avanza la página.
- La zona normal de avance situada por debajo conserva su función.
- Se usa un único aspecto y color, sin selector ni categorías.
- El estado se recupera al volver a abrir el libro.
- El indicador activo se decide por la geometría del señalador persistido dentro de la página visible. Esto permite redibujarlo correctamente aunque la repaginación cambie el punto exacto de inicio de la página.

## Ubicación del control

- En celular, el señalador ocupa el extremo derecho de la barra negra de PlanetaLibro. Así no se superpone con el botón **Tt** de la barra de herramientas.
- En computadora, aparece en la esquina superior derecha, inmediatamente debajo de la barra negra. La barra de herramientas reserva ese espacio y no intercepta el clic.
- El control acepta interacción táctil, mouse y teclado, y muestra los errores de persistencia sin avanzar la lectura.

## Persistencia y API

Los señaladores reutilizan `user_book_annotations` con `annotation_type = 'bookmark'`. Se almacenan como anclas puntuales con fragmento, offset, contexto textual y versión del contenido. `color_code` se conserva con el valor fijo `1` para admitir una evolución futura sin exponerla ahora en la interfaz.

La operación de alta/baja usa `POST /api/v1/public/books/{uri}/bookmarks/toggle`. Es autenticada, transaccional y tolera duplicados históricos al eliminar. La identidad del usuario se obtiene de la sesión del servidor.

La implementación no depende de las columnas generadas ni del índice único condicional que MySQL 5.7 no pudo incorporar por el problema de reconstrucción de claves foráneas. La coherencia se resuelve en la operación transaccional de la API.

## Mis anotaciones

Los señaladores conviven con destacados y notas en **Mis anotaciones**:

- aparecen ordenados por ubicación y con contexto de lectura;
- pueden verse dentro de **Todas** o mediante el filtro **Señaladores**;
- ofrecen las acciones **Ir al señalador** y **Borrar**;
- al navegar, el panel y la barra de herramientas se cierran;
- después del salto, el señalador se dibuja si su ancla está dentro de la página visible.

## Verificación

- Pruebas automatizadas del frontend: 24 aprobadas.
- Comprobación de tipos y build de producción: aprobados.
- Validación estricta de OpenSpec para `reader-bookmarks`: aprobada.
- Validación manual del propietario en computadora y celular: aprobada.

## Mejora futura

Los colores y categorías no forman parte de esta entrega. Continúan registrados por separado como `FEAT-008`, **Señaladores con colores y categorías**, para evaluarlos con datos de uso real.
