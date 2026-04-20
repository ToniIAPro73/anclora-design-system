# Quality And Verification

Fecha: 2026-04-20
Repositorio: `anclora-design-system`

## Objetivo

El repo ya tiene suficiente superficie como para necesitar checks automáticos mínimos antes de seguir creciendo.

La prioridad no es montar una infraestructura pesada, sino cubrir los riesgos reales de hoy:

- entrypoints CSS rotos
- export maps desalineados
- manifest inconsistente
- previews/examples con referencias locales rotas
- regressions silenciosas en la capa consumible

## Scripts actuales

`npm run verify:manifest`
- valida `package.json`
- valida `design-system.manifest.json`
- comprueba que todos los entrypoints exportados existen

`npm run verify:html`
- inspecciona `preview/*.html`
- inspecciona `src/examples/**/*.html`
- comprueba imports esperados de CSS
- comprueba referencias locales `href`/`src` rotas

`npm run verify:package`
- ejecuta `npm pack --dry-run`
- valida que el repo siga siendo consumible como paquete

`npm run verify`
- ejecuta todo lo anterior

`npm run quality`
- alias de `verify`

## Lo que cubre hoy

- seguridad estructural del package
- consumo desde apps
- integridad de previews y examples
- detección temprana de roturas de paths o entrypoints

## Señales de validacion funcional

Ademas de `npm run verify`, este repo debe considerarse validado cuando haya consumidores reales que pasen checks utiles sobre piezas canonicas.

Hoy la señal mas fuerte es `anclora-talent` como consumidor premium real:

- adopcion real de taxonomia
- adopcion real de buttons, cards, fields, modal y empty state
- adopcion real de patterns editoriales premium
- tests del consumidor verdes en flujos de workspace, preview, importacion y creacion

Esto no sustituye al versionado ni a los checks del paquete, pero evita confundir “preview bonita” con “sistema listo para consumo”.

## Lo que todavía no cubre

- visual diff automatizado
- accesibilidad automatizada
- screenshots de snapshots
- verificación en navegador real
- wrappers JS/TS

## Siguiente escalón recomendado

Cuando esta base se estabilice, el siguiente paso natural es:

1. generar un índice navegable de previews/examples
2. añadir snapshots visuales ligeros
3. introducir una verificación browser-based mínima sobre 3 o 4 previews críticas
4. registrar una matriz de consumidores validados por primitive/pattern
