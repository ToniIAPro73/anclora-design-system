# Wave 1.5 Reconciliation — Icon-Only Contract & Light Theme

Fecha: 2026-09-21. Versión: 0.6.0 → 0.6.1 (correcciones de contrato, sin nueva funcionalidad).

---

## 1. Contradicción en las combinaciones válidas de `.ac-button--icon`

### El problema

El release 0.6.0 publicó dos afirmaciones incompatibles sobre la misma capacidad:

- `src/components/button.css` (nota de "Touch target"): *"--compact--icon está pensado para acciones secundarias de bajo riesgo en superficies densas... **no está pensado para una acción primaria o destructiva** de página."*
- `design-system.manifest.json` (`extensionPoints.button.note`): *"--icon... **compone con CUALQUIER variante y CUALQUIER densidad**"*.

Un agente de código leyendo solo el manifest concluiría que `--destructive --compact --icon` es una combinación plenamente soportada; leyendo solo el CSS concluiría que está desaconsejada. Contradicción real, no matiz.

### Resolución

Verificado contra la implementación real: **no hay ninguna restricción técnica** — las 16 combinaciones (4 variantes × 4 densidades, todas compatibles con `--icon`) están implementadas y funcionan (`--ac-button-min-height` se resuelve correctamente para cualquier combinación de clases, confirmado en `scripts/verify-button-contract.mjs`). La única distinción real es de **guía de diseño**, no de soporte técnico:

- **Regla única, ahora consistente en los 4 lugares que hablan de esto** (`button.css`, `design-system.manifest.json`, `preview/components-canonical.html`, `scripts/verify-button-contract.mjs`): `.ac-button--icon` compone con toda variante y toda densidad — ninguna combinación está bloqueada. Evitar `--destructive --compact --icon` para una acción de alta consecuencia/irreversible es **recomendación**, no restricción — un blanco de 36px sin etiqueta visible es fácil de pulsar por error para algo destructivo. Para ese caso, usar la densidad por defecto (44px) o exigir confirmación. Para una acción destructiva de bajo riesgo dentro de un flujo ya confirmado (ejemplo real añadido al catálogo: "quitar chip de filtro"), `--destructive --compact --icon` es apropiado sin más.
- Se retiró la restricción sobre `--primary --compact --icon` que la v0.6.0 agrupaba junto a destructive sin justificación — un botón primario pequeño de icono no tiene el mismo problema de seguridad que uno destructivo; agruparlos era impreciso.

### Cambios aplicados

- `src/components/button.css`: nota reescrita, deja claro "16 combinaciones... no hay combinación técnicamente bloqueada" + guía específica solo para destructive+compact.
- `design-system.manifest.json`: nota de `extensionPoints.button` alineada palabra por palabra ("compose with EVERY variant and EVERY density"), más una entrada nueva en `answersForAgents` respondiendo literalmente "¿Puedo usar --destructive --compact --icon juntos?".
- `preview/components-canonical.html`: la fila de compact icon-only ahora incluye un tercer ejemplo real (`--destructive --compact --icon`, "quitar filtro") con una nota inline explicando cuándo sí y cuándo preferir la densidad por defecto — en vez de omitir la combinación silenciosamente (que es lo que generaba la ambigüedad original).
- `scripts/verify-button-contract.mjs`: nuevas aserciones que (a) confirman que `button.css` declara "composes with EVERY variant... EVERY density", (b) confirman que el manifest dice lo mismo con las mismas palabras clave, (c) fallan si alguien reintroduce la frase contradictoria original, (d) confirman que la guía destructive+compact sigue documentada. Esto convierte la reconciliación en un contrato verificable, no solo en prosa que puede volver a divergir.

---

## 2. Estado real del tema claro (Light)

### Pregunta del mandato: ¿A, B o C?

**Respuesta: A, con elementos de C** — no es un hueco de catálogo (B es falso).

Verificado por inspección directa y exhaustiva de todo `src/` (no solo `semantic.css`):

```
grep -rn "light\|prefers-color-scheme\|data-theme" src/tokens/ src/foundations/ src/themes/
grep -rn "color-scheme" src/
```

Resultado: **cero** bloques `[data-theme='light']`, `.light`, `@media (prefers-color-scheme: light)` o `color-scheme: light` en ningún archivo de tokens/foundations/themes del paquete. Las únicas menciones de "claro" son dos primitivos de color con sufijo `-light` propios de la familia Portfolio (`--portfolio-gold-light`, `--portfolio-glass-light` — variantes puntuales, no un sistema de tema) y un comentario que confirma que las páginas de demo del propio paquete fuerzan `data-theme="dark"` (`src/themes/product.css:9`).

**Esto contradecía una afirmación de `ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §4** ("ya existe la estructura correcta en `src/tokens/semantic.css` [bloques por tema]"), que era imprecisa y se ha corregido directamente en ese documento (ver nota inline ahí, fechada 2026-09-21).

**Estado real:**
- El **paquete ejecutable** (`anclora-design-system`) es hoy **solo modo oscuro** — no existe ningún token, selector o mecanismo de tema claro que un consumidor pueda heredar.
- Los **dos consumidores reales** (`anclora-talent`, `anclora-command-center`) que sí ofrecen modo claro lo hacen **enteramente por su cuenta**: cada uno define su propia paleta clara completa, con su propio selector/atributo, sin ningún contrato, nombre de token o mecanismo compartido entre ellos ni heredado del DS. No es "el DS define la estructura y el consumidor aporta los valores de marca" (que sería un patrón sano de capa Producto sobre Core) — es que el DS no define ni siquiera *qué* tokens semánticos deberían tener contraparte clara.
- Por tanto: **no se puede afirmar soporte dual-theme completo del Design System canónico hoy.** La arquitectura objetivo (`ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §4: atributo `data-theme`, preferencia de sistema, persistencia, hidratación SSR seguro) sigue siendo el objetivo correcto — es una descripción de **hacia dónde va** el contrato de tema, no de lo que el paquete ejecuta hoy.

### Seguimiento propuesto (no ejecutado en esta misión)

**"Wave 1.6 — Light Theme Foundation"**, alcance explícitamente acotado:
1. Definir el bloque `[data-theme='light']` en `src/tokens/semantic.css` para los tokens semánticos que ya existen (colores de estado, superficies, texto) — no primitivos nuevos por producto, eso sigue siendo capa Producto.
2. Extender `preview/components-canonical.html` (y el resto del catálogo relevante) para renderizar ambos temas de verdad, no solo documentar la ausencia.
3. Actualizar `scripts/verify-browser.mjs` para correr el smoke/a11y existente también contra `[data-theme='light']`.

No se ejecuta aquí porque es trabajo de diseño real (decidir valores de color por token semántico, no solo mecanismo/documentación) — mezclarlo con esta reconciliación de contrato habría exigido tomar decisiones de marca sin evidencia de producto suficiente, exactamente el tipo de "arquitectura mayor sin evidencia" que esta serie de misiones ha evitado deliberadamente en cada fase.

---

## 3. Versión

Estas son correcciones de contrato (documentación + verificación, sin nuevo CSS ejecutable, sin cambio de comportamiento para ningún consumidor real) — versión `0.6.0` → `0.6.1` (patch, no minor: no añade capacidad nueva, corrige la descripción de la capacidad ya publicada).
