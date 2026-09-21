import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const failures = [];
const read = (file) => fs.readFileSync(path.join(rootDir, file), "utf8");
const primitives = read("src/foundations/primitives.css");
const fields = read("src/components/form-field.css");
const preview = read("preview/components-canonical.html");
const docs = read("docs/components/forms-and-inputs.md");

const required = [
  ["field input", ".field-input"],
  ["field search", ".field-search"],
  ["field select", ".field-select"],
  ["field textarea", ".field-textarea"],
  ["control border", "var(--border-control)"],
  ["invalid state", "aria-invalid=\"true\""],
  ["disabled state", ":disabled"],
  ["readonly state", "[readonly]"],
  ["focus ring", "var(--focus-ring)"],
];
for (const [label, needle] of required) {
  if (!primitives.includes(needle)) failures.push(`primitives.css missing ${label}: ${needle}`);
}

for (const [label, needle] of [
  ["field wrapper", ".ac-form-field"],
  ["choice input", ".ac-choice-control__input"],
  ["switch variant", ".ac-choice-control--switch"],
  ["choice focus", ":focus-visible"],
]) {
  if (!fields.includes(needle)) failures.push(`form-field.css missing ${label}: ${needle}`);
}

for (const [label, needle] of [
  ["search sample", 'type="search"'],
  ["select sample", "field-select"],
  ["textarea sample", "field-textarea"],
  ["checkbox sample", 'type="checkbox"'],
  ["radio sample", 'type="radio"'],
  ["switch sample", 'role="switch"'],
  ["invalid sample", 'aria-invalid="true"'],
  ["mobile fixture", "copia larga"],
]) {
  if (!preview.includes(needle)) failures.push(`catalog missing ${label}: ${needle}`);
}

for (const needle of ["Field owns context", "Combobox", "Pilot 3", "placeholder"]) {
  if (!docs.includes(needle)) failures.push(`forms docs missing: ${needle}`);
}

if (failures.length) {
  console.error("Forms contract verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Forms contract verification passed.");
console.log("Checked canonical field states, choice controls, catalog fixtures and governance documentation.");
