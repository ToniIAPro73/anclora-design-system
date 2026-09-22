# `@anclora/design-system` `0.16.0-rc.1`

Wave 10 final hardening turns the pre-v1 Design System into a finite release
candidate. It freezes the public CSS/package contract, separates exclusive
adoption stage from the orthogonal reference-consumer role, reconciles token
ownership and records a deterministic post-v1 promotion path.

The aggregate `system.css` entrypoint remains the preferred public import;
documented granular exports remain a compatibility path. Consumers must pin an
immutable Git SHA. No consumer repositories are changed by this release.

The canonical catalog and release verification gates pass. Evidence-required
features remain explicitly non-stable, consumer bridges remain inventoried,
and the `syncxml` aliases remain supported with removal conditions. The next
phase is finite ecosystem migration batches; no Wave 11 architecture phase is
planned by default.
