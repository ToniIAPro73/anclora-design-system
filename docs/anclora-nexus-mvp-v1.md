# Anclora Nexus MVP v1

Fecha: 2026-04-26
Repositorio coordinador: `anclora-design-system`
Repositorio producto: `anclora-nexus`

## Objetivo

Reducir `Anclora Nexus` a un producto mínimo viable centrado en:

- captación de propiedades
- captación de compradores
- seguimiento comercial y operativo de ambos pipelines
- priorización básica de oportunidades

Todo lo que no ayude directamente a eso debe quedar deshabilitado por ahora.

## Tesis de producto

`Anclora Nexus` no debe arrancar como una plataforma total.

Debe arrancar como una superficie interna de trabajo diario que permita:

1. registrar oportunidades
2. clasificarlas
3. hacer seguimiento
4. no perder contactos valiosos
5. convertir actividad en pipeline real

## Definición del MVP

`Nexus MVP v1 = sellers + buyers + properties + tasks + priorización ligera`

En términos de producto, esto significa:

- un pipeline de propietarios potenciales
- un pipeline de compradores potenciales
- una capa mínima de propiedades conectada con esos pipelines
- una capa de tareas obligatoria para sostener seguimiento
- una vista de priorización operativa para decidir a quién contactar hoy

## Perfil

Subfamilia:

- `internal operational vertical`

Rol:

- capa operativa interna del vertical `Real Estate`

Firma UX/UI requerida:

- rapidez de lectura
- densidad útil
- foco en siguiente acción
- poco ruido visual
- cero ambición enciclopédica

## Módulos activos

## 1. `Dashboard`

Ruta actual:

- `/dashboard`

Función en el MVP:

- resumen diario de actividad
- visibilidad inmediata de seguimiento pendiente
- lectura rápida del estado del pipeline

Debe responder solo a:

- cuántos sellers activos hay
- cuántos buyers activos hay
- cuántas propiedades están en captación o activas
- cuántas tareas vencen hoy o esta semana
- cuántos contactos necesitan seguimiento
- cuántos matches simples existen entre buyer y property

No debe intentar ser:

- panel ejecutivo
- Command Center
- observatorio transversal

## 2. `Sellers`

Ruta actual:

- `/sellers`

Función en el MVP:

- captación de propietarios
- clasificación territorial
- seguimiento comercial hacia exclusividad o descarte

Pipeline mínimo:

- `sin_contacto`
- `primer_contacto`
- `en_seguimiento`
- `reunion_agendada`
- `propuesta_enviada`
- `mandato_exclusivo`
- `descartado`

Campos mínimos:

- nombre del propietario
- zona
- tipo de activo
- fuente
- interés estimado
- notas
- siguiente acción
- fecha del siguiente seguimiento

## 3. `Buyers`

Base actual:

- `/leads`

Decisión de producto:

- en el MVP, `leads` debe comportarse como pipeline de compradores

Función en el MVP:

- captación de compradores activos
- cualificación comercial
- seguimiento hasta visita, oferta o descarte

Pipeline mínimo:

- `nuevo`
- `cualificado`
- `buscando_activo`
- `en_conversacion`
- `visita_oportunidad`
- `oferta_potencial`
- `cerrado_o_descartado`

Campos mínimos:

- nombre
- presupuesto
- zonas de interés
- tipología
- plazo
- origen
- urgencia
- notas
- siguiente acción
- fecha del siguiente seguimiento

## 4. `Properties`

Ruta actual:

- `/properties`

Función en el MVP:

- registrar propiedades reales o en captación
- vincularlas con sellers
- preparar matching con buyers

Una propiedad en este MVP debe servir para:

- saber de quién viene
- en qué estado está
- si es válida para marketing o captación
- con qué buyers podría cruzarse

Estados mínimos:

- `prospectada`
- `en_validacion`
- `captada`
- `activa`
- `pausada`
- `descartada`

## 5. `Tasks`

Ruta actual:

- `/tasks`

Función en el MVP:

- sostener el seguimiento real del negocio

Regla crítica:

- ningún seller o buyer activo debería existir sin siguiente acción asociada

Tipos mínimos:

- llamada
- whatsapp
- email
- reunión
- revisión de property
- follow-up

## 6. `Prospection` ligera

Base recomendada:

- `/prospection-unified`

Función en el MVP:

- priorizar trabajo, no abrir un segundo producto paralelo

Debe limitarse a:

- detectar sellers prioritarios
- detectar buyers prioritarios
- sugerir próximos contactos
- mostrar señales básicas de matching

