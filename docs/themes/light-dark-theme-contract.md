# Light/Dark Theme Contract

Versión: 0.7.0 (Wave 1.6). Este documento responde directamente: **¿cómo implementa correctamente una app nueva de Anclora el modo claro/oscuro?** La respuesta no debería exigir copiar un bloque de tokens de `anclora-talent` o `anclora-command-center` — debería bastar con consumir el contrato de este documento.

---

## 1. API pública de tema

Un único atributo en `<html>`:

```html
<html data-theme="dark">   <!-- o -->
<html data-theme="light">
```

- Sin atributo → el paquete cae en `:root`, que hoy son los mismos valores que `[data-theme="dark"]` (ver §2, compatibilidad retroactiva).
- El selector es un **atributo**, no una clase (`.dark`/`.light`). Razón (heredada de `ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §4): funciona igual en Next.js SSR, Vite/React puro y HTML estático, y ya era el mecanismo mayoritario real observado en el ecosistema.
- No hay un tercer valor. Un consumidor no debe inventar `data-theme="auto"` ni un mecanismo de persistencia incompatible — puede decidir *cuándo* aplicar `"dark"`/`"light"`, no *cómo* se representan.

## 2. Comportamiento por defecto y compatibilidad retroactiva

```css
:root,
[data-theme="dark"] {
  /* ... valores dark ... */
}

[data-theme="light"] {
  /* ... valores light ... */
}
```

`:root` conserva exactamente los valores que el paquete ya tenía antes de 0.7.0 — un consumidor que nunca toque `data-theme` no ve ningún cambio de comportamiento. `[data-theme="dark"]` comparte el mismo bloque (no es una copia separada), así que dark queda también como un valor explícito y direccionable del contrato, no solo un valor por defecto accidental.

## 3. Qué posee el Design System vs. qué posee la aplicación

| Responsabilidad | Dueño |
| --- | --- |
| Semántica visual de cada tema (qué significa "danger", "focus", "surface-elevated"...) | **Design System** |
| Detección de preferencia de sistema (`prefers-color-scheme`) | **Aplicación** |
| Persistencia de la preferencia del usuario (`localStorage`, cookie, etc.) | **Aplicación** |
| UI para que el usuario cambie de tema | **Aplicación** |
| Hidratación segura en SSR (fijar `data-theme` antes del primer render) | **Aplicación** — el DS no incluye runtime JS; ver patrón de referencia abajo |
| Aplicar `data-theme="dark"` o `"light"` en `<html>` en el momento que decida | **Aplicación** |

El Design System **no** incluye lógica de persistencia ni de detección de preferencia — solo el contrato visual. Esto es deliberado (ver `ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §4): cada framework/entorno de hidratación es distinto, y forzar una implementación de runtime rompería la promesa CSS-first del paquete.

**Patrón de referencia para hidratación segura** (evita el bug de hydration mismatch que ya ocurrió una vez en `anclora-talent`): un script inline, antes del primer render, que lee `localStorage`/`matchMedia` y fija `data-theme` en `<html>` de forma síncrona. Implementaciones reales ya correctas: `anclora-advisor-ai` (`AppPreferencesScript.tsx`) y `anclora-energyscan` (`layout.tsx`).

## 4. Qué capa posee cada cosa (tokens)

```
Primitivo          (--group-canvas-light, --coin-group — sin significado semántico)
      ↓
Semántico           (--bg, --text-primary, --status-danger-text — significado, theme-aware)
      ↓
Componente          (--ac-button-bg — solo donde el componente necesita variación)
      ↓
Perfil/Producto      (.product-anclora-* — identidad de marca, independiente del tema)
```

**El tema (light/dark) vive en la capa semántica.** La identidad de marca/producto (`.product-anclora-nexus`, `.product-anclora-portfolio`, etc., en `src/themes/product.css`) es un eje **distinto y ortogonal**: cada producto tiene su propia paleta de marca, y esa paleta permanece igual independientemente de si `data-theme` es `"light"` o `"dark"` — porque en la cascada real, las reglas `.product-anclora-*` se importan después de los bloques `[data-theme]` en `system.css`, así que ganan para sus propios tokens. Confirmado en vivo: con `data-theme="light"` activo globalmente, `.product-anclora-nexus` sigue resolviendo `--bg: #0f1629` (su identidad oscura de marca), sin cambios.

**`--accent` no tiene variante `-light`.** Es un valor de marca, no de tema — el mismo acento se usa en ambos temas (confirmado como patrón real: el comentario de `anclora-talent` dice literalmente "same contractual hex values as dark" para su acento en modo claro). Lo que sí cambia por tema son los **usos derivados** del acento (`--text-link`, `--focus-ring`, `--text-on-accent`) — porque el mismo valor de acento puede fallar el contraste de texto en un fondo claro cuando no fallaba en uno oscuro (verificado: el acento plata crudo de Core da 2.04:1 como texto sobre canvas claro — falla AA; oscurecido vía `color-mix(in srgb, var(--accent) 45%, black 55%)` da 7.62:1).

