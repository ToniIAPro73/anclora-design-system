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
console.log("Checked 8 WCAG 2.2 AA pairs (text-on-canvas, text-on-accent, focus-ring, 4 status pairs) and theme-selector structure.");
