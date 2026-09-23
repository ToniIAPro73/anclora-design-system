const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright'));

(async () => {
  const source = path.join(__dirname, '../source');
  const build = path.join(source, 'build');
  const out = path.join(source, 'png');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1055, height: 1491 }, deviceScaleFactor: 2 });
  const files = fs.readdirSync(build).filter((file) => file.endsWith('.html') && file !== '_manual-completo.html').sort();
  let failed = false;
  for (const file of files) {
    await page.goto(`file://${path.join(build, file)}`);
    await page.evaluate(() => document.fonts.ready);
    const issues = await page.evaluate(() => {
      const main = document.querySelector('.main');
      const result = [];
      if (main && main.scrollHeight > main.clientHeight + 1) result.push(`main overflow ${main.scrollHeight - main.clientHeight}px`);
      if (main) {
        const limit = main.getBoundingClientRect().bottom;
        document.querySelectorAll('.content > *').forEach((el, index) => {
          const bottom = el.getBoundingClientRect().bottom;
          if (bottom > limit + 2) result.push(`block ${index} overflow ${Math.round(bottom - limit)}px`);
        });
      }
      return result;
    });
    if (issues.length) failed = true;
    await page.screenshot({ path: path.join(out, file.replace('.html', '.png')) });
    console.log(`${file}: ${issues.length ? issues.join('; ') : 'OK'}`);
  }
  await browser.close();
  if (failed) process.exitCode = 1;
})();
