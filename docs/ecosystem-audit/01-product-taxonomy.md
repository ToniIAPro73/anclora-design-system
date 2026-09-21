# Product Taxonomy — Anclora Ecosystem

Fecha: 2026-09-21
Alcance: los 25 repos con frontend cara-al-usuario en alcance activo (24 productos principales + `anclora-command-center`), excluyendo los 4 repos de showcase/demo (mismo archetype que su producto real, no se listan por separado) y los repos sin frontend real (`anclora-identity`, `anclora-energyscan-showcase`, `anclora-fiscal-showcase`).
Criterio: clasificación por **arquetipo de interacción/UX**, no por vertical de negocio, marca, o presencia de IA — según dirección del propietario. Perfil solo cuando el modelo de navegación/densidad/shell difiere de forma genuina; "Core / default" es una clasificación válida cuando no hace falta perfil.

---

## Resultado: 2 perfiles genuinos + Core/default (no 4, la evidencia no sostiene más)

| Perfil | Apps | Justificación central |
| --- | --- | --- |
| **P-MKT — Marketing / Landing** | 5 | página pública, sin shell persistente, narrativa de scroll único, sin autenticación, densidad de información mínima, alta densidad de CTA |
| **P-WKS — Workspace / Operational** | 18 | shell persistente (sidebar/topbar), autenticado, alta densidad de datos (tablas, tarjetas, listas de entidades), flujos multi-paso, modales, badges de estado |
| **Core / default** (sin perfil) | 2 | superficie única o casi única, sin shell de dashboard ni narrativa de marketing — compone Core directamente |

No se crea un tercer perfil para "conversacional/tiempo real" (chat, videollamada) a pesar de que `anclora-advisor-ai` (chat) y `anclora-linguo-cam` (videollamada WebRTC) tienen patrones de interacción visiblemente distintos de una tabla de datos — la evidencia (2 apps, cada una con un shell de aplicación convencional alrededor del componente conversacional/de llamada) no alcanza el umbral de "modelo de interacción completo genuinamente distinto" que exige un perfil nuevo. Se registran como **shared pattern candidates** dentro de P-WKS (ver Fase 4 §Shared Patterns) en lugar de perfil propio, siguiendo la regla explícita del propietario de no crear perfil solo por IA/tiempo real.

---

## P-MKT — Marketing / Landing

**Por qué Core solo no basta:** Core (tokens + `.ac-button`, `.ac-card`, etc.) no define un modelo de composición de página — estas apps necesitan patrones de sección completa (hero, historia de producto, pricing, FAQ, CTA final) que no son componentes atómicos sino composiciones de página completas, y una filosofía de shell distinta (sin sidebar, sin topbar de navegación persistente, header simple con scroll suave a anclas).

**Comportamientos UX que cambia:**
- Navegación: header fijo con enlaces ancla (`#producto`, `#pricing`, etc.), sin sidebar
- Densidad: baja — grandes bloques de storytelling, espaciado generoso
- Sin autenticación como estado por defecto (CTAs llevan a login/registro, no hay contenido protegido)
- Motion/entrada más presente que en Workspace (hero art, parallax, scroll-reveal)

**Apps (5):**

| App | Evidencia de shell | Confianza |
| --- | --- | --- |
| `anclora-azure-bay-landing` | `app/` con 21 archivos, `components/` mínimo (cookie-consent, legal-footer), shadcn `Button` | alta — repo dedicado, sin dashboard |
| `anclora-group-landing` | `src/sections/` (Hero, etc.), `src/styles/{tokens,layout,components,sections}.css`, sin auth | alta |
| `anclora-private-estates-landing` | 16 archivos en `src/sections/`, tokens propios `pe-*`, sin auth | alta |
| `anclora-portfolio` | `src/components/sections/` (108 archivos totales, la mayoría composición de página), tipografía editorial (Montserrat/Cormorant/Allura) — sin uso real de `dark:` (0 usos), consistente con página estática de marca, no dashboard | media — el repo es grande para ser "solo landing"; podría tener una superficie secundaria no detectada en el discovery |
| `anclora-job-portfolio` | HTML/CSS/JS estático, single-page, sin build — el caso más puro del perfil | alta |

**Tokens/defaults que P-MKT puede sobreescribir:** densidad de espaciado (mayor), tipografía de titulares (puede usar familia serif/editorial distinta al sans-serif de Workspace), tratamiento de hero/CTA.
**Lo que P-MKT NO puede sobreescribir:** significados semánticos de color, radios base, comportamiento de foco/accesibilidad, contrato de tema claro/oscuro.

