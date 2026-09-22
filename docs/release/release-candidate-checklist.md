# Release candidate checklist — 0.16.0-rc.1

Machine-readable gates are orchestrated by `npm run verify:release`.

- [x] version and immutable-SHA distribution policy documented
- [x] clean Git scope and no consumer changes
- [x] manifest/export agreement
- [x] adoption schema and exact frontend reconciliation
- [x] token ownership and undefined-token scan
- [x] component/profile/pattern maturity
- [x] deprecation metadata and removal conditions
- [x] `system.css`, granular exports and `sideEffects`
- [x] package tarball and installability smoke
- [x] HTML/catalog, browser, responsive, ES/EN and Light/Dark gates
- [x] axe and canonical contrast gates
- [x] release notes, migration playbook and reference-consumer index
- [x] finite `BLOCKS_V1` register

Visual snapshots are supporting evidence, not a visual-diff gate. Consumer
migration, registry publication and production deployment are explicitly out
of scope for this RC.
