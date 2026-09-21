# Forms & Inputs contract (Wave 3)

Status: canonical additive contract in `@anclora/design-system` 0.9.0.

## Evidence and scope

The read-only ecosystem audit covered `anclora-talent`, `anclora-command-center`,
`anclora-shiftimport`, `anclora-private-estates`, `anclora-tableextractor` and
`anclora-content-generator-ai`. The common evidence is text entry, native select,
search, validation feedback and disabled/read-only workflow context. ShiftImport
and Command Center also provide real searchable listbox/combobox implementations;
they remain product-owned because their option model, portal positioning and
keyboard behavior are domain-specific. Private Estates and TableExtractor show
checkbox/radio/switch families, but no cross-product API is mature enough to make a
single Combobox implementation canonical in this wave.

Drift classification:

- **Canonicalizable:** label + control + hint/message anatomy, text inputs,
  textarea, native select, search input, focus, invalid, disabled and readonly.
- **Local extension:** product-specific portal comboboxes, option filtering,
  file-upload previews and domain validation copy.
- **Evidence required:** a reusable Combobox API, async options, grouped options,
  date/time pickers and a fully custom checkbox/radio renderer.

## Architecture: Field owns context; Control owns interaction

`ac-form-field` is the context wrapper. It owns the label, optional hint, message,
required marker and the relationship between those nodes and the control. The
control owns value, focus, disabled, readonly and invalid state.

```html
<div class="ac-form-field" data-invalid="true">
  <div class="ac-form-field__head">
    <label class="ac-form-field__label" for="contact-email">
      Email <abbr title="required" aria-hidden="true">*</abbr>
    </label>
    <p class="ac-form-field__hint" id="contact-email-hint">Correo para aprobaciones.</p>
  </div>
  <div class="ac-form-field__control">
    <input id="contact-email" class="field-input" type="email" required
      aria-describedby="contact-email-hint contact-email-error" aria-invalid="true" />
    <p class="ac-form-field__message" id="contact-email-error" data-tone="danger">
      Introduce un correo válido.
    </p>
  </div>
</div>
```

The label remains visible. Required is expressed with `required`/`aria-required`
on the actual control, never by an asterisk alone. Errors use `aria-invalid="true"`
and an `aria-describedby` message. A disabled control is unavailable and should
not be submitted or focused; a readonly text control remains readable, focusable
and submitted. Do not emulate either state with opacity alone.

## Canonical control contract

| Control | Canonical selector/API | Status | Contract |
| --- | --- | --- | --- |
| Input | `.field-input` | canonical | Native `input`; use `type` for email, number, date, password, etc. |
| Textarea | `.field-textarea` | canonical | Native `textarea`; vertical resize is allowed. |
| Select | `.field-select` | canonical | Native `select` when the option set is simple and OS selection is acceptable. |
| Search | `.field-search` + `type="search"` | canonical additive | Search is an input purpose, not a separate popup. Preserve native clear/keyboard behavior. |
| Checkbox | `.ac-choice-control` + `.ac-choice-control__input[type=checkbox]` | canonical additive | Keep the native checkbox and label in the same 44px target. |
| Radio | `.ac-choice-control` + `.ac-choice-control__input[type=radio]` | canonical additive | Group with the same `name`; use `fieldset`/`legend` for the group label. |
| Switch | `.ac-choice-control--switch` + native checkbox | canonical additive | Use only for an immediate binary setting; expose `role="switch"` only when the product behavior needs switch semantics. |
| Combobox | no canonical class yet | evidence-required | Use a product primitive with a real listbox relationship and keyboard model; propose evidence before promoting a shared API. |

All control borders use `--border-control`; semantic error borders use
`--status-danger-border`; focus uses `--focus-ring`. Placeholder copy is a hint,
not a label or required-state explanation. The base target is 48px for text
controls and at least 44px for choice-control targets. Consumers may compose a
layout variant, but must not rewrite the base focus, disabled, invalid or theme
semantics.

## Accessibility, responsive behavior and localization

- Every control has a real `<label>` or an explicit accessible name. A placeholder
  never replaces a label.
- Every error is both visible and programmatically associated. Validation should
  not rely on color alone.
- Focus is visible in both themes and respects `prefers-reduced-motion` through
  the existing tokenized transitions.
- Long labels, hints, errors and translated placeholders wrap naturally. Inline
  fields collapse to one column below 760px.
- Choice controls preserve native semantics. If a custom popup is required,
  `aria-expanded`, `aria-controls`, `aria-activedescendant` and `role=listbox`
  must describe the actual relationship; a visual dropdown alone is insufficient.

## Pilot 3 recommendation

Recommend `anclora-shiftimport` as Pilot 3. It has the richest real forms surface:
import flows, searchable selects, disabled/read-only identity context, warnings,
validation and i18n. `anclora-command-center` is the best smaller control sample
for global search, but its search is intentionally domain-specific. `anclora-talent`
has broad field evidence but is currently paused and would carry more existing
local styling. `anclora-private-estates` and `anclora-tableextractor` are useful
cross-checks for choice controls, while `anclora-content-generator-ai` is a good
follow-up for editorial text areas and localized copy. Pilot 3 should compare the
candidate app's current primitives against this contract before any migration;
this Wave 3 commit does not modify consumers.

## Prohibited patterns

- Do not use placeholder text as the only label.
- Do not hide required/error semantics in color or an asterisk alone.
- Do not replace a native checkbox/radio with a clickable `div` without rebuilding
  keyboard and assistive technology semantics.
- Do not style a consumer control with raw accent colors, local focus rings or
  `--border-default` when the border is the control cue.
- Do not promote a product-specific combobox or date picker to the shared package
  without evidence from at least two materially different consumers.
