# Changelog

Todas las versiones del design system se documentan aquí. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [0.9.0] — 2026-09-21

### Añadido — contrato canónico de Forms & Inputs (Wave 3)

Se formaliza la separación Field/Control y se endurecen los estados de `.field-input`, `.field-search`, `.field-select` y `.field-textarea` para foco, invalidación, disabled y readonly. Se añade una anatomía accesible para checkbox, radio y switch basada en inputs nativos y targets de al menos 44px. El catálogo incorpora fixtures de búsqueda, selección, textarea, elección, errores y responsive/localización; la documentación registra la evidencia de consumidores, el gap de Combobox y la recomendación de Pilot 3. No se modifican consumidores.

## [0.8.0] — 2026-09-21

### Añadido — contrato semántico de bordes, estados y enlaces (Wave 2.1)

Se añade `--border-control` para límites estructurales cuyo reconocimiento depende del borde, manteniendo `--border-subtle`/`--border-default` como roles decorativos sin una garantía universal de 3:1. Los campos `.field-input`, `.field-select` y `.field-textarea` consumen el nuevo rol; `--border-strong` conserva su función de mayor énfasis.

Se añaden bordes canónicos para `success`, `warning`, `danger` y el tono público `info` (mapeado al vocabulario semántico existente `review`) y se conectan a `.ac-status-badge` en ambos temas. `--text-link` deja de resolver al acento de producto crudo en oscuro y usa una derivación contrastada para texto normal; el acento sigue siendo válido para marca, fondos e iconos, sujeto a validación si se usa como texto.

La release incluye verificación semántica de contraste con superficies de badge y fixture de producto, catálogo de ambos temas, documentación, manifest legible por agentes y actualización arquitectónica. No modifica Command Center ni Talent; la migración de consumidores queda para una ola posterior.

## [0.7.0] — 2026-09-21

### Añadido — tema claro canónico (Wave 1.6)

`src/tokens/semantic.css` gana un bloque `[data-theme="light"]` real, diseñado desde los roles semánticos existentes (no desde una paleta inventada) y con cada par texto/superficie crítico verificado contra WCAG 2.2 AA por un script real (`scripts/verify-theme-contrast.mjs`, matemática de luminancia relativa pura, sin dependencias). `:root`/`[data-theme="dark"]` conservan exactamente los valores previos a 0.7.0 — compatibilidad retroactiva total, ningún consumidor existente ve un cambio de comportamiento por defecto. Nuevos primitivos "Group Light" en `src/tokens/core.css` (`--group-canvas-light`, `--group-surface-light`, etc.). `--accent` permanece invariante por tema (es marca, no tema); solo sus usos derivados (`--text-link`, `--focus-ring`, `--text-on-accent`) se recalculan para el canvas claro, porque el mismo acento que pasa contraste en oscuro puede fallarlo en claro (verificado: 2.04:1 crudo vs. 7.62:1 oscurecido). Diseñado con evidencia real de los dos consumidores del ecosistema (`anclora-talent`, `anclora-command-center`) — ninguno de los dos se modifica en esta release.

Contrato completo, con la separación explícita de qué posee el Design System vs. qué posee cada aplicación (persistencia, detección de preferencia de sistema, hidratación SSR): `docs/themes/light-dark-theme-contract.md`.

### Añadido — 5 tokens semánticos que faltaban por completo

Auditoría de componentes (Wave 1.6 §8) encontró 6 custom properties referenciadas por componentes canónicos (`editorShell`, `textEditor` — validados por consumidor real) o candidatos (`editorStudio`, `exportSuite`) sin ninguna definición en el paquete: `--text-tertiary`, `--surface-soft`, `--surface-highlight`, `--shadow-soft`, `--shadow-strong`, `--accent-mint`. Se definieron los 5 primeros (como alias/derivaciones de tokens ya existentes, sin inventar significado nuevo). `--accent-mint` se deja explícitamente sin resolver — no hay evidencia de qué debía representar "mint", e inventar un valor sin esa evidencia sería exactamente el tipo de decisión no fundamentada que este proyecto evita; registrado en `design-system.manifest.json#knownGaps`.

