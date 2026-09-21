// Verifies WCAG 2.2 AA contrast for the critical light-theme token pairs
// introduced in 0.7.0 (Wave 1.6). This does NOT resolve arbitrary CSS
// (color-mix()/var() resolution is out of scope for a dependency-free
// script) — it checks a fixed list of literal color pairs that mirror
// exactly what semantic.css defines, and separately confirms each literal
// value still appears verbatim in semantic.css, so the two can't silently
// drift apart. If you change a color in semantic.css, update the matching
// entry here — that's the intended coupling, not a false positive.
import fs from "node:fs";
import path from "node:path";
import { contrastRatio } from "./lib/contrast.mjs";

const rootDir = process.cwd();
const semanticCss = fs.readFileSync(path.join(rootDir, "src/tokens/semantic.css"), "utf8");
const coreCss = fs.readFileSync(path.join(rootDir, "src/tokens/core.css"), "utf8");
const failures = [];

function assertContrast(label, fg, bg, minRatio, { onCanvas } = {}) {
  const canvas = onCanvas ?? "#F3F5F8";
  const ratio = contrastRatio(fg, bg, canvas);
  if (ratio < minRatio) {
    failures.push(`${label}: ${ratio.toFixed(2)}:1, needs >= ${minRatio}:1 (fg=${fg} bg=${bg})`);
  }
}

function assertLiteralPresent(file, label, literal) {
  if (!file.includes(literal)) {
    failures.push(`literal drift: "${literal}" (${label}) no longer found verbatim in its source file — update this script's fixture to match the real value`);
  }
}

const canvas = "#F3F5F8"; // --group-canvas-light

// --- text on canvas/surface (AA normal text: 4.5:1) ---
assertContrast("text-primary on canvas", "#10141C", canvas, 4.5);
assertLiteralPresent(coreCss, "group-copy-light", "#10141c");
assertContrast("text-secondary on canvas", "rgba(16,20,28,0.72)", canvas, 4.5);
assertLiteralPresent(coreCss, "group-muted-light", "rgba(16, 20, 28, 0.72)");
assertContrast("text-link/eyebrow (fg3) on canvas", "#4C4E53", canvas, 4.5); // color-mix(accent 45%, black 55%) resolved
assertContrast("text-on-accent on accent bg (primary button)", "#10141C", "#A8AEB8", 4.5);

// --- non-text UI contrast (AA: 3:1) ---
assertContrast("border-strong on canvas", "rgba(16,20,28,0.55)", canvas, 3);
assertLiteralPresent(coreCss, "group-border-strong-light", "rgba(16, 20, 28, 0.55)");
assertContrast("focus-ring on canvas", "#6D717A", canvas, 3); // color-mix(accent 65%, black 35%) resolved

// --- status text on its own surface tint, composited over canvas (AA: 4.5:1) ---
assertContrast("status-danger-text on status-danger-surface", "#B42318", "rgba(229,62,62,0.12)", 4.5, { onCanvas: canvas });
assertLiteralPresent(semanticCss, "status-danger-text", "#b42318");
assertContrast("status-success-text on status-success-surface", "#145C31", "rgba(56,161,105,0.14)", 4.5, { onCanvas: canvas });
assertLiteralPresent(semanticCss, "status-success-text", "#145c31");
assertContrast("status-warning-text on status-warning-surface", "#7A5100", "rgba(214,158,46,0.16)", 4.5, { onCanvas: canvas });
assertLiteralPresent(semanticCss, "status-warning-text", "#7a5100");
assertContrast("status-review-text on status-review-surface", "#0E6B73", "rgba(94,197,209,0.16)", 4.5, { onCanvas: canvas });
assertLiteralPresent(semanticCss, "status-review-text", "#0e6b73");

// =========================================================================
// 0.8.0 (Wave 2.1) additions — semantic border & status contract hardening.
// Reproduces the exact Pilot 2 (Command Center) evidence: DS's own neutral
// border measured 1.63:1 dark / 1.29:1 light against a real product
// surface, both failing the 3:1 non-text minimum. --border-control fixes
// this by deriving from --text-primary instead of a fixed neutral, so it
// stays safe against ANY product surface, not just Core's own. Verified
// below against both Core's own surfaces and a real sanctioned product
// profile (.product-anclora-command-center, already in themes/product.css
// — not a copy of the consumer repo, the existing product-profile
// mechanism itself).
// =========================================================================
const coreDarkPanel = "#1a2230"; // group-surface
const coreLightCanvas = canvas; // #F3F5F8

// --- border-control: structural/control boundary (AA non-text: 3:1) ---
assertContrast("border-control on Core dark panel", "rgba(236,240,245,0.5)", coreDarkPanel, 3, { onCanvas: coreDarkPanel });
assertContrast("border-control on Core light canvas", "rgba(16,20,28,0.5)", coreLightCanvas, 3, { onCanvas: coreLightCanvas });
assertLiteralPresent(semanticCss, "border-control formula", "color-mix(in srgb, var(--text-primary) 50%, transparent)");

