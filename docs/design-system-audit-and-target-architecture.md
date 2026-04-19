# Auditoria del repo y arquitectura objetivo

Fecha: 2026-04-19
Repo auditado: `anclora-design-system`
Objetivo: convertir este repositorio en la referencia ejecutable de marca y UI para todo el ecosistema Anclora.

## 1. Estado actual del repo

### 1.1 Lo que existe hoy realmente

El repo actual no es todavia un design system ejecutable en sentido estricto. Hoy contiene:

- Un `README.md` muy completo como manifiesto de marca, voz, foundations visuales y motion.
- Un `colors_and_type.css` con:
  - tokens base
  - algunos scopes de producto
  - unas pocas clases semanticas de texto
  - dos primitives parciales de superficie: `.surface-card` y `.surface-frame`
- Tres `ui_kits/*/index.html` estaticos y autocontenidos:
  - `anclora-group`
  - `anclora-private-estates`
  - `anclora-synergi`
- Varias previews HTML para inspeccionar fragments visuales:
  - botones
  - badges
  - surfaces
  - radii
  - type specimen
  - sombras
  - logos
- Assets compartidos en `assets/logos/`
- Fuentes locales en `fonts/`

### 1.2 Lo que NO existe hoy

No hay:

- `package.json`
- monorepo
- paquetes versionables
- build pipeline
- Storybook o sistema de docs vivo
- libreria de componentes reutilizable
- tipado de tokens
- export JSON o CSS organizado por capas
- tests visuales
- tests de accesibilidad
- contratos ejecutables por tier/domain/role
- primitives de layout, overlays, navigation, forms o data display empaquetadas
- distincion formal entre componente canonico y composicion especifica de app

### 1.3 Diagnostico sintetico

El repo actual funciona mejor como:

- brand seed ejecutable minima
- biblioteca de muestras visuales
- referencia visual para generar mocks o prototipos

Todavia no funciona bien como:

- fuente de verdad implementable para productos
- libreria compartida reutilizable
- capa contractual consumible por apps
- sistema con escalado multi-producto y multi-tier

## 2. Problemas detectados

### 2.1 Problemas estructurales

- Todo esta demasiado concentrado en un unico CSS y HTMLs sueltos.
- La estructura no separa tokens, foundations, primitives, components, patterns y assets.
- No existe empaquetado ni distribucion para consumo desde apps reales.
- Los UI kits mezclan foundations, components y composiciones completas en un solo archivo.

### 2.2 Problemas de mantenibilidad

- Gran parte del valor esta duplicado inline dentro de `index.html`.
- Cambios en motion, radii, typography o surfaces obligarian a tocar multiples demos a mano.
- No hay versionado de contratos de UI.
- No hay mecanismo para validar regresiones visuales.

### 2.3 Problemas de cobertura

- Solo hay tres superficies relativamente desarrolladas.
- El ecosistema descrito en README es mas amplio que la cobertura real.
- Productos como Talent, Impulso y Command Center solo existen como color/logo/narrativa, no como sistema implementable.

### 2.4 Problemas de contrato

- El README describe contratos con buen criterio, pero hoy no estan modelados como artefactos consumibles.
- La taxonomia nueva de la boveda todavia no aterriza en este repo.
- El sistema actual sigue pensando mas por "producto demo" que por combinacion de:
  - tier
  - domain
  - product_archetype
  - system_role
  - ecosystem_clusters

### 2.5 Problemas de frontera

- No esta clara la frontera entre:
  - token
  - semantic token
  - primitive
  - shared component
  - pattern
  - app-specific composition
- Eso hace facil que el repo derive a galeria de pantallas en lugar de design system.

## 3. Lectura honesta del valor actual

### 3.1 Lo que si merece conservarse

- El `README.md` tiene una direccion de marca fuerte, nada generica, y sirve como fundamento narrativo.
- `colors_and_type.css` contiene una primera version util de:
  - escalas de spacing
  - radii
  - elevation
  - motion timing
  - tipografia
  - acentos por producto