### Corregido — color hardcodeado en `chapter-rail.css`

`.ac-chapter-rail__item[data-active="true"] .ac-chapter-rail__index` usaba `rgba(255,255,255,.18)` — un tinte blanco que solo funciona como highlight sobre un canvas oscuro, invisible en el nuevo tema claro. Sustituido por `color-mix(in srgb, var(--text-primary) 18%, transparent)`, que resuelve en la dirección correcta en ambos temas.

### Añadido — verificación de contraste (`scripts/verify-theme-contrast.mjs`, `scripts/lib/contrast.mjs`)

Incorporado a `npm run verify`. Verifica 8 pares críticos AA (texto sobre canvas, texto sobre acento, focus-ring, 4 pares de estado) contra los valores literales reales de `semantic.css`/`core.css`, y falla si esos literales divergen del propio código (evita que la documentación de contraste y el CSS real se desalineen en silencio).

### Añadido — pase de accesibilidad en modo claro

`scripts/verify-browser.mjs --mode=a11y` ejecuta ahora un pase adicional de axe-core contra `components-canonical.html` con `data-theme="light"` forzado (antes solo se verificaba el estado por defecto/oscuro de cada página). 0 violaciones en esta release.

### Añadido — catálogo con conmutador de tema en vivo

`preview/components-canonical.html` gana una sección "Semantic foundations, both themes" (capa semántica sin marca de producto), muestras de Modal/StatusBadge/EmptyState, y un botón real que conmuta `data-theme` en `<html>` — reemplaza la nota "dark only" de 0.6.0, que ya no era cierta.

### Corregido — afirmación de arquitectura desactualizada

`ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §4 ya no describe el contrato de tema claro como aspiracional — documenta lo implementado en esta versión y lo que queda explícitamente fuera de alcance (sombras por tema, `--accent-mint`).

Versión additive, retrocompatible — sin cambios de comportamiento para ningún consumidor real: 0.6.1 → 0.7.0 (minor).

## [0.6.1] — 2026-09-21

### Corregido — contradicción en las combinaciones válidas de `.ac-button--icon`

`components/button.css` decía que `--compact--icon` "no está pensado para una acción primaria o destructiva", mientras `design-system.manifest.json` decía que `--icon` "compone con CUALQUIER variante y CUALQUIER densidad" — la misma capacidad, dos reglas distintas. Reconciliado: las 16 combinaciones (4 variantes × 4 densidades) son técnicamente soportadas sin excepción; evitar `--destructive --compact --icon` en una acción de alta consecuencia es guía de diseño, no una combinación bloqueada, y ya no se agrupa con `--primary` (un botón primario compacto de icono no tiene el mismo problema de seguridad). El catálogo (`preview/components-canonical.html`) ahora muestra la combinación explícitamente en vez de omitirla en silencio, y `scripts/verify-button-contract.mjs` verifica mecánicamente que `button.css` y el manifest sigan diciendo lo mismo. Detalle completo: `docs/ecosystem-audit/06-icon-only-and-theme-reconciliation.md`.

### Corregido — afirmación incorrecta sobre tokens de tema claro

`ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §4 afirmaba que `src/tokens/semantic.css` ya tenía "bloques por tema" para modo claro. Verificado por inspección exhaustiva: no existe ningún `[data-theme='light']`, `.light`, `prefers-color-scheme` o `color-scheme: light` en ningún archivo de `src/tokens/`, `src/foundations/` ni `src/themes/` — el paquete ejecutable es hoy solo modo oscuro. Corregido en el propio documento de arquitectura, con la clasificación del gap (arquitectura genuina, no hueco de catálogo) y un seguimiento acotado propuesto ("Wave 1.6 — Light Theme Foundation"), no ejecutado en este release. Ningún consumidor real se ve afectado por esta corrección documental — no cambia ningún valor ejecutable.

