# System Structure

This folder is the first extraction step from the legacy `colors_and_type.css` file.

Current layers:

- `tokens/core.css`
  Raw cross-ecosystem values: fonts, color seeds, spacing, radii, shadows, motion.
- `tokens/semantic.css`
  Semantic aliases used by foundations and downstream components.
- `themes/product.css`
  Current theme scopes. This is still an intermediate layer and should later split into:
  - `tier/`
  - `domain/`
  - `product/`
- `foundations/typography.css`
  Text roles and hierarchy primitives.
- `foundations/primitives.css`
  Surface, button, field, shell and status primitives.
- `system.css`
  Aggregate entrypoint for the extracted system.

Compatibility:

- `colors_and_type.css` remains the root entrypoint for legacy previews and UI kits.
- New work should prefer importing `src/system.css` directly.