- Los tres UI kits son valiosos como:
  - visual benchmark
  - seed de patrones
  - banco de decisiones concretas
- Los logos y las fuentes ya constituyen una capa de assets compartidos real.

### 3.2 Lo que conviene descomponer o reemplazar

- `colors_and_type.css` debe dejar de ser el contenedor unico.
- Los `index.html` deben dejar de ser la unidad principal de reutilizacion.
- Las previews actuales deben migrar a docs ejecutables con componentes reales debajo.
- La definicion de producto no debe estar hardcodeada solo como clase CSS o como demo completa.

## 4. Distinciones canonicas que el repo debe imponer

### 4.1 Token

Valor atomico de sistema, no renderiza UI por si solo.

Ejemplos:

- `color.gold.500`
- `space.6`
- `radius.card.lg`
- `duration.base`
- `font.family.display`

### 4.2 Semantic token

Alias implementable que expresa intencion de uso, no color bruto.

Ejemplos:

- `surface.canvas`
- `surface.panel`
- `text.primary`
- `text.muted`
- `border.subtle`
- `accent.primary`
- `focus.ring`
- `status.success.surface`

### 4.3 Primitive

Bloque de UI de bajo nivel, reusable, sin narrativa de producto.

Ejemplos:

- `Box`
- `Stack`
- `Cluster`
- `Text`
- `Heading`
- `ButtonPrimitive`
- `Surface`
- `Field`
- `Input`
- `ModalFrame`
- `Badge`

### 4.4 Shared component

Componente canonico del sistema con API estable y semantica de uso clara.

Ejemplos:

- `Button`
- `Card`
- `MetricCard`
- `AppTile`
- `Topbar`
- `SidebarNav`
- `StatStrip`
- `DataTable`
- `LanguageSwitcher`
- `Modal`

### 4.5 Pattern

Composicion reusable de varios componentes canonicos para un problema recurrente.

Ejemplos:

- `AuthShell`
- `AdmissionProgressPanel`
- `EcosystemAppGrid`
- `PremiumHeroSplit`
- `KpiDashboardSection`
- `CuratedListingsGrid`
- `EmptyStatePanel`

### 4.6 App-specific composition

Pantalla o variante que responde a logica o contenido propio de una app concreta y no debe entrar como canonico.

Ejemplos:

- hero exacto de Private Estates con copy y featured property concretos
- grid de apps habilitadas para un rol real de Group
- tabla de referrals con columnas exactas de Synergi

Regla:

- si una pieza depende de narrativa, contenido o workflow especifico de una app, no entra en `components`; entra en `examples` o `patterns` si abstraible.

## 5. Arquitectura objetivo propuesta

### 5.1 Principio rector

La boveda define cumplimiento y decisiones.
Este repo define implementacion.

Eso implica que este repo debe publicar artefactos consumibles por apps reales, no solo referencias esteticas.

### 5.2 Estructura objetivo de alto nivel

```text
anclora-design-system/
  docs/
    foundations/
    contracts/
    patterns/
    governance-bridge/
  packages/
    tokens/
    foundations/
    primitives/
    components/
    patterns/
    assets/
    docs-site/
  examples/
    group-portal/
    private-estates/
    synergi/
    internal-saas/
    premium-landing/
  tests/
    visual/
    a11y/
    contract/
```

### 5.3 Detalle por paquete

#### `packages/tokens`

Fuente de verdad para tokens de diseño.

Deberia contener:

- tokens base crudos
- semantic tokens
- themes por tier
- overlays por domain
- overrides por product
- motion tokens
- localization-safe typographic rules
- export a:
  - CSS variables
  - JSON
  - TypeScript

Subestructura sugerida:

