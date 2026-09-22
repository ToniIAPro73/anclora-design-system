# Feedback & System States

Wave 5 contract for persistent feedback, transient feedback and data/operation states. The patterns are deliberately separate: the Design System supplies stable anatomy and semantics; the application supplies data, retry logic, queues, timers, portals and live-region timing.

## Decision tree

| Situation | Contract | Accessibility boundary |
| --- | --- | --- |
| One field is invalid | Forms field message | `aria-invalid="true"` and `aria-describedby` on the control |
| A page-level problem needs attention | Alert | Static information may have no live role; urgent dynamic errors use `role="alert"` |
| A short-lived result should not move layout | Toast | Product runtime owns queue, placement and timeout; action/error toasts remain dismissible |
| A collection has no records | Empty State | Explain why and offer the next useful action where one exists |
| The page cannot render its requested content | Error State | Explain recovery and provide retry/back/navigation when possible |
| Work is in progress with no reliable percentage | Loading | `role="status"`, `aria-live="polite"`, and visible status text |
| Work has a trustworthy percentage | Progress | `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`; never invent values |
| An operation has meaningful activity context | Processing | Compose loading and/or progress with a human-readable operation description |
| Content structure is loading | Skeleton | Structural placeholder with `aria-hidden="true"`; pair with a status outside it |

The normal data precedence is **loading → error → empty → content**. A product can add stale or unavailable states when its domain requires them, but it must document the precedence and recovery action.

## Variants and semantics

Empty State remains one component with product-owned copy for first-use, no-results, filtered and permission cases. Error State is visually related but intentionally distinct: it is a recovery surface, not an error sentence inside an otherwise usable page. Success is not a full-surface state by default; use an in-context confirmation or Toast.

Alert tones are `info` (mapped to the canonical review tokens), `success`, `warning` and `danger`. Tone is never the only cue: include a title, readable summary, and an action or dismissal control when relevant. Do not give every alert `role="alert"`; doing so interrupts assistive technology users with non-urgent information.

Toast CSS owns the anatomy and responsive placement. The product runtime owns the portal, queue and lifecycle. As guidance, brief success confirmations can time out after roughly 4–6 seconds; errors and toasts with an action should remain until dismissed or until the action is no longer useful. These are runtime policy choices, not CSS behavior.

Loading and Progress are not interchangeable. A spinner communicates activity but not completion. A determinate bar is only valid when the application can defend the number and its meaning. Processing is the composition for imports, exports, transforms and similar operations where a user benefits from a named activity and optional progress.

Skeletons reserve the shape of content and should not cover buttons or replace an operation indicator. Every animated surface has a `prefers-reduced-motion: reduce` path. Motion is supplemental, not the state signal.

## Responsive, themes and localization

All feedback patterns use semantic tokens and inherit the active `data-theme="dark"|"light"` contract. They must remain legible in product-accent fixtures and must not use raw product colors as normal-size text. On narrow screens, alert actions wrap, toast stacks use the viewport width, and recovery actions remain reachable without horizontal scrolling. Titles, summaries, labels and accessible names are application copy and must be translated together; do not concatenate status fragments in CSS.

## Allowed composition and prohibited drift

Allowed composition is limited to the documented anatomy, canonical Button/Link/Form primitives, semantic status tones and product-owned copy. Consumers may choose layout context and density through sanctioned component classes. Consumers must not create a universal feedback wrapper or `MegaFeedback`, a local toast queue, a local status palette, a spinner-only action state, a fake percentage, or a full notification centre/job dashboard without new ecosystem evidence and a separate contract decision.

## Ecosystem evidence and Pilot 5 recommendation

The audit covered the eight active consumers. Evidence included:

| Consumer | Observed signals | Contract implication |
| --- | --- | --- |
| `anclora-shiftimport` | import/save busy states, `aria-live`, retry/error flows, employee portal loading/error | Alert, Loading, Error State, Processing |
| `anclora-talent` | async loading/error/empty/skeleton surfaces | Loading, Empty State, Error State, Skeleton |
| `anclora-command-center` | `LOADING/READY/EMPTY/STALE/ERROR/UNAVAILABLE`, status/alert roles, confirmation busy state | Empty State, Error State, Alert, Loading |
| `anclora-tableextractor` | Sonner stack, success/error toasts, Loader2, processing/reprocessing and sheet progress | Toast, Loading, Progress, Processing |
| `anclora-content-generator-ai` | generation/loading/error/success and action-feedback flows | Loading, Error State, Toast/Alert |
| `anclora-filestudio` | media progress parser, batch/job processing and loading/error UI | Progress, Processing, Loading |
| `anclora-data-lab` | access-request loading, empty and error states | Empty State, Error State, Loading |
| `anclora-private-estates` | Alert, Progress, Skeleton, Spinner, Sonner and submit feedback | Alert, Toast, Loading, Progress, Skeleton |

Recommended Pilot 5: **`anclora-tableextractor`**, because it exercises the widest combination of Toast + Loading + Progress + Processing in a real import/review workflow. This Wave 5 release does not modify or migrate that consumer.
