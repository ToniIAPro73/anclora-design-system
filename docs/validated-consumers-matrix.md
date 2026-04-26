# Validated Consumers Matrix

Fecha: 2026-04-20
Repositorio: `anclora-design-system`

## Objetivo

Evitar dos errores frecuentes:

- declarar una pieza como canonica solo porque existe en este repo
- dejar que una app consumidora rehaga localmente una pieza ya validada

Esta matriz separa tres estados:

- `candidate`: existe en el design system, pero todavia no esta validada por consumo real
- `validated`: ya fue consumida por al menos una app real sin fork estructural
- `canonical`: debe consumirse desde este repo y no debe rehacerse localmente

## Consumidores registrados

### `anclora-talent`

Taxonomia:

- `tier = premium`
- `domain = human_capital`
- `product_archetype = app`
- `system_role = consumer`

Estado:

- primer consumidor real del stack premium editorial

## Matriz actual

| Layer | Piece | Status | Contract families | Consumer evidence | Notes |
| --- | --- | --- | --- | --- | --- |
| taxonomy | shell taxonomy composition | canonical | tier, domain, archetype, role, cluster | `anclora-talent` | mezcla real de `tier`, `domain`, `archetype`, `role`, `cluster`, `product` |
| components | button | canonical | branding, motion, action semantics | `anclora-talent` | usado en auth, dashboard, editor, dialogs y acciones de preview/export |
| components | card | canonical | branding, surface, hierarchy | `anclora-talent` | usado en dashboard y paneles editoriales |
| components | surface panel | canonical | branding, surface, shell | `anclora-talent` | usado en auth, forms, AI, collaboration e import |
| components | form field | canonical | forms, localization, hierarchy | `anclora-talent` | usado en create project, dialogs y formularios de superficies |
| components | empty state | canonical | data display, hierarchy, copy density | `anclora-talent` | usado en dashboard, projects, AI, collaboration y errores |
| components | modal | canonical | modal, overlay, motion | `anclora-talent` | usado en add/import chapter y preview overlays alineados |
| components | theme switcher | canonical | branding, theme governance | `anclora-talent` | usado en shell |
| components | language switcher | canonical | localization | `anclora-talent` | usado en shell |
| components | stepper | canonical | workflow, hierarchy, motion | `anclora-talent` | usado en preview/export y flujos editoriales |
| patterns/workspace | editorial-workspace-stage | canonical | workspace, premium app contract | `anclora-talent` | adoptado en cover, back-cover, editor y preview |
| patterns/workspace | editorial-workflow-shell | canonical | workspace, navigation shell | `anclora-talent` | adoptado en shell guiado de proyecto |
| patterns/workspace | editorial-template-catalog | canonical | workspace, data display | `anclora-talent` | adoptado en selector de templates |
| patterns/workspace | editorial-chapter-rail | canonical | workspace, navigation shell | `anclora-talent` | adoptado en organizer de capitulos |
| patterns/workspace | editorial-preview-controls | canonical | workspace, overlay, motion | `anclora-talent` | adoptado en preview modal |
| patterns/workspace | editorial-export-suite | canonical | workspace, workflow | `anclora-talent` | adoptado en export block |
| patterns/workspace | editorial-chapter-editor-shell | canonical | workspace, shell, hierarchy | `anclora-talent` | adoptado en editor avanzado |
| patterns/workspace | editorial-rich-text-editor | canonical | workspace, forms, hierarchy | `anclora-talent` | adoptado en editor avanzado |
| patterns/entry | premium-hero-split | candidate | premium, portfolio, ultra premium entry | none | existe como patron, pero falta consumo real validado |
| patterns/entry | ecosystem-app-grid | candidate | entry, ecosystem navigation | none | existe como patron, pero falta consumo real validado |
| patterns/executive | executive-summary-band | candidate | executive, premium app contract | none | pendiente de validacion por command center o similar |

## Regla operativa

Cuando una app del ecosistema necesite una pieza en estado `canonical`:

- debe consumirla desde `anclora-design-system`
- no debe rehacer localmente primitives o patterns equivalentes

Cuando una pieza este en estado `candidate`:

- puede usarse como referencia
- no debe imponerse todavia como API compartida estable
- necesita al menos un consumidor real antes de endurecer contratos de grupo o de app

## Siguiente ola recomendada

Los siguientes repos con mayor retorno para ampliar esta matriz son:

1. `anclora-command-center`
2. `anclora-content-generator-ai`
3. `anclora-portfolio`

Eso permitiria validar:

- patrones ejecutivos
- patrones internal operativos
- patrones portfolio/editoriales de marca

## Relacion con cobertura contractual

Esta matriz no sustituye la cobertura contractual formal.

Su uso correcto es:

- `docs/vault-bridge-and-contract-coverage.md`
  define el mapa contrato -> artefacto -> nivel de cobertura

- `docs/validated-consumers-matrix.md`
  demuestra que piezas concretas ya tienen consumo real sin fork estructural

Una pieza puede estar `implemented` a nivel contractual y seguir sin estar `validated by consumer`.
