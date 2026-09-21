# Contract Reconciliation Matrix

Fecha: 2026-09-21. Fase 5. Cubre cada contradicción confirmada en Fases 0-4. Por mandato de la misión: `anclora-design-system` puede modificarse; `anclora-governance`, `anclora-vault`, `anclora-infrastructure` y los repos consumidores **no se editan en esta misión** salvo que una corrección documental fuera trivial y absolutamente necesaria (no ha sido el caso aquí — todo lo de fuera de este repo se registra como parche de seguimiento).

---

### R1 — Referencia rota `boveda-anclora` en governance

- **CURRENT A:** `anclora-governance/knowledge/SOURCE_OF_TRUTH_REGISTRY.md:65` delega gobernanza normativa de tokens de diseño a `../../boveda-anclora`.
- **CURRENT B:** el repo real se llama `anclora-vault` desde el rename documentado en `anclora-vault/vault-manifest.json:6-8` (`"source_repository": {"name": "boveda-anclora", "state": "intacta (frozen/legacy)"}`).
- **EVIDENCE:** `ls ../../boveda-anclora` desde `anclora-governance` → `No such file or directory`.
- **CANONICAL TARGET:** la ruta debe apuntar a `../anclora-vault/` (o al segmento correcto dentro de él).
- **OWNER:** `anclora-governance` (repo distinto, no se toca en esta misión).
- **ACTION:** registrado como parche de seguimiento — un solo cambio de ruta, trivial, pero fuera del repo autorizado para esta misión (`anclora-design-system`). No se aplica aquí.
- **MIGRATION IMPACT:** ninguno sobre consumidores — es una corrección interna de gobernanza.

---

### R2 — Token `--danger` compartido (vault) vs. base roja implícita en `--status-danger-surface` (DS)

- **CURRENT A:** `anclora-vault/10-group/brand/ANCLORA_BRANDING_COLOR_TOKENS.md:38` declara `--danger: #E53E3E` como "Tokens compartidos globales", semántico base.
- **CURRENT B:** `anclora-design-system/src/tokens/semantic.css:58` deriva `--status-danger-surface: rgba(225, 87, 89, 0.18)` (≈ `#E15759`) — mismo rol semántico (peligro), valor base distinto.
- **EVIDENCE:** ver Fase 2.5 §A2.5.3 (mapeo primitivo → semántico → componente → tema completo).
- **CANONICAL TARGET:** un único valor base de "danger" del que se derivan tanto el token compartido de vault como el `--status-danger-surface`/`-text` del DS. Dado que el DS es la autoridad ejecutable (§2 de la arquitectura), el valor del DS debería ser la fuente; vault debería referenciarlo o regenerarse desde él en vez de mantener una copia manual editable.
- **OWNER:** `anclora-design-system` (valor) + `anclora-vault` (documentación, repo distinto).
- **ACTION:** en esta misión **no se cambia el valor existente de `--status-danger-surface`** (cambiarlo sería una modificación de valor visual con impacto en el único consumidor profundo, `anclora-talent`, sin evidencia de que el valor actual esté mal — solo de que diverge de un documento). Se registra como parche de seguimiento: (a) decidir cuál de los dos valores es el correcto con el propietario de marca, (b) una vez decidido, actualizar el que corresponda, (c) evaluar generar `ANCLORA_BRANDING_COLOR_TOKENS.md` automáticamente desde `semantic.css` en vez de mantenerlo a mano (evita que esto vuelva a divergir).
- **MIGRATION IMPACT:** si se decide cambiar el valor del DS, afecta a `anclora-talent` y `anclora-command-center` (los 2 consumidores reales) — cambio de color visible, requeriría verificación visual antes de publicar.

---

### R3 — Estado de consumidor de `anclora-talent`

- **CURRENT A:** `docs/validated-consumers-matrix.md` (nota 2026-08, aún vigente hasta esta misión) declara `anclora-talent` "pausado, fuera del alcance activo", y sus componentes `button`/`card`/etc. en estado `canonical` con nota "consumo real sin fork estructural".
- **CURRENT B:** evidencia de código (Fase 2.5 §A2.5.4) confirma actividad de desarrollo continua hasta 2026-09-21 y un fork real de anatomía en `.ac-button` (radio/tamaño/peso tipográfico) más una familia paralela `.dashboard-button` nunca derivada de `.ac-button`.
- **EVIDENCE:** `git log --oneline -5` de `anclora-talent` (commits hasta hoy); `anclora-talent/src/app/globals.css:450-513` vs. `anclora-design-system/src/components/button.css:9-30`.
- **CANONICAL TARGET:** `anclora-talent` = `CONSUMER` activo, con fork de anatomía documentado explícitamente (no "sin fork") — ver Fase 6 para la variante `.ac-button--compact` que da una vía sancionada a `.dashboard-button`.
- **OWNER:** `anclora-design-system` (esta matriz) — la corrección del propio archivo `validated-consumers-matrix.md` se trata en Fase de limpieza documental (`04-documentation-cleanup.md`), dentro de este mismo repo.
- **ACTION:** corregido en `04-documentation-cleanup.md` (este repo, autorizado).
- **MIGRATION IMPACT:** ninguno inmediato — es corrección documental. La migración real de `.dashboard-button` a `.ac-button--compact` es responsabilidad de `anclora-talent` en una ola futura (Roadmap Wave 3), no se fuerza aquí.

