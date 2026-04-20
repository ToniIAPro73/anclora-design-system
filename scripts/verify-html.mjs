import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const checks = [];
const failures = [];

function listFiles(dir, predicate) {
  const fullDir = path.join(rootDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(relative, predicate);
    return predicate(relative) ? [relative] : [];
  });
}

function isLocalReference(value) {
  return (
    value &&
    !value.startsWith("#") &&
    !value.startsWith("http://") &&
    !value.startsWith("https://") &&
    !value.startsWith("data:") &&
    !value.startsWith("mailto:") &&
    !value.startsWith("tel:")
  );
}

function verifyFile(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  const html = fs.readFileSync(fullPath, "utf8");
  const dir = path.dirname(fullPath);

  const cssImports = [...html.matchAll(/<link[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  const genericRefs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  const localRefs = genericRefs.filter(isLocalReference);

  if (relativePath.startsWith("preview/")) {
    const hasSystemImport = cssImports.some((href) => href.includes("system.css") || href.includes("colors_and_type.css"));
    if (!hasSystemImport) {
      failures.push(`${relativePath}: missing design system stylesheet import`);
    }
  }

  if (relativePath.includes(".example.html")) {
    const hasSystemImport = cssImports.some((href) => href.includes("system.css"));
    if (!hasSystemImport) {
      failures.push(`${relativePath}: example must import system.css`);
    }
  }

  for (const ref of localRefs) {
    const absolute = path.resolve(dir, ref);
    if (!fs.existsSync(absolute)) {
      failures.push(`${relativePath}: broken reference -> ${ref}`);
    }
  }

  checks.push(relativePath);
}

for (const file of listFiles("preview", (relative) => relative.endsWith(".html"))) verifyFile(file);
for (const file of listFiles("src/examples", (relative) => relative.endsWith(".html"))) verifyFile(file);

if (failures.length > 0) {
  console.error("HTML verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("HTML verification passed.");
console.log(`Checked ${checks.length} HTML files.`);
