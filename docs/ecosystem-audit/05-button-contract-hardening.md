# Button Contract Hardening — Wave 1.5

Fecha: 2026-09-21. Motivado por hallazgos reales del Wave 1 Pilot 1 (`anclora-talent`, commit `6d1cea7`, rama `feat/design-system-wave1-button-migration`, no mergeada). No se modifica ningún repo consumidor en este trabajo.

---

## 1. Análisis de cascada — ¿por qué no se "arregla" en este release?

El pilot encontró que `anclora-talent`'s propio override de `.ac-button` (radio/tipografía de marca) tenía la MISMA especificidad que `.ac-button--compact` (ambos selectores de una sola clase) y, al estar declarado más tarde en el archivo compilado, ganaba silenciosamente — anulando la variante compacta en cualquier elemento que llevara ambas clases. Talent lo resolvió localmente con `:not(.ac-button--compact)`.

**Opciones evaluadas para endurecer esto desde el propio Design System:**

| Opción | Veredicto | Razón |
| --- | --- | --- |
| **A. CSS Cascade Layers** (`@layer anclora-design-system;` envolviendo todo el CSS del paquete) | Rechazada para este release | Elevaría el DS por encima de CUALQUIER CSS de consumidor no explícitamente incluido en una layer posterior — rompería el mecanismo de personalización sancionado (`--ac-button-bg`, etc., pensado para que el consumidor lo sobreescriba). Es un cambio de distribución con superficie de ruptura real, no algo para una tarea "pequeña y acotada". |
| **B. Subir la especificidad de TODOS los modificadores existentes** (`.ac-button.ac-button--compact`, `.ac-button.ac-button--primary`, etc.) | Rechazada para este release | Cambia el comportamiento de cascada para selectores que YA tienen consumidores reales en producción (`anclora-talent`, `anclora-command-center`) — riesgo de romper composiciones que hoy dependen (aunque sea sin saberlo) del orden de cascada actual. Cambio de mayor alcance, se propone como mejora futura, no se ejecuta aquí. |
| **C. Subir la especificidad SOLO del nuevo `.ac-button--icon`** | **Aplicada** | Selector nuevo, cero consumidores existentes, cero riesgo de ruptura. Resuelve exactamente el mismo tipo de fallo para la nueva capacidad sin tocar nada existente. |
| **D. Documentar el contrato de precedencia + patrón de mitigación (`:not()`) para los modificadores existentes** | **Aplicada** | Sin cambio de código, cero riesgo, da a cualquier consumidor futuro (incluido un agente de código) la información necesaria para no repetir el bug de Talent. |

**Conclusión:** `.ac-button--icon` usa el selector compuesto `.ac-button.ac-button--icon` (mayor especificidad, inmune al fallo de Talent). `.ac-button--compact` y el resto de modificadores existentes NO cambian de especificidad en este release — el contrato de precedencia queda documentado en `button.css` (bloque de comentario "Modifier precedence contract") y aquí.

**Mejora mayor propuesta, no ejecutada:** evaluar Cascade Layers en una versión futura donde el propio DS controle también el punto de entrada de importación de cada consumidor (p. ej. si `system.css` se convierte en el único punto de importación soportado, podría envolver sus propias reglas en `@layer anclora.core` y documentar que la personalización de un consumidor debe ir en una layer declarada explícitamente después). Esto es un cambio de arquitectura de distribución, no de un componente — se dimensiona como su propia iniciativa, no como parte de Wave 1.5.

**Cobertura de regresión añadida:** `tests/button-contract.test.mjs` (Node, sin dependencias) verifica mecánicamente que:
- `.ac-button--icon` existe y usa el selector compuesto `.ac-button.ac-button--icon` (no una forma de especificidad menor).
- El bloque de comentario del "Modifier precedence contract" sigue presente en el archivo (evita que una futura edición lo borre por accidente).
- `--compact` y `--icon` siguen siendo selectores de una sola declaración cada uno (no se fusionaron por error).

Esto no puede probar el comportamiento de cascada en un consumidor externo real (eso requeriría el propio código del consumidor), pero sí evita que el propio `button.css` regrese silenciosamente a un estado sin el endurecimiento.

---

## 2. Revisión de los overrides de tipografía de `anclora-talent` (Sección 7 del mandato)

Re-evaluados contra el estado ACTUAL de `anclora-talent` en su rama de pilot (`feat/design-system-wave1-button-migration`, commit `6d1cea7`) — no se modifica Talent, esto es solo clasificación para el registro.

Propiedades que permanecen en la regla local `.ac-button:not(.ac-button--compact)` de Talent (`src/app/globals.css`):

| Propiedad | Valor local | ¿Tiene extension point sancionado hoy? | Clasificación |
| --- | --- | --- | --- |
| `--ac-button-radius` (antes `border-radius` directo) | `18px` | **Sí** — `--ac-button-radius`, añadido en DS 0.5.0 | **A. supported product token configuration** — ya migrado correctamente por el propio pilot |
| `font-size` | `0.92rem` | No | **E. unsupported anatomy override** |
| `font-weight` | `800` | No | **E. unsupported anatomy override** |
| `letter-spacing` | `-0.015em` | No | **E. unsupported anatomy override** |
| `padding-inline` | `22px` | Parcial — existe `--ac-button-padding-x`, pero Talent usa la propiedad CSS directa en vez del custom property | **C. legacy drift** (podría migrarse a `--ac-button-padding-x: 22px` sin cambiar el valor ni el resultado visual — no se hace aquí porque significa tocar Talent, fuera de alcance de esta tarea, pero se registra como acción de seguimiento trivial para el propio pilot) |
| `text-transform: none` | — | No (el DS no expone un token de text-transform) | **D. legitimate product-specific requirement** — Talent es una SaaS editorial con CTAs en "sentence case" (p. ej. "Comenzar ahora"), no en mayúsculas; esto es identidad de producto real, no un capricho |

**Sobre `font-weight: 800` específicamente (pregunta explícita del mandato):** no se sanciona un nuevo token de componente para esto en este release. Razón: el peso tipográfico es una de las palancas más directas del "core typography contract" (ver `ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §11, "CORE debe poseer... el modelo tipográfico") — abrir un `--ac-button-font-weight` de facto legitimaría que cualquier producto reescriba la voz tipográfica de sus acciones sin ninguna restricción de rango. Si en una futura ronda 2+ productos demuestran la misma necesidad real (no solo Talent), la vía correcta es una **variante de énfasis tipográfico acotada** (p. ej. `.ac-button--emphasis` con un rango de peso limitado, 600–800, documentado), no un token abierto. Por ahora, `font-weight`/`font-size`/`letter-spacing` permanecen clasificados **E** — drift real, tolerado como identidad de marca ya en producción, no legitimado como parte del contrato Core.

**No se debilita el contrato Core de tipografía para legitimar este CSS histórico** — se documenta honestamente como excepción conocida, no como "correcto".

---

## 3. Resumen para el manifest / agentes de código

Un agente que necesite "un botón cuadrado de icono de 36px para un menú" debe recibir la respuesta: usar `ac-button ac-button--compact ac-button--icon` (+ variante de color), nunca crear una clase local. Ver `design-system.manifest.json` (`extensionPoints.button`, `prohibitedPatterns`) para el contrato legible por máquina correspondiente.
