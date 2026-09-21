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

if (failures.length > 0) {
  console.error("Button contract verification failed:");
  for (const entry of failures) console.error(`- ${entry}`);
  process.exit(1);
}

console.log("Button contract verification passed.");
console.log("Checked: .ac-button--icon compound selector, density-orthogonal sizing, modifier precedence contract, a11y contract.");
