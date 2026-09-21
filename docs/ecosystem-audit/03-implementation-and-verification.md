# Implementation & Verification Log (Phases 6-7)

Fecha: 2026-09-21

## Fase 6 — Implementación

Ámbito deliberadamente pequeño: un solo gap concreto con evidencia real de necesidad (ver `ANCLORA-DESIGN-SYSTEM-COMPONENT-INVENTORY.md`), no un catálogo especulativo.

| Cambio | Archivo | Tipo |
| --- | --- | --- |
| `--ac-button-radius` promovido a custom property (antes fijo a `var(--radius-pill)`) | `src/components/button.css` | aditivo, sin ruptura |
| Nueva variante `.ac-button--compact` (radio, padding, min-height, tipografía para superficies P-WKS densas) | `src/components/button.css` | aditivo |
| `version` `0.4.1` → `0.5.0` | `package.json`, `design-system.manifest.json` | minor (nueva funcionalidad, compatible) |
| Manifest extendido con gobernanza legible por agentes (`componentStatus`, `profiles`, `extensionPoints`, `prohibitedPatterns`, `deprecated`) | `design-system.manifest.json` | aditivo, nuevas claves de nivel superior — no interfiere con `scripts/verify-manifest.mjs`, que solo valida `entrypoints`/`version`/`recommendedImport` |
| Entrada de changelog | `CHANGELOG.md` | documentación |

**Decisiones de compatibilidad:** ningún selector existente cambia de comportamiento por defecto. `.ac-button` sin `--compact` renderiza exactamente igual que en `0.4.1` (el nuevo `--ac-button-radius` tiene el mismo valor por defecto, `var(--radius-pill)`). No se migró ningún repo consumidor.

**No implementado deliberadamente (ver Fase 4 §13 y regla de absorción):** patrón conversacional, patrón real-time/call UI (un solo consumidor cada uno, no cumplen el umbral de promoción), migración de `anclora-fiscal`, corrección de la ruta rota en `anclora-governance`, resolución del valor de `--danger` (requiere decisión de marca con el propietario, no una elección técnica unilateral).

## Fase 7 — Verificación

Todos los checks se ejecutaron realmente (no simulados) desde este repo el 2026-09-21, tras `npm install` (el repo no tenía `node_modules`, instalado en esta sesión — cambio de dependencias, no de código fuente).

| Check | Comando | Resultado |
| --- | --- | --- |
| Manifest | `node scripts/verify-manifest.mjs` | **PASS** — 44 entrypoints verificados, `version` sincronizada entre `package.json` y el manifest |
| HTML | `node scripts/verify-html.mjs` | **PASS** — 34 archivos HTML verificados |
| Browser smoke (Playwright, 4 viewports × 6 páginas) | `node scripts/verify-browser.mjs --mode=smoke` | **PASS** — 24/24 combinaciones ok |
| Accesibilidad (axe-core, 5 páginas) | `node scripts/verify-browser.mjs --mode=a11y` | **PASS** — 5/5 páginas ok |
| Empaquetado | `npm pack --dry-run` | **PASS** — tarball válido, 203 archivos, `version: 0.5.0` |
| Lint | — | **NOT_AVAILABLE** — no hay configuración de ESLint/linter en el repo |
| Typecheck | — | **NOT_AVAILABLE** — repo es CSS puro, no hay TypeScript |
| Tests unitarios | — | **NOT_AVAILABLE** — no hay Jest/Vitest ni tests unitarios de componente (a diferencia de `anclora-fiscal/packages/ui`, que sí los tiene — ver nota de Fase 4 §9 sobre esa idea de ingeniería) |
| Build de paquete | — | **NOT_AVAILABLE** como paso de compilación — no existe build step (CSS servido tal cual); `npm pack --dry-run` es el check de empaquetado real disponible y se ejecutó (arriba) |
| Storybook/catálogo | — | **PARCIAL** — existe `preview/` (HTML estático de demostración) y `src/examples/`, verificados indirectamente por `verify:html` y `verify:browser`; no hay un catálogo tipo Storybook real |
| Regresión visual | `node scripts/verify-browser.mjs --mode=snapshots` | **NOT_A_REAL_GATE** — el script regenera/sobreescribe los baselines en vez de compararlos y fallar en diferencia; se ejecutó, confirmó que las 24 páginas renderizan sin error, pero **no** constituye una verificación de "sin regresión visual" en sentido estricto. Los baselines regenerados se descartaron (`git checkout`/`git clean`) en vez de commitearse, para no dar una falsa señal de "verificado" a una comparación que el script no hace realmente. Se registra como gap de tooling para `anclora-infrastructure` (fuera de alcance de esta misión). |

**Conclusión de Fase 7:** todos los checks que existen y son ejecutables se ejecutaron y pasaron. Ningún check inexistente se reporta como PASS.
