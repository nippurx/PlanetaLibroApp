# PlanetaLibroApp Constitution

- **Versión:** 1.0.0
- **Estado:** Activa
- **Fecha de adopción:** 2026-07-15
- **Última modificación:** 2026-07-15
- **Propietario y autoridad final:** Marcelo Pecimut

Las palabras **DEBE**, **NO DEBE**, **DEBERÍA** y **PUEDE** expresan obligación, prohibición, recomendación y permiso respectivamente.

## 1. Propósito y alcance

Esta Constitución es la fuente de verdad obligatoria para PlanetaLibroApp, su integración con PlanetaLibro legacy, la API PHP necesaria para esa integración y todo cambio futuro gestionado con OpenSpec. Regula tanto la arquitectura comprobada como la dirección futura aprobada por el propietario.

PlanetaLibro tiene como misión facilitar que cualquier persona pueda leer, de manera rápida y sencilla, la mayor cantidad posible de libros y acceder a la mayor cantidad posible de audiolibros disponibles legítimamente, incluidos los publicados en YouTube. El sistema DEBE poder crecer hacia un catálogo amplio sin depender de excepciones manuales por libro.

La sostenibilidad del proyecto depende de aumentar visitas y de desarrollar un modelo de suscripción. Por ello, SEO, GEO, rendimiento, continuidad de URLs y medición del impacto orgánico son restricciones de producto y arquitectura, no tareas accesorias. Las limitaciones concretas entre modalidad gratuita y suscripción están **NO CONFIRMADAS**.

Esta Constitución NO obliga a reescribir, refactorizar ni crear specs retrospectivos de todo el legacy. La adopción es incremental y se profundiza únicamente en las áreas necesarias para cada change.

## 2. Fuentes de verdad y precedencia

Ante contradicciones, se aplica este orden:

1. Decisión explícita y documentada del propietario de PlanetaLibro.
2. Esta Constitución vigente.
3. Specs de producto o dominio aprobadas en `openspec/specs/`.
4. Artefactos aprobados del change OpenSpec activo.
5. Contratos comprobados de API, base de datos, URLs y archivos publicados.
6. Código y comportamiento reproducible del sistema real.
7. Documentación histórica, reverse engineering e inferencias.

Una decisión del propietario que se aparte de una regla DEBE registrar qué se decidió, por qué, alcance, riesgos y si exige una enmienda constitucional. El comportamiento legacy puede ser histórico y no deseado; no se eleva automáticamente a regla futura. Una contradicción material NO DEBE resolverse silenciosamente. Toda afirmación sin evidencia suficiente DEBE marcarse `NO CONFIRMADO`.

## 3. Principios de adopción incremental

- Todo cambio de código DEBE pasar por OpenSpec y quedar documentado, con la excepción procesal que el propietario autorice expresamente y documente con su motivo.
- Cada feature, corrección o refactor DEBE tener alcance pequeño, explícito y verificable.
- Solo se documentan en profundidad los módulos, contratos y dependencias que se necesiten tocar.
- NO DEBEN introducirse refactors oportunistas ni cambios de estilo ajenos al change activo.
- La deuda técnica DEBE tener su propio change, salvo que sea imprescindible para cumplir el change activo; esa necesidad DEBE explicarse.
- La convivencia con el legacy será prolongada. Su reemplazo será progresivo y solo avanzará cuando preserve o mejore SEO, GEO, tráfico orgánico y contratos públicos. La fecha y arquitectura final del reemplazo están **NO CONFIRMADAS**.

## 4. Flujo obligatorio de OpenSpec

Para cualquier cambio de código:

1. Leer esta Constitución y el estado del repositorio.
2. Investigar el comportamiento actual en código, documentación y contratos reales.
3. Crear o actualizar `proposal.md`, incluyendo objetivo, alcance, no objetivos, impacto SEO/GEO y compatibilidad.
4. Crear o actualizar `design.md` con decisiones, alternativas, riesgos y rollback.
5. Crear o actualizar los specs afectados y criterios de aceptación verificables.
6. Crear o actualizar `tasks.md` con unidades pequeñas y validación asociada.
7. Obtener revisión del plan antes de implementar cuando exista una decisión arquitectónica, de producto o de riesgo.
8. Implementar una tarea por vez y limitar el diff al alcance.
9. Validar cada tarea con los medios disponibles.
10. Actualizar los artefactos cuando una decisión cambie; NO DEBE dejarse una divergencia silenciosa entre plan y código.
11. Verificar el resultado, revisar el diff y solo entonces cerrar o archivar el change.

Los comandos comprobados incluyen `openspec validate <change> --strict`; otros comandos solo DEBEN citarse si se verifican mediante la instalación local. Los cambios puramente documentales, de ortografía o formato sin impacto de comportamiento PUEDEN usar un artefacto abreviado si el propietario lo decide, pero siempre DEBEN registrar qué cambió y por qué.

## 5. Límites de modificación del sistema legacy

- `D:\Desarrollo\MPWebs\www\planetalibro` se considera legacy y NO DEBE modificarse sin alcance explícito del change y autorización del propietario.
- Antes de tocar un archivo legacy se DEBEN identificar entrypoints, includes, rutas `.htaccess`, tablas, queries, sesiones y consumidores relacionados.
- Base de datos, URLs públicas, pagos y cualquier superficie con efecto SEO/GEO son críticas y NO DEBEN cambiarse sin consulta explícita al propietario, análisis de impacto, plan de reversión y validación.
- Autenticación, cookies, sesiones, permisos, administración, mailing, premium y contenido restringido requieren un change específico y revisión de seguridad.
- NO DEBEN romperse contratos públicos ni URLs existentes. Las redirecciones o canonicalizaciones requieren análisis SEO previo y seguimiento posterior.
- NO DEBEN eliminarse campos, tablas, archivos o rutas por parecer obsoletos; se exige evidencia de consumidores y autorización.
- NO DEBEN realizarse migraciones destructivas sin respaldo probado, rollback y autorización explícita.
- NO DEBEN asumirse relaciones de datos ni renombrarse identificadores históricos para “limpiar” el legacy.

## 6. Frontera entre PlanetaLibroApp y PlanetaLibro legacy

- El frontend React NO DEBE conectarse directamente a MySQL. Todo acceso a datos de servidor DEBE realizarse mediante API.
- La API DEBE responder JSON consistente; NO DEBE devolver HTML como contrato de datos.
- La app DEBE consumir rutas relativas al host cuando sea posible, para conservar el despliegue multidominio. `src/api/client.ts` es el punto central actual.
- La app se publica bajo `/app/`; Vite usa `base: "/app/"` y React Router `basename="/app"`.
- Las URLs públicas legacy `/leerlibro/{book-uri}/{page}` DEBEN conservarse mientras no exista un reemplazo explícitamente especificado con estrategia SEO.
- Las carpetas de libros y lector siguen la convención verificada `/{root}/{letra1}/{letra2}/{primer-token}/{book-uri}/`, con `root` igual a `biblioteca` o `lector`. El frontend NO DEBE inventar `path_prefix`, nombres físicos ni rutas de assets.
- El backend DEBE normalizar los nombres y peculiaridades legacy mediante DTOs o adaptadores. La app NO DEBE duplicar reglas críticas de negocio, autorización, suscripción o publicación.
- `manifest.json` v2 es el contrato preferente del lector moderno; `libroinfo.php` es compatibilidad legacy y NO DEBE ejecutarse en el navegador.

## 7. Arquitectura del frontend