## [0.6.0] — 2026-09-21

### Añadido — variante `.ac-button--icon` (`components/button.css`)

Wave 1.5 del rollout del ecosistema: cierra el gap de "botón cuadrado de solo icono" identificado en el Wave 1 Pilot 1 (`anclora-talent`, kebab menu de `ProjectCardMenu.tsx`) y confirmado con evidencia real en `anclora-command-center` (`src/ui/Modal.tsx`, cuyo botón de cerrar es hoy un glyph "✕" dentro de un `.ac-button--sm` no cuadrado). Composición ortogonal: `ac-button ac-button--<variant> [ac-button--compact] ac-button--icon` — el tamaño cuadrado se deriva de `--ac-button-min-height` ya en cascada, así que funciona en cualquier densidad existente (44/38/50/36px) sin una clase separada por combinación. Ningún repo consumidor se modifica en esta release.

Contrato de accesibilidad documentado explícitamente en el propio CSS: un botón de solo icono requiere `aria-label`/`aria-labelledby` — el icono nunca es el nombre accesible, y un `title`/tooltip no lo sustituye.

### Endurecido — precedencia de modificadores (hardening, no breaking)

El Wave 1 Pilot 1 encontró que el override local de `.ac-button` de `anclora-talent` (misma especificidad, declarado después en la cascada) anulaba silenciosamente `.ac-button--compact`. `.ac-button--icon` se define con el selector compuesto `.ac-button.ac-button--icon` específicamente para ser inmune a esta clase de fallo. `.ac-button--compact` y los demás modificadores existentes NO cambian de especificidad en este release (sería un cambio de mayor riesgo para consumidores reales existentes) — el contrato de precedencia queda documentado en `components/button.css` y en `docs/ecosystem-audit/05-button-contract-hardening.md`, con una mejora mayor (Cascade Layers) propuesta para una versión futura, no ejecutada aquí.

### Añadido — verificación de contrato de botón (`scripts/verify-button-contract.mjs`)

Nuevo script, incorporado a `npm run verify`: confirma mecánicamente que `.ac-button--icon` sigue usando el selector compuesto endurecido, que su tamaño sigue derivándose de `--ac-button-min-height` (ortogonal a la densidad), y que la documentación del contrato de precedencia y accesibilidad sigue presente en el archivo.

### Añadido — matriz de botones en el catálogo (`preview/components-canonical.html`)

Nueva sección con las combinaciones reales soportadas (estándar, compact, icon-only en ambas densidades, incluyendo variantes secondary/ghost/destructive). Solo modo oscuro: el paquete todavía no shipea un override de tema claro para sus propios tokens semánticos (cada consumidor define el suyo localmente) — documentado explícitamente en el catálogo en vez de fabricar una vista clara que el paquete no puede producir todavía.

### Documentación — revisión de los overrides de `anclora-talent`

`docs/ecosystem-audit/05-button-contract-hardening.md` clasifica cada propiedad que `anclora-talent` sigue sobreescribiendo en `.ac-button` (radius: ya migrado a `--ac-button-radius`; font-size/font-weight/letter-spacing: sin extension point sancionado, drift documentado y tolerado como identidad de marca, no legitimado como parte del contrato Core; padding-inline: drift menor, migrable trivialmente; text-transform: requisito de producto legítimo). No se modifica Talent.

## [0.5.0] — 2026-09-21

### Añadido — variante de densidad `.ac-button--compact` (`components/button.css`)

