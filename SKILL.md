---
name: anclora-design
description: Use this skill to generate well-branded interfaces and assets for Anclora Group (the connected ecosystem of AI-first products — Group portal, Private Estates, Nexus, Synergi, Data Lab, Content Generator, Advisor AI, Talent, Impulso, Command Center), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files:

- `README.md` — full design system: ecosystem map, content fundamentals, visual foundations, iconography, index.
- `colors_and_type.css` — canonical CSS variables (colors, type, spacing, radii, shadows, motion) scoped per product.
- `assets/logos/` — the 10 product medallions (PNG). Use at source resolution; never recolor.
- `ui_kits/anclora-group/`, `ui_kits/anclora-private-estates/`, `ui_kits/anclora-synergi/` — pixel-faithful JSX recreations of each product, each with `README.md`, `index.html`, and component files.
- `preview/` — small specimen cards showing individual tokens/components in isolation.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of this skill folder and create static HTML files for the user to view. Link `colors_and_type.css`, import the matching UI kit's components, and work inside the product-specific class scope (e.g. `.group-scope`, `.pe-scope`, `.synergi-scope`) to inherit the correct palette automatically.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. Respect the non-negotiables: no emoji, Spanish-first voice, eyebrow+display+body triplet on hero sections, dark-first canvases, coin medallions never recolored, Lucide icons only (stroke 1.5–2px, currentColor), and the UI Motion Contract (`docs/anclora-group-UI_MOTION_CONTRACT.md` in the seed — summarized in README §4).

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (which product surface, audience tier, Spanish vs English, static vs interactive, whether they want variations), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
