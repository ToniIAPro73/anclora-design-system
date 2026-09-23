const path = require('path');
const fs = require('node:fs');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright'));

(async () => {
  const source = path.join(__dirname, '../source');
  const output = path.join(__dirname, '../../../docs/release/ANCLORA_MANUAL_V1_ES.pdf');
  const temporaryOutput = `${output}.tmp-${process.pid}`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1055, height: 1491 } });
  await page.goto(`file://${path.join(source, 'build/_manual-completo.html')}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.pdf({
    path: temporaryOutput,
    width: '1055px',
    height: '1491px',
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  fs.renameSync(temporaryOutput, output);
  console.log('Generated docs/release/ANCLORA_MANUAL_V1_ES.pdf');
})();
