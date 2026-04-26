# Design System Operating Model

Fecha: 2026-04-20
Repositorio: `anclora-design-system`

## 1. Rol del repo en el ecosistema

Este repositorio debe operar como la fuente ejecutable de verdad para:

- tokens de marca y UI
- foundations
- primitives
- componentes compartidos
- patterns visuales
- motion primitives
- assets comunes
- reglas implementables de marca

La bóveda no implementa UI. La bóveda define:

- contratos
- gobernanza
- trazabilidad
- decisiones
- excepciones
- cumplimiento

## 2. Frontera formal con la bóveda

La relación correcta debe ser:

- Bóveda: define `que` debe cumplirse
- Design system: define `como` se implementa
- Apps: consumen el sistema y materializan casos de uso concretos

### 2.1 Mapa contrato -> artefacto ejecutable

`brand contract`
- Se implementa como tokens, semantic tokens, tipografía, superficies, iconografía, uso de logos y reglas de accent.

`modal contract`
- Se implementa como primitive de overlay, modal frame, tamaños canonicos, backdrop, capas y estados.

`ui motion contract`
- Se implementa como tokens de duración/easing, lifts por familia de superficie, halo sweep, focus ring y `prefers-reduced-motion`.

`localization contract`
- Se implementa como reglas de copy density, escalado tipográfico, botones, labels, truncation y componentes preparados para ES/EN/DE.

`surface contract`
- Se implementa como matrices de `tier`, `domain`, `product_archetype`, `system_role` y `ecosystem_clusters`.

## 3. Arquitectura objetivo del repo

La estructura objetivo sobria y mantenible es:

```text
assets/
  logos/
  icons/
  imagery/

docs/
  design-system-audit-and-target-architecture.md
  design-system-operating-model.md

src/
  system.css
  tokens/
    core.css
    semantic.css
  taxonomy/
    tier.css
    domain.css
    archetype.css
    role.css
    clusters.css
  themes/
    product.css
  foundations/
    typography.css
    primitives.css
  components/
    navigation/
    feedback/
    forms/
    data-display/
    overlays/
  patterns/
    entry/
    workspace/
    executive/
  examples/
    premium/
    internal/
    portfolio/
```

## 4. Criterio de clasificación obligatorio

`token`
- Valor atomico bruto: color, radio, spacing, sombra, duration, easing, font family.

`semantic token`
- Alias con intencion de uso: `surface-panel`, `text-primary`, `action-primary-bg`, `focus-ring`.

`taxonomy layer`
- Ajuste sistemico por combinacion de negocio: tier, domain, archetype, role, cluster.

`product theme`
- Override concreto por producto cuando la taxonomia no basta o cuando el producto tiene un accent/canvas propio.

`primitive`
- Bloque reusable sin semantica de negocio: surface, field, topbar, stack, cluster, split, shell frame.

`shared component`
- Componente canonico con API estable: button, card, modal, app tile, stat card, table, side nav, language switcher.

`pattern`
- Composicion reusable de varios componentes para una necesidad recurrente: hero premium, app grid, workspace shell, executive KPI strip.

`example`
- Referencia ejecutable por tipo de app que demuestra como consumir patterns, primitives y taxonomia sin convertir una composicion concreta en canon.

`app-specific composition`
- Pantalla o seccion que depende de copy, flujos o datos concretos de una app y no debe subir al canon.

## 5. Foundations y componentes canonicos prioritarios

### 5.1 Foundations obligatorias v1

- color system y semantic surfaces
- typography roles
- spacing, radii y elevation
- layout primitives: `shell-frame`, `stack`, `cluster`, `hero-split`
- action primitives: botones, chips, badges
- form primitives: input, select, textarea, field label
- glass/topbar primitives
- focus, hover, press y reduced-motion

### 5.2 Componentes canonicos obligatorios v1

- `Button`
- `Card`
- `SurfacePanel`
- `Topbar`
- `SidebarNav`
- `Stepper`
- `Tabs`
- `Breadcrumb`
- `Subnav`
- `AppTile`
- `MetricCard`
- `StatStrip`
- `FormField`
- `DataTable`
- `EmptyState`
- `Toast`
- `LanguageSwitcher`
- `ThemeSwitcher`
- `Modal`
- `Drawer`
- `PreviewOverlay`
- `Toast`
- `EmptyState`
- `SectionHeading`