---

## P-WKS — Workspace / Operational

**Por qué Core solo no basta:** estas apps comparten un modelo real de "aplicación", no de "página" — shell persistente con navegación (sidebar y/o topbar), gestión de entidades (proyectos, reservas, turnos, leads, documentos) mostradas en tablas/tarjetas/listas, formularios multi-campo, modales de confirmación/edición, badges de estado, y flujos multi-paso (wizards, steppers). Es, con diferencia, el arquetipo dominante del ecosistema — y coincide exactamente con los componentes que el propio `anclora-design-system` ya shipea (`data-table.css`, `status-badge.css`, `modal.css`, `empty-state.css`, `stepper` en la matriz de talent) — evidencia de que el DS ya fue diseñado (aunque sin saberlo explícitamente) pensando en este perfil.

**Comportamientos UX que cambia respecto a P-MKT:**
- Navegación: sidebar y/o topbar persistente, no anclas de scroll
- Densidad: alta — tablas, listas de tarjetas, paneles con múltiples zonas de información simultánea
- Autenticado por defecto; estados vacíos, de carga y de error son de primera clase
- Acciones frecuentes, repetidas, en contexto (menús de fila, acciones en línea) — de ahí la necesidad real de una variante de botón más compacta que la CTA de marketing (ver hallazgo `.dashboard-button` en Fase 2.5)

**Apps (18):** `anclora-talent`, `anclora-command-center`, `anclora-advisor-ai`, `anclora-content-generator-ai`, `anclora-data-lab`, `anclora-energyscan`, `anclora-filestudio`, `anclora-fiscal`, `anclora-groundsync`, `anclora-guesthub`, `anclora-impulso`, `anclora-linguo-cam`, `anclora-nexus`, `anclora-private-estates`, `anclora-shiftimport`, `anclora-synergi`, `anclora-tableextractor`, `anclora-visionflow`

| App | Densidad | Shell | Tema | Estado adopción DS | Confianza |
| --- | --- | --- | --- | --- | --- |
| `anclora-talent` | muy alta (editor + dashboard) | sidebar + topbar (`talent-dashboard-shell`) | `data-theme`, contract tests | **DS real, con fork de anatomía en `.ac-button` + familia paralela `.dashboard-button`** | alta (evidencia directa de código, Fase 2.5) |
| `anclora-command-center` | alta (tablas operativas) | shell propio | 1 tema (sin claro detectado) | **DS real, alias locales sin fork de valor** | alta |
| `anclora-advisor-ai` | alta (chat + alertas + auth) | layout con `AppPreferencesScript` | `data-theme` | independiente (`advisor-btn`) | media |
| `anclora-content-generator-ai` | alta (25 componentes, `ui/` shadcn) | layout + theme provider | `next-themes` | independiente (shadcn) | media |
| `anclora-data-lab` | media (6 componentes, admisiones) | `DataLabWorkspaceShell` | `data-theme` (mecanismo JS no localizado) | independiente (`datalab-button`) | media |
| `anclora-energyscan` | alta (42 componentes: admin/monetization/professional) — **contiene también secciones tipo landing internas (hero, pricing)**, pero el archetype dominante del repo es dashboard/admin | `.dark` class hand-rolled | independiente | media — repo híbrido, ver nota abajo |
| `anclora-filestudio` | muy alta (51 componentes: converter/desktop-pro/diagnostics/inspector) | shadcn `ui/`, `next-themes` | independiente (shadcn) | media |
| `anclora-fiscal` | alta (formularios fiscales, data-table, stepper) | monorepo turborepo | **sin tema oscuro** | infra propia (`@anclora/ui`), no el DS ecosistema | alta |
| `anclora-groundsync` | media (shift-dashboard) | shell propio | `data-theme` + `prefers-color-scheme` | independiente (`.btn-outline/.btn-gold`) | media |
| `anclora-guesthub` | alta (reservas, OIDC SSO) | shell propio, Tailwind v3 | `.light` class, `ThemeToggle` 3 modos | independiente | media |
| `anclora-impulso` | alta (77 componentes, shadcn maduro) | `ThemeProvider` | `.dark` class | independiente (shadcn, OKLCH) | media |
| `anclora-linguo-cam` | media — **shell de llamada en vivo (webrtc/, ControlBar, CallSetup), no de datos** — candidato a shared pattern "real-time/call UI" | shell de llamada | CSS presente pero muerto (sin toggle activo) | independiente | media — ver nota conversacional/tiempo real arriba |
| `anclora-nexus` | muy alta (69 componentes: dms, dq, finops, ingestion, intelligence, prospection) | shell con `ThemeToggle.tsx` | `.dark` class | independiente (shadcn) | alta |
| `anclora-private-estates` | alta (62 componentes, admin + valuation + booking) — **contiene también secciones tipo landing internas**, mismo caso híbrido que energyscan | `ThemeContext` propio | dos convenciones de botón a la vez | media |
| `anclora-shiftimport` | alta (110 componentes: scheduling, team, employee-portal) | `app-shell/` dedicado | `data-theme` extensivo | independiente (`.btn-gold`, con anti-patrón documentado en código) | alta |
| `anclora-synergi` | media (12 componentes, dashboards de partner/analytics) | shell propio | `data-theme` | independiente (`synergi-button` crudo) | media |
| `anclora-tableextractor` | media (52 componentes, upload/history/review) | CRA/CRACO, shadcn | `ThemeContext`/`ThemeToggle` | independiente (shadcn) | media |
| `anclora-visionflow` | media (65 componentes: `ui/`, `vision/`) | shell shadcn | `dark:` en 27 archivos, sin `ThemeProvider` localizado (posible tema "fantasma", ver Fase 2.5) | independiente (shadcn) | media — no se confirmó el shell exacto en discovery, revisar antes de asignar variante concreta |

