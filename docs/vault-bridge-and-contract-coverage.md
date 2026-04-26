# Vault Bridge And Contract Coverage

Fecha: 2026-04-26
Repositorio: `anclora-design-system`

## Objetivo

Formalizar la frontera entre la bóveda y este repositorio para que:

- la bóveda siga siendo la autoridad normativa
- este repo sea la autoridad ejecutable
- las apps consumidoras puedan demostrar cumplimiento contra artefactos reales

## Autoridad por capa

### Bóveda

La bóveda de Obsidian sigue siendo la fuente maestra para:

- taxonomía del ecosistema
- contratos normativos
- excepciones aprobadas
- trazabilidad y decision records
- reglas de gobernanza

### `anclora-design-system`

Este repo implementa esos contratos como artefactos consumibles:

- tokens
- semantic tokens
- taxonomía ejecutable
- themes de producto
- foundations y primitives
- componentes canónicos
- patterns
- examples
- previews, fixtures y gates de validación

### Apps consumidoras

Las apps no reinterpretan el contrato desde cero. Deben:

- componer la taxonomía correcta
- consumir `@anclora/design-system/system.css`
- usar componentes y patterns canónicos cuando existan
- justificar cualquier override real como excepción o backlog de contrato

## Fuentes contractuales de la bóveda

La copia maestra vive en `docs/standards/` dentro de la bóveda:

- `ANCLORA_BRANDING_MASTER_CONTRACT.md`
- `ANCLORA_INTERNAL_APP_CONTRACT.md`
- `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`
- `ANCLORA_PREMIUM_APP_CONTRACT.md`
- `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
- `UI_MOTION_CONTRACT.md`

## Regla de sincronización

Cuando la bóveda cambie un contrato:

1. se actualiza el mapping en este documento
2. se identifica qué artefactos del repo quedan afectados
3. se abre backlog si el repo todavía no cubre esa exigencia
4. no se marca el contrato como implementado hasta que exista evidencia ejecutable

Cuando el repo introduzca una API canónica nueva:

1. se registra como artefacto implementable
2. se decide si endurece un contrato existente o solo cubre una necesidad local
3. si endurece un contrato, la bóveda debe apuntar a esta pieza real y no a una descripción abstracta

## Mapa contrato -> artefacto ejecutable

| Contract family | Qué define la bóveda | Artefactos ejecutables en este repo | Estado | Evidencia |
| --- | --- | --- | --- | --- |
| branding master contract | identidad visual, tono, logo, materiales, tipografía, acentos | `src/tokens/core.css`, `src/tokens/semantic.css`, `src/foundations/typography.css`, `src/themes/product.css`, `assets/logos/`, `README.md` | implemented | sistema consumible y previews vivas |
| tier app contracts | diferencias entre `internal`, `portfolio`, `premium`, `ultra premium` | `src/taxonomy/tier.css`, `docs/tier-taxonomy-and-transformations.md`, `preview/taxonomy-contracts.html`, `preview/components-canonical.html` | implemented | preview contractual + taxonomía ejecutable |
| domain / archetype / role / cluster contracts | clasificación de productos y combinaciones válidas | `src/taxonomy/domain.css`, `src/taxonomy/archetype.css`, `src/taxonomy/role.css`, `src/taxonomy/clusters.css`, `docs/consuming-from-apps.md` | implemented | composición documentada para consumidores |
| ui motion contract | hover, press, focus, sweep, reduced motion y familias de superficie | `src/tokens/core.css`, `src/foundations/primitives.css`, `src/components/button.css`, `src/components/surface-panel.css`, `src/components/topbar.css`, `README.md` | implemented | previews + reglas integradas en foundations/components |
| localization contract | ES-first, expansión de copy, labels robustos y cambio de idioma | `preview/localization-fixtures.html`, `src/components/form-field.css`, `src/components/language-switcher.css`, `docs/phase-4-live-docs-and-validation.md` | partially implemented | fixture y componentes listos, pero falta evidencia multi-consumer |
| modal / overlay contract | overlays, backdrop, disciplina de capas, tamaños y comportamiento | `src/components/modal.css`, `src/components/drawer.css`, `src/components/preview-overlay.css` | partially implemented | componentes existen, pero falta bridge documental fino con states/variants |
| navigation shell contract | topbar, sidebar, subnav, breadcrumb, shell persistente | `src/components/topbar.css`, `src/components/sidebar-nav.css`, `src/components/subnav.css`, `src/components/breadcrumb.css`, `src/examples/internal/`, `src/examples/premium/` | partially implemented | base reusable disponible, pero falta matriz formal por tier |
| data display contract | metric cards, stat strips, tables y empty states | `src/components/metric-card.css`, `src/components/stat-strip.css`, `src/components/data-table.css`, `src/components/empty-state.css` | partially implemented | piezas listas; falta cobertura contractual por familia de app |
| pattern contracts | shells, hero, grids, admission, executive summary, workspace | `src/patterns/`, `src/examples/`, `docs/patterns-and-examples-structure.md`, `docs/validated-consumers-matrix.md` | partial | algunos patterns canonizados por `anclora-talent`, otros siguen en candidate |
| governance / verification contract | qué gates permiten cerrar una fase o declarar una pieza estable | `docs/quality-and-verification.md`, `docs/phase-4-live-docs-and-validation.md`, `scripts/verify-manifest.mjs`, `scripts/verify-html.mjs`, `scripts/verify-browser.mjs` | implemented | verify + browser + a11y + snapshots |

## Mapa artefacto -> contrato

| Repo artifact | Contract families cubiertas | Notas |
| --- | --- | --- |
| `src/tokens/` | branding, motion, surfaces | base transversal; no debe capturar decisiones de app específica |
| `src/taxonomy/` | tier, domain, archetype, role, cluster | traduce taxonomía normativa a clases componibles |
| `src/themes/product.css` | branding, producto | solo overrides concretos donde la taxonomía no basta |
| `src/foundations/` | branding, motion, surface behavior, text roles | puente entre tokens y componentes |
| `src/components/` | modal, navigation, forms, data display, shell | API reusable y endurecible por consumidor real |
| `src/patterns/` | hero, workspace, executive, entry | composiciones reutilizables sujetas a validación por adopción |
| `src/examples/` | aplicación de contratos por tipo de app | referencia de consumo, no API canónica |
| `preview/` | contratos, fixtures y verificación visual | evidencia navegable para taxonomía, themes, componentes y localización |
| `scripts/verify-*.mjs` | governance / verification | gates ejecutables que evitan regresiones silenciosas |

## Tabla de cobertura contractual actual

| Contract family | Coverage level | Real consumer evidence | Gap principal |
| --- | --- | --- | --- |
| branding master | high | indirecta en todo el repo | falta empaquetar do/dont y uso de logos como guía formal separada |
| tier contracts | high | `anclora-talent` en premium, previews para resto | falta evidencia multi-consumer para `internal`, `portfolio` y `ultra premium` |
| domain / archetype / role / cluster | medium-high | `anclora-talent`, examples y docs de consumo | falta matriz explícita por producto real adicional |
| ui motion | high | previews y foundations activas | falta consumidor real fuera de premium editorial |
| localization | medium | fixture de Fase 4 | falta validación en apps reales ES/EN/DE |
| modal / overlay | medium | componentes listos | falta contrato operacional más preciso y consumidor real documentado |
| navigation shell | medium | `topbar`, `sidebar`, `subnav`, `breadcrumb` y examples | falta bridge por tier y archetype |
| data display | medium | metric card, stat strip, data table, empty state | falta mapping a contratos de dashboard/ops/executive |
| patterns | medium | stack workspace validado por `anclora-talent` | entry/executive siguen sin consumidor real |
| governance / verification | high | `npm run verify` + snapshots | falta diff automatizado contra baseline |

## Regla de promoción contractual

Un contrato no debería marcarse como `implemented` solo porque el repo tiene CSS o una preview.

Para subir de estado:

- `draft`
  existe la definición normativa en bóveda, pero el repo todavía no tiene una implementación fiable

- `partially implemented`
  hay artefactos ejecutables, pero faltan variantes, documentación fina o evidencia de consumidor real

- `implemented`
  el repo ya tiene artefactos explícitos, documentación operativa y gates razonables

- `validated by consumer`
  además de lo anterior, al menos una app real lo consume sin fork estructural

## Impacto inmediato en la bóveda

La bóveda ya puede referenciar este repo como implementación de:

- taxonomía por tiers
- foundations visuales
- motion de superficies
- componentes canónicos base
- workspace patterns premium validados
- gates mínimos de validación visual y estructural

La bóveda todavía no debería endurecer como plenamente validados:

- patterns de entry sin consumidor real
- patterns ejecutivos sin consumidor real
- localización multi-idioma como contrato ya consolidado en apps reales
- overlays/modales como contrato completamente formalizado más allá de la capa visual
