# Visual baselines

Este directorio guarda snapshots generados con `npm run verify:snapshots`.

Cobertura actual:
- `docs-home`
- `taxonomy-contracts`
- `components-canonical`
- `theme-families`
- `localization-fixtures`

Cada preview se captura en:
- `desktop`
- `mobile`

Uso:
1. ejecutar `npm run verify:snapshots`
2. revisar los `.png` actualizados en este directorio
3. validar que los cambios visuales son intencionales antes de cerrar la fase