**Nota sobre repos híbridos (`energyscan`, `private-estates`):** ambos combinan una superficie de marketing interna (hero/pricing/wizard de entrada) con una superficie de dashboard/admin real. Esto no invalida la clasificación P-WKS — significa que estas apps **componen patrones de P-MKT dentro de una app P-WKS**, que es exactamente el modelo de "perfil controla shell/densidad, no impide reutilizar patrones de otro perfil dentro de una página concreta" que la arquitectura objetivo (Fase 4) debe soportar explícitamente.

**Tokens/defaults que P-WKS puede sobreescribir:** densidad de componente por defecto (ej. variante compacta de botón/tabla), defaults de navegación (sidebar colapsable, ancho), énfasis contextual (badges de estado con más protagonismo que en Core).
**Lo que P-WKS NO puede sobreescribir:** significados semánticos de color (danger/success/warning), radios base del sistema, comportamiento de foco/disabled, anatomía del componente Button a nivel de Core (solo puede pedir una *variante* sancionada, no reescribir el selector base — ver hallazgo A2.5.4 sobre por qué el `.ac-button` local de talent sí cruzó esa línea).

---

## Core / default (sin perfil)

**Por qué no necesitan perfil:** ninguna de las dos apps tiene ni shell de dashboard persistente ni narrativa de marketing multi-sección — son superficies únicas o casi únicas, de propósito acotado.

| App | Qué es realmente | Confianza |
| --- | --- | --- |
| `anclora-group` | portal/catálogo de apps del grupo + login — 9 componentes, sin dashboard | media |
| `anclora-insights-adn` | herramienta de marca de un solo propósito (brand book, contrast checker, guías imprimibles) — 5 componentes, sin auth, sin dashboard | alta |

Estas apps consumen Core directamente (tokens + componentes base) sin necesitar defaults de perfil. Si en el futuro crecen (p. ej. `anclora-group` añade un dashboard real de gestión de cuentas), se reevalúan — no se les asigna P-WKS por anticipado.

---

## Resumen de conteo (debe cuadrar con Fase 2.5 §A2.5.1)

| Perfil | Apps | Suma |
| --- | --- | --- |
| P-MKT | azure-bay-landing, group-landing, private-estates-landing, portfolio, job-portfolio | 5 |
| P-WKS | talent, command-center, advisor-ai, content-generator-ai, data-lab, energyscan, filestudio, fiscal, groundsync, guesthub, impulso, linguo-cam, nexus, private-estates, shiftimport, synergi, tableextractor, visionflow | 18 |
| Core/default | group, insights-adn | 2 |
| **Total clasificado** | | **25** |

25 = 24 apps de producto principal con frontend (Fase 2.5 §A2.5.1) + `anclora-command-center` (transversal por investigación inicial, producto real por naturaleza).
