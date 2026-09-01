# Changelog

Todas las versiones del design system se documentan aquí. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

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