```text
packages/tokens/
  src/
    core/
      color.json
      space.json
      radius.json
      shadow.json
      motion.json
      typography.json
      z-index.json
    semantics/
      surfaces.json
      text.json
      borders.json
      actions.json
      status.json
    themes/
      tier/
        premium.json
        ultra-premium.json
        internal.json
        portfolio.json
      domain/
        fitness-wellness.json
        human-capital.json
        cross-domain.json
        real-estate.json
      products/
        anclora-group.json
        anclora-private-estates.json
        anclora-synergi.json
        anclora-talent.json
        anclora-impulso.json
        anclora-command-center.json
  dist/
```

#### `packages/foundations`

Normas implementables que no son componentes pero si comportamiento sistemico.

Deberia incluir:

- typography recipes
- layout scales
- elevation recipes
- motion primitives
- focus states
- surface recipes
- grid and shell rules
- icon rules
- density rules por archetype

#### `packages/primitives`

Biblioteca de building blocks neutrales.

Deberia incluir:

- layout primitives
- text primitives
- action primitives
- form primitives
- overlay primitives
- data display primitives basicos

#### `packages/components`

Componentes canonicos reutilizables, con API estable.

Deberia incluir:

- componentes puros, sin narrativa de negocio
- variantes por tier y archetype solo donde el contrato lo necesite
- stories y tests visuales

#### `packages/patterns`

Composiciones aprobadas por el sistema.

Deberia incluir:

- auth shells
- hero families
- app switchers
- dashboards base
- listings layouts
- partner-workspace sections

#### `packages/assets`

Fuente de verdad para:

- logos
- medallions
- shared imagery rules
- icon wrappers
- downloadable brand assets

#### `packages/docs-site`

Sitio vivo del design system.

Debe documentar:

- tokens
- component APIs
- patterns
- do/dont
- contract mappings
- previews por tier y por producto

### 5.4 Estructura de ejemplos

`examples/` no es el sistema; es donde se demuestra el sistema.

Debe contener composiciones completas por categoria:

- `group-portal`
- `private-estates`
- `synergi`
- `internal-saas-shell`
- `premium-marketing-shell`

Regla:

- si algo vive solo en `examples`, no es automaticamente canonico.

## 6. Modelo de tematizacion recomendado

### 6.1 Orden de responsabilidad

El sistema deberia resolver estilos por capas:

1. Core tokens universales
2. Semantic tokens
3. Tier theme
4. Domain overlay
5. Product override
6. Context override opcional

Ejemplo conceptual:

`premium` + `human_capital` + `anclora-talent`

Esto permite que la taxonomia aprobada en la boveda sea operable en UI real sin duplicar sistemas completos por app.

### 6.2 Por que no conviene seguir solo por producto

Si cada producto define su propia "mini UI library", ocurrira:

- divergencia de motion
- duplicacion de componentes
- deriva de identidad
- imposibilidad de gobernar contratos transversales

El producto debe ser el ultimo override, no el punto de partida.

## 7. Foundations prioritarias para una V1 solida

Estas foundations deben existir antes de hablar de una libreria amplia de componentes.

### 7.1 Brand and theming foundations

- color system base
- semantic color roles
- typography scale
- font role mapping
- spacing scale
- radius scale
- elevation scale
- border recipes
- glass and panel recipes

### 7.2 Motion foundations

- duration scale
- easing scale
- hover lift contract
- press contract
- focus-visible contract
- metallic halo sweep primitive
- reduced motion policy
- overlay enter/exit contract
- modal/backdrop blur contract

### 7.3 Layout foundations

- shell widths
- content gutters
- section spacing
- hero split grid
- card grid rules
- dashboard density rules
- mobile collapse rules

### 7.4 Content and localization foundations

- eyebrow/title/body hierarchy
- sentence case rules
- uppercase tracking rules
- number formatting slots
- long-label handling
- localization spacing tolerances
- ES-first content constraints
- dark-theme autofill and input legibility rules

### 7.5 Accessibility foundations

- focus ring system
- minimum contrast targets
- reduced motion behavior
- keyboard interaction defaults
- modal focus management contract
- table density and responsive degradation rules

