# Consumer Status Map

Fecha: 2026-08-17
Repositorio: `anclora-design-system`
Contexto: `ECOSYSTEM_CORE_ONBOARDING` — mapa de consumidores por **repo** (complementa el mapa por **pieza** en [`validated-consumers-matrix.md`](./validated-consumers-matrix.md)).

## Categorías

- `DIRECT_CONSUMER`: consumo real verificado (componentes/patterns en estado `canonical` con evidencia de uso).
- `PARTIAL_ALIGNMENT`: auditoría documental iniciada, consumo parcial o pendiente de QA visual.
- `NO_USAGE`: auditado explícitamente y confirmado que no consume el design system.
- `UNKNOWN`: sin auditoría de consumo realizada — **no se declara consumidor por semejanza visual**.

## Mapa (16 repos en scope AKG v0.1)

| Repo | Estado | Evidencia |
| --- | --- | --- |
| `anclora-talent` | `DIRECT_CONSUMER` | [`validated-consumers-matrix.md`](./validated-consumers-matrix.md) — button, card, surface panel, form field, empty state, modal, theme/language switcher, stepper y 7 patterns/workspace en estado `canonical`, consumo real sin fork estructural. Repo en pausa desde 2026-08, pero el consumo ya validado se mantiene. |
| `anclora-energyscan` | `PARTIAL_ALIGNMENT` | [`validated-consumers-matrix.md`](./validated-consumers-matrix.md) — auditoría documental creada; landing, wizard, results, pricing, PDF premium y provider lead section pendientes de QA visual completa. |
| `anclora-command-center` | `DIRECT_CONSUMER` | Verificado 2026-09-03: `package.json` fija `@anclora/design-system` al SHA `c3a4229555827d1e82c1468cf3f8e7be0c215261` (1 commit detrás de HEAD); `src/main.tsx` importa `tokens/core.css`, `tokens/semantic.css` y los componentes `button.css`, `data-table.css`, `status-badge.css`, `modal.css`, `empty-state.css` (7 módulos); wrappers React locales en `src/ui/` sin CSS propio. No se ha realizado QA visual/a11y dedicada — consumo de código confirmado, no validación visual completa. |
| `anclora-content-generator-ai` | `UNKNOWN` | Declarado como "próxima ola" recomendada, sin auditoría de consumo real ejecutada. |
| `anclora-filestudio` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. |
| `anclora-fiscal` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. |
| `anclora-nexus` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. |
| `anclora-linguo-cam` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. |
| `anclora-private-estates` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. |
| `anclora-private-estates-landing` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. |
| `anclora-guesthub` | `UNKNOWN` | Sin auditoría de consumo real ejecutada. *(Renombrado de `anclora-syncxml` — 2026-09-01.)* |
| `anclora-vault`, `anclora-governance`, `anclora-infrastructure`, `boveda-anclora` | `NO_USAGE` (estructural) | Repos de documentación/infraestructura, sin superficie UI propia — no aplica consumo de design system por naturaleza del repo, no por auditoría de código. |
| `anclora-design-system` | — | Es la fuente, no un consumidor. |

## Regla aplicada

Este mapa **no** infiere `DIRECT_CONSUMER` ni `PARTIAL_ALIGNMENT` a partir de:

- similitud visual entre capturas de pantalla;
- uso de shadcn/ui u otras librerías de componentes con nombres similares (`Button`, `Card`) sin verificar si importan tokens/clases de `anclora-design-system`;
- declaración aspiracional del campo `design_system_role` en `ecosystem-repos.json` (ese campo expresa **intención/rol declarado**, no evidencia de consumo real — casi todos los repos del ecosistema lo declaran `"consumer"`, lo cual generaría falsos positivos si se usara como fuente de este mapa).

Los dos únicos repos promovidos fuera de `UNKNOWN` en esta fase (`anclora-talent`, `anclora-energyscan`) lo son porque `validated-consumers-matrix.md` documenta evidencia pieza-por-pieza, no una declaración genérica.

## Uso en AKG v0.1

Este mapa alimenta las relaciones `USES` desde `Product` hacia `Standard` (`std:anclora-design-system`) en el pipeline de Knowledge (`anclora_knowledge.adapters.vault.extract_design_system_standard`), leyendo el campo curado `design_system_consumer_evidence` en `ecosystem-repos.json` — no el campo `design_system_role` aspiracional.

## Próxima ola recomendada (sin ejecutar auditoría en esta fase)

Ver `validated-consumers-matrix.md` § "Siguiente ola recomendada": `anclora-content-generator-ai`, `anclora-portfolio`. Promoverlos de `UNKNOWN` requiere una auditoría de consumo real dedicada (fuera de alcance de `ECOSYSTEM_CORE_ONBOARDING`). `anclora-command-center` fue promovido a `DIRECT_CONSUMER` el 2026-09-03 (ver tabla arriba); pendiente aún QA visual/a11y dedicada (`PARTIAL_ALIGNMENT`-level evidence not yet collected for that axis).
