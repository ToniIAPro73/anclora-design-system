# Premium Family Audit

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Analizar la familia `premium` sobre repos reales para extraer:

- la esencia compartida del tier
- las variaciones válidas dentro del tier
- los síntomas de cumplimiento parcial
- las necesidades reales que deberá cubrir `ui-ux-pro-max-anclora`

Repos auditados en esta primera pasada:

> **Hueco de cobertura — corregido 2026-08:** la nota anterior decía que ninguna de `energyscan`/`syncxml`/`impulso`/`command-center` tenía cobertura. Impreciso: `anclora-energyscan` sí tenía una entrada preliminar (`candidate / partial / pending visual QA`, ver más abajo), solo `syncxml`, `impulso` y `command-center` carecían de cualquier entrada. Las tres se añaden ahora con auditoría completa; la entrada de `energyscan` se actualiza a `fit` tras verificación de código real (acento, fondo y contenido de la pantalla de resultados confirmados contra el repo fuente).

- `anclora-talent`
- `anclora-synergi`
- `anclora-data-lab`

## Resumen ejecutivo

La familia `premium` ya tiene una identidad reconocible y suficientemente consistente como para derivar una definición operativa.

Su firma común no es “landing bonita” ni “lujo ligero”, sino:

- producto de valor con uso recurrente
- mezcla de marca y operación
- jerarquía fuerte sin teatralidad
- superficies ricas pero legibles
- shell reconocible
- CTA dominante pero disciplinado
- motion selectivo
- localización y tema tratados como parte del producto, no como extra

También aparece una diferencia importante dentro del grupo:

- `anclora-talent` ya actúa como consumidor real del design system y representa el caso más consolidado
- `anclora-synergi` y `anclora-data-lab` expresan bien la intención premium, pero todavía lo hacen con gramáticas locales y no con adopción canónica del sistema
- *(2026-08)* `anclora-energyscan`, `anclora-syncxml`, `anclora-impulso` y `anclora-command-center` confirman el patrón: identidad premium clara por producto, cero adopción sistémica todavía

## Matriz de evaluación

| Repo | Tier declarado | Tier observado | Estado | Lectura corta |
| --- | --- | --- | --- | --- |
| `anclora-talent` | premium | premium | `fit` | referencia premium más sólida: shell, i18n, theme, components y patterns canónicos |
| `anclora-energyscan` | premium | premium | `fit` *(actualizado 2026-08, era candidate/partial)* | MVP funcional de prediagnóstico energético; pantalla de resultados (letra energética, veredicto de viabilidad) verificada contra código real |
| `anclora-synergi` | premium | premium | `partial-fit` | identidad premium clara, pero apoyada en tokens y componentes locales |
| `anclora-data-lab` | premium | premium | `partial-fit` | dashboard premium analítico bien enfocado, pero aún sin absorción real del design system |
| `anclora-syncxml` | premium | premium | `partial-fit` *(añadido 2026-08)* | herramienta de cumplimiento (RD 933/2021) con identidad premium propia, pre-mvp |
| `anclora-impulso` | premium | premium | `fit` *(añadido 2026-08)* | coach de fitness con IA, copy real de producto bien resuelto, mvp-functional |
| `anclora-command-center` | premium | premium | `partial-fit` *(añadido 2026-08)* | panel ejecutivo consolidado; ver nota de conflicto de tier más abajo |

## Evidencia por repo

## `anclora-talent`

Señales fuertes:

- declara explícitamente familia `Premium`
- consume `@anclora/design-system/system.css`
- usa taxonomía completa en el shell:
  - `tier-premium`
  - `domain-human-capital`
  - `archetype-app`
  - `role-consumer`
  - `cluster-core`
  - `product-anclora-talent`
