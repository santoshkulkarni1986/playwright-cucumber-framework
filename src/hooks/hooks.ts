import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from '@playwright/test';
import { pageFixture } from './pageFixture';
import logger from '../Utility/logger';
import * as dotenv from 'dotenv';
import { getEnv } from '../helper/env/env';
import fs from 'fs';
import path from 'path';

// Set timeout globally
setDefaultTimeout(60 * 1000);

let browser: Browser;
let browserType: string;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  logger.info('Initializing Hooks');
  getEnv();
  dotenv.config({ path: `.env.${process.env.ENV || 'test'}` });

  browserType = (process.env.npm_config_BROWSER || process.env.BROWSER || 'chrome').toLowerCase();
  const headless = true;

  logger.info(`Launching browser: ${browserType}, Headless: ${headless}`);

  const reportDir = './playwright-report';
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
    logger.info(`Created report directory: ${reportDir}`);
  }

  switch (browserType) {
    case 'chrome':
      browser = await chromium.launch({ headless });
      break;
    case 'firefox':
      browser = await firefox.launch({ headless });
      break;
    case 'safari':
      browser = await webkit.launch({ headless });
      break;
    case 'edge':
      browser = await chromium.launch({ channel: 'msedge', headless });
      break;
    default:
      throw new Error(`Unsupported browser specified: ${browserType}`);
  }
});

Before(async function ({ pickle }) {
  const testName = pickle.name.replace(/\s+/g, '_');
  const videoDir = `./playwright-report/${browserType}/videos/${testName}`;
  fs.mkdirSync(videoDir, { recursive: true });

  context = await browser.newContext({
    recordVideo: { dir: videoDir },
  });

  context.setDefaultTimeout(60 * 1000);
  context.setDefaultNavigationTimeout(60 * 1000);

  page = await context.newPage();
  page.setDefaultTimeout(60 * 1000);
  pageFixture.page = page;

  const traceDir = `./playwright-report/${browserType}/traces/${testName}`;
  fs.mkdirSync(traceDir, { recursive: true });
  await context.tracing.start({ screenshots: true, snapshots: true });

  // Attach metadata to world for later use
  this.testName = testName;
});

After(async function ({ result }) {
  const testName = this.testName;
  const screenshotPath = `./playwright-report/${browserType}/screenshots/${testName}.png`;

  if (result?.status === Status.FAILED) {
    const screenshot = await page.screenshot({ path: screenshotPath });
    await this.attach(screenshot, 'image/png');
    logger.error(`❌ Test failed, screenshot saved: ${screenshotPath}`);
  }

  const tracePath = `./playwright-report/${browserType}/traces/${testName}/${testName}-trace.zip`;
  await context.tracing.stop({ path: tracePath });
  logger.info(`📦 Trace saved: ${tracePath}`);

  await page.close();
  await context.close();
});

AfterAll(async function () {
  try {
    logger.info('Closing browser...');
    const closeTimeout = parseInt(process.env.BROWSER_CLOSE_TIMEOUT || '15000', 10);

    await Promise.race([
      browser.close(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Browser close timeout')), closeTimeout)
      ),
    ]);

    logger.info('✅ Browser closed');
  } catch (error) {
    logger.error('Error closing browser:', error);
  }
});
