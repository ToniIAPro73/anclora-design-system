# Navigation & App Shell Contract — Wave 7

Estado: **canónico en `@anclora/design-system@0.13.0`**
Fecha: 2026-09-22
Alcance: arquitectura, CSS y gobernanza del shell; no migra consumidores.

## Decisión ejecutiva

El ecosistema mantiene tres clasificaciones arquitectónicas:

- **Core/default**: semántica compartida y páginas sin un shell persistente de workspace ni una narrativa de marketing.
- **P-WKS**: aplicación autenticada/operativa con navegación persistente, densidad de información y flujos repetidos.
- **P-MKT**: superficie pública/narrativa con header ligero, anclas de contenido y CTA.

La diferencia se basa en el arquetipo de interacción, no en el vertical, la marca o el uso de IA. Una app híbrida puede componer una sección narrativa P-MKT dentro de una aplicación P-WKS; el perfil gobierna la estructura dominante, no cada página aislada.

## Declaración determinista

El consumidor declara el perfil en el shell raíz:

```html
<div class="ac-app-shell" data-profile="workspace">
```

| Atributo | Perfil | Uso |
| --- | --- | --- |
| `data-profile="workspace"` | P-WKS | Sidebar persistente y transformación a Drawer modal en viewport pequeño |
| `data-profile="marketing"` | P-MKT | Header público y contenido narrativo; no sidebar persistente |
| atributo omitido | Core/default | Composición de primitives y patrones sin shell de perfil |

Tema y perfil son dimensiones ortogonales: el tema usa `data-theme="dark"|"light"`; el perfil usa `data-profile`. No se crean selectores `P-WKS-dark` ni `P-MKT-light`.

## Evidencia representativa

La matriz se construyó leyendo implementación ejecutable de consumidores. Las clasificaciones de las 25 aplicaciones del inventario anterior siguen vigentes; no se observaron señales que justifiquen un cuarto perfil.

| Consumidor | Perfil | Desktop | Mobile | Evidencia principal | Drift |
| --- | --- | --- | --- | --- | --- |
| ShiftImport | P-WKS | Sidebar agrupada + topbar + User Menu | Sidebar → modal Drawer con foco, Escape y scroll lock | `src/components/app-shell/AppShell.tsx`; Wave 6/Pilot 6 PASS | E — estado/permissions legítimamente del producto |
| Command Center | P-WKS | Topbar con nav de rutas, búsqueda, tema e idioma | topbar, no sidebar persistente confirmada | `src/shell/DashboardShell.tsx` | E — shell ejecutivo de síntesis |
| Talent | P-WKS | AppShell + topbar + User Menu + nav de proyectos | menú móvil propio; editor cambia el contexto del shell | `src/components/layout/AppShell.tsx` | C/E — histórico DS real, adaptación editorial |
| TableExtractor | P-WKS | Header y primitives shadcn/Radix | comportamiento móvil no confirmado en este audit | `frontend/src/components/Header.jsx` | F — runtime de compatibilidad |
| Data Lab | P-WKS | topbar de workspace + toggles + role badge | no navegación lateral persistente confirmada | `DataLabWorkspaceShell.tsx` | E — executive/premium workspace |
| Content Generator AI | P-WKS | Sidebar colapsable + Topbar + account menu | navegación horizontal compacta en topbar | `src/components/layout/{Shell,Sidebar,Topbar}.tsx` | F — shadcn/Next adapter |
| FileStudio | P-WKS | Desktop/tool shell por tabs y rutas | mobile shell no confirmado | `src/components/desktop-pro/desktop-pro-shell.tsx` | E — herramienta de propósito único |
| Private Estates | P-WKS híbrido | Navbar pública/privada + menú rico | overlay móvil con grupos | `src/components/Navbar.tsx` | E/F — menú premium específico; no prueba Mega Menu Core |
| Group Landing | P-MKT | Header público con anclas de sección | menú móvil con bloqueo de scroll y retorno de foco | `src/components/Header.tsx` | B — diferencia legítima |
| Azure Bay Landing | P-MKT | narrativa pública | pendiente de validación interactiva específica | `app/` + landing components | B |

### Taxonomía de drift

- **A — UNJUSTIFIED_DRIFT**: rutas implementadas como botones, estados activos solo por color, z-indexes o focus traps locales sin necesidad.
- **B — LEGITIMATE_DIFFERENCE**: header público, CTA, hero y ritmo editorial de P-MKT.
- **C — LEGACY**: familias anteriores que no consumen una primitive disponible.
- **D — REUSABLE_INNOVATION**: solución repetida con semántica reusable, pendiente de promoción tras evidencia.
- **E — PRODUCT-SPECIFIC**: shell ejecutivo, editor, conversacional o herramienta de propósito único.
- **F — COMPATIBILITY_WORKAROUND**: shadcn/Radix/Next adapters que preservan integración sin demostrar un nuevo contrato Core.

## Responsabilidades

### Core

Core define tokens semánticos, focus/disabled, capas, anatomía de links de navegación, container modes, Page Header composable, landmarks y reglas de accesibilidad. Core no define rutas, autenticación, permisos, etiquetas, orden de grupos ni datos de usuario.

### P-WKS

P-WKS compone un shell de aplicación: sidebar persistente, topbar operativo, navegación agrupada, slots de contexto/cuenta/acciones y Sidebar → modal Drawer en viewport pequeño. La aplicación filtra el modelo de navegación antes de renderizarlo.

