/***Author 
 * Santosh Kulkarni 
 */
import { expect, Locator, Page } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture'; // Import pageFixture
import logger from '../Utility/logger'; // Ensure you have a LoggerUtility file set up for Winston configuration.
import { PlaywrightWrapperUtility } from '../Utility/PlaywrightWrapperUtility';
import { LocatorUtility } from '../Utility/LocatorUtility';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.ENV || 'test'}` }); // Load environment variables dynamically

export class LoginPage {
  private page: Page;

  constructor() {
    if (!pageFixture.page) {
      throw new Error('Page is not initialized in pageFixture.');
    }
    this.page = pageFixture.page;
  }

  /**
   * Navigate to the login page.
   */
  public async navigateToLoginPage(): Promise<void> {
    const action = 'navigating to the login page';
    try {
      logger.info(`Start ${action}`);
      //console.log("Loaded environment variables:", process.env); // Check if URL is loaded
      const baseUrl = process.env.URL || 'https://default-url.com'; // Fallback if URL is not found
      if (!process.env.URL) {
        logger.warn('URL is not set in the .env file. Using fallback URL.');
      }
      console.log('Using base URL:', baseUrl);
      await this.page.goto(baseUrl, { waitUntil: 'load' });
      logger.info('Successfully navigated to the login page.');
    } catch (error) {
      PlaywrightWrapperUtility.handleError(error, action);
    }
  }

  /**
   * Enter the username.
   * @param username - The username to be entered.
   */
  public async enterUserName(username: string): Promise<void> {
    const action = `entering username: ${username}`;
    try {
      logger.info(`Start ${action}`);
      const userNameInput = LocatorUtility.getByLabelLocator(
        this.page,
        'Username'
      );
      await PlaywrightWrapperUtility.enterText(userNameInput, username);
      logger.info(`Successfully entered username: ${username}`);
    } catch (error) {
      PlaywrightWrapperUtility.handleError(error, action);
    }
  }

  /**
   * Enter the password.
   * @param password - The password to be entered.
   */
  public async enterPassword(password: string): Promise<void> {
    const action = 'entering password';
    try {
      logger.info(`Start ${action}`);
      const passWordInput = LocatorUtility.getByLabelLocator(
        this.page,
        'Password'
      );
      await PlaywrightWrapperUtility.enterText(passWordInput, password);
      logger.info(`Successfully entered password.`);
    } catch (error) {
      PlaywrightWrapperUtility.handleError(error, action);

    }
  }

  /**
   * Click the login button.
   */
  public async clickLoginButton(): Promise<void> {
    const action = 'clicking the login button';
    try {
      logger.info(`Start ${action}`);
      const submitButton = LocatorUtility.getByRoleLocator(
        this.page,
        'button',
        { name: 'Submit' }
      );
      await PlaywrightWrapperUtility.clickOnElement(submitButton);
      logger.info(`Successfully clicked the login button.`);
    } catch (error) {
      PlaywrightWrapperUtility.handleError(error, action);
    }
  }
}
