/***Author 
 * Santosh Kulkarni 
 */
import { After, AfterAll, Before, BeforeAll, Status } from '@cucumber/cucumber';
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

let browser: Browser;
let page: Page;
let context: BrowserContext;

// Retry and timeout configuration
const maxRetries = parseInt(process.env.MAX_RETRIES || '2', 10); // 2 retries default

BeforeAll(async function () {
  logger.info('Initializing Hooks');
  getEnv();
  dotenv.config({ path: `.env.${process.env.ENV || 'test'}` });

  const browserType =
    process.env.npm_config_BROWSER || process.env.BROWSER || 'chrome';

  const headless = true; // ✅ Force headless mode ON
  logger.info(`Launching browser: ${browserType}, Headless mode: ${headless}`);

  const reportDir = './playwright-report';
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
    logger.info(`Created report directory: ${reportDir}`);
  }

  switch (browserType.toLowerCase()) {
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

Before(async function () {
  context = await browser.newContext({
    recordVideo: { dir: './playwright-report/videos' },
  });
  context.setDefaultTimeout(60 * 1000); // 60 seconds
  context.setDefaultNavigationTimeout(60 * 1000);

  page = await context.newPage();
  page.setDefaultTimeout(60 * 1000); // Set timeout for page actions
  await context.tracing.start({ screenshots: true, snapshots: true });
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  const testName = pickle.name.replace(/\s+/g, '_');
  if (result?.status === Status.FAILED) {
    const screenshotPath = `./playwright-report/screenshots/${testName}.png`;
    const image = await page.screenshot({ path: screenshotPath });
    logger.error(`Test failed, screenshot saved at: ${screenshotPath}`);
    await this.attach(image, 'image/png');
  }

  const tracePath = `./playwright-report/traces/${testName}-trace.zip`;
  await context.tracing.stop({ path: tracePath });
  logger.info(`Trace saved at: ${tracePath}`);

  await page.close();
  await context.close();
});

AfterAll(async function () {
  try {
    logger.info('Closing browser after all tests...');
    const closeTimeout = parseInt(process.env.BROWSER_CLOSE_TIMEOUT || '15000', 10); 

    await Promise.race([
      browser.close(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Browser close timeout')), closeTimeout)
      ),
    ]);

    logger.info('Browser closed successfully.');
  } catch (error) {
    if (error instanceof Error) {
      // TypeScript now knows 'error' is an instance of Error
      if (error.message === 'Browser close timeout') {
        logger.error('Browser closure timed out.');
      } else {
        logger.error('Unexpected error during browser closure: ', error);
      }
    } else {
      // Handle non-Error types (if any)
      logger.error('An unknown error occurred:', error);
    }
  }
});
