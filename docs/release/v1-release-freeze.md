# Anclora Design System V1 release freeze

Status: `V1_RELEASED`
Release: `1.0.0`
Release date: `2026-09-22`

The V1 architectural baseline is the exact release commit recorded in the V1 release report and tag `v1.0.0`. Consumers must use that immutable Git SHA, not a floating branch or registry-only version.

## Frozen contract

- foundations and semantic token ownership;
- stable component families and public CSS exports;
- Core/default, P-WKS and P-MKT profile architecture;
- Shared Pattern governance and maturity model;
- adoption schema and migration contract;
- extension, compatibility-bridge and deprecation rules;
- canonical accessibility and verification gates;
- private GitHub immutable-SHA distribution.

## Not frozen

Consumer adoption percentage, evidence-required features, product-specific extensions, future patterns/components and post-V1 registry distribution remain outside the V1 architecture. They evolve through focused RFC/audit work and normal semantic versioning.

## Post-V1 policy

Patch releases correct canonical defects, minor releases add backwards-compatible evidence-backed capabilities, and major releases change the public contract. No Wave 11 is required.
