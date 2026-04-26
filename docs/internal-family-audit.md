# Internal Family Audit

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Auditar de extremo a extremo la familia `internal` del ecosistema Anclora usando:

- [docs/internal-family-operating-model.md](/home/toni/projects/anclora-design-system/docs/internal-family-operating-model.md:1)
- [docs/internal-profile-criteria-matrix.md](/home/toni/projects/anclora-design-system/docs/internal-profile-criteria-matrix.md:1)

Repos auditados o revisados:

- `Anclora Nexus`
- `Anclora Content Generator AI`
- `Anclora Advisor AI`
- `Anclora Group`
- `Anclora Command Center` a través de `Boveda-Anclora/dashboard`

## Resumen ejecutivo

La familia `internal` ya muestra suficiente madurez como para dividirse con claridad en subperfiles distintos.

Resultado general:

- `Anclora Nexus` encaja como `internal operational vertical`
- `Anclora Content Generator AI` encaja como `internal production studio`
- `Anclora Advisor AI` encaja como `internal expert assistant workspace`
- `Anclora Group` encaja como `internal ecosystem gateway`
- `Anclora Command Center` encaja como `internal executive orchestration`

Patrón transversal:

- la identidad funcional de casi todos los repos está bastante bien resuelta
- la deuda común vuelve a ser la misma que en otros bloques del ecosistema:
  - baja absorción de `anclora-design-system`
  - gramáticas locales fuertes por repo

## Matriz de evaluación

| Repo | Perfil objetivo | Perfil observado | Estado | Lectura corta |
| --- | --- | --- | --- | --- |
| `Anclora Nexus` | `internal operational vertical` | `internal operational vertical` | `fit` | operación de vertical con shell, módulos y densidad útil bien marcados |
| `Anclora Content Generator AI` | `internal production studio` | `internal production studio` | `fit` | estudio editorial interno con foco real en producción, revisión y workspace |
| `Anclora Advisor AI` | `internal expert assistant workspace` | `internal expert assistant workspace` | `fit` | asistencia experta bien perfilada, con consulta, contexto y módulos especializados |
| `Anclora Command Center` | `internal executive orchestration` | `internal executive orchestration` | `fit` | capa ejecutiva de KPIs, coste, alertas y tendencia integrada hoy en `Anclora Nexus` |
| `Anclora Group` | `internal ecosystem gateway` | `internal ecosystem gateway` | `fit` | puerta corporativa coherente, más institucional que un simple launcher |

## `Anclora Nexus`

## Veredicto

- `fit`

## Por qué encaja en `internal operational vertical`

Señales fuertes:

- se declara explícitamente como workspace operativo interno
- usa `dark` operativo y varios idiomas
- tiene shell por rol y navegación persistente
- la estructura del dashboard responde a operación vertical real:
  - `leads`
  - `properties`
  - `tasks`
  - `team`
  - `prospection`
  - `partner-network`
  - `data-lab-access`
  - `source-observatory`

Lectura UX/UI:

- la sidebar está organizada por bloques de trabajo:
  - `core`
  - `intelligence`
  - `operations`
- el header prioriza búsqueda, notificaciones, idioma, moneda, unidad y usuario
- la superficie parece herramienta de trabajo, no pantalla pública premium

## Riesgos o gaps

### 1. Mezcla de riqueza visual con operación

El repo usa una estética oscura con acentos dorados y cierta elevación visual.
Eso no rompe el perfil, pero requiere cuidado para que la identidad no empuje la UX hacia una teatralidad innecesaria.

### 2. Absorción sistémica baja

- no consume `@anclora/design-system`
- no expone taxonomía compartida visible
- shell, inputs y navegación viven en gramática propia

## Lectura operativa

`Nexus` ya funciona como referencia de:

- operación de vertical
- densidad útil
- navegación interna persistente

No parece:

- launcher
- estudio editorial
- superficie ejecutiva

