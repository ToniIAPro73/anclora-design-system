# Repo Profile Audit Framework

Fecha: 2026-04-26
Repositorio: `anclora-design-system`

## Objetivo

Definir el marco con el que `anclora-design-system` debe estudiar los repos del ecosistema para:

- extraer la esencia real de cada familia de aplicación
- distinguir entre intención contractual y ejecución real
- detectar apps que cumplen, cumplen a medias o no cumplen con su perfil
- usar esa evidencia para definir `ui-ux-pro-max-anclora` y sus perfiles por tier sin ambigüedad

## Regla base

Los perfiles no deben definirse solo desde la bóveda ni solo desde una preview ideal.

Deben salir de tres fuentes a la vez:

1. contrato normativo del tier
2. implementación ejecutable en `anclora-design-system`
3. evidencia real en repos consumidores

Si una de las tres no existe, la definición queda incompleta.

## Pregunta que debe responder el estudio

Para cada repo:

- qué tier dice ser
- qué tier parece ser realmente
- qué piezas canónicas consume
- qué decisiones locales rompen o deforman el contrato
- qué rasgos del repo son accidentales y cuáles expresan la esencia de su familia

## Estados de evaluación

### `fit`

El repo expresa claramente su tier y no necesita forks estructurales para sostenerlo.

### `partial-fit`

El repo apunta al tier correcto, pero mezcla rasgos de otro tier, usa soluciones locales frágiles o no llega todavía al nivel exigido.

### `misaligned`

El repo no expresa el tier que declara, o su gramática visual y operativa contradice el contrato objetivo.

## Qué debe analizarse en cada repo

### 1. Identidad contractual declarada

Buscar evidencia explícita en:

- `README.md`
- `docs/standards/`
- `sdd/`
- nombres de rutas, shells o features

Preguntas:

- el repo declara familia `internal`, `portfolio`, `premium` o `ultra premium`
- el contrato citado coincide con el tipo de producto que implementa
- el objetivo es público, interno, editorial, operativo o ceremonial

### 2. Firma UX/UI real

No basta con colores o tipografías. Hay que mirar:

- ritmo de pantalla
- densidad
- jerarquía
- CTA
- navegación
- superficies
- motion
- tratamiento de formularios
- overlays
- data display
- localización

### 3. Adopción del design system

Buscar:

- import de `@anclora/design-system/system.css`
- taxonomía `tier`, `domain`, `archetype`, `role`, `cluster`, `product`
- uso directo o adaptación de componentes canónicos
- clonación local de piezas que deberían venir del sistema

### 4. Coherencia entre propósito y forma

Preguntas:

- la forma visual ayuda al caso de uso real
- hay teatralidad donde debería haber claridad
- hay austeridad donde debería haber valor percibido
- hay densidad interna en una app que en realidad es de captación
- hay storytelling donde debería haber operación

### 5. Madurez de ejecución

Evaluar si la app:

- tiene una gramática consistente entre pantallas
- mantiene la misma disciplina en modales, tablas, forms y estados
- resuelve responsive, accesibilidad básica y localización
- evita mezclar patrones incompatibles

## Criterios por perfil

## `internal`

Esencia:

- herramienta operativa
- rapidez de lectura
- densidad útil
- navegación persistente
- claridad por encima de impacto visual

Señales positivas:

- shell estable
- tablas, filtros y forms tratados como superficies principales
- motion corto y funcional
- jerarquía sobria
- feedback inmediato

Señales de desalineación:

- hero o narrativa excesiva
- profundidad visual ornamental
- demasiada ceremonia para tareas frecuentes
- CTA tratados como marketing

## `portfolio`

Esencia:

- presentación pública
- credibilidad
- captación
- storytelling editorial

Señales positivas:

- hero y primer viewport claros
- CTA visible desde pronto
- secciones narrativas bien ritmadas
- media y copy al servicio de conversión
- navegación ligera

Señales de desalineación:

