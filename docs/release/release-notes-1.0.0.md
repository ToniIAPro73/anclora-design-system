# `@anclora/design-system` `1.0.0`

## What V1 provides

V1 is the stable, CSS-first Anclora Design System contract. It provides semantic foundations, canonical component families, Core/default, P-WKS and P-MKT profiles, six governed Shared Patterns, public CSS exports, accessibility requirements, compatibility bridges and a deterministic adoption/migration model.

The release is cut from the verified `0.16.0-rc.1` architecture without executable CSS/JS or manifest-contract changes. V1 stabilises the architecture; it does not claim 100% ecosystem adoption.

## How to consume it

Use the aggregate public entrypoint:

```css
@import "@anclora/design-system/system.css";
```

Consumers must pin the immutable V1 Git SHA. Granular CSS exports remain supported where a bundler requires them. Deep/internal imports are not supported, and npm registry publication is not part of this release.

## Profiles and patterns

Declare `data-profile="P-WKS"` or `data-profile="P-MKT"` at the application or route-layout root when the interaction archetype requires it; omit it for Core/default. `data-theme="dark"|"light"` is independent. Shared Patterns remain CSS-first compositions: `auth-entry`, `settings-section`, `file-upload`, `processing-result`, `bulk-action-bar` and `destructive-confirmation`.

## Validated stacks and limitations

The package contract is framework-compatible and has been validated through the repository browser/a11y matrix, including Vite/React and Next/Turbopack consumption evidence. Evidence-required areas such as Combobox, Data Grid, Command Palette, Mega Menu, resizable/docking layouts and generic onboarding/import/entity frameworks remain outside stable V1. Consumer migration is the next phase.

## Post-V1 evolution

Use ordinary patch/minor/major versioning with focused RFC/audit and consumer validation. Do not create another architectural Wave. Evidence-required features must earn promotion through evidence and contract review.
