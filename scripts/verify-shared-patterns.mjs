import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "design-system.manifest.json");
const docsPath = path.join(root, "docs/patterns/shared-product-patterns.md");
const cssPath = path.join(root, "src/patterns/shared-product-patterns.css");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const docs = fs.readFileSync(docsPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const failures = [];
const canonical = manifest.sharedPatterns?.canonical ?? {};
const allowedProfiles = new Set(["CORE_SHARED", "P-WKS_SHARED", "P-MKT_SHARED", "CROSS_PROFILE"]);
const allowedComponents = new Set([
  ...manifest.componentStatus.canonical,
  "choiceControl",
]);

if (!manifest.sharedPatterns?.contractDoc) failures.push("manifest: missing sharedPatterns.contractDoc");
if (!docs.includes("# Shared Product Patterns")) failures.push("docs: missing Shared Product Patterns heading");
if (!docs.includes("## Promotion criteria")) failures.push("docs: missing promotion criteria");

for (const [id, pattern] of Object.entries(canonical)) {
  if (!docs.includes(`\`${id}\``)) failures.push(`${id}: not documented in the shared-pattern guide`);
  if (!css.includes(`.ac-pattern-${id}`)) failures.push(`${id}: missing CSS-first composition class`);
  if (!pattern.name || !pattern.maturity || !pattern.profileScope) failures.push(`${id}: incomplete manifest metadata`);
  if (!allowedProfiles.has(pattern.profileScope.split(" /")[0])) {
    failures.push(`${id}: invalid profile scope ${pattern.profileScope}`);
  }
  for (const component of pattern.components ?? []) {
    if (!allowedComponents.has(component)) failures.push(`${id}: references non-canonical component ${component}`);
  }
}

for (const id of manifest.sharedPatterns?.evidenceRequired ?? []) {
  if (canonical[id]) failures.push(`${id}: cannot be both canonical and evidence-required`);
}

const prohibitedLocalNames = ["shift-import-toolbar", "talent-settings-card", "tableextractor-upload", "MegaPattern", "SuperPattern"];
for (const name of prohibitedLocalNames) {
  if (docs.includes(name) || css.includes(name)) failures.push(`unapproved product-specific pattern name: ${name}`);
}

if (failures.length) {
  console.error("Shared-pattern verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Shared-pattern verification passed.");
console.log(`Checked ${Object.keys(canonical).length} canonical patterns.`);