## 5. Qué puede sobreescribir un Perfil/Producto — y qué no

(Reafirma `design-system.manifest.json#profiles` y `ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §7.)

**Permitido:** el acento de marca (`--accent`, vía `.product-anclora-*`), y — dentro de esa capa de producto — puede redefinir superficies/texto completos si la identidad de marca lo exige genuinamente (ejemplo real y legítimo: `anclora-portfolio` usa un canvas claro como identidad permanente de marca, no como modo claro conmutable — ver `src/themes/product.css`).

**Prohibido para un Perfil/Producto:**
- Redefinir el **significado** de un rol semántico (que `--status-danger-text` deje de significar "peligro").
- Inventar un tercer estado de tema.
- Sobreescribir `--focus-ring`/comportamiento de foco por razones estéticas (accesibilidad, no negociable).
- Duplicar manualmente un valor ejecutable que ya vive en `anclora-design-system` en lugar de consumirlo (ver hallazgo de Fase 5: el token `--danger` compartido de `anclora-vault` ya diverge del real del DS — no repetir ese patrón).

## 6. Accesibilidad

Base: **WCAG 2.2 AA**. Cada par crítico texto/fondo del tema claro está verificado — no a ojo — por `scripts/verify-theme-contrast.mjs` (matemática de luminancia relativa WCAG pura, sin dependencias; ver `scripts/lib/contrast.mjs`):

| Par | Ratio | Mínimo AA |
| --- | --- | --- |
| `text-primary` sobre `surface-canvas` | 16.88:1 | 4.5:1 |
| `text-secondary` sobre `surface-canvas` | 6.76:1 | 4.5:1 |
| `text-link`/`text-eyebrow` (fg3) sobre `surface-canvas` | 7.62:1 | 4.5:1 |
| `text-on-accent` sobre `action-primary-bg` | 8.26:1 | 4.5:1 |
| `border-strong` sobre `surface-canvas` (contraste no-textual) | 3.74:1 | 3:1 |
| `focus-ring` sobre `surface-canvas` (contraste no-textual) | 4.48:1 | 3:1 |
| `status-danger-text` sobre `status-danger-surface` | 5.14:1 | 4.5:1 |
| `status-success-text` sobre `status-success-surface` | 6.43:1 | 4.5:1 |
| `status-warning-text` sobre `status-warning-surface` | 5.68:1 | 4.5:1 |
| `status-review-text` sobre `status-review-surface` | 5.18:1 | 4.5:1 |

**Limitación conocida, no oculta:** `border-default`/`border-subtle` en modo claro **no** alcanzan 3:1 por sí solos (siguen el patrón real de `anclora-talent`, alfa baja ~0.10-0.12) — se apoyan en diferencias de fondo/espaciado, no en el borde como único indicador de límite de componente. Si un componente futuro depende del borde como ÚNICA señal perceptible de un límite interactivo, ese caso necesita `border-strong` (sí verificado a 3:1), no `border-default`.

Verificación en navegador real (axe-core, no solo matemática): `scripts/verify-browser.mjs --mode=a11y` ahora ejecuta un pase adicional contra `components-canonical.html` con `data-theme="light"` forzado — 0 violaciones en la ejecución de esta release.

## 7. Ejemplos

```html
<!-- Consumo mínimo -->
<html data-theme="light">
  <head>
    <link rel="stylesheet" href="@anclora/design-system/system.css" />
  </head>
  <body>
    <button class="ac-button ac-button--primary">
      <span class="ac-button__label">Acción principal</span>
    </button>
  </body>
</html>
```

```js
// Hidratación segura (patrón de referencia, no incluido en el paquete)
(function () {
  var stored = localStorage.getItem('anclora.theme_mode');
  var theme = stored || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();
```

Catálogo interactivo real (no una captura estática): `preview/components-canonical.html` — el botón "Toggle light/dark theme" en la parte superior conmuta `data-theme` en vivo sobre la sección "Semantic foundations, both themes", la matriz de Button y las muestras de Modal/StatusBadge/EmptyState.

## 8. Alcance explícitamente excluido de esta versión

- **Sombras (`--shadow-*`)**: siguen siendo primitivos invariantes por tema (base negra, mismo valor en ambos temas) — una sombra negra funciona razonablemente en ambos fondos, y redefinir la escala de sombra por tema es una iteración futura, no parte de esta base semántica. Documentado aquí para que no se lea como un descuido.
- **Editorial accent references**: Wave 10 reconciles the former undefined `--accent-mint` references in `editorStudio.css`/`editorShell.css`/`textEditor.css` to the existing semantic `--accent` owner. No new token or product palette is introduced.
- **Migración de consumidores**: ni `anclora-talent` ni `anclora-command-center` se tocan en esta ola — sus paletas locales de modo claro (evidencia real que informó este contrato) permanecen intactas. Adoptar este contrato central es una decisión de pilot futura, no automática.
