# SISTEMA - Adopción Incremental de SDD en Proyectos Legacy

Es totalmente normal que la carpeta de `specs` esté vacía si acabas de iniciar el proyecto en un entorno ya existente (legacy). No necesitas intentar documentar todo tu sistema antiguo de golpe para empezar a ver beneficios. En proyectos *legacy*, la estrategia ganadora es la **adopción incremental**.


## Pasos a seguir
Aquí tienes los pasos recomendados para integrar las directivas generales y empezar a trabajar de forma profesional:

### 1. Crea tu "Constitución" (El paso más importante)
La `CONSTITUTION.md` no es para documentar el código viejo, sino para definir **cómo quieres que sea el código nuevo** y qué reglas debe respetar la IA al interactuar con el código existente. 
*   Ejecuta el comando para crearla (si usas *Spec-Kit* oficial: `spec-kit constitution`).
*   **Define las reglas de oro:** Estándares de testing (cobertura mínima), qué librerías son las permitidas, convenciones de nombres y, muy importante, **restricciones de seguridad** al tocar el código legado.
*   Esto garantiza que, aunque el código antiguo sea un "desastre", el código nuevo que vayas creando siga una arquitectura limpia y controlada.

### 2. Estrategia de "Backfill" incremental
No intentes escribir un `spec.md` gigante para toda tu app. Hazlo funcional:
*   **Por cada nueva funcionalidad o cambio:** Antes de escribir una sola línea de código, crea un archivo `.spec.md` en la carpeta `specs` que describa específicamente la tarea que vas a realizar.
*   **Contexto:** Al definir tu `spec.md`, incluye las dependencias del código legado con el que la nueva funcionalidad debe interactuar. Esto ayuda a la IA a "entender" el contexto sin tener que leer toda la base de código.
*   **Resultados:** A medida que avanzas, tu carpeta `specs` se irá poblando orgánicamente con la documentación de las nuevas partes del sistema. Es mucho más efectivo que intentar hacer arqueología de software en tu código antiguo.

### 3. Checklist para adoptar SDD en Legacy:
*   **No fuerces el pasado:** Acepta que el código legado es "caja negra". Solo documenta y especifica el *interface* o la interacción que necesitas para tu nuevo módulo.
*   **Checkpoint humano:** Como el código antiguo puede ser impredecible, revisa siempre el **Plan Técnico** que genera la IA (fase 3 del flujo que vimos en el video). Asegúrate de que el plan no rompa ninguna dependencia del código existente.
*   **Micro-especificaciones:** Trata cada ticket o tarea como un proyecto pequeño. Define el alcance, los criterios de aceptación y los tests en el archivo `spec.md` antes de invocar la implementación.

**Consejo Pro:** Si el proyecto legacy es muy complejo, usa la IA primero para *entender* y documentar solo las partes que vas a tocar. Puedes pedirle: *"Actúa como un arquitecto senior, analiza este archivo legacy y extrae las reglas de negocio necesarias para crear un spec de este nuevo módulo"*. 


## 1.1 PASOS: Crea tu "Constitución" (El paso más importante) 
La respuesta corta es: **la "Constitución" es un concepto lógico del flujo de trabajo de Spec-Driven Development (SDD), no una característica fija de la herramienta que utilices.**

Si estás usando *OpenSpec*, aunque no llames al comando `constitution` como se hace en *Spec-Kit* de GitHub, **deberías crearla**. En el modelo SDD, la *Constitución* es el archivo donde estableces las reglas inamovibles (tu "contrato" técnico: estándares de testing, arquitectura, librerías prohibidas, etc.).

### ¿Por qué necesitas crearla aunque no te lo pida el software?

1.  **Fuente de verdad única:** La IA (ya sea que uses Codex, Claude Code o cualquier otro agente) necesita un documento de referencia estático al cual acudir antes de implementar cualquier tarea.
2.  **Control sobre el código legado:** Como estás trabajando sobre una *legacy codebase*, tu Constitución debe definir explícitamente **qué límites tiene la IA al modificar código existente**. Por ejemplo: "No modificar los archivos `legacy_core/` sin añadir tests unitarios previos".
3.  **Independencia de la herramienta:** Si decides moverte de *OpenSpec* a otra herramienta en el futuro, tu `CONSTITUTION.md` es un activo de tu proyecto que te llevas contigo; las configuraciones internas de un plugin, no.

### Cómo implementarla manualmente en tu proyecto actual:

Aunque tu carpeta de `specs` esté vacía, crea un archivo llamado `CONSTITUTION.md` en la raíz de tu proyecto o dentro de la carpeta `specs/`. 

**Qué incluir:**
*   **Tech Stack:** Versiones exactas de librerías.
*   **Calidad:** "Todo código nuevo debe tener una cobertura de tests > 80% con `pytest`".
*   **Estilo:** "Seguir PEP8 y tipado estático obligatorio".
*   **Límites:** "Nunca refactorizar el código de producción fuera del alcance del ticket actual".

Si alimentas a tu agente con este archivo como parte del contexto inicial (o si la herramienta que usas te permite configurar un "system prompt" o "project context"), la IA se comportará de forma mucho más predecible, independientemente de si estás usando *OpenSpec* o cualquier otra variante de SDD.


