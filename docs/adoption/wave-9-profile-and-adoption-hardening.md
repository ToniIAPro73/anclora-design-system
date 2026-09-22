# Anclora Design System — Wave 9

## Profile & Adoption Hardening

Fecha: 2026-09-22  
Versión de contrato histórica: `0.15.0`
Fuente ejecutable: este repositorio (`anclora-design-system`)

> Wave 10 supersedes the overloaded adoption status model described below.
> The current normative contract is [`../release/wave-10-release-candidate.md`](../release/wave-10-release-candidate.md): use `adoptionStage` for the exclusive lifecycle stage and `referenceConsumer` as an orthogonal boolean role.

Wave 9 endurece la adopción operativa del Design System. No añade una nueva familia visual, no migra consumidores y no comienza Wave 10. El inventario machine-readable canónico está en [`ecosystem-adoption.inventory.json`](./ecosystem-adoption.inventory.json) y se referencia desde `design-system.manifest.json#adoptionContract`.

## Boundary and authority

La autoridad ejecutable permanece en `anclora-design-system`. `anclora-governance` conserva la autoridad constitucional, `anclora-vault` la referencia/rationale curada, `anclora-infrastructure` las herramientas de enforcement y cada consumidor la composición de producto, runtime, datos y permisos.

Los consumidores fueron inspeccionados en solo lectura. No se copia código de consumidores al Design System ni se modifica ningún repositorio consumidor.

Wave 9 permite documentación, manifest, exports públicos, contratos de compatibilidad, metadatos de adopción/deprecación y verificadores. No autoriza implementar Combobox, Data Grid, Context Menu complejo, Command Palette, Sidebar universal, Inspector, Stepper de producto, preview avanzada, onboarding, import flow o entity-management framework.

## Adoption status model (historical Wave 9 schema)

El estado es de migración, no de calidad de producto:

- `NOT_ADOPTED`: no hay dependencia/import público verificable.
- `PARTIAL`: existe dependencia, bridge o adopción aislada sin superficie canónica estable.
- `FOUNDATIONS`: se importan tokens, foundations o tema.
- `COMPONENTS`: se componen componentes públicos.
- `SHELL_PROFILE`: se consume shell/profile canónico.
- `PATTERNS`: se compone un shared pattern en un workflow real.
- `SUBSTANTIAL`: varias capas canónicas cubren una superficie significativa.
- `REFERENCE_CONSUMER`: evidencia validada para un perfil o contrato; nunca es fuente de verdad.
- `UNRELATED_SHARED_PACKAGE`: paquete UI local que no es este Design System.

Una aplicación puede alcanzar más de una categoría históricamente; el inventario registra el nivel más alto demostrado por evidencia de código actual.

## Ecosystem audit

La inspección actual encontró 38 repos Git bajo el workspace. Se excluye explícitamente `calculadora-fiscal-183`. Hay 33 superficies frontend/showcase, dos repos de documentación de producto, un backend-only (`anclora-identity`) y las autoridades transversales (`anclora-design-system`, `anclora-governance`, `anclora-vault`, `anclora-infrastructure`).

El hallazgo de adopción más importante es que el estado real ya no coincide con el mapa histórico: existen imports actuales en `anclora-content-generator-ai`, `anclora-group-landing` y `anclora-shiftimport`, además de Talent, Command Center y FileStudio. La matriz canónica no infiere adopción por similitud visual, nombre `Button`, shadcn ni intención declarada.

## Profile governance

Los perfiles siguen asignándose por arquetipo de interacción:

- `Core/default`: superficie compartida sin shell persistente de workspace ni narrativa pública principal.
- `P-WKS`: superficie autenticada/operativa con shell persistente, densidad informativa, entidades, formularios y estados.
- `P-MKT`: superficie pública/marketing narrativa, normalmente sin shell persistente de workspace.

La declaración determinista es `data-profile="workspace"` para P-WKS, `data-profile="marketing"` para P-MKT y ausencia de `data-profile` para Core/default. En aplicaciones mixtas, la declaración pertenece al root del layout/ruta que posee la superficie. No se anidan perfiles competidores; el layout sancionado más próximo es el propietario de la superficie. `data-theme` es independiente de `data-profile`.

