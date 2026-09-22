import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "design-system.manifest.json"), "utf8"));
const files = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith(".css")) files.push(file);
  }
};
walk(path.join(root, "src"));

const definitions = new Set();
const references = new Map();
for (const file of files) {
  const source = fs.readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const match of source.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) definitions.add(match[1]);
  for (const match of source.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)(\s*,[^)]*)?\)/g)) {
    const usage = { file: path.relative(root, file), hasFallback: Boolean(match[2]) };
    if (!references.has(match[1])) references.set(match[1], []);
    references.get(match[1]).push(usage);
  }
}

const external = manifest.tokenOwnership?.externalReferences ?? {};
const failures = [];
for (const [token, usages] of references) {
  if (definitions.has(token)) continue;
  if (external[token] && usages.every((usage) => usage.hasFallback)) continue;
  failures.push(`${token}: undefined canonical reference in ${[...new Set(usages.map((usage) => usage.file))].join(", ")}`);
}
if (references.has("--accent-mint")) failures.push("--accent-mint remains an unresolved legacy token");

if (failures.length) {
  console.error("Token ownership verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const externalCount = [...references.keys()].filter((token) => !definitions.has(token)).length;
console.log(`Token ownership verification passed. Scanned ${files.length} CSS files; ${externalCount} optional external references have documented fallbacks.`);