## 8. Lista priorizada de componentes canonicos

### 8.1 Tier 0: primitives obligatorios

- `Box`
- `Stack`
- `Inline`
- `Cluster`
- `Grid`
- `Container`
- `Text`
- `Heading`
- `Eyebrow`
- `Surface`
- `Divider`
- `Icon`

### 8.2 Tier 1: acciones y formularios

- `Button`
- `IconButton`
- `ButtonGroup`
- `Field`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `RadioGroup`
- `FormHint`
- `FormMessage`

### 8.3 Tier 1: feedback y estado

- `Badge`
- `Tag`
- `Notice`
- `EmptyState`
- `ProgressSteps`
- `Spinner`
- `Skeleton`

### 8.4 Tier 1: estructura y navegacion

- `Topbar`
- `SidebarNav`
- `Tabs`
- `Breadcrumbs`
- `SectionHeader`
- `AppShell`
- `Panel`
- `Card`
- `Modal`
- `Drawer`

### 8.5 Tier 1: data display

- `MetricCard`
- `StatsStrip`
- `DefinitionList`
- `Table`
- `ListItemCard`
- `PropertyCard`
- `AppTile`

### 8.6 Tier 2: patrones canonicamente reutilizables

- `AuthShell`
- `HeroSplit`
- `EcosystemAppGrid`
- `KpiSection`
- `AdmissionProgressPanel`
- `CuratedListingsGrid`
- `WorkspaceOverviewSection`
- `RoleAccessPanel`

### 8.7 Componentes que NO meteria como canonicos en la V1

- dashboard ejecutivo completo de Command Center
- workflow comercial completo de Nexus
- funnel completo de Talent
- landing final cerrada de Private Estates

Esos deben construirse con:

- foundations
- components
- patterns

Pero no convertirse directamente en componentes base del sistema.

## 9. Relacion entre design system y contratos de la boveda

### 9.1 Frontera recomendada

La boveda debe seguir siendo autoridad de:

- gobernanza
- taxonomia
- contratos normativos
- excepciones
- trazabilidad
- decision records

Este repo debe ser autoridad de:

- tokens implementables
- surface recipes
- motion primitives
- component APIs
- pattern libraries
- asset packaging
- visual and interaction examples

### 9.2 Traduccion operativa de contratos

La boveda expresa:

- que superficies existen
- que roles y estados deben soportarse
- que restricciones aplican

El design system implementa eso como:

- tokens
- variants
- props
- state models
- accessibility rules
- test fixtures

### 9.3 Mapeo propuesto de contratos

#### Contrato de marca

Debe aterrizar en:

- theming tokens
- typography roles
- logo usage package
- color and material recipes
- docs de do/dont

#### Contrato de modal

Debe aterrizar en:

- `Modal`, `Drawer`, `DialogHeader`, `DialogBody`, `DialogFooter`
- backdrop rules
- focus trap
- motion enter/exit
- size variants

#### Contrato de UI motion

Debe aterrizar en:

- motion tokens
- reusable motion recipes
- interaction states por surface family
- reduced-motion implementation
- regression tests visuales

#### Contrato de localization

Debe aterrizar en:

- text primitives con slots robustos
- sizing rules para copy expansion
- number/date formatting adapters
- guidelines ES-first
- stress cases en docs y tests

### 9.4 Relacion con apps Premium / Ultra Premium / Internal / Portfolio

La recomendacion es que el design system exponga themes de primer nivel por `tier`.

Ejemplo:

- `theme-premium`
- `theme-ultra-premium`
- `theme-internal`
- `theme-portfolio`

Y que luego cada app aplique:

- overlay de `domain`
- override de `product`
- densidad o layout por `product_archetype`

## 10. Propuesta de reorganizacion concreta del repo

### 10.1 Estado transitorio recomendado

Antes de una migracion grande, reorganizaria el repo en dos capas:

