<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

# Anclora Design System

### Executable brand and UI system for the Anclora ecosystem

[Español](./README.md) · **English**

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Documentation](https://img.shields.io/badge/documentation-premium-BFA46A)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN-047857)

</div>

---

> [!IMPORTANT]
> Reduced public repository. Describes the product and its conceptual architecture; it does not expose operational logic, secrets or real data.

## What this is

Anclora Group's shared design system: design tokens, foundations and executable (not just documented) components consumed by the ecosystem's products to keep a consistent visual identity without duplicating CSS or brand decisions across repositories.

## What it contains

| Folder | Content |
| --- | --- |
| `src/tokens/` | Design tokens (`core.css`, `semantic.css`) — the source of truth for color, spacing and scales |
| `src/foundations/` | Base primitives and typography |
| `src/themes/` | Per-product themes |
| `src/components/` | Executable UI components |
| `src/patterns/` | Reusable composition patterns |
| `ui_kits/` | Product-specific UI kits (`anclora-group`, `anclora-synergi`, `anclora-private-estates`) |
| `assets/logos/` | Official logo library for every product in the ecosystem |
| `docs/` | System documentation |

## Technology

| Area | Detail |
| --- | --- |
| Node.js | Yes |
| CSS | Tokens and foundations in plain CSS (custom properties) |

## Documentation

- [Documentation](./docs)

## Brand

- Canonical product: `anclora-design-system`
- Family: `shared`
- Target visibility: `public`

---

<div align="center">

### Antonio Ballesteros · Anclora Group

Software, generative AI and automation for traceable digital products.

</div>
