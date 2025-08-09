/***Author
 * Santosh Kulkarni
 */
import { Page, Locator, APIResponse } from 'playwright';
import logger from './logger'; 
import { expect } from 'playwright/test';

export class AssertionUtils {
  /**
   * Assert that a locator is attached.
   */
  static async assertToBeAttached(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeAttached();
      logger.info('Locator is attached.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not attached - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is visible.
   */
  static async assertToBeVisible(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeVisible();
      logger.info('Locator is visible.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not visible - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator contains text.
   */
  static async assertToContainText(
    locator: Locator,
    text: string,
  ): Promise<void> {
    try {
      await expect(locator).toContainText(text);
      logger.info(`Locator contains text: ${text}`);
    } catch (error) {
      logger.error(
        `Assertion failed: Locator does not contain text '${text}' - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Assert that a locator has a specific attribute value.
   */
  static async assertToHaveAttribute(
    locator: Locator,
    attribute: string,
    value: string,
  ): Promise<void> {
    try {
      await expect(locator).toHaveAttribute(attribute, value);
      logger.info(
        `Locator has attribute '${attribute}' with value '${value}'.`,
      );
    } catch (error) {
      logger.error(
        `Assertion failed: Locator does not have attribute '${attribute}' with value '${value}' - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Assert that a locator is checked.
   */
  static async assertToBeChecked(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeChecked();
      logger.info('Locator is checked.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not checked - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is disabled.
   */
  static async assertToBeDisabled(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeDisabled();
      logger.info('Locator is disabled.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not disabled - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is editable.
   */
  static async assertToBeEditable(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeEditable();
      logger.info('Locator is editable.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not editable - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is empty.
   */
  static async assertToBeEmpty(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeEmpty();
      logger.info('Locator is empty.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not empty - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is enabled.
   */
  static async assertToBeEnabled(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeEnabled();
      logger.info('Locator is enabled.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not enabled - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is focused.
   */
  static async assertToBeFocused(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeFocused();
      logger.info('Locator is focused.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not focused - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is hidden.
   */
  static async assertToBeHidden(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeHidden();
      logger.info('Locator is hidden.');
    } catch (error) {
      logger.error(`Assertion failed: Locator is not hidden - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a locator is in the viewport.
   */
  static async assertToBeInViewport(locator: Locator): Promise<void> {
    try {
      await expect(locator).toBeInViewport();
      logger.info('Locator is in the viewport.');
    } catch (error) {
      logger.error(
        `Assertion failed: Locator is not in the viewport - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Assert that a page has a specific title.
   */
  static async assertPageTitle(page: Page, title: string): Promise<void> {
    try {
      await expect(page).toHaveTitle(title);
      logger.info(`Page title is '${title}'.`);
    } catch (error) {
      logger.error(`Assertion failed: Page title is not '${title}' - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a page has a specific URL.
   */
  static async assertPageURL(page: Page, url: string): Promise<void> {
    try {
      await expect(page).toHaveURL(url);
      logger.info(`Page URL is '${url}'.`);
    } catch (error) {
      logger.error(`Assertion failed: Page URL is not '${url}' - ${error}`);
      throw error;
    }
  }

  /**
   * Assert that a response has an OK status.
   */
  static async assertResponseToBeOK(response: APIResponse): Promise<void> {
    try {
      await expect(response).toBeOK();
      logger.info('Response has an OK status.');
    } catch (error) {
      logger.error(
        `Assertion failed: Response does not have an OK status - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Assert that a locator has specific text content.
   */
  static async assertToHaveText(locator: Locator, text: string): Promise<void> {
    try {
      await expect(locator).toHaveText(text);
      logger.info(`Locator has text: '${text}'.`);
    } catch (error) {
      logger.error(
        `Assertion failed: Locator does not have text '${text}' - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Assert that a locator has a specific CSS property.
   */
  static async assertToHaveCSS(
    locator: Locator,
    property: string,
    value: string,
  ): Promise<void> {
    try {
      await expect(locator).toHaveCSS(property, value);
      logger.info(
        `Locator has CSS property '${property}' with value '${value}'.`,
      );
    } catch (error) {
      logger.error(
        `Assertion failed: Locator does not have CSS property '${property}' with value '${value}' - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Assert that a page has a specific screenshot.
   */
  static async assertPageToHaveScreenshot(
    page: Page,
    screenshotPath: string,
  ): Promise<void> {
    try {
      await expect(page).toHaveScreenshot(screenshotPath);
      logger.info(`Page has matching screenshot at '${screenshotPath}'.`);
    } catch (error) {
      logger.error(
        `Assertion failed: Page screenshot does not match at '${screenshotPath}' - ${error}`,
      );
      throw error;
    }
  }
}