- shell denso de aplicación interna
- exceso de widgets operativos
- demasiados estados de sistema en una superficie de captación
- UI genérica sin firma editorial

## `premium`

Esencia:

- producto de valor
- equilibrio entre marca y operación
- criterio visual con uso recurrente
- profundidad moderada y controlada

Señales positivas:

- workspaces o dashboards con acabado de marca
- cards y controls refinados
- jerarquía fuerte sin teatralidad
- motion selectivo
- UX robusta para uso repetido

Señales de desalineación:

- visual demasiado plano para el valor prometido
- narrativa demasiado comercial para una app de uso continuo
- excesos teatrales que dañan la eficiencia
- componentes heterogéneos sin gramática común

## `ultra premium`

Esencia:

- exclusividad
- precisión
- lujo controlado
- ceremonialidad sin fricción

Señales positivas:

- composición media-led o editorial rica
- materiales y tipografía con rango superior
- overlays y formularios con disciplina extrema
- motion de firma medido
- CTA con tono concierge, no marketing genérico

Señales de desalineación:

- glassmorphism o lujo aparente sin estructura
- teatralidad sin control de jerarquía
- landing bonita pero operativamente frágil
- premium genérico confundido con ultra premium

## Inventario inicial de repos a estudiar

Clasificación provisional a validar con el estudio:

- `internal`
  - `anclora-content-generator-ai`
  - `anclora-advisor-ai`
  - `anclora-nexus`

- `portfolio`
  - `anclora-portfolio`
  - `anclora-azure-bay-landing`
  - `anclora-playa-viva-uniestate`

- `premium`
  - `anclora-talent`
  - `anclora-synergi`
  - `anclora-data-lab`
  - `anclora-group`
  - `anclora-impulso`

- `ultra premium`
  - `anclora-private-estates`

- `external candidate for adoption`
  - `calculadora-fiscal-183-premium`
  - `calculadora-fiscal-183`

Esta lista es solo un punto de partida. El análisis puede mover un repo de grupo si la ejecución real contradice la etiqueta.

## Salidas esperadas del estudio

El trabajo no termina en una opinión cualitativa. Debe producir:

1. una matriz repo -> tier declarado -> tier real -> estado de ajuste
2. una lista de rasgos esenciales por perfil
3. una lista de anti-patrones por perfil
4. una lista de piezas del design system que faltan para sostener mejor cada familia
5. una definición operativa para `ui-ux-pro-max-anclora`
6. referencias específicas por perfil:
   - `internal`
   - `portfolio`
   - `premium`
   - `ultra premium`

## Relación con la futura skill

`ui-ux-pro-max-anclora` no debe ser una skill de “embellecimiento”.

Debe servir para:

- revisar una adopción contra contrato
- distinguir fallo sistémico de fallo local
- proponer correcciones compatibles con el tier objetivo
- evitar mezclas estilísticas entre familias

Los perfiles de la skill deben salir de este estudio comparativo, no de intuiciones aisladas.

## Orden recomendado del análisis

1. validar el grupo `premium` con `anclora-talent`, `anclora-synergi` y `anclora-data-lab`
2. validar `internal` con `anclora-content-generator-ai`, `anclora-advisor-ai` y `anclora-nexus`
3. validar `portfolio` con `anclora-portfolio`, `anclora-azure-bay-landing` y `anclora-playa-viva-uniestate`
4. validar `ultra premium` con `anclora-private-estates`
5. usar `calculadora-fiscal-183-premium` como caso de adopción externa hacia `ultra premium`

## Regla de decisión para adopciones

Cuando una app externa se quiera absorber al ecosistema:

1. se define el tier destino real
2. se compara contra los repos ejemplares de ese tier
3. se ejecuta la adopción desde `anclora-design-system`
4. se audita el resultado con este framework
5. solo si quedan desajustes finos, actúa el perfil de `ui-ux-pro-max-anclora`

Si el gap es estructural, no se maquilla con la skill: primero se corrige el sistema o la app.
