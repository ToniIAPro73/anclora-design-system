import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, 'design-system.manifest.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const required = [
  ['version', packageJson.version],
  ['navigationShell.profileAttribute', 'data-profile'],
  ['navigationShell.routingOwnership', 'consumer'],
  ['navigationShell.permissionOwnership', 'consumer'],
  ['profiles.Core', true],
  ['profiles.P-WKS', true],
  ['profiles.P-MKT', true],
  ['entrypoints.components.appShell', './src/components/app-shell.css'],
  ['entrypoints.components.pageContainer', './src/components/page-container.css'],
  ['entrypoints.components.pageHeader', './src/components/page-header.css'],
];

function readPath(path) {
  return path.split('.').reduce((value, key) => value?.[key], manifest);
}

const failures = required.filter(([path, expected]) => {
  const actual = readPath(path);
  return expected === true ? !actual : actual !== expected;
});

const cssFiles = ['app-shell.css', 'page-container.css', 'page-header.css'];
const missingCss = cssFiles.filter((file) => {
  try { readFileSync(join(root, 'src/components', file)); return false; } catch { return true; }
});
const contract = readFileSync(join(root, 'docs/navigation-and-app-shell-contract.md'), 'utf8');
for (const needle of ['data-profile="workspace"', 'aria-current="page"', 'routing', 'EVIDENCE_REQUIRED']) {
  if (!contract.includes(needle)) failures.push([`contract:${needle}`, true]);
}

if (failures.length || missingCss.length) {
  console.error(JSON.stringify({ failures, missingCss }, null, 2));
  process.exit(1);
}

console.log('navigation-shell-contract: PASS');
