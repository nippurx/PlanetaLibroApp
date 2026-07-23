## Context

PlanetaLibroApp convive con PlanetaLibro legacy y la implementación actual de sus sesiones se conserva sin cambios en este change. La API necesita saber si existe una sesión válida y qué identidad o capacidades necesita cada operación, pero no debe conocer de dónde provienen esos datos ni cómo Legacy conserva, renueva o invalida una sesión.

La Constitución exige que las reglas críticas de autorización se normalicen mediante adaptadores, que la API use contratos JSON consistentes y que cambios de autenticación o sesión tengan revisión de seguridad. Los detalles concretos del mecanismo actual de sesión, sus cookies, tablas y ciclo de vida están **NO CONFIRMADOS** y no se infieren en este diseño.

## Goals / Non-Goals

**Goals:**

- Definir una frontera única entre los consumidores de sesión de la API y Legacy.
- Hacer que los consumidores trabajen con un contexto de sesión de aplicación, no con mecanismos de almacenamiento o transporte de Legacy.
- Permitir sustituir o mejorar el mecanismo interno de sesiones de Legacy preservando el contrato de la API.
- Mantener respuestas de sesión seguras y compatibles con los contratos ya expuestos.

**Non-Goals:**

- Reemplazar, refactorizar o modificar el sistema de sesiones de PlanetaLibro legacy.
- Definir un nuevo esquema de login, cookies, tokens, roles, suscripciones o permisos.
- Cambiar tablas, rutas públicas, URLs, SEO/GEO o contratos de los endpoints existentes.
- Exponer el contexto de sesión directamente al frontend salvo que un endpoint lo requiera y lo especifique.

## Decisions

### Adaptador único de resolución de sesión

La API incorporará un adaptador de infraestructura —el nombre, archivo y firma concretos se decidirán tras inspeccionar los entrypoints PHP— que será el único lugar autorizado para invocar la función de Legacy que resuelve la sesión. El adaptador obtiene de Legacy un resultado encapsulado y lo traduce a un contexto de sesión de aplicación.

Se elige un adaptador sobre llamadas directas desde cada endpoint porque concentra la dependencia histórica, facilita pruebas con sustitutos y evita que reglas nuevas queden repartidas. Como alternativa se consideró permitir que cada controlador leyera el estado de Legacy; se descarta porque acopla múltiples puntos de la API al detalle que precisamente debe poder cambiar.

### Contexto mínimo, orientado a necesidades de la API

El contrato interno expondrá únicamente el estado de autenticación y, cuando una operación lo necesite, una referencia de usuario estable y las capacidades de autorización necesarias. No expondrá identificadores de cookie o sesión, tokens, variables globales, nombres de tablas, ni datos personales que el endpoint no requiera.

Se elige un contexto mínimo para reducir el acoplamiento y la superficie sensible. Como alternativa se consideró devolver la estructura completa de sesión de Legacy; se descarta porque convertiría esa estructura en un contrato implícito de PlanetaLibroApp.

### Límites de uso y errores

Fuera del adaptador, la API no leerá ni escribirá directamente cookies, variables de sesión, almacenamiento o reglas de renovación/invalidez de Legacy. El adaptador traducirá sesión ausente, inválida o no autorizada al resultado de autenticación/autorización previsto por cada contrato API, sin filtrar la causa interna ni información sensible.

Se conserva la semántica pública existente en lugar de introducir códigos o cuerpos nuevos sin evidencia. Como alternativa se consideró normalizar todos los endpoints en este change; se descarta porque ampliaría el alcance y podría romper compatibilidad.

## Risks / Trade-offs

- [El mecanismo real de Legacy puede requerir inicialización o entrypoints específicos] → Antes de implementar se inspeccionarán includes, cookies, sesiones y consumidores en modo lectura y se documentará la función envolvente elegida.
- [Un contexto demasiado reducido podría no cubrir un endpoint futuro] → El contrato se ampliará solo con requisitos explícitos, revisión de seguridad y compatibilidad; no se filtrará el estado completo de Legacy por conveniencia.
- [La migración puede alterar por error respuestas de endpoints autenticados] → Se conservarán las respuestas públicas verificadas y se crearán pruebas o requests reproducibles para sesión válida, ausente e inválida.
- [El adaptador podría convertirse en un punto único frágil] → Se mantendrá pequeño, sin reglas de negocio ajenas, y se probará mediante una implementación sustituible de Legacy.

## Migration Plan

1. Identificar en modo lectura los entrypoints de API, la función Legacy disponible y los consumidores actuales de sesión.
2. Acordar y documentar la firma del adaptador y el contexto mínimo basados en esa evidencia.
3. Migrar un consumidor a la vez, preservando sus respuestas de autenticación/autorización.
4. Validar los casos autenticado, anónimo, inválido y no autorizado que correspondan a cada endpoint.
5. Retirar lecturas directas de detalles de Legacy solo después de comprobar que no tienen consumidores restantes dentro de la API.

El rollback consiste en restaurar el consumidor afectado a su integración previa, sin tocar la implementación de sesiones de Legacy. No hay migraciones de base de datos ni cambios destructivos previstos.

## Open Questions

- **NO CONFIRMADO:** cuál es la función concreta de Legacy, su ubicación y los prerequisitos para resolver una sesión.
- **NO CONFIRMADO:** qué endpoints actuales consumen sesión directamente y qué campos mínimos necesita cada uno.
- **NO CONFIRMADO:** las convenciones públicas actuales para respuestas de sesión ausente, inválida y no autorizada.
- **NO CONFIRMADO:** las capacidades o atributos de usuario que requiere la API más allá de la identidad autenticada.
