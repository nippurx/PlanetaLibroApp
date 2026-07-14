# immersive-book-reader.md

Capacidades:

1. `immersive-reading`

   * Canvas de lectura sin distracciones.
   * Barra superior temporal: volver, título, índice, ajustes.
   * Barra inferior temporal: capítulo, porcentaje y progreso.
   * Sin efecto “pasar hoja” por defecto; transición sutil y respetuosa de `reduce motion`.

2. `reader-navigation`

   * Toque/clic lateral, swipe horizontal y teclado: flechas, espacio, Page Up/Down.
   * Índice jerárquico desde `manifest.json`.
   * Barra de progreso con marcas de capítulos.
   * Volver a la ubicación anterior tras abrir índice o búsqueda.

3. `reading-preferences`

   * Temas: claro, sepia y oscuro.
   * Fuentes iniciales: una serif de lectura, una sans y una accesible.
   * Tamaño, interlineado y márgenes.
   * Alineación: justificada solo cuando haya separación silábica adecuada; si no, alineación izquierda para evitar espacios incómodos.
   * Preferencias guardadas por usuario y aplicadas antes de mostrar el texto.

4. `reading-progress`

   * Retomar exactamente donde se abandonó el libro.
   * Mostrar porcentaje y capítulo, no depender de “página 37 de 120” porque el texto se refluye según pantalla y fuente.
   * Progreso local instantáneo; guardado remoto en segundo plano.

5. `accessible-reader`

   * Contraste suficiente, foco visible, etiquetas para lectores de pantalla y navegación completa por teclado.
   * Imágenes con `alt` cuando el libro lo aporte.
   * No depender exclusivamente de gestos.
