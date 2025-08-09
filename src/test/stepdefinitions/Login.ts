import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

let loginPage: LoginPage;

Given('I navigate to the login page', async function () {
  // Access the page fixture
  loginPage = new LoginPage(); 
  // Call method to navigate to login
  await loginPage.navigateToLoginPage(); 
});

When('I enter the userName {string}', async function (username: string) {
  // Enter username
  await loginPage.enterUserName(username); 
});

When('I enter the password {string}', async function (password: string) {
   // Enter password
  await loginPage.enterPassword(password);
});

When('I click the login button', async function () {
  await loginPage.clickLoginButton();
});
Then('I should be redirected to the dashboard', async function () {
  // Get the current URL
  const currentUrl = await this.page.url(); 
  // Assert dashboard redirection
  expect(currentUrl).toContain('dashboard'); 
});
