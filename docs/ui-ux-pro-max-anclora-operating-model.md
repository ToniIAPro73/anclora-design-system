# UI UX Pro Max Anclora Operating Model

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`

## Objetivo

Definir `ui-ux-pro-max-anclora` como la capa de criterio UX/UI que debe intervenir despues de una auditoria o una adopcion, usando evidencia real de los repos del ecosistema en lugar de heuristicas genericas.

Este documento fija:

- que es la skill base
- que problemas debe resolver
- que perfiles debe distinguir
- como decidir si un fallo pertenece al design system, al repo consumidor o al refinado final

## Punto de partida

`ui-ux-pro-max-anclora` no nace para inventar una estetica nueva.

Nace para:

- leer correctamente el rol real de una app
- contrastarlo con su contrato de tier y superficie
- detectar desviaciones
- proponer correcciones que respeten el ecosistema Anclora

## Fuentes normativas

La skill debe beber de cuatro capas:

1. taxonomia y contratos de `anclora-design-system`
2. matrices de criterios por familia y subperfil
3. auditorias reales repo por repo
4. adopciones reales hechas sobre consumidores

## Documentos base

- [docs/repo-profile-audit-framework.md](/home/toni/projects/anclora-design-system/docs/repo-profile-audit-framework.md:1)
- [docs/real-estate-vertical-operating-model.md](/home/toni/projects/anclora-design-system/docs/real-estate-vertical-operating-model.md:1)
- [docs/real-estate-profile-criteria-matrix.md](/home/toni/projects/anclora-design-system/docs/real-estate-profile-criteria-matrix.md:1)
- [docs/internal-family-operating-model.md](/home/toni/projects/anclora-design-system/docs/internal-family-operating-model.md:1)
- [docs/internal-profile-criteria-matrix.md](/home/toni/projects/anclora-design-system/docs/internal-profile-criteria-matrix.md:1)
- [docs/ultra-premium-real-estate-audit.md](/home/toni/projects/anclora-design-system/docs/ultra-premium-real-estate-audit.md:1)
- [docs/premium-real-estate-support-audit.md](/home/toni/projects/anclora-design-system/docs/premium-real-estate-support-audit.md:1)
- [docs/internal-family-audit.md](/home/toni/projects/anclora-design-system/docs/internal-family-audit.md:1)
- [docs/anclora-nexus-mvp-v1.md](/home/toni/projects/anclora-design-system/docs/anclora-nexus-mvp-v1.md:1)

## Definicion de la skill base

`ui-ux-pro-max-anclora` es una skill de lectura, diagnostico y refinado.

Su unidad de trabajo no es “hacerlo mas bonito”.

Su unidad de trabajo es:

- identificar el perfil correcto
- detectar gaps contra contrato
- distinguir deuda estructural de ruido local
- proponer o aplicar refinado coherente con Anclora

## Que comparte siempre

Toda ejecucion de la skill debe respetar:

- consistencia de tier
- continuidad de marca
- precision en jerarquia
- separacion entre superficie publica e interna
- respeto por i18n, tema, shell y patrones existentes

## Que no debe hacer

La skill no debe:

- tapar carencias del design system con maquillaje local
- empujar todas las apps hacia la misma estetica
- confundir lujo con blur, oro o dramatismo
- confundir operacion con dashboards densos por defecto
- reescribir una app completa si el problema es solo de foco

## Perfiles que debe distinguir

La skill no debe razonar solo por tier plano.

Debe distinguir al menos estos perfiles reales:

## Real Estate

- `ultra premium core platform`
  - referencia: `Anclora Private Estates`

- `ultra premium market-entry landing`
  - referencia: `anclora-private-estates-landing`

- `premium analytical`
  - referencia: `Anclora Data Lab`

- `premium relational`
  - referencia: `Anclora Synergi`

- `internal operational vertical`
  - referencia: `Anclora Nexus`

## Internal family

- `internal production studio`
  - referencia: `Anclora Content Generator AI`

- `internal expert assistant workspace`
  - referencia: `Anclora Advisor AI`

- `internal executive orchestration`
  - referencia: `Anclora Command Center`

- `internal ecosystem gateway`
  - referencia: `Anclora Group`

## Rol del Nexus MVP

`Anclora Nexus` ya no debe leerse como plataforma total.

La skill debe tratarlo como:

- `internal operational vertical`
- foco en captacion, seguimiento y conversion
- shell y densidad de trabajo
- baja tolerancia a modulos no esenciales en primer plano

Esto importa porque cambia el tipo de refinado aceptable.

En `Nexus`, la skill debe favorecer:

- rapidez
- claridad de prioridad
- disciplina en sidebar y recorridos

Y debe evitar:

- teatralidad
- expansion prematura
- capas de mando en superficies diarias

## Modelo de decision

Ante cualquier hallazgo, la skill debe clasificarlo en una de tres categorias:

## 1. Gap del design system

Señales:

- el problema se repite entre varios repos
- falta una primitive, pattern o contrato compartido
- la solucion local se repite porque el sistema no cubre el caso

Accion:

- devolver aprendizaje a `anclora-design-system`

## 2. Gap del repo consumidor

Señales:

- el sistema ya ofrece una respuesta razonable
- el repo la usa mal, la mezcla o la contradice
- el problema es local al flujo, copy, jerarquia o montaje de pantalla

Accion:

- corregir en el repo adoptado

## 3. Gap de refinado final

Señales:

- la estructura ya es correcta
- la identidad del perfil esta bien
- solo faltan pulido, tension visual, ritmo, spacing, prioridad o copy UI

Accion:

- aplicar refinado con `ui-ux-pro-max-anclora`

## Flujo recomendado de uso

La skill debe entrar en este orden:

1. identificar el perfil real de la superficie
2. contrastarlo con su matriz de criterios
3. decidir `fit`, `partial-fit` o `misaligned`
4. separar gap sistémico de gap local
5. solo despues proponer o aplicar refinado

## Flujo post-adopcion

En una adopcion como `calculadora-fiscal-183-premium`, el flujo correcto seria:

1. absorber taxonomia, tokens, componentes y patterns desde `anclora-design-system`
2. evaluar el resultado contra el perfil objetivo
3. clasificar gaps
4. corregir primero sistema o repo si hace falta
5. aplicar `ui-ux-pro-max-anclora` solo como remate disciplinado

## Tipos de salida esperados

La skill deberia poder producir cuatro tipos de salida:

## 1. Diagnostico de perfil

- que perfil deberia ser
- que perfil parece ser
- por que

## 2. Lista de desviaciones

- jerarquia
- densidad
- navegacion
- conversion
- copy
- motion
- localizacion
- tema

## 3. Decision de responsabilidad

- sistema
- repo consumidor
- refinado final

## 4. Plan de correccion

- correcciones estructurales
- correcciones locales
- pulido final

## Contratos implicitos por perfil

## Ultra premium core platform

Debe proteger:

- precision editorial
- formularios impecables
- navegacion de alto rango
- tono concierge

## Ultra premium market-entry landing

Debe proteger:

- tesis de mercado
- autoridad
- captacion cualificada
- ausencia de stock ficticio

## Premium analytical

Debe proteger:

- claridad de señal
- framing premium de la inteligencia
- densidad controlada

## Premium relational

Debe proteger:

- admision cuidada
- confianza
- continuidad entre publico y privado

## Internal operational vertical

Debe proteger:

- foco diario
- estados y prioridades visibles
- tools-first UX

## Internal production studio

Debe proteger:

- foco de edicion y produccion
- layout de estudio
- workflows largos

## Internal expert assistant workspace

Debe proteger:

- consulta clara
- respuesta visible
- baja friccion

## Internal executive orchestration

Debe proteger:

- sintesis
- lectura de mando
- accion selectiva

## Internal ecosystem gateway

Debe proteger:

- autoridad matriz
- acceso claro
- orden del ecosistema

## Variantes futuras

La recomendacion sigue siendo:

- una skill base comun: `ui-ux-pro-max-anclora`
- perfiles y referencias por superficie o tier

No conviene multiplicar skills completas por cada tipo desde el primer dia.

Solo si un perfil demuestra necesitar heuristicas radicalmente distintas deberia extraerse una variante dedicada, por ejemplo:

- `ui-ux-pro-max-anclora-ultra-premium`

## Criterio de madurez

La skill base estara bien definida cuando:

- pueda diagnosticar todos los perfiles auditados sin contradicciones
- no empuje `Nexus`, `Data Lab`, `Synergi` y `Private Estates` hacia la misma gramatica
- permita evaluar adopciones externas con menos ambigüedad
- separe bien deuda del sistema, deuda local y pulido final

## Siguiente derivada natural

Desde este documento, el siguiente paso logico es producir la especificacion concreta de la skill:

- mision
- inputs
- workflow
- output esperado
- referencias por perfil

Eso ya se puede convertir en la estructura real de `ui-ux-pro-max-anclora` dentro del repo.
