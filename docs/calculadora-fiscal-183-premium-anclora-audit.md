# Calculadora Fiscal 183 Premium Anclora Audit

Fecha: 2026-04-26
Repositorio auditado: `calculadora-fiscal-183-premium`
Ruta local: `/home/toni/projects/calculadora-fiscal-183-premium`
Repositorio coordinador: `anclora-design-system`

## Objetivo

Evaluar `calculadora-fiscal-183-premium` como candidato de adopcion al ecosistema Anclora usando `ui-ux-pro-max-anclora`, con especial foco en su posible transformacion hacia una superficie `ultra premium`.

## Resumen ejecutivo

La app actual no encaja todavia como superficie `ultra premium` de Anclora.

Su lectura real hoy es:

- utility premium bien cuidada
- herramienta fiscal directa
- mezcla de calculadora, checkout y generacion de PDF

Su estado frente al objetivo `ultra premium Anclora` es:

- `misaligned` si el objetivo es `ultra premium core platform`
- `partial-fit` si el objetivo futuro fuese una superficie de soporte premium/concierge para clientes de alto valor

En otras palabras:

- hoy no expresa la gramática Anclora
- no expresa el vertical `Real Estate`
- no expresa lujo controlado de rango alto
- pero si contiene una base util y ordenada sobre la que se puede reconstruir una superficie mas alineada

## Metodo de lectura

La auditoria se apoya en:

- [decision-model.md](/home/toni/projects/anclora-design-system/.codex/skills/ui-ux-pro-max-anclora/references/decision-model.md:1)
- [ultra-premium-core-platform.md](/home/toni/projects/anclora-design-system/.codex/skills/ui-ux-pro-max-anclora/references/variants/ultra-premium-core-platform.md:1)
- [premium-analytical.md](/home/toni/projects/anclora-design-system/.codex/skills/ui-ux-pro-max-anclora/references/variants/premium-analytical.md:1)

Y en evidencia del repo:

- [README.md](/home/toni/projects/calculadora-fiscal-183-premium/README.md:1)
- [TaxNomadCalculator.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/pages/TaxNomadCalculator.tsx:1)
- [Header.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/Header.tsx:1)
- [SummaryCard.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/SummaryCard.tsx:1)
- [DataAuthoritySection.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/DataAuthoritySection.tsx:1)
- [PaymentModal.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/PaymentModal.tsx:1)
- [index.css](/home/toni/projects/calculadora-fiscal-183-premium/src/index.css:1)
- [i18nContext.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/contexts/i18nContext.tsx:1)
- [ThemeContext.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/contexts/ThemeContext.tsx:1)

## Perfil actual percibido

La app hoy se siente como:

- calculadora fiscal premium para nómadas digitales
- producto de conversión directa con checkout
- utility refinada con dark/light mode, soporte i18n y lenguaje de confianza legal

No se siente como:

- app Anclora
- producto del vertical `Real Estate`
- superficie `ultra premium`
- experiencia concierge de alto valor

## Fortalezas reales

## 1. Base funcional clara

La app tiene una propuesta entendible y directa:

- introducir rangos de fechas
- calcular días
- entender proximidad al límite
- comprar/generar informe

Eso reduce fricción y le da una unidad de tarea muy clara.

## 2. Soporte de i18n y tema

Tiene ya infraestructura real para:

- varios idiomas
- alternancia de tema

Eso es una fortaleza operativa importante para futuras adopciones.

## 3. Gramática de components razonablemente consistente

Hay cierta disciplina en:

- cards
- modales
- CTA principales
- bloques informativos

No es una UI caótica.

## 4. Señal de confianza

La sección de autoridad y los disclaimers ayudan a sostener:

- credibilidad
- compliance
- venta del PDF como artefacto serio

## Debilidades frente al objetivo Anclora

## 1. No hay adopcion del design system

No aparece evidencia de consumo de `anclora-design-system`.

Consecuencia:

- no hereda taxonomía
- no hereda contratos
- no hereda gramática compartida
- no devuelve aprendizaje al sistema

Esto es un gap estructural, no de acabado.

## 2. Identidad visual no-Anclora

La app se construye alrededor de:

- `TaxNomad`
- paleta verde/índigo
- serif + Geist
- glassmorphism genérico

Eso puede ser agradable, pero no expresa:

- navy estructural Anclora
- oro como acento de rango
- continuidad con `Private Estates`, `Data Lab` o `Synergi`

