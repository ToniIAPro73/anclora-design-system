# Anclora Design System — Product Matrix

> **HISTORICAL MATRIX (2026-09-21):** Wave 9 supersedes this snapshot with the machine-readable [`docs/adoption/ecosystem-adoption.inventory.json`](./docs/adoption/ecosystem-adoption.inventory.json) and its governing contract. This file remains as phase evidence; do not use it as the current adoption source of truth.

Fecha: 2026-09-21. Cruza perfil (Fase 3) × estado real de adopción del DS (Fase 2.5) para las 25 apps en alcance. Fuente de cada celda: `docs/ecosystem-audit/00-frontend-inventory-and-drift-audit.md` y `docs/ecosystem-audit/01-product-taxonomy.md` — no se repite aquí la evidencia línea a línea, se referencia.

Estados de adopción (reemplaza la escala anterior de `consumer-status-map.md`, que se marca superseded — ver `docs/ecosystem-audit/04-documentation-cleanup.md`):

- **`CONSUMER`** — dependencia `@anclora/design-system` real en `package.json` + import en runtime verificado en código.
- **`INDEPENDENT`** — sistema de tokens/componentes propio, sin relación de código con el DS.
- **`UNRELATED_SHARED_PKG`** — usa un paquete UI compartido propio (no el DS del ecosistema). Caso único: `anclora-fiscal` / `@anclora/ui`.
- **`NO_FRONTEND`** — sin superficie UI (excluido de esta matriz, listado por completitud).

| App | Perfil | Estado adopción DS | Nota |
| --- | --- | --- | --- |
| `anclora-talent` | P-WKS | `CONSUMER` (con fork de anatomía en `.ac-button` + `.dashboard-button` paralelo — ver Fase 2.5 §A2.5.4) | pilot candidate, ver Roadmap |
| `anclora-command-center` | P-WKS | `CONSUMER` (alias locales, sin fork de valor) | pilot candidate, ver Roadmap |
| `anclora-fiscal` | P-WKS | `UNRELATED_SHARED_PKG` (`@anclora/ui` interno) | no migrar en esta misión (decisión del propietario) |
| `anclora-advisor-ai` | P-WKS | `INDEPENDENT` | |
| `anclora-content-generator-ai` | P-WKS | `INDEPENDENT` (shadcn) | |
| `anclora-data-lab` | P-WKS | `INDEPENDENT` | |
| `anclora-energyscan` | P-WKS (híbrido, contiene patrones P-MKT internos) | `INDEPENDENT` | doc previo (`consumer-status-map.md`) lo listaba `PARTIAL_ALIGNMENT` sin evidencia de código — corregido |
| `anclora-filestudio` | P-WKS | `INDEPENDENT` (shadcn) | |
| `anclora-groundsync` | P-WKS | `INDEPENDENT` | |
| `anclora-guesthub` | P-WKS | `INDEPENDENT` | |
| `anclora-impulso` | P-WKS | `INDEPENDENT` (shadcn) | |
| `anclora-linguo-cam` | P-WKS | `INDEPENDENT` | patrón call-UI candidato, sin segundo consumidor |
| `anclora-nexus` | P-WKS | `INDEPENDENT` (shadcn) | |
| `anclora-private-estates` | P-WKS (híbrido) | `INDEPENDENT` (shadcn + clases propias a la vez) | |
| `anclora-shiftimport` | P-WKS | `INDEPENDENT` | anti-patrón documentado en su propio código (`.auth-submit` vs `.btn-gold`) |
| `anclora-synergi` | P-WKS | `INDEPENDENT` | |
| `anclora-tableextractor` | P-WKS | `INDEPENDENT` (shadcn) | rama no-default (`refactor/neon-postgresql`) |
| `anclora-visionflow` | P-WKS | `INDEPENDENT` (shadcn) | tema posiblemente "fantasma" — revisar |
| `anclora-azure-bay-landing` | P-MKT | `INDEPENDENT` (shadcn) | |
| `anclora-group-landing` | P-MKT | `INDEPENDENT` | única app cuyo código cita explícitamente "brand book v2.0" en comentario |
| `anclora-private-estates-landing` | P-MKT | `INDEPENDENT` | config Tailwind vestigial sin dependencia real |
| `anclora-portfolio` | P-MKT | `INDEPENDENT` (shadcn, config parcialmente muerta) | |
| `anclora-job-portfolio` | P-MKT | `INDEPENDENT` (sin framework) | único caso HTML/CSS/JS estático |
| `anclora-group` | Core/default | `INDEPENDENT` | |
| `anclora-insights-adn` | Core/default | `INDEPENDENT` | |
| `anclora-identity` | n/a | `NO_FRONTEND` | backend OIDC puro |

## Resumen numérico

| Estado | Apps | % de las 24 con frontend de producto (excl. command-center, que es transversal) |
| --- | --- | --- |
| `CONSUMER` | 1 (`talent`; `command-center` es transversal, se cuenta aparte) | 4% |
| `UNRELATED_SHARED_PKG` | 1 (`fiscal`) | 4% |
| `INDEPENDENT` | 22 | 92% |

Esta es la cifra que sostiene la prioridad de la Fase de Migración: **92% del ecosistema no tiene ninguna relación de código con el design system central.** No es un problema de "pulir lo que ya existe", es un problema de adopción casi nula — de ahí que el Roadmap (ver `ANCLORA-DESIGN-SYSTEM-MIGRATION-ROADMAP.md`) priorice estabilización + pilotos sobre migración masiva inmediata.
