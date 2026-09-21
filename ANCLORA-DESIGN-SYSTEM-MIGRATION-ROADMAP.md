# Anclora Design System — Migration Roadmap

Fecha: 2026-09-21. Adopción progresiva, no big-bang. 92% del ecosistema (22/24 apps de producto principal) es hoy `INDEPENDENT` (`ANCLORA-DESIGN-SYSTEM-PRODUCT-MATRIX.md`) — el objetivo de esta hoja de ruta es habilitar adopción real, no decretarla.

## Wave 0 — Estabilización canónica (esta misión, completada)

- Auditoría normalizada, taxonomía, arquitectura objetivo, reconciliación de contratos.
- `.ac-button--compact` (Fase 6) — primera vía sancionada de densidad para P-WKS.
- Manifest legible por agentes.
- **Salida:** el DS tiene ahora una respuesta clara y verificada a "qué existe, qué está validado, qué perfil aplica, qué está prohibido" — condición previa para pedir a cualquier equipo/agente que lo adopte con confianza.

## Wave 1 — Pilotos (siguiente, no ejecutada en esta misión)

**Criterios de selección (no "el que ya se parece más al objetivo"):** cobertura representativa de componentes, desarrollo activo, requisitos reales de tema/layout, riesgo manejable, capacidad de validar tanto Core como comportamiento de perfil.

- **Piloto 1 — `anclora-talent` (P-WKS).** Ya es `CONSUMER` real, con desarrollo activo confirmado (Fase 2.5), cobertura de componentes más profunda del ecosistema (15+ piezas `canonical`), y es el propio origen del gap que Wave 0 resolvió (`.dashboard-button` → `.ac-button--compact`). Migrarlo primero valida la nueva variante contra su caso de uso real de origen antes de pedir a nadie más que la adopte.
- **Piloto 2 — `anclora-command-center` (P-WKS).** Segundo `CONSUMER` real, con la integración más limpia (wrappers React finos, sin fork de valor confirmado en Fase 2.5) — sirve como el caso de "adopción de referencia" a documentar para nuevos consumidores, en paralelo al piloto de migración de talent.

No se selecciona un piloto de P-MKT en esta ola — ningún repo de marketing/landing tiene hoy ninguna relación con el DS; antes de pedir una migración ahí hace falta que Shared Patterns de entrada (`premium-hero-split`, `ecosystem-app-grid`, ya `candidate` en `validated-consumers-matrix.md`) tengan al menos un consumidor real, lo cual es en sí mismo el objetivo de Wave 1 para ese perfil en una iteración posterior.

## Wave 2 — Adopción de tokens/tema

Una vez validados los pilotos: ofrecer el contrato de tema único (`data-theme`, Fase 4 §4) como adopción de bajo riesgo para los repos `INDEPENDENT` que ya tienen theming real pero fragmentado (`anclora-groundsync`, `anclora-guesthub`, `anclora-private-estates`, `anclora-data-lab`, `anclora-synergi`, `anclora-shiftimport` — todos con `data-theme`/mecanismo propio funcional, migración de contrato sin rediseño visual). Los 3 casos de "tema fantasma" (`anclora-portfolio`, `anclora-visionflow`, `anclora-linguo-cam` — configurado pero nunca invocado) son candidatos de limpieza más que de migración: o se activa correctamente o se retira la dependencia muerta, independientemente de si adoptan el DS.

## Wave 3 — Adopción de componentes Core

Priorizar los repos P-WKS con mayor densidad de componentes reimplementados de forma equivalente a los ya `canonical` del DS (`dataTable`, `statusBadge`, `emptyState`, `modal`, `button`): `anclora-nexus`, `anclora-filestudio`, `anclora-shiftimport`, `anclora-guesthub` — los cuatro con mayor conteo de componentes propios (47-110 archivos) y arquetipo P-WKS confirmado.

## Wave 4 — Shared Patterns

Una vez ≥2 apps reales usen el mismo Core Component en el mismo contexto compositivo, formalizar como Shared Pattern (regla de absorción, Fase 4 §Absorption Rule) — candidatos ya identificados: patrón conversacional (`advisor-ai` + un segundo consumidor futuro), patrón real-time/call UI (`linguo-cam` + un segundo consumidor futuro).

## Wave 5 — Limpieza de legado

- Retirar mecanismos de tema muertos (3 repos identificados arriba).
- Resolver el anti-patrón ya documentado en el propio código de `anclora-shiftimport` (`.auth-submit` vs. `.btn-gold`).
- Revisar si `anclora-fiscal` migra hacia el DS central (decisión diferida, no de esta misión) una vez su capa de compatibilidad esté definida.

## Cambios disruptivos (breaking changes)

Ninguno en Wave 0. Cualquier cambio disruptivo futuro (p. ej., si se decide que el valor de `--danger` del DS debe cambiar para alinearse con vault, R2 de la matriz de reconciliación) se versiona como minor con nota de migración explícita si es solo de valor, o major si cambia la anatomía/API de un componente — nunca se aplica automáticamente a un repo consumidor.