## 3. El lujo es cosmético, no contractual

Hay señales de “premium look”:

- serif
- cards grandes
- blur
- spacing amplio

Pero no hay todavía:

- tono concierge
- jerarquía editorial de alto rango
- CTA de admisión o acompañamiento
- tensión de marca propia de Anclora `ultra premium`

## 4. El rol de producto no esta alineado con el vertical

Hoy la app es una calculadora fiscal para nómadas.

No se entiende como:

- herramienta para propietarios
- herramienta para inversores
- servicio de inteligencia o advisory dentro del flywheel `Real Estate`
- puerta de entrada al ecosistema Anclora

Esto es crucial.

El mayor gap no es estético.

Es de posicionamiento.

## 5. El modelo de conversion es transaccional

El flujo actual es:

- usar calculadora
- pagar
- descargar informe

Eso se parece mas a:

- SaaS utility pequeña
- lead magnet premium
- micro-producto directo

Que a una experiencia `ultra premium` de acompañamiento selectivo.

## Lectura de fit por perfil

## Contra `ultra premium core platform`

Resultado:

- `misaligned`

Razones:

- no es plataforma principal de vertical
- no tiene navegación ni profundidad de producto de ese tipo
- no expresa ecosistema Anclora
- no sostiene materialidad ni tono de rango ultra premium

## Contra `ultra premium market-entry landing`

Resultado:

- `partial-fit` muy indirecto

Razones:

- si se reencuadrara como asset de captación cualificada, podría servir
- hoy sigue comportándose más como utility pagable que como landing estratégica

## Contra `premium analytical`

Resultado:

- `partial-fit`

Razones:

- comparte rigor y señal de confianza
- pero no presenta inteligencia analítica curada como `Data Lab`
- sigue siendo más calculadora que surface analítica premium

## Clasificacion de gaps

## Gap del design system

- falta un encaje contractual claro para herramientas de advisory/calculator dentro del ecosistema
- si esta clase de superficie va a existir en Anclora, convendria definir su rol

## Gap del repo consumidor

- branding no-Anclora
- narrativa no conectada al vertical
- CTA y posicionamiento de producto demasiado transaccionales
- materialidad mas “premium genérico” que Anclora

## Gap de refinado final

- microcopy
- ritmo de pantalla
- tension visual
- jerarquía de hero, resumen, autoridad y checkout

## Ruta recomendada de transformacion

## 1. No intentar convertirla directamente en `ultra premium core platform`

Eso forzaría un perfil que la app no necesita.

## 2. Reencuadrar primero su rol dentro de Anclora

Las dos rutas más coherentes serían:

- `premium analytical support tool`
- `ultra premium concierge companion`

De las dos, la segunda encaja mejor con tu intención estratégica, pero exige un reposicionamiento fuerte.

## 3. Cambiar la tesis del producto

De:

- “calculadora premium para nómadas”

A algo más cercano a:

- herramienta de pre-evaluación fiscal para compradores e inversores internacionales
- instrumento de cualificación dentro del ecosistema Anclora
- activo de confianza previo a advisory o captación comercial

## 4. Después absorber `anclora-design-system`

Antes del pulido:

- taxonomía
- foundations
- shell
- componentes
- contratos visuales

## 5. Solo al final aplicar `ui-ux-pro-max-anclora`

El refinado tendría sentido cuando:

- el rol del producto ya sea correcto
- la marca ya sea Anclora
- la conversión ya no sea solo checkout directo

## Veredicto

`calculadora-fiscal-183-premium` no debe darse por válida todavía como app `ultra premium` de Anclora.

Hoy su mejor lectura es:

- utility premium útil
- razonablemente ordenada
- pero conceptualmente ajena al ecosistema Anclora

La buena noticia es que no parte de cero.

Tiene:

- una base funcional clara
- i18n
- theme
- componentes consistentes

Lo que necesita no es solo pulido visual.

Necesita:

- reencuadre de rol
- absorción del design system
- y luego refinado guiado por `ui-ux-pro-max-anclora`

## Siguiente paso sugerido

El siguiente paso lógico ya no es más auditoría.

Es definir el perfil objetivo exacto de esta adopción dentro de Anclora:

- si será una superficie `ultra premium concierge`
- o una superficie `premium analytical support`

Solo entonces conviene diseñar la adopción efectiva del repo.
