# Anclora Design System — Component Inventory

Fecha: 2026-09-21. Inventario real (no aspiracional) derivado de `design-system.manifest.json` (32 módulos de componente shipeados) cruzado con `docs/validated-consumers-matrix.md` (estado de validación por consumo real) y los hallazgos de gap de la Fase 3 (taxonomía).

## Componentes existentes (32, todos CSS, `src/components/*.css`)

| Componente | Export | Estado (validated-consumers-matrix) | Consumidor real |
| --- | --- | --- | --- |
| button | `button.css` | `canonical` | `anclora-talent` (con fork de anatomía, ver Fase 2.5), `anclora-command-center` (wrapper limpio) |
| surfacePanel | `surface-panel.css` | `canonical` | `anclora-talent` |
| formField | `form-field.css` | `canonical` | `anclora-talent` |
| dataTable | `data-table.css` | `canonical` — Wave 4 contract: semantic table, default/compact density, opt-in sorting/selection/sticky/action composition | CSS import in `anclora-command-center`; real behaviour evidence audited in `anclora-shiftimport`, `anclora-talent`, `anclora-fiscal` and `anclora-tableextractor` |
| statusBadge | `status-badge.css` | `canonical` | `anclora-talent`, `anclora-command-center` |
| emptyState | `empty-state.css` | `canonical` | `anclora-talent`, `anclora-command-center` |
| modal | `modal.css` | `canonical` | `anclora-talent`, `anclora-command-center` |
| themeSwitcher | `theme-switcher.css` | `canonical` | `anclora-talent` |
| languageSwitcher | `language-switcher.css` | `canonical` | `anclora-talent` |
| stepper | `stepper.css` | `canonical` | `anclora-talent` |
| appTile | `app-tile.css` | no validado en matriz | — |
| metricCard | `metric-card.css` | no validado en matriz | — |
| sectionHeading | `section-heading.css` | no validado en matriz | — |
| sidebarNav | `sidebar-nav.css` | no validado en matriz | — |
| chapterRail | `chapter-rail.css` | `canonical` (como parte de `editorial-chapter-rail` pattern) | `anclora-talent` |
| templateCatalog | `template-catalog.css` | `canonical` (como parte de `editorial-template-catalog`) | `anclora-talent` |
| tabs | `tabs.css` | no validado | — |
| breadcrumb | `breadcrumb.css` | no validado | — |
| subnav | `subnav.css` | no validado | — |
| statStrip | `stat-strip.css` | no validado | — |
| toast | `toast.css` | no validado | — |
| drawer | `drawer.css` | no validado | — |
| previewOverlay | `preview-overlay.css` | `canonical` (parte de `editorial-preview-controls`) | `anclora-talent` |
| previewControls | `preview-controls.css` | `canonical` | `anclora-talent` |
| workspaceStage | `workspace-stage.css` | `canonical` | `anclora-talent` |
| workflowShell | `workflow-shell.css` | `canonical` | `anclora-talent` |
| editorStudio | `editor-studio.css` | no validado por nombre exacto (posible solape con `editorial-chapter-editor-shell`) | `anclora-talent` (probable) |
| editorShell | `editor-shell.css` | `canonical` (como `editorial-chapter-editor-shell`) | `anclora-talent` |
| textEditor | `text-editor.css` | `canonical` (como `editorial-rich-text-editor`) | `anclora-talent` |
| exportSuite | `export-suite.css` | `canonical` (como `editorial-export-suite`) | `anclora-talent` |
| topbar | `topbar.css` | no validado | — |
| index | `index.css` | agregador, no es un componente | — |

**Lectura honesta:** de 31 componentes reales (excluyendo el agregador `index`), 15 tienen evidencia de consumo real documentada (todas vía `anclora-talent`, el único consumidor con cobertura profunda), 2 tienen consumo real verificado en `anclora-command-center` de forma independiente (`dataTable`, `statusBadge`, `modal`, `emptyState`, `button` — 5, no 2, corrigiendo el conteo), y **~16 no tienen ningún consumidor real confirmado** — existen como CSS shipeado sin validación de uso. Esto es consistente con el hallazgo central de la Fase 2.5: la profundidad de implementación del DS es real, pero su amplitud de adopción es de facto un solo consumidor profundo (`talent`) más un segundo consumidor parcial (`command-center`).

## Gaps identificados por esta auditoría (Fase 3/4) — no implementados salvo el primero (Fase 6)

| Gap | Origen de la evidencia | Prioridad | Acción |
| --- | --- | --- | --- |
| Variante de densidad compacta de Button | `.dashboard-button` en `anclora-talent` — anatomía más pequeña/densa para superficies P-WKS de alta densidad (Fase 2.5 §A2.5.4) | alta — ya hay demanda real, un solo consumidor pero con evidencia de necesidad funcional genuina | **Implementado en Fase 6**: `.ac-button--compact` |
| Patrón conversacional (chat/stream + composer) | `anclora-advisor-ai` | baja por ahora | no promovido — un solo consumidor, regla de absorción del propietario exige ≥2 antes de formalizar |
| Patrón real-time/call UI | `anclora-linguo-cam` | baja por ahora | no promovido, mismo motivo |
| Componente de formulario fiscal especializado (moneda, rango de fechas) | `anclora-fiscal/packages/ui/src/{currency-field,date-range-field}.tsx` | media — buena idea de ingeniería, dominio específico | no se absorbe (fiscal no se migra en esta misión); se registra como candidato a revisar si un segundo producto financiero entra al ecosistema |

## Regla de absorción aplicada (no se promueve por defecto)

Por la política del propietario, ningún hallazgo de este inventario se promueve a Core solo por "verse mejor" — se exige (a) requisito de interacción recurrente, (b) semántica reusable, (c) múltiples consumidores reales o factibles, o (d) que corrija una debilidad real de un primitivo Core existente. Solo el gap de densidad de Button cumple esto de forma inmediata (corrige una debilidad real: Core no tenía variante para P-WKS de alta densidad, y la necesidad ya está demostrada en producción por `anclora-talent`).
