# CREAR CONSTITUTION.md


# prompt


Actúa como arquitecto senior experto en Spec-Driven Development, OpenSpec y modernización incremental de sistemas legacy.

## Objetivo

Analiza el proyecto completo y crea una Constitución técnica para PlanetaLibroApp que funcione como fuente de verdad obligatoria para todo trabajo futuro realizado mediante OpenSpec y agentes de IA.

Debes crear el archivo:

`CONSTITUTION.md`

en la raíz del repositorio `PlanetaLibroApp`.

No implementes funcionalidades, no modifiques código de producción y no cambies los artefactos actuales de `openspec/changes/immersive-book-reader`. En esta tarea solo debes investigar el proyecto y crear la Constitución.

## Contexto del sistema

PlanetaLibroApp es una aplicación web moderna, desarrollada de forma incremental sobre el ecosistema legacy de PlanetaLibro.

Tienes acceso a:

* Todo el código de `PlanetaLibroApp`.
* Todo el código legacy de `planetalibro.net`.
* La carpeta `docs/`.
* La documentación técnica y de reverse engineering existente.
* La definición SQL completa de la base de datos.
* La API PHP existente.
* Los documentos y artefactos de OpenSpec.
* El change activo `immersive-book-reader`.
* Los archivos `proposal.md`, `design.md`, `tasks.md` y los specs asociados.
* El historial Git disponible en el repositorio.

El sistema combina, entre otras tecnologías:

* React.
* Vite.
* TypeScript o JavaScript, según el código real.
* PHP.
* MySQL.
* API JSON.
* Sitio legacy en PHP.
* Routing legacy mediante `.htaccess`.
* Lector de libros basado en archivos HTML.
* Persistencia de biblioteca y progreso de lectura.
* OpenSpec para Specification-Driven Development.

No presupongas versiones, librerías, comandos, convenciones ni arquitectura. Verifícalos en los archivos reales del proyecto.

## Principio central

La Constitución no debe documentar exhaustivamente todo el código legacy.

Debe establecer:

1. Cómo se desarrollará código nuevo.
2. Cómo se integrará PlanetaLibroApp con PlanetaLibro legacy.
3. Qué límites debe respetar un agente de IA.
4. Qué controles deben cumplirse antes de modificar código existente.
5. Cómo debe funcionar el flujo de trabajo con OpenSpec.
6. Qué condiciones debe cumplir una tarea para considerarse terminada.

La adopción de SDD debe ser incremental. No intentes crear specs retrospectivos para todo el sistema existente.

## Investigación obligatoria antes de escribir

Antes de crear `CONSTITUTION.md`, inspecciona como mínimo:

### Proyecto PlanetaLibroApp

* `package.json`.
* Configuración de Vite.
* Configuración de TypeScript, ESLint y herramientas de calidad.
* Estructura de `src/`.
* Scripts de desarrollo, build, preview y testing.
* Arquitectura actual de componentes, hooks, servicios y estado.
* Cliente o servicios que consumen la API.
* Variables de entorno.
* Configuración de despliegue.
* Documentación del proyecto.
* Carpeta `openspec/`.
* Change `openspec/changes/immersive-book-reader`.
* Cualquier archivo de contexto o continuidad, como `SESSION_STATE.md`, si existe.

### Sistema legacy PlanetaLibro

* Documentación técnica ubicada en `docs/`.
* Entry points y routing.
* API PHP.
* Convenciones de URL de libros, autores, tapas y lector.
* Estructura real de `biblioteca/` y `lector/`.
* Tablas relacionadas con libros, usuarios, biblioteca y progreso.
* Modelo lógico y riesgos técnicos documentados.
* Helpers y conexiones de base de datos.
* Relación entre `ebooks_books`, `ebooks_authors`, `user_books`, `user_books_log` y `user_table`.
* Restricciones conocidas del código legacy.

### Seguridad

Busca posibles secretos, contraseñas, credenciales, tokens o datos sensibles presentes en código o documentación.

No copies ningún secreto dentro de la Constitución.

Cuando encuentres uno:

* describe únicamente la regla de seguridad correspondiente;
* nunca reproduzcas su valor;
* indica que las credenciales deben manejarse mediante variables de entorno o configuración local no versionada.

