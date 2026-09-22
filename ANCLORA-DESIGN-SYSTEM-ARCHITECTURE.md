# Anclora Design System — Target Architecture

Fecha: 2026-09-21
Basado en: `docs/ecosystem-audit/00-frontend-inventory-and-drift-audit.md` (Fases 0-2.5) y `docs/ecosystem-audit/01-product-taxonomy.md` (Fase 3).
Estado: propuesta de arquitectura objetivo, decisiones tomadas bajo la dirección de producto del propietario (ver mandato de la misión). Implementación real (Fase 6) descrita en `docs/ecosystem-audit/03-implementation-log.md`.

---

## 1. Modelo objetivo (una sola jerarquía canónica)

```
ANCLORA DESIGN SYSTEM
│
├── Core Foundations      (primitivos: color, spacio, radio, tipografía, elevación, motion)
├── Semantic Tokens        (danger/success/warning/focus/disabled — significado, no valor crudo)
├── Core Components        (anatomía + estados + a11y — Button, Card, Modal, DataTable, StatusBadge, ...)
├── Shared Patterns         (composiciones reutilizables: workspace shell, entry hero, executive summary)
├── Product Profiles         (P-MKT, P-WKS — controlan densidad/navegación/shell, NO significado semántico)
└── Product Extensions        (lo genuinamente específico de cada app — vive en el repo de la app, no aquí)
```

No hay una "segunda fuente de verdad" visual. `@anclora/ui` (fiscal) y las adopciones independientes de shadcn/ui en 9 repos son **evidencia de ingeniería útil**, no arquitecturas paralelas legítimas — ver §9 y §10.

---

## 2. Fuente de verdad (Source of Truth)

| Repo | Autoridad sobre | No autoridad sobre |
| --- | --- | --- |
| `anclora-governance` | quién decide, por qué, proceso de decisión, políticas | valores concretos de tokens/componentes |
| `anclora-vault` | documentación curada, racional de marca, activos, histórico | **no debe mantener una copia manual independiente de un valor ejecutable** — donde vault documenta hoy un token/color/radio que también vive en código, la Fase 5 reemplaza la copia manual por una referencia (o documentación generada) a `anclora-design-system` |
| `anclora-design-system` | **autoridad ejecutable canónica**: foundations, tokens semánticos, temas, contratos de componente, shared patterns, product profiles | lógica de negocio, contratos de cumplimiento (eso es vault/governance) |
| `anclora-infrastructure` | tooling, automatización, distribución, validación, enforcement de CI | valores de diseño |
| apps consumidoras | composición específica de producto, extensiones genuinamente locales | no deben redefinir significado semántico ni anatomía base de un componente Core (ver Fase 2.5, hallazgo `.ac-button` de talent) |

Esto no cambia el modelo de autoridad de 3 niveles que `anclora-governance/README.md` ya declara (constitución → registro operativo delegado → autoridad local ejecutable) — lo hace más preciso *dentro* de la capa de UI: gobernanza define reglas, DS define qué/cómo visual, infraestructura hace cumplir, apps consumen.

---

## 3. Tokens: jerarquía y regla de sobreescritura

```
Primitive Tokens        (--red-500, --space-4, --radius-md — sin significado semántico)
      ↓
Semantic Tokens          (--status-danger-*, --focus-ring, --text-primary — significado, tema-consciente)
      ↓
Component Tokens          (--ac-button-bg, --ac-button-fg — solo donde un componente necesita variación controlada)
      ↓
Profile Overrides          (P-WKS puede pedir --ac-button-density: compact; P-MKT puede pedir --hero-spacing-scale: loose)
      ↓
Product Accent/Extension    (--accent app-específico, ya existente en `src/tokens/semantic.css` por producto)
```

**Regla:** las apps consumen tokens semánticos o de componente, no primitivos crudos. Un valor ejecutable (color, radio, estado de componente) tiene **un** lugar de mantenimiento manual: aquí. Vault puede documentar *por qué* existe un valor; no debe declarar el valor de forma independiente y editable (ver reconciliación del token `--danger`, Fase 5).

