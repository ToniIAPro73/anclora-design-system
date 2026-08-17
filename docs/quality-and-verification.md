# Quality And Verification

Fecha: 2026-04-20
Repositorio: `anclora-design-system`

## Objetivo

El repo ya tiene suficiente superficie como para necesitar checks automáticos mínimos antes de seguir creciendo.

La prioridad no es montar una infraestructura pesada, sino cubrir los riesgos reales de hoy:

- entrypoints CSS rotos
- export maps desalineados
- manifest inconsistente
- previews/examples con referencias locales rotas
- regressions silenciosas en la capa consumible

## Scripts actuales

`npm run verify:manifest`
- valida `package.json`
- valida `design-system.manifest.json`
- comprueba que todos los entrypoints exportados existen

`npm run verify:html`
- inspecciona `preview/*.html`
- inspecciona `src/examples/**/*.html`
- comprueba imports esperados de CSS
- comprueba referencias locales `href`/`src` rotas

`npm run verify:browser`
- abre previews críticas en un navegador real con Playwright
- valida desktop (1440, 1360), tablet (834) y mobile (430)
- detecta roturas de carga, CSS o selectores principales
- valida `preview/detail-modal.html`: centrado, ausencia de scroll horizontal y respeto del max-height viewport-safe en las 4 escalas de tamaño más el diálogo de confirmación

`npm run verify:package`
- ejecuta `npm pack --dry-run`
- valida que el repo siga siendo consumible como paquete

`npm run verify:a11y`
- ejecuta una auditoría básica con Axe
- comprueba `title`, `lang`, `main`, regiones, labels y nombres accesibles

`npm run verify:snapshots`
- genera snapshots ligeros de las previews cubiertas
- deja artefactos en `artifacts/visual-baselines/`

`npm run verify`
- ejecuta manifest, html, browser smoke, accesibilidad básica y package dry-run

`npm run quality`
- alias de `verify`

## Lo que cubre hoy

- seguridad estructural del package
- consumo desde apps
- integridad de previews y examples
- detección temprana de roturas de paths o entrypoints
- carga real de previews críticas en navegador
- accesibilidad estructural mínima
- snapshots regenerables para inspección visual

## Señales de validacion funcional

Ademas de `npm run verify`, este repo debe considerarse validado cuando haya consumidores reales que pasen checks utiles sobre piezas canonicas.

Hoy la señal mas fuerte es `anclora-talent` como consumidor premium real:

- adopcion real de taxonomia
- adopcion real de buttons, cards, fields, modal y empty state
- adopcion real de patterns editoriales premium
- tests del consumidor verdes en flujos de workspace, preview, importacion y creacion

Esto no sustituye al versionado ni a los checks del paquete, pero evita confundir “preview bonita” con “sistema listo para consumo”.

## Lo que todavía no cubre

- visual diff automatizado
- wrappers JS/TS

## Siguiente escalón recomendado

Cuando esta base se estabilice, el siguiente paso natural es:

1. comparar snapshots contra baseline con diff automatizado
2. ampliar la auditoría de accesibilidad a contrastes y navegación por teclado
3. registrar una matriz de consumidores validados por primitive/pattern
4. añadir consumo de apps reales a la verificación continua

## Gate visual obligatorio

Mientras no exista infraestructura de visual diff automatizado, cualquier fase que cambie taxonomía, motion, cards, buttons, frames, shells o patterns críticos debe validarse visualmente antes de darse por cerrada.

La validación mínima obligatoria es:

1. abrir la preview o example afectado en navegador real
2. comprobar escritorio
3. comprobar móvil
4. verificar hover, focus, active, clipping, contraste y jerarquía

Previews mínimas para este gate:

- `preview/index.html`
- `preview/taxonomy-contracts.html`
- `preview/components-canonical.html`
- `preview/localization-fixtures.html`

Si una fase no pasa esta revisión visual, no debe darse por válida aunque `npm run verify` sea correcto.

## CI (GitHub Actions)

`npm run verify` corre en `.github/workflows/ci.yml` en cada push/PR sobre `development` y `main`.

El runner instala `npx playwright install --with-deps chromium` (solo Chromium, no la matriz completa de browsers) antes de `verify:browser`/`verify:a11y`, porque ambos scripts dependen de un Chromium real.

## Detail modal — MODAL vs DRAWER vs CONFIRMATION DIALOG

- **MODAL** (`.ac-modal.ac-modal--detail`): detalle de entidad centrado y enfocado. Usa una de las 4 clases de tamaño.
- **DRAWER**: UI lateral persistente y contextual (componente separado, no comparte el shell centrado del modal).
- **CONFIRMATION DIALOG** (`.ac-modal` sin `--detail` ni clase de tamaño): shell base, decisión pequeña (ver slot `fixture-confirmation` en `preview/detail-modal.html`).

Escala determinista de tamaño (`.ac-modal--compact|medium|wide|large`), nunca px arbitrarios por entidad:

- `COMPACT` — decisiones de una sola entidad, contenido mínimo
- `MEDIUM` — detalle estándar, 2–3 bloques de contenido
- `WIDE` — metadatos adicionales o comparación lateral de campos
- `LARGE` — expedientes/casos con historial largo; ejercita el scroll interno del body (ver slot `fixture-large`)

Política de scroll: **sin scroll innecesario**, no **sin scroll a cualquier costo**. `.ac-modal--detail` fija header y footer y deja `.ac-modal__body` como única región con `overflow-y: auto`, activada solo cuando el contenido excede `max-height: calc(100vh - 64px)`.

Fixtures deterministas para las 4 escalas más el confirmation dialog viven en `preview/detail-modal.html` y se validan en `verify:browser` (viewport-safety) y `verify:a11y` (semántica `role="dialog"`/`aria-modal`, labels accesibles).
