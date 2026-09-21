# Ecosystem Frontend Inventory & Drift Audit

Fecha: 2026-09-21
Método: inspección directa de código (`package.json`, CSS/tokens, componentes, git log) en los ~38 repos bajo `/Users/toni/Developer/anclora`, sin asumir que la documentación existente (`consumer-status-map.md`, `validated-consumers-matrix.md`, `ecosystem-repos.json`) es correcta. Se contrasta explícitamente donde diverge de la evidencia real.
Alcance: excluye `calculadora-fiscal-183` (fuera de alcance explícito), `anclora-auditorias`, `backups`, `docs` (no son repos git).

> Esta es la fase de **Discovery + Audit** (evidencia, sin juicio de arquitectura/gobernanza todavía). No se ha modificado ningún repo. Los siguientes pasos (taxonomía, arquitectura objetivo, reconciliación de contratos, implementación) requieren decisiones de producto/gobernanza y se documentan como pendientes al final.

---

## ADENDA — Fase 2.5: Normalización del audit (2026-09-21, posterior a la primera versión)

La primera versión de este documento (secciones 0-5 abajo, preservadas sin editar como evidencia) contenía errores de conteo, una fila duplicada, y dos simplificaciones que mezclaban conceptos distintos bajo una sola etiqueta ("fork", "consumo DS"). Esta adenda los corrige. **No se ha reescrito ni debilitado ningún hallazgo confirmado** — donde la evidencia original era correcta, se mantiene; donde la clasificación era imprecisa, se refina con más evidencia (citada abajo, no inventada).

### A2.5.1 — Conteo exacto de repositorios

| Categoría | Cuenta | Detalle |
| --- | --- | --- |
| Directorios totales escaneados bajo `/Users/toni/Developer/anclora` | **40** | incluye 3 no-git |
| Directorios sin `.git` (no son repos) | **3** | `anclora-auditorias`, `backups`, `docs` |
| Repositorios git | **37** | |
| Excluidos explícitamente del análisis | **1** | `calculadora-fiscal-183` |
| **Repositorios en alcance de análisis** | **36** | 37 − 1 |
| — de los cuales, autoridades transversales | **5** | `anclora-design-system`, `anclora-governance`, `anclora-vault`, `anclora-infrastructure`, `anclora-command-center` |
| — de los cuales, repos de producto | **31** | 36 − 5 |

Desglose de los 31 repos de producto por presencia/tipo de frontend (categorías mutuamente excluyentes, tal y como se pidió — un repo sin frontend ejecutable no se cuenta como "frontend repo"):

| Sub-categoría de producto | Cuenta | Repos |
| --- | --- | --- |
| Frontend ejecutable, cara al usuario (producto principal) | **24** | advisor-ai, azure-bay-landing, content-generator-ai, data-lab, energyscan, filestudio, fiscal, groundsync, group, group-landing, guesthub, impulso, insights-adn, job-portfolio, linguo-cam, nexus, portfolio, private-estates, private-estates-landing, shiftimport, synergi, tableextractor, visionflow, talent |
| Frontend de showcase/portfolio (demo con datos sintéticos, repo separado del producto real) | **4** | advisor-ai-showcase, guesthub-showcase, portfolio-showcase, shiftimport-showcase |
| Solo documentación / case-study, sin código ejecutable | **2** | energyscan-showcase, fiscal-showcase |
| Backend puro, sin frontend | **1** | identity |
| **Total producto** | **31** | 24 + 4 + 2 + 1 |

Desglose de las 5 autoridades transversales por naturaleza real (no por rol declarado):

| Repo | Naturaleza real confirmada |
| --- | --- |
| `anclora-design-system` | paquete de tokens/CSS ejecutable, **no es en sí una app cara al usuario** (tiene una carpeta `preview/` de demostración, no un producto) |
| `anclora-governance` | solo documentación (sin `package.json`, sin CSS) |
| `anclora-vault` | solo documentación (sin `package.json`, sin CSS) |
| `anclora-infrastructure` | tooling/automatización (sin `package.json` de frontend, sin CSS) |
| `anclora-command-center` | app real con frontend ejecutable (Vite + React), **consumidor**, no autoridad de diseño |

**Nota de encuadre:** clasificar `anclora-command-center` como "autoridad transversal" en la primera versión del audit era una hipótesis a verificar, no un hecho — la evidencia (§4 de la sección original) confirma que es un consumidor, no una autoridad. Se mantiene en el grupo de "5 transversales" solo porque así se investigó inicialmente (junto a las 3 repos de gobernanza/documentación y el propio design system); a efectos de arquitectura (Fase 4) se trata como lo que realmente es: **la aplicación operativa consumidora nº 2**, no una fuente de verdad.

