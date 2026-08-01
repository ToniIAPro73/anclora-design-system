# Changelog

Todas las versiones del design system se documentan aquí. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

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
