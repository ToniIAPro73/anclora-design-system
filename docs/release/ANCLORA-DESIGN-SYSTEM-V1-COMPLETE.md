---
title: ANCLORA DESIGN SYSTEM - Complete V1 Reference
version: 1.0.0
canonical_sha: 215bdbec902914553ea5e4b63cc4808835cef6bf
release_date: 2026-09-22
status: STABLE V1
distribution: Immutable GitHub SHA package dependency
architecture: CSS-first, framework-compatible
---

# ANCLORA DESIGN SYSTEM

## Complete V1 Reference

**Version:** 1.0.0  
**Canonical immutable SHA:** `215bdbec902914553ea5e4b63cc4808835cef6bf`  
**Release date:** 2026-09-22  
**Status:** STABLE V1  
**Distribution model:** Immutable GitHub SHA package dependency  
**Architecture:** CSS-first, framework-compatible

This manual describes the verified V1 state of `@anclora/design-system`. The
Design System repository is canonical. Consumer repositories provide evidence,
not authority.

## Table of contents

1. [Design System overview](#part-i-design-system-overview)
2. [Foundations](#part-ii-foundations)
3. [Component system](#part-iii-component-system)
4. [Navigation and application structure](#part-iv-navigation-and-application-structure)
5. [Product profiles](#part-v-product-profiles)
6. [Shared Product Patterns](#part-vi-shared-product-patterns)
7. [Package and consumption contract](#part-vii-package-and-consumption-contract)
8. [Runtime libraries and adapters](#part-viii-runtime-libraries-and-adapters)
9. [Product extensions and compatibility](#part-ix-product-extensions-and-compatibility)
10. [Accessibility](#part-x-accessibility)
11. [Internationalisation and responsive design](#part-xi-internationalisation-and-responsive-design)
12. [Adoption model](#part-xii-adoption-model)
13. [Reference consumers](#part-xiii-reference-consumers)
14. [Migration playbook](#part-xiv-migration-playbook)
15. [QA and validation](#part-xv-qa-and-validation)
16. [Governance and deprecation](#part-xvi-governance-and-deprecation)
17. [Evidence-required and outside V1](#part-xvii-evidence-required-and-outside-v1)
18. [Post-V1 evolution](#part-xviii-post-v1-evolution)
19. [V1 reference](#part-xix-v1-reference)

---

## PART I - DESIGN SYSTEM OVERVIEW

### Purpose and scope

Anclora Design System is the shared CSS-first contract for the Anclora
ecosystem. It owns semantic design foundations, canonical visual components,
profile-level composition rules, shared product-pattern contracts, public CSS
entrypoints, accessibility expectations, and the migration and compatibility
rules that let independent products converge without becoming one monolith.

It is not a product runtime, routing framework, authentication system, data
layer, permission model, business workflow engine, or replacement for a
consumer's headless interaction runtime.

### Principles

- Semantic meaning is owned centrally; product identity is extended at documented extension points.
- CSS and semantic HTML are the portable contract; frameworks are implementation environments.
- Components own anatomy and visual states; applications own data, runtime state, routing, permissions and business rules.
- Profiles classify interaction archetypes, not business verticals.
- Shared Patterns are compositions, not monolithic business frameworks.
- Stable claims require executable verification and appropriate consumer evidence.
- Immutable Git SHA distribution is the reproducibility contract.
- Accessibility, responsive behaviour and bilingual copy expansion are part of the design contract.

### Architectural model

```text
Governance / contracts / infrastructure
                 |
                 v
       Anclora Design System
  foundations -> tokens -> components
                    |          |
                    v          v
              patterns -> profiles
                    |
                    v
             product extensions
                    |
                    v
                consumers
```

The Design System is the canonical authority for the layers it publishes. A
consumer may add composition and product identity, but cannot silently redefine
semantic token meaning, focus semantics, generic component anatomy or state
meaning.

### Source-of-truth hierarchy

For executable package truth, use this order:

1. `design-system.manifest.json` for machine-readable contracts and maturity.
2. `package.json` exports and `src/system.css` for the public package surface.
3. Canonical CSS in `src/` for executable visual behaviour.
4. Component, profile, pattern, theme and quality documentation for guidance.
5. Adoption inventory and release records for ecosystem evidence and release state.

When prose and executable implementation disagree, the conflict must be
flagged and resolved; it must not be hidden by inventing a third contract.

### What belongs in the Design System

Semantic tokens, foundations, stable component anatomy, generic states,
accessible visual contracts, profile composition rules, reusable domain-neutral
patterns, supported public exports, compatibility/deprecation rules and
verification tooling belong here.

### What remains product-owned

Products own routing, labels, copy, data fetching, persistence, authentication,
permissions, business state, portals and queues, timers, focus runtime,
positioning runtime, API calls, domain workflows and product-specific
composition. A product may use a thin adapter around a headless runtime while
retaining the `.ac-*` contract as visual authority.

### CSS-first and framework boundaries

The package can be consumed by Vite, Next/Turbopack, plain HTML and other
frameworks that can load CSS. It does not ship a universal React component
runtime. Semantic HTML, CSS classes, custom properties and documented ARIA
requirements are the portable surface; application code supplies framework
and runtime behaviour.

---

## PART II - FOUNDATIONS

### Semantic token architecture

Token ownership is explicit:

| Ownership | Responsibility |
| --- | --- |
| FOUNDATION | Raw scales, brand primitives and platform-independent building blocks. |
| SEMANTIC | Theme-aware meaning: surfaces, text, focus, borders and status roles. |
| COMPONENT | Anatomy and component-specific composition values. |
| PROFILE | Structural and compositional values for Core, P-WKS and P-MKT. |
| PRODUCT_EXTENSION_POINT | Product identity or composition values, never a replacement for semantic meaning. |

Every executable token is defined once in the package or is an explicitly
documented optional external reference with a fallback. The final token gate
scanned 56 CSS files, found zero undefined required canonical tokens, and
confirmed that `--accent-mint` is not an unresolved dependency.

### Colour, surfaces, borders and status

Consumers use semantic roles such as `--bg`, `--surface`, `--text-primary`,
`--text-secondary`, `--border-control`, `--focus-ring` and the status roles.
Raw accents are not automatically safe as normal-size text. `--accent` is a
brand value; derived roles such as `--text-link`, `--focus-ring` and
`--text-on-accent` are recalculated where theme contrast requires it.

Use `--border-control` when the border is the necessary cue that a control or
boundary exists. `--border-subtle` and `--border-default` remain decorative
strengths. Status borders use the canonical status mapping and must not be
replaced with consumer-local hex values.

### Typography, spacing, radius and motion

Typography, spacing, radius, shadow and motion foundations are published as
CSS custom properties and consumed by component contracts. Component variants
and profile defaults are the sanctioned density controls. Consumers should not
override the bare component selector to create a parallel scale.

Motion must preserve usable focus and state changes. Reduced-motion rules are
part of the canonical browser matrix. Product animation may add context but
must not hide the semantic state or make keyboard operation dependent on motion.

### Light and dark theme contract

Set the public attribute on the document or the relevant application root:

```html
<html lang="en" data-theme="dark">
```

Supported values are `dark` and `light`. Omitting the attribute retains the
backwards-compatible dark/root values. The Design System owns semantic theme
roles and contrast. The application owns preference detection, persistence, the
theme switch UI and the pre-hydration attribute assignment.

`data-theme` is independent from `data-profile`; profile selection must not
create a third theme mechanism.

### Product extension tokens

Product accents and composition values belong in documented product extension
layers. A product may provide brand identity and layout context, but may not
redefine the meaning of danger, success, warning, focus, disabled or other
semantic roles. Optional external references such as `--layer-sticky`,
`--layer-skip-link`, `--ac-stat-columns`, `--stack-gap` and `--cluster-gap`
have canonical fallbacks.

### Prohibited overrides

Do not create local semantic palettes, local focus rings, arbitrary z-index
scales, parallel `.app-button` families, raw accent text without contrast
evidence, or a new theme selector. Use a documented component variant or
extension point, and propose a Design System variant when the need is shared.

---

## PART III - COMPONENT SYSTEM

### Maturity states

| State | Meaning |
| --- | --- |
| STABLE | Executable contract verified in the repository and supported by real consumer evidence. |
| CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE | Shipped canonical CSS with incomplete independent runtime evidence. |
| EVIDENCE_REQUIRED | Not a V1 stable contract; requires focused audit and consumer validation. |
| DEPRECATED | Compatibility support remains until the documented removal condition is met. |

### Stable component inventory

The stable V1 inventory is authoritative in `design-system.manifest.json`:

| Family | Contract summary |
| --- | --- |
| Button | Primary, secondary, ghost, destructive, small, large, compact and icon-only composition. |
| Surface Panel | Surface and elevation container. |
| Form Field | Label, hint, control and message relationships. |
| Data Table | Native table semantics, density, status composition and responsive overflow. |
| Status Badge | Semantic status tones and accessible text. |
| Empty State | First-use, no-results, filtered and permission-aware empty surfaces. |
| Modal | Blocking dialog visual contract; runtime owns focus and lifecycle. |
| Theme Switcher | Theme control composition; application owns persistence. |
| Language Switcher | Language selection composition; application owns locale state. |
| Stepper | Sequential progress composition where the product owns workflow state. |
| Chapter Rail | Editorial/workspace navigation composition. |
| Template Catalog | Template selection surface. |
| Preview Overlay / Preview Controls | Preview and contextual control anatomy. |
| Workspace Stage | Operational/editorial working surface. |
| Workflow Shell / Editor Shell | Product workflow and editor composition. |
| Alert / Toast | Persistent and transient feedback visuals; runtime owns lifecycle. |
| Error State / Empty State / Loading | Full-surface or short-lived system states. |
| Progress / Processing / Skeleton | Determinate, contextual and structural activity states. |
| Menu / Popover / Tooltip / Drawer | Contextual interaction visuals; runtime is consumer-owned. |
| App Shell / Page Container / Page Header | Application structure composition. |
| Text Editor / Export Suite | Editorial and export composition contracts. |

### Component contract rules

Every stable family has an anatomy, semantic HTML expectation, visual states,
theme behaviour, responsive guidance and runtime boundary in its component or
architecture documentation. Components must remain composable; they do not
fetch data, own permissions, implement routing or become universal business
wrappers.

The Button contract is illustrative:

```html
<button class="ac-button ac-button--secondary ac-button--icon" aria-label="Open menu">
  <svg aria-hidden="true" viewBox="0 0 24 24"><!-- Lucide icon --></svg>
</button>
```

`ac-button--icon` is orthogonal to variant and density. Icon-only controls
require an accessible name. A tooltip or `title` is not a substitute for the
name. `ac-button--compact` is the sanctioned dense workspace variant; a local
`.dashboard-button` fork is not.

### Forms and controls

Field owns label, hint, message and relationship anatomy. The actual control
owns value, focus, disabled, readonly and invalid semantics. Use
`aria-invalid="true"` and `aria-describedby` for visible errors; never rely on
colour alone. Combobox remains evidence-required and is not implied by Select,
Popover or a generated headless component.

### Data Table

The Data Table is built on native `caption`, `thead`, `tbody`, `tr`, `th` and
`td` semantics. Sorting uses a native button in the header with `aria-sort`.
Selection state and pagination belong to the application. Simple tables may
use horizontal overflow on narrow screens; action-heavy tables need a
documented accessible list/card transformation. Data Grid, spreadsheet editing,
virtualisation, column resize, pinned columns and drag reorder are outside V1.

### Feedback and system states

The canonical precedence is loading -> error -> empty -> content. Alert, Toast,
Empty State, Error State, Loading, Progress, Processing and Skeleton remain
distinct semantics. An indeterminate operation must not expose a fake numeric
percentage. Products own queues, timers, portals, retry logic and live-region
timing.

---

## PART IV - NAVIGATION AND APPLICATION STRUCTURE

### App Shell and Page Container

App Shell, Page Container and Page Header provide composition surfaces rather
than a routing framework. The consumer supplies routes, labels, permissions,
active state and account/menu integration. Use one content scroll model by
default; independent sidebar or Drawer scrolling is permitted where content
requires it.

### Navigation semantics

The active route link must carry `aria-current="page"`. Landmarks, accessible
names and keyboard order are consumer responsibilities composed with the
canonical visual contract. Account menus and authentication controls are
product-owned integrations with canonical Menu, Modal, Drawer and Button
visuals.

### Responsive workspace shell

For P-WKS, the persistent sidebar becomes a modal Drawer below the documented
responsive threshold when evidence supports the transformation. Do not assume
that a desktop sidebar can simply be hidden. Preserve navigation reachability,
focus return, dismissal, labels and content order.

---

## PART V - PRODUCT PROFILES

Profiles classify UX and interaction archetypes, not business verticals. A
mixed repository may use different route/layout roots with different profiles;
the nearest sanctioned layout root owns the surface and competing nested
declarations are prohibited.

```text
Core / default
|-- P-WKS  (Workspace / Operational)
`-- P-MKT  (Marketing / Landing)
```

This is a relationship of composition, not inheritance.

### Core / default

Use Core when the product has no persistent workspace shell and is not a public
narrative marketing surface. It owns shared semantic tokens, theme, focus and
disabled semantics, navigation anatomy, page containers and overlay integration.
It does not own routing, auth, permissions, labels or business state.

Omit `data-profile` for Core/default.

### P-WKS

P-WKS is the authenticated, persistent operational archetype: sidebar/topbar,
high information density, tables, entity lists, forms, modals and status
badges. It owns workspace shell composition, operational topbar slots,
sidebar-to-mobile-Drawer transformation and dense page composition.

```html
<div data-profile="workspace" data-theme="dark">
  <!-- application-owned routes and workflow state -->
</div>
```

P-WKS may choose sanctioned density and navigation defaults. It may not change
semantic colour meaning, focus behaviour, base anatomy, theme semantics,
routing or permission logic.

### P-MKT

P-MKT is the public, unauthenticated, narrative single-scroll archetype. It
owns public header composition, CTA-oriented regions, narrative content shell
and looser marketing spacing. It does not imply a persistent application shell.

```html
<main data-profile="marketing" data-theme="light">
  <!-- product-owned narrative and conversion content -->
</main>
```

P-MKT may adjust hero emphasis and public header composition, but not semantic
roles, base radii, focus/disabled behaviour or the theme contract.

---

## PART VI - SHARED PRODUCT PATTERNS

Shared Patterns are CSS-first compositions above components and below product
profiles. The application owns runtime, state, data, permissions and business
rules.

| Pattern | Scope and maturity | Composition boundary |
| --- | --- | --- |
| `auth-entry` | Core; STABLE | Authentication visual entry; provider, session and redirect remain product-owned. |
| `settings-section` | Core/P-WKS; STABLE | Settings grouping; available settings and persistence remain product-owned. |
| `file-upload` | Core/P-WKS; CONSUMER_VALIDATED | Upload anatomy; transport, validation and storage remain product-owned. |
| `processing-result` | Core/P-WKS; CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE | Result composition; data, metadata, success/partial/failure semantics and actions remain product-owned. |
| `bulk-action-bar` | P-WKS; CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE | Explicit selection count, primary bulk action and clear-selection affordance; destructive actions need confirmation. |
| `destructive-confirmation` | Core/P-WKS; CONSUMER_VALIDATED | Modal confirmation anatomy; mutation and authorization remain product-owned. |

Promotion requires recurrence in independent products, compatible lifecycle,
domain neutrality, accessibility benefit, stable responsive behaviour and copy
expansion that works in English and Spanish. A product-specific import flow,
onboarding framework or entity manager is not automatically a Shared Pattern.

---

## PART VII - PACKAGE AND CONSUMPTION CONTRACT

### Distribution

V1 is distributed as a private GitHub tarball pinned to immutable commit SHA
`215bdbec902914553ea5e4b63cc4808835cef6bf`. The package version is `1.0.0`,
but the SHA remains the reproducibility and consumer dependency contract.
Registry publication is a post-V1 governance candidate, not a V1 operation.

### Public CSS API

Preferred aggregate import:

```css
@import "@anclora/design-system/system.css";
```

The stable granular API includes `tokens/core.css`, `tokens/semantic.css`,
`taxonomy/tier.css`, `taxonomy/domain.css`, `taxonomy/archetype.css`,
`taxonomy/role.css`, `taxonomy/clusters.css`, `themes/product.css`,
`foundations/typography.css`, `foundations/primitives.css`,
`components/index.css`, the public component CSS exports, and
`patterns/shared-product-patterns.css`.

`legacy.css` is a compatibility entrypoint. Deep/internal imports are not
documented or supported. CSS is declared in `sideEffects` so bundlers do not
remove the contract as unused JavaScript.

### Stack examples

Generic CSS:

```css
@import "@anclora/design-system/system.css";
```

Next/Turbopack normally uses the aggregate import in `app/globals.css` and
pins the GitHub SHA. If a nested CSS resolution limitation requires it, use
documented granular imports and record the bridge; do not copy tokens.

Vite/React uses the same aggregate import from the application entry CSS:

```ts
import "@anclora/design-system/system.css";
```

All stacks must preserve the `data-theme`, `data-profile`, semantic HTML and
consumer-owned runtime boundaries.

### Supported and observed stacks

The contract is framework-compatible. V1 evidence includes Vite/React,
Next/React and Next/Turbopack consumers, with headless runtimes such as shadcn,
Radix or Base UI remaining consumer implementation details. No framework is
made a canonical dependency of the package.

---

## PART VIII - RUNTIME LIBRARIES AND ADAPTERS

Radix, Base UI, shadcn and other headless runtimes may supply focus management,
keyboard navigation, portals, dismissal and positioning. A THIN_ADAPTER maps
that runtime to canonical Anclora class names, semantic markup and tokens while
leaving the runtime lifecycle in the application.

A VISUAL_FORK recreates or diverges from a canonical `.ac-*` family, duplicates
semantic tokens, changes focus/state meaning or creates a parallel component
family. Visual forks are prohibited when a canonical family or documented
extension point covers the need. If a runtime cannot support the canonical
contract, record the bridge and its removal condition rather than silently
forking the visual authority.

---

## PART IX - PRODUCT EXTENSIONS AND COMPATIBILITY

Sanctioned extensions include branding accents, product copy, product-specific
composition, profile defaults and documented component custom properties. They
must preserve semantic roles, focus, generic anatomy and state meaning.

Compatibility bridges are explicit, consumer-owned and temporary where a
bundler or existing implementation requires them. Current examples include
local token bridges in Talent and ShiftImport, granular imports in FileStudio,
and semantic aliases in Command Center. Content Generator AI no longer needs a
bridge after its validated aggregate import.

The `syncxml` token and selector aliases remain supported compatibility bridges.
They have a replacement, reason, since marker and removal condition. A bridge
is removed only after the stated condition and a compatible release window.

Do not create semantic-token forks, duplicate a button/card/modal family, or
make a consumer implementation normative merely because it exists in a
reference product.

---

## PART X - ACCESSIBILITY

V1 targets WCAG 2.2 AA for the canonical contract. The Design System provides
semantic roles, focus tokens, keyboard-oriented anatomy, contrast-verified
semantic pairs and guidance. Consumers remain responsible for actual names,
labels, route semantics, data, runtime focus management and dynamic timing.

### Release expectations

- Visible keyboard focus and a load-bearing canonical focus ring.
- Native keyboard semantics for buttons, links, inputs, choices and tables.
- Accessible names for controls, especially icon-only buttons.
- Labels and descriptions connected to actual form controls.
- `aria-current="page"` on the active route link.
- Correct landmarks and heading structure.
- Modal focus containment and return; Drawer focus and dismissal.
- `role="status"` for polite progress/loading updates and `role="alert"` only for urgent errors.
- Valid contrast for text, controls, focus and necessary non-text boundaries.
- Reduced-motion behaviour that preserves information and control.
- Responsive targets that remain reachable and usable on narrow screens.

The final canonical gates include axe checks, contrast mathematics and browser
smoke across desktop, tablet and mobile, including a light-theme component
pass. Historical automated-incomplete and consumer-debt findings remain
documented; they are not silently upgraded to PASS.

---

## PART XI - INTERNATIONALISATION AND RESPONSIVE DESIGN

Canonical fixtures exercise ES/EN labels and long-copy expansion. Consumers
must translate labels, descriptions, status names and accessible names as a
unit; CSS must not concatenate language fragments.

The responsive contract covers 375/430 mobile surfaces, tablet layouts and
desktop widths. Prefer content containers and wrapping over fixed viewport
assumptions. Simple tables may overflow horizontally inside an accessible
scroll region; action-heavy tables need a documented transformation. P-WKS
prioritises reachability and density; P-MKT prioritises narrative hierarchy
and conversion composition.

---

## PART XII - ADOPTION MODEL

The exclusive lifecycle field is `adoptionStage`; each included frontend has
exactly one stage:

| Stage | Definition |
| --- | --- |
| NOT_ADOPTED | No verified runtime dependency or public import. |
| FOUNDATIONS | Tokens, foundations or theme imported at runtime. |
| COMPONENTS | A canonical component family composed at runtime. |
| SHELL_PROFILE | A canonical profile or shell composed at runtime. |
| PATTERNS | A Shared Pattern composed in a real workflow; validation may remain partial. |
| SUBSTANTIAL | Multiple canonical layers cover a meaningful product surface. |

`referenceConsumer` is orthogonal. It records validated evidence or useful
integration context and never changes adoption stage or canonical authority.
Adoption percentage is not Design System maturity.

### V1 ecosystem snapshot

The verified inventory contains 26 included frontends:

| Stage | Count |
| --- | ---: |
| NOT_ADOPTED | 20 |
| FOUNDATIONS | 1 |
| COMPONENTS | 0 |
| SHELL_PROFILE | 0 |
| PATTERNS | 1 |
| SUBSTANTIAL | 4 |
| Total | 26 |

There are 7 reference consumers. The snapshot is an evidence record, not a
claim that every product has migrated.

---

## PART XIII - REFERENCE CONSUMERS

Reference consumers are not the source of truth. They validate parts of the
contract and expose integration evidence.

| Consumer | Evidence contribution |
| --- | --- |
| Command Center | Vite operational workspace, substantial component consumption, semantic alias bridge and wrapper boundaries. |
| Talent | Next workspace density, button compact/icon cascade risks and local token bridge policy. |
| ShiftImport | Vite foundations/forms/menu/drawer use and local-first token bridge. |
| TableExtractor | Compatibility-heavy import/review workflow and evidence boundary for feedback and data operations. |
| Content Generator AI | Next/Turbopack aggregate `system.css`, `data-theme` bridge and post-Pilot 9 no-bridge state. |
| Group Landing | Vite P-MKT aggregate consumption and public narrative composition. |
| FileStudio | Next/Turbopack, shadcn/Base UI runtime, pattern composition and granular-import bridge. |

The Design System repository remains the only canonical authority for tokens,
components, patterns, profiles, exports and maturity.

---

## PART XIV - MIGRATION PLAYBOOK

Use progressive migration rather than a big-bang conversion:

```text
repo preflight
  -> profile identification
  -> immutable V1 SHA
  -> CSS / foundations
  -> theme
  -> primitives
  -> shell / profile
  -> Shared Patterns
  -> product extensions
  -> fork cleanup
  -> responsive / i18n / a11y
  -> consumer gates
  -> documentation
  -> commit / push
```

At each stage preserve working product behaviour, record bridges, remove only
verified duplicate families, and validate real browser behaviour at desktop,
tablet and mobile sizes. A migration must not promote a consumer to reference
authority or introduce an architectural Wave.

---

## PART XV - QA AND VALIDATION

### Canonical release model

`npm run verify:release` orchestrates manifest, adoption, navigation shell,
Shared Patterns, HTML, Button, Forms, Data Table, Feedback, Overlay, theme
contrast, browser smoke, accessibility, package dry-run, token ownership and
release-state checks.

V1 was verified in a clean checkout using `npm ci`, Node `v24.19.0` and npm
`11.17.0`. The repository CI contract uses Node 22; the package has no build
step because CSS is served as source. `npm pack --dry-run` is the package build
and public-surface check.

### Real gates versus visual support

Browser smoke and accessibility checks are REAL_GATE checks. Contrast and
token verification are REAL_GATE checks. Agent-browser/shared runtime checks
are required for UI/CSS changes. Snapshot generation is
BASELINE_GENERATOR / MANUAL_QA_SUPPORT; overwriting or generating a baseline
is not an automated visual-diff regression PASS.

The shared QA runtime must confirm content, absence of framework error overlays,
responsive reachability and theme behaviour. Production-destructive QA is
prohibited in this package repository; consumers must use their governed QA
model and dedicated identities where applicable.

### V1 verification summary

- `npm run verify:release`: PASS.
- Manifest: 57 export entrypoints reconciled.
- Adoption: 26 included frontends, 7 reference consumers.
- Token contract: 56 CSS files scanned, 5 optional external fallbacks.
- Browser: desktop 1440/1360, tablet 834 and mobile matrix PASS.
- Accessibility: axe catalog including light-theme component pass PASS.
- Package: `@anclora/design-system@1.0.0`, 237 files, 68.4 MB tarball.
- RC tag: `v0.16.0-rc.1`; V1 tag: `v1.0.0`.

---

## PART XVI - GOVERNANCE AND DEPRECATION

The manifest is the machine-readable governance surface. Public exports,
semantic roles, maturity states, profile scope, adoption schema and extension
rules are maintained there and in the linked normative documentation.

Deprecation requires a replacement, `since`, reason, removal condition and a
compatible warning period. Published tags are immutable; no tag is moved or
rewritten. Consumers pin an immutable SHA and record bridges rather than
depending on a floating branch.

The Design System owns the shared contract. Products own integration, data,
runtime, permissions and business semantics. A product extension that recurs
across independent products should enter focused evidence/audit/RFC work rather
than become an unreviewed local fork.

---

## PART XVII - EVIDENCE-REQUIRED AND OUTSIDE V1

These are intentionally outside stable V1, not missing mandatory V1 features.
Promotion requires focused evidence and contract review.

| Area | Current maturity | Promotion evidence |
| --- | --- | --- |
| Combobox | EVIDENCE_REQUIRED | Two materially different consumers validating API and keyboard model. |
| Data Grid | EVIDENCE_REQUIRED | Real spreadsheet-like workloads with stable semantics and responsive/accessibility contract. |
| Filter Toolbar | Product-specific / evidence-required | Independent products with compatible filter lifecycle and responsive behaviour. |
| Context Menu / nested menus | EVIDENCE_REQUIRED | Multiple runtime integrations and verified keyboard/dismissal model. |
| Stepper extensions | Product-specific beyond current stable Stepper | Recurrent cross-product flow contract beyond current composition. |
| Inspector | Product-specific | Repeated domain-neutral inspector anatomy with stable ownership boundary. |
| Command Palette | EVIDENCE_REQUIRED | Independent command discovery workflows and validated focus/search semantics. |
| Mega Menu | EVIDENCE_REQUIRED | Public navigation evidence with stable responsive and keyboard contract. |
| Workspace switcher | EVIDENCE_REQUIRED | Recurrent multi-workspace account model with stable accessibility contract. |
| Resizable/docking layouts | EVIDENCE_REQUIRED | Multiple operational products validating resize, persistence, keyboard and responsive rules. |
| Advanced preview | Product-specific / evidence-required | Shared preview lifecycle and interaction model across products. |
| Generic onboarding/import/entity management | Product-specific | Domain-neutral repetition with compatible lifecycle, data and permission boundaries. |

These areas do not justify Wave 11. They use ordinary focused RFC/audit,
consumer validation and semantic versioning.

---

## PART XVIII - POST-V1 EVOLUTION

The numbered architectural Wave process is closed. Post-V1 work follows normal
semantic versioning and evidence:

- PATCH for canonical defects and safe corrections.
- MINOR for backwards-compatible, evidence-backed additions.
- MAJOR for breaking public contract changes.

Promotion path for evidence-required capabilities:

```text
EVIDENCE_REQUIRED
  -> PROMOTION_CANDIDATE
  -> AUDIT_CONTRACT
  -> CONSUMER_VALIDATION
  -> STABLE
```

Future registry distribution remains a governance candidate. It must not be
introduced as an accidental replacement for immutable SHA pinning.

---

## PART XIX - V1 REFERENCE

### Public exports

The canonical public API is `system.css`, the legacy compatibility entrypoint,
the token/taxonomy/theme/foundation exports, `components/index.css`, the
documented component CSS families and `patterns/shared-product-patterns.css`.
The complete export map is machine-checked against the manifest and package
metadata; deep imports are not supported.

### Profile IDs

- Core/default: omit `data-profile`.
- P-WKS: `data-profile="workspace"`.
- P-MKT: `data-profile="marketing"`.
- Theme is independent: `data-theme="dark"|"light"`.

### Pattern IDs

`auth-entry`, `settings-section`, `file-upload`, `processing-result`,
`bulk-action-bar`, `destructive-confirmation`.

### Reference consumers

Command Center, Talent, ShiftImport, TableExtractor, Content Generator AI,
Group Landing and FileStudio. They are evidence only.

### Current compatibility bridges and deprecations

Documented bridges include local token bridges, granular-import bridges and
semantic aliases. The `syncxml` aliases remain supported with removal
conditions. No alias is removed silently.

### V1 release identity

| Field | Value |
| --- | --- |
| Package | `@anclora/design-system@1.0.0` |
| V1 tag | `v1.0.0` |
| Immutable V1 SHA | `215bdbec902914553ea5e4b63cc4808835cef6bf` |
| RC baseline | `0.16.0-rc.1` at `09669c667630e959969c5e2295aa8dd7a642404d` |
| Blocks V1 | `0` |
| Additional pilot required | `NO` |
| Registry publication | `NOT_REQUIRED; POST_V1_CANDIDATE` |

### Ecosystem migration handoff

No migrations are executed by this release. The frozen planning batches are:

1. Reference maintenance: Content Generator AI, Group Landing, Command Center, FileStudio.
2. Straightforward P-WKS: Advisor AI, Data Lab, GuestHub, Impulso, Linguo Cam, Nexus, Synergi, VisionFlow, GroundSync.
3. Compatibility-heavy: Talent, ShiftImport, TableExtractor, Fiscal, Clearsheet.
4. P-MKT/showcases: Azure Bay, Portfolio, Private Estates, Group, Job Portfolio and showcases.

Each future batch starts from the V1 SHA, classifies profile scope, validates
browser/i18n/a11y behaviour and records bridges. Batch 1 is ready to begin,
but is intentionally not started by this release.

## Final statement

ANCLORA DESIGN SYSTEM V1 is an architecture release, not an ecosystem
adoption-completion claim. The canonical repository, immutable tag and
verification gate define the stable baseline for the next phase: ecosystem
migration.
