# Data Table contract

The canonical table contract is CSS-first and semantic-HTML-first. It is a
presentation contract, not a data-fetching, sorting, filtering or pagination
engine.

## Choose the smallest pattern

| Pattern | Use it for | Canonical decision |
| --- | --- | --- |
| Presentational table | Static comparison or reference information | Native `<table>` with `<caption>`, `<thead>`, `<tbody>`, `<th scope>` and `<td>`; use `.ac-data-table` only when the surface needs the shared visual contract. |
| Data Table | Repeated records with stable columns | `.ac-data-table` + `.ac-data-table__scroll` around a native table. |
| Interactive Data Table | Data Table plus sorting, selection, filters, pagination or row actions | Compose the relevant behaviours; the application owns state and data operations. |
| Responsive list | Action-heavy or priority-driven mobile representation | A separate accessible list/card composition may replace the table on mobile; preserve label/value relationships. |
| Data Grid | Spreadsheet-like editing, arrow-key cell navigation, virtualisation, pinning or column resize | Not covered. Mark `DATA_GRID_EVIDENCE_REQUIRED` and keep the implementation product-specific until repeated evidence exists. |
| Product-specific matrix | Schedule grids, comparison matrices or domain visualisations | Keep the domain structure local unless a second materially different consumer validates the same contract. |

Do not classify every `<table>` as a Data Table. Do not use generic `<div>`
grids when the information is genuinely tabular.

## Anatomy

```html
<div class="ac-data-table">
  <div class="ac-data-table__scroll" tabindex="0" aria-label="Operations table">
    <table>
      <caption>Operations</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" aria-sort="ascending">
            <button class="ac-data-table__sort" type="button">
              Updated <span class="ac-data-table__sort-indicator" aria-hidden="true">↑</span>
            </button>
          </th>
          <th scope="col" data-column="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr data-selected="true">
          <th scope="row">Registro</th>
          <td>22 Sep 2026</td>
          <td data-column="actions"><div class="ac-data-table__actions">…</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

The scroll wrapper is the canonical default for a simple table at narrow
widths. It must be keyboard reachable when it is the only way to discover
columns (`tabindex="0"` and an accessible label). Do not force all tables into
cards: operational tables with many columns may remain horizontally scrollable.
For action-heavy tables, a mobile list/card transformation is acceptable only
when every value retains an explicit label and the transformation is documented
for that product.

## Density and alignment

The default density is readable and supports inline controls. Use
`.ac-data-table--compact` only for high-frequency workspace surfaces where the
consumer has evidence that the default row height is too heavy. Compact does
not reduce interactive target size below the shared Button/Forms contracts.

Use `data-align="end"` for numbers, dates or amounts when comparison benefits
from a shared edge. Use `data-align="center"` sparingly for short status or
selection cells. Mark the action column with `data-column="actions"` so its
alignment is predictable.

Long text should wrap when it carries meaning. Truncate only when the full
value remains available through an accessible name, a disclosure, or a
detail view. Do not copy fixed pixel widths from a product into the DS.

## Sorting

Sorting belongs to the application. A sortable header uses a native button
inside the `<th>` and exposes the state on the header with `aria-sort`:
`ascending`, `descending`, `none` or `other` as appropriate. The sort button
must work with keyboard activation. Visual arrows are supplemental and must
not be the only indication of state.

Multi-column sorting is not promoted by this contract; mark it
`EVIDENCE_REQUIRED` until a second materially different consumer needs it.

## Selection and bulk actions

Selection state belongs to the application. Reuse the canonical Forms checkbox
for row selection and select-all; expose an accessible label containing the
row identity. Use `aria-checked="mixed"` for an indeterminate select-all
control where the Forms primitive supports it. Selected rows use
`data-selected="true"` for presentation only.

Bulk actions are a separate composition above or beside the table. Do not add
bulk-action UI to the base `.ac-data-table` contract. Row actions use the
canonical `.ac-button` contract, including `.ac-button--icon` when a compact
icon-only action is genuinely appropriate and has an accessible name.

Do not make every row clickable. Prefer a link for navigation, a textual
Button for an explicit action, or a menu trigger for several actions. If a row
itself is interactive, provide an equivalent keyboard interaction and do not
rely on `<tr onClick>` alone.

## Status, empty, loading and error

- Status cells compose `.ac-status-badge`; map domain states to semantic tones.
  Tables must not create a parallel success/warning/danger palette.
- No data composes `.ac-empty-state` with a clear title and recovery/action
  where useful.
- No results after filtering is a different copy state from no data.
- Loading composes existing Feedback or a product-owned skeleton while
  preserving the table shell when layout stability matters. No table-specific
  spinner is defined here.
- Errors compose shared Alert/Feedback primitives outside the rows. API error
  copy must not be inserted into an arbitrary data row.

## Sticky headers and responsive behaviour

Sticky headers are opt-in with `.ac-data-table--sticky`. The scroll container
must be explicit, the header must have an opaque surface and a suitable z-index,
and focus must remain visible. Sticky columns, column resizing, drag reorder,
virtualisation and nested tree rows are not part of this contract.

The DS default is horizontal overflow for simple tables. A product may choose
a responsive list/card transformation for action-heavy tables when a mobile
audit proves that scrolling is not the clearest task flow. That transformation
is a composition, not a hidden generic mode of the base table.

## Internationalisation and themes

Headers, status labels, actions, empty states and pagination copy are
application-owned and must support Spanish and English. Validate long labels,
not only short English fixtures. The table reuses the canonical surface,
text, border, focus, action and status tokens; it introduces no table palette.

## Prohibited overrides

- Do not build `MegaDataTable`, a generic query/sorting engine or a data-fetching
  wrapper in the Design System.
- Do not create `.table-action-button`, `.row-menu-button` or a parallel
  checkbox/select/input family.
- Do not promote inline spreadsheet editing, virtualisation, pinning, column
  resize or drag reorder without repeated real-consumer evidence.
- Do not turn decorative row dividers into `--border-control`; use
  `--border-subtle` for separators and stronger semantic borders only for
  controls, focus or meaningful state boundaries.
