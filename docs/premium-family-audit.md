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

## Matriz de evaluación

| Repo | Tier declarado | Tier observado | Estado | Lectura corta |
| --- | --- | --- | --- | --- |
| `anclora-talent` | premium | premium | `fit` | referencia premium más sólida: shell, i18n, theme, components y patterns canónicos |
| `anclora-synergi` | premium | premium | `partial-fit` | identidad premium clara, pero apoyada en tokens y componentes locales |
| `anclora-data-lab` | premium | premium | `partial-fit` | dashboard premium analítico bien enfocado, pero aún sin absorción real del design system |

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

Firma:

- señal
- lectura
- precisión
- dashboard de alto valor
- riqueza visual subordinada a comprensión

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
