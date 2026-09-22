import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const read = (file) => fs.readFileSync(path.join(rootDir, file), "utf8");
const css = read("src/components/data-table.css");
const docs = read("docs/components/data-table.md");
const preview = read("preview/components-canonical.html");
const manifest = JSON.parse(read("design-system.manifest.json"));
const failures = [];

const requiredCss = [
  ".ac-data-table",
  ".ac-data-table__scroll",
  ".ac-data-table__sort",
  ".ac-data-table--compact",
  ".ac-data-table--sticky",
  '[data-selected="true"]',
  '[data-disabled="true"]',
  "data-align",
  "data-column",
  "var(--border-subtle)",
  "var(--focus-ring)",
];
for (const needle of requiredCss) {
  if (!css.includes(needle)) failures.push(`data-table.css missing ${needle}`);
}

for (const needle of [
  "Presentational table",
  "Data Table",
  "Data Grid",
  "aria-sort",
  "ac-status-badge",
  "ac-empty-state",
  "horizontal overflow",
  "DATA_GRID_EVIDENCE_REQUIRED",
]) {
  if (!docs.includes(needle)) failures.push(`data-table docs missing ${needle}`);
}

for (const needle of [
  "data-data-table-fixture",
  "ac-data-table--compact",
  "ac-data-table--sticky",
  'aria-sort="ascending"',
  'data-selected="true"',
  "ac-status-badge--success",
  "ac-empty-state",
]) {
  if (!preview.includes(needle)) failures.push(`catalog missing ${needle}`);
}

if (manifest.dataTable?.contractDoc !== "./docs/components/data-table.md") {
  failures.push("manifest dataTable.contractDoc is missing or incorrect");
}
if (manifest.dataTable?.dataGrid !== "evidence-required") {
  failures.push("manifest dataTable.dataGrid must remain evidence-required");
}
if (!manifest.dataTable?.answersForAgents?.["I need filters"]) {
  failures.push("manifest dataTable agent guidance for filters is missing");
}

if (failures.length > 0) {
  console.error("Data Table contract verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Data Table contract verification passed.");
console.log("Checked semantic layers, behaviours, responsive guidance, catalog fixtures and agent governance.");
