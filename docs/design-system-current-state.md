# Estado actual del sistema de diseño Anclora

Fecha de revisión: 2026-09-23

## Estado actual

Anclora Design System ya funciona como un paquete CSS ejecutable y como contrato machine-readable para agentes. Contiene tokens core y semánticos, foundations, temas por producto, taxonomía de tier/domain/archetype/role/cluster, componentes CSS, patrones compartidos, assets de marca, previews y validaciones automáticas. La V1 está declarada como liberada y se distribuye mediante una referencia Git inmutable.

La Bóveda reconoce el repositorio como fuente transversal de la implementación visual. El inventario de adopción registra consumidores reales, pero la adopción todavía es desigual: existen consumidores sustanciales y consumidores que aún mantienen tokens, componentes o temas locales.

La fuente del Manual Maestro V1 se ha incorporado en `docs/manual-builder/`. El flujo integrado puede ensamblar, renderizar y generar un PDF de 30 páginas. La entrega original solo incluía fuente editorial HTML para las páginas 1–13; las páginas 14–30 se conservan como baseline HTML generado. La presentación ejecutiva se conserva como PPTX de referencia, pero la fuente editable o generador original no venían en el material recibido.

## Cambios incorporados en esta ronda

- Nuevo tier ejecutable `tier-microsaas`.
- Tres tokens y temas iniciales para TableExtract, CleanSheet y PurgeDoc.
- Registro de los tres repos en la Bóveda, con dossiers y clasificación `microsaas`.
- Inventario de adopción actualizado con los tres consumidores.
- Pipeline `manual:build`, `manual:render` y `manual:pdf` dentro del repositorio.
- Manual V1 actualizado en su página de taxonomía para incluir MicroSaaS.

## Qué falta para que sea fuente de verdad completa

1. Convertir las páginas 14–30 del baseline generado en fuente editorial HTML, para que toda la V1 sea regenerable sin depender de artefactos heredados.
2. Recuperar o reconstruir la fuente editable de la presentación ejecutiva y añadir un generador reproducible de PPTX. El PPTX actual no debe tratarse como fuente normativa.
3. Migrar cada consumidor frontend al paquete con SHA inmutable y registrar evidencia real de runtime en el inventario. TableExtract, CleanSheet y PurgeDoc están registrados como consumidores previstos, todavía no como adoptantes.
4. Completar la cobertura de componentes y patrones con evidencia de uso independiente. El manifest distingue correctamente piezas estables de piezas que aún necesitan evidencia de consumidor.
5. Formalizar un flujo de cambios gobernado: propuesta en Bóveda, cambio ejecutable en Design System, actualización del manual, validación automatizada y QA visual en consumidores afectados.
6. Reducir la duplicación de tokens locales en los consumidores. Mientras existan bridges documentados o copias locales, el Design System es la autoridad declarada, pero no siempre la autoridad efectiva en runtime.
7. Añadir ejemplos canónicos de MicroSaaS en previews y fixtures de los tres productos, empezando por upload, procesamiento, tablas, estados de confianza, revisión y resultados.

## Veredicto

El sistema ya es una base ejecutable y gobernada, no solo un manual visual. Todavía no es la fuente de verdad efectiva de todo el ecosistema porque la adopción runtime es parcial, el pipeline editorial está incompleto para 17 páginas y la generación de PPTX no es reproducible desde fuente. El siguiente hito de madurez debe ser cerrar esas tres brechas, en ese orden.