No se sobre-tokeniza cada declaración CSS — se prioriza la estabilidad semántica sobre la cobertura exhaustiva (instrucción explícita del propietario).

**Actualización 0.8.0 (Wave 2.1):** la capa semántica de color gana un modelo explícito de roles de borde (decorativo/estructural-control/fuerte/estado) en vez de un único `border-default` implícitamente decorativo — evidencia real de Command Center Pilot 2 demostró que un borde neutro de alfa fija puede caer por debajo de 3:1 contra una superficie de producto legítima (1.63:1 oscuro / 1.29:1 claro medido). `--text-link` también se corrigió en tema oscuro: ya no resuelve al acento crudo (`var(--accent)`), que dos consumidores reales midieron por debajo del mínimo AA de texto en al menos un tema cada uno. Detalle completo, evidencia y contrato de uso: `docs/tokens/semantic-borders-and-status.md`.

---

## 4. Temas (Light/Dark) — contrato público único

**Evidencia del problema real:** el ecosistema usa hoy al menos 5 mecanismos distintos sin coordinación: `data-theme` (atributo), `.dark`/`.light` (clase), `next-themes` (librería), `ThemeContext` a medida (React Context), y — en 3 repos — configuración presente pero nunca invocada ("tema fantasma", Fase 2.5/Taxonomía).

**Contrato público canónico elegido:**

- **Atributo `data-theme="light"|"dark"` en `<html>`**, no clase. Razón: es agnóstico de framework (funciona igual en Next.js SSR, Vite/CRA con React puro, y HTML estático como `job-portfolio`), y ya es el mecanismo mayoritario real observado (talent, groundsync, guesthub-vía-clase-pero-compatible, data-lab, shiftimport, synergi, group, todos usan o pueden migrar a esto sin fricción). Las clases `.dark`/`.light` quedan como alias CSS opcionales para compatibilidad con librerías (shadcn/Tailwind `darkMode:'class'`) — el DS expone ambos selectores en su CSS pero el **contrato público de la app** es el atributo.
- **Preferencia del sistema:** `prefers-color-scheme` como default cuando no hay preferencia explícita guardada.
- **Preferencia explícita del usuario:** persistida en `localStorage` bajo una clave namespaced por app (`anclora.theme_mode`, patrón ya usado en `advisor-ai`) — el DS documenta la clave recomendada pero no la impone a nivel de código (cada app controla su propio storage).
- **Hidratación segura SSR:** un script inline pre-hidratación que lee `localStorage`/`matchMedia` y fija `data-theme` en `<html>` antes del primer render — patrón ya implementado correctamente en `anclora-advisor-ai` (`AppPreferencesScript.tsx`) y `anclora-energyscan` (`layout.tsx:45-61`); se documenta como snippet de referencia en el DS en vez de que cada app lo reinvente con matices sutiles (fuente de bugs de hydration mismatch — visto en `anclora-talent` en trabajo previo de este mismo proyecto).
- **Tokens semánticos conscientes de tema — IMPLEMENTADO (0.7.0, Wave 1.6).** Esta sección pasó por dos estados documentados: originalmente (Fase 4) afirmaba, incorrectamente, que la estructura ya existía; el 21/09 una auditoría dedicada corrigió eso a "gap genuino, solo modo oscuro". Wave 1.6 implementó el gap: `src/tokens/semantic.css` tiene ahora bloques dark/light reales, con cada par texto/superficie crítico verificado contra WCAG 2.2 AA por `scripts/verify-theme-contrast.mjs`. Wave 10 también eliminó el último token canónico no definido al reconciliar los antiguos usos de `--accent-mint` con el propietario semántico existente `--accent`. Lo que permanece explícitamente fuera de esta base es la redefinición por tema de `--shadow-*`.

