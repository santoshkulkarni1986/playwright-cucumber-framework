import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import logger from '../../Utility/logger';

let loginPage: LoginPage;

Given('I navigate to the login page', async function () {
  loginPage = new LoginPage(); // Access the page fixture
  await loginPage.navigateToLoginPage(); // Call method to navigate to login
});

When('I enter the userName {string}', async function (username: string) {
  await loginPage.enterUserName(username); // Enter username
});

When('I enter the password {string}', async function (password: string) {
  await loginPage.enterPassword(password); // Enter password
});

When('I click the login button', async function () {
  await loginPage.clickLoginButton();
});
Then('I should be redirected to the dashboard', async function () {
  const currentUrl = await this.page.url(); // Get the current URL
  expect(currentUrl).toContain('dashboard'); // Assert dashboard redirection
});