- El código nuevo DEBE mantener TypeScript estricto y la separación existente entre `src/pages/`, `src/components/`, `src/features/`, `src/api/`, `src/layout/` y `src/utils/`.
- Las páginas coordinan navegación y estados; los componentes reutilizables presentan UI; `features/` encapsula lógica de dominio; `src/api/` concentra transporte y contratos.
- Las llamadas de API NO DEBEN dispersarse mediante `fetch` directo si caben en `src/api/client.ts` y servicios tipados.
- Cada pantalla dependiente de datos DEBE manejar explícitamente carga, vacío, error recuperable y éxito.
- El estado local DEBE ser la opción predeterminada. Estado compartido o global solo PUEDE añadirse con necesidad demostrada en `design.md`; no se incorpora una librería de estado por preferencia.
- Los contratos y tipos NO DEBEN duplicarse sin una frontera real que lo justifique.
- La UI DEBE ser mobile-first, responsive, navegable por teclado, con foco visible, semántica y contraste suficientes.
- Los estilos nuevos DEBEN seguir Tailwind y las variables/clases definidas en `src/index.css`; no se introduce otro sistema de estilos sin change específico.
- La navegación directa y recarga bajo `/app/` DEBEN validarse. No se hardcodean dominios salvo contrato histórico documentado y aprobado.

## 8. Reglas específicas del lector inmersivo

El lector inmersivo es la dirección definitiva del producto. Su criterio superior es generar una experiencia emocional positiva: lectura bella, legible, rápida, continua y sin distracciones.

- El modo predeterminado DEBE ser paginado visual mediante columnas CSS; scroll continuo sigue disponible como alternativa.
- `pag-N.html` es el formato interno de fragmentación publicado actualmente. La experiencia de lectura NO DEBE exponer nombres de archivo ni detalles técnicos innecesarios al usuario.
- El progreso DEBE permitir una continuidad de lectura útil y verificable. La representación técnica de la posición —por ejemplo, número de fragmento, ancla de contenido o un modelo híbrido— DEBE definirse y justificarse en los artefactos OpenSpec del lector, no en esta Constitución.
- Todo reflujo por viewport, orientación, fuente, tamaño, interlineado, márgenes, imágenes o cambio de modo DEBE preservar el pasaje visible y procurar mantenerlo en la mitad superior cuando el flujo natural lo permita.
- Preferencias y progreso local DEBEN persistir de forma versionada y fallar de manera no bloqueante. La sincronización remota requiere contrato OpenSpec previo.
- El lector DEBE admitir libros cortos, largos, con estructuras distintas e imágenes; la escalabilidad al catálogo completo es requisito de diseño.
- La legibilidad y accesibilidad tienen prioridad sobre efectos visuales. Deben respetarse teclado, foco, contraste y reducción de movimiento.
- El contenido HTML DEBE sanitizarse; scripts, formularios, handlers, estilos arbitrarios y URLs inseguras NO DEBEN ejecutarse.
- Las decisiones específicas de ventanas, precarga o geometría permanecen en `openspec/changes/immersive-book-reader/` y no se convierten automáticamente en reglas universales.

## 9. Contratos de API y datos

- Las APIs nuevas DEBEN validar y acotar entradas, usar JSON consistente y devolver errores sin stack traces, SQL, rutas internas ni secretos.
- Las consultas SQL nuevas DEBEN usar PDO y prepared statements. Listados DEBEN incluir límites y paginación.
- Los cambios DEBEN ser compatibles hacia atrás; una incompatibilidad requiere spec, versionado o transición y autorización.
- Las URIs públicas son los identificadores canónicos actuales de la app/API. Las PK físicas como `ebooks_books_id` y `ebooks_authors_id` permanecen internas salvo necesidad documentada.
- Se DEBE distinguir: nombres físicos del esquema (`ebooks_books.ebooks_books_id`), nombres públicos JSON (`uri`, `author_uri`, etc.) y nombres internos TypeScript. La traducción DEBE estar concentrada en repositorios/DTOs.
- NO DEBE inventarse un contrato de biblioteca, progreso remoto o suscripción antes de especificar identidad, autorización, concurrencia y compatibilidad.
- La API v1 es mayormente de lectura; la materialización idempotente de manifests y la cola `ebook_regeneration_queue` son excepciones comprobadas y acotadas, no autorización general para escrituras.

