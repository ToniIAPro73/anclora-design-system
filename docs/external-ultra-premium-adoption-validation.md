# External Ultra Premium Adoption Validation

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Definir cómo validar una adopción de un repo externo y ajeno al ecosistema Anclora cuando el target final es `ultra premium`.

Este documento no evalúa el producto original por su rol previo.

Evalúa la calidad de la transformación.

## Caso de referencia

Caso actual:

- `calculadora-fiscal-183-premium`

Lectura correcta:

- repo externo
- no-Anclora de origen
- usado como stress-test de adopción
- target de llegada: `Anclora ultra premium`

## Regla base

En una adopción externa:

- el punto de partida puede estar completamente fuera de contrato
- eso no penaliza por sí solo
- lo que importa es cuánto logra absorberse y transformarse

La pregunta no es:

- “¿esta app era ya ultra premium?”

La pregunta correcta es:

- “¿después de la adopción, parece de verdad una app Anclora ultra premium?”

## Qué valida esta auditoría

La auditoría post-adopción debe medir cinco cosas:

1. absorción del design system
2. ajuste al perfil objetivo
3. calidad de ejecución UI/UX
4. coherencia de marca Anclora
5. necesidad residual de refinado

## Estados de resultado

## `adoption-success`

La app ya parece una superficie Anclora `ultra premium`.

Puede necesitar mejoras menores, pero la transformación estructural ya está conseguida.

## `adoption-partial-success`

La app absorbe partes importantes del sistema y mejora mucho, pero todavía arrastra gramática previa, gaps estructurales o señales de perfil incompleto.

## `adoption-failed`

La app sigue sintiéndose principalmente externa o ajena a Anclora, aunque haya recibido tokens, estilos o componentes.

## Plano 1. Absorción del design system

Preguntas:

- usa taxonomía de `anclora-design-system`
- consume foundations reales
- consume componentes y patterns compartidos
- reemplaza gramática local previa por gramática Anclora

Señales positivas:

- las decisiones principales ya no parecen locales o improvisadas
- el repo empieza a hablar el idioma del sistema

Señales negativas:

- solo cambia colores y tipografías
- sigue resolviendo estructura, shell y jerarquía con lógica previa

## Plano 2. Ajuste al perfil `ultra premium`

Para este caso, el target es:

- `ultra premium`

La app adoptada debe transmitir:

- precisión
- rango alto
- control
- exclusividad medida
- experiencia cuidada en estados críticos

No basta con:

- oro
- blur
- serif
- hero vistoso

## Plano 3. Calidad de ejecución

La adopción debe aguantar:

- desktop
- mobile
- i18n
- tema
- formularios
- overlays
- navegación
- CTA

Preguntas:

- la experiencia se mantiene consistente bajo uso real
- los modales y formularios están a la altura del rango prometido
- la jerarquía visual está controlada de principio a fin

## Plano 4. Coherencia de marca Anclora

La app final debe sentirse parte del ecosistema.

Eso implica:

- continuidad con `anclora-design-system`
- compatibilidad tonal con `Private Estates`, `Data Lab`, `Synergi` y futuras superficies
- desaparición de la identidad visual dominante del producto original

Señal clave:

- si la app sigue “oliendo” a su origen más que a Anclora, la adopción no está cerrada

## Plano 5. Necesidad residual de refinado

Después de la absorción, hay que decidir qué queda:

## Si queda deuda estructural

Hay que corregir:

- en `anclora-design-system`
- o en el repo adoptado

## Si solo queda deuda de acabado

Entonces sí procede:

- `ui-ux-pro-max-anclora`

## Regla de responsabilidad

## Gap del design system

Cuando:

- la transformación falla porque faltan primitives o patterns compartidos

## Gap del repo adoptado

Cuando:

- el sistema existe pero la app sigue arrastrando estructura o lenguaje local

## Gap de refinado final

Cuando:

- la estructura ya es correcta
- solo falta elevar acabado, ritmo y tensión visual

## Checklist de éxito

Una adopción externa hacia `ultra premium` debería aprobar esto:

- la app consume el design system de forma estructural, no cosmética
- la identidad previa deja de dominar la experiencia
- la app parece creíble dentro del ecosistema Anclora
- la jerarquía ya no recuerda a la app original
- la navegación y los estados críticos se sienten de alto rango
- los formularios, modales y CTA sostienen percepción `ultra premium`
- i18n y tema no rompen el nivel visual
- los gaps restantes son menores o claramente clasificables

## Anti-patrones

La adopción no debe darse por buena si:

- solo cambian colores y logos
- la app original sigue siendo reconocible como gramática dominante
- se fuerza una capa premium superficial encima de una estructura incompatible
- el refinado intenta esconder una mala absorción

## Secuencia recomendada

1. adoptar el repo sobre `anclora-design-system`
2. auditar el resultado contra este documento
3. clasificar gaps
4. corregir sistema o repo si hace falta
5. aplicar `ui-ux-pro-max-anclora` solo como remate

## Aplicación al caso actual

Para `calculadora-fiscal-183-premium`, la lectura correcta desde ahora es:

- repo externo
- stress-test de adopción
- target contractual: `Anclora ultra premium`

Por tanto, su auditoría final no debe preguntar:

- “¿qué era antes?”

Sino:

- “¿qué consigue ser después?”