```text
docs/
  legacy-audit/
  foundations/
  contracts/
src/
  tokens/
  foundations/
  primitives/
  components/
  patterns/
  assets/
examples/
  group/
  private-estates/
  synergi/
legacy/
  preview/
  ui_kits/
  colors_and_type.css
```

Esto permite:

- preservar el material actual
- marcarlo como legado o seed
- empezar la nueva arquitectura sin romper referencias

### 10.2 Principio de migracion

No migrar por pantallas.
Migrar por capas:

1. tokens
2. foundations
3. primitives
4. shared components
5. patterns
6. examples

## 11. Plan de implementacion por fases

### Fase 0: Auditoria y congelacion del seed

- mover previews y UI kits actuales a `legacy/`
- documentar que piezas se consideran benchmark visual
- congelar el CSS actual como referencia historica, no como fuente futura

### Fase 1: Tokens y foundations ejecutables

- crear paquete de tokens
- separar core tokens y semantic tokens
- modelar tier/domain/product
- exportar CSS variables y JSON
- crear foundations de typography, surfaces, motion y layout

Resultado esperado:

- una base consumible por cualquier app sin copiar CSS inline

### Fase 2: Primitives y componentes canonicos

- implementar primitives base
- implementar Button, Surface, Card, Badge, Input, Modal, AppShell, AppTile, MetricCard
- definir APIs estables
- documentar variantes permitidas

Resultado esperado:

- una libreria real y reusable

### Fase 3: Patterns aprobados

- construir HeroSplit
- construir AuthShell
- construir EcosystemAppGrid
- construir AdmissionProgressPanel
- construir CuratedListingsGrid
- construir WorkspaceOverviewSection

Resultado esperado:

- composiciones reutilizables sin contaminar la capa de componentes base

### Fase 4: Docs vivas y validacion

- montar docs site
- añadir stories o previews vivas
- tests visuales por theme
- pruebas basicas de accesibilidad
- fixtures de localization

Resultado esperado:

- design system verificable, navegable y gobernable

### Fase 5: Alineacion con la boveda

- documentar bridge formal repo <-> boveda
- mapear contratos de boveda a artefactos del sistema
- preparar tabla de cobertura contractual
- abrir backlog de contratos a rediseñar segun la nueva realidad implementable

Resultado esperado:

- la boveda puede reformular contratos sobre artefactos reales, no sobre abstracciones

## 12. Recomendacion final

La direccion correcta no es embellecer mas los HTML actuales.
La direccion correcta es convertir este seed visual en una arquitectura por capas con consumo real.

Mi recomendacion practica:

- conservar el material actual como benchmark
- no tratar los UI kits actuales como libreria
- introducir cuanto antes una separacion estricta entre tokens, foundations, primitives, components, patterns y examples
- modelar el sistema desde la nueva taxonomia de la boveda, no desde demos por producto
- usar este repo como implementacion de contratos, no como repositorio de pantallas

## 13. Decisiones inmediatas sugeridas

Si seguimos con una segunda fase de trabajo, el siguiente paso con mas retorno seria:

1. crear la estructura nueva del repo
2. extraer tokens y semantic tokens desde `colors_and_type.css`
3. definir foundations y motion recipes como artefactos separados
4. levantar una primera libreria minima de primitives y componentes Tier 0/Tier 1
5. migrar los tres kits actuales para que consuman esa capa comun

Ese orden crea una base seria y evita que el sistema se convierta en una coleccion de mocks bonitos pero no reutilizables.

## 14. Addendum: ampliacion a partir de `anclora-portfolio` e `anclora-content-generator-ai`

### 14.1 Por que estos dos repos cambian el analisis

La primera auditoria del design system se apoyaba sobre todo en referencias `ultra premium` y `premium`.
La entrada de:

- `anclora-portfolio` como referencia `portfolio`
- `anclora-content-generator-ai` como referencia `internal`

permite completar dos familias que faltaban para que el sistema represente mejor el ecosistema real.

### 14.2 Que aporta `anclora-portfolio`

