# EditorialWorkspaceStage

## Objetivo

Dar una base compartida para etapas editoriales como `editor`, `preview`, `cover` o `back-cover` sin acoplarlas a una app concreta.

## Anatomia

- `stage_header`
- `stage_actions`
- `stage_body`
- `stage_shell` opcional a dos columnas

## Piezas base

- `ac-workspace-stage`
- `ac-section-heading`
- `ac-surface-panel`
- `ac-preview-overlay` cuando la etapa ocupa pantalla completa

## Casos de uso

- preview y validacion
- diseño de portada
- edición de contraportada
- pasos premium de publicación

## Restricciones

- no mezclar copy específica de producto en la pieza base
- no convertir el shell editorial en un editor concreto
- la diferenciación de dominio debe venir del shell taxonómico y del producto
