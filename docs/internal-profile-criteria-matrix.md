# Internal Profile Criteria Matrix

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Traducir la familia `internal` a una matriz concreta de criterios UX/UI para:

- auditar repos internos
- distinguir subperfiles con precisión
- evitar que todas las internas se midan como si fueran el mismo tipo de app
- preparar la futura `ui-ux-pro-max-anclora`

Documento relacionado:

- [docs/internal-family-operating-model.md](/home/toni/projects/anclora-design-system/docs/internal-family-operating-model.md:1)

## Cómo usar esta matriz

Cada repo interno debe evaluarse en dos planos:

1. si pertenece al subperfil correcto
2. si la ejecución UX/UI está a la altura de ese subperfil

Estados sugeridos:

- `fit`
- `partial-fit`
- `misaligned`

## Subperfiles internos

## 1. `internal operational vertical`

Referencia:

- `Anclora Nexus`

Propósito:

- sostener operación interna de una vertical concreta

### Criterios

#### Ritmo y densidad

- la lectura debe ser rápida
- la densidad debe ser útil y controlada
- el usuario debe ver estados, prioridades y siguientes acciones sin esfuerzo

#### Navegación

- shell persistente
- estructura de módulos clara
- recorridos frecuentes accesibles sin fricción

#### Herramientas

- forms, tablas, filtros y estados deben ser de primera clase
- los controles tienen que priorizar robustez y velocidad

#### Marca

- debe sentirse Anclora
- no debe competir con gramática pública premium

#### Señales de desalineación

- exceso de ceremonialidad
- hero o narrativa donde hacen falta herramientas
- superficie pública infiltrada en capas operativas

## 2. `internal production studio`

Referencia:

- `Anclora Content Generator AI`

Propósito:

- sostener producción interna especializada

### Criterios

#### Estructura de estudio

- debe sentirse como herramienta de trabajo real
- edición, revisión, preview y export deben convivir con claridad
- el layout debe favorecer foco y continuidad

#### Herramientas visibles

- las acciones clave deben estar muy accesibles
- los estados de producción deben ser fáciles de leer
- los flujos repetidos deben poder ejecutarse sin ruido

#### Jerarquía

- el espacio principal debe pertenecer al contenido o la producción
- la chrome no debe robar protagonismo

#### Marca

- debe tener identidad de estudio Anclora
- no debe parecer un dashboard genérico ni una landing premium

#### Señales de desalineación

- parece un panel administrativo sin alma de estudio
- la edición queda subordinada a chrome o cards
- la experiencia no acompaña workflows largos

## 3. `internal expert assistant workspace`

Referencia:

- `Anclora Advisor AI`

Propósito:

- ofrecer ayuda experta interna con bajo coste cognitivo

### Criterios

#### Claridad de consulta

- la interacción principal debe ser evidente
- el usuario debe entender qué preguntar, qué recibe y qué hacer después

#### Contexto y respuesta

- la respuesta debe tener prioridad visual
- el contexto útil debe estar disponible sin sobrecargar
- el sistema debe parecer experto, no un chat vacío

#### Fricción

- la experiencia debe sentirse ligera y directa
- la navegación no debe estorbar la consulta

#### Marca

- debe sentirse herramienta especializada
- no debe parecer un SaaS de chat genérico

#### Señales de desalineación

- parece un chat estándar sin criterio visual
- parece dashboard en lugar de asistente experto
- exceso de estructura para una tarea que pide inmediatez

## 4. `internal executive orchestration`

Referencia:

- `Anclora Command Center`

Propósito:

- sintetizar, coordinar y apoyar decisiones ejecutivas

### Criterios

#### Síntesis

- la información debe estar filtrada y jerarquizada
- el usuario debe entender situación, riesgos y próximos pasos rápidamente

#### Densidad

- menos denso que una herramienta operativa
- más estructurado que un launcher o portal simple

#### Visión transversal

- debe sentirse superficie de mando
- la relación entre bloques debe reforzar control y contexto

#### Acción

- las acciones deben ser pocas, claras y relevantes
- no debe invadirlo la micro-operativa

#### Señales de desalineación

- parece dashboard analítico genérico
- mezcla demasiada ejecución de detalle
- carece de foco de mando o síntesis

## 5. `internal ecosystem gateway`

Referencia:

- `Anclora Group`

Propósito:

- actuar como puerta de acceso e identidad corporativa del ecosistema

### Criterios

#### Identidad institucional

- debe transmitir entidad matriz y control del conjunto
- la experiencia debe ser sobria pero con peso

#### Acceso y enrutado

- el acceso a apps, roles y áreas debe ser claro
- el usuario debe saber dónde está y qué puede abrir

#### Visión de conjunto

- debe sentirse ecosistema, no launcher suelto
- la navegación debe ordenar el grupo con criterio

#### Marca

- más institucional que una app de vertical
- menos ornamental que una superficie premium pública

#### Señales de desalineación

- parece un simple listado de enlaces
- no transmite autoridad corporativa
- se queda demasiado plano para ser puerta del ecosistema

## Matriz comparativa rápida

| Perfil | Meta principal | Ritmo | Densidad | Acción dominante | Riesgo principal |
| --- | --- | --- | --- | --- | --- |
| `internal operational vertical` | operar una vertical | rápido | media-alta | proceso | contaminarse con gramática pública |
| `internal production studio` | producir | sostenido | media | editar y revisar | parecer dashboard genérico |
| `internal expert assistant workspace` | asistir y orientar | directo | baja-media | consultar | parecer chat genérico |
| `internal executive orchestration` | sintetizar y coordinar | controlado | media | decidir | parecer dashboard analítico común |
| `internal ecosystem gateway` | acceder y ordenar el ecosistema | claro | baja-media | enrutar | quedarse en launcher básico |

## Reglas de decisión para auditorías

### Si el repo se usa muchas horas seguidas

Preguntar:

- es estudio
- operación
- o mando

No asumir que toda herramienta de uso prolongado es un dashboard denso.

### Si el repo se centra en una interacción principal

Preguntar:

- consulta
- edición
- coordinación
- acceso

La forma debe seguir esa interacción central.

### Si la app conecta varias áreas del grupo

Preguntar:

- orquesta
- enruta
- o ejecuta

Eso separa `Command Center` de `Anclora Group`.

## Relación con futuras auditorías

Antes de decir que una app “cumple como interna”, hay que responder:

- ¿cumple como qué tipo de interna?

Esa pregunta evitará errores como:

- medir `Anclora Group` como si fuera `Nexus`
- medir `Advisor AI` como si fuera `Content Generator AI`
- medir `Command Center` como si fuera un dashboard operativo

## Relación con la futura skill

La futura `ui-ux-pro-max-anclora` debería usar esta matriz para:

- identificar subperfil interno objetivo
- marcar gaps por categoría
- distinguir:
  - error de subperfil
  - error de ejecución
  - error de absorción del design system

## Próximo paso recomendado

Usar esta matriz para auditar repo por repo:

1. `Anclora Nexus`
2. `Anclora Content Generator AI`
3. `Anclora Advisor AI`
4. `Anclora Command Center`
5. `Anclora Group`
