# WorkspaceShell

## Objetivo

Definir una base reusable para aplicaciones operativas con navegacion persistente, topbar contextual y modulos de trabajo apilables.

## Anatomia

- sidebar shell
- topbar shell
- region de contenido
- rail o panel secundario opcional

## Slots

- `brand_area`
- `primary_navigation`
- `context_actions`
- `content_header`
- `content_modules`
- `supporting_panel`

## Variantes

- `internal dense`
- `premium operator`
- `executive lite`

## Estados

- loading
- empty
- filtered
- attention-required

## Restricciones

- evitar widgets acoplados a un backend concreto
- la estructura debe funcionar con distintos dominios sin rehacer layout

## Taxonomia sugerida

- `archetype-workspace`
- `role-operator` o `role-executive`
- `cluster-core`