Las apps consumidoras no deben inventar su propia semántica de tema (p. ej. un tercer estado además de light/dark, o un mecanismo de persistencia incompatible) — pueden elegir *cuándo* activarlo, no *cómo* se representa. **Esta regla describe el objetivo; hoy, sin tokens claros en el DS, cada consumidor ya inventa necesariamente su propio "cómo" para el modo claro — ver gap arriba.**

---

## 5. Arquitectura de componentes: CSS-first con wrappers React opcionales

**Evidencia para decidir:** el ecosistema es predominantemente React (24/25 apps), con Next.js y Vite coexistiendo en proporciones similares, y 9/25 apps ya adoptaron shadcn/ui (componentes Radix headless + Tailwind) de forma independiente. El DS actual es **CSS puro sin build step** (verificado: sin Vite/tsup en devDependencies, solo Playwright para verificación), consumido hoy por los 2 consumidores reales vía clases (`anclora-command-center` incluso ya envuelve las clases en componentes React finos, `src/ui/Button.tsx`, sin CSS propio).

**Decisión:** mantener **CSS/tokens como el contrato canónico** (no reescribir el DS como librería de componentes React) y añadir **wrappers de referencia opcionales** (no obligatorios) para React, siguiendo el patrón ya validado en `command-center/src/ui/`. Razón:

- Migrar a componentes React obligaría a fijar una versión de React/framework en el DS, lo cual no es viable dado que Next 14/15/16 y Vite 5/6/7 coexisten activamente en el ecosistema (ver inventario) — un componente React compilado tendría fricción de versiones que el CSS puro no tiene.
- El patrón "headless primitive (Radix, ya presente en 9 apps vía shadcn) + CSS del DS" es viable sin que el DS dependa de Radix directamente: el DS documenta *qué* clases/custom properties debe producir un componente shadcn generado localmente para ser "Anclora Button" en vez de "shadcn Button genérico" — igual que talent ya hace con `.ac-button--primary` sobre las custom properties del componente CSS.
- Los wrappers React de referencia (`Button.tsx`, `Modal.tsx`, etc., análogos a los de command-center) se publican como *ejemplo/plantilla* en `src/examples/`, no como paquete obligatorio — reduce el riesgo de que agentes de código autónomos (ver gobernanza IA, §12) generen wrappers inconsistentes entre apps.

**Trade-off aceptado:** sin componentes React empaquetados, cada app sigue escribiendo su propio wrapper delgado. Se mitiga documentando el patrón de wrapper de referencia y añadiéndolo al manifest legible por agentes.

---

## 6. Distribución (packaging)

**Estado actual:** `private: true`, consumo vía tarball de GitHub pineado a un commit SHA (`https://codeload.github.com/.../tar.gz/<sha>`). Evidencia: funciona hoy en los 2 consumidores reales, sin infraestructura adicional.

**Evaluación de alternativas:**

| Opción | Encaje con el entorno real (equipo pequeño, ~30 repos independientes, agentes de código, necesidad de versiones deterministas) |
| --- | --- |
| A. Mantener tarball de GitHub pineado | **Elegida.** Determinista (SHA fijo), cero infraestructura nueva, ya probado en 2 consumidores reales, npm/pnpm/yarn lo resuelven de forma nativa. |
| B. GitHub Packages / registro privado | Añade autenticación de registro por repo/CI, rotación de tokens, y un paso de publicación — sobrecarga operativa no justificada por 2 consumidores reales hoy. |
| C. Monorepo/workspace único | Requeriría fusionar ~30 repos independientes en un monorepo — cambio masivo, fuera de alcance de esta misión y del principio de "no big-bang migration". |
| D. Otra distribución simple | No se identificó una opción D con mejor relación esfuerzo/beneficio que A en el estado actual. |