Este repo confirma una gramática distinta de `Private Estates`.

No es:

- un dashboard
- una experiencia ultra premium cerrada
- una mera variacion cromatica de real estate luxury

Si aporta una familia propia de foundations publicas:

- landing editorial publica con CTA claro
- navegación ligera orientada a scroll
- selector de idioma visible
- hero con fotografía y overlays de protección
- secciones largas de storytelling comercial
- formularios de captación con tono de confianza
- lightboxes y galerías como apoyo, no como shell

Señales de implementación que conviene absorber:

- paleta editorial clara:
  - `navy`
  - `azure`
  - `ivory`
  - `cream`
  - `gold`
- superficies publicas alternadas por sección:
  - `ap-surface-ivory`
  - `ap-surface-cream`
  - `ap-surface-gold`
  - `ap-surface-navy`
- topbar fija con `glass-dark`
- CTA primaria de conversión con oro cálido
- CTA secundaria tipo outline sobre fondo fotográfico
- headings serif + body sans + apoyo script puntual
- motion algo más emocional que en apps internas

### 14.3 Que aporta `anclora-content-generator-ai`

Este repo confirma mejor la familia `internal` y, sobre todo, baja contratos abstractos a componentes reales.

Señales muy valiosas:

- shell persistente:
  - sidebar colapsable
  - topbar operativa
  - main scrollable sin scroll global descontrolado
- semántica de color operativa y madura:
  - `primary` coral
  - `secondary` sage
  - `background`, `card`, `muted`, `border`, `input`, `ring`
- surfaces internas con profundidad medible:
  - `surface-card-panel`
  - `surface-card-inner`
  - cards anidadas con distinta intensidad
- tokens de contraste y foco bastante estables
- densidad de controles uniforme:
  - botón
  - input
  - textarea
  - select
  - tabs
  - table
- chrome con blur moderado y bordes visibles
- hover funcional, corto y no teatral

Tambien aporta una decision importante:

- `internal` no debe depender de una base fría azul-negruzca por defecto
- puede usar carbón cálido + coral + sage sin perder carácter operativo

### 14.4 Conclusion de sistema

Con estos dos repos, el design system ya no debería modelar el ecosistema solo con:

- `group`
- `ultra premium`
- `premium`

Ahora debe incorporar explícitamente families de foundations para:

- `portfolio`
- `internal`

No como apps aisladas, sino como grupos de comportamiento y superficie.

### 14.5 Nuevas families de tokens recomendadas

El CSS actual debe ampliarse para cubrir familias que hoy no existen de forma clara.

#### A. Theme families por tier

Añadir scopes equivalentes a:

- `.anclora-portfolio`
- `.anclora-internal`

No como producto final, sino como capas base de tier.

#### B. Surface semantics

El sistema hoy tiene `bg`, `bg-raised`, `bg-strong`.
Con estas nuevas referencias conviene elevar a semántica más rica:

- `--surface-canvas`
- `--surface-subtle`
- `--surface-panel`
- `--surface-panel-strong`
- `--surface-elevated`
- `--surface-overlay`
- `--surface-glass`
- `--surface-hero-protection`

#### C. Text semantics

- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--text-on-accent`
- `--text-inverse`
- `--text-eyebrow`
- `--text-link`

#### D. Action semantics

- `--action-primary-bg`
- `--action-primary-fg`
- `--action-primary-border`
- `--action-secondary-bg`
- `--action-secondary-fg`
- `--action-ghost-bg`
- `--action-ghost-fg`
- `--action-destructive-bg`
- `--action-destructive-fg`

#### E. Border and focus semantics

- `--border-subtle`
- `--border-default`
- `--border-strong`
- `--focus-ring`
- `--focus-ring-offset`

#### F. Motion semantics por familia

- `--motion-hover-lift-card`
- `--motion-hover-lift-button`
- `--motion-hover-lift-frame`
- `--motion-enter-overlay`
- `--motion-hero-emphasis`

Importante:

- `portfolio` puede usar `hero-emphasis`
- `internal` no debería usar ese nivel salvo casos excepcionales

### 14.6 Nuevas foundations que deben nacer de estos repos

#### Portfolio foundations

- `editorial-light-surface-system`
- `portfolio-section-surface-rotation`
- `showcase-topbar`
- `hero-media-overlay`
- `cta-conversion-pair`
- `language-switch-visible`
- `lightbox-gallery-controls`
- `lead-form-trust-surface`

#### Internal foundations

- `internal-shell-layout`
- `internal-sidebar-density`
- `internal-topbar-meta-strip`
- `operational-panel-depth`
- `nested-card-depth`
- `compact-control-heights`
- `table-operational-density`
- `visible-focus-dark-light`

### 14.7 Componentes canonicos que ahora pasan a ser obligatorios

A la lista previa añadiria prioridad alta para:

- `LanguageSwitcher`
- `StickyTopbar`
- `ScrollNav`
- `SidebarShell`
- `TopbarMeta`
- `SurfaceCard`
- `SurfacePanel`
- `LeadCaptureForm`
- `GalleryLightboxControls`
- `SectionSurface`

### 14.8 Patterns que ahora tienen fundamento real

A partir de estos repos ya hay base para formalizar:

- `PortfolioHero`
- `PortfolioSectionHeading`
- `PortfolioLeadSection`
- `InternalDashboardShell`
- `InternalSettingsPanel`
- `InternalStudioWorkspace`

Regla importante:

- estos patterns deben vivir en `patterns/`
- no en `components/`

### 14.9 Lo que NO subiria al design system desde estos repos

No todo lo útil debe convertirse en canon.

No subiria tal cual:

- el uso de `framer-motion` con `whileInView` como regla general del sistema portfolio
- cualquier clase hardcodeada con hex concretos embebidos en componentes
- el uso puntual de `font-script`
- layouts específicos de Azure Bay / caso inmobiliario concreto
- copy operativa concreta del Content Generator

Eso pertenece a ejemplos o a implementación de producto.

### 14.10 Como ampliar `colors_and_type.css` en una fase intermedia

Antes de una migración completa a paquetes, una mejora útil seria convertir `colors_and_type.css` en algo más cercano a esto:

1. Core tokens universales
2. Semantic aliases
3. Theme scopes por tier:
   - `group`
   - `ultra-premium`
   - `premium`
   - `portfolio`
   - `internal`
4. Product overrides:
   - `anclora-private-estates`
   - `anclora-synergi`
   - `anclora-portfolio`
   - `anclora-content-generator-ai`
   - etc.
5. Primitive classes:
   - surface
   - text roles
   - button families
   - field families
   - shell families

### 14.11 Recomendacion inmediata ajustada

Con estos dos repos ya disponibles, el siguiente paso con más retorno cambia ligeramente:

1. extraer del CSS actual los tokens ya existentes
2. incorporar families nuevas de `portfolio` e `internal`
3. definir semantic tokens comunes que cubran oscuro editorial, claro editorial e interno operativo
4. formalizar dos nuevas foundations prioritarias:
   - `portfolio-public-showcase`
   - `internal-operational-shell`
5. solo entonces migrar ejemplos y componentes

### 14.12 Decision de criterio

La incorporación de `anclora-portfolio` y `anclora-content-generator-ai` confirma algo importante:

- el design system no debe ser una expansión lineal del lenguaje `Private Estates`
- debe ser un sistema de familias coordinadas bajo ADN Anclora compartido

Ese ADN compartido sigue siendo:

- tipografía con jerarquía marcada
- surfaces cuidadas
- motion deliberado
- cromática con acento metálico o cálido controlado
- alto control de tono institucional

Pero ahora ya podemos distinguir mejor cuatro gramáticas reales:

- `group`
- `ultra premium`
- `portfolio`
- `internal`

Y eso hace que los próximos tokens y foundations puedan salir de evidencia real, no solo de inferencia.