### 5.3 Patterns obligatorios v1

- `PremiumHeroSplit`
- `EcosystemAppGrid`
- `WorkspaceShell`
- `ExecutiveSummaryBand`
- `PartnerAdmissionPanel`
- `PortfolioLeadCapturePanel`

## 6. Aplicacion de la taxonomia nueva

La nueva taxonomia no debe vivir solo en documentos; debe ser consumible desde el sistema.

### 6.1 Principio

La UI final debe poder componerse a partir de varias capas:

- `tier-*`
- `domain-*`
- `archetype-*`
- `role-*`
- `cluster-*`
- `product-*`

### 6.2 Casos ya fijados

`anclora-impulso`
- `tier-premium`
- `domain-fitness-wellness`

`anclora-talent`
- `tier-premium`
- `domain-human-capital`

`anclora-command-center`
- `tier-premium`
- `domain-cross-domain`

## 7. Relacion con tipos de apps

La taxonomía de `tier` no se infiere visualmente ad hoc. Debe obedecer los contratos de la bóveda y materializarse en capas CSS, patterns y examples consumibles.

Fuente contractual:

- `ANCLORA_INTERNAL_APP_CONTRACT.md`
- `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`
- `ANCLORA_PREMIUM_APP_CONTRACT.md`
- `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
- `UI_MOTION_CONTRACT.md`

`Internal`
- prioriza densidad operativa, legibilidad, shell persistente y menor ceremonialidad
- usa motion corto y funcional
- debe expresarse con `tier-internal` y patterns operativos

`Portfolio`
- conserva identidad editorial, fondos claros o marfil cuando proceda, contraste alto, CTA visible y motion sobrio
- debe expresarse con `tier-portfolio` y patterns de landing, gallery y lead capture

`Premium`
- usa accent fuerte, dark-first o tema editorial diseñado, hero split, lift moderado y sweep selectivo
- debe expresarse con `tier-premium` y patterns de shell premium, dashboards editoriales y funnels

`Ultra Premium`
- usa serif display, superficies más ceremoniales, contrastes más cuidados y motion distintivo pero disciplinado
- debe expresarse con `tier-ultra-premium` y patterns inmersivos de alto valor

Documento puente:

- [docs/tier-taxonomy-and-transformations.md](/home/toni/projects/anclora-design-system/docs/tier-taxonomy-and-transformations.md)
- [docs/vault-bridge-and-contract-coverage.md](/home/toni/projects/anclora-design-system/docs/vault-bridge-and-contract-coverage.md)

## 8. Plan por fases

### Fase 1

- consolidar `src/` como entrada canonica
- separar taxonomia de producto
- convertir previews en validadores de contrato
- cerrar inventario de components/patterns canonicos

### Fase 2

- introducir componentes reales reutilizables con API estable
- construir examples por tipo de app
- añadir modal, drawer, navigation y data display

### Fase 2.1

- formalizar `src/patterns/` con contratos por anatomia, slots, variantes y restricciones
- formalizar `src/examples/` con referencias Premium, Internal y Portfolio
- usar examples para validar adopcion sin contaminar la capa canonica

### Fase 3

- empaquetado versionable
- snapshots visuales
- accesibilidad automatizada
- docs vivas y consumo desde apps

### Fase 4

- sincronizacion formal con contratos de la bóveda
- matrices de cumplimiento por repo consumidor
- versionado de breaking changes del sistema

Artefactos operativos de alineación:

- [docs/vault-bridge-and-contract-coverage.md](/home/toni/projects/anclora-design-system/docs/vault-bridge-and-contract-coverage.md)
- [docs/validated-consumers-matrix.md](/home/toni/projects/anclora-design-system/docs/validated-consumers-matrix.md)
- [docs/contract-redesign-backlog.md](/home/toni/projects/anclora-design-system/docs/contract-redesign-backlog.md)
