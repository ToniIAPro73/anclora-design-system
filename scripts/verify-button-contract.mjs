import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const buttonCssPath = path.join(rootDir, "src/components/button.css");
const css = fs.readFileSync(buttonCssPath, "utf8");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

// --icon must be the hardened compound selector, not a bare modifier class,
// per the Wave 1.5 hardening (docs/ecosystem-audit/05-button-contract-hardening.md).
assert(
  /\.ac-button\.ac-button--icon\s*\{/.test(css),
  "expected the compound selector `.ac-button.ac-button--icon { ... }` (hardened against consumer cascade overrides)",
);
assert(
  !/(?<!\.ac-button)\.ac-button--icon\s*\{/.test(css),
  "found a bare `.ac-button--icon { ... }` rule — must stay the compound `.ac-button.ac-button--icon` form",
);

// --icon must size itself from --ac-button-min-height (orthogonal to
// density) rather than a hardcoded pixel value.
assert(
  /\.ac-button\.ac-button--icon\s*\{[^}]*width:\s*var\(--ac-button-min-height\)/s.test(css),
  "expected .ac-button--icon to set width: var(--ac-button-min-height) so it stays square across every density",
);

// The modifier precedence contract comment must remain — it's the
// documentation half of the hardening (the CSS-only fix doesn't cover
// --compact and the color variants, so the doc must stay present).
assert(
  css.includes("Modifier precedence contract"),
  "the 'Modifier precedence contract' documentation block is missing from button.css",
);

// --compact must remain a single bare modifier (not accidentally merged
// with --icon or turned into a compound selector some other way, which
// would change what it composes with).
assert(
  /(?<!\.ac-button)\.ac-button--compact\s*\{/.test(css),
  "expected .ac-button--compact to remain a bare single-class selector",
);

// Accessibility contract for icon-only buttons must stay documented.
assert(
  /aria-label/i.test(css) && /accessible name/i.test(css),
  "expected the icon-only accessibility contract (aria-label / accessible name) to be documented in button.css",
);

// The v0.6.0 release shipped a real contradiction: button.css said compact
// icon-only "is not intended for a page's primary or destructive action"
// while the manifest said --icon "composes with ANY variant and ANY
// density" — same capability, two different rules. Fixed in 0.6.1: every
// combination is technically supported; avoiding destructive+compact for
// high-consequence actions is design guidance, not a blocked combination.
// Guard both halves of that fix so they can't silently drift apart again.
const manifestPath = path.join(rootDir, "design-system.manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const buttonExtensionNote = manifest.extensionPoints?.button?.note ?? "";

assert(
  /composes with EVERY variant[\s\S]{0,80}EVERY density/i.test(css),
  "expected button.css to state --icon composes with every variant and every density (no combination technically blocked)",
);
assert(
  /composes with EVERY variant and EVERY density/.test(buttonExtensionNote),
  "expected design-system.manifest.json extensionPoints.button.note to state --icon composes with EVERY variant and EVERY density (must match button.css)",
);
assert(
  !/is not intended for a page's primary or destructive action/.test(css),
  "found the old, contradicted 'not intended for primary or destructive' restriction in button.css — this was fixed in 0.6.1 to be guidance, not a blocked combination; if you're reintroducing a hard restriction, update the manifest and catalog to match, don't just edit this file",
);
assert(
  /destructive.*compact.*icon/i.test(css) && /guidance/i.test(css),
  "expected button.css to document the destructive+compact+icon guidance (not a restriction) explicitly",
);

if (failures.length > 0) {
  console.error("Button contract verification failed:");
  for (const entry of failures) console.error(`- ${entry}`);
  process.exit(1);
}

console.log("Button contract verification passed.");
console.log("Checked: .ac-button--icon compound selector, density-orthogonal sizing, modifier precedence contract, a11y contract.");
