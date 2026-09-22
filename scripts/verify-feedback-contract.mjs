import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const manifest = JSON.parse(read("design-system.manifest.json"));
const pkg = JSON.parse(read("package.json"));
const docs = read("docs/components/feedback-and-system-states.md");
const preview = read("preview/components-canonical.html");
const failures = [];

const files = {
  alert: "src/components/alert.css",
  toast: "src/components/toast.css",
  errorState: "src/components/error-state.css",
  loading: "src/components/loading.css",
  progress: "src/components/progress.css",
  processing: "src/components/processing.css",
  skeleton: "src/components/skeleton.css",
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`${name}: missing CSS file`);
  if (!pkg.exports?.[`./components/${path.basename(file)}`]) failures.push(`${name}: missing package export`);
  if (!manifest.entrypoints?.components?.[name]) failures.push(`${name}: missing manifest entrypoint`);
}

for (const needle of [
  ".ac-alert", ".ac-toast-stack", ".ac-error-state", ".ac-loading-state",
  ".ac-spinner", ".ac-progress", ".ac-processing-state", ".ac-skeleton",
  "prefers-reduced-motion",
]) {
  const source = Object.values(files).map(read).join("\n");
  if (!source.includes(needle)) failures.push(`canonical CSS missing ${needle}`);
}

for (const needle of [
  "Decision tree", "role=\"alert\"", "role=\"status\"", "aria-valuenow",
  "data precedence", "megafeedback", "Recommended Pilot 5", "anclora-tableextractor",
]) {
  if (!docs.toLowerCase().includes(needle.toLowerCase())) failures.push(`feedback docs missing ${needle}`);
}

for (const needle of [
  "data-feedback-contract-fixture", "ac-alert", "ac-toast", "ac-empty-state",
  "ac-error-state", "ac-loading-state", "ac-progress", "ac-processing-state", "ac-skeleton",
  "aria-valuenow", "aria-live=\"polite\"", "role=\"alert\"",
]) {
  if (!preview.includes(needle)) failures.push(`feedback catalog missing ${needle}`);
}

if (manifest.feedback?.contractDoc !== "./docs/components/feedback-and-system-states.md") failures.push("manifest feedback contractDoc is missing");
if (!Array.isArray(manifest.feedback?.components) || manifest.feedback.components.length !== 8) failures.push("manifest feedback component list is incomplete");
if (manifest.version !== pkg.version || manifest.version !== "0.11.0") failures.push("feedback release version must be 0.11.0 and match package.json");
if (!manifest.componentStatus?.canonical?.includes("toast")) failures.push("toast must be canonical after Wave 5 evidence");

if (failures.length) {
  console.error("Feedback contract verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("Feedback contract verification passed.");
console.log("Checked canonical feedback CSS, package/manifest governance, bilingual catalog fixtures and accessibility guidance.");
