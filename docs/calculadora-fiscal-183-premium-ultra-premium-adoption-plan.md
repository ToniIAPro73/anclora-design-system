# Calculadora Fiscal 183 Premium Ultra Premium Adoption Plan

Fecha: 2026-04-26
Repositorio objetivo: `calculadora-fiscal-183-premium`
Ruta local: `/home/toni/projects/calculadora-fiscal-183-premium`
Repositorio coordinador: `anclora-design-system`

## Objetivo

Diseñar la adopción efectiva de `calculadora-fiscal-183-premium` como stress-test de transformación hacia una app Anclora `ultra premium`.

La meta no es preservar su identidad original.

La meta es comprobar si:

- `anclora-design-system`
- y `ui-ux-pro-max-anclora`

pueden absorber una utility externa y reconducirla hacia una experiencia creíble del ecosistema.

## Regla base

Esta adopción no parte de:

- “mejorar una calculadora premium”

Parte de:

- “reencuadrar una utility externa dentro de la gramática Anclora `ultra premium`”

## Target de llegada

Target contractual:

- `tier-ultra-premium`

Lectura más razonable para esta app adoptada:

- superficie `ultra premium` especializada
- foco en asesoramiento, confianza y pre-evaluación de alto valor
- experiencia más próxima a concierge tool que a calculadora transaccional

## Diagnóstico de partida

Piezas del repo que hoy dominan la experiencia:

- [TaxNomadCalculator.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/pages/TaxNomadCalculator.tsx:1)
- [Header.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/Header.tsx:1)
- [DateRangeSelector.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/DateRangeSelector.tsx:1)
- [SummaryCard.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/SummaryCard.tsx:1)
- [UserDetailsModal.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/UserDetailsModal.tsx:1)
- [PaymentModal.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/PaymentModal.tsx:1)
- [DataAuthoritySection.tsx](/home/toni/projects/calculadora-fiscal-183-premium/src/components/DataAuthoritySection.tsx:1)
- [index.css](/home/toni/projects/calculadora-fiscal-183-premium/src/index.css:1)

Lectura actual:

- shell claro/oscuro de utility premium
- hero de calculadora fiscal
- glassmorphism y acentos verde/índigo
- narrativa de uso directo y checkout

## Resultado esperado tras adopción

La app final debe sentirse como:

- app Anclora
- superficie `ultra premium`
- experiencia de confianza alta
- instrumento de cualificación o pre-evaluación de rango superior

La app final no debe sentirse como:

- tool genérica con skin de lujo
- calculadora SaaS premium estándar
- checkout-first utility

## Entrada obligatoria del design system

La adopción debe comenzar por:

- importar `@anclora/design-system/system.css`

Referencia:

- [docs/consuming-from-apps.md](/home/toni/projects/anclora-design-system/docs/consuming-from-apps.md:1)

## Shell taxonómico sugerido

Como primer experimento de adopción, la app debería vivir bajo un shell con esta lógica:

- `tier-ultra-premium`
- `domain-cross-domain` o dominio contractual equivalente si luego definimos uno más específico
- `archetype-app`
- `role-consumer`
- `cluster-core`
- `product-<target-name>`

Nota:

- el nombre exacto de producto puede decidirse después
- lo importante es que el shell deje de ser local y pase a ser taxonómico

## Mapping de piezas actuales a design system

## 1. Shell principal

Actual:

- layout local en `TaxNomadCalculator.tsx`

Adopción objetivo:

- `workflow shell`
- `surface panel`
- `section heading`
- `stat strip` o `metric card` donde aplique

Fuentes:

- [workflow-shell.css](/home/toni/projects/anclora-design-system/src/components/workflow-shell.css:1)
- [surface-panel.css](/home/toni/projects/anclora-design-system/src/components/surface-panel.css:1)
- [section-heading.css](/home/toni/projects/anclora-design-system/src/components/section-heading.css:1)
- [metric-card.css](/home/toni/projects/anclora-design-system/src/components/metric-card.css:1)

## 2. Header

Actual:

- branding `TaxNomad`
- language toggle local
- theme toggle local

Adopción objetivo:

- topbar Anclora
- `ac-language-switcher`
- `ac-theme-switcher`
- tono institucional/concierge

Fuentes:

- [topbar.css](/home/toni/projects/anclora-design-system/src/components/topbar.css:1)
- [language-switcher.css](/home/toni/projects/anclora-design-system/src/components/language-switcher.css:1)
- [theme-switcher.css](/home/toni/projects/anclora-design-system/src/components/theme-switcher.css:1)

## 3. Selector de fechas y formularios

Actual:

- cards locales con inputs y popovers propios

Adopción objetivo:

- `form-field`
- `surface panel`
- gramática de formularios de alto valor

Fuentes:

- [form-field.css](/home/toni/projects/anclora-design-system/src/components/form-field.css:1)
- [surface-panel.css](/home/toni/projects/anclora-design-system/src/components/surface-panel.css:1)

## 4. Resumen y métricas

Actual:

- `SummaryCard` local con progress y stats

Adopción objetivo:

- `metric card`
- `stat strip`
- summary band de mayor rango visual

Fuentes:

- [metric-card.css](/home/toni/projects/anclora-design-system/src/components/metric-card.css:1)
- [stat-strip.css](/home/toni/projects/anclora-design-system/src/components/stat-strip.css:1)
- [executive-summary-band.pattern.md](/home/toni/projects/anclora-design-system/src/patterns/executive/executive-summary-band.pattern.md:1)

## 5. Modales de datos y pago

Actual:

- `UserDetailsModal`
- `PaymentModal`

Adopción objetivo:

- `ac-modal-backdrop`
- `ac-modal`
- formularios y CTA con disciplina `ultra premium`

Fuentes:

- [modal.css](/home/toni/projects/anclora-design-system/src/components/modal.css:1)
- [form-field.css](/home/toni/projects/anclora-design-system/src/components/form-field.css:1)

## 6. Bloques de autoridad y confianza

Actual:

- `DataAuthoritySection` local

Adopción objetivo:

- paneles de autoridad editorial
- layout de soporte premium
- ritmo más institucional y menos utilitario

Fuentes:

- [surface-panel.css](/home/toni/projects/anclora-design-system/src/components/surface-panel.css:1)
- [premium-hero-split.pattern.md](/home/toni/projects/anclora-design-system/src/patterns/entry/premium-hero-split.pattern.md:1)

## Qué conservar de la app original

Sí conviene conservar:

- lógica de rangos de fechas
- validación de dominio
- generación de PDF
- soporte de idiomas
- soporte de tema
- estructura de rutas simples

No conviene conservar como dominante:

- branding `TaxNomad`
- paleta verde/índigo como voz principal
- glassmorphism genérico como materialidad central
- tono transaccional de calculadora + checkout

## Fases de adopción

## Fase 1. Absorción estructural

Objetivo:

- que la app empiece a hablar el idioma del design system

Tareas:

- importar `system.css`
- introducir shell taxonómico
- sustituir primitives locales por componentes y contracts del sistema
- adaptar toggles de idioma y tema

Gate:

- la app ya no depende de su gramática base previa para sostener el shell

## Fase 2. Reencuadre de producto

Objetivo:

- sacar a la app de la lectura “utility premium genérica”

Tareas:

- replantear hero, summary y authority blocks
- mover el tono hacia acompañamiento y confianza de alto valor
- reducir sensación de checkout-first flow

Gate:

- la app ya parece una superficie Anclora plausible

## Fase 3. Elevación a `ultra premium`

Objetivo:

- consolidar rango, precisión y control

Tareas:

- ajustar materialidad
- revisar jerarquía tipográfica
- endurecer disciplina de modales, CTA y estados críticos
- validar i18n y tema a nivel de rango visual

Gate:

- desktop y mobile sostienen la percepción `ultra premium`

## Fase 4. Refinado con `ui-ux-pro-max-anclora`

Objetivo:

- rematar tensión visual y coherencia final

Solo procede si:

- la estructura ya absorbió el design system
- la identidad ya es Anclora
- el target `ultra premium` ya se percibe de forma creíble

## Checklist de adopción

- usa `system.css`
- vive bajo shell taxonómico
- usa componentes compartidos para shell, forms, panels y modals
- el branding local original deja de dominar
- la experiencia ya no parece una utility genérica
- i18n sigue funcionando
- el theme switch no rompe la jerarquía
- el checkout deja de ser el centro emocional de la app
- la percepción final sube a rango `ultra premium`

## Riesgos principales

## 1. Skin superficial

Riesgo:

- cambiar colores y logo sin cambiar estructura

## 2. Ultra premium teatral

Riesgo:

- añadir lujo visual sin disciplina real en estados críticos

## 3. Persistencia del producto original

Riesgo:

- seguir sintiendo más `TaxNomad` que Anclora

## Veredicto operativo

La adopción es viable como experimento.

No porque la app ya esté cerca de Anclora.

Sino porque:

- tiene base funcional clara
- tiene i18n
- tiene theme
- tiene layout razonablemente ordenado

Eso la convierte en buen banco de pruebas para ver si el sistema puede transformar una utility externa en una superficie `ultra premium` creíble.

## Siguiente paso recomendado

El siguiente paso ya no es más documentación.

Es intervenir sobre el repo consumidor en este orden:

1. absorción estructural del design system
2. recableado del shell y componentes críticos
3. reencuadre visual y narrativo
4. auditoría post-adopción contra:

- [docs/external-ultra-premium-adoption-validation.md](/home/toni/projects/anclora-design-system/docs/external-ultra-premium-adoption-validation.md:1)