Resultado directo del audit de ecosistema (`docs/ecosystem-audit/`, Fases 0-5): `anclora-talent` había construido su propia familia paralela de botones (`.dashboard-button`, nunca derivada de `.ac-button`) porque el DS no ofrecía ninguna anatomía más pequeña/densa que la pill de marketing por defecto para superficies de workspace (filas de entidad, menús de tarjeta, barras de herramientas). `--compact` es la vía canónica sancionada para esa necesidad: `border-radius` pasa a ser un punto de extensión (`--ac-button-radius`, antes fijo a `--radius-pill`), y la variante usa `--radius-sm`, `font-size: 0.7rem`, `font-weight: 600`, sin mayúsculas forzadas. Cambio aditivo, sin ruptura — `.ac-button` sin la variante se comporta exactamente igual que antes. No se migra ningún consumidor en esta release; ver `ANCLORA-DESIGN-SYSTEM-MIGRATION-ROADMAP.md`.

### Añadido — gobernanza legible por agentes en `design-system.manifest.json`

Nuevas claves de nivel superior: `componentStatus` (canonical vs. needsConsumerEvidence, para que un agente no asuma que los 31 componentes shipeados tienen el mismo nivel de validación real), `profiles` (P-MKT/P-WKS, qué puede y no puede sobreescribir cada uno), `extensionPoints` (qué custom properties de cada componente son el mecanismo sancionado de variación), `prohibitedPatterns` (patrones de drift ya observados en el ecosistema real, listados explícitamente para que un agente no los repita) y `deprecated`. No cambia ningún entrypoint existente — `scripts/verify-manifest.mjs` solo valida `entrypoints`, `version` y `recommendedImport`, así que esta ampliación no interfiere con la verificación existente.

## [0.4.1] — 2026-09-01

### Renombrado — Anclora SyncXML → Anclora GuestHub

El producto `anclora-syncxml` pasa a llamarse `anclora-guesthub`. Identidad visual sin cambios: se conserva el acento `#bfa46a` y el emblema de ondas (no hay rediseño; el artwork dedicado GuestHub sigue pendiente — gap documentado).

- `tokens/core.css`: `--coin-syncxml` → `--coin-guesthub` (valor `#bfa46a` intacto). Se mantiene `--coin-syncxml: var(--coin-guesthub)` como **alias legacy deprecado** hasta que los consumidores migren.
- `themes/product.css`: nuevo selector `.product-anclora-guesthub`; `.product-anclora-syncxml` se conserva como **selector alias deprecado** (mismas declaraciones, una release). Los selectores `*-syncxml-showcase` quedan fuera de alcance, sin cambios.
- Ejemplo premium renombrado: `src/examples/premium/syncxml-reservation-dashboard.example.html` → `guesthub-reservation-dashboard.example.html` (título, clase de producto y nombre actualizados; las menciones a SES.HOSPEDAJES / RD 933/2021 se conservan por seguir siendo capacidades válidas).
- Logos renombrados: `assets/logos/anclora-syncxml.{png,webp}` → `anclora-guesthub.{png,webp}` y `anclora-syncxml-reducido.png` → `anclora-guesthub-reducido.png` (renombrado nominal; el contenido de la imagen aún muestra la marca SyncXML — pendiente re-export por brand/design). Los assets `anclora-syncxml-showcase*` no se tocan.
- Actualizados `preview/product-accents.html`, `preview/logos-grid.html`, `src/examples/internal/group-ecosystem-gateway.example.html` y `docs/consumer-status-map.md`.

## [0.4.0] — 2026-08

### Añadido — modal de detalle adaptativo (`modal.css`)

`ac-modal` gana un sistema determinista de tamaño y arquitectura de scroll para overlays de detalle centrados (COMMAND_CENTER_ADAPTIVE_DETAIL_MODALS):

- Variante `--detail`: shell grid `auto / minmax(0,1fr) / auto`, `max-height: calc(100vh - 64px)`, `overflow: hidden` en el shell y `overflow-y: auto` + `overscroll-behavior: contain` en el body — header/body/footer con scroll solo en el body. Animación sutil de entrada (fade + scale) con `prefers-reduced-motion: reduce` respetado.
- Clases de tamaño `--compact | --medium | --wide | --large`: `clamp()` con preferencia en vw y máximos por clase; breakpoint `max-width: 1100px` que entrega la mayor parte del viewport al modal en tablet/pequeño. Viewport-safe siempre (el ancho nunca excede `calc(100vw - 48px)` vía `width: min(...)`).
- La base `ac-modal` (720px) queda intacta: los diálogos de confirmación existentes no cambian. El patrón es opt-in, solo para detail overlays.