## 10. Base de datos

- Antes de modificar una query se DEBEN consultar `docs/c2380538_main_stru.sql`, `docs/db_audit/` y el uso real en código.
- NO DEBEN suponerse foreign keys o restricciones inexistentes.
- Cada change DEBE enumerar tablas y columnas leídas o escritas. Son especialmente relevantes `ebooks_books`, `ebooks_authors`, `user_books`, `user_books_log` y `user_table`.
- Toda escritura nueva DEBE definir integridad, idempotencia o transacción, concurrencia, autorización y recuperación ante fallos.
- Los cambios de esquema DEBEN usar migraciones versionadas, compatibles con el legacy y reversibles cuando sea razonable.
- Ningún cambio destructivo se ejecuta sin respaldo, ensayo de restauración, rollback y aprobación del propietario.
- Las credenciales DEBEN provenir de variables de entorno o configuración local no versionada y con mínimo privilegio.

## 11. Seguridad y privacidad

- Está prohibido versionar, copiar a documentación o exponer secretos, contraseñas, tokens, claves privadas o credenciales.
- Entradas de URL, JSON, formularios, archivos y HTML DEBEN validarse y sanitizarse según su contexto.
- El código SQL nuevo DEBE usar prepared statements. Los errores públicos NO DEBEN revelar internals.
- Sesiones, cookies y tokens DEBEN usar atributos y almacenamiento adecuados; nunca se registran contraseñas, tokens, contenido sensible ni datos personales innecesarios.
- Auth, usuarios, premium, pagos y contenido restringido requieren threat review y principio de mínimo privilegio.
- HTML de libros o base de datos DEBE tratarse como no confiable, incluso si fue publicado internamente.
- Enlaces externos abiertos en nueva pestaña DEBEN usar `noopener noreferrer`; los enlaces de contenido editorial DEBERÍAN considerar `nofollow` según política SEO.
- Todo hallazgo de credenciales DEBE reportarse sin reproducir valores, con recomendación de rotación y retiro del historial cuando corresponda. El informe inicial está en `docs/SECURITY_CREDENTIALS_REPORT.md`.

## 12. Compatibilidad, SEO/GEO y regresiones

- Se DEBEN preservar URLs públicas, canonicalización, metadatos, sitemaps, robots, enlaces internos, status HTTP, contenido indexable y rendimiento salvo cambio explícito y medido.
- Toda modificación con posible impacto orgánico DEBE incluir baseline, hipótesis, métricas, rollout, rollback y período de observación. El objetivo es mantener o aumentar visitas, nunca aceptar una caída silenciosa.
- Se DEBEN preservar el lector legacy cuando no sea reemplazado explícitamente, biblioteca, progreso, contratos API, assets, rutas de libros y funcionamiento móvil/desktop.
- `/app/` DEBE funcionar en navegación interna, enlace directo y recarga de SPA.
- Toda incompatibilidad DEBE declararse en proposal, design y criterios de aceptación, incluyendo impacto en Google y otros buscadores o motores de respuesta.

## 13. Testing y validación

La infraestructura actual comprobada ofrece `npm run build`, preview Vite, `openspec validate ... --strict` y `api/v1/tests/ReaderManifestSmokeTest.php`. No existen scripts npm de lint ni test frontend; no deben afirmarse como disponibles.

