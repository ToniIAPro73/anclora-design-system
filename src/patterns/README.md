# Patterns

Esta carpeta contiene patrones reutilizables del ecosistema Anclora.

Un patron no es un componente atomico ni una pantalla de app. Es una composicion estable de primitives y shared components para resolver una necesidad recurrente.

## Regla rapida

- Si el valor esta en la estructura reusable, va aqui.
- Si depende del flujo, copy o datos de una app concreta, va a `src/examples/`.

## Familias iniciales

- `entry/`
  Patrones de acceso, descubrimiento y captacion.
- `workspace/`
  Patrones operativos para shells, navegacion y contexto de trabajo.
- `executive/`
  Patrones de lectura transversal, KPIs y resumen de estado.

## Formato

Cada `*.pattern.md` debe documentar:

- objetivo
- anatomia
- slots
- variantes
- estados
- restricciones
- taxonomia sugerida