### P-MKT

P-MKT compone un header público ligero, navegación de anclas o rutas públicas, región CTA y contenido editorial. No hereda la sidebar P-WKS ni su densidad. Comparte tokens, focus, links, tema y semántica.

### Extensión de producto

El consumidor posee routing, auth, permisos, labels, iconos de dominio, identidad/logo, estado activo, account data, search state, grupos, orden, breadcrumbs de negocio, tablas y contenido. Una extensión específica puede usar los puntos sancionados sin redefinir anatomía Core.

## Anatomía canónica

```text
ac-app-shell[data-profile="workspace"]
├── skip link → #main-content
├── sidebar / primary navigation
├── main
│   ├── topbar (slots: trigger, context, controls, account)
│   └── page
│       ├── optional breadcrumb
│       ├── page header (context, title, description, meta, actions)
│       └── page content
└── contextual overlays (Menu / Popover / Drawer / Modal)
```

El DS entrega estructura CSS-first en `app-shell.css`, `page-container.css` y `page-header.css`, además de las piezas `sidebar-nav.css`, `topbar.css`, `breadcrumb.css` y `drawer.css`. Un wrapper React/Next/Vite puede conectar el modelo de rutas, pero no debe duplicar spacing, estados, foco, superficies ni responsive.

## Navigation contract

- Una navegación que cambia de ruta se renderiza como `<a>` o equivalente del framework, nunca como Button genérico.
- El destino activo expone `aria-current="page"`; la clase visual no es la única señal.
- `<nav>` recibe un label estable cuando hay más de un landmark de navegación.
- Los grupos son presentación: la aplicación proporciona label, orden, items y permisos.
- El DS no conoce `admin`, `owner`, `planner`, `employee` ni ningún rol de negocio.
- Routing, redirects, auth guards y permission filtering son responsabilidad del consumidor.
- Menus son comandos contextuales; no sustituyen los links de navegación.

## Responsive and scroll model

P-WKS recomienda un solo scroll principal de página/contenido. La sidebar puede tener scroll propio cuando su lista lo necesita. Por debajo de `960px`, la sidebar persistente se convierte en Drawer modal cuando el consumidor declara `data-navigation-open="true"`; se reutiliza `.ac-drawer` y su runtime accesible. No se introduce un segundo componente de mobile navigation.

P-MKT mantiene header público y menú móvil propios del arquetipo, con bloqueo de scroll y retorno de foco cuando el runtime lo requiere. No se obliga a usar una sidebar.

Los valores `960px`, `--ac-shell-sidebar-width`, `--ac-shell-topbar-height` y `--ac-shell-gap` son defaults estructurales, no una orden para rediseñar cada consumidor. El consumidor puede usar una extensión documentada si su evidence lo exige.

## Page container, header and breadcrumbs

- `data-width="standard"`: lectura/formulario y páginas de densidad media, máximo `1200px`.
- `data-width="wide"`: workspace operativo y tablas, máximo `1440px`.
- `data-width="full"`: superficies que gestionan su propio ancho.
- `ac-page-header` es composable: title obligatorio; description, meta, breadcrumb y actions opcionales.
- Actions usan Button/Menu canónicos y pueden envolver en mobile.
- Breadcrumbs siguen siendo **EVIDENCE_REQUIRED** como sistema avanzado de truncation/overflow. El primitive CSS existente puede consumirse en jerarquías cortas, pero no se canoniza un runtime de breadcrumbs.
- Tabs siguen siendo selección local de vista, no navegación de ruta; no forman parte del App Shell.

## Accessibility contract

Shells deben conservar `header`, `nav`, `main`, headings jerárquicos, skip link cuando existe navegación persistente, `aria-current`, nombres de landmarks y foco visible. El Drawer móvil debe usar semántica de diálogo válida, foco inicial, contención, Escape, cierre/backdrop, retorno de foco, inert/ocultación del contenido y scroll lock. Axe no sustituye la revisión manual.

## Evidence-required — no canonicalización en Wave 7

Collapsible/resizable sidebar como comportamiento universal, Mega Menu, Command Palette, workspace switcher, navegación árbol multinivel, breadcrumb overflow, tabbed route shell y docking panels. Private Estates demuestra un menú rico de producto, pero no prueba un Mega Menu Core.

## Pilot 7 recomendado

**`anclora-content-generator-ai` — P-WKS.** Es el siguiente consumidor más completo para validar el contrato: Sidebar persistente con estado colapsado, Topbar con page context y cuenta, links con `aria-current`, rutas reales y una transformación móvil existente. Riesgos: usa Next/shadcn, no tiene evidencia equivalente de permisos de múltiples roles y su nav móvil actual es horizontal; el piloto debe probar el adapter sin migrarlo automáticamente.

Alternativas: Command Center aporta la mejor evidencia de topbar ejecutivo, pero no confirma sidebar/Drawer; Talent aporta shell y editor maduros, pero está pausado y mezcla contextos editoriales; ShiftImport ya cerró Pilot 6 y no debe repetirse como piloto por inercia.

P-MKT requiere un piloto separado posterior; candidato inicial: `anclora-group-landing`, por header público, anclas, locale, active state y menú móvil con bloqueo/retorno de foco ya visibles en código.
