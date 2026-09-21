# Ecosystem Frontend Inventory & Drift Audit

Fecha: 2026-09-21
Método: inspección directa de código (`package.json`, CSS/tokens, componentes, git log) en los ~38 repos bajo `/Users/toni/Developer/anclora`, sin asumir que la documentación existente (`consumer-status-map.md`, `validated-consumers-matrix.md`, `ecosystem-repos.json`) es correcta. Se contrasta explícitamente donde diverge de la evidencia real.
Alcance: excluye `calculadora-fiscal-183` (fuera de alcance explícito), `anclora-auditorias`, `backups`, `docs` (no son repos git).

> Esta es la fase de **Discovery + Audit** (evidencia, sin juicio de arquitectura/gobernanza todavía). No se ha modificado ningún repo. Los siguientes pasos (taxonomía, arquitectura objetivo, reconciliación de contratos, implementación) requieren decisiones de producto/gobernanza y se documentan como pendientes al final.

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
