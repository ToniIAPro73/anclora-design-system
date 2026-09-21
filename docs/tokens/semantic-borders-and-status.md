# Semantic Borders, Status & Text Links

Versión: 0.8.0 (Wave 2.1). Motivado por evidencia real de Command Center Pilot 2 — no un rediseño de paleta, un endurecimiento de contrato semántico. Responde directamente: *¿cuándo uso `border-subtle`? ¿cuándo necesito el borde estructural/de control? ¿un status badge debe inventar su propio color de borde? ¿puedo usar el acento de producto directamente como texto de enlace? ¿una app puede definir su propio borde de peligro?*

---

## 1. Evidencia reproducida (no solo el reporte del Pilot)

Recomputado directamente desde el código actual de `anclora-command-center` con `scripts/lib/contrast.mjs`:

| Caso | Valor medido | Umbral | Resultado |
| --- | --- | --- | --- |
| `--border` (Group neutro) vs. superficie real de Command Center, oscuro | 1.63:1 | 3:1 (no-texto) | **FALLA** |
| `--border` (Group neutro) vs. superficie real de Command Center, claro | 1.29:1 | 3:1 (no-texto) | **FALLA** |
| Acento de Command Center crudo como `--text-link`, oscuro | 4.34:1 | 4.5:1 (texto) | **FALLA** |
| Acento de Talent crudo como `--text-link`, oscuro | 4.75:1 | 4.5:1 (texto) | pasa, sin margen real |
| Acento de Talent crudo como `--text-link`, claro (por eso Talent ya lo sobreescribe a mano) | 2.69:1 | 4.5:1 (texto) | **FALLA** |

**Talent como segunda evidencia independiente:** Talent ya resolvió el mismo problema por su cuenta, en el tema opuesto — `--text-link` oscuro usa su acento crudo (funciona, por poco), pero en claro lo sobreescribe manualmente a `#2C729F` (un acento oscurecido) precisamente porque el crudo falla. Dos consumidores reales, cada uno con el problema en un tema distinto según la luminancia de su propio acento — la evidencia confirma que esto no es un caso aislado de Command Center, es una debilidad estructural de la fórmula `--text-link: var(--accent)`.

**Necesidad de borde de status:** confirmada en `components/status-badge.css` — la regla base `.ac-status-badge` ya reserva `border: 1px solid transparent` en TODAS las variantes; `--neutral`/`--muted` ya rellenaban ese slot con color real, pero `--success/--warning/--danger/--info` lo dejaban transparente. Esto no es anatomía nueva, es cerrar un hueco que la propia base ya anticipaba.

---

## 2. Modelo de bordes: cuatro roles, no una sola garantía

| Rol | Token | Propósito | ¿Garantía de contraste? | Consumidores permitidos |
| --- | --- | --- | --- | --- |
| **A. Decorativo/sutil** | `--border-subtle` | Separación visual donde el componente/superficie sigue siendo identificable sin el borde (divisores de fila, reglas de sección) | Ninguna — puede ser deliberadamente de bajo contraste | Cualquiera; es el valor por defecto correcto cuando hay duda |
| **B. Estructural/control** | `--border-control` **(nuevo, 0.8.0)** | Necesario para reconocer un control, panel o elemento interactivo como tal | **WCAG 2.2 no-textual: ≥3:1** contra la superficie sobre la que se pinta | Inputs/selects/textareas (ya migrado); cualquier componente futuro donde el borde sea la única/principal señal de límite |
| **C. Fuerte** | `--border-strong` (existente) | Énfasis, estructura seleccionada/enfocada, separación de alta jerarquía | Ya ≥3:1 por construcción (deriva de `--line-strong`) | Casos de énfasis explícito |
| **D. Estado** | `--status-{success,warning,danger,review}-border` **(nuevo, 0.8.0)** | Parte de la comunicación de éxito/aviso/peligro/info — refuerzo no-solo-color | **≥3:1** contra la superficie del badge, verificado por tono | Solo `.ac-status-badge--*`; no crear un tono nuevo localmente |

El modificador público `.ac-status-badge--info` conserva el vocabulario semántico histórico `review`: usa `--status-review-surface`, `--status-review-text` y `--status-review-border`. No existe un segundo conjunto `--status-info-*`.

