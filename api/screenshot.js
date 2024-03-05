const puppeteer = require('puppeteer-extra');
// import { executablePath } from "puppeteer";
const executablePath = require('puppeteer').executablePath();
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const chromium = require("chrome-aws-lambda");
const middleware = require('./_common/middleware');

const handler = async (targetUrl) => {
  if (!targetUrl) {
    throw new Error('URL is missing from queryStringParameters');
  }

  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'http://' + targetUrl;
  }

  try {
    new URL(targetUrl);
  } catch (error) {
    throw new Error('URL provided is invalid');
  }

  let browser = null;
  try {
    puppeteer.use(StealthPlugin());

    browser = await puppeteer.launch({
      headless: 'new',
      // defaultViewport: { width: 800, height: 600 },
      executablePath: executablePath,
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--no-sandbox'],
    });

    let page = await browser.newPage();

    // await page.emulateMediaFeatures([
    //   { name: "prefers-color-scheme", value: "dark" },
    // ]);
    page.setDefaultNavigationTimeout(8000);
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 9000,
    });

    await page.evaluate(() => {
      const selector = 'body';
      return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (!element) {
          reject(
            new Error(`Error: No element found with selector: ${selector}`)
          );
        }
        resolve();
      });
    });

    await page.waitForTimeout(5000);

    const screenshotBuffer = await page.screenshot();
    const base64Screenshot = screenshotBuffer.toString('base64');

    return { image: base64Screenshot };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

module.exports = middleware(handler);
module.exports.handler = middleware(handler);
