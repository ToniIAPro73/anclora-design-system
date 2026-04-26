# Adoption Stress-Test Lessons

Use this file for external repo adoptions validated against Anclora profiles.

Reference case:

- `calculadora-fiscal-183-premium`

## Non-negotiable checks

Before calling an adoption `fit` or `adoption-success`, verify:

- the header remains visually present while scrolling
- sticky navigation keeps a solid or disciplined glass background
- overlays and modals are fully readable, not weakly translucent
- onboarding and other dialogs open centered in the viewport
- hero/support cards explain the product value, not the meta-story of adoption
- theme switching produces a clearly perceptible visual change
- language and theme controls are intentional, aligned, and premium in finish
- select menus, popovers, and dropdowns remain legible in every theme
- local theme overrides actually win against imported design-system tokens

## Common failure modes

### False premium through transparency

Symptoms:

- modals look washed out
- legal surfaces feel half-open instead of protected
- content behind the overlay competes with the foreground

Correction:

- strengthen overlay contrast
- increase panel opacity
- avoid relying on blur alone to signal quality

### Meta-adoption leaking into the product surface

Symptoms:

- cards explain the adoption process more than the product
- hero support modules talk about profile target or stress-test logic
- users learn about transformation instead of utility

Correction:

- keep adoption framing secondary
- make support cards explain user value, workflow, trust, or output

### Cosmetic theme toggle

Symptoms:

- dark/light mode changes state but barely changes perception
- only tiny accents shift while surfaces stay effectively identical

Correction:

- define real theme deltas across canvas, panel, border, text, and overlay
- verify screenshots in both themes before closing the task

### Theme toggle blocked by token precedence

Symptoms:

- the toggle changes app state but computed colors stay on the previous palette
- light mode keeps dark `--surface-panel` / `--text-primary` values
- the surface looks washed out because light backgrounds are paired with dark-theme tokens

Correction:

- inspect computed custom properties, not only screenshots
- verify whether local overrides live inside a weaker CSS layer than imported system tokens
- avoid binding an external stress-test to a product taxonomy class that hard-locks a product palette unless that is explicitly intended

### Weak utility controls

Symptoms:

- language toggle floats awkwardly
- theme switch looks like leftover tooling
- fiscal year dropdown is readable only in one theme

Correction:

- group controls intentionally in the topbar
- style them as premium product controls, not debug affordances
- visually verify expanded dropdown states

## Required visual verification

For external adoption work, always capture at least:

- home in default theme
- home in alternate theme
- one open dropdown or select
- one open modal or onboarding surface

Do not close the adoption without checking those states.
