# Wave 10 — Final hardening and release candidate

Version: `0.16.0-rc.1`
Status: `RC_READY`
Scope: canonical Design System only; consumer migration is a subsequent phase.

This document is the normative release-candidate summary for the Wave 10
architecture freeze. The machine-readable contract is
`design-system.manifest.json`; the machine-readable ecosystem inventory is
`../adoption/ecosystem-adoption.inventory.json`.

## Wave 9 blocker reconciliation

| Candidate | Decision | Evidence |
| --- | --- | --- |
| Supported CSS consumption | `RESOLVED` | Content Generator AI Pilot 9 passed aggregate `system.css` in Next/Turbopack and production build. |
| Manifest/export agreement | `RESOLVED` | `verify:manifest`, package export inspection, tarball inspection and release verification agree. |
| Semantic token ownership | `RESOLVED` | Undefined canonical `--accent-mint` references were removed in favour of the existing `--accent` semantic owner; remaining optional external variables have fallbacks and explicit ownership metadata. |

`BLOCKS_V1 = 0`.

## Adoption contract

The exclusive field is `adoptionStage`. A real frontend has exactly one of:

- `NOT_ADOPTED`: no verified runtime dependency or public import.
- `FOUNDATIONS`: tokens, foundations or theme imported at runtime.
- `COMPONENTS`: canonical component family composed at runtime.
- `SHELL_PROFILE`: canonical profile or shell composed at runtime.
- `PATTERNS`: shared pattern composed in a real workflow.
- `SUBSTANTIAL`: multiple canonical layers cover a meaningful surface.

`referenceConsumer: true|false` is orthogonal. It records validated integration
evidence or a useful example and never changes adoption stage or canonical
authority. Only `kind: frontend` entries participate in the exclusive-stage
totals; showcases, documentation and backend entries remain inventory context.

The verifier checks one stage, approved enums, unique repositories, profile
values, excluded kinds, reference flags and exact reconciliation. Current
frontend matrix: 26 entries — `NOT_ADOPTED=20`, `FOUNDATIONS=1`,
`PATTERNS=1`, `SUBSTANTIAL=4`; total `26`. Reference consumers: 7.

Reference index: Command Center, Talent, ShiftImport, TableExtractor, Content
Generator AI, Group Landing and FileStudio. These are evidence only; the
Design System remains the source of truth.

## Token ownership and profile rules

Executable ownership categories are `FOUNDATION`, `SEMANTIC`, `COMPONENT`,
`PROFILE` and `PRODUCT_EXTENSION_POINT`. Core owns semantic meaning, focus,
generic states and anatomy. P-WKS/P-MKT remain structural/compositional
profiles; `data-theme` is independent. Product identity and composition may
use documented extension points but may not redefine semantic roles.

The static token verifier requires every canonical `var(--token)` reference to
be defined in the package unless it is an explicitly listed optional external
extension with a fallback. No required canonical token remains undefined.

## Public package and distribution contract

- Aggregate CSS: `@anclora/design-system/system.css` — `STABLE_PUBLIC`.
- Granular CSS exports under `tokens/*`, `taxonomy/*`, `themes/*`,
  `foundations/*`, `components/*` and `patterns/shared-product-patterns.css` —
  `STABLE_PUBLIC` compatibility path.
- `legacy.css` — compatibility only; not the preferred v1 entrypoint.
- Deep/internal imports: prohibited.
- CSS side effects: declared in `package.json` and verified.
- Distribution through v1: private GitHub immutable SHA pin.
- Registry publication: not required for RC; post-v1 recommendation only.
- Version: human/machine release metadata; consumers still pin the immutable
  Git SHA for reproducibility.

## Bridges and deprecations

Active bridges remain documented and consumer-owned: Talent local token copy,
FileStudio granular Turbopack imports, ShiftImport local-first tokens, and
Command Center semantic aliases. Content Generator AI no longer requires a
bridge after Pilot 9. No consumer repository is changed in Wave 10.

