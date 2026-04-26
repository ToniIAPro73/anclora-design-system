# Real Estate Profile Criteria Matrix

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Traducir el modelo operativo del vertical `Real Estate` a una matriz concreta de criterios UX/UI para:

- auditar repos existentes
- evaluar adopciones
- detectar desviaciones de perfil
- preparar la futura `ui-ux-pro-max-anclora`

Documento relacionado:

- [docs/real-estate-vertical-operating-model.md](/home/toni/projects/anclora-design-system/docs/real-estate-vertical-operating-model.md:1)

## Cómo usar esta matriz

Cada superficie debe evaluarse en dos planos:

1. ajuste al perfil correcto
2. calidad de ejecución dentro de ese perfil

Estados sugeridos:

- `fit`
- `partial-fit`
- `misaligned`

Regla:

- una UI puede ser muy buena y seguir estando mal clasificada
- una UI puede estar bien clasificada y aun así ejecutarse mal

## Perfiles del vertical

## 1. `ultra premium core platform`

Referencia:

- `Anclora Private Estates`

Propósito:

- expresar la experiencia principal del vertical
- sostener identidad, navegación, acceso y profundidad de producto

### Criterios

#### Marca y presencia

- debe sentirse claramente superior a `premium`
- debe transmitir lujo, control y precisión
- la riqueza visual debe ser estructural, no cosmética

#### Tipografía y materialidad

- debe existir una jerarquía editorial clara
- display, body y accents deben convivir con control
- la materialidad debe sentirse exclusiva, no recargada

#### Navegación

- la navegación debe sentirse core y persistente
- overlays y menús deben mantener jerarquía impecable
- la orientación del usuario no puede degradarse por exceso ceremonial

#### CTA y conversión

- el CTA principal debe sentirse de alto valor
- no debe sonar a marketing genérico
- cada siguiente paso debe transmitir selección y confianza

#### Formularios y acceso

- forms, accesos privados y modales deben verse impecables en desktop y mobile
- no se toleran roturas de composición en estados críticos
- la fricción debe ser baja, aunque la percepción sea exclusiva

#### Localización y tema

- el multidioma debe mantener la misma calidad percibida
- si existen varios temas, todos deben sostener el rango ultra premium

#### Señales de desalineación

- parece una landing premium alargada
- la exclusividad depende solo de oro, blur o imagen grande
- modales o forms se rompen bajo presión real
- la navegación se vuelve más ornamental que usable

## 2. `ultra premium market-entry landing`

Referencia:

- `anclora-private-estates-landing`

Propósito:

- atraer atención cualificada
- generar autoridad
- captar propietarios, inversores y partners

### Criterios

#### Propuesta de valor

- la tesis debe entenderse muy rápido
- debe compensar la falta de inventario con claridad estratégica
- debe vender criterio, inteligencia y ejecución, no volumen ficticio

#### Narrativa

- el storytelling debe ser selectivo y sobrio
- cada bloque debe aumentar confianza o deseo
- no debe parecer una home vacía esperando contenido futuro

#### Jerarquía

- el primer viewport debe tener autoridad inmediata
- los bloques deben ordenar bien propietarios, inversores y partners
- la relación con Data Lab y Synergi debe ser visible y creíble

#### CTA y captación

- debe haber vías claras para:
  - propietarios
  - inversores
  - partners
- los CTAs deben sentirse premium, no agresivos
- la captación debe parecer cualificada y segura

#### Firma visual

- dark-first o visual equivalente si así lo exige el rol
- la landing debe sentirse boutique, no corporativa genérica
- la exclusividad debe sostenerse sin depender del stock

#### Localización

- el selector de idioma debe ser limpio y protagonista cuando proceda
- el cambio de idioma no puede degradar la composición

#### Señales de desalineación

- parece la home de una agencia tradicional
- intenta simular inventario inexistente
- mezcla demasiados mensajes y no define el foco
- el CTA parece marketing masivo, no admisión premium

## 3. `premium analytical`

Referencia:

- `Anclora Data Lab`

Propósito:

- demostrar inteligencia territorial y calidad analítica
- elevar credibilidad del vertical

### Criterios

#### Claridad analítica

- la señal debe leerse rápido
- la jerarquía de información debe ser rigurosa
- el usuario debe sentir precisión, no ruido

#### Identidad premium

- no debe parecer BI estándar
- el valor premium debe venir de criterio, framing y curación
- la marca debe estar presente sin entorpecer la lectura

#### Densidad

- puede ser más denso que una landing
- no debe caer en densidad interna pura
- debe equilibrar profundidad y respiración visual

