/***Author 
 * Santosh Kulkarni
 */
import { Browser, BrowserContext, Page } from 'playwright';

export const pageFixture = {
    browser: undefined as Browser | undefined,
    context: undefined as BrowserContext | undefined,
    page: undefined as Page | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logger: undefined as any, // Added logger if required
};
