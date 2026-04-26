# Internal Family Operating Model

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Definir la familia `internal` del ecosistema Anclora como un conjunto de subperfiles distintos, no como una única gramática indiferenciada.

Esto permite:

- auditar repos internos con mayor precisión
- evitar que todas las apps internas parezcan el mismo dashboard
- separar herramientas operativas, estudios de producción, asistentes expertos, superficies ejecutivas y gateways corporativos
- preparar la futura `ui-ux-pro-max-anclora` con perfiles internos más realistas

## Regla base

Una app `internal` no se define solo por no ser pública.

También se define por:

- qué trabajo habilita
- quién la usa
- qué ritmo de interacción necesita
- cuánto peso tienen la jerarquía, la síntesis, la densidad o la coordinación

## Subfamilias internas

## 1. `internal operational vertical`

Referencia principal:

- `Anclora Nexus`

Rol:

- capa operativa interna de una vertical concreta

Función:

- captación
- seguimiento
- coordinación de pipeline
- soporte a procesos comerciales y operativos

Firma UX/UI:

- rapidez de lectura
- densidad útil
- navegación persistente
- foco en acciones y estados
- cero teatralidad innecesaria

Riesgo principal:

- contaminarse con gramática pública premium

## 2. `internal production studio`

Referencia principal:

- `Anclora Content Generator AI`

Rol:

- herramienta interna de producción especializada

Función:

- generar
- editar
- transformar
- organizar trabajo productivo en workflows densos

Firma UX/UI:

- shell de trabajo
- herramientas visibles y accionables
- jerarquía pensada para producción repetida
- espacio para edición, revisión, preview y export

Riesgo principal:

- quedarse en dashboard genérico sin identidad de estudio

## 3. `internal expert assistant workspace`

Referencia principal:

- `Anclora Advisor AI`

Rol:

- herramienta interna centrada en asistencia experta

Función:

- consulta
- orientación
- apoyo a decisión
- trabajo experto guiado por contexto

Firma UX/UI:

- claridad conversacional o de consulta
- fricción baja
- énfasis en contexto, respuesta y siguiente acción
- sensación de herramienta especializada, no de app genérica

Riesgo principal:

- parecer chat genérico o dashboard estándar sin profundidad de ayuda

## 4. `internal executive orchestration`

Referencia principal:

- `Anclora Command Center`

Rol:

- capa de visión, supervisión y orquestación de alto nivel

Función:

- síntesis
- coordinación
- observación transversal
- apoyo a decisiones ejecutivas

Firma UX/UI:

- información de alto nivel
- jerarquía muy controlada
- menos densidad que una herramienta operativa
- más estructura de mando que de producción

Riesgo principal:

- parecer dashboard analítico común en vez de superficie ejecutiva

## 5. `internal ecosystem gateway`

Referencia principal:

- `Anclora Group`

Rol:

- empresa matriz y puerta de acceso al ecosistema

Función:

- acceso
- identidad corporativa
- enrutado por rol
- visión de conjunto del grupo

Firma UX/UI:

- institucional pero clara
- más sobria que una app premium
- más estructurada que un simple launcher
- debe transmitir control del ecosistema

Riesgo principal:

- quedarse en launcher básico sin suficiente peso corporativo

## Repos asociados

### `internal operational vertical`

- `Anclora Nexus`

### `internal production studio`

- `Anclora Content Generator AI`

### `internal expert assistant workspace`

- `Anclora Advisor AI`

### `internal executive orchestration`

- `Anclora Command Center`

### `internal ecosystem gateway`

- `Anclora Group`

## Qué comparten todas las internas

Aunque los subperfiles sean distintos, todas las apps internas deben compartir:

- claridad funcional
- prioridad por encima de ornamentación
- shells robustos
- navegación comprensible
- forms, tablas, filtros o controles tratados con disciplina
- continuidad de marca sin intentar parecer superficies públicas premium

## Qué no deben compartir por fuerza

No todas las internas deberían parecer:

- dashboards densos
- CRMs
- estudios de edición
- launchers
- paneles ejecutivos

Si se fuerzan a una misma gramática, el resultado pierde precisión.

## Señales de mala clasificación

### Si una app parece demasiado pública

Posible problema:

- está tomando recursos visuales del tier premium o ultra premium que dañan la eficiencia interna

### Si una app parece demasiado administrativa

Posible problema:

- se ha degradado una superficie que necesitaba dirección editorial, experta o ejecutiva

### Si una app parece un dashboard genérico

Posible problema:

- no se ha explicitado bien su subperfil interno

## Implicaciones para futuras auditorías

Cuando auditemos una app interna no deberíamos preguntar solo:

- “¿cumple como interna?”

Sino:

- “¿cumple como qué tipo de interna?”

Ese cambio de pregunta es el que nos permitirá separar con criterio:

- operación vertical
- producción
- asistencia experta
- orquestación ejecutiva
- gateway corporativo

## Implicaciones para la futura skill

`ui-ux-pro-max-anclora` no debería tener un único perfil `internal`.

Debería reconocer al menos:

- `internal operational vertical`
- `internal production studio`
- `internal expert assistant workspace`
- `internal executive orchestration`
- `internal ecosystem gateway`

La skill debe usar estos perfiles para:

- identificar el rol real del repo
- evitar que una mejora UX/UI empuje la app hacia otra familia equivocada
- proponer refinados coherentes con la función real

## Siguiente paso recomendado

Crear una matriz de criterios UX/UI para esta familia `internal` y después auditar repo por repo:

1. `Anclora Nexus`
2. `Anclora Content Generator AI`
3. `Anclora Advisor AI`
4. `Anclora Command Center`
5. `Anclora Group`
