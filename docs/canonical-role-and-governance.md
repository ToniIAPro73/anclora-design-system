# Canonical Role And Governance

Fecha: 2026-08-17
Repositorio: `anclora-design-system`
Contexto: `ECOSYSTEM_CORE_ONBOARDING` — formalización del rol canónico en AKG v0.1.

## 1. Rol canónico

`anclora-design-system` se formaliza como **TRANSVERSAL UI STANDARD**, no como "otro producto" del ecosistema. En AKG v0.1 esto se representa con tres entidades para el mismo repo, cada una con su propósito:

| Entidad AKG | Propósito |
| --- | --- |
| `Repository` (`repo:ToniIAPro73/anclora-design-system`) | Checkout, visibilidad, releases — hechos técnicos de repositorio. |
| `Product` (`product:design-system`) | Encaje en el portafolio (business unit, estado). |
| `Standard` (`std:anclora-design-system`) | **Nuevo en esta fase** — formaliza que este repo no es una app de negocio, sino el estándar ejecutable de UI que otras apps deben consumir. |

Esta triple representación ya existía parcialmente (Repository + Product, vía la extracción genérica de `ecosystem-repos.json`); esta fase añade la entidad `Standard` porque el schema AKG v0.1 ya la soporta (`entity.schema.json` → enum `type` incluye `Standard`) y porque `std:aos-adoption-standard` ya establecía el precedente de usar este tipo de entidad para estándares transversales de gobernanza.

## 2. Qué gobierna

- Tokens de marca y UI (`src/tokens/`)
- Foundations (tipografía, primitives) (`src/foundations/`)
- Taxonomía tier/domain/archetype/role/clusters (`src/taxonomy/`)
- Componentes compartidos (`src/components/`) — ver estado de canonicidad por pieza en [`validated-consumers-matrix.md`](./validated-consumers-matrix.md)
- Patterns visuales por dominio (`src/patterns/`)
- Motion primitives y reglas de `prefers-reduced-motion`
- Assets compartidos (`assets/logos/`, `fonts/`)

Fuente extendida y ya canónica de este alcance: [`design-system-operating-model.md`](./design-system-operating-model.md) (frontera formal con la Bóveda/Vault) y [`tier-taxonomy-and-transformations.md`](./tier-taxonomy-and-transformations.md) (familias y transformaciones admitidas).

## 3. Qué NO gobierna

- Lógica de negocio o de producto de las apps consumidoras.
- Contratos legales, de compliance o de AI Act (fuente: `anclora-vault/50-compliance/`, `anclora-vault/00-governance/contracts/`).
- Decisiones de arquitectura de aplicación de cada app (fuente: SDD local de cada repo).
- Infraestructura de despliegue, AOS runtime o Knowledge/AKG.

## 4. Tokens, componentes, familias, tiers, dominios (hallazgos ya auditados, no re-auditados aquí)

- **Familias / accentos**: 3 familias de marca, 14 variantes de acento — hallazgo ya validado, fuente: auditoría previa registrada en `anclora-vault/00-governance/registry/ecosystem-repos.json` (`anclora-design-system.design_system_facts`) y detallado por tier en [`tier-taxonomy-and-transformations.md`](./tier-taxonomy-and-transformations.md) (familias `internal` / `portfolio` / `premium` / `ultra premium` con sus transformaciones admitidas — el documento de tiers detalla 4 tiers de aplicación, no en contradicción con las 3 familias de marca/accento que son un eje distinto de clasificación).
- **Taxonomía**: `tier` × `domain` (más `archetype`, `role`, `clusters` como ejes adicionales ya implementados en `src/taxonomy/`).
- **Estado de reuse**: `PARTIAL_REUSE` — CSS puro y maduro en tokens/foundations/components/patterns, adopción real casi nula (ver sección 6 y [`consumer-status-map.md`](./consumer-status-map.md)).

## 5. Branding variants — gaps confirmados (no inventados)

Dos unidades de negocio confirmadas sin variante de marca formalizada en el design system:

| Unidad | Estado |
| --- | --- |
| Consulting | `MISSING_VARIANT` |
| Labs / I+D | `MISSING_VARIANT` |

No se crean tokens ni variantes para estas unidades en esta fase — solo se registra el gap (`anclora-vault` → `ecosystem-repos.json` → `anclora-design-system.design_system_facts.missing_variants`). Las familias/acentos existentes permanecen intactas.

## 6. Accesibilidad

Ejes ya cubiertos por el sistema de tokens: `prefers-reduced-motion` (motion primitives), contraste por tema (light/dark) en tokens semánticos. No se ha ejecutado en esta fase una auditoría WCAG formal — pendiente, fuera de alcance de `ECOSYSTEM_CORE_ONBOARDING`.

## 7. Versionado

`design-system.manifest.json` declara `"version": "0.3.0"` con entrypoints CSS explícitos por capa (tokens, taxonomy, themes, foundations, components). No existe todavía changelog semántico formalizado por pieza — `CHANGELOG.md` en la raíz del repo cubre el repo en conjunto, no piezas individuales. Ver [`quality-and-verification.md`](./quality-and-verification.md) para el proceso de verificación previo a bump de versión.

## 8. Consumer contract

Regla operativa (ya establecida en [`validated-consumers-matrix.md`](./validated-consumers-matrix.md)):

- Una pieza en estado `canonical` **debe** consumirse desde este repo — no debe rehacerse localmente.
- Una pieza en estado `candidate` puede usarse como referencia, pero no debe imponerse como API estable sin al menos un consumidor real.
- Ver [`consumer-status-map.md`](./consumer-status-map.md) para el mapa de consumidores por repo (no por pieza) usado en `ECOSYSTEM_CORE_ONBOARDING`.

## 9. AOS Adoption — Not Applicable (propuesta de extensión)

`anclora-design-system` es un **shared CSS package/library**, no una aplicación con runtime propio. No existe hoy un `AOS_ADOPTION_STANDARD.md` canónico en la vault que defina el enum completo de `Adoption Status` (el `Standard` `std:aos-adoption-standard` en AKG referencia `00-governance/operating-model/AOS_ADOPTION_STANDARD.md`, que no existe todavía como documento). Ante esa ausencia, esta fase **propone** `Not Applicable` como valor válido para repos que son library/package sin runtime, en lugar de forzar `Adopted`/`Adopted With Exceptions` (que implicarían un runtime gestionable que no existe) o dejar `unknown` (que subestima el hecho de que sí hay una declaración local explícita). Esta propuesta queda registrada aquí y en `anclora-infrastructure/audit/ecosystem-core-onboarding/02_COMMAND_CENTER_AOS_ADOPTION.md` — no se ha creado el documento canónico `AOS_ADOPTION_STANDARD.md` en esta fase (fuera de alcance), solo se deja la propuesta explícita en vez de inventar el valor silenciosamente.

Diferencia documentada: **runtime app** (tiene proceso gestionable por AOS, ej. `anclora-filestudio`) vs **shared package/library** (se importa/consume, no se ejecuta como servicio — este repo).
