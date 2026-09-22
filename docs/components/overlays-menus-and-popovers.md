# Overlays, Menus & Contextual Interaction

Wave 6 defines the boundaries between contextual surfaces. The Design System is CSS-first: it owns visual anatomy, semantic tokens and interaction guidance. An application or headless primitive owns focus movement, keyboard state, portals, collision handling and dismissal orchestration.

## Deterministic decision model

| Need | Use | Do not use |
| --- | --- | --- |
| Three contextual actions behind a trigger | Menu | Generic Popover or Modal |
| An action list opened from an explicit trigger | Dropdown Menu composition of Menu | A list of generic divs |
| Secondary-click command surface | Context Menu, evidence-required | Pretend it is a Dropdown Menu |
| Short supplemental help for a control or datum | Tooltip | Interactive content or an accessible-name substitute |
| Rich contextual content or compact controls while the page remains usable | Popover | Modal semantics by default |
| Substantial edge-attached content, especially on mobile | Drawer/Sheet | A narrow Popover with overflowing content |
| Blocking confirmation or focused decision | Modal/Dialog | Popover or Menu |
| Native/selectable options | Select; searchable options are Combobox | Generic Popover |
| Site/app navigation | Navigation Menu or links | Automatically treating it as a command Menu |

The agent answers are therefore deterministic: “three actions behind a kebab” means Menu; “explanatory text on focus/hover” means Tooltip; “several contextual controls” means Popover; “mobile side panel” means Drawer/Sheet; “blocking confirmation” means Modal; “searchable options” means the evidence-required Combobox contract.

## Menu contract

Menu anatomy is `ac-menu`, an explicit trigger, `ac-menu__content`, `ac-menu__item`, optional `ac-menu__label` and `ac-menu__separator`. Use the canonical Button or icon-only Button for the trigger; an icon-only trigger requires an accessible name and the runtime should expose `aria-haspopup="menu"` and `aria-expanded`.

Menu items are commands. Navigation remains a link even when rendered inside a menu runtime. Destructive actions use `data-tone="danger"` and a clear label; they do not need a separate visual family. Disabled items use native `disabled` where possible or `aria-disabled="true"` with runtime-specific keyboard policy.

The accessible runtime must provide trigger activation, focus entry, Arrow Up/Down, Enter/Space activation, Escape close, focus return and sensible Home/End/typeahead support when offered by the primitive. CSS does not claim to implement this keyboard model. Submenus and checkbox/radio menu items remain evidence-required until repeated ecosystem need justifies their public contract.

## Popover contract

Popover is a non-modal contextual surface. Its anatomy is `ac-popover`, trigger, `ac-popover__content`, optional header/body/actions. It may contain explanatory content, previews, filters or compact forms. It must not silently become a blocking dialog. If the content needs modal focus containment, use Modal/Dialog or a modal Drawer.

The runtime owns anchor positioning, viewport collision, portal choice, Escape/outside dismissal and the focus strategy. A focusable form inside a Popover may receive focus; an informational Popover may keep focus on the trigger. Internal interaction must not close the surface unexpectedly. Selectable options keep Select/Combobox semantics even if their popup is physically positioned like a Popover.

## Tooltip contract

Tooltip is short, supplemental and non-interactive. It appears on pointer hover and keyboard focus, is dismissible by the runtime according to its timing policy, and must not contain buttons, links, inputs or other controls. It never replaces visible text or `aria-label`/`aria-labelledby` on an icon-only control.

The CSS uses `pointer-events: none` for tooltip content deliberately. If a product needs interactive help, use Popover or a documented dialog-like surface instead.

## Drawer/Sheet contract

Drawer is an edge-attached substantial surface. The canonical CSS exposes `ac-drawer-backdrop`, `ac-drawer`, header/body/footer anatomy, `data-side="left|right"` and `data-modal="true|false"`. At narrow widths it becomes a bottom-attached sheet-like surface with a safe max-height and internal scrolling.

The runtime must decide whether the Drawer is modal. A modal Drawer requires backdrop dismissal policy, focus containment, Escape, focus return, inert/scroll-lock handling and an accessible name. A non-modal Drawer must not pretend to trap focus. This distinction is runtime-owned; the CSS does not supply a focus trap.

## Modal boundary

Modal is already canonical and unchanged in Wave 6. Use it for blocking decisions, detail that requires a focused task, or confirmation. Menu is for commands, Popover for contextual content, and Drawer for substantial edge-attached content. Do not use a Modal as a lightweight action list or a Popover as a confirmation that blocks the page.

## Runtime, portals, positioning and layers