**Disparador de evolución futura (documentado, no ejecutado ahora):** si el número de consumidores reales supera ~6-8 apps, o si agentes de código autónomos empiezan a fijar versiones con frecuencia suficiente para que "actualizar el SHA a mano" se vuelva un cuello de botella operativo, reevaluar la opción B (GitHub Packages) — es la siguiente opción de menor fricción dado que ya se usa GitHub como origen.

---

## 7. Perfiles de producto (resumen — detalle completo en Fase 3)

- **P-MKT (Marketing/Landing, 5 apps):** shell sin sidebar, narrativa de scroll único, densidad baja, sin auth por defecto.
- **P-WKS (Workspace/Operational, 18 apps):** shell persistente, densidad alta, autenticado, tablas/modales/badges. Perfil dominante — coincide con los componentes que el DS ya shipea.
- **Core/default (2 apps):** sin perfil, componen Core directamente.

Un perfil controla shell/navegación/densidad/defaults de composición. Un perfil **no** puede redefinir significado semántico de color, radios base, tipografía base, comportamiento de foco/disabled, ni anatomía de componente Core — solo puede pedir *variantes sancionadas* (ver Fase 2.5, regla de absorción sobre `.dashboard-button`).

---

## 8. Shared Patterns (composiciones reutilizables, no perfiles)

Ya existen en `src/patterns/{entry,executive,workspace}/` con estado documentado en `validated-consumers-matrix.md` (7 patrones `canonical` en `workspace/`, 2 `candidate` en `entry/`, 1 `candidate` en `executive/`). Se mantienen como capa intermedia entre Core Components y Product Profiles. Dos candidatos nuevos identificados por esta auditoría (no implementados en Fase 6, registrados para trabajo futuro):

- **Conversational pattern** (mensaje/stream + composer) — candidato desde `anclora-advisor-ai`, sin segundo consumidor real todavía. No se promueve (regla de absorción: necesita al menos un segundo consumidor).
- **Real-time/call UI pattern** (control bar, participantes, setup) — candidato desde `anclora-linguo-cam`, mismo caso, sin segundo consumidor.

---

## 9. `anclora-fiscal` / `@anclora/ui`

No se convierte en un segundo DS canónico (decisión explícita del propietario). Se documenta como referencia de ingeniería: `packages/ui/` de fiscal es, en este ecosistema, el único ejemplo real de un paquete con componentes *probados* (`.test.tsx` junto a cada componente) y `exports` formal por subpath — un patrón que el propio `anclora-design-system` no tiene (no hay tests unitarios de componente, solo verificación de manifest/HTML/browser/a11y a nivel de repo). Esta idea de ingeniería (tests co-ubicados por componente) se registra como mejora candidata para Fase 6 futura del propio DS, sin migrar fiscal. Mecanismo de migración futura de fiscal (no ejecutado en esta misión): consumir el DS central + capa de compatibilidad + mantener localmente lo genuinamente específico del dominio fiscal (campos de moneda, motor de impuestos) — decisión de *cómo* migrar se difiere.

---

## 10. shadcn/ui

Tratado como **técnica de implementación**, no como el Anclora Design System. 9 apps lo adoptaron de forma independiente (cada una con su propia paleta HSL/OKLCH vía `components.json`), lo cual es evidencia útil de que el patrón "primitivas headless de Radix + Tailwind" es viable y ya conocido por el equipo/agentes que trabajan en estos repos.

**Decisión:** el DS no prohíbe shadcn como mecanismo de generación de componentes, pero **posee el contrato público de componente y el comportamiento visual** — si una app genera un `Button` vía shadcn CLI, debe consumir los tokens semánticos/de componente de Anclora (no las paletas HSL/OKLCH por defecto de shadcn) y exponer las mismas custom properties de extensión que `.ac-button` ya define (`--ac-button-bg/fg/border/shadow`). Esto se documenta como regla en el manifest legible por agentes (§12) para que un agente de código que vaya a añadir un botón en cualquier app sepa que debe conectar el primitivo shadcn a los tokens Anclora, no a los defaults de shadcn.

