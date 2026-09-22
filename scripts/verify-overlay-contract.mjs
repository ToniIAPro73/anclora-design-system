import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const pkg = JSON.parse(read("package.json"));
const manifest = JSON.parse(read("design-system.manifest.json"));
const docs = read("docs/components/overlays-menus-and-popovers.md");
const preview = read("preview/components-canonical.html");
const cssFiles = ["menu.css", "popover.css", "tooltip.css", "drawer.css"];
const failures = [];

for (const file of cssFiles) {
  const relative = `src/components/${file}`;
  if (!fs.existsSync(path.join(root, relative))) failures.push(`missing ${relative}`);
  if (!pkg.exports?.[`./components/${file}`]) failures.push(`missing package export for ${file}`);
}

for (const [needle, file] of [
  [".ac-menu__content", "menu.css"], [".ac-menu__item", "menu.css"], ["data-tone=\"danger\"", "menu.css"],
  [".ac-popover__content", "popover.css"], [".ac-tooltip__content", "tooltip.css"],
  ["--layer-menu", "semantic.css"], ["--layer-drawer", "semantic.css"], ["prefers-reduced-motion", "drawer.css"],
]) {
  if (!read(file === "semantic.css" ? "src/tokens/semantic.css" : `src/components/${file}`).includes(needle)) failures.push(`${file} missing ${needle}`);
}

for (const needle of ["Menu contract", "Popover contract", "Tooltip contract", "Drawer/Sheet contract", "Modal boundary", "Combobox", "focus return", "Escape", "EVIDENCE_REQUIRED", "Pilot 6"]) {
  if (!docs.toLowerCase().includes(needle.toLowerCase())) failures.push(`overlay docs missing ${needle}`);
}

for (const needle of ["data-overlays-contract-fixture", "ac-menu__content", "ac-menu__item", "ac-popover__content", "role=\"tooltip\"", "data-overlay-drawer", "aria-haspopup=\"menu\""]) {
  if (!preview.includes(needle)) failures.push(`overlay catalog missing ${needle}`);
}

if (manifest.version !== pkg.version) failures.push("manifest version must match package.json");
if (manifest.overlays?.contractDoc !== "./docs/components/overlays-menus-and-popovers.md") failures.push("manifest overlays contractDoc missing");
for (const component of ["menu", "popover", "tooltip", "drawer"]) {
  if (!manifest.overlays?.canonical?.includes(component)) failures.push(`manifest overlays missing canonical ${component}`);
  if (!manifest.entrypoints?.components?.[component]) failures.push(`manifest entrypoint missing ${component}`);
}
if (!manifest.overlays?.evidenceRequired?.includes("contextMenu")) failures.push("complex Context Menu must remain evidence-required");
if (!manifest.prohibitedPatterns.some((pattern) => pattern.includes("MegaOverlay"))) failures.push("MegaOverlay prohibition missing");

if (failures.length) {
  console.error("Overlay contract verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Overlay contract verification passed.");
console.log("Checked visual selectors, semantic layer tokens, catalog anatomy, runtime boundaries and agent governance.");