---

### R4 — Estado de consumidor de `anclora-energyscan`

- **CURRENT A:** `docs/consumer-status-map.md` y `docs/validated-consumers-matrix.md` clasifican `anclora-energyscan` como `PARTIAL_ALIGNMENT` / `candidate`, con nota "auditoría documental creada".
- **CURRENT B:** `grep "@anclora" anclora-energyscan/package.json` → sin resultados; sistema de tokens/tema completamente independiente y hand-rolled.
- **EVIDENCE:** Fase 2.5 §A2.5.5 (re-confirmado, no nueva evidencia contraria encontrada).
- **CANONICAL TARGET:** `anclora-energyscan` = `INDEPENDENT` (Product Matrix, Fase 4), no `PARTIAL_ALIGNMENT`.
- **OWNER:** `anclora-design-system` (este repo).
- **ACTION:** corregido en `04-documentation-cleanup.md`.
- **MIGRATION IMPACT:** ninguno — es una app que nunca consumió el DS; reclasificarla no cambia su código, solo la exactitud del registro.

---

### R5 — Cobertura incompleta del consumer map

- **CURRENT A:** `docs/consumer-status-map.md` cubre 16 repos ("scope AKG v0.1").
- **CURRENT B:** el ecosistema real tiene 36 repos en alcance de análisis (5 transversales + 31 de producto), de los cuales 24 tienen frontend de producto principal ejecutable.
- **EVIDENCE:** Fase 2.5 §A2.5.1 (conteo exacto).
- **CANONICAL TARGET:** `ANCLORA-DESIGN-SYSTEM-PRODUCT-MATRIX.md` (este repo, Fase 4) sustituye a `consumer-status-map.md` como la respuesta canónica a "qué apps consumen el DS y en qué nivel", con las 25 apps con frontend cara-al-usuario cubiertas.
- **OWNER:** `anclora-design-system`.
- **ACTION:** ejecutado — `ANCLORA-DESIGN-SYSTEM-PRODUCT-MATRIX.md` ya creado en Fase 4; `consumer-status-map.md` se marca superseded en Fase de limpieza documental.
- **MIGRATION IMPACT:** ninguno — es una ampliación de cobertura documental, no un cambio de código.

---

### R6 — Familias de componentes locales duplicadas (`.dashboard-button`, `.advisor-btn`, `.datalab-button`, `.synergi-button`, etc.)

- **CURRENT A:** al menos 8 convenciones de nomenclatura de botón conviviendo sin coordinación en el ecosistema (Fase 2.5 §4 original + taxonomía).
- **CURRENT B:** el DS solo define una anatomía de botón (`.ac-button`, forma pill, 0.76rem/700/uppercase).
- **EVIDENCE:** inventario completo, Fase 2.5 §2 (tabla de 33 repos).
- **CANONICAL TARGET:** no se migra ninguna app en esta misión (regla explícita: no big-bang migration). El DS gana una variante de densidad sancionada (`.ac-button--compact`, Fase 6) que da a `anclora-talent` (el único caso con evidencia profunda de necesidad real) una vía de migración futura concreta. Los demás 21 casos `INDEPENDENT` quedan documentados en el Product Matrix como candidatos de adopción futura (Roadmap Waves 2-3), no se tocan.
- **OWNER:** cada app consumidora, en su propia ola de migración.
- **ACTION:** ninguna acción de código fuera de `anclora-design-system` en esta misión.
- **MIGRATION IMPACT:** diferido — ver `ANCLORA-DESIGN-SYSTEM-MIGRATION-ROADMAP.md`.

---

### R7 — Supuesto de distribución (`private: true` + tarball pineado)

- **CURRENT A:** supuesto implícito en la documentación previa de que esto era una limitación temporal.
- **CURRENT B:** análisis de Fase 4 §6 concluye que es adecuado para el estado actual (2 consumidores reales, equipo pequeño, uso intensivo de agentes de código) y no una limitación a resolver con urgencia.
- **EVIDENCE:** `ANCLORA-DESIGN-SYSTEM-ARCHITECTURE.md` §6.
- **CANONICAL TARGET:** mantener el mecanismo actual; documentar el disparador de reevaluación (≥6-8 consumidores reales).
- **OWNER:** `anclora-design-system`.
- **ACTION:** documentado, sin cambio de infraestructura.
- **MIGRATION IMPACT:** ninguno.

---

## Resumen de acciones fuera de este repo (parches de seguimiento, no ejecutados aquí)

1. `anclora-governance`: corregir la ruta `../../boveda-anclora` → `../anclora-vault/` en `knowledge/SOURCE_OF_TRUTH_REGISTRY.md:65`.
2. `anclora-vault` + `anclora-design-system`: decidir con el propietario de marca cuál es el valor canónico de "danger" (`#E53E3E` vs. `~#E15759`) y, una vez decidido, alinear el que corresponda; evaluar generar la documentación de tokens de vault desde el código del DS en vez de mantenerla a mano.

Ninguna otra acción de código fuera de `anclora-design-system` se identificó como necesaria en esta fase.
