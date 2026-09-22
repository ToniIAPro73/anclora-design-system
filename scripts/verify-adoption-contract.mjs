import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const manifest = readJson("design-system.manifest.json");
const pkg = readJson("package.json");
const contract = manifest.adoptionContract;
const inventoryPath = contract?.inventory?.replace(/^\.\//, "");
const inventory = inventoryPath ? readJson(inventoryPath) : null;
const failures = [];
const fail = (message) => failures.push(message);
const exists = (file) => fs.existsSync(path.join(root, file));

if (!contract) fail("manifest.adoptionContract is missing");
if (!inventory) fail("adoption inventory could not be loaded");
if (inventory?.schemaVersion !== "2.0") fail(`inventory schemaVersion must be 2.0, got ${inventory?.schemaVersion}`);
if (contract?.schemaVersion !== "2.0") fail(`manifest adoption schemaVersion must be 2.0, got ${contract?.schemaVersion}`);
if (contract?.adoptionStageField !== "adoptionStage") fail("adoptionStageField must be adoptionStage");
if (contract?.referenceConsumerField !== "referenceConsumer") fail("referenceConsumerField must be referenceConsumer");

const stages = new Set(Object.keys(contract?.adoptionStages ?? {}));
const inventoryStages = new Set(Object.keys(inventory?.adoptionStageDefinitions ?? {}));
if (stages.size !== inventoryStages.size || [...stages].some((stage) => !inventoryStages.has(stage))) {
  fail("manifest and inventory adoption stage definitions disagree");
}

const includedKinds = new Set(contract?.includedConsumerKinds ?? []);
const consumers = inventory?.consumers ?? [];
const repos = new Set();
const included = [];
for (const consumer of consumers) {
  if (!consumer.repo || !consumer.kind) {
    fail("every inventory entry requires repo and kind");
    continue;
  }
  if (repos.has(consumer.repo)) fail(`duplicate repository ${consumer.repo}`);
  repos.add(consumer.repo);
  if (typeof consumer.referenceConsumer !== "boolean") fail(`${consumer.repo}: referenceConsumer must be boolean`);
  if (includedKinds.has(consumer.kind)) {
    included.push(consumer);
    if (!stages.has(consumer.adoptionStage)) fail(`${consumer.repo}: invalid or missing adoptionStage ${consumer.adoptionStage}`);
    if (!consumer.profile || (!["Core/default", "P-WKS", "P-MKT", "n/a"].includes(consumer.profile) && !consumer.profile.startsWith("mixed:"))) {
      fail(`${consumer.repo}: unsupported profile ${consumer.profile}`);
    }
    if (consumer.ds && /#(?:development|main|latest)(?:$|[^a-f0-9])/.test(consumer.ds)) fail(`${consumer.repo}: floating Design System dependency ${consumer.ds}`);
  }
}

for (const excluded of inventory?.excluded ?? []) if (repos.has(excluded)) fail(`excluded repository is present in inventory: ${excluded}`);

const totals = Object.fromEntries([...stages].map((stage) => [stage, 0]));
for (const consumer of included) totals[consumer.adoptionStage] += 1;
if (Object.values(totals).reduce((sum, count) => sum + count, 0) !== included.length) fail("exclusive adoption-stage totals do not reconcile to included consumers");
const referenceCount = included.filter((consumer) => consumer.referenceConsumer).length;
if (referenceCount < 1) fail("known reference consumers are not represented");

const contentGenerator = consumers.find((consumer) => consumer.repo === "anclora-content-generator-ai");
if (!contentGenerator) fail("Content Generator AI inventory entry is missing");
if (contentGenerator?.adoptionStage !== "SUBSTANTIAL" || contentGenerator?.referenceConsumer !== true) fail("Content Generator AI must be SUBSTANTIAL with referenceConsumer=true after Pilot 9");
if (contentGenerator?.ds !== "GitHub SHA 38edaf73e66dde6b24e0f8776189a276adda7998") fail("Content Generator AI DS SHA is not the Pilot 9 canonical SHA");
if (contentGenerator?.bridge !== "none") fail("Content Generator AI bridge must be none after Pilot 9");

if (!inventoryPath || !exists(inventoryPath)) fail(`inventory path missing: ${contract?.inventory}`);
if (!exists("docs/release/wave-10-release-candidate.md")) fail("Wave 10 RC contract documentation missing");
if (contract?.profileScope?.declaration !== "data-profile on the application or route layout root") fail("profile declaration scope is not deterministic");
if (contract?.dependencyPolicy?.canonical !== "Pin the immutable V1 Git SHA for reproducible adoption.") fail("immutable SHA policy missing");
if (!Array.isArray(pkg.sideEffects) || !pkg.sideEffects.includes("*.css")) fail("CSS sideEffects metadata missing");

const manifestEntrypoints = new Set();
const collectEntrypoints = (value) => {
  if (typeof value === "string" && value.startsWith("./")) manifestEntrypoints.add(value);
  else if (value && typeof value === "object") Object.values(value).forEach(collectEntrypoints);
};
collectEntrypoints(manifest.entrypoints);
const exportPaths = new Set(Object.values(pkg.exports ?? {}));
if (manifestEntrypoints.size !== exportPaths.size || [...manifestEntrypoints].some((entry) => !exportPaths.has(entry))) fail("manifest entrypoints and package exports disagree");

for (const entry of manifest.deprecated ?? []) for (const field of ["api", "replacement", "since", "reason", "removalCondition"]) if (!entry[field]) fail(`deprecated entry missing ${field}`);
if (!new Set(["RC_READY", "V1_RELEASED"]).has(manifest.releaseCandidate?.status)) fail("releaseCandidate status is neither RC_READY nor V1_RELEASED");
if (manifest.releaseCandidate?.blocksV1?.length !== 0) fail("releaseCandidate still contains BLOCKS_V1 findings");
if (manifest.releaseCandidate?.additionalPilotRequired !== false) fail("releaseCandidate additional pilot decision is not explicit NO");

if (failures.length) {
  console.error("Adoption contract verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Adoption contract verification passed.");
console.log(`Checked ${included.length} included frontend entries, ${stages.size} exclusive stages and ${referenceCount} reference consumers.`);
console.log(`Stage totals: ${JSON.stringify(totals)}`);