## `Anclora Content Generator AI`

## Veredicto

- `fit`

## Por qué encaja en `internal production studio`

Señales fuertes:

- se define como motor editorial y de inteligencia de contenido
- el propio README insiste en:
  - shell de dashboard
  - studio
  - knowledge base
  - métricas
  - rutas de generación e ingesta
- hay una regla operativa explícita de no permitir scroll global en `/dashboard/*`

Lectura UX/UI:

- el `Shell` está pensado como entorno de trabajo de larga duración
- el `Topbar` trata el producto como “Brand Authority Engine”
- la pantalla `studio` expone claramente:
  - prompts
  - templates
  - micro-zonas
  - audiencia
  - objetivo
  - generación
  - scheduling
  - contenido generado

Eso encaja muy bien con un estudio de producción, no con un dashboard genérico.

## Riesgos o gaps

### 1. Puede derivar hacia dashboard si la chrome gana demasiado peso

Hoy la intención de estudio es clara, pero habrá que vigilar que futuras capas de métricas o automatización no oculten el corazón productivo.

### 2. Absorción sistémica baja

- no consume `@anclora/design-system`
- usa su propia gramática basada en `shadcn/ui` y piezas locales

## Lectura operativa

`Content Generator AI` ya sirve bien como referencia de `internal production studio`.

Su fortaleza principal es que el espacio de trabajo pertenece a la producción.

No parece:

- portal corporativo
- dashboard operativo de vertical
- chat genérico

## `Anclora Advisor AI`

## Veredicto

- `fit`

## Por qué encaja en `internal expert assistant workspace`

Señales fuertes:

- la propuesta está centrada en asesoría fiscal, laboral y de mercado
- hay un eje claro de consulta y guidance
- el topbar traduce muy bien el producto por dominio:
  - `Asesoría RAG`
  - `Control Fiscal`
  - `Monitor Laboral`
  - `Facturación Inteligente`
  - `Centro de Alertas`
  - `Admin RAG`

Lectura UX/UI:

- el producto gira en torno a consulta, contexto y respuesta experta
- la página de chat prioriza:
  - conversación
  - historial
  - fuentes
  - alertas
- existen workspaces especializados, pero siguen orbitando la ayuda experta, no la producción o la pura operación

## Riesgos o gaps

### 1. Riesgo de dispersión en demasiados workspaces paralelos

El repo tiene:

- fiscal
- laboral
- facturación
- alertas
- admin knowledge
- chat

Eso puede enriquecer la herramienta, pero también corre el riesgo de diluir la sensación de “asistente experto” si cada área acaba comportándose como miniapp aislada.

### 2. Absorción sistémica baja

- no consume `@anclora/design-system`
- mantiene tokens, toggles y panels en gramática local `advisor-*`

## Lectura operativa

`Advisor AI` no parece:

- chat SaaS genérico
- dashboard interno puro
- estudio editorial

Su identidad central como espacio de asistencia experta está bien marcada.

## `Anclora Group`

## Veredicto

- `fit`

## Por qué encaja en `internal ecosystem gateway`

Señales fuertes:

- se define como entidad matriz y portal corporativo
- el login y workspace responden a control por rol
- la shell principal organiza el ecosistema por capas:
  - `Capa de entrada`
  - `Capa operativa`
  - `Capa de activación`

Lectura UX/UI:

- no es un launcher plano de enlaces
- intenta ordenar y explicar el conjunto del ecosistema
- la `GroupWorkspaceShell` transmite:
  - marca corporativa
  - usuario y rol
  - apps habilitadas
  - arquitectura del ecosistema

Eso encaja muy bien con un gateway corporativo.

## Riesgos o gaps

### 1. Riesgo de quedarse demasiado cerca del launcher

Aunque hoy supera el nivel de simple listado, todavía necesita mantener una capa institucional fuerte para no degradarse a “portal de accesos”.

### 2. Dependencia de repos externos no presentes

