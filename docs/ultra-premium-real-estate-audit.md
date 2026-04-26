# Ultra Premium Real Estate Audit

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Aplicar la matriz del vertical `Real Estate` al núcleo `ultra premium`:

- `Anclora Private Estates`
- `anclora-private-estates-landing`

Documento base:

- [docs/real-estate-profile-criteria-matrix.md](/home/toni/projects/anclora-design-system/docs/real-estate-profile-criteria-matrix.md:1)

## Resumen ejecutivo

Las dos superficies pertenecen claramente a la capa `ultra premium`, pero no juegan el mismo papel y no deben juzgarse con el mismo criterio.

- `Anclora Private Estates` encaja como `ultra premium core platform`
- `anclora-private-estates-landing` encaja como `ultra premium market-entry landing`

Las dos son válidas dentro del vertical.

La diferencia principal no es de calidad aspiracional, sino de misión:

- la app principal debe sostener profundidad, continuidad y experiencia central del vertical
- la landing debe sostener autoridad, captación y deseo sin depender de stock real

También aparece un patrón importante:

- ambas expresan bien el rango ultra premium
- ninguna actúa todavía como consumidor claro de `anclora-design-system`
- el gap más fuerte hoy no parece de identidad, sino de absorción sistémica

## Matriz de evaluación

| Repo | Perfil objetivo | Perfil observado | Estado | Lectura corta |
| --- | --- | --- | --- | --- |
| `Anclora Private Estates` | `ultra premium core platform` | `ultra premium core platform` | `partial-fit` | identidad fuerte y contrato claro, pero aún con capa local dominante y sin absorción canónica |
| `anclora-private-estates-landing` | `ultra premium market-entry landing` | `ultra premium market-entry landing` | `fit` | rol muy bien definido para la etapa de mercado actual y narrativa alineada con el negocio |

## `Anclora Private Estates`

## Veredicto

- `partial-fit`

## Por qué sí encaja en `ultra premium core platform`

Señales fuertes:

- declara explícitamente grupo `Ultra Premium`
- usa la firma tipográfica correcta:
  - `Cardo`
  - `Inter`
  - `Fraunces`
- trabaja con cobertura multidioma amplia:
  - `es`
  - `en`
  - `de`
  - `fr`
- su documentación contractual es muy consciente de:
  - localización
  - modal discipline
  - branding
  - motion
  - diferencia frente a `premium`

Lectura de producto:

- no parece una landing alargada
- intenta sostener navegación, profundidad y experiencia principal del vertical
- el menú overlay, los accesos y la continuidad entre secciones apuntan a una experiencia central, no solo de captación

## Gaps que impiden marcarlo como `fit`

### 1. Absorción sistémica todavía baja

- no consume `@anclora/design-system`
- no usa taxonomía ejecutable visible del sistema
- mantiene primitives y controles locales como capa dominante

Esto no lo descalifica como `ultra premium`, pero sí limita su valor como prueba de sistema compartido.

### 2. Tema y selector aún se sienten locales

- existe `ThemeToggle`
- existe `LanguageToggle`
- pero no parecen apoyarse todavía en una capa común del ecosistema

Para una referencia core del vertical, esto debería tender a converger con una gramática compartida.

### 3. La app principal todavía parece muy anclada en la lógica de landing enriquecida

Por estructura visible:

- `HeroSection`
- `PropertiesSection`
- `InvestmentSection`
- `ValuationSection`
- `InsightsSection`
- `ContactSection`

La app transmite bien marca y narrativa, pero todavía no se percibe del todo como plataforma central madura con múltiples superficies de alto valor.

## Lectura operativa

Hoy `Anclora Private Estates` funciona mejor como:

- centro de identidad del vertical
- referencia estética y contractual de `ultra premium`

que como:

- consumidor ya consolidado del design system
- plataforma totalmente madurada como núcleo multi-superficie del vertical

## Qué habría que reforzar

- absorción real de primitives y patterns del sistema
- convergencia de theme/locale/navigation con una capa canónica
- evolución desde experiencia editorial principal a plataforma central más claramente estructurada

