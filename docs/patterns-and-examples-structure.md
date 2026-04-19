# Patterns And Examples Structure

Fecha: 2026-04-20
Repositorio: `anclora-design-system`

## Objetivo

Esta capa existe para evitar dos errores habituales:

- subir al canon composiciones que en realidad pertenecen a una app concreta
- dejar los patrones como guidelines abstractas sin artefactos reutilizables

## Regla de frontera

`pattern`
- Composicion reusable de primitives y shared components para una necesidad recurrente del ecosistema.
- Debe poder sobrevivir a cambios de copy, producto o dataset.
- Debe describirse por estructura, slots, estados, constraints y variantes.

`example`
- Implementacion de referencia que demuestra como un tipo de app consume patrones y foundations.
- Puede llevar copy concreto, jerarquia de negocio y escenarios cercanos a producto.
- No define canon por si sola.

`app-specific composition`
- Pantalla o bloque acoplado a una app concreta.
- Puede vivir como example para documentar consumo, pero no debe promoverse a `pattern` sin generalizacion previa.

## Estructura objetivo

```text
src/
  patterns/
    README.md
    entry/
      README.md
      ecosystem-app-grid.pattern.md
      premium-hero-split.pattern.md
    workspace/
      README.md
      workspace-shell.pattern.md
    executive/
      README.md
      executive-summary-band.pattern.md
  examples/
    README.md
    premium/
      README.md
      command-center-overview.example.html
    internal/
      README.md
      content-generator-operations.example.html
    portfolio/
      README.md
      private-estates-editorial-landing.example.html
```

## Criterios de promocion

Un artefacto puede promocionarse de `example` a `pattern` solo si cumple todo esto:

- aparece en mas de una app o arquetipo
- puede definirse por slots y reglas estables
- no depende de copy propietario o data model cerrado
- su valor esta en la estructura reusable, no en el contenido demo

## Convencion de archivos

`*.pattern.md`
- contrato operativo del patron
- incluye objetivo, anatomia, slots, variantes, estados, do/don't y combinaciones taxonomicas

`*.example.html`
- referencia ejecutable minima
- importa `src/system.css`
- usa classes reales del sistema actual
- puede mostrar composiciones especificas de app sin convertirlas en canon

## Uso esperado

- `patterns/` guia a quienes construyan componentes o pantallas nuevas
- `examples/` ayuda a apps Premium, Internal y Portfolio a adoptar el sistema sin improvisar
- `docs/` explica la gobernanza y la frontera entre canon y consumo