El mapa del ecosistema incluye piezas como `command-center` por URL, pero no todas están disponibles localmente para validación integrada aquí.

### 3. Absorción sistémica baja

- no consume `@anclora/design-system`
- la gramática `group-*` sigue siendo local

## Lectura operativa

`Anclora Group` ya cumple bien como puerta del ecosistema:

- ordena
- presenta
- enruta
- explica capas del grupo

No parece:

- dashboard de trabajo
- superficie premium de vertical
- launcher trivial

## `Anclora Command Center`

## Veredicto

- `fit`

## Base auditada

Aunque no aparece como repo independiente en `/home/toni/projects`, sí existe una implementación canónica clara en:

- `/mnt/c/Users/antonio.ballesterosa/Desktop/Proyectos/Boveda-Anclora/dashboard`

Además, `Nexus` mantiene una superficie integrada relacionada:

- `frontend/src/app/(dashboard)/command-center/page.tsx`
- `frontend/src/lib/command-center-api.ts`
- especificación en `sdd/features/finops-and-commercial-command-center/`

## Por qué encaja en `internal executive orchestration`

Señales fuertes:

- `dashboard/README.md` lo define como la app canónica `anclora-command-center` dentro de la bóveda
- la shell del dashboard soporta:
  - idioma
  - tema
  - navegación entre vistas `executive` y `real-estate`
- el objetivo declarado es combinar:
  - coste
  - productividad
  - conversión comercial
  - alertas operativas
  - tendencias
- la propia spec lo define como capa ejecutiva única de salud cloud y negocio

Lectura UX/UI:

- la pantalla prioriza snapshot, KPIs, estado presupuestario y señales críticas
- no entra en micro-operativa innecesaria
- organiza la lectura en bloques ejecutivos:
  - KPIs comerciales
  - KPIs de productividad
  - salud operativa
  - pipeline
  - alerts
  - trends

Eso encaja bien con una superficie de mando y síntesis.

## Riesgos o gaps

### 1. Conviven dos superficies del mismo concepto

La implementación en bóveda confirma que `Command Center` tiene identidad propia.

Al mismo tiempo, `Nexus` mantiene una versión integrada.

Eso obliga a vigilar:

- coherencia de gramática
- alineación de KPIs y señales
- no duplicar decisiones UX divergentes

### 2. Riesgo de deslizarse a dashboard analítico clásico

La base actual es sólida, pero el perfil exige vigilar que:

- la densidad no crezca sin síntesis
- la pantalla no se convierta en agregador de métricas sin foco ejecutivo

## Conclusiones globales de la familia `internal`

## 1. La segmentación propuesta se sostiene bien

La familia `internal` no parece una taxonomía artificial.

Los repos revisados sí se agrupan de forma natural en:

- operación vertical
- estudio de producción
- asistencia experta
- gateway corporativo

## 2. No hay una confusión fuerte de identidad entre repos

Eso es una buena señal:

- `Nexus` no parece `Content Generator`
- `Content Generator` no parece `Advisor`
- `Advisor` no parece `Group`

## 3. La deuda dominante es sistémica, no conceptual

Se repite el patrón visto en otras familias:

- buenos perfiles locales
- baja adopción del design system compartido
- primitives, shells y toggles todavía demasiado específicos por repo

## Implicaciones para la futura skill

`ui-ux-pro-max-anclora` debería soportar ya estos perfiles internos:

- `internal operational vertical`
- `internal production studio`
- `internal expert assistant workspace`
- `internal executive orchestration`
- `internal ecosystem gateway`

## Siguiente paso recomendado

Con la familia `internal` ya auditada de extremo a extremo en lo accesible desde este workspace, el siguiente paso natural es:

1. usar todas las auditorías ya hechas para redactar la definición operativa de `ui-ux-pro-max-anclora`
2. después aplicar esa definición al caso de adopción `calculadora-fiscal-183-premium`