## `anclora-private-estates-landing`

## Veredicto

- `fit`

## Por qué sí encaja en `ultra premium market-entry landing`

La landing responde muy bien a la etapa real del negocio:

- no finge inventario abundante
- no intenta parecer portal tradicional
- no se vende como versión incompleta de algo mayor

En cambio, construye una propuesta pública coherente:

- autoridad
- atracción cualificada
- captación de propietarios
- captación de inversores
- atracción de partners
- conexión visible con `Data Lab` y `Synergi`

## Señales fuertes

### 1. Rol de mercado muy bien delimitado

La estructura confirma el objetivo:

- `HeroSection`
- `CredibilitySection`
- `MallorcaFocusSection`
- `InvestorSection`
- `SellerIntakeSection`
- `PartnersSynergiSection`
- `DataLabSignalsSection`
- `ContactSection`
- `FinalCTASection`

Eso encaja exactamente con una landing de entrada al vertical, no con un portal de stock.

### 2. Narrativa de captación bien distribuida

La landing separa con claridad varias audiencias:

- propietarios
- inversores
- partners

Eso es crucial porque el producto hoy necesita construir pipeline y red, no solo tráfico.

### 3. Selector de idioma bien priorizado

- la app fija `dark`
- el idioma queda como control visible y premium
- no existe dispersión con toggles innecesarios de tema

Eso es coherente con una puerta pública ultra premium más controlada.

### 4. Relación clara con el resto del flywheel

Las secciones dedicadas a:

- `Data Lab`
- `Synergi`

ayudan a convertir la landing en un nodo de credibilidad del ecosistema, no en una home aislada.

## Gaps detectados

### 1. Igual que la app principal, todavía no absorbe el design system como capa canónica

- tokens y helpers siguen siendo locales
- la gramática `pe-*` domina toda la implementación

Esto hoy no rompe el perfil, pero sí limita la consolidación sistémica.

### 2. El rango ultra premium depende mucho de una implementación artesanal local

Eso tiene valor como dirección visual, pero debería terminar reaprovechándose desde `anclora-design-system` para no convertir la landing en excepción permanente.

## Lectura operativa

La landing no debe verse como una solución transitoria menor.

Hoy es probablemente la superficie más correctamente alineada con la realidad de mercado del vertical:

- compensa la falta de pipeline
- proyecta criterio
- abre varias vías de captación
- convierte Data Lab y Synergi en activos visibles de legitimidad

## Diferencia real entre ambas superficies

## `Anclora Private Estates`

Función:

- núcleo de identidad y experiencia del vertical

Riesgo principal:

- quedarse demasiado cerca de una experiencia editorial rica sin terminar de convertirse en plataforma central madura

## `anclora-private-estates-landing`

Función:

- punta de lanza pública del vertical

Riesgo principal:

- quedarse como pieza visual fuerte pero no devolver suficientemente sus primitives y patrones al sistema compartido

## Conclusión del núcleo ultra premium

El vertical ya tiene bien definidos los dos subperfiles principales de `ultra premium`:

- `core platform`
- `market-entry landing`

La buena noticia es que no hay una confusión seria de identidad entre ellos.

La principal deuda no parece conceptual, sino sistémica:

- falta absorción ordenada hacia `anclora-design-system`
- falta convertir los mejores rasgos de ambas superficies en capa compartida reusable

## Implicaciones para la futura skill

`ui-ux-pro-max-anclora` debería ser capaz de distinguir entre estos dos modos:

- refinar una plataforma central ultra premium
- refinar una landing pública ultra premium orientada a captación cualificada

No deberían usar exactamente los mismos pesos de evaluación:

- en `core platform` pesan más navegación, continuidad, overlays, accesos y robustez
- en `market-entry landing` pesan más autoridad, framing, segmentación de audiencias y captación

## Siguiente paso recomendado

Pasar al bloque `premium` del vertical:

- `Anclora Data Lab`
- `Anclora Synergi`

Eso permitirá cerrar el mapa intermedio entre:

- experiencia principal ultra premium
- landing de mercado ultra premium
- soporte analítico premium
- soporte relacional premium