The `syncxml` token and selector aliases remain supported compatibility bridges.
They have replacement, since, reason and removal conditions; no silent removal
occurs in the RC.

## Maturity and evidence-required boundary

Stable component families are listed in `componentStatus.stable`. Shipped
families without sufficient independent runtime evidence are
`CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE`. Combobox, Data Grid, Context Menu,
nested menus, Command Palette, Mega Menu, workspace switcher, resizable shell,
breadcrumb overflow, docking/resizable panels, advanced preview, generic
onboarding/import/entity frameworks and Filter Toolbar remain
`EVIDENCE_REQUIRED` or product-specific. They do not block v1.

Shared Pattern maturity is explicit:

- `auth-entry`, `settings-section`: `STABLE`.
- `file-upload`, `destructive-confirmation`: `CONSUMER_VALIDATED`.
- `processing-result`, `bulk-action-bar`: `CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE`.

`bulk-action-bar` means explicit selection-driven bulk actions: selected count,
primary bulk action and clear-selection affordance, with confirmation for
destructive actions. A FileStudio batch region without explicit selection is
not counted as full validation.

`processing-result` owns composition only. The product owns result data,
metadata, success/partial/failure semantics, domain actions and runtime state.

## Accessibility and quality classification

Canonical catalog fixtures pass the current axe, contrast, browser, keyboard
and focus gates. Historical gradient analysis and consumer small-text or
`aria-controls` findings remain `AUTOMATED_INCOMPLETE` or `CONSUMER_DEBT`; no
canonical `BLOCKS_V1` defect remains. Reduced-motion rules and ES/EN fixtures
are included in the browser matrix.

Visual snapshots are `MANUAL_QA_SUPPORT` / baseline generation, not an
automated visual-diff regression gate. Browser smoke and accessibility checks
are real gates.

## Documentation information architecture

Normative navigation is organized as Foundations, Components, Patterns,
Profiles, Adoption, Governance and Release/Migration. Getting Started remains
in [`consuming-from-apps.md`](../consuming-from-apps.md): determine profile, pin
SHA, import aggregate or supported granular CSS, apply theme/profile, compose
canonical primitives, retain sanctioned extensions and validate browser/a11y/
i18n. This document owns RC/freeze decisions; the Wave 9 document remains the
historical adoption rationale.

## Frozen architecture

Frozen for compatibility/versioning purposes: foundations, stable component
families, profile architecture, Shared Pattern governance, public exports,
adoption schema, migration rules, extension rules and deprecation policy.

Not frozen: consumer adoption percentage, evidence-required features,
product-specific extensions, post-v1 registry distribution and new patterns
that later satisfy promotion evidence.

Post-v1 promotion is:
`EVIDENCE_REQUIRED → PROMOTION_CANDIDATE → AUDIT_CONTRACT →
CONSUMER_VALIDATION → STABLE`.

There is no default Wave 11 architecture phase. Future proven fixes/features
use ordinary patch/minor releases and focused RFC/audit work. No additional
consumer pilot is required because Wave 10 does not materially change an
unvalidated executable public contract.

## Adoption batches — planning only

These batches are frozen as the next operating plan and are not executed here:

1. Reference maintenance: Content Generator AI, Group Landing, Command Center,
   FileStudio.
2. Straightforward P-WKS: Advisor AI, Data Lab, GuestHub, Impulso, Linguo Cam,
   Nexus, Synergi, VisionFlow, GroundSync.
3. Compatibility-heavy: Talent, ShiftImport, TableExtractor, Fiscal, Clearsheet.
4. P-MKT/showcases: Azure Bay, Portfolio, Private Estates, Group, Job Portfolio
   and showcases.

Each batch starts with repository preflight, immutable SHA pinning, profile
classification and real-browser responsive/i18n/a11y validation. No batch is
started automatically by Wave 10.
