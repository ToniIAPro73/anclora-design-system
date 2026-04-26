# Tier Taxonomy And Transformations

Fecha: 2026-04-26
Repositorio: `anclora-design-system`

## Objetivo

Traducir a artefacto ejecutable la taxonomía contractual real del ecosistema Anclora. Este documento no sustituye a la bóveda: resume qué debe implementar este repo para que las apps puedan clasificarse y transformarse sin improvisación local.

## Fuentes contractuales

La copia maestra vive en la bóveda de Obsidian bajo `docs/standards/`:

- `ANCLORA_BRANDING_MASTER_CONTRACT.md`
- `ANCLORA_INTERNAL_APP_CONTRACT.md`
- `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`
- `ANCLORA_PREMIUM_APP_CONTRACT.md`
- `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
- `UI_MOTION_CONTRACT.md`

Regla:
- la bóveda define el contrato
- `anclora-design-system` implementa la capa ejecutable
- las apps consumidoras componen la UI desde esta capa

## Familias de aplicación

### `internal`

Propósito:
- herramientas operativas internas
- lectura rápida
- densidad funcional alta

Firma UX/UI:
- shell operativo claro
- navegación persistente
- menor ceremonialidad
- motion corto y funcional
- formularios y tablas como piezas de primera clase

Implementación obligatoria en el design system:
- taxonomía `tier-internal`
- patterns de shell autenticado, tablas, formularios densos y paneles laterales
- semántica estable para `primary`, `secondary`, `ghost`, `destructive`

### `portfolio`

Propósito:
- portfolio público
- showcase comercial
- captación y credibilidad

Firma UX/UI:
- narrativa editorial
- CTA visible desde el primer viewport
- navegación ligera orientada a scroll
- tema editorial único muy cuidado
- motion emocional, pero sobrio

Implementación obligatoria en el design system:
- taxonomía `tier-portfolio`
- patterns de hero, section layout, gallery, lead form y CTA strip
- superficies claras o marfil cuando la historia lo requiera

### `premium`

Propósito:
- productos públicos o semi-públicos de valor añadido
- confianza, criterio y claridad operativa

Firma UX/UI:
- dark-first o tema editorial diseñado
- identidad más expresiva que `internal`
- profundidad visual moderada
- cards y CTAs premium, sin teatralidad
- dashboards y workspaces con acabado de marca

Implementación obligatoria en el design system:
- taxonomía `tier-premium`
- patterns de landing premium, shell premium, dashboards editoriales y grids de cards
- motion refinado con lift, glow y halo sweep selectivo

### `ultra premium`

Propósito:
- capa más exclusiva del ecosistema
- lujo, control, precisión y confianza

Firma UX/UI:
- composición más ceremonial
- tipografía editorial y materiales más ricos
- layouts media-led y secciones inmersivas
- motion con firma visual más marcada, sin fricción
- overlays, formularios y accesos privados con máxima disciplina

Implementación obligatoria en el design system:
- taxonomía `tier-ultra-premium`
- patterns de hero inmersivo, gallery, overlays y formularios de alto valor
- sweep o shimmer muy medido solo donde añada valor percibido real

## Matriz de diferenciación rápida

| Tier | Ritmo | Densidad | Visual depth | Motion | CTA |
|---|---|---:|---|---|---|
| `internal` | operativo | alta | contenida | corto | utilitario claro |
| `portfolio` | editorial | baja-media | clara | sobrio | conversión inmediata |
| `premium` | marca + operación | media | rica | refinado | dominante, pero contenido |
| `ultra premium` | ceremonial | media | exclusiva | distintivo | firma de alto valor |

## Transformaciones admitidas

El repositorio debe soportar migraciones entre tiers sin rehacer la app desde cero. La transformación nunca se reduce a cambiar colores.

### `internal -> premium`

Cambia:
- mayor intención editorial en hero, headers y cards
- más profundidad de surface
- CTA principal con mayor presencia
- topbar, chips y bloques de resumen con acabado premium

No cambia:
- claridad operativa
- shell base
- semántica de botones
- disciplina de formularios, tablas y modales

### `portfolio -> premium`

Cambia:
- la narrativa pierde protagonismo frente al uso recurrente
- aparecen shells autenticados, estados vacíos y blocks operativos
- se refuerzan tokens de surface, controls y data display

No cambia:
- claridad de valor
- cuidado del copy
- calidad de CTA y credibilidad

### `premium -> ultra premium`

Cambia:
- ritmo más ceremonial
- mayor riqueza tipográfica y material
- mayor control de imagen, overlays y hero
- microinteracción de firma más visible

No cambia:
- claridad del siguiente paso
- disciplina de modales y formularios
- semántica de prioridades

### `portfolio -> ultra premium`

Cambia:
- la narrativa editorial se vuelve más exclusiva y sensorial
- el sistema de media, overlays y hero adquiere rango superior
- el CTA deja de parecer marketing estándar y pasa a sentirse concierge

No cambia:
- foco en conversión
- selector de idioma visible
- claridad legal y de captación

### `external utility -> premium` o `ultra premium`

Para productos externos o aún no integrados en el ecosistema:

1. clasificar dominio, arquetipo, role y cluster
2. asignar tier destino
3. mapear botones, fields, cards y shell contra piezas canónicas
4. adaptar copy, motion y narrativa al contrato del tier
5. validar visualmente en desktop y mobile antes de consolidar

Regla:
- una utilidad externa no se “ancloriza” con una skin
- se reencuadra dentro de la taxonomía real del ecosistema

## Qué debe existir en el repo al cerrar esta fase

- taxonomía visible y documentada para `internal`, `portfolio`, `premium` y `ultra premium`
- preview contractual que muestre la diferencia entre tiers
- criterios de transformación para apps existentes o externas
- validación visual documentada como gate antes de pasar de fase

## Gate de aceptación de esta fase

La fase no está cerrada si:
- la documentación sigue hablando solo de `premium` y `ultra premium`
- `internal` o `portfolio` no quedan claramente diferenciadas
- la preview no permite entender de un vistazo la escalera visual
- no hay instrucción explícita de validación visual en desktop y mobile
