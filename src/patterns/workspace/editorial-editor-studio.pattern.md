# Editorial Editor Studio

## Objetivo

Patron canonico para experiencias editoriales avanzadas con:

- toolbar de acciones sobre canvas
- stage central de edicion/render
- inspector lateral de propiedades
- CTA de guardado o render final

## Anatomia

1. `ac-editor-studio`
2. `ac-editor-studio__topbar`
3. `ac-editor-toolbar`
4. `ac-editor-studio__actions`
5. `ac-editor-canvas-stage`
6. `ac-editor-inspector`

## Slots

- `headline`
- `toolbar`
- `save actions`
- `canvas viewport`
- `render preview`
- `inspector controls`

## Cuando usarlo

- editores de portada/contraportada
- editores visuales de piezas premium
- superficies donde hay un lienzo principal y un panel de propiedades

## Cuando no usarlo

- formularios basicos de configuracion
- dashboards operativos sin canvas
- modales ligeros con una sola accion

## Restricciones

- El studio no define controles de negocio especificos.
- Los botones de herramientas deben reutilizar `ac-button`.
- El inspector debe consumir primitives de formulario existentes.
- El canvas puede variar por dominio, pero la estructura shell debe permanecer estable.
