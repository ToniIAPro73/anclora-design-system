# EditorialWorkflowShell

## Objetivo

Definir una estructura reusable para experiencias premium guiadas por pasos, especialmente en workspaces editoriales.

## Anatomia

- `progress_header`
- `progress_nav`
- `rail_panel`
- `rail_actions`
- `step_content`

## Piezas base

- `ac-workflow-shell`
- `ac-surface-panel`
- `ac-section-heading`
- `ac-button`

## Casos de uso

- onboarding editorial
- creación de publicaciones
- flujos premium de cover, preview y export

## Restricciones

- la shell no debe asumir un número fijo de pasos
- la lógica del paso activo vive en la app consumidora
- el contenido principal debe poder montar modales y canvas complejos sin rehacer el layout base
