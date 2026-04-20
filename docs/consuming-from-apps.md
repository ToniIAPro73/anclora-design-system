# Consuming The Design System

Fecha: 2026-04-20
Repositorio: `anclora-design-system`

## Objetivo

Este repo ya puede consumirse desde apps sin depender de copiar previews.

La regla base es:

- importar `system.css` como entrada principal
- componer taxonomia + producto en el shell de la app
- usar components canonicos encima de foundations
- dejar `patterns` y `examples` como referencia de composicion, no como API base

## 1. Entrada recomendada

Import recomendado:

```css
@import "@anclora/design-system/system.css";
```

Si la app todavia depende del wrapper historico:

```css
@import "@anclora/design-system/legacy.css";
```

## 2. Composicion recomendada

La clase del shell debe mezclar:

- `tier-*`
- `domain-*`
- `archetype-*`
- `role-*`
- `cluster-*`
- `product-*`

Ejemplo:

```html
<body class="tier-premium domain-human-capital archetype-workspace role-operator cluster-core product-anclora-talent">
```

## 3. Ejemplos por tipo de app

### 3.1 Next.js / App Router

En `app/globals.css`:

```css
@import "@anclora/design-system/system.css";
```

En `app/layout.tsx`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="tier-premium domain-cross-domain archetype-command-center role-executive cluster-core product-anclora-command-center">
        {children}
      </body>
    </html>
  )
}
```

Para una app consumidora Premium como `anclora-talent`:

```tsx
<body className="tier-premium domain-human-capital archetype-app role-consumer cluster-core product-anclora-talent">
  {children}
</body>
```

### 3.2 Vite / React

En `src/main.tsx` o `src/index.css`:

```css
@import "@anclora/design-system/system.css";
```

En el shell principal:

```tsx
<div className="tier-internal domain-content-operations archetype-workspace role-operator cluster-core product-anclora-content-generator-ai">
  <App />
</div>
```

## 4. Cuando importar capas sueltas

Usa capas sueltas solo si la app tiene una razon clara:

`tokens/*`
- para sincronizar aliases o tooling de tema

`taxonomy/*`
- para shells avanzados con composicion manual

`components/*`
- para consumo parcial cuando la app quiere controlar explicitamente el orden de importacion

Por defecto, no hace falta. `system.css` ya agrega la capa canonica.

## 5. Reglas de adopcion

- No importar `preview/` ni `src/examples/` desde apps.
- No promover una composicion concreta de `examples/` a componente sin pasar por `patterns/`.
- No acoplar clases de producto a componentes concretos; el producto debe vivir en el shell.
- No sobreescribir tokens crudos en cada pantalla; si hace falta una excepcion real, debe justificarse como contrato o theme override.

## 6. Estado actual de empaquetado

El repo expone entrypoints CSS mediante `package.json` y `exports`.

Hoy el sistema es:

- consumible como paquete CSS
- usable desde apps reales
- todavia no empaquetado como libreria JS/React

Ese paso debe venir despues, solo si varias apps necesitan wrappers tipados encima de esta capa.

## 7. Piezas que ya no deben rehacerse en apps

Cuando una app premium o internal necesite estas superficies, debe consumirlas desde este repo o componerlas directamente con estas clases base:

- `ac-button`
- `ac-card`
- `ac-surface-panel`
- `ac-form-field`, `field-input`, `field-select`, `field-textarea`
- `ac-empty-state`
- `ac-modal-backdrop`, `ac-modal`
- `ac-theme-switcher`
- `ac-language-switcher`
- `ac-stepper`
- `ac-workspace-stage`
- `ac-workflow-shell`
- `ac-template-catalog`
- `ac-chapter-rail`
- `ac-preview-controls`
- `ac-export-suite`
- `ac-editor-shell`
- `ac-text-editor`

Si una app necesita variaciones menores:

- primero debe intentar resolverlas con taxonomia, semantic tokens o slots del patron
- no debe clonar el componente y cambiar tres colores
- si la variacion afecta anatomia, estados o motion, debe promoverse antes a `anclora-design-system`

## 8. Validacion por consumidor real

### `anclora-talent`

Estado: validado como primer consumidor premium de dominio `human_capital`.

Piezas adoptadas con consumo real:

- shell taxonomico `tier + domain + archetype + role + cluster + product`
- `button`
- `card`
- `surface panel`
- `form fields`
- `empty state`
- `modal shell`
- `theme toggle`
- `locale toggle`
- `stepper`
- `workspace stage`
- `workflow shell`
- `template catalog`
- `chapter rail`
- `preview controls`
- `export suite`
- `editor shell`
- `text editor`

Superficies ya alineadas:

- sign-in
- sign-up
- dashboard
- create project
- import document
- add chapter
- import chapter
- collaboration
- AI assistant
- editor
- preview
- cover
- back-cover

## 9. Regla de promocion a canónico

Una pieza pasa de “candidate pattern” a “canonical pattern” cuando cumple estas tres condiciones:

1. existe como primitive, component o pattern documentado en este repo
2. ya ha sido consumida por al menos una app real sin forks estructurales
3. la app consumidora no necesita semantica de producto incrustada para que funcione

Si no se cumplen esas tres condiciones:

- puede seguir existiendo como `pattern` en observacion
- puede vivir temporalmente como composicion local en la app
- no debe venderse como API compartida estable