- usa piezas canónicas reales:
  - `ac-button`
  - `ac-surface-panel`
  - `ac-empty-state`
  - `ac-modal`
  - `ac-theme-switcher`
  - `ac-language-switcher`
  - `ac-workflow-shell`
  - `ac-export-suite`
  - `ac-editor-shell`

Lectura UX/UI:

- no es una landing decorativa; es un workspace editorial premium con uso repetido
- combina framing de marca y disciplina operativa
- los controles de idioma y tema están integrados como parte del shell premium
- los modales, vacíos y flujos de edición ya responden a una gramática compartida

Veredicto:

- `fit`

Papel dentro del estudio:

- repo ejemplar para definir el núcleo operativo de `premium`
- principal referencia para decidir qué debe considerarse `canonical`

## `anclora-synergi`

Señales fuertes:

- declara explícitamente familia `Premium`
- cita `ANCLORA_PREMIUM_APP_CONTRACT`
- expresa un portal premium con acceso público, admisión y workspace partner
- mantiene theme, idioma, topbar, hero y formularios como parte del mismo lenguaje de producto

Lectura UX/UI:

- premium con tono editorial y relacional
- más orientado a partnership, admisión y credibilidad que a dashboard analítico
- jerarquía clara y marca propia reconocible
- evita caer en gramática interna pura

Gap principal:

- no consume todavía `@anclora/design-system`
- no usa taxonomía explícita del sistema en el shell
- la gramática premium está resuelta localmente con clases `synergi-*`
- theme toggles, forms, hero, shell y review surfaces existen, pero fuera de la capa canónica compartida

Veredicto:

- `partial-fit`

Interpretación:

- sí pertenece a `premium`
- no está desalineado en identidad
- sí está desalineado en estrategia de adopción del sistema

## `anclora-energyscan` *(actualizado 2026-08 — de stub a evidencia completa)*

Señales fuertes:

- pantalla real de resultados (`assessment/[id]`, 974 líneas) con calificación energética A–G, veredicto de viabilidad de reforma (`feasible`/`feasible_costly`/`infeasible_gap`) y trazabilidad de datos usados en el cálculo
- separación clara entre prediagnóstico gratuito y informe Premium desbloqueable (escenarios, costes, ayudas, PDF)
- identidad de marca verde vívido (`#00DC82`) sobre fondo casi negro, confirmada en `globals.css` con 625 apariciones — no es un acento tímido, es la firma visual dominante de toda la app

Lectura UX/UI:

- fortalezas/debilidades presentadas como listas cortas y accionables, no como informe denso
- el CTA hacia Premium aparece después de entregar valor real gratuito (la calificación), no antes — patrón de confianza, no de bloqueo prematuro
- feasibility verdicts (viable/viable con coste/brecha inviable) evitan la ambigüedad de "puede que funcione"

Gap principal:

- no consume `@anclora/design-system`
- superficies adicionales (wizard, pricing, provider lead section) no auditadas todavía — este veredicto cubre solo la pantalla de resultados, la más representativa del valor del producto

Veredicto:

- `fit`

Papel dentro del estudio:

- confirma que `premium analítico` (perfil ya definido más abajo con `anclora-data-lab` como referencia) también se sostiene en productos de cara al consumidor final, no solo en dashboards internos de inteligencia

## `anclora-syncxml` *(añadido 2026-08)*

Señales fuertes:

- dashboard de reservas real (`ReservationDashboard.tsx`) con estado de validación por reserva (`valid`/`warning`/`error`) y tabla de validación de campos a nivel de detalle
- cumplimiento normativo explícito (RD 933/2021, SES.HOSPEDAJES) con aviso de privacidad sobre datos personales de huéspedes visible en el propio dashboard, no oculto en términos legales
- identidad dorado apagado (`#BFA46A`) sobre navy casi negro, confirmada en variables CSS nombradas (`--accent`, no un valor genérico)

Lectura UX/UI:

