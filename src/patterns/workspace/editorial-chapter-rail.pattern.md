# EditorialChapterRail

## Objetivo

Organizar capítulos o bloques editoriales en un rail lateral con selección, reordenación y acciones compactas.

## Anatomia

- `rail_header`
- `sync_status_action`
- `chapter_item`
- `chapter_actions`
- `chapter_metrics`

## Casos de uso

- organizer de capítulos
- rail de secciones
- rail de bloques narrativos

## Restricciones

- la lógica de movimiento, borrado e importación vive en la app consumidora
- el componente base no debe asumir una acción backend concreta
