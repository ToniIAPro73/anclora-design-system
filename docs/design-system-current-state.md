# Estado actual del sistema de diseño Anclora

Fecha de revisión: 2026-09-23

## Estado actual

Anclora Design System ya funciona como un paquete CSS ejecutable y como contrato machine-readable para agentes. Contiene tokens core y semánticos, foundations, temas por producto, taxonomía de tier/domain/archetype/role/cluster, componentes CSS, patrones compartidos, assets de marca, previews y validaciones automáticas. La V1 está declarada como liberada y se distribuye mediante una referencia Git inmutable.

La Bóveda reconoce el repositorio como fuente transversal de la implementación visual. El inventario de adopción registra consumidores reales, pero la adopción todavía es desigual: existen consumidores sustanciales y consumidores que aún mantienen tokens, componentes o temas locales.

La fuente y el pipeline del Manual Maestro V1 se han incorporado en `docs/manual-builder/`. El flujo integrado ensambla, renderiza y genera un PDF de 30 páginas, y es ahora el único pipeline oficial. El material original incluía fuente editorial HTML para las páginas 1–13 y el HTML ya generado para las páginas 14–30; ese baseline está integrado y versionado para reproducir la V1 completa. La presentación ejecutiva se conserva como PPTX de referencia, sin convertirla en una segunda fuente normativa.

## Cambios incorporados en esta ronda

- Nuevo tier ejecutable `tier-microsaas`.
- Tres tokens y temas iniciales para TableExtract, CleanSheet y PurgeDoc.
- Registro de los tres repos en la Bóveda, con dossiers y clasificación `microsaas`.
- Inventario de adopción actualizado con los tres consumidores.
- Pipeline canónico `manual:build`, `manual:render` y `manual:pdf` dentro del repositorio; el generador PDF anterior basado en Markdown ha sido retirado.
- Manual V1 actualizado en su página de taxonomía para incluir MicroSaaS.

## Qué falta para que sea fuente de verdad completa

1. Migrar cada consumidor frontend al paquete con SHA inmutable y registrar evidencia real de runtime en el inventario. TableExtract, CleanSheet y PurgeDoc están registrados como consumidores previstos, todavía no como adoptantes.
2. Completar la cobertura de componentes y patrones con evidencia de uso independiente. El manifest distingue correctamente piezas estables de piezas que aún necesitan evidencia de consumidor.
3. Formalizar un flujo de cambios gobernado: propuesta en Bóveda, cambio ejecutable en Design System, actualización del manual, validación automatizada y QA visual en consumidores afectados.
4. Reducir la duplicación de tokens locales en los consumidores. Mientras existan bridges documentados o copias locales, el Design System es la autoridad declarada, pero no siempre la autoridad efectiva en runtime.
5. Añadir ejemplos canónicos de MicroSaaS en previews y fixtures de los tres productos, empezando por upload, procesamiento, tablas, estados de confianza, revisión y resultados.
6. Si en el futuro se necesita mantener presentaciones ejecutivas desde código fuente, definir entonces un pipeline independiente para PPTX. No es necesario para que el Design System sea la fuente de verdad ni para generar el manual PDF.

## Veredicto

El sistema ya es una base ejecutable y gobernada, no solo un manual visual. Todavía no es la fuente de verdad efectiva de todo el ecosistema porque la adopción runtime es parcial y aún hay componentes, patrones y ejemplos de MicroSaaS que deben consolidarse con evidencia real de uso. El pipeline del manual PDF ya está integrado, versionado y es reproducible; el PPTX queda correctamente separado como material de referencia.
