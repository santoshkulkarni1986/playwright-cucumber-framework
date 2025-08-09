/***Author
 * Santosh Kulkarni
 */
import { Page, Locator } from 'playwright';
import logger from './logger';
type Role =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'generic'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'time'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export class LocatorUtility {
  /**
   * Locate an element by role.
   */
  static getByRoleLocator(
    page: Page,
    role: Role,
    options?: Parameters<Page['getByRole']>[1],
  ): Locator {
    try {
      logger.info(`Locating element by role: ${role}`);
      return page.getByRole(role, options);
    } catch (error) {
      logger.error(`Error locating element by role: ${role} - ${error}`);
      throw error;
    }
  }

  /**
   * Locate an element by text content.
   */
  static getByTextLocator(
    page: Page,
    text: string,
    options?: Parameters<Page['getByText']>[1],
  ): Locator {
    try {
      logger.info(`Locating element by text: ${text}`);
      return page.getByText(text, options);
    } catch (error) {
      logger.error(`Error locating element by text: ${text} - ${error}`);
      throw error;
    }
  }

  /**
   * Locate a form control by associated label's text.
   */
  static getByLabelLocator(
    page: Page,
    label: string,
    options?: Parameters<Page['getByLabel']>[1],
  ): Locator {
    try {
      logger.info(`Locating element by label: ${label}`);
      return page.getByLabel(label, options);
    } catch (error) {
      logger.error(`Error locating element by label: ${label} - ${error}`);
      throw error;
    }
  }

  /**
   * Locate an input by its placeholder text.
   */
  static getByPlaceholderLocator(
    page: Page,
    placeholder: string,
    options?: Parameters<Page['getByPlaceholder']>[1],
  ): Locator {
    try {
      logger.info(`Locating element by placeholder: ${placeholder}`);
      return page.getByPlaceholder(placeholder, options);
    } catch (error) {
      logger.error(
        `Error locating element by placeholder: ${placeholder} - ${error}`,
      );
      throw error;
    }
  }

  /**
   * Locate an element (usually an image) by its alt text.
   */
  static getByAltTextLocator(
    page: Page,
    altText: string,
    options?: Parameters<Page['getByAltText']>[1],
  ): Locator {
    try {
      logger.info(`Locating element by alt text: ${altText}`);
      return page.getByAltText(altText, options);
    } catch (error) {
      logger.error(`Error locating element by alt text: ${altText} - ${error}`);
      throw error;
    }
  }

  /**
   * Locate an element by its title attribute.
   */
  static getByTitleLocator(
    page: Page,
    title: string,
    options?: Parameters<Page['getByTitle']>[1],
  ): Locator {
    try {
      logger.info(`Locating element by title: ${title}`);
      return page.getByTitle(title, options);
    } catch (error) {
      logger.error(`Error locating element by title: ${title} - ${error}`);
      throw error;
    }
  }

  /**
   * Locate an element by its test ID.
   */
  static getByTestIdLocator(page: Page, testId: string): Locator {
    try {
      logger.info(`Locating element by test ID: ${testId}`);
      return page.getByTestId(testId);
    } catch (error) {
      logger.error(`Error locating element by test ID: ${testId} - ${error}`);
      throw error;
    }
  }

  /**
   * Static method to locate an element on the page.
   * @param page The Playwright page object.
   * @param selector The selector for the element.
   * @returns The locator object.
   */
  static async getLocator(page: Page, selector: string) {
    try {
      logger.info(`Attempting to find the element with selector: ${selector}`);

      // Check if the selector is a valid string
      if (!selector || typeof selector !== 'string') {
        throw new Error('The provided selector is not a valid string');
      }

      // Locate the element
      const locator = page.locator(selector);
      if ((await locator.count()) === 0) {
        throw new Error(`Element with selector '${selector}' not found`);
      }

      logger.info(`Successfully found the element with selector: ${selector}`);
      return locator;
    } catch (error: unknown) {
      // Check if error is an instance of Error
      if (error instanceof Error) {
        logger.error(
          `Error locating element with selector: ${selector}. Error: ${error.message}`,
        );
        throw error;
      } else {
        // In case the error is not an instance of Error
        const errorMsg = 'An unknown error occurred';
        logger.error(
          `Error locating element with selector: ${selector}. Error: ${errorMsg}`,
        );
        throw new Error(errorMsg);
      }
    }
  }
}
