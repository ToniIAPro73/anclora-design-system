import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function flattenPaths(value) {
  if (typeof value === "string") return [value];
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap((entry) => flattenPaths(entry));
}

function assertExists(relativePath, missing, context) {
  const fullPath = path.join(rootDir, relativePath);
  if (!fs.existsSync(fullPath)) {
    missing.push(`${context}: ${relativePath}`);
  }
}

const pkg = readJson("package.json");
const manifest = readJson("design-system.manifest.json");
const missing = [];

if (pkg.style) {
  assertExists(pkg.style, missing, "package.style");
}

for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
  if (typeof target === "string") {
    assertExists(target, missing, `package.exports.${subpath}`);
  }
}

for (const target of flattenPaths(manifest.entrypoints)) {
  assertExists(target, missing, "design-system.manifest");
}

const recommendedImport = manifest.recommendedImport;
if (typeof recommendedImport !== "string" || !recommendedImport.endsWith("/system.css")) {
  missing.push("design-system.manifest: recommendedImport must point to /system.css");
}

if (missing.length > 0) {
  console.error("Manifest verification failed:");
  for (const entry of missing) console.error(`- ${entry}`);
  process.exit(1);
}

console.log("Manifest verification passed.");
console.log(`Checked ${Object.keys(pkg.exports ?? {}).length} export entrypoints and manifest references.`);