- Código nuevo DEBE incluir pruebas cuando exista infraestructura; si no existe, DEBE aportar una validación reproducible proporcional al riesgo.
- Un fix DEBERÍA incluir una prueba de regresión. La lógica pura DEBERÍA probarse unitariamente al incorporar infraestructura adecuada.
- Integraciones API DEBEN validarse mediante pruebas o requests reproducibles, incluyendo errores y límites.
- Cambios visuales DEBEN validarse en móvil y escritorio. Si una validación no puede ejecutarse, se declara pendiente con motivo y riesgo.
- Antes del cierre se ejecutan los comandos aplicables reales: build, pruebas PHP pertinentes, validación OpenSpec y `git diff --check`.

Matriz mínima del lector:

| Caso | Verificación obligatoria |
|---|---|
| Móvil y escritorio | Legibilidad, controles, foco y ausencia de cortes |
| Cambio de viewport/orientación | Conservación del pasaje |
| Cambio de fuente/tamaño/interlineado | Reflujo estable y pasaje conservado |
| Avance y retroceso | Una pantalla por acción y límites reales |
| Restauración | Recupera una posición de lectura coherente con los criterios de aceptación del change |
| App completa y recarga directa | Ruta `/app/read/...` funcional |
| Libro corto y largo | Inicio, medio, final y carga incremental |
| Contenido con imágenes | Sin ejecución insegura ni saltos persistentes |

## 14. Definition of Done

Un cambio está terminado solo cuando:

- cumple todos los criterios de aceptación y `tasks.md` refleja el estado real;
- pasan build, pruebas, validación OpenSpec y controles aplicables;
- se verifican rutas, URLs, SEO/GEO y contratos afectados;
- se valida en dispositivos y entornos relevantes;
- specs, design y documentación coinciden con el comportamiento final;
- no contiene secretos, logs temporales, artefactos accidentales ni cambios fuera de alcance;
- riesgos, deuda y validaciones pendientes están declarados;
- el diff fue revisado y existe un rollback proporcional al riesgo;
- el propietario aprobó toda decisión que afecte áreas críticas.

Compilar por sí solo no satisface la Definition of Done.

## 15. Reglas para agentes de IA

- DEBEN leer esta Constitución y el change activo antes de planificar o implementar.
- DEBEN inspeccionar código y contratos reales; NO DEBEN inventar archivos, comandos, endpoints, tablas, columnas, rutas ni comportamiento.
- DEBEN usar `NO CONFIRMADO` cuando falte evidencia y preguntar al propietario cuando una decisión material no pueda inferirse con seguridad.
- NO DEBEN ampliar alcance, modificar artefactos aprobados ni reemplazar decisiones del propietario por preferencias del agente sin explicarlo.
- NO DEBEN declarar tareas terminadas sin validación ni ocultar tests fallidos o controles no ejecutados.
- DEBEN preservar cambios preexistentes del usuario y revisar el estado Git antes y después.
- Toda acción destructiva, migración, cambio de URL, base de datos, pago o SEO DEBE detenerse hasta recibir autorización explícita.
- Ante decisiones relevantes DEBEN presentar alternativas, evidencia, trade-offs, impacto SEO/GEO y reversibilidad.
- El legacy solo se consulta en modo lectura salvo autorización expresa incluida en el change.

## 16. Gobierno y modificación de la Constitución

- Toda enmienda DEBE proponerse explícitamente, ser aprobada por el propietario y registrar fecha, motivo, impacto y cambios requeridos en specs o procesos.
- Una feature NO PUEDE modificar indirectamente esta Constitución. Si necesita una excepción permanente, requiere enmienda.
- Versionado semántico: **MAJOR** para principios o gobierno incompatibles; **MINOR** para nuevas reglas o ampliaciones relevantes; **PATCH** para aclaraciones sin cambio de significado.
- Una excepción temporal DEBE indicar regla exceptuada, alcance, responsable, justificación, riesgo, mitigación y fecha o condición de expiración.
- Una excepción no crea precedente ni modifica por sí misma la Constitución.
- Si una decisión explícita del propietario contradice el documento, prevalece esa decisión; el change DEBE registrar la contradicción y proponer la actualización constitucional correspondiente.