**Corrección de fila duplicada:** la v1 de este documento listaba `anclora-azure-bay-landing` dos veces (fila #5 y fila #33 de la tabla §2 original). Es el mismo repo; la fila #33 era un artefacto de consolidación de los cuatro reportes de discovery paralelos y se elimina. Esto no cambia ningún conteo de arriba (ya estaba contado una sola vez en el total de 24).

**Corrección de "17 repos nunca evaluados":** la v1 afirmaba que existían "17" repos fuera del `consumer-status-map.md` (que cubre 16 repos) pero el propio párrafo enumeraba **23** nombres. Recuento correcto: de los 24 repos con frontend ejecutable de producto principal, el `consumer-status-map.md` existente cubre explícitamente 8 (`anclora-talent`, `anclora-energyscan`, `anclora-command-center`, `anclora-content-generator-ai`, `anclora-filestudio`, `anclora-fiscal`, `anclora-nexus`, `anclora-linguo-cam`, `anclora-private-estates`, `anclora-private-estates-landing`, `anclora-guesthub` — en realidad 11, ver nota) mencionándolos por nombre (aunque la mayoría como `UNKNOWN`), dejando **23 repos de producto con frontend real que jamás fueron mencionados por ningún documento de gobernanza existente**: advisor-ai, advisor-ai-showcase, azure-bay-landing, data-lab, groundsync, group, group-landing, guesthub-showcase, impulso, insights-adn, job-portfolio, portfolio, portfolio-showcase, shiftimport, shiftimport-showcase, synergi, tableextractor, visionflow — **18** nombres, no 17 ni 23. (La cifra "23" de la v1 mezclaba por error repos ya mencionados por `consumer-status-map.md` como `UNKNOWN` — que sí están en el radar aunque sin auditar — con repos que no aparecen en ese documento en absoluto. Ambos grupos son "no auditados con evidencia real", pero solo el segundo grupo — 18 repos — está completamente fuera del radar documental.)

### A2.5.2 — Separar consumo real del ecosistema DS de otras infraestructuras UI compartidas

Nuevas columnas, aplicadas solo a los repos donde aplica (los demás: "ninguno" en las cuatro):

| Repo | Dependencia DS ecosistema (`@anclora/design-system` en package.json) | Import en runtime real | Infra UI local/compartida propia | Overrides locales sobre lo importado |
| --- | --- | --- | --- | --- |
| `anclora-talent` | sí (tarball GitHub, commit pineado) | sí — `globals.css` importa 8+ módulos del paquete | no | sí, ver A2.5.4 |
| `anclora-command-center` | sí (tarball GitHub, mismo commit del DS) | sí — `main.tsx` importa 7 módulos + wrapper `Button.tsx` | no | parcial, ver A2.5.4 |
| `anclora-fiscal` | **no** | no | **sí — `@anclora/ui`, paquete workspace interno del monorepo turborepo de fiscal, sin relación con `@anclora/design-system`** | n/a (no importa el DS) |
| Los otros 21 repos de producto con frontend | no | no | no | no |

**Corrección explícita:** la v1 mencionaba `@anclora/ui` de `anclora-fiscal` en el mismo párrafo/tabla que la dependencia real del ecosistema, lo cual podía leerse como si fiscal "también consumiera el DS de alguna forma". No es así: son dos paquetes sin ninguna relación de código, solo comparten el prefijo de nombre `@anclora/`. Esto se trata con su propio apartado en la Fase 4 (arquitectura) — ver decisión del propietario: no se convierte en un segundo DS canónico, se estudia como referencia de ingeniería de empaquetado.

### A2.5.3 — Drift semántico de color: mapeo primitivo → semántico → componente → tema (no solo "los valores no coinciden")

Evidencia adicional obtenida en esta fase (no citada en la v1):

- `anclora-vault/10-group/brand/ANCLORA_BRANDING_COLOR_TOKENS.md:36-44` define un bloque **"Tokens compartidos globales"**, explícitamente marcado como compartido entre *todas* las apps (no por-app): `--danger: #E53E3E; --danger-soft: rgba(229,62,62,0.12); --success: #38A169; --warning: #D69E2E;`. Este es un token de rol **semántico base** (la vault no define ningún nivel "componente" para esto).
- `anclora-design-system/src/tokens/semantic.css:52-59` define **dos** tokens de rol **componente**, no uno: `--status-danger-surface: rgba(225, 87, 89, 0.18)` (fondo, con transparencia, para el chip/badge) y `--status-danger-text: #ffb8b9` (texto legible *sobre* ese fondo oscuro — un tono derivado, no el "rojo peligro" en sí).
- La comparación de la v1 (`--danger` de vault vs. `--status-danger-text` del DS) comparaba un **primitivo/semántico base** contra un **token de componente derivado para texto-sobre-superficie-oscura** — roles distintos en la jerarquía. Clasificación correcta: **naming mismatch** (par de tokens incorrecto), no un conflicto de valores real.
- La comparación correcta es `--danger` (vault) vs. la base roja implícita en `--status-danger-surface` del DS: `rgba(225, 87, 89, ...)` ≈ `#E15759`, frente a `#E53E3E` de vault. Son rojos de la misma familia pero **no el mismo valor** (diferencia real, aunque pequeña, en R/G/B: 225 vs 229, 87 vs 62, 89 vs 62).
- **Clasificación final de este punto:** `unresolved / requires reconciliation` — hay un desalineamiento real y pequeño entre el rojo "danger" compartido que vault declara canónico y el rojo base que el DS usa internamente para derivar `--status-danger-surface`, pero es un desajuste de *un solo primitivo*, no la "docena de tokens en conflicto" que una lectura superficial de la v1 podría sugerir. `--success`/`--warning` no se verificaron byte a byte en esta pasada — quedan como `unresolved / requires reconciliation` también, sin evidencia adicional todavía (no se fabrica un veredicto).

### A2.5.4 — Reevaluación de overrides locales (no son automáticamente "fork")

**`anclora-command-center`:** evidencia adicional en `src/index.css` (bloque completo, no solo el fragmento citado en la v1): el archivo define su propia paleta de marca (`--background: #121021`, `--accent: #6C63FF` — que coincide exactamente con el acento "Command Center" documentado en `anclora-vault/.../ANCLORA_BRANDING_COLOR_TOKENS.md:365` `#6C63FF`) y luego un bloque explícitamente comentado como *"DS semantic aliases"* que remapea alias de superficie/estado. Verificación byte a byte de uno de esos alias: `--status-danger-text: #FFB8B9` en `command-center/src/index.css` es **idéntico** a `--status-danger-text: #ffb8b9` en `anclora-design-system/src/tokens/semantic.css`. No es un valor divergente — es una restatement local del mismo valor, motivada (según el propio comentario del código) por mantener consistencia de superficie cuando la app cambia de tema. **Clasificación: `F. Compatibility workaround` / theme-profile mapping — no es fork estructural.** (La app además no define ningún bloque de tema claro visible en el rango inspeccionado, lo que es consistente con "capa de alias de aplicación de un solo tema", no una reinterpretación del sistema semántico.)

**`anclora-talent` — tres hallazgos separados, no uno:**

1. **Copia local de core tokens** (`src/styles/anclora-core-tokens.css`, referenciada en vez del `tokens/core.css` del paquete) — causada por un bug de orden de `@import` que Lightning CSS/Turbopack rechaza (documentado en el propio comentario de `globals.css:11-15`, verificado en discovery previo). **Clasificación: `F. Compatibility workaround`** — no es una decisión de diseño, es un parche de build necesario mientras el DS no resuelva el bug de empaquetado.

2. **`.ac-button` — override parcial, con dos capas distintas.** Evidencia directa (`anclora-design-system/src/components/button.css:9-30` vs. `anclora-talent/src/app/globals.css:450-513`):
   - Capa de **color por variante** (`--ac-button-bg/--ac-button-fg/--ac-button-border/--ac-button-shadow` en `.ac-button--primary/--secondary/--ghost/--destructive`): el DS expone estas custom properties explícitamente como mecanismo de extensión sancionado (`button.css:10-13` las declara como valores por defecto, pensadas para ser sobreescritas por variante). Talent las usa exactamente así. **Clasificación: `legitimate component extension`, no fork.**
   - Capa de **anatomía base** (`border-radius`, `font-size`, `font-weight`, `letter-spacing`, `padding-inline` en el selector `.ac-button` desnudo): el DS define esto de forma fija — `border-radius: var(--radius-pill)` (botón totalmente redondeado/"pill"), `font-size: 0.76rem`, `font-weight: 700`, `text-transform: uppercase`. Talent redefine el radio a `18px` (rectángulo redondeado, no pill), tamaño a `0.92rem`, peso a `800`, y no expone ni consume ningún custom property para esto — es una sobreescritura directa del selector base, no una extensión vía token. **Clasificación: `A. Unjustified drift`** a nivel de anatomía del primitivo — el propio comentario del código en talent justifica la decisión de *color* consistente ("Product decision: every non-destructive button... uses the same accent gradient") pero no dice nada sobre por qué la geometría/tipografía debía cambiar del pill canónico. No hay evidencia de que esta variación se haya propuesto de vuelta al DS como una variante de anatomía sancionada.

3. **`.dashboard-button`** (`globals.css:2665-2671, 2971-2977`) — familia de clases totalmente separada, nunca compuesta desde `.ac-button` en el markup. Evidencia de anatomía: `border-radius: 4-5px`, `min-height: 36px`, `padding: 7px 14px`, `font-size: 12px`, `font-weight: 500` — una geometría notablemente **más pequeña y densa** que tanto el `.ac-button` canónico del DS (pill, 0.76rem/700) como el `.ac-button` local de talent (18px, 0.92rem/800). Se usa en filas de proyecto, menús de tarjeta, cierre de modal y acciones de la barra de herramientas del editor de capítulos — superficies de alta densidad de datos, no CTAs de marketing/onboarding. **Clasificación: `B. Legitimate difference`** — hay un requisito funcional real (una superficie de workspace densa necesita controles de acción más compactos que un CTA de página de aterrizaje) que el Core actual no contempla como variante sancionada. Estado objetivo (Fase 4/6): el DS debería exponer una variante de densidad/tamaño sancionada (p. ej. `.ac-button--compact` con tokens de componente para `radius`/`padding`/`font-size`), y `.dashboard-button` debería migrar a esa variante en una ola posterior — no se fusiona automáticamente solo porque exista ya en talent (regla de absorción del propietario).

### A2.5.5 — Hallazgos que se mantienen sin cambios (re-confirmados, no debilitados)

- `anclora-energyscan` clasificado como `PARTIAL_ALIGNMENT` en `consumer-status-map.md` sin ninguna dependencia `@anclora/*` real en su `package.json` — confirmado, sin nueva evidencia que lo contradiga.
- `anclora-governance/knowledge/SOURCE_OF_TRUTH_REGISTRY.md:65` apunta a `../../boveda-anclora`, ruta inexistente tras el rename a `anclora-vault` — confirmado.
- Nota de "pausado" sobre `anclora-talent` en `validated-consumers-matrix.md` (2026-08) frente a actividad de git real hasta 2026-09-21 — confirmado.
- El `consumer-status-map.md` existente cubre 16 repos frente a los 36 repos reales en alcance (5 transversales + 31 de producto) — confirmado, con el desglose corregido de "18 repos de producto nunca mencionados" en A2.5.1 sustituyendo la cifra "17" original.

---

## 0. Baseline de seguridad (Phase 0)

Todos los repos con `.git` (37) fueron verificados `dirty=0` antes de iniciar cualquier lectura. Dos repos están en rama no estándar (no tocados, solo anotados):

| Repo | Rama | Motivo aparente |
| --- | --- | --- |
| `anclora-private-estates-landing` | `fix/admission-v2-production-nexus-url` | fix en curso, no mergeado a `development` |
| `anclora-tableextractor` | `refactor/neon-postgresql` | migración de persistencia en curso |

---

## 1. Autoridades transversales — estado real vs. declarado

| Repo | Rol declarado | ¿Publica paquete npm real? | Hallazgo clave |
| --- | --- | --- | --- |
| `anclora-design-system` | Implementación/spec ejecutable | **No** — `package.json: "private": true`. Consumo real vía tarball de GitHub pineado a un commit (`https://codeload.github.com/.../tar.gz/<sha>`), no resolución de registro npm. | Único repo con tokens/componentes CSS ejecutables reales (32 componentes, `src/tokens/{core,semantic}.css`). Sin `CONTRIBUTING.md` ni `ADR*`. |
| `anclora-governance` | Autoridad constitucional/meta-gobierno | n/a (sin `package.json`, solo Markdown) | `knowledge/SOURCE_OF_TRUTH_REGISTRY.md:65` referencia `../../boveda-anclora` — **ruta pre-rename rota**; el repo real se llama `anclora-vault` desde hace tiempo (confirmado en `anclora-vault/vault-manifest.json:6-8`). Cross-reference nunca actualizada. |
| `anclora-vault` | Autoridad documental/normativa | n/a | `10-group/brand/ANCLORA_BRANDING_COLOR_TOKENS.md` declara `--danger: #E53E3E` como norma; `anclora-design-system/src/tokens/semantic.css` shipea `--status-danger-text: #ffb8b9` — **nombre y valor distintos**. El contrato de vault cita a design-system como "fuente ejecutable relacionada" pero los valores ya divergieron. |
| `anclora-infrastructure` | Tooling/runtime | n/a | Sin CSS, sin tokens (confirmado `find -iname "*.css"` → 0). Su propio `AGENTS.md` se autolimita explícitamente: "no es un repo de gobernanza". Consistente con lo declarado. |
| `anclora-command-center` | App operativa (NO autoridad transversal por defecto) | app privada (`"private": true`, `version: 0.0.0`) | Consume `@anclora/design-system` de verdad: `src/main.tsx` importa 7 módulos reales (`tokens/core.css`, `tokens/semantic.css`, `button.css`, `data-table.css`, `status-badge.css`, `modal.css`, `empty-state.css`); `src/ui/Button.tsx` es un wrapper delgado sin CSS propio. **Pero** `src/index.css` remapea localmente los alias semánticos del DS a valores propios (`--bg: var(--background)` con `--background: #121021` local) — consumo real + override local coexistiendo en el mismo archivo. |

---

## 2. Inventario completo de frontend (33 repos con código de producto)

Convención de columnas: **DS dep** = dependencia real `@anclora/*` en `package.json` (verificado por grep, no por similitud visual). **Tema** = mecanismo de dark/light si existe.

| # | Repo | Stack | Tailwind | DS dep | Tema | Convención de botón |
| - | --- | --- | --- | --- | --- | --- |
| 1 | anclora-talent | Next 16.2 / React 19.2 | v4 | **sí** (tarball, commit pineado) | `data-theme` + contract tests | `.ac-button` (importado, luego **sobrescrito localmente**) + `.dashboard-button` (familia paralela, nunca deriva de `.ac-button`) |
| 2 | anclora-command-center | Vite / React 19 | ninguno | **sí** (tarball, mismo repo) | no declarado como autoridad de tema | wrapper `Button.tsx` sobre `.ac-button` del DS, sin CSS propio |
| 3 | anclora-advisor-ai | Next 15 / React 19 | v3.4 | no | `data-theme`, hand-rolled | `.advisor-btn.advisor-btn-primary` |
| 4 | anclora-advisor-ai-showcase | Vite / React 18 | ninguno | no | ninguno (solo claro) | `.btn-primary` |
| 5 | anclora-azure-bay-landing | Next 16 / React 18 | v4 + shadcn | no | `next-themes` | shadcn `Button`/cva |
| 6 | anclora-content-generator-ai | Next 16 / React 19 | v4 + shadcn | no | `next-themes` + `darkMode:"class"` | shadcn `Button` |
| 7 | anclora-data-lab | Next 16 / React 19 | v4 | no | `data-theme` (mecanismo JS no localizado) | `.datalab-button` / `.datalab-button-ghost` |
| 8 | anclora-energyscan | Next 14 / React 18 | v3.4 | **no** (contradice consumer-status-map — ver §3) | `.dark` class, hand-rolled localStorage | sin clase canónica; cada componente define su propio `-btn` |
| 9 | anclora-energyscan-showcase | — sin código, solo case-study docs — | | | | |
| 10 | anclora-filestudio | Next 16 / React 19 (monorepo pnpm) | v4 + shadcn | no (solo paquetes internos `@anclora/filestudio-*`, servicios) | `next-themes` | shadcn `Button` |
| 11 | anclora-fiscal | Next 15 / React 19 (monorepo turborepo) | ninguno | **sí — `@anclora/ui` (workspace interno propio, NO es el DS ecosistema)** | **no encontrado** | `Button` propio, `btn btn-{variant}` |
| 12 | anclora-fiscal-showcase | — sin código, solo case-study docs — | | | | |
| 13 | anclora-groundsync | Vite / React 18 | ninguno | no | `data-theme` + `prefers-color-scheme` | `.btn-outline/.btn-gold/.btn-ghost` |
| 14 | anclora-group-landing | Vite / React 19 | ninguno | no | no encontrado | `.btn/.btn-primary/.btn-secondary` |
| 15 | anclora-group | Next 16 | ninguno | no | no encontrado | `.group-button/.group-ghost-button` |
| 16 | anclora-guesthub | Next 16 | v3.4 | no | `.light` class + `ThemeToggle` (3 modos) | `.btn-primary/.btn-secondary/.btn-danger` |
| 17 | anclora-guesthub-showcase | Vite / React 18 | ninguno | no | no encontrado | `.btn/.btn-primary/.btn-secondary` |
| 18 | anclora-identity | — backend puro (Express/oidc-provider), sin frontend — | | | | |
| 19 | anclora-impulso | Next 14 | v4 + shadcn (OKLCH tokens) | no | `.dark` class, `ThemeProvider` | shadcn `Button` (cva, variantes `success` incluida) |
| 20 | anclora-insights-adn | Vite / React 19 | v4 (`@theme`) | no | no encontrado | sin componente Button, Tailwind inline en `<button>` crudo |
| 21 | anclora-job-portfolio | HTML/CSS/JS estático, sin build | ninguno | no | parcial (`color-scheme: dark` fijo, sin toggle) | `.btn/.btn-primary/.btn-ghost` |
| 22 | anclora-linguo-cam | Vite / React 19 | v4 (`@theme inline`) | no | **CSS presente pero muerto** — nada en el código invoca `setAttribute('data-theme', ...)` | `.btn-primary/.btn-secondary/.btn-danger/.btn-ghost` |
| 23 | anclora-nexus | Next 16.2 | v4 | no | `.dark` class, `ThemeToggle.tsx` manual | shadcn `Button` |
| 24 | anclora-portfolio | Next 16.1 | v4 + config legacy | no | **configurado pero muerto** (`next-themes` solo en `sonner.tsx`, 0 usos de `dark:` en `src`) | shadcn `Button` |
| 25 | anclora-portfolio-showcase | Vite / React 18 | ninguno | no | ninguno | `.button--primary/--ghost` (BEM) |
| 26 | anclora-private-estates | Vite / React 19 | v3.4 | no | `ThemeContext` propio | shadcn `Button` **+** `.btn-anclora-premium/.btn-valuation/.btn-primary` (dos convenciones a la vez) |
| 27 | anclora-private-estates-landing | Vite / React 19 | config presente pero **sin dependencia real** (archivo vestigial) | no | `data-theme` | `.btn-scroll/.btn-cookie-*/.btn-contact-floating` |
| 28 | anclora-shiftimport | Vite / React 18 | ninguno | no (comentario propio: "Anclora Design System typography (local-first, no CDN)" — **reimplementa**, no depende) | `data-theme`, extensivo | `.btn-gold/.btn-outline`, con comentario anti-patrón documentado en el propio código contra `.auth-submit` |
| 29 | anclora-shiftimport-showcase | Vite / React 18 | ninguno | no | ninguno | `.btn/.btn-primary/.btn-ghost` |
| 30 | anclora-synergi | Next 16.1 | ninguno | no | `data-theme` | `.synergi-button` crudo, sin componente |
| 31 | anclora-tableextractor | CRA/CRACO (frontend/ subdir) | v3.4 | no | `ThemeContext`/`ThemeToggle` | shadcn `Button` |
| 32 | anclora-visionflow | Next 16.1 | v4 + config legacy | no | **configurado, uso delgado** (`dark:` en 27 archivos, sin `ThemeProvider` localizado) | shadcn `Button` |
| 33 | anclora-azure-bay-landing | *(ver #5)* | | | | |

**Repos sin frontend / fuera de este inventario:** `anclora-identity` (backend), `anclora-energyscan-showcase`, `anclora-fiscal-showcase` (case-study docs sin código), `anclora-governance`, `anclora-vault`, `anclora-infrastructure` (documentación/tooling puro).

---

## 3. Divergencias documentación-vs-realidad (el hallazgo central del audit)

Esto es lo que la Fase 0 del mandato pedía explícitamente detectar: dónde la documentación existente en `anclora-design-system/docs/` ya no coincide con el código real.

### 3.1 `anclora-talent` no es "consumo sin fork estructural"

`validated-consumers-matrix.md` (fila `button`, componente `canonical`) dice: *"usado en auth, dashboard, editor, dialogs y acciones de preview/export"* sin mencionar fork. `consumer-status-map.md` dice explícitamente *"consumo real sin fork estructural"*.

Evidencia real en `anclora-talent/src/app/globals.css`:
- Líneas 450-513: `.ac-button` y sus variantes (`--sm/--lg/--primary/--secondary/--ghost/--destructive`) están **redefinidas localmente** (radius `18px`, `font-weight: 800`, letter-spacing propio) — no son las del paquete tal cual.
- Líneas 2666-2671, 2971-2977: `.dashboard-button` / `.dashboard-button--primary` son una **familia de clases completamente separada**, con su propio comentario reconociendo la relación ("usa el mismo gradiente que ac-button — ver nota arriba") pero **nunca compone ni extiende `.ac-button`** en el markup. `.dashboard-button` es, de hecho, la fuente de verdad visual real del Dashboard/Workspace — confirmado en trabajo previo de este mismo repo.
- Adicionalmente, `globals.css:16-18` bifurca los core tokens en una copia local (`./styles/anclora-core-tokens.css`) porque el `tokens/core.css` del paquete tiene un bug de orden de `@import` que Lightning CSS rechaza — un segundo punto de fork no documentado en la matriz.

**Conclusión:** esto es consumo real (el import existe, se usa) pero con fork estructural genuino en dos capas (core tokens y componente button). La matriz debería reflejar esto como `validated` con nota de fork, no como "sin fork estructural".

### 3.2 `anclora-talent` no está "pausado"

`validated-consumers-matrix.md` (nota de 2026-08) dice: *"anclora-talent... pasó a pausado, fuera del alcance activo del ecosistema"* y que Command Center/Content Generator AI/Portfolio son ahora "los candidatos activos".

Evidencia real: `git log --oneline -5` en `anclora-talent` muestra actividad continua hasta hoy (2026-09-21), incluyendo un rediseño completo del chapter workspace/editor (`8d85790 feat(chapters): redesign chapter workspace and editor`, `5499e02`, `1d2dd58`, `b29ccfb`) — es decir, desarrollo activo *precisamente* sobre la superficie (Dashboard/Workspace) donde vive el fork de `.dashboard-button` descrito en §3.1.

**Conclusión:** la nota de "pausado" está desactualizada. Esto tiene implicación directa para la reconciliación de contratos: si `anclora-talent` sigue activo y su Dashboard sigue divergiendo del `.ac-button` canónico, cualquier cambio futuro al componente `button` del DS puede romper silenciosamente esa superficie sin que nadie lo note, porque la matriz lo da por "fuera de alcance".

### 3.3 `anclora-energyscan` no consume el design system en absoluto

`consumer-status-map.md` clasifica `anclora-energyscan` como `PARTIAL_ALIGNMENT`, con evidencia *"auditoría documental creada"*. `validated-consumers-matrix.md` lo lista como consumidor `candidate/partial` con `system_role = consumer`.

Evidencia real: `grep "@anclora" anclora-energyscan/package.json` → **sin resultados**. El repo tiene su propio sistema de tokens completamente independiente (`src/app/globals.css:27-48`: `--bg:#0A0A0A; --accent:#00DC82; --warm:#FFB020; --danger:#EF4444;`) y su propio mecanismo de tema hand-rolled (localStorage `enerscan-theme` + `matchMedia`), sin relación de código con `anclora-design-system`.

**Conclusión:** la clasificación `PARTIAL_ALIGNMENT` parece basarse en una intención/plan documental, no en evidencia de código — exactamente el tipo de falso positivo que `consumer-status-map.md` dice explícitamente querer evitar (§"Regla aplicada": *"no infiere consumo a partir de... declaración aspiracional"*). Este caso concreto se coló de todos modos.

### 3.4 Alcance de la documentación existente cubre ~la mitad del ecosistema real

`consumer-status-map.md` limita su mapa a "16 repos en scope AKG v0.1". El inventario real (§2) encuentra **33 repos con frontend**, de los cuales 17 (más de la mitad) nunca han sido evaluados por ningún documento existente: `anclora-nexus`, `anclora-portfolio`, `anclora-portfolio-showcase`, `anclora-visionflow`, `anclora-guesthub`, `anclora-guesthub-showcase`, `anclora-linguo-cam`, `anclora-private-estates`, `anclora-private-estates-landing`, `anclora-synergi`, `anclora-shiftimport`, `anclora-shiftimport-showcase`, `anclora-advisor-ai`, `anclora-advisor-ai-showcase`, `anclora-data-lab`, `anclora-azure-bay-landing`, `anclora-impulso`, `anclora-insights-adn`, `anclora-job-portfolio`, `anclora-tableextractor`, `anclora-group`, `anclora-group-landing`, `anclora-groundsync`.

**Conclusión:** el "consumer status map" actual no es un mapa del ecosistema, es un mapa de un subconjunto curado. Cualquier decisión de arquitectura objetivo basada solo en esos 16 repos ignorará más de la mitad de la superficie real.

### 3.5 `anclora-fiscal`'s `@anclora/ui` es un paquete interno del monorepo, no el design system del ecosistema

Riesgo de confusión de nombres: `anclora-fiscal/apps/web/package.json` depende de `@anclora/ui` vía `workspace:*` — esto **no** es `@anclora/design-system`. Es un paquete propio del monorepo turborepo de fiscal (`packages/ui/`), con su propia paleta (`--ai-midnight`, `--ai-gold`, `--ai-terracotta`) sin relación con la de `anclora-design-system`. Es, no obstante, el único repo del ecosistema con infraestructura de paquete compartido *real* (componentes con tests, exports formales) — un patrón que vale la pena estudiar como referencia de implementación, aunque esté desconectado del DS central.

---

## 4. Patrones de drift observados (para taxonomía futura)

- **Fragmentación de convención de botón**: al menos 8 convenciones de nomenclatura distintas conviviendo sin coordinación: `.ac-button` (DS oficial, forkeado en su único consumidor real), `.dashboard-button`, `.advisor-btn-*`, `.btn-*` (genérico, 9 repos), `.group-button`, `.datalab-button`, `.synergi-button`, `.btn-gold/.btn-outline` (shiftimport), shadcn `Button`/cva (9 repos), `@anclora/ui` `Button` (fiscal, aislado).
- **Adopción de shadcn/ui no coordinada**: 9 de 33 repos adoptaron shadcn/ui (`components.json` + `components/ui/button.tsx`) de forma independiente, sin relación con `anclora-design-system` ni entre sí — cada uno con su propia paleta HSL/OKLCH.
- **Theming "fantasma"**: al menos 3 repos (`anclora-portfolio`, `anclora-visionflow`, `anclora-linguo-cam`) tienen infraestructura de dark-mode configurada (dependencia `next-themes` o bloques CSS `[data-theme]`) que nunca se activa desde código — coste de mantenimiento sin beneficio funcional.
- **Namespacing de tokens inconsistente incluso dentro de la misma línea de producto**: `anclora-private-estates` y `anclora-private-estates-landing` comparten el prefijo `pe-`/`anclora-` pero mantienen archivos de tokens completamente independientes con valores distintos.
- **Un solo consumidor real del DS central, y forkeado**: de 33 repos frontend, exactamente 2 (`anclora-talent`, `anclora-command-center`) importan `@anclora/design-system` en código real — y ambos lo combinan con overrides/remapeos locales en el mismo archivo que hace el import.

---

## 5. Estado y próximos pasos

**Completado en esta pasada (evidencia, sin fabricación, citada por archivo):**
- Phase 0 (baseline de seguridad, 37 repos)
- Phase 1 (discovery de los 33 repos con frontend + 5 autoridades transversales)
- Phase 2 (audit: matriz de inventario §2, drift matrix §4, y — más importante — reconciliación de lo que la documentación existente afirma vs. lo que el código realmente hace, §3)

**No iniciado (requiere decisiones de producto/gobernanza, no solo evidencia):**
- Phase 3 — Taxonomía de producto (clasificar los 33 repos por tier/domain/archetype de forma consistente; hoy la taxonomía de `anclora-design-system/src/taxonomy/` solo tiene consumidores validados para 1 repo)
- Phase 4 — Arquitectura objetivo (decidir qué capas del DS deberían ser obligatorias vs. opcionales, y cómo tratar el caso `anclora-fiscal`/`@anclora/ui` como posible segunda fuente)
- Phase 5 — Reconciliación de contratos (decidir si el fork de `.dashboard-button` en `anclora-talent` se resuelve haciendo que el DS absorba ese patrón, o si se documenta como "legitimate difference"; corregir la ruta rota `boveda-anclora` en governance; resolver la divergencia de tokens de color vault-vs-DS)
- Phase 6 — Implementación (únicamente en `anclora-design-system`, según el mandato)
- Phase 7 — Verificación

Estas cuatro fases implican juicio de producto y gobernanza a escala de todo el ecosistema (qué se considera drift "no justificado" vs. "diferencia legítima" vs. "innovación reusable"), y tocar `anclora-design-system` es un cambio compartido con impacto en cualquier futuro consumidor. Antes de proceder autónomamente con la taxonomía y la arquitectura objetivo, corresponde confirmar con el propietario del producto cómo priorizar sobre estos hallazgos concretos.