## [0.3.1] — 2026-08

### Añadido — `components/status-badge.css` (`.ac-status-badge`)
Promovido desde `anclora-command-center` (era `src/ui/status-badge.css` local, sin variante canónica `ac-*` disponible — el `.status-badge` de `foundations/primitives.css` pertenece a la capa legacy pre-`ac-` y colisiona con `.btn`/`.ac-button`, no es reutilizable). Seis tonos semánticos genéricos (`success | warning | danger | info | neutral | muted`), compuesto solo con tokens de `tokens/semantic.css` — sin paleta nueva. Registrado en `package.json#exports`, `design-system.manifest.json` y `components/index.css`.

## [0.3.0] — 2026-08

### ⚠️ Breaking — `anclora-group-landing` cambia de identidad completa
Verificado contra su repo real (`src/styles/tokens.css`, comentario explícito "Color (brand book v2.0 — sección 6)"): la landing pública **no** usa el tema genérico Portfolio (`--portfolio-gold`) como tenía asignado — usa la paleta completa del brand book. `body { background: var(--anchor-navy) }` confirmado en `globals.css` real.

- Sacado del grupo de selectores compartido con `anclora-portfolio`/`-showcase`/`azure-bay-landing-page`/`fiscal-showcase`
- Nuevo bloque propio: `--bg: var(--anchor-navy)` (`#0A1F3D`), `--accent: var(--signal-blue)` (`#5FA8FF`, acento interactivo dominante confirmado por uso real en enlaces/highlights), `--action-primary-bg: var(--command-purple)` (`#6C63FF`, restringido a botón primario, igual que en el repo)
- Nuevos tokens añadidos a `core.css`: `--anchor-navy`, `--deep-ocean`, `--harbor-mist` (los de `--command-purple`/`--signal-blue` ya existían desde v0.2.0)

### Verificado sin corrección — 3 apps más con coincidencia exacta
- `anclora-synergi`: `--coin-synergi` (`#8c5ab4`) y todo el bloque de tema ya coincidían exactamente con `--synergi-champagne` y el resto de variables reales (`globals.css`)
- `anclora-group`: coincidencia total — `--group-ink`, `--group-surface`, `--group-surface-2`, `--group-copy`, `--group-silver` (=`--coin-group`) exactos. Tipografía real confirmada como `Georgia, serif`, validando la regla "Entidad Matriz = serif" ya documentada
- Hallazgo adicional: el código real de `anclora-group` (`GroupWorkspaceShell.tsx`) declara la arquitectura de 3 capas del ecosistema (entrada/operativa/activación) con apps asignadas — usado para construir el ejemplo de referencia con datos reales, no ilustrativos

### Añadido — 3 ejemplos nuevos en `src/examples/`
`synergi-partner-workspace` (premium), `group-ecosystem-gateway` (internal), `group-landing-corporate` (portfolio) — con esto, cobertura de ejemplos completa para las 22 apps activas (directa o vía tema compartido con su app madre).

## [0.2.0] — 2026-08

### ⚠️ Breaking / requiere revisión visual
Cambios de valor en tokens ya potencialmente consumidos. Cualquier app que use `--coin-pe`, `--coin-advisor`, `--coin-impulso` o `--coin-command` verá un cambio de color al actualizar.

### Corregido — tokens de acento verificados contra el código fuente real de cada app
Todas las correcciones se hicieron verificando directamente el repo de cada app (variables CSS deliberadas, no coincidencias incidentales de color), no por inspección visual ni suposición.

