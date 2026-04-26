---
name: ui-ux-pro-max-anclora
description: Use when auditing, refining, or validating UX/UI work for Anclora ecosystem apps after profile analysis or design-system adoption. Best for distinguishing profile fit, separating design-system gaps from repo-local issues, and applying final UI/UX polish aligned with Anclora contracts across Real Estate and internal surfaces.
---

# ui-ux-pro-max-anclora

Use this skill when the task is not generic UI work, but Anclora-specific UX/UI evaluation or refinement.

Typical triggers:

- post-adoption review of a consumer repo
- deciding whether a screen is `fit`, `partial-fit`, or `misaligned`
- separating design-system debt from repo-local debt
- refining a surface to match its Anclora profile
- checking whether a repo feels like the right tier and role

Do not use this skill for:

- generic frontend implementation with no Anclora context
- low-level bug fixing unrelated to UX/UI profile
- replacing missing design-system primitives with ad hoc polish

## Core workflow

1. Identify the real profile of the app or surface.
2. Load the relevant profile reference file.
3. Classify issues into:
   - design-system gap
   - repo-local gap
   - final polish gap
4. Only after that, propose or apply UI/UX refinements.
5. Before closing, visually verify scroll behavior, overlays, dropdowns, and both themes.

## Decision model

Always read:

- `references/decision-model.md`

Then load only one relevant family file:

- `references/real-estate-profiles.md`
- `references/internal-profiles.md`

For external repo transformations or stress-tests, also read:

- `references/adoption-stress-test-lessons.md`

If you already know the exact target profile, prefer the dedicated variant file instead:

- `references/variants/ultra-premium-core-platform.md`
- `references/variants/ultra-premium-market-entry-landing.md`
- `references/variants/premium-analytical.md`
- `references/variants/premium-relational.md`
- `references/variants/internal-operational-vertical.md`
- `references/variants/internal-production-studio.md`
- `references/variants/internal-expert-assistant-workspace.md`
- `references/variants/internal-executive-orchestration.md`
- `references/variants/internal-ecosystem-gateway.md`

## Rules

- Do not flatten all Anclora apps into one visual language.
- Respect i18n, theme, shell, and established patterns unless the task is explicitly about changing them.
- Prefer fixing navigation focus, hierarchy, spacing, density, CTA tone, and copy before introducing new ornamental ideas.
- If the problem repeats across apps, treat it as a design-system candidate.
- If the structure is already correct and only the finish is weak, treat it as polish.
- Never approve an external adoption if one theme or expanded state becomes hard to read.
- Theme switching only counts as successful when the resulting surface is still legible and premium in both modes.
- If theme output looks inconsistent, inspect computed design tokens before tweaking colors by eye.

## Outputs this skill should produce

- profile diagnosis
- fit status: `fit`, `partial-fit`, or `misaligned`
- issue split: system vs local vs polish
- recommended correction path

## Notes for adoption work

For adoptions such as `calculadora-fiscal-183-premium`, use this order:

1. absorb `anclora-design-system`
2. evaluate against target profile
3. fix structural mismatches
4. only then apply polish

Do not use this skill as a shortcut around a weak adoption.