La auditoría confirma consumidores de arquetipo mixto en `anclora-energyscan` y `anclora-private-estates`. La conclusión es `ROUTE_LAYOUT_SCOPE_REQUIRED`: el perfil de repositorio único no describe correctamente una aplicación que contiene rutas públicas y workspace. No se introduce un segundo sistema de perfiles; se endurece el alcance del contrato existente.

## Profile variants and extensions

- Sidebar colapsable: `EVIDENCE_REQUIRED`; mantener como `PRODUCT_EXTENSION` mientras no exista recurrencia suficiente. El DS debe ofrecer slots/anatomía, pero el estado abierto/cerrado y la persistencia siguen siendo del producto.
- P-WKS horizontal mobile navigation: `PRODUCT_EXTENSION`, válida cuando la superficie y la densidad real la justifican; no sustituye universalmente al Drawer.
- P-MKT expanded-header mobile navigation: `PRODUCT_EXTENSION`, válida para navegación narrativa pública.
- P-WKS default: Sidebar persistente → Drawer modal en viewport reducido cuando la superficie lo necesita.

Una extensión sancionada puede cambiar branding, copy, composición y comportamiento explícitamente admitido por el perfil. No puede redefinir significado semántico, focus, estados genéricos, anatomía base ni tokens internos arbitrarios.

## Local forks, bridges and headless runtimes

Clasificación operativa:

- `LEGACY_FORK`: copia o selector paralelo que se convierte en autoridad visual y duplica una capacidad canónica.
- `COMPATIBILITY_BRIDGE`: solución mínima a una limitación demostrada de bundler/legacy, documentada, con owner y condición de retirada.
- `PRODUCT_EXTENSION`: composición o branding legítimo que no reemplaza el contrato Core.
- `THIRD_PARTY_RUNTIME_ADAPTER`: Radix, Base UI, shadcn u otro runtime utilizado para focus, keyboard, portal, positioning o dismissal.
- `UNJUSTIFIED_DRIFT`: override de roles/anatomía canónica sin extensión documentada.

Evidencia actual:

- Talent: copia local de core tokens por fricción Lightning CSS/Turbopack (`COMPATIBILITY_BRIDGE`), override de anatomía `.ac-button` (`UNJUSTIFIED_DRIFT`) y `.dashboard-button` paralelo (`LEGACY_FORK`/migración futura).
- Command Center: wrappers `Button`/`Modal`/`StatusBadge` y aliases semánticos (`THIRD_PARTY_RUNTIME_ADAPTER`/`COMPATIBILITY_BRIDGE`), no fuente visual alternativa.
- FileStudio: shadcn/Base UI como runtime y bridge granular de CSS por incompatibilidad de imports anidados de Next/Turbopack (`COMPATIBILITY_BRIDGE`).
- ShiftImport: imports públicos granulares más tokens de producto locales (`COMPATIBILITY_BRIDGE`/`PRODUCT_EXTENSION`).
- Fiscal: `@anclora/ui` es un paquete interno independiente (`UNRELATED_SHARED_PACKAGE`), no un consumidor oculto del DS.

## CSS and package consumption contract

La entrada agregada recomendada sigue siendo:

```css
@import "@anclora/design-system/system.css";
```

También son públicos los imports granulares definidos en `package.json#exports`, incluyendo ahora:

```css
@import "@anclora/design-system/tokens/core.css";
@import "@anclora/design-system/tokens/semantic.css";
@import "@anclora/design-system/components/button.css";
@import "@anclora/design-system/patterns/shared-product-patterns.css";
```

Los consumidores no deben importar `src/`, `preview/`, `examples/` ni rutas internas no exportadas. `system.css` sigue siendo el contrato de una sola entrada. Un consumidor puede usar imports granulares cuando necesite controlar el orden o cuando su bundler no resuelva imports CSS anidados externos; en ese caso el bridge debe quedar documentado y no puede convertirse en una copia local de tokens/componentes.

`package.json#sideEffects` declara los CSS como side effects. `npm pack --dry-run` y `verify:adoption-contract` comprueban que los exports públicos, el manifest y el inventario no se desalineen.

