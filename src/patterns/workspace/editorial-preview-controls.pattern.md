# Editorial Preview Controls

## Objetivo

Patron canonico para control bars de preview con:

- cambio de vista
- cambio de dispositivo
- zoom
- paginacion

## Anatomia

1. `ac-preview-control-group`
2. `ac-preview-control-divider`
3. `ac-preview-control-value`
4. `ac-preview-pagination`
5. `ac-preview-page-field`

## Restricciones

- Los controles accionables deben reutilizar `ac-button`.
- No define el motor de preview; solo la capa de control.
- Debe funcionar en overlays o stages de workspace.
