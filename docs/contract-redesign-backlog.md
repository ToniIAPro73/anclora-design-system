# Contract Redesign Backlog

Fecha: 2026-04-26
Repositorio: `anclora-design-system`

## Objetivo

Abrir un backlog explícito para los contratos de la bóveda que todavía no están bien aterrizados en artefactos reales del sistema.

## Prioridad 1

### Entry patterns con consumo real

Contratos afectados:

- `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`
- `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`

Qué falta:

- validar `premium-hero-split`
- validar `ecosystem-app-grid`
- introducir al menos un consumidor real `portfolio` o `ultra premium`

Artefactos candidatos:

- `src/patterns/entry/premium-hero-split.pattern.md`
- `src/patterns/entry/ecosystem-app-grid.pattern.md`
- `src/examples/portfolio/`

Retorno:

- permite que la bóveda deje de describir hero y entry experiences de forma abstracta

### Executive patterns con consumidor real

Contratos afectados:

- contratos ejecutivos cross-domain
- `ANCLORA_PREMIUM_APP_CONTRACT.md`

Qué falta:

- validar `executive-summary-band`
- ampliar evidence en `anclora-command-center`

Artefactos candidatos:

- `src/patterns/executive/executive-summary-band.pattern.md`
- `src/examples/premium/command-center-overview.example.html`

Retorno:

- desbloquea cumplimiento real para dashboards ejecutivos y command surfaces

### Localization contract endurecido

Contratos afectados:

- contrato de localización del ecosistema
- contratos `premium`, `ultra premium` y `portfolio`

Qué falta:

- evidencias multi-consumer ES/EN/DE
- reglas explícitas de truncation, wrapping y CTA largos
- formato de fechas/números si aparecen componentes de datos

Artefactos candidatos:

- `preview/localization-fixtures.html`
- `src/components/language-switcher.css`
- `src/components/form-field.css`

Retorno:

- evita que la bóveda exija i18n sin una base visual y estructural comprobada

## Prioridad 2

### Modal / overlay contract formalizado

Contratos afectados:

- contrato de modal
- reglas de foco y overlays de la bóveda

Qué falta:

- anatomía documental explícita
- variantes de tamaño
- restricciones de uso
- evidencia de adopción real documentada

Artefactos candidatos:

- `src/components/modal.css`
- `src/components/drawer.css`
- `src/components/preview-overlay.css`

Retorno:

- convierte una primitive visual en contrato estable de interacción

### Navigation shell matrix por tier

Contratos afectados:

- contratos `internal`, `premium`, `portfolio`

Qué falta:

- definir qué shell/navigation primitives son obligatorias por tier y archetype
- documentar qué cambia y qué no cambia entre topbar, sidebar, subnav y breadcrumb

Artefactos candidatos:

- `src/components/topbar.css`
- `src/components/sidebar-nav.css`
- `src/components/subnav.css`
- `src/components/breadcrumb.css`

Retorno:

- permite que la bóveda hable de navegación con piezas reales en vez de patrones difusos

### Data display contract por familia de app

Contratos afectados:

- contratos de dashboards, workspaces y command surfaces

Qué falta:

- separar expectativas para `metric-card`, `stat-strip`, `data-table` y `empty-state`
- mapear qué piezas son mínimas por `internal`, `premium` y `executive`

Artefactos candidatos:

- `src/components/metric-card.css`
- `src/components/stat-strip.css`
- `src/components/data-table.css`
- `src/components/empty-state.css`

Retorno:

- baja a artefactos reales la capa analítica del ecosistema

## Prioridad 3

### Versionado de breaking changes del sistema

Qué falta:

- criterio simple para distinguir cambio contractual, cambio visual no breaking y cambio local
- tabla de impacto por consumers

Retorno:

- permite que la bóveda y los consumidores negocien cambios sin ambigüedad

### Guía separada de branding operational do/dont

Qué falta:

- extraer de `README.md` una guía breve y más normativa para branding operativo

Retorno:

- más fácil de referenciar desde la bóveda y desde repos consumidores

## Secuencia recomendada

1. validar `anclora-command-center` como consumidor real de patterns ejecutivos
2. validar un consumidor `portfolio` o `ultra premium`
3. formalizar modal/overlay y navigation shell matrix
4. endurecer localización y versionado contractual