#### Shell y controles

- theme e idioma deben integrarse como parte del producto
- filtros, métricas, tarjetas y paneles deben responder a una misma gramática

#### CTA

- los siguientes pasos deben sentirse institucionales y valiosos
- la acción nunca debe romper el tono analítico

#### Señales de desalineación

- parece dashboard interno disfrazado
- sacrifica comprensión por lujo aparente
- parece proptech genérico sin firma propia
- usa demasiadas superficies decorativas sin función clara

## 4. `premium relational`

Referencia:

- `Anclora Synergi`

Propósito:

- estructurar partnership y colaboración selectiva
- transformar interés en relación curada

### Criterios

#### Confianza

- debe transmitir filtro, seriedad y continuidad
- el usuario debe sentir que entra en una red cuidada

#### Admisión

- formularios y accesos deben ser impecables
- la admisión debe sentirse guiada, no burocrática
- la claridad del proceso debe ser muy alta

#### Narrativa

- debe explicar el valor de pertenecer al ecosistema
- no debe parecer una simple solicitud B2B

#### Shell

- la experiencia pública y la privada deben compartir lenguaje
- la transición entre captar y operar debe sentirse coherente

#### Localización y tema

- idioma y tema deben reforzar control y hospitalidad
- no deben sentirse injertos tardíos

#### Señales de desalineación

- parece un portal administrativo
- parece un formulario de partnership genérico
- no transmite curación ni estatus
- la parte privada rompe la promesa de la parte pública

## 5. `internal operational`

Referencia:

- `Anclora Nexus`

Propósito:

- sostener procesos, captación y operación interna

### Criterios

#### Eficiencia

- la velocidad de lectura y acción manda
- la densidad debe ser útil, no intimidante

#### Shell

- navegación persistente
- módulos claros
- herramientas bien encuadradas

#### Jerarquía

- lo importante debe saltar rápido
- el sistema no debe competir por atención con recursos ceremoniales

#### Controles

- forms, tablas, filtros y estados son de primera clase
- la interacción debe ser rápida y robusta

#### Marca

- debe sentirse Anclora
- no debe intentar parecer superficie pública premium

#### Señales de desalineación

- teatralidad innecesaria
- exceso de motion o materiales ricos
- narrativas largas donde hacen falta herramientas
- estética pública infiltrada en una superficie operativa

## Matriz comparativa rápida

| Perfil | Meta principal | Ritmo | Densidad | CTA | Riesgo principal |
| --- | --- | --- | --- | --- | --- |
| `ultra premium core platform` | experiencia principal | ceremonial controlado | media | alto valor | lujo aparente sin disciplina |
| `ultra premium market-entry landing` | autoridad y captación | editorial selectivo | baja-media | cualificado | parecer web sin stock o marketing genérico |
| `premium analytical` | señal y credibilidad | preciso | media | institucional | parecer BI genérico |
| `premium relational` | partnership y red | guiado | media | admisión cuidada | parecer portal B2B común |
| `internal operational` | ejecución y control | rápido | media-alta | funcional | contaminarse con gramática pública |

## Reglas de decisión para auditorías

### Si una superficie es pública

Preguntar primero:

- atrae
- filtra
- posiciona
- o demuestra capacidad

No asumir que toda superficie pública es `landing premium` sin más.

### Si una superficie es privada

Preguntar primero:

- opera
- analiza
- coordina
- o sirve acceso selectivo

No asumir que toda superficie privada debe parecer interna.

### Si una app cruza varios roles

Separar por superficie real.

Ejemplo:

- una app puede tener home pública `market-entry`
- login privado `premium relational`
- workspace interno `internal operational`

No conviene forzar una única gramática si los roles son distintos.

## Relación con futuras adopciones

Antes de absorber una app externa al vertical:

1. decidir qué papel real debe jugar
2. elegir el perfil de esta matriz
3. adaptar estructura, copy, navegación, CTA y shell a ese perfil
4. auditar el resultado con esta misma matriz

## Relación con la futura skill

La futura `ui-ux-pro-max-anclora` debería usar esta matriz como base para:

- detectar el perfil objetivo
- marcar gaps por categoría
- distinguir:
  - problema de rol
  - problema de tier
  - problema de ejecución
  - problema de adopción del design system

## Próximo paso recomendado

Usar esta matriz para auditar repo por repo dentro del vertical:

1. `Anclora Private Estates`
2. `anclora-private-estates-landing`
3. `Anclora Data Lab`
4. `Anclora Synergi`
5. `Anclora Nexus`
