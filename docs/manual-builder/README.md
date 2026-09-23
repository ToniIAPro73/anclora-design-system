# Generación del manual y materiales ejecutivos

Esta carpeta contiene la fuente y el pipeline canónico del Manual Maestro V1. Las páginas HTML de `source/pages/` son la fuente editorial disponible; `source/manual.css` contiene los estilos de impresión; y `source/build.py` ensambla el manual completo en `source/build/_manual-completo.html`.

El material recibido incluía páginas editoriales 1–13 y el resultado HTML de las páginas 14–30. Ese resultado ya está integrado como baseline versionado dentro de `source/build/`, por lo que el pipeline puede reproducir el PDF V1 completo. La ausencia de una fuente editorial independiente para esas páginas es una característica del material de origen, no una tarea necesaria para utilizar el pipeline.

## Flujo local

Desde la raíz de `anclora-design-system`:

```bash
npm run manual:build
npm run manual:render
npm run manual:pdf
```

Este es el único pipeline oficial de generación del manual. Usa Python y el Playwright ya declarado por este repositorio. Los HTML intermedios y PNG de comprobación viven en `source/build/` y `source/png/`; el PDF final se escribe en `docs/release/ANCLORA_MANUAL_V1_ES.pdf`.

El generador anterior basado en `docs/release/ANCLORA-DESIGN-SYSTEM-V1-COMPLETE.md` se ha retirado. Ese Markdown se mantiene como referencia contractual de consumo y migración, no como fuente de generación del PDF.

Cada ampliación del sistema debe seguir este orden:

1. actualizar contratos ejecutables y documentación canónica del Design System;
2. actualizar la página o páginas correspondientes en `source/pages/`;
3. ejecutar build, render y PDF;
4. revisar los avisos de desbordamiento y comparar el PDF con el material de referencia;
5. actualizar el resumen de adopción si cambia la taxonomía o el censo de consumidores.

## Presentación ejecutiva

`reference/` conserva los PPTX entregados con la V1 como artefactos de referencia. No se ha creado un generador PPTX porque no forma parte del pipeline del manual PDF ni de la petición actual; los PPTX no son la fuente normativa del sistema.