## Contenido requerido de CONSTITUTION.md

La Constitución debe ser concreta, verificable y adaptada al proyecto. Evita principios genéricos que no puedan comprobarse.

Incluye como mínimo las siguientes secciones:

# PlanetaLibroApp Constitution

## 1. Propósito y alcance

Explica que la Constitución regula:

* PlanetaLibroApp.
* Su integración con PlanetaLibro legacy.
* La API necesaria para esa integración.
* Todo cambio futuro gestionado con OpenSpec.

Aclara que no obliga a refactorizar todo el sistema antiguo.

## 2. Fuentes de verdad y precedencia

Define un orden claro para resolver contradicciones, por ejemplo:

1. Constitución vigente.
2. Specs de producto o dominio aprobadas.
3. Artefactos del change OpenSpec activo.
4. Contratos comprobados de API y base de datos.
5. Código y comportamiento real del sistema.
6. Documentación histórica o inferida.

Ajusta esta jerarquía según la estructura real del proyecto.

Aclara que:

* el código legacy puede contener comportamiento histórico no deseado;
* una contradicción importante no debe resolverse silenciosamente;
* las afirmaciones no verificadas deben marcarse como `NO CONFIRMADO`.

## 3. Principios de adopción incremental

Incluye reglas como:

* No documentar todo el legacy de una vez.
* Cada nueva feature o cambio relevante debe pasar por OpenSpec.
* Solo se documentarán en profundidad los módulos que se necesiten tocar.
* El alcance debe mantenerse pequeño y explícito.
* No introducir refactors oportunistas ajenos al change activo.
* Los cambios de deuda técnica deben tener su propio change, salvo que sean estrictamente necesarios.

## 4. Flujo obligatorio de OpenSpec

Define el ciclo requerido para cambios no triviales:

1. Investigar el comportamiento actual.
2. Crear o actualizar `proposal.md`.
3. Crear o actualizar `design.md`.
4. Crear o actualizar los specs afectados.
5. Definir criterios de aceptación verificables.
6. Crear o actualizar `tasks.md`.
7. Revisar el plan antes de implementar.
8. Implementar por tareas pequeñas.
9. Validar cada tarea.
10. Actualizar artefactos cuando cambie una decisión.
11. Cerrar o archivar el change solo después de verificar el resultado.

Aclara qué cambios pequeños pueden quedar exentos y bajo qué condiciones.

No inventes comandos de OpenSpec. Usa solamente comandos que existan realmente en el proyecto o en la instalación disponible. Cuando no puedas verificar un comando, documenta el flujo conceptual sin afirmar un comando específico.

## 5. Límites de modificación del sistema legacy

Establece reglas obligatorias como:

* El sitio legacy no debe modificarse salvo que el change lo requiera explícitamente.
* Antes de tocar un archivo legacy, se deben identificar entrypoints, includes, tablas, queries y consumidores relacionados.
* No modificar `.htaccess`, autenticación, cookies, sesiones, pagos, premium, mailing, permisos ni administración sin un change específico y análisis de impacto.
* No cambiar contratos públicos ni URLs existentes de forma incompatible.
* No eliminar campos, tablas, archivos o rutas porque parezcan obsoletos sin evidencia.
* No realizar migraciones destructivas sin respaldo, plan de reversión y autorización explícita.
* No asumir relaciones de base de datos que no estén verificadas.
* No cambiar nombres históricos de columnas o identificadores dentro del legacy solo para “limpiar” el diseño.

## 6. Frontera entre PlanetaLibroApp y PlanetaLibro legacy

Documenta las reglas reales verificadas, incluyendo:

* La app moderna no debe conectarse directamente a MySQL desde el frontend.
* El acceso a datos debe realizarse mediante API.
* La API debe devolver JSON, no HTML.
* La app debe usar las URLs públicas y contratos existentes.
* Las rutas de lectura deben respetar el acceso público oficial del lector.
* Las tapas y assets deben usar las convenciones reales de rutas.
* La app no debe inventar `path_prefix`, URIs ni nombres físicos de archivos.
* El backend es responsable de normalizar datos legacy para la app.
* La app no debe duplicar lógica de negocio crítica que ya pertenece al backend.

