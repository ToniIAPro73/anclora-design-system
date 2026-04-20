# Editorial Chapter Editor Shell

## Objetivo

Patron canonico para edicion de capitulos en fullscreen con:

- header de navegacion y estado
- superficie principal de edicion
- footer de acciones

## Anatomia

1. `ac-editor-shell`
2. `ac-editor-shell__header`
3. `ac-editor-shell__controls`
4. `ac-editor-shell__main`
5. `ac-editor-shell__surface`
6. `ac-editor-shell__footer`

## Restricciones

- La navegacion y el estado son slots; no forman parte de la logica compartida.
- Debe poder alojar editores rich text, canvas o preview paginado.