Compatibilidad demostrada por evidencia disponible: Vite + React 18/19, Next + React 18/19, Tailwind v3/v4 y consumidores shadcn/Base UI. No se afirma soporte para stacks ausentes. Lightning CSS/Turbopack conserva deuda conocida: FileStudio requiere granular imports y Talent conserva una copia temporal de core tokens.

## Distribution and version compatibility

La distribución pre-v1 mantiene `KEEP_PINNED_GITHUB_SHA_FOR_V1`. La dependencia aprobada es un GitHub SHA inmutable; `development`, `main`, `latest` y tarballs de rama flotante están prohibidos. No se requiere migración a registry antes de v1 porque el paquete continúa siendo privado, el SHA ofrece reproducibilidad y los consumidores actuales ya usan ese modelo. La migración a registry es una recomendación post-v1 condicionada a release governance y CI de publicación.

Un consumidor `CURRENT` está en el contrato vigente y usa exports públicos. `SUPPORTED_OLDER` puede permanecer en un SHA anterior si los paths públicos siguen soportados y el gap está registrado. `OUTDATED` usa un API retirado o un SHA fuera del soporte documentado. `LEGACY` requiere bridge o migración específica; no se fuerza actualización global.

## Deprecation policy

Una API se depreca únicamente con evidencia de reemplazo o renombre. El manifest debe incluir `api`, `replacement`, `since`, `reason` y condición de retirada en la documentación. Debe existir al menos una release compatible de advertencia antes de retirar un alias pre-v1; no se elimina silenciosamente. Los alias `syncxml` existentes permanecen como `COMPATIBILITY_BRIDGE` hasta una decisión explícita de retirada.

## Token and theme governance

Consumidores pueden extender tokens de branding de producto y usar los puntos de extensión declarados. No pueden redefinir `--status-*`, `--focus-ring`, significado semántico, roles de contraste o tokens internos arbitrarios con hex locales. El tema canónico usa `data-theme="dark|light"`; persistencia, preferencia de sistema, switch y SSR pertenecen al consumidor. Un producto single-theme no es un defecto mientras no corrompa el modelo semántico.

## Shared Pattern maturity

- `auth-entry`: `CANONICAL`; evidencia de composición en consumidores de autenticación, runtime auth app-owned.
- `settings-section`: `CANONICAL`; composición flexible para identidad, idioma, tema, seguridad y settings de producto.
- `file-upload`: `CONSUMER_VALIDATED`; confirmado en FileStudio.
- `processing-result`: `CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE`; FileStudio adoptó la composición, pero no ejecutó conversión real por safety.
- `bulk-action-bar`: `CANONICAL_NEEDS_MORE_RUNTIME_EVIDENCE`; FileStudio tiene batch de jobs, no selección explícita checkbox.
- `destructive-confirmation`: `CONSUMER_VALIDATED`; confirmado en FileStudio con apertura/cancelación/focus return, sin mutación destructiva.

## Evidence-required review

Filter Toolbar, Combobox, Data Grid, Stepper de progresión, Inspector, Context Menu complejo, Command Palette, nested menus, workspace switcher, docking panels, mobile filter strategy, advanced file preview, onboarding, import flow y entity-management permanecen `EVIDENCE_REQUIRED` o `PRODUCT_SPECIFIC`. No se promueve ni implementa ninguno en Wave 9.

## Migration playbook

El orden canónico para futuras migraciones es:

1. preflight del repositorio y ownership de cambios;
2. identificar perfil por arquetipo y declarar `data-profile` en el layout apropiado;
3. fijar SHA inmutable;
4. importar foundations/tokens públicos;
5. reconciliar `data-theme` sin copiar tokens;
6. migrar una familia estable de primitives;
7. migrar shell/profile;
8. adoptar Shared Patterns si aplica;
9. conservar extensiones de producto justificadas;
10. eliminar forks visuales solo después de validar equivalencia;
11. validar responsive, ES/EN, keyboard y axe en navegador real;
12. ejecutar gates del consumidor;
13. registrar bridges, gaps y evidencia;
14. commit/push en la rama contractual.

No se migra todo a la vez. Una ola debe cubrir una superficie coherente, validar navegador real y recoger feedback antes de pasar a otra familia. Ante un componente local similar, el agente debe clasificarlo como `CANONICAL_REPLACEMENT`, `THIN_ADAPTER`, `PRODUCT_EXTENSION`, `COMPATIBILITY_BRIDGE`, `LEGACY_FORK` o `INSUFFICIENT_EVIDENCE` antes de editar.