| App | Antes | Ahora | Motivo |
|---|---|---|---|
| `anclora-private-estates` (+ `-landing`) | `#c9a95f` sobre fondo `#0d1b1a` | `#d4af37` sobre fondo `#07252f` | El valor anterior correspondía a `--pe-deep-*`, una variante secundaria para gradientes de sección — no al fondo real de página (`body { background: var(--pe-bg) }`). El oro real de modo oscuro (activo por defecto) es `#D4AF37`, no `#C9A95F` (que es el oro de modo claro, nunca activado). |
| `anclora-advisor-ai` | `#7ec6c0` sobre verde-negro | `#1dab89` sobre navy (`#162944`) | Verificado en `globals.css` real (`--advisor-accent`, `--advisor-primary`). |
| `anclora-impulso` | `#e07a3c` | `#ff6a00` | Confirmado por comentario explícito en el código real (`/* Accent Orange #FF6A00 */`). |
| `anclora-command-center` | `#c24a4a` sobre magenta-oscuro | `#6c63ff` + nuevo `--coin-command-2: #5fa8ff` sobre púrpura-navy (`#121021`) | Verificado en `src/index.css` real (`--accent`, `--secondary`). Sin relación alguna con el valor anterior. |

### Añadido — 6 apps de producto nuevas, verificadas contra su repo real
Ninguna existía en `src/themes/product.css` hasta esta versión.

- `anclora-fiscal` — `--coin-fiscal: #d7a957` (navy `#070c13`)
- `anclora-visionflow` — `--coin-visionflow: #5c70d8` (navy-índigo `#0f1520`)
- `anclora-filestudio` — `--coin-filestudio: #4fb3bf` (sin matiz de marca propio en el repo real — accent elegido solo para diferenciación de wayfinding; el resto de la paleta sí refleja los tonos neutros reales)
- `anclora-energyscan` (+ `-showcase`, tema compartido completo) — `--coin-energyscan: #00dc82`
- `anclora-syncxml` (+ `-showcase`, tema compartido completo) — `--coin-syncxml: #bfa46a`
- `anclora-azure-bay-landing-page`, `anclora-portfolio-showcase`, `anclora-group-landing`, `anclora-fiscal-showcase` — añadidas al grupo de tema Portfolio existente (acento genérico `--portfolio-gold`, no propio)

### Cambiado — gobernanza
- `anclora-talent` marcado como **pausado, fuera del alcance activo** (comentario en `product.css`, no eliminado — sigue siendo el único consumidor históricamente validado, ver `docs/validated-consumers-matrix.md`).
- `docs/validated-consumers-matrix.md` y `docs/consuming-from-apps.md` actualizados con nota de estado sobre la pausa de Talent.
- `preview/product-accents.html` reescrito para leer `var(--coin-*)` en vez de valores hexadecimales fijos — evita que vuelva a desincronizarse silenciosamente de `core.css` en el futuro.
- `preview/logos-grid.html` ampliado de 10 a 23 apps (Talent mostrado en escala de grises).
- `assets/logos/` — añadidos los 13 logos que faltaban para las apps nuevas.

### Sin resolver / fuera de alcance de esta versión
- Tipografía diferenciada por tier (Ultra Premium: Cardo+Fraunces, Premium: DM Sans) explorada en sesión de diseño paralela, no incorporada — el repo sigue usando `--font-internal`/`--font-sans` de forma plana. Pendiente de decisión de arquitectura.
- `src/examples/*.example.html` — las 6 apps nuevas no tienen ejemplo estático de referencia todavía (solo existen 3, uno por tier, previos a esta versión).
- Resto de `docs/` (20 documentos) sin auditar contra el estado actual del ecosistema.

## [0.1.0] — fecha original de creación del repo

Versión inicial: 10 apps (`group`, `private-estates`, `synergi`, `data-lab`, `nexus`, `content-generator-ai`, `advisor-ai`, `talent`, `impulso`, `command-center`), arquitectura de tokens/taxonomy/themes/components/patterns establecida.
