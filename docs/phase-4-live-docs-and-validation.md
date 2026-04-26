# Phase 4: Live Docs And Validation

Fecha: 2026-04-26
Repositorio: `anclora-design-system`

## Qué añade esta fase

- una portada navegable de docs vivas en `preview/index.html`
- un fixture explícito de localización en `preview/localization-fixtures.html`
- smoke checks browser-based con Playwright
- verificación básica de accesibilidad con Axe
- snapshots de desktop y mobile en `artifacts/visual-baselines/`

## Superficie viva

Entrada recomendada:

- `preview/index.html`

Desde ahí se enlazan:

- previews contractuales
- families de theme
- fixture de localización
- examples por tipo de app
- guías de consumo y verificación

## Scripts

`npm run verify:browser`
- abre previews críticas en desktop y mobile
- valida que cargan y que sus selectores principales existen

`npm run verify:a11y`
- ejecuta una auditoría básica sobre estructura y nombres accesibles
- comprueba `title`, `lang`, `main`, regiones y labels

`npm run verify:snapshots`
- regenera snapshots de las previews cubiertas
- deja artefactos en `artifacts/visual-baselines/`

`npm run verify`
- ejecuta manifest, html, smoke browser, accesibilidad básica y package dry-run

## Gate mínimo de cierre

La fase no está cerrada si:

- `preview/index.html` deja de ser la entrada clara a la superficie viva
- no existe fixture explícito para textos largos y cambio de idioma
- los checks browser-based no cubren desktop y mobile
- no hay snapshots regenerables para taxonomía, themes, componentes y localización