## Adoption batches

La adopción futura queda agrupada por riesgo, sin ejecutarse en Wave 9:

1. `REFERENCE_MAINTENANCE`: Content Generator AI, Group Landing, Command Center y FileStudio — consolidar paths públicos, bridges y evidencia ya iniciada.
2. `STRAIGHTFORWARD_P-WKS`: Advisor AI, Data Lab, GuestHub, Impulso, Linguo Cam, Nexus, Synergi, VisionFlow y GroundSync.
3. `COMPLEX_OR_COMPATIBILITY`: Talent, ShiftImport, TableExtractor, Fiscal y Clearsheet.
4. `P-MKT_AND_SHOWCASES`: Azure Bay, Portfolio, Private Estates Landing, Group, Job Portfolio y showcases.

La prioridad considera adopción actual, severidad del fork, complejidad del build, tamaño de superficie, claridad del perfil y readiness de QA. No se asignan puntuaciones arbitrarias.

## QA and debt registers

QA de consumidores debe preferir entorno no productivo, browser real, artefactos ignorados, credenciales por secreto y cierre fail-closed ante acciones destructivas. FileStudio documenta la excepción production-backed; no se replica en el DS ni se usa como permiso para mutar consumidores.

Deuda accesible conocida: contraste automatizado incompleto sobre gradientes, texto pequeño de consumidores y análisis `aria-controls` en superficies previas. Se clasifican como `AUTOMATED_INCOMPLETE` o `CONSUMER_DEBT` salvo evidencia directa de defecto del CSS canónico.

Deuda de compatibilidad activa: imports CSS anidados Next/Turbopack y copia local de tokens de Talent. Son `CURRENTLY_REQUIRED_BRIDGE`, no licencia para nuevas copias. El owner es el consumidor mientras el DS mantiene el contrato/export y la condición de retirada es soporte probado del bundler o una distribución CSS plana compatible.

## Wave 10 release-candidate backlog

`BLOCKS_V1`:

- demostrar una ruta de consumo agregada o alternativa plana para los bundlers soportados;
- mantener sincronizados manifest, exports públicos e inventario machine-readable;
- resolver la ownership/reconciliación de los primitivos semánticos compartidos con Vault antes de congelar v1.

`DOES_NOT_BLOCK_V1`:

- consumidores aún no migrados;
- falta de Command Palette, Combobox o Data Grid sin evidencia bloqueante;
- extensiones de marca y runtime headless app-owned.

`POST_V1_CANDIDATE`:

- promoción de patrones evidence-required con nuevos consumidores;
- publicación en registry después de establecer release governance;
- variante universal de Sidebar solo si la recurrencia cruza el umbral.

`CONSUMER_MIGRATION_ONLY`:

- fork `.dashboard-button` de Talent;
- bridges semánticos de Command Center, ShiftImport y FileStudio;
- migración de repos independientes.

## Pilot 9 decision

`PILOT_9_REQUIRED = YES`, pero no se ejecuta en esta tarea. Wave 9 cambia materialmente el contrato de imports públicos, scope de perfiles, política de bridges y matriz de adopción. El consumidor seleccionado es `anclora-content-generator-ai`, por ser un consumidor P-WKS real con Next/Turbopack, shadcn y dependencia DS actual.

Riesgo exacto: validar que el import agregado y la declaración `data-profile="workspace"` sean reproducibles en Next/Turbopack sin copias locales de tokens ni divergencia visual del runtime shadcn.

Scope: únicamente CSS/package consumption, profile root, un flujo workspace representativo, responsive/a11y y verificación de SHA; sin migración masiva ni cambios de backend.

## V1 architectural freeze recommendation

Después de Wave 10 deben congelarse Foundations, familias estables de componentes, arquitectura de perfiles, gobierno de Shared Patterns, exports públicos, reglas de migración, deprecaciones y clasificación de bridges. El trabajo posterior debe ser adopción incremental y adiciones menores basadas en evidencia, no nuevas olas arquitectónicas indefinidas.
