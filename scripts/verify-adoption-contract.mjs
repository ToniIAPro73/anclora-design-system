import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const manifest = readJson("design-system.manifest.json");
const pkg = readJson("package.json");
const inventoryPath = manifest.adoptionContract?.inventory;
const inventory = inventoryPath ? readJson(inventoryPath.replace(/^\.\//, "")) : null;
const failures = [];

const fail = (message) => failures.push(message);
const exists = (file) => fs.existsSync(path.join(root, file));

if (!manifest.adoptionContract) fail("manifest.adoptionContract is missing");
if (!inventory) fail("adoption inventory could not be loaded");

const statuses = new Set(manifest.adoptionContract?.statusModel ?? []);
for (const consumer of inventory?.consumers ?? []) {
  if (!consumer.repo || !consumer.kind || !consumer.adoption) fail("inventory consumer requires repo, kind and adoption");
  if (!statuses.has(consumer.adoption)) fail(`${consumer.repo}: unknown adoption status ${consumer.adoption}`);
  if (consumer.profile && !["Core/default", "P-WKS", "P-MKT", "n/a"].includes(consumer.profile) && !consumer.profile.startsWith("mixed:")) {
    fail(`${consumer.repo}: unsupported profile ${consumer.profile}`);
  }
  if (consumer.ds && /#(?:development|main|latest)(?:$|[^a-f0-9])/.test(consumer.ds)) {
    fail(`${consumer.repo}: floating Design System dependency ${consumer.ds}`);
  }
}

const inventoryTarget = inventoryPath?.replace(/^\.\//, "");
if (!inventoryTarget || !exists(inventoryTarget)) fail(`inventory path missing: ${inventoryPath}`);
if (!exists("docs/adoption/wave-9-profile-and-adoption-hardening.md")) fail("Wave 9 contract documentation missing");
if (manifest.adoptionContract?.profileScope?.declaration !== "data-profile on the application or route layout root") {
  fail("profile declaration scope is not deterministic");
}
if (manifest.adoptionContract?.dependencyPolicy?.canonical !== "Pin an immutable Git SHA for pre-v1 adoption.") {
  fail("immutable SHA policy missing");
}
if (manifest.adoptionContract?.dependencyPolicy?.forbidden?.some((value) => !["development", "main", "latest", "floating branch tarball"].includes(value))) {
  fail("unexpected floating dependency prohibition");
}

const patternExport = pkg.exports?.["./patterns/shared-product-patterns.css"];
if (patternExport !== "./src/patterns/shared-product-patterns.css") fail("shared pattern public export missing");
if (manifest.entrypoints?.patterns?.sharedProductPatterns !== "./src/patterns/shared-product-patterns.css") {
  fail("shared pattern manifest entrypoint missing");
}

for (const entry of manifest.deprecated ?? []) {
  for (const field of ["api", "replacement", "since", "reason"]) {
    if (!entry[field]) fail(`deprecated entry missing ${field}`);
  }
}

if (failures.length) {
  console.error("Adoption contract verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Adoption contract verification passed.");
console.log(`Checked ${inventory.consumers.length} ecosystem entries, ${statuses.size} adoption statuses and the public shared-pattern export.`);