Verifica estas reglas contra el código y la documentación antes de redactarlas.

## 7. Arquitectura del frontend

Deriva las reglas desde el código real de PlanetaLibroApp.

Incluye, cuando sean aplicables:

* separación entre páginas, componentes, hooks, servicios y modelos;
* consumo centralizado de API;
* manejo explícito de loading, empty state y error;
* componentes accesibles y responsive;
* mobile-first;
* navegación compatible con el despliegue bajo `/app/`;
* prohibición de llamadas directas dispersas a la API;
* prohibición de duplicar tipos o contratos sin necesidad;
* política para estado global y estado local;
* política para CSS y estilos;
* reglas especiales del immersive book reader.

No impongas arquitecturas o librerías que el proyecto no utilice.

## 8. Reglas específicas del lector inmersivo

Lee todos los artefactos del change `immersive-book-reader` y resume únicamente las decisiones estables que deban convertirse en principios de proyecto.

Incluye, si continúan vigentes:

* motor definitivo de paginado o columnas;
* preservación del pasaje anclado durante el reflujo;
* comportamiento responsive;
* continuidad de lectura;
* prioridad de legibilidad;
* compatibilidad con distintos libros;
* persistencia de preferencias;
* comportamiento al cambiar tamaño, orientación o tipografía.

No copies todo el diseño del change dentro de la Constitución.

Solo eleva a nivel constitucional las reglas duraderas y reutilizables. Las decisiones específicas de implementación deben permanecer en los artefactos del change.

## 9. Contratos de API y datos

Define reglas para código nuevo:

* contratos JSON consistentes;
* validación de entradas;
* errores sin exposición de stack traces ni secretos;
* prepared statements para nuevas consultas SQL;
* paginación y límites en listados;
* compatibilidad hacia atrás;
* DTOs o adaptadores para aislar nombres legacy;
* uso explícito de identificadores canónicos dentro de la app;
* traducción controlada entre identificadores modernos y columnas legacy;
* prohibición de cambiar contratos existentes sin especificación.

Distingue claramente entre:

* nombres físicos del esquema legacy;
* nombres públicos de la API;
* nombres internos del frontend.

No establezcas una estrategia de identificadores sin verificar primero la API y el uso actual.

## 10. Base de datos

Incluye reglas como:

* la definición SQL y el uso real en código deben consultarse antes de modificar consultas;
* no asumir foreign keys inexistentes;
* toda escritura nueva debe contemplar integridad y concurrencia;
* cambios de esquema requieren migración versionada;
* las migraciones deben ser reversibles cuando sea razonable;
* nunca incluir credenciales reales;
* no realizar cambios destructivos sin aprobación;
* preservar compatibilidad con el sitio legacy;
* documentar tablas y columnas tocadas por cada change.

## 11. Seguridad y privacidad

Incluye obligatoriamente:

* prohibición de versionar secretos;
* uso de variables de entorno;
* validación y sanitización de entradas;
* prepared statements en código nuevo;
* no exponer errores internos;
* protección de sesiones, cookies y tokens;
* no registrar contraseñas, tokens ni información sensible;
* principio de mínimo privilegio;
* revisión especial para auth, usuarios, premium y contenido restringido;
* tratamiento seguro de HTML proveniente de libros o de la base de datos;
* política para enlaces externos.

## 12. Compatibilidad y regresiones

Define qué comportamiento debe preservarse, incluyendo:

* URLs públicas existentes;
* lector legacy cuando no sea reemplazado explícitamente;
* biblioteca y progreso del usuario;
* contratos de API consumidos por la app;
* funcionamiento móvil y desktop;
* despliegue bajo `/app/`;
* assets y rutas de libros;
* navegación directa y recarga en rutas de la SPA.

Exige que cualquier incompatibilidad sea explícita en proposal, design y criterios de aceptación.

## 13. Testing y validación

No inventes porcentajes de cobertura.

Primero determina qué infraestructura de tests existe.

Luego establece una política realista:

