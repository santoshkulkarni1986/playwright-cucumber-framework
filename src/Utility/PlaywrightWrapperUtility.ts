/***Author
 * Santosh Kulkarni
 */
import { Page, Locator } from 'playwright';
import logger from './logger'; // Assuming a logger file

export class PlaywrightWrapperUtility {
  /**
   * Check if the element is visible before performing an action.
   * @param locator - The Locator object representing the element.
   * @param action - The action to be performed (e.g., 'click', 'fill').
   */
  private static async ensureElementVisible(
    locator: Locator,
    action: string,
  ): Promise<void> {
    try {
      logger.info(`Checking visibility of element before ${action}`);
      const isVisible = await locator.isVisible();
      if (!isVisible) {
        throw new Error(`Element not visible for action: ${action}`);
      }
    } catch (error: unknown) {
      this.handleError(error, `ensuring visibility before ${action}`);
    }
  }

  /**
   * Click on the specified locator element.
   * @param locator - The Locator object representing the element to click.
   */
  static async clickOnElement(locator: Locator): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'clicking');
      logger.info('Clicking on element.');
      await locator.click();
    } catch (error: unknown) {
      this.handleError(error, 'clicking on element');
    }
  }

  /**
   * Fill the specified input field with text.
   * @param locator - The Locator object representing the input field.
   * @param text - The text to fill into the input field.
   */
  static async enterText(locator: Locator, text: string): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'filling input field');
      logger.info(`Filling input field with text: ${text}`);
      await locator.fill(text);
    } catch (error: unknown) {
      this.handleError(error, 'filling input field');
    }
  }

  // Dropdown selection methods
  static async selectDropdownValueByText(
    locator: Locator,
    text: string,
  ): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'selecting dropdown by text');
      logger.info(`Selecting dropdown value by text: ${text}`);
      await locator.selectOption({ label: text });
    } catch (error: unknown) {
      this.handleError(error, 'selecting dropdown by text');
    }
  }

  static async selectDropdownValueByValue(
    locator: Locator,
    value: string,
  ): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'selecting dropdown by value');
      logger.info(`Selecting dropdown value by value: ${value}`);
      await locator.selectOption({ value });
    } catch (error: unknown) {
      this.handleError(error, 'selecting dropdown by value');
    }
  }

  static async selectDropdownValueByIndex(
    locator: Locator,
    index: number,
  ): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'selecting dropdown by index');
      logger.info(`Selecting dropdown value by index: ${index}`);
      await locator.selectOption({ index });
    } catch (error: unknown) {
      this.handleError(error, 'selecting dropdown by index');
    }
  }

  /**
   * Take a screenshot of the entire page.
   * @param page - The Playwright Page object.
   * @param filePath - Path to save the screenshot.
   */
  static async takePageScreenshot(page: Page, filePath: string): Promise<void> {
    try {
      logger.info(`Taking screenshot of the entire page: ${filePath}`);
      await page.screenshot({ path: filePath });
    } catch (error: unknown) {
      this.handleError(error, 'taking page screenshot');
    }
  }

  /**
   * Take a screenshot of a specific element.
   * @param locator - The Locator object for the element.
   * @param filePath - Path to save the screenshot.
   */
  static async takeElementScreenshot(
    locator: Locator,
    filePath: string,
  ): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'taking element screenshot');
      logger.info(`Taking screenshot of the element: ${filePath}`);
      await locator.screenshot({ path: filePath });
    } catch (error: unknown) {
      this.handleError(error, 'taking element screenshot');
    }
  }

  /**
   * Perform a right-click on the specified element.
   * @param locator - The Locator object representing the element.
   */
  static async performRightClick(locator: Locator): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'right-clicking');
      logger.info('Right-clicking on element.');
      await locator.click({ button: 'right' });
    } catch (error: unknown) {
      this.handleError(error, 'right-clicking on element');
    }
  }

  /**
   * Perform a double-click on the specified element.
   * @param locator - The Locator object representing the element.
   */
  static async performDoubleClick(locator: Locator): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'double-clicking');
      logger.info('Double-clicking on element.');
      await locator.dblclick();
    } catch (error: unknown) {
      this.handleError(error, 'double-clicking on element');
    }
  }

  /**
   * Perform a mouse hover over the specified element.
   * @param locator - The Locator object representing the element.
   */
  static async performMousehover(locator: Locator): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'hovering');
      logger.info('Hovering over element.');
      await locator.hover();
    } catch (error: unknown) {
      this.handleError(error, 'hovering over element');
    }
  }

  /**
   * Perform a scroll action on the page.
   * @param page - The Playwright Page object.
   * @param x - The horizontal scroll distance.
   * @param y - The vertical scroll distance.
   */
  static async performScroll(page: Page, x: number, y: number): Promise<void> {
    try {
      logger.info(`Scrolling page by x: ${x}, y: ${y}`);
      await page.mouse.wheel(x, y);
    } catch (error: unknown) {
      this.handleError(error, 'scrolling the page');
    }
  }

  /**
   * Upload a file to an input element.
   * @param locator - The Locator object for the file input element.
   * @param filePath - Path to the file to upload.
   */
  static async performUploadFile(
    locator: Locator,
    filePath: string,
  ): Promise<void> {
    try {
      await this.ensureElementVisible(locator, 'uploading file');
      logger.info(`Uploading file: ${filePath}`);
      await locator.setInputFiles(filePath);
    } catch (error: unknown) {
      this.handleError(error, 'uploading file');
    }
  }

  /**
   * Accept the browser alert.
   * @param page - The Playwright Page object.
   */
  static async acceptAlert(page: Page): Promise<void> {
    try {
      logger.info('Accepting the alert.');
      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    } catch (error: unknown) {
      this.handleError(error, 'accepting alert');
    }
  }

  /**
   * Dismiss the browser alert.
   * @param page - The Playwright Page object.
   */
  static async dismissAlert(page: Page): Promise<void> {
    try {
      logger.info('Dismissing the alert.');
      page.on('dialog', async (dialog) => {
        await dialog.dismiss();
      });
    } catch (error: unknown) {
      this.handleError(error, 'dismissing alert');
    }
  }

  /**
   * Handle new browser windows/tabs.
   * @param page - The Playwright Page object.
   * @param action - The action to take: 'wait' or 'close'.
   */
  static async handleWindowTab(
    page: Page,
    action: 'wait' | 'close',
  ): Promise<void> {
    try {
      logger.info(`Handling new window/tab with action: ${action}`);
      const [newPage] = await Promise.all([page.waitForEvent('popup')]);
      if (action === 'wait') {
        await newPage.waitForLoadState();
      } else if (action === 'close') {
        await newPage.close();
      }
    } catch (error: unknown) {
      this.handleError(error, 'handling window/tab');
    }
  }

  /**
   * Check and select a checkbox if not already selected.
   * @param locator - The Locator object for the checkbox.
   */
  static async selectCheckBox(locator: Locator): Promise<void> {
    try {
      const isChecked = await locator.isChecked();
      if (!isChecked) {
        logger.info('Selecting checkbox.');
        await locator.check();
      } else {
        logger.info('Checkbox already selected.');
      }
    } catch (error: unknown) {
      this.handleError(error, 'checking checkbox');
    }
  }

  /**
   * Uncheck and deselect a checkbox if selected.
   * @param locator - The Locator object for the checkbox.
   */
  static async unSelectTheCheckBox(locator: Locator): Promise<void> {
    try {
      const isChecked = await locator.isChecked();
      if (isChecked) {
        logger.info('Deselecting checkbox.');
        await locator.uncheck();
      } else {
        logger.info('Checkbox already deselected.');
      }
    } catch (error: unknown) {
      this.handleError(error, 'unchecking checkbox');
    }
  }

  /**
   * Select a radio button if not already selected.
   * @param locator - The Locator object for the radio button.
   */
  static async selectRadioButtonIfNotSelected(locator: Locator): Promise<void> {
    try {
      const isSelected = await locator.isChecked();
      if (!isSelected) {
        logger.info('Selecting radio button.');
        await locator.check();
      } else {
        logger.info('Radio button already selected.');
      }
    } catch (error: unknown) {
      this.handleError(error, 'selecting radio button');
    }
  }

  /**
   * Wait for the page to be in the "load" state.
   * @param page - The Playwright Page object.
   */
  static async waitForPageToLoad(page: Page): Promise<void> {
    try {
      logger.info('Waiting for page load state "load".');
      await page.waitForLoadState('load');
    } catch (error: unknown) {
      this.handleError(error, 'waiting for page to load');
    }
  }

  /**
   * Wait for the page to be in the "DOMContentLoaded" state.
   * @param page - The Playwright Page object.
   */
  static async waitForDOMContentToBeLoaded(page: Page): Promise<void> {
    try {
      logger.info('Waiting for page to be in the "DOMContentLoaded" state.');
      await page.waitForLoadState('domcontentloaded');
    } catch (error: unknown) {
      this.handleError(error, 'waiting for DOMContentLoaded');
    }
  }

  /**
   * Wait for the page to be in the "networkidle" state.
   * @param page - The Playwright Page object.
   */
  static async waitForNetworkToBeIdle(page: Page): Promise<void> {
    try {
      logger.info('Waiting for page to be in the "networkidle" state.');
      await page.waitForLoadState('networkidle');
    } catch (error: unknown) {
      this.handleError(error, 'waiting for network to be idle');
    }
  }

  /**
   * Mock an API request and respond with mock data.
   * @param page - The Playwright Page object.
   * @param urlPattern - The URL pattern to match the request.
   * @param responseBody - The mock response body.
   * @param statusCode - The status code for the mock response.
   */
  static async mockAPIRequest(
    page: Page,
    urlPattern: string,
    responseBody: string,
    statusCode: number,
  ): Promise<void> {
    try {
      logger.info(
        `Mocking API for ${urlPattern} with status code ${statusCode}`,
      );
      await page.route(urlPattern, async (route) => {
        await route.fulfill({
          status: statusCode,
          body: responseBody,
          contentType: 'application/json',
        });
      });
    } catch (error: unknown) {
      this.handleError(error, 'mocking API request');
    }
  }

  /**
   * Mock a network request with a specific response.
   * @param page - The Playwright Page object.
   * @param url - The URL pattern to intercept.
   * @param response - The mock response object.
   */
  static async mockRequest(
    page: Page,
    url: string,
    response: any,
  ): Promise<void> {
    try {
      logger.info(`Mocking request for URL: ${url}`);
      await page.route(url, (route) =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(response),
        }),
      );
    } catch (error: unknown) {
      this.handleError(error, 'mocking network request');
    }
  }

  /**
   * Mock a request and delay the response.
   * @param page - The Playwright Page object.
   * @param url - The URL pattern to intercept.
   * @param delayMs - The delay in milliseconds.
   * @param response - The mock response object.
   */
  static async mockRequestWithDelay(
    page: Page,
    url: string,
    delayMs: number,
    response: any,
  ): Promise<void> {
    try {
      logger.info(`Mocking request with delay for URL: ${url}`);
      await page.route(url, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(response),
        });
      });
    } catch (error: unknown) {
      this.handleError(error, 'mocking network request with delay');
    }
  }
  /**
   * Perform drag and drop action from source to target element.
   * @param page - The Playwright Page object.
   * @param sourceLocator - The locator of the element to be dragged.
   * @param targetLocator - The locator of the target element where the source should be dropped.
   */
  static async performDragAndDrop(
    page: Page,
    sourceLocator: Locator,
    targetLocator: Locator,
  ): Promise<void> {
    try {
      logger.info('Starting drag and drop action');

      // Perform drag and drop
      await sourceLocator.dragTo(targetLocator);

      logger.info('Drag and drop action completed');
    } catch (error: unknown) {
      this.handleError(error, 'performing drag and drop');
    }
  }

  /**
   * Wait for the page to load until the element is visible or ready.
   * @param page - The Playwright Page object.
   * @param locator - The locator of the element to wait for.
   * @param timeout - Optional timeout value, default is 30 seconds.
   */
  static async waitForElementVisible(
    page: Page,
    locator: Locator,
    timeout: number = 30000,
  ): Promise<void> {
    try {
      logger.info(`Waiting for element to be visible: ${locator}`);
      await locator.waitFor({ state: 'visible', timeout });
      logger.info(`Element is visible: ${locator}`);
    } catch (error: unknown) {
      this.handleError(error, 'waiting for element to be visible');
    }
  }

  /**
   * Wait for the page to be interactive (i.e., ready for interaction, not in the middle of a page transition).
   * @param page - The Playwright Page object.
   * @param timeout - Optional timeout value, default is 30 seconds.
   */
  static async waitForPageInteractive(
    page: Page,
    timeout: number = 30000,
  ): Promise<void> {
    try {
      logger.info('Waiting for page to be interactive');
      await page.waitForLoadState('domcontentloaded', { timeout });
      logger.info('Page is interactive now');
    } catch (error: unknown) {
      this.handleError(error, 'waiting for page to be interactive');
    }
  }
  /**
   * Wait for the page to be idle (i.e., no network activity and all requests are completed).
   * @param page - The Playwright Page object.
   * @param timeout - Optional timeout value, default is 30 seconds.
   */
  static async waitForPageIdle(
    page: Page,
    timeout: number = 30000,
  ): Promise<void> {
    try {
      logger.info('Waiting for page to be idle');
      await page.waitForLoadState('networkidle', { timeout });
      logger.info('Page is idle');
    } catch (error: unknown) {
      this.handleError(error, 'waiting for page to be idle');
    }
  }

  /**
   * Perform a keyboard action such as typing into an input field or pressing keys.
   * @param locator - The locator of the input field or element to interact with.
   * @param text - The text to type or a keyboard input action (e.g., 'Enter', 'Backspace').
   * @param delay - Optional delay between keystrokes.
   */
  static async performKeyboardAction(
    locator: Locator,
    text: string,
    delay: number = 100,
  ): Promise<void> {
    try {
      logger.info(
        `Performing keyboard action on ${locator} with text: ${text}`,
      );
      await locator.pressSequentially(text, { delay });
      logger.info(`Keyboard action completed: ${text}`);
    } catch (error: unknown) {
      this.handleError(error, 'performing keyboard action');
    }
  }

  /**
   * Press a key on the keyboard.
   * @param page - The Playwright Page object.
   * @param key - The key to press (e.g., 'Enter', 'Escape', 'Backspace').
   */
  static async pressKey(page: Page, key: string): Promise<void> {
    try {
      logger.info(`Pressing the key: ${key}`);
      await page.keyboard.press(key);
      logger.info(`Key pressed: ${key}`);
    } catch (error: unknown) {
      this.handleError(error, 'pressing key');
    }
  }

  /**
   * Retrieve all options (values) from a dropdown.
   * @param locator - The locator for the dropdown (select element).
   * @returns An array of option text values.
   */
  static async getDropdownValues(locator: Locator): Promise<string[]> {
    try {
      logger.info(`Retrieving dropdown values from locator: ${locator}`);

      // Extract all option elements from the dropdown
      const options = await locator.locator('option').allTextContents();

      // Log the extracted values
      logger.info(`Dropdown values retrieved: ${options.join(', ')}`);

      return options;
    } catch (error: unknown) {
      this.handleError(error, 'retrieving dropdown values');
      return [];
    }
  }
  /**
   * Handle errors.
   * @param error - The error object.
   * @param action - The action during which the error occurred.
   */
  public static handleError(error: unknown, action: string): void {
    logger.error(
      `Error occurred during ${action}: ${error instanceof Error ? error.message : error}`,
    );
    throw new Error(`Failed to perform ${action}`);
  }
}
