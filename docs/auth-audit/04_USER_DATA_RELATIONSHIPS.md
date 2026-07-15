# Datos asociados al usuario

## Relaciones demostradas

`user_table.userid` es el ID canónico. `user_books.user_id`, `user_books_log.user_id` y `user_video_audiolibros.user_id` lo usan de facto, aunque el dump no declara FKs (`docs/c2380538_main_stru.sql:766-791`, `docs/c2380538_main_stru.sql:957-965`). Los libros se enlazan mediante `ebooks_books_id`; el log lo llama `book_id` (`docs/c2380538_main_stru.sql:768-790`).

| Tabla | Relación/uso |
|---|---|
| `user_books` | biblioteca y progreso: `user_id`, `ebooks_books_id`, `current_page`, `leidas`, primeras/últimas lecturas y dispositivo (`docs/c2380538_main_stru.sql:766-777`). El lector actualiza página/contador (`leerlibro_funcs.php:1083`). |
| `user_books_log` | eventos de lectura: usuario, libro, página y timestamp (`docs/c2380538_main_stru.sql:782-791`; `leerlibro_funcs.php:1344`). |
| `user_video_audiolibros` | biblioteca/progreso temporal de audio por usuario/libro (`docs/c2380538_main_stru.sql:957-965`; `f_user_video_audiolibros_updatetime.php:23-55`). |
| `favorites` | usa `favorite_user_id`, pero su pertenencia al mismo dominio de identidad es **NO CONFIRMADA** por código principal (`docs/c2380538_main_stru.sql:457-464`). |
| `libros_pedidos` | guarda `userid` y también email (`docs/c2380538_main_stru.sql:469-479`). |
| `user_book_tags` | personalización accionada por `track_user_action(userid,bookid,acción)` (`user_funcs.php:2623-2638`). Esquema exacto no quedó localizado en el dump auditado: **NO CONFIRMADO**. |
| `ebooks_users_ebooks` | sistema antiguo enlazado por códigos, no por `userid`; parece histórico y no debe adoptarse sin migración explícita (`docs/c2380538_main_stru.sql:404-416`). |

## Operaciones y controles

Añadir libro usa GET `q`, identidad de sesión, e inserta mediante helper (`user_books_insert.php:31-37`, `user_books_insert.php:72-74`). El endpoint de borrado contiene SQL sintácticamente inválido y no ejecuta un guard explícito (`user_books_delete.php:23-41`), por lo que no debe reutilizarse. Los endpoints de audiolibro toman el usuario exclusivamente de sesión, pero carecen de CSRF y uno no comprueba autenticación antes del INSERT (`f_user_video_audiolibros_insert.php:23-38`).

La futura API debe resolver siempre `user_id` desde sesión server-side, nunca desde URL/body; comprobar propiedad; usar transacciones/prepared statements; y definir unicidad `(user_id, ebooks_books_id)` donde corresponda.

