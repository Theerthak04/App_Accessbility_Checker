// run-accessibility-check.js
const puppeteer = require('puppeteer');
const axeCore = require('axe-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

  const page = await browser.newPage();

  // Load local file (assuming running from repo root)
  await page.goto(`file://${process.cwd()}/index.html`);

  await page.addScriptTag({ path: require.resolve('axe-core') });

  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  const report = JSON.stringify(results, null, 2);
  const violations = results.violations;

  fs.writeFileSync('accessibility-report.json', report);

  console.log('Accessibility report generated: accessibility-report.json');

  if (violations.length > 0) {
    console.error(`${violations.length} accessibility issues found.`);
  } else {
    console.log('No accessibility issues found.');
  }

  await browser.close();
})();