- la superficie prioriza estado de cumplimiento por reserva, patrón consistente con otras apps de compliance del ecosistema (`Fiscal`)
- el aviso de privacidad integrado en el flujo (no como modal separado) es una señal de madurez UX poco común en herramientas de compliance, que suelen tratar la privacidad como trámite legal aparte

Gap principal:

- no consume `@anclora/design-system`
- estado `pre-mvp` según el registro de la Bóveda — superficie todavía en construcción, evaluar de nuevo cuando alcance `mvp-functional`

Veredicto:

- `partial-fit` (identidad y patrón de compliance ya resueltos; madurez de producto aún no alcanza el nivel de `talent`/`energyscan`)

## `anclora-impulso` *(añadido 2026-08)*

Señales fuertes:

- copy de producto real y específico, no genérico: "Tu siguiente mejor acción ya está preparada", "Adherencia semanal", "Completa tu base para activar la personalización real"
- patrón de "next best action" (retomar entrenamiento guardado) como CTA principal del dashboard, antes que cualquier métrica
- identidad naranja vívido (`#FF6A00`) confirmada por comentario explícito en el propio código fuente (`/* Accent Orange #FF6A00 */`) — señal de intencionalidad de marca poco ambigua

Lectura UX/UI:

- el dashboard resuelve la tensión típica de apps de fitness (métricas vs. acción) priorizando claramente la acción — la adherencia semanal se muestra, pero no domina la pantalla
- onboarding tratado como nudge secundario, no como bloqueo — coherente con no forzar fricción antes de entregar valor

Gap principal:

- no consume `@anclora/design-system`
- estado `mvp-functional` según el registro de la Bóveda

Veredicto:

- `fit`

Papel dentro del estudio:

- primera referencia premium de la familia orientada a consumidor final recurrente diario (a diferencia de `talent`, uso profesional intermitente) — vale la pena distinguir "premium de uso diario" como posible variación adicional dentro del tier

## `anclora-command-center` *(añadido 2026-08 — nota de conflicto de tier)*

Señales fuertes:

- panel ejecutivo consolidado: KPIs, coste, alertas y tendencia en una sola superficie de síntesis
- identidad púrpura-navy (`#6C63FF` + secundario `#5FA8FF`) confirmada por variables CSS nombradas (`--accent`, `--secondary`) en `src/index.css`

**Conflicto de tier detectado, no resuelto aquí:** este mismo repo aparece más arriba en `internal-family-audit.md` clasificado como `internal executive orchestration` (tier `internal`), citando una implementación en `Boveda-Anclora/dashboard`. Pero el ejemplo de referencia del propio design system (`docs/consuming-from-apps.md`) declara `tier-premium` en su body class (`archetype-command-center role-executive cluster-core`), y el repo real auditado en esta sesión (`anclora-command-center`, independiente) también se comporta como Premium por identidad y contenido. **No decido aquí cuál de las dos clasificaciones es la vigente** — puede que ambas descripciones se refieran a superficies distintas (la implementación embebida en Nexus vs. el repo independiente), o puede que sea una inconsistencia real de taxonomía pendiente de resolver en la Bóveda.

Veredicto:

- `partial-fit` — identidad premium resuelta; pendiente de decisión externa sobre a qué tier pertenece realmente

## `anclora-data-lab`

Señales fuertes:

- declara explícitamente familia `Premium`
- cita `ANCLORA_PREMIUM_APP_CONTRACT`
- se define como capa analítica premium y rechaza explícitamente parecer un dashboard interno genérico
- integra landing pública, acceso privado, backoffice y workspace bajo una misma narrativa

Lectura UX/UI:

- premium más analítico y preciso que `Synergi`
- fuerte sensación de producto serio, curado y recurrente
- shell, métricas, hero, filtros y workspace responden a una misma gramática
- trata tema e idioma como piezas visibles del producto

Gap principal:

- no consume todavía `@anclora/design-system`
- no usa taxonomía explícita del sistema en el shell
- mantiene una implementación premium local con prefijo `datalab-*`
- el lenguaje visual es bueno, pero no convierte aún esa calidad en validación de componentes canónicos compartidos

Veredicto:

- `partial-fit`

Interpretación:

- sí expresa correctamente el tier `premium`
- todavía no sirve como evidencia de adopción canónica del design system

## Esencia compartida de `premium`

Rasgos que sí parecen nucleares en los tres repos:

- el producto se usa, no solo se visita
- la marca importa, pero no manda por encima de la tarea
- la jerarquía visual debe sentirse refinada y robusta
- el primer nivel de UI no puede parecer ni dashboard interno genérico ni landing de marketing estándar
- los CTAs y controles principales tienen presencia fuerte, pero estable
- tema e idioma son parte de la experiencia premium, no accesorios escondidos
- la navegación y los shells tienen que sentirse diseñados, no improvisados

## Variaciones válidas dentro de `premium`

El estudio confirma que `premium` no es monolítico. Admite al menos tres subexpresiones sanas:

### premium editorial-operativo

Referencia:

- `anclora-talent`

Firma:

- workflow
- edición
- modales
- shell de trabajo
- marca integrada en la operación

### premium relacional-editorial

Referencia:

- `anclora-synergi`

Firma:

- admisión
- partnership
- narrativa de confianza
- formularios y accesos privados con tono cuidado

### premium analítico

Referencia:

- `anclora-data-lab`
- `anclora-energyscan` *(añadido 2026-08 — analítico de cara a consumidor final, no solo dashboard interno)*

Firma:

- señal
- lectura
- precisión
- dashboard de alto valor
- riqueza visual subordinada a comprensión

### premium consumidor-diario *(nueva, propuesta 2026-08)*

Referencia:

- `anclora-impulso`

Firma:

- uso recurrente diario (no intermitente/profesional como `talent`)
- patrón "next best action" como CTA dominante, antes que métricas
- onboarding tratado como nudge, no como bloqueo
- copy de producto específico y no genérico

## Anti-patrones detectables para `premium`

Si una app dice ser `premium`, pero cae en alguno de estos síntomas, debería revisarse:

- parece una app interna con una skin más bonita
- parece una landing comercial con demasiada poca robustez operativa
- mezcla demasiadas gramáticas locales para botones, cards, modales y shell
- introduce teatralidad que perjudica tareas repetidas
- esconde idioma o tema como parche en vez de integrarlos en la experiencia
- sostiene la identidad solo con color y blur, sin jerarquía ni estructura

## Implicaciones para `ui-ux-pro-max-anclora`

La futura skill base debe saber distinguir dos tipos de problema:

### problema de identidad de tier

Ejemplos:

- el repo parece `internal`
- el repo parece `portfolio`
- el repo intenta ser `ultra premium` sin rango suficiente

### problema de adopción sistémica

Ejemplos:

- el repo sí parece `premium`, pero no consume las piezas canónicas
- resuelve forms, toggles, shells o overlays fuera del sistema
- tiene una buena interfaz, pero no devuelve aprendizaje reusable al ecosistema

En la familia `premium`, el segundo problema es hoy más frecuente que el primero.

## Conclusión operativa

La esencia de `premium` ya puede considerarse bastante definida.

Lo que falta no es tanto descubrir qué es `premium`, sino:

- consolidar la adopción sistémica en más de un consumidor real
- convertir `Synergi` y `Data Lab` en validadores de piezas compartidas, no solo en buenos ejemplos visuales
- usar esta familia como base para diferenciar con más nitidez `internal` y `ultra premium`

## Siguiente paso recomendado

Seguir con la familia `internal` para contrastar mejor los bordes del sistema.

Eso permitirá responder con más precisión:

- qué rasgos de `premium` son propios
- cuáles son solo herencia de apps bien hechas
- y cuáles podrían confundirse con `internal` si no se delimitan mejor