No debe intentar ser:

- laboratorio analítico completo
- motor territorial exhaustivo
- ranking estratégico multi-capa

## Módulos deshabilitados

Estos módulos deben quedar fuera de la navegación principal o marcados como no disponibles en `MVP v1`:

- `/team`
- `/intelligence`
- `/prospection` studio
- `/opportunity-ranking`
- `/ingestion`
- `/data-quality`
- `/feed-orchestrator`
- `/partner-network`
- `/partner-admissions`
- `/data-lab-access`
- `/automation-alerting`
- `/command-center`
- `/deal-margin-simulator`
- `/source-observatory`

`/profile` y `/settings` pueden mantenerse como secundarios, pero no deben formar parte del relato principal del producto.

## Sidebar objetivo del MVP

La navegación principal debería reducirse a:

- `Dashboard`
- `Sellers`
- `Buyers`
- `Properties`
- `Tasks`

Opcional como sexta entrada:

- `Prospection`

## Flujos end-to-end mínimos

## Flujo 1. Captación de propietario

1. crear seller
2. clasificar zona, tipo de activo y fuente
3. asignar estado inicial
4. definir siguiente acción
5. registrar seguimiento
6. escalar a `mandato_exclusivo` o `descartado`

## Flujo 2. Captación de comprador

1. crear buyer
2. registrar presupuesto, zona, tipología y plazo
3. marcar urgencia y nivel de cualificación
4. definir siguiente acción
5. registrar evolución hasta visita, oportunidad u oferta

## Flujo 3. Vinculación property <> seller

1. crear o asociar property
2. vincularla al seller correspondiente
3. registrar estado de captación
4. dejar lista la property para matching simple

## Flujo 4. Seguimiento diario

1. abrir dashboard
2. ver contactos vencidos o críticos
3. ejecutar tareas del día
4. actualizar estados
5. generar nuevas siguientes acciones

## Flujo 5. Matching ligero

1. detectar buyers compatibles con una property
2. detectar properties compatibles con un buyer
3. priorizar outreach o conversación comercial

## Qué no debe entrar todavía

No debería entrar en `MVP v1`:

- automatización avanzada
- red de partners
- admisiones complejas
- observabilidad de fuentes
- data quality como producto independiente
- command center ejecutivo
- simuladores financieros de segundo orden
- capas profundas de inteligencia territorial
- orquestación transversal del ecosistema

## Modelo de éxito

`Nexus MVP v1` tiene éxito si te permite:

- no perder ningún seller relevante
- no perder ningún buyer relevante
- saber cada día a quién contactar
- mover oportunidades por estados reales
- convertir contactos en pipeline visible

No tiene éxito si:

- ofrece muchas secciones pero no genera seguimiento real
- obliga a navegar por demasiadas superficies
- convierte la captación diaria en una carga operativa

## KPIs iniciales

Los primeros indicadores útiles deberían ser:

- sellers activos
- buyers activos
- porcentaje con siguiente acción definida
- tareas vencidas
- tiempo medio sin seguimiento
- sellers convertidos a reunión
- sellers convertidos a propuesta
- sellers convertidos a mandato exclusivo
- buyers cualificados
- buyers con matching activo

## Criterio de reactivación futura

Un módulo hoy deshabilitado solo debería reactivarse si cumple una de estas condiciones:

- elimina fricción real del flujo diario
- mejora conversión de sellers o buyers
- aporta visibilidad operativa que el MVP no cubre
- ya existe evidencia clara de uso recurrente

## Orden recomendado de implementación

1. estabilizar login, sesión y shell
2. dejar sidebar mínima
3. consolidar `sellers`
4. consolidar `leads` como `buyers`
5. consolidar `properties`
6. consolidar `tasks`
7. añadir priorización ligera
8. esconder o congelar el resto

## Decisión de naming

Si el producto se orienta de verdad a compradores, conviene considerar pronto:

- renombrar `Leads` a `Buyers`

Aunque internamente la tabla o parte del modelo todavía conserve herencia de `leads`, la superficie de producto debería hablar el idioma real del negocio.

## Conclusión

La primera versión válida de `Anclora Nexus` no debe intentar parecer una plataforma completa del ecosistema.

Debe parecer una herramienta interna nítida y disciplinada para generar pipeline real en `Real Estate`.

Primero:

- captación
- seguimiento
- conversión

Después:

- inteligencia avanzada
- automatización
- orquestación ampliada
