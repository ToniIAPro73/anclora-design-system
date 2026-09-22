import fs from "node:fs";

const file = "docs/release/ANCLORA-DESIGN-SYSTEM-V1-COMPLETE.md";
const text = fs.readFileSync(file, "utf8");
const checks = [
  [text.includes("version: 1.0.0"), "version metadata"],
  [text.includes("canonical_sha: 215bdbec902914553ea5e4b63cc4808835cef6bf"), "canonical SHA"],
  [text.includes("data-profile=\"workspace\""), "P-WKS profile example"],
  [text.includes("data-profile=\"marketing\""), "P-MKT profile example"],
  [text.includes("auth-entry") && text.includes("destructive-confirmation"), "pattern inventory"],
  [text.includes("NOT_ADOPTED") && text.includes("SUBSTANTIAL"), "adoption stages"],
  [text.includes("Combobox") && text.includes("Command Palette"), "evidence-required register"],
  [text.includes("system.css") && text.includes("patterns/shared-product-patterns.css"), "public exports"],
  [text.includes("Content Generator AI") && text.includes("FileStudio"), "reference consumers"],
  [!text.includes("/Users/") && !text.includes("/home/"), "no local absolute paths"],
];
const failures = checks.filter(([ok]) => !ok).map(([, label]) => label);
if (failures.length) {
  console.error(`V1 document verification failed: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("V1 document consistency verification passed.");
