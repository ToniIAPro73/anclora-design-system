import { spawnSync } from "node:child_process";
import fs from "node:fs";

const run = (script) => {
  const result = spawnSync("npm", ["run", script], { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run("verify");
run("verify:token-contract");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const manifest = JSON.parse(fs.readFileSync("design-system.manifest.json", "utf8"));
const checks = [
  [pkg.version === manifest.version, "package.json and manifest versions disagree"],
  [lock.version === pkg.version && lock.packages?.[""].version === pkg.version, "package-lock root version disagrees"],
  [manifest.releaseCandidate?.status === "RC_READY", "release candidate is not RC_READY"],
  [manifest.releaseCandidate?.blocksV1?.length === 0, "release candidate has BLOCKS_V1 findings"],
  [manifest.releaseCandidate?.additionalPilotRequired === false, "additional pilot decision is not NO"],
  [fs.existsSync("docs/release/wave-10-release-candidate.md"), "RC contract document is missing"],
  [fs.existsSync("docs/release/release-candidate-checklist.md"), "RC checklist is missing"],
  [fs.existsSync("docs/release/release-notes-0.16.0-rc.1.md"), "RC release notes are missing"],
];
const failures = checks.filter(([ok]) => !ok).map(([, message]) => message);
if (failures.length) {
  console.error("Release verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Release verification passed for ${pkg.name}@${pkg.version}. BLOCKS_V1=0; additional pilot required=NO.`);