Radix, Base UI, Floating UI, Headless UI or another accessible primitive may be used as an implementation detail. No library becomes a mandatory Design System dependency and independent shadcn generators must not become visual authorities. A thin consumer adapter is encouraged when it maps the runtime anatomy to the `ac-*` contract.

Portals are recommended when an overlay would otherwise be clipped by overflow or trapped in a stacking context. The runtime must preserve theme semantic variables across the portal root and account for SSR/hydration. Placement and collision remain runtime responsibilities; the CSS supplies max-widths, safe viewport sizing and placement hooks.

The semantic layer uses a small stack: menu/popover `--layer-menu`/`--layer-popover`, tooltip `--layer-tooltip`, Drawer `--layer-drawer`, Modal `--layer-modal`, and Toast `--layer-toast`. Consumers must not invent a twenty-level z-index scale. A product shell may add a documented browser-level surface only when it genuinely sits outside this interaction stack.

## Dismissal, nesting and responsive rules

Escape closes the active contextual surface and returns focus where that surface owns focus. Selecting a menu command closes the menu. Outside pointer dismissal is normal for Menu and non-modal Popover, but internal clicks and form interaction must remain safe. Tooltip does not take focus. Route changes may close transient contextual surfaces.

Menu inside Modal and Popover inside a Modal are normal compositions when the runtime manages stacking. Nested Popover, Popover inside Menu, multi-level Menu, Context Menu hierarchies, command palettes, mega menus, hover cards with controls and nested Drawers are `EVIDENCE_REQUIRED`; do not create a generic nesting manager.

A desktop Menu or Popover does not automatically become a Drawer on mobile. Use that composition only when the content becomes substantial or the target interaction is difficult to reach at 375px. Menus must wrap long Spanish labels, Popovers must respect viewport width, and Drawers must leave content scrollable without horizontal overflow. Motion is restrained and disappears or becomes static under `prefers-reduced-motion: reduce`; visibility and focus must remain obvious.

## Ecosystem evidence

| Consumer | Evidence | Classification |
| --- | --- | --- |
| `anclora-talent` | Project card/context actions, `<details>` chapter item menu, user menu, preview/editor overlays, local compact action classes | Menu evidence; repeated legacy/product-specific styling; runtime maturity mixed |
| `anclora-command-center` | Global search palette with Escape/focus, centered Modal/ConfirmationDialog, entity detail drawer terminology but modal shell assertions | Modal canonical; command palette and drawer boundary evidence, not yet public canonical |
| `anclora-shiftimport` | Account Menu with `role=menu`, menuitems, click-outside/Escape; mobile navigation Drawer with focus entry/return and Tab cycling | Strong Menu + Drawer runtime evidence; consumer-owned implementation |
| `anclora-tableextractor` | Radix/shadcn overlay files installed; actual app uses Sonner and native/navigation surfaces, no confirmed Menu/Popover runtime use | Library availability only; no promotion from package presence |
| `anclora-private-estates` | Premium menu overlay with nested groups, custom outside click, mobile/full-screen presentation; Radix Context/Dropdown/Popover dependencies present | Menu and responsive surface evidence; custom implementation is compatibility/product-specific |
| `anclora-content-generator-ai` | Custom Topbar dropdown, Global Preferences dialog-like panel with Escape, Base UI Dialog/Select portals | Menu/Popover-like and Modal runtime evidence; Select remains Forms-owned |
| `anclora-filestudio` | Tool panels, job/history surfaces and generated shadcn primitives; no repeated canonical Menu/Popover runtime confirmed | Insufficient for new public primitive |
| `anclora-nexus` | Portal/navigation and preference surfaces; no focused repeated contextual overlay primitive confirmed | Navigation evidence, not generic Menu evidence |

Recurring drift is primarily `UNJUSTIFIED_DRIFT` for duplicated absolute-position menus, arbitrary z-indexes, bare clickable glyphs and generic div command lists. Premium full-screen menu composition, workspace density and mobile navigation are `PRODUCT_SPECIFIC` or `LEGITIMATE DIFFERENCE` when their runtime semantics are preserved. Radix/shadcn presence is `COMPATIBILITY_WORKAROUND`/`RUNTIME_ADAPTER_EVIDENCE`, not proof that the DS should own the dependency.

## Pilot 6 recommendation

Recommended Pilot 6: **`anclora-shiftimport`**, focused on `AppShell` account Menu plus mobile navigation Drawer. It has real Menu semantics, explicit Escape handling, outside dismissal, focus entry/return, Tab cycling, desktop/mobile relevance, existing tests and active operational context. `anclora-private-estates` is the strongest alternative for rich nested menu visual evidence, but its product-specific full-screen presentation and larger copy surface make it a higher-risk first runtime pilot. No Pilot 6 migration is performed in Wave 6.