**Regla de aplicación explícita (no "todo borde visible necesita 3:1"):** la garantía de contraste no-textual de WCAG 2.2 (1.4.11) aplica cuando el borde es **necesario para percibir el componente o su estado** — no a cualquier línea decorativa. Un divisor de fila en una tabla, o el borde de un Modal cuya elevación/sombra/backdrop ya lo distinguen claramente, no necesitan esa garantía. Un campo de formulario sin ningún otro indicador de "esto es editable" sí la necesita.

### Por qué `--border-control` es un token nuevo, no `--border-default` reforzado

`--border-default`/`--border` no se tocan — siguen siendo el valor decorativo neutro que siempre fueron (evitar romper el aspecto visual de ~30 apps que nunca pidieron un borde más fuerte). En vez de eso, `--border-control` es aditivo:

```css
--border-control: color-mix(in srgb, var(--text-primary) 50%, transparent);
```

**Por qué derivar de `--text-primary` en vez de un gris neutro fijo:** un borde neutro de alfa fija (como el `--group-border` actual) falla precisamente cuando la superficie de un producto es lo bastante saturada u oscura para que la mezcla no se separe de ella — que es exactamente lo que midió Command Center. `--text-primary` ya está garantizado a ser legible sobre su propia superficie (si no lo fuera, toda la superficie sería ilegible) — mezclarlo al 50% aterriza de forma predecible en un contraste seguro sin importar el tono exacto de la superficie del producto. Verificado ≥3.41:1 tanto contra las superficies propias de Core como contra una superficie de producto real (Command Center) y una segunda vía el fixture de `.product-anclora-command-center` ya existente en `themes/product.css`.

---

## 3. Modelo de estado (status)

Cada tono ya tenía `surface` + `text`; se añade `border`:

| Tono | Surface (sin cambios) | Text (sin cambios) | Border (nuevo) |
| --- | --- | --- | --- |
| success | `rgba(82,190,128,.18)` osc. / `rgba(56,161,105,.14)` claro | `#a9efb7` osc. / `#145c31` claro | `rgb(82,190,128)` osc. / `#145c31` claro |
| warning | `rgba(212,175,55,.16)` / `rgba(214,158,46,.16)` | `#d8bf86` / `#7a5100` | `rgb(212,175,55)` osc. / `#7a5100` claro |
| danger | `rgba(225,87,89,.18)` / `rgba(229,62,62,.12)` | `#ffb8b9` / `#b42318` | `rgb(225,87,89)` osc. / `#b42318` claro |
| info (review) | `rgba(144,206,214,.16)` / `rgba(94,197,209,.16)` | `#8fc3c7` / `#0e6b73` | `rgb(144,206,214)` osc. / `#0e6b73` claro |

**Por qué estos valores exactos, no colores nuevos:** en modo oscuro, el borde es la misma familia de color que el `surface` en su forma opaca (el RGB base del tinte translúcido). En modo claro, el borde reutiliza el color `text` — ya afinado para AA de texto, y verificado con margen amplio (6.2–8.1:1) como borde no-textual. Cero decisiones de color nuevas; solo se rellena el slot que `.ac-status-badge` ya reservaba.

**Regla explícita:** ninguna app debe inventar su propio `--status-*-border`. Si Command Center (o cualquier otro consumidor) necesita un tono que el DS no cubre, eso es evidencia para una futura extensión del propio DS, no una razón para duplicar localmente.

---

## 4. Modelo de texto de enlace

**Antes (0.7.0):**
```css
/* oscuro */ --text-link: var(--accent);        /* crudo — sin garantía */
/* claro  */ --text-link: color-mix(in srgb, var(--accent) 45%, black 55%); /* ya seguro desde 0.7.0 */
```

**Ahora (0.8.0):**
```css
/* oscuro */ --text-link: color-mix(in srgb, var(--accent) 80%, white 20%);
/* claro  */ --text-link: color-mix(in srgb, var(--accent) 45%, black 55%); /* sin cambios */
```

**Relación con el acento de producto:** un acento válido para fondos/iconos/decoración **no es automáticamente válido como texto de tamaño normal** — son requisitos de contraste distintos (3:1 no-textual vs. 4.5:1 textual), y la luminancia relativa entre un acento y su propio canvas varía por producto y por tema. La solución NO es prohibir que los productos definan su propio acento — es que el rol semántico "texto de enlace" nunca sea el acento crudo, sino una derivación con garantía de contraste. Verificado ≥5.97:1 contra el acento propio de Core y los acentos reales de Talent y Command Center, en ambos temas.

---

## 5. Impacto por componente

