# Shared Product Patterns

Wave 8 establishes a deliberately small composition layer above components and below complete product/profile shells.

## Deterministic boundary

- **Component**: a reusable primitive or self-contained interaction, such as Button, Input, Modal or Data Table.
- **Shared Product Pattern**: a reusable composition of canonical components with a recurring product-level semantic responsibility.
- **Profile**: an application-wide structural archetype, currently Core/default, P-WKS and P-MKT.
- **Product Extension**: domain-specific composition, workflow, data or runtime that remains in one application.

The Design System owns anatomy, tokens, accessibility guidance and layout composition. Applications own authentication providers, sessions, permissions, persistence, APIs, business validation, file processing, import state and destructive operations.

## Promotion criteria

A pattern is promoted only when evidence shows recurrence in at least two independent products, preferably three when implementations differ materially; the semantic purpose and lifecycle are compatible; the composition is domain-neutral; the pattern materially improves accessibility or responsive consistency; and it composes existing canonical components. Responsive behaviour must be stable at mobile, tablet and desktop, and fixtures must tolerate ES/EN copy expansion.

Visual resemblance alone is insufficient. A pattern may remain `PATTERN_CANDIDATE`, `EVIDENCE_REQUIRED`, `PROFILE_SPECIFIC` or `PRODUCT_SPECIFIC`.

## Canonical inventory

| id | scope | evidence | composition | maturity |
| --- | --- | --- | --- | --- |
| `auth-entry` | CROSS_PROFILE | ShiftImport, Content Generator AI, TableExtractor, Talent, Data Lab | Form fields, Button, Alert/Error State, secondary links | STABLE |
| `settings-section` | CORE_SHARED / P-WKS_SHARED | Content Generator AI, Talent, ShiftImport settings surface | Page Header/section heading, Form Field, choice controls, Button, feedback | STABLE |
| `file-upload` | CORE_SHARED / P-WKS_SHARED | TableExtractor, FileStudio, Talent, ShiftImport | native file input, upload anatomy, Form Field, Button, Alert, Empty State | CONSUMER_VALIDATED |
| `processing-result` | CORE_SHARED / P-WKS_SHARED | FileStudio, Talent, Content Generator AI | file metadata, Processing/Progress, Status, result actions | CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE |
| `bulk-action-bar` | P-WKS_SHARED | FileStudio, ShiftImport | selected count, Button/Menu, destructive confirmation when needed | CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE |
| `destructive-confirmation` | CROSS_PROFILE | ShiftImport, Command Center, FileStudio, Talent | Modal, consequence copy, cancel/destructive Button, loading/error feedback | CONSUMER_VALIDATED |

Pattern classes are CSS-first layout contracts in `src/patterns/shared-product-patterns.css`; they are not React runtime components.

## Pattern contracts

### Authentication entry

Use one clearly labelled form region with an explicit primary action, recovery/alternative navigation and an adjacent error or alert region. Provider choice, OAuth, Better Auth, credentials, redirect and session state stay in the application. The entry is responsive as a single-column card and must keep focus order and error association intact.

### Settings section

Use a heading/description, labelled controls, grouped preferences and a clear action footer. Save state and persistence remain app-owned. On narrow screens the footer stacks full-width actions; labels and feedback must expand without fixed widths.

### File upload

Separate file selection from processing. A dropzone is only an accessible selection surface: keyboard/native file selection, accepted formats, size guidance, invalid-file feedback, removal and a visible process action are required. Dragging is never the only interaction. File transfer, parsing and queues remain application-owned.

### Processing result

Compose file metadata with the existing Processing/Progress and semantic status primitives, then expose in-context result and next actions. Use `role="status"` for polite progress and `role="alert"` only for urgent errors. Do not create domain-specific PDF/image processing components.

### Bulk action bar

The canonical meaning is an explicit selection-driven action region: show selected count, the primary bulk action, any destructive action and clear-selection affordance. Selection state, permissions, batching and partial failures remain application-owned. A generic batch/job toolbar without explicit selection is product-specific evidence, not full validation. On mobile the bar becomes a stacked action region; actions retain at least the canonical Button target size.

### Destructive confirmation

Use the canonical Modal/Dialog anatomy with an explicit consequence, optional entity identifier, cancel action and destructive confirmation. The application owns the mutation, permissions, loading/error state and focus-trap runtime. Never communicate consequence through colour alone.

## Evidence-required and product-owned decisions

| candidate | decision | reason |
| --- | --- | --- |
| `filter-toolbar` | PATTERN_CANDIDATE | Search/filter surfaces recur, but global search, entity search and preset filtering do not yet share a stable lifecycle. |
| mobile filter Drawer | EVIDENCE_REQUIRED | Responsive transformations differ; do not force Drawer over stacked fields. |
| `onboarding` | EVIDENCE_REQUIRED | ShiftImport organisation onboarding and Talent/editorial onboarding are materially different. |
| `import-flow` | PRODUCT_SPECIFIC | Select → parse → preview → validate → confirm → import is strong in ShiftImport but not recurrent with the same semantics elsewhere. |
| `section-toolbar` | PATTERN_CANDIDATE | Several toolbars exist, but some are page identity or global search rather than dataset controls. |
| `inspector` | EVIDENCE_REQUIRED | FileStudio comparison inspector and editorial/detail surfaces have different responsibilities. |
| `entity-management` | PRODUCT_SPECIFIC | Employee/admin/domain models and CRUD rules remain application-owned. |
| `form-action-footer` | EVIDENCE_REQUIRED | Repeated visually, but sticky and responsive ownership is not yet stable. |
| `stepper` | EVIDENCE_REQUIRED | The shipped component exists, but Wave 8 did not establish two independent, materially similar progression contracts. |
| `file-preview` | EVIDENCE_REQUIRED | PDF, image, table and converted-artifact previews differ materially. |
| `combobox`, `data-grid` | EVIDENCE_REQUIRED | New consumer evidence is recorded, but no promotion occurs in Wave 8. |

`EMPTY DATASET` and `NO FILTER RESULTS` remain distinct application messages composed with the canonical Empty State; no second no-results component is introduced. `processing-result` is a composition contract: result data, metadata, success/partial/failure semantics and domain actions remain application-owned.

## Agent rules

When a task matches a promoted pattern, compose its canonical components and follow this contract before inventing a local wrapper. Do not copy a product-specific workflow into Core, create a monolithic “super pattern”, place business logic in the Design System, or create local duplicate filter/upload/destructive-modal anatomy where a canonical composition applies. Use the manifest inventory as the machine-readable source of truth and consult the evidence-required list before adding a new pattern.

## Validation and adoption

The catalog fixture is `preview/shared-product-patterns.html`. It demonstrates all promoted compositions in dark and light theme samples and includes ES/EN-length copy. `verify:shared-patterns` checks manifest/docs agreement, canonical identifiers, component references, profile scopes and prohibited product names. Wave 8 does not migrate a consumer; Pilot 8 is selected separately from the evidence matrix.
