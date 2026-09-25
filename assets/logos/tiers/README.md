# Logos por tier (CHG-0014, 2026-09-25)

Maestros canónicos del sistema de logos por tier. Fuente normativa: `anclora-vault/10-group/brand/ANCLORA_BRANDING_ICON_SYSTEM.md` § "Sistema de logos por tier".

| Tier | Maestros | Aplicaciones |
| --- | --- | --- |
| Entidad Matriz | `anclora-group-tier.{png,webp,jpg}` | `anclora-group`, `anclora-group-landing` |
| SaaS | `anclora-saas-tier.{png,webp,jpg}` | `anclora-tableextractor`, `anclora-clearsheet`, `anclora-purgedoc` |
| Ultra Premium | `anclora-ultra-premium-tier.{png,webp,jpg}` | `anclora-private-estates`, `anclora-private-estates-landing`, `anclora-portfolio`, `anclora-azure-bay-landing`, `anclora-portfolio-showcase` |
| Premium | `anclora-premium-tier.{png,webp,jpg}` | tier `premium` del registro y sus showcases |
| Internal | `anclora-internal-tier.{png,webp,jpg}` | tier `internal` del registro y sus showcases |

## Reglas

- El **tier de logo** es independiente del **tier de taxonomía visual** de `src/taxonomy/tier.css`: `anclora-portfolio` y `anclora-azure-bay-landing` usan el tema `tier-portfolio`, pero el logo Ultra Premium.
- Las **showcases** usan el logo de su aplicación de origen (`derived_from` en `ecosystem-repos.json`).
- Cada repositorio conserva sus nombres de archivo; solo cambia el contenido.
- `tier-map.json` registra el tier de cada logo de `assets/logos/`.
- PNG y WebP: 1024 × 1024 con alfa real. JPG: 1024 × 1024 sobre `#0C1524`, < 1 MB.