* código nuevo debe incluir tests cuando la infraestructura lo permita;
* los fixes deben incluir una prueba de regresión cuando sea razonable;
* lógica pura debe probarse unitariamente;
* integración con API debe tener pruebas o validaciones reproducibles;
* cambios visuales deben validarse en móvil y desktop;
* el lector debe probarse con varios libros y contenidos de diferente estructura;
* deben ejecutarse los comandos reales de lint, test y build;
* si una validación no puede ejecutarse, debe informarse claramente.

Incluye una matriz mínima de validación para cambios del lector:

* móvil;
* desktop;
* cambio de viewport;
* cambio de tamaño de fuente;
* avance y retroceso;
* restauración del pasaje;
* navegación desde la app completa;
* libro corto;
* libro largo;
* contenido con imágenes, cuando aplique.

## 14. Definition of Done

Una tarea no está terminada solo porque compile.

Define que un cambio se considera terminado cuando:

* cumple los criterios de aceptación;
* las tareas correspondientes están actualizadas;
* lint, tests y build aplicables pasan;
* se comprobó que no rompe rutas ni contratos;
* se validó en los entornos relevantes;
* se actualizaron specs, design o documentación cuando cambió el comportamiento;
* no quedaron secretos ni logs temporales;
* no contiene cambios ajenos al alcance;
* se documentaron riesgos o validaciones pendientes;
* el diff fue revisado.

## 15. Reglas para agentes de IA

Incluye instrucciones obligatorias para Codex y otros agentes:

* leer esta Constitución antes de planificar o implementar;
* leer el change OpenSpec activo;
* inspeccionar el código real antes de asumir;
* no inventar archivos, comandos, endpoints, tablas, campos o comportamiento;
* usar `NO CONFIRMADO` cuando falte evidencia;
* no ampliar el alcance silenciosamente;
* no modificar artefactos aprobados sin explicar el motivo;
* no declarar una tarea completada sin validación;
* no ocultar tests fallidos;
* no reemplazar decisiones del usuario por preferencias arquitectónicas del agente;
* detener una acción destructiva y pedir autorización;
* presentar alternativas y trade-offs cuando exista una decisión arquitectónica relevante.

## 16. Gobierno y modificación de la Constitución

Define:

* cómo se propone una enmienda;
* que los cambios constitucionales deben ser explícitos;
* que una feature no puede modificar indirectamente la Constitución;
* que los cambios deben registrar fecha, motivo e impacto;
* cómo se resuelven excepciones temporales;
* que una excepción no se convierte automáticamente en precedente.

Incluye metadatos al comienzo o al final:

* Versión inicial: `1.0.0`.
* Estado: `Activa`.
* Fecha de adopción: fecha actual.
* Última modificación: fecha actual.

Puedes usar versionado semántico:

* MAJOR: cambio incompatible en principios o gobierno.
* MINOR: nueva regla o ampliación relevante.
* PATCH: aclaración sin cambio de significado.

## Criterios de calidad del documento

`CONSTITUTION.md` debe:

* estar escrito en español claro;
* usar términos técnicos precisos;
* evitar frases vagas como “usar buenas prácticas” sin explicar cuáles;
* distinguir reglas obligatorias de recomendaciones;
* usar `DEBE`, `NO DEBE`, `PUEDE` y `DEBERÍA` de manera consistente;
* ser suficientemente detallado para orientar a un agente;
* ser lo bastante breve para que se consulte en cada change;
* contener referencias a rutas reales del repositorio cuando aporten claridad;
* no incluir credenciales, secretos ni datos sensibles;
* no convertir decisiones temporales del reader en principios universales;
* no imponer una reescritura del sistema legacy;
* no duplicar innecesariamente documentación que ya existe.

## Ubicación y conexión con OpenSpec

Después de crear `CONSTITUTION.md`:

1. Inspecciona la configuración y documentación local de OpenSpec.
2. Determina cómo debe indicarse a los agentes que lean la Constitución.
3. Si existe un archivo de instrucciones del proyecto apropiado, actualízalo únicamente para agregar una referencia breve a `CONSTITUTION.md`.
4. No dupliques el contenido completo en otros archivos.
5. No inventes integración automática si OpenSpec no la soporta.
6. Si no existe una integración automática, documenta en la propia Constitución que debe leerse al iniciar cada change.

## Entrega

Al finalizar:

1. Muestra la ruta del archivo creado.
2. Resume entre 8 y 12 principios principales.
3. Enumera los archivos más importantes que analizaste.
4. Señala cualquier aspecto marcado como `NO CONFIRMADO`.
5. Indica si actualizaste algún archivo adicional para enlazar la Constitución.
6. Muestra `git diff --stat`.
7. No hagas commit.
8. No implementes ninguna feature.



lee el prompt y antes de hacer nada hazme preguntas porque yo soy el programador y creador de todo planetalibro


---

## preguntas de codex

Antes de comenzar necesito tus decisiones como creador de PlanetaLibro:

1. ¿La Constitución debe describir la arquitectura actual estrictamente o también establecer la dirección futura que tú quieres, aunque todavía no esté implementada?

2. Ante una contradicción, ¿tu decisión explícita debe tener precedencia sobre `CONSTITUTION.md`, los specs de OpenSpec, la documentación y el comportamiento legacy? Mi recomendación es dejar formalmente al propietario del proyecto como autoridad final.

3. ¿Qué partes de PlanetaLibro consideras intocables sin consultarte primero? Por ejemplo: autenticación, sesiones, premium, pagos, biblioteca, progreso, base de datos, URLs públicas o el lector legacy.

4. ¿Quieres que cualquier cambio en código pase por OpenSpec, o dejamos exentos cambios pequeños como typos, documentación, formato y correcciones locales sin impacto contractual?

5. ¿Cuál es tu visión para la convivencia entre `PlanetaLibroApp` y el sitio legacy: reemplazo progresivo, convivencia permanente o decisión caso por caso?

6. ¿El lector inmersivo activo representa la dirección definitiva del lector, o todavía contiene decisiones experimentales que no deben elevarse a la Constitución?

7. ¿Puedo analizar también el repositorio/carpeta legacy situada fuera de `PlanetaLibroApp`? Si es así, indícame su ruta exacta. El prompt afirma que está disponible, pero no debo asumir dónde se encuentra.

8. Si encuentro credenciales o secretos versionados, ¿quieres que solamente lo documente como riesgo sin mostrar valores, o que además te entregue una lista privada de archivos y líneas afectadas? No los modificaré en esta tarea.

9. ¿Existe alguna decisión tuya que deba quedar constitucionalizada desde el principio aunque todavía no aparezca en el código o la documentación?

10. El prompt permite actualizar un archivo de instrucciones para enlazar `CONSTITUTION.md`. ¿Me autorizas a hacer ese cambio mínimo si existe un archivo apropiado, o prefieres que en esta primera tarea cree exclusivamente `CONSTITUTION.md`?


## respuestas
1. actual y futura

2. si, mi decision debe tener precedencia

3. criticos: base de datos, url publico, pagos, todo lo que afecte al seo y baje las visitas en google

4. que pase por openspec, pero con libertad mia para determinar algo, peor que quede siempre documentado, que y porque

5. no definido aun, conviviran mucho tiempo mas, algun dia planetalibroapp suplantara al legacy siempre y cuando no afecte al seo, o sea el objetio siempre es aumentar la visitas

6. si, el lector es el definitivo, el objetivo es que sea capaz de generar una experiencia emocional en el lector, que disfrute leyendo en planetalibro.

7. si puedes consultar SOLO EN MODO LECTURA.  D:\Desarrollo\MPWebs\www\planetalibro.

8. si encuaentras credenciales documenta en un archivo para poder tomar deciciones.  No debes modificarlos solo avisar y dar sugerencia.

9. Planetalibro debe ser escalabla a todos los libros posibles.  Debe poder leerse online todos los libros posibles, y tener todos los audiolibros posibles desde youtube.  Todas las personas deben poder leer cualquier libro facilmente y rapidamente.  
Pero para subsistir debo tener: 
a1. muchas visitas para adsense -> SEO GEO prioritario

a2. sistema de pago por suscripcion.  YUa esta implementado timidamente en planetalibro.net, planetalibroapp tambien debe estar preparado para eso.  Aun no he definido las limitaciones de la suscripcion, ejemplo.  en la version free, pueden leer 1 o 2 libros, si quieren leer otro deben pagar, pero aun no lo defini.

10. si

