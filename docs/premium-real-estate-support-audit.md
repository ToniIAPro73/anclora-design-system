# Premium Real Estate Support Audit

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Aplicar la matriz del vertical `Real Estate` al bloque de soporte `premium`:

- `Anclora Data Lab`
- `Anclora Synergi`

Documento base:

- [docs/real-estate-profile-criteria-matrix.md](/home/toni/projects/anclora-design-system/docs/real-estate-profile-criteria-matrix.md:1)

## Resumen ejecutivo

El bloque `premium` del vertical está mucho mejor definido de lo que podría parecer a primera vista.

- `Anclora Data Lab` encaja claramente como `premium analytical`
- `Anclora Synergi` encaja claramente como `premium relational`

No parecen dos variantes confusas de la misma app, sino dos superficies con misión distinta y coherente dentro del flywheel del vertical.

La deuda principal vuelve a ser sistémica:

- ambas superficies expresan bien su rol
- ambas siguen resolviendo esa calidad con gramáticas locales
- ninguna aporta todavía validación fuerte de adopción canónica desde `anclora-design-system`

## Matriz de evaluación

| Repo | Perfil objetivo | Perfil observado | Estado | Lectura corta |
| --- | --- | --- | --- | --- |
| `Anclora Data Lab` | `premium analytical` | `premium analytical` | `fit` | plataforma de señal y lectura con gramática premium analítica bien definida |
| `Anclora Synergi` | `premium relational` | `premium relational` | `fit` | portal de partnership y admisión con tono premium relacional claro |

## `Anclora Data Lab`

## Veredicto

- `fit`

## Por qué encaja en `premium analytical`

Señales fuertes:

- se define explícitamente como aplicación de inteligencia y activos analíticos para `Anclora Private Estates`
- rechaza en su propia documentación parecer un dashboard genérico
- mezcla bien:
  - landing pública
  - solicitud de acceso
  - login privado
  - revisión interna
  - workspace de señal

Lectura UX/UI:

- el workspace gira en torno a señales, zonas, documentación curada y packs
- la experiencia transmite lectura, filtro y criterio
- el shell premium no compite con la comprensión de la señal
- los toggles de idioma y tema están integrados como controles visibles del producto

## Evidencia de ajuste

En `DataLabWorkspaceShell` aparecen con claridad las piezas que sostienen el perfil:

- `Radar ejecutivo`
- `Foco territorial`
- `Activos documentales`
- `Packs activos`
- `Alertas`
- `Arquitectura`

Eso es coherente con una superficie analítica premium:

- no parece CRM interno
- no parece landing comercial
- no parece BI masivo

## Riesgos o gaps

### 1. Absorción sistémica baja

- no consume `@anclora/design-system`
- no usa taxonomía compartida visible
- los toggles, cards, shell y paneles siguen en gramática `datalab-*`

### 2. Riesgo de consolidación local

Hay buenas decisiones de:

- shell
- métricas
- paneles
- toggles
- jerarquía

pero todavía viven como solución local, no como aprendizaje devuelto al sistema.

## Lectura operativa

`Anclora Data Lab` ya sirve muy bien como referencia conceptual y visual de `premium analytical`.

Lo que falta no es redefinir su identidad, sino:

- absorber mejor su gramática al design system
- convertir sus mejores piezas en artefactos compartidos

## `Anclora Synergi`

## Veredicto

- `fit`

## Por qué encaja en `premium relational`

Señales fuertes:

- se define explícitamente como aplicación de partners del ecosistema
- cubre el ciclo completo de:
  - admisión
  - activación
  - acceso
  - operación partner

Lectura UX/UI:

- la home pública mezcla admisión y acceso sin parecer formulario aislado
- el tono es premium, pero enfocado a relación y curación
- la experiencia transmite que entrar requiere criterio y aprobación
- los accesos privados y paneles de revisión continúan la misma lógica de control y filtro

## Evidencia de ajuste

La estructura del repo confirma muy bien el rol:

- `SynergiPortalPage`
- `PartnerAdmissionsLoginPage`
- `PartnerAdmissionsReviewPage`
- `PartnerObservabilityDashboard`
- `SynergiWorkspacePage`
- `PartnerAssetsConsole`
- `PartnerOperationsConsole`

Eso encaja con una superficie relacional premium porque:

- no se limita a captar leads
- no cae en admin puro
- convierte el partnership en flujo y relación trazable

## Riesgos o gaps

### 1. Absorción sistémica baja

- no consume `@anclora/design-system`
- no usa taxonomía compartida visible
- idioma, tema, topbar, forms y paneles siguen resolviéndose como gramática `synergi-*`

### 2. Riesgo de desplazamiento hacia portal administrativo

La propia documentación del repo ya detecta ese riesgo:

- no convertir el workspace en un CRM pesado
- no exponer demasiada operativa interna
- no romper la jerarquía premium de la UI

Esto indica que el perfil está bien entendido, pero necesita vigilancia para no caer en una deriva más interna que relacional.

## Lectura operativa

`Anclora Synergi` ya sirve como buena referencia de `premium relational`.

Lo más importante aquí es proteger su carácter:

- colaboración curada
- admisión seria
- continuidad de relación

y evitar que el crecimiento funcional lo arrastre hacia un backoffice disfrazado.

## Diferencia real entre `Data Lab` y `Synergi`

## `Anclora Data Lab`

Centro de gravedad:

- señal
- lectura
- contexto
- activos premium

Riesgo principal:

- deslizarse hacia dashboard demasiado interno o demasiado decorativo

## `Anclora Synergi`

Centro de gravedad:

- partnership
- admisión
- continuidad operativa de la red

Riesgo principal:

- deslizarse hacia portal administrativo o CRM parcial

## Conclusión del bloque premium

El vertical `Real Estate` ya tiene bien delimitadas sus dos capas premium de apoyo:

- una analítica
- una relacional

La buena noticia es que no se pisan ni se confunden.

La deuda principal sigue siendo la misma que en el bloque ultra premium:

- falta transformar estas decisiones en sistema compartido
- falta absorber patterns y primitives hacia `anclora-design-system`

## Implicaciones para la futura skill

`ui-ux-pro-max-anclora` debería tratar estos dos perfiles como distintos:

- `premium analytical`
- `premium relational`

No deberían auditarse con el mismo peso:

- en `analytical` pesan más señal, jerarquía de datos y claridad
- en `relational` pesan más confianza, admisión, filtro y coherencia público/privado

## Mapa ya consolidado del vertical

Con esta auditoría, el mapa principal del vertical queda así:

- `Anclora Private Estates`
  - `ultra premium core platform`

- `anclora-private-estates-landing`
  - `ultra premium market-entry landing`

- `Anclora Data Lab`
  - `premium analytical`

- `Anclora Synergi`
  - `premium relational`

- `Anclora Nexus`
  - pendiente de auditoría formal como `internal operational`

## Siguiente paso recomendado

Auditar `Anclora Nexus` como capa `internal operational`.

Eso cerrará el perímetro del vertical y permitirá:

- definir con mucha más precisión `ui-ux-pro-max-anclora`
- y evaluar futuras adopciones externas contra un mapa ya completo
