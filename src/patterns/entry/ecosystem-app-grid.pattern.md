# EcosystemAppGrid

## Objetivo

Presentar varias aplicaciones o capacidades del ecosistema con jerarquia clara, taxonomia visible y llamadas a la accion compactas.

## Anatomia

- shell frame
- encabezado de seccion
- grid de tarjetas
- chip taxonomico
- accion primaria o secundaria por tarjeta

## Slots

- `section_eyebrow`
- `section_title`
- `section_body`
- `item_title`
- `item_summary`
- `item_meta`
- `item_action`

## Variantes

- `entry curated`
- `operator shortlist`
- `portfolio showcase`

## Estados

- default
- hover
- focus-visible
- empty
- gated

## Restricciones

- no codificar jerarquia de negocio exclusiva de una app
- no asumir un dataset especifico
- no acoplar estilos a una sola marca de producto

## Taxonomia sugerida

- `cluster-entry`
- `role-guest` o `role-operator`
- `tier-premium`, `tier-ultra-premium` o `tier-portfolio`