// --- text-link dark theme (AA normal text: 4.5:1) — fixed from raw accent ---
assertContrast("text-link dark (Core accent, lightened) on canvas", "#b9bec6", "#0f1520", 4.5);
assertLiteralPresent(semanticCss, "text-link dark formula", "color-mix(in srgb, var(--accent) 80%, white 20%)");
if (semanticCss.match(/:root,\s*\n?\[data-theme="dark"\][\s\S]{0,2000}?--text-link:\s*var\(--accent\);/)) {
  failures.push("dark --text-link still resolves to the raw, unsafe var(--accent) formula — this is exactly the regression Pilot 2 found (Command Center's accent measured 4.34:1, below the 4.5:1 AA text minimum)");
}

// --- status borders: fill the border slot status-badge.css already
// reserves (border: 1px solid transparent) — AA non-text: 3:1.
// Compare against each badge's own composited surface, not merely the page
// panel behind it. The public `.ac-status-badge--info` modifier intentionally
// uses the existing `review` semantic family.
const darkStatusPairs = [
  ["danger", "rgb(225,87,89)", "rgba(225,87,89,0.18)"],
  ["success", "rgb(82,190,128)", "rgba(82,190,128,0.18)"],
  ["warning", "rgb(212,175,55)", "rgba(212,175,55,0.16)"],
  ["review", "rgb(144,206,214)", "rgba(144,206,214,0.16)"],
];
for (const [tone, border, surface] of darkStatusPairs) {
  assertContrast(`status-${tone}-border on its dark badge surface`, border, surface, 3, { onCanvas: coreDarkPanel });
}
const lightStatusPairs = [
  ["danger", "#b42318", "rgba(229,62,62,0.12)"],
  ["success", "#145c31", "rgba(56,161,105,0.14)"],
  ["warning", "#7a5100", "rgba(214,158,46,0.16)"],
  ["review", "#0e6b73", "rgba(94,197,209,0.16)"],
];
for (const [tone, border, surface] of lightStatusPairs) {
  assertContrast(`status-${tone}-border on its light badge surface`, border, surface, 3, { onCanvas: coreLightCanvas });
}
for (const token of ["status-success-border", "status-warning-border", "status-danger-border", "status-review-border"]) {
  assertLiteralPresent(semanticCss, token, `--${token}:`);
}
const statusBadgeCss = fs.readFileSync(path.join(rootDir, "src/components/status-badge.css"), "utf8");
const statusBorderMappings = { success: "success", warning: "warning", danger: "danger", info: "review" };
for (const [modifier, semanticTone] of Object.entries(statusBorderMappings)) {
  const selector = new RegExp(`\\.ac-status-badge--${modifier}\\s*\\{[^}]*border-color:\\s*var\\(--status-${semanticTone}-border\\)`);
  if (!selector.test(statusBadgeCss)) {
    failures.push(`components/status-badge.css: .ac-status-badge--${modifier} must map to --status-${semanticTone}-border`);
  }
}

// --- product-theme fixture: a legitimate product surface (not Core's own
// neutral, not a copy of the consumer repo) must not break these formulas.
// Uses .product-anclora-command-center from themes/product.css, whose
// --accent (#6c63ff) is the same real value Pilot 2 measured. ---
const productCss = fs.readFileSync(path.join(rootDir, "src/themes/product.css"), "utf8");
if (!productCss.includes(".product-anclora-command-center")) {
  failures.push("themes/product.css no longer defines .product-anclora-command-center — the product-theme fixture below depends on it existing as a real sanctioned product profile");
} else {
  assertContrast("border-control on product surface (command-center bg-raised)", "rgba(234,232,245,0.5)", "#1e1a2e", 3, { onCanvas: "#1e1a2e" });
  assertContrast("text-link dark on product canvas (command-center accent, lightened)", "#8982ff", "#121021", 4.5);
}

// --- structural presence checks ---
if (!/\[data-theme="light"\]\s*\{/.test(semanticCss)) {
  failures.push('semantic.css is missing a `[data-theme="light"] { ... }` block');
}
if (!/:root,\s*\n?\s*\[data-theme="dark"\]\s*\{/.test(semanticCss)) {
  failures.push('semantic.css no longer makes dark explicit via `:root, [data-theme="dark"] { ... }` — backward compatibility for consumers not setting data-theme depends on :root staying in that selector');
}

if (failures.length > 0) {
  console.error("Theme contrast verification failed:");
  for (const entry of failures) console.error(`- ${entry}`);
  process.exit(1);
}

console.log("Theme contrast verification passed.");
console.log("Checked 8 WCAG 2.2 AA pairs (0.7.0) + border-control, dark text-link, 8 status-border pairs on badge surfaces, all status-badge mappings, and a product-theme fixture (0.8.0).");
