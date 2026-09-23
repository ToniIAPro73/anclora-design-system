# Generación del manual y materiales ejecutivos

Esta carpeta contiene la fuente editable del Manual Maestro V1 que antes se mantenía fuera del repositorio. Las páginas HTML de `source/pages/` son la fuente editorial; `source/manual.css` contiene únicamente estilos de impresión; y `source/build.py` ensambla las páginas y genera `source/build/_manual-completo.html`.

La entrega original aporta fuente editorial para las páginas 1–13 y HTML ya generado para las páginas 14–30. El baseline generado se conserva en `source/build/` para reproducir la V1 completa; las páginas 14–30 quedan marcadas como backfill pendiente antes de declarar el manual 100 % regenerable desde fuente.

## Flujo local

Desde la raíz de `anclora-design-system`:

```bash
npm run manual:build
npm run manual:render
npm run manual:pdf
```

El pipeline usa Python y el Playwright ya declarado por este repositorio. Los HTML intermedios y PNG de comprobación viven en `source/build/` y `source/png/`, y quedan fuera del control de versiones. El PDF final se escribe en `docs/release/ANCLORA_MANUAL_V1_ES.pdf`.

Cada ampliación del sistema debe seguir este orden:

1. actualizar contratos ejecutables y documentación canónica del Design System;
2. actualizar la página o páginas correspondientes en `source/pages/`;
3. ejecutar build, render y PDF;
4. revisar los avisos de desbordamiento y comparar el PDF con el material de referencia;
5. actualizar el resumen de adopción si cambia la taxonomía o el censo de consumidores.

## Presentación ejecutiva

`reference/` conserva los PPTX entregados con la V1 como artefactos de referencia. La carpeta adjunta no incluía el archivo fuente editable ni un script de generación de PowerPoint, por lo que esos PPTX no se pueden regenerar de forma determinista todavía. `reference/README.md` deja este límite explícito para evitar tratarlos como fuente de verdad.