---

## 11. API pública / Contrato CSS

- **Namespace de clases:** `.ac-*` para Core Components (ya establecido, se mantiene).
- **Namespace de perfiles:** nuevas variantes de componente se nombran `.ac-button--compact` (variante), no un nombre de familia nuevo como `.dashboard-button` — evita que cada app/perfil invente su propio prefijo (ver Fase 6, implementación de la variante compacta que resuelve el hallazgo P-WKS de Fase 2.5/Taxonomía).
- **Custom properties como puntos de extensión sancionados:** cualquier componente Core debe exponer sus puntos de variación como `--ac-<component>-<propiedad>` (patrón ya usado en `button.css`), nunca esperar que el consumidor sobreescriba el selector base directamente.
- **Versionado:** SemVer sobre el `version` de `package.json` (ya en 0.4.1, Keep a Changelog ya en uso) — cambio incompatible en un contrato de componente (anatomía, no color) sube minor con nota de migración; cambio de significado semántico de un token sube minor con nota; eliminación de una clase/token sube major.
- **Compatibilidad:** los cambios de Fase 6 en esta misión son **aditivos** (nueva variante, no redefinición de `.ac-button` base) — no rompen a los 2 consumidores reales existentes.
- **Responsive:** el DS no impone breakpoints — expone tokens de espaciado/tipografía fluidos (ya presente en talent: "fluid cap" pattern) y deja que cada perfil/app defina sus propios breakpoints de layout; es coherente con que P-MKT y P-WKS tienen necesidades de layout genuinamente distintas.
- **i18n:** el DS no traduce contenido (eso es responsabilidad de cada app) pero sus componentes deben soportar longitud de texto variable (botones/badges sin `white-space: nowrap` forzado donde eso rompa idiomas más largos — nota para auditoría futura de componentes existentes, no bloqueante para esta misión) y direccionalidad LTR (no se detectó ningún requisito RTL en el inventario — no se implementa soporte RTL especulativo).
- **Accesibilidad:** foco visible (`:focus-visible` con `--focus-ring`, ya presente), estados disabled con `aria-disabled` (ya presente en `.ac-button:disabled`), contraste — pendiente de verificación real con `verify:a11y` (Fase 7).

---

## 12. Modelo de consumo por agentes de IA

Ver `design-system.manifest.json` (actualizado en Fase 6) como contrato legible por máquina. Principios:

- Un agente debe poder determinar, sin leer todo el CSS: qué componentes existen y su estado (`canonical`/`candidate`/`deprecated`), qué perfil aplica a la app en la que está trabajando, qué tokens puede usar, cuándo está permitido crear una variante de perfil vs. cuándo debe quedarse local.
- El manifest existente (`design-system.manifest.json`) ya cubre entrypoints/exports — Fase 6 lo extiende con: estado de cada componente, perfiles definidos, puntos de extensión permitidos, y una lista explícita de patrones prohibidos (p. ej. "no redefinir `border-radius` en el selector base `.ac-button`; usar una variante").
- Se prefiere metadata simple (JSON) + documentación humana sobre una plataforma — no se construye un sistema de validación en tiempo real para esta misión.

---

## 13. Lo que NO cambia en esta misión

- No se migra ningún repo consumidor (`anclora-talent`, `anclora-command-center` ni ningún otro) — cambios ahí son responsabilidad de cada app en una ola futura (Roadmap, Wave 1+).
- No se modifica `anclora-governance`, `anclora-vault` ni `anclora-infrastructure` — las correcciones necesarias ahí (ruta `boveda-anclora` rota, token `--danger` desalineado) se registran como parches de seguimiento explícitos (Fase 5), no se aplican directamente.
- No se implementa cada componente posible — Fase 6 prioriza foundations/tokens/tema/primitivas core ya existentes + la variante de densidad que resuelve un hallazgo real y concreto de esta auditoría, no un catálogo completo especulativo.