| Componente | Borde usado | Clasificación | Razón |
| --- | --- | --- | --- |
| `.field-input`/`.field-select`/`.field-textarea` | `--border-control` (migrado 0.8.0) | Estructural | Sin este borde, un input no tiene ninguna otra señal fuerte de ser un control editable — el tinte de fondo (92% surface-panel) es demasiado sutil por sí solo |
| `.ac-modal` (panel) | `--border-default` (sin cambio) | Decorativo/refuerzo | La elevación (`box-shadow: var(--shadow-xl)`) + el backdrop oscurecido ya distinguen claramente el modal; el borde refuerza el borde, no lo define |
| `.ac-data-table` (contenedor) | `--border-default` (sin cambio) | Decorativo/refuerzo | Mismo razonamiento que Modal — fondo distinto + posición ya lo identifican |
| `.ac-data-table` (filas) | `--border-subtle` (ya correcto, sin cambio) | Decorativo | Un divisor de fila no necesita ser el único medio de distinguir filas — el contenido y el hover ya lo hacen |
| `.ac-status-badge` (success/warning/danger/info) | `--status-*-border` (nuevo) | Estado | Ver §3 |
| `.ac-status-badge` (neutral/muted) | `--border-default`/`--border-subtle` (sin cambio) | Decorativo | Sin relleno de fondo, pero el texto ya transmite el significado; no se trató como caso crítico en esta ola |

No se auditaron individualmente los ~15 archivos de componente restantes que usan `--border-default` (topbar, sidebar-nav, tabs, etc.) — la mayoría son límites de panel/superficie con el mismo patrón que Modal (elevación o cambio de fondo ya hace el trabajo). Se aplicó el mismo criterio de "¿la elevación/superficie ya define el límite?" sin migrar cada uno individualmente, para no convertir esta ola en un rediseño global de bordes. Un caso concreto que necesite `--border-control` en el futuro se atiende cuando aparezca evidencia real, no por anticipación.

---

## 6. Reglas prohibidas (para agentes y humanos)

- Inventar un color de borde de estado local en vez de usar `--status-*-border`.
- Usar el acento de producto crudo como texto de tamaño normal sin verificar contraste.
- Usar `--border-subtle`/`--border-default` donde el reconocimiento del componente depende de que el borde sea visible.
- Fortalecer `--border-subtle` o `--border-default` globalmente para resolver el problema de un solo componente — usar `--border-control` en ese componente en su lugar.
- Que una app defina su propio `--danger`/`--success`/`--warning`/`--info` border — si el tono no alcanza, es evidencia para el DS, no una razón para duplicar.

## 7. Seguimiento de consumidores

### Command Center — reconciliación posterior, no incluida en 0.8.0

| Implementación local | Estado para una futura migración | Decisión |
| --- | --- | --- |
| Mapeo local de borde neutro | `CAN_ALIAS_TO_DS` | Usar `--border-control` solo donde el límite sea estructural; mantener `--border-subtle`/`--border-default` donde sea decorativo. |
| Línea/borde fuerte local | `CAN_ALIAS_TO_DS` | Mapear a `--border-strong` cuando el significado sea énfasis estructural; conservar excepciones visuales de producto justificadas. |
| `--status-*-border` local | `CAN_REMOVE` | El Badge canónico ya consume la paleta de estado del DS. |
| `--text-link` local | `CAN_ALIAS_TO_DS` | Consumir `--text-link` tras validar el canvas concreto; no usar el acento crudo como texto normal. |

### Talent

Impacto inmediato: ninguno mientras el consumidor siga fijado a su contrato actual. En una migración futura deberá reconciliar sus `--border-*` de workspace y su sustitución clara de `--text-link` con los roles semánticos del DS; sus bordes de marca/editorial y exportación pueden seguir siendo específicos del producto cuando no representen un control del Core.

---

## 8. Ejemplo de fixture de producto (perfil existente, no valor Core)

`scripts/verify-theme-contrast.mjs` valida `--border-control` y `--text-link` no solo contra las superficies propias de Core sino contra `.product-anclora-command-center` — un perfil de producto **ya existente** en `themes/product.css` (mecanismo de perfil real, no valores canónicos de Core) cuyo `--accent` (`#6c63ff`) coincide con el valor real medido en el Pilot 2. Esto demuestra que la solución funciona bajo una variación legítima de superficie de producto, no solo bajo la paleta neutra de Core.
