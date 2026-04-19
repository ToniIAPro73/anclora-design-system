# System Structure

This folder is the first extraction step from the legacy `colors_and_type.css` file.

Current layers:

- `tokens/core.css`
  Raw cross-ecosystem values: fonts, color seeds, spacing, radii, shadows, motion.
- `tokens/semantic.css`
  Semantic aliases used by foundations and downstream components.
- `taxonomy/`
  Cross-product contracts expressed as composable classes:
  - `tier.css`
  - `domain.css`
  - `archetype.css`
  - `role.css`
  - `clusters.css`
- `themes/product.css`
  Product overrides and backward-compatible aliases for existing previews.
- `foundations/typography.css`
  Text roles and hierarchy primitives.
- `foundations/primitives.css`
  Surface, button, field, shell, layout and status primitives.
- `components/`
  Canonical reusable UI blocks built on semantic tokens and foundations:
  - button
  - surface panel / card
  - app tile
  - metric card
  - section heading
  - language switcher
  - form field
  - sidebar nav
  - tabs
  - breadcrumb
  - subnav
  - stat strip
  - data table
  - empty state
  - toast
  - modal
  - drawer
  - topbar
- `patterns/`
  Reusable compositions documented as contracts by anatomy, slots and restrictions.
- `examples/`
  Executable references by app type. These demonstrate adoption and may include app-specific composition without becoming canonical.
- `system.css`
  Aggregate entrypoint for the extracted system.

Compatibility:

- `colors_and_type.css` remains the root entrypoint for legacy previews and UI kits.
- New work should prefer importing `src/system.css` directly.

Composition model:

- apply taxonomy classes first: `tier-*`, `domain-*`, `archetype-*`, `role-*`, `cluster-*`
- apply a `product-*` class only for product-specific overrides
- build primitives and components on top of semantic tokens, not raw product colors
- treat `patterns/` as reusable composition contracts, not as base components
- treat `examples/` as consumption references, not as canonical API
