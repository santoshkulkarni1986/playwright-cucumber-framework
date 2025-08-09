/***Author
 * Santosh Kulkarni
 */
import { Browser, BrowserContext, Page } from 'playwright';

export const pageFixture = {
  browser: undefined as Browser | undefined,
  context: undefined as BrowserContext | undefined,
  page: undefined as Page | undefined,

  logger: undefined as any, // Added logger if required
};
