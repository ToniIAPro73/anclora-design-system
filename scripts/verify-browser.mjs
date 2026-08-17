import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const rootDir = process.cwd();
const snapshotDir = path.join(rootDir, "artifacts", "visual-baselines");
const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode = modeArg ? modeArg.slice("--mode=".length) : "smoke";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 1200 },
  { name: "desktop-1360", width: 1360, height: 1100 },
  { name: "tablet-834", width: 834, height: 1112 },
  { name: "mobile", width: 430, height: 932, isMobile: true },
];

const pages = [
  {
    id: "docs-home",
    route: "/preview/index.html",
    readySelector: "[data-docs-home]",
  },
  {
    id: "taxonomy-contracts",
    route: "/preview/taxonomy-contracts.html",
    readySelector: ".tier-grid",
  },
  {
    id: "components-canonical",
    route: "/preview/components-canonical.html",
    readySelector: ".tier-grid",
  },
  {
    id: "theme-families",
    route: "/preview/theme-families.html",
    readySelector: ".wrap",
  },
  {
    id: "localization-fixtures",
    route: "/preview/localization-fixtures.html",
    readySelector: "[data-localization-fixtures]",
  },
  {
    id: "detail-modal",
    route: "/preview/detail-modal.html",
    readySelector: "[data-detail-modal-fixtures]",
  },
];

const a11yPages = pages.filter((page) =>
  new Set([
    "docs-home",
    "taxonomy-contracts",
    "components-canonical",
    "localization-fixtures",
    "detail-modal",
  ]).has(page.id)
);

const modalSlots = ["fixture-compact", "fixture-medium", "fixture-wide", "fixture-large", "fixture-confirmation"];

const a11yRules = [
  "document-title",
  "html-has-lang",
  "landmark-one-main",
  "region",
  "button-name",
  "input-button-name",
  "label",
  "select-name",
  "aria-input-field-name",
  "image-alt",
  "list",
  "listitem",
  "heading-order",
];

function contentTypeFor(filePath) {
  switch (path.extname(filePath)) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".ttf":
      return "font/ttf";
    default:
      return "application/octet-stream";
  }
}

function resolveRequest(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const relativePath = decodedPath === "/" ? "preview/index.html" : decodedPath.replace(/^\/+/, "");
  const filePath = path.resolve(rootDir, relativePath);

  if (!filePath.startsWith(rootDir)) return null;
  if (!fs.existsSync(filePath)) return null;

  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    const nestedIndex = path.join(filePath, "index.html");
    if (fs.existsSync(nestedIndex)) return nestedIndex;
    return null;
  }

  return filePath;
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      const filePath = resolveRequest(requestUrl.pathname);

      if (!filePath) {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, { "content-type": contentTypeFor(filePath) });
      fs.createReadStream(filePath).pipe(response);
    });

    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        close: () => new Promise((done) => server.close(done)),
        origin: `http://127.0.0.1:${address.port}`,
      });
    });
  });
}

async function openPreview(page, origin, preview, viewport) {
  await page.goto(`${origin}${preview.route}`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.waitForSelector(preview.readySelector);
}

async function checkModalViewportSafety(page, viewport) {
  const failures = [];

  for (const slotId of modalSlots) {
    const result = await page.evaluate(
      ({ slotId, viewportWidth }) => {
        const slot = document.getElementById(slotId);
        const modal = slot?.querySelector(".ac-modal");
        if (!modal) return { missing: true };

        const box = modal.getBoundingClientRect();
        const backdropBox = slot.querySelector(".ac-modal-backdrop").getBoundingClientRect();
        const centerDelta = Math.abs(
          box.left + box.width / 2 - (backdropBox.left + backdropBox.width / 2)
        );

        return {
          missing: false,
          clipsHorizontally: document.documentElement.scrollWidth > viewportWidth + 1,
          offCenter: centerDelta > 2,
          exceedsMaxHeight: modal.classList.contains("ac-modal--detail")
            ? box.height > window.innerHeight - 64 + 1
            : false,
        };
      },
      { slotId, viewportWidth: viewport.width }
    );

    if (result.missing) {
      failures.push(`${slotId}: modal element not found`);
      continue;
    }
    if (result.clipsHorizontally) failures.push(`${slotId}: horizontal clipping at ${viewport.name}`);
    if (result.offCenter) failures.push(`${slotId}: not horizontally centered at ${viewport.name}`);
    if (result.exceedsMaxHeight) failures.push(`${slotId}: exceeds viewport-safe max-height at ${viewport.name}`);
  }

  return failures;
}

async function runSmoke(browser, origin) {
  const modalFailures = [];

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile ?? false,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const preview of pages) {
      await openPreview(page, origin, preview, viewport);
      console.log(`Smoke ok: ${preview.id} (${viewport.name})`);

      if (preview.id === "detail-modal") {
        modalFailures.push(...(await checkModalViewportSafety(page, viewport)));
      }
    }

    await context.close();
  }

  if (modalFailures.length > 0) {
    console.error("Detail modal viewport-safety verification failed:");
    for (const failure of modalFailures) console.error(`- ${failure}`);
    process.exit(1);
  }
}

async function runSnapshots(browser, origin) {
  fs.mkdirSync(snapshotDir, { recursive: true });

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile ?? false,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const preview of pages) {
      await openPreview(page, origin, preview, viewport);
      const outputPath = path.join(snapshotDir, `${preview.id}-${viewport.name}.png`);
      await page.screenshot({ fullPage: true, path: outputPath });
      console.log(`Snapshot updated: ${path.relative(rootDir, outputPath)}`);
    }

    await context.close();
  }
}

async function runA11y(browser, origin) {
  const failures = [];
  const context = await browser.newContext({
    viewport: { width: viewports[0].width, height: viewports[0].height },
  });
  const page = await context.newPage();

  for (const preview of a11yPages) {
    await openPreview(page, origin, preview, viewports[0]);
    const results = await new AxeBuilder({ page }).withRules(a11yRules).analyze();

    if (results.violations.length > 0) {
      const detail = results.violations.map((violation) => {
        const targets = violation.nodes
          .flatMap((node) => node.target)
          .slice(0, 3)
          .join(", ");
        return `${violation.id} (${targets || "no target"})`;
      });
      failures.push(`${preview.id}: ${detail.join("; ")}`);
      continue;
    }

    console.log(`A11y ok: ${preview.id}`);
  }

  await context.close();

  if (failures.length > 0) {
    console.error("Accessibility verification failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
}

async function main() {
  const runSmokeChecks = mode === "smoke" || mode === "all";
  const runSnapshotChecks = mode === "snapshots" || mode === "all";
  const runA11yChecks = mode === "a11y" || mode === "all";

  if (!runSmokeChecks && !runSnapshotChecks && !runA11yChecks) {
    console.error(`Unknown mode: ${mode}`);
    process.exit(1);
  }

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  try {
    if (runSmokeChecks) await runSmoke(browser, server.origin);
    if (runSnapshotChecks) await runSnapshots(browser, server.origin);
    if (runA11yChecks) await runA11y(browser, server.origin);
  } finally {
    await browser.close();
    await server.close();
  }
}

await main();
