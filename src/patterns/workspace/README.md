# Workspace Patterns

Patrones para shells operativos, lectura contextual y flujo continuo de trabajo.

## Incluye

- topbar + sidebar + content shell
- command surfaces
- filtros de contexto
- panels de actividad
- etapas editoriales premium
- flujos editoriales guiados por pasos
- catálogos editoriales de templates
- rails editoriales de capítulos
- estudios editoriales avanzados con canvas e inspector
- barras de control para preview editorial
- suites de exportacion editorial
- shells fullscreen para edicion de capitulos
- superficies rich text editoriales

## Validado en consumo real

Estas piezas ya han sido validadas por `anclora-talent` como consumidor premium editorial de dominio `human_capital`:

- `editorial-workspace-stage`
- `editorial-workflow-shell`
- `editorial-template-catalog`
- `editorial-chapter-rail`
- `editorial-preview-controls`
- `editorial-export-suite`
- `editorial-chapter-editor-shell`
- `editorial-rich-text-editor`

Eso significa:

- ya no deben rehacerse localmente en apps premium que necesiten la misma anatomia base
- las diferencias por dominio deben resolverse con taxonomia, tokens semanticos y contenido
- si una app necesita otra anatomia, debe abrir un nuevo pattern en este repo en vez de bifurcar el existente

## No incluye

- dashboards cerrados a un unico producto
- workflows internos imposibles de generalizar
