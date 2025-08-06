/***Author 
 * Santosh Kulkarni
 */
const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',
  reportPath: 'test-results/reports/',
  reportName: 'Playwright Automation Report',
  pageTitle: 'Login Application',
  displayDuration: false,
  metadata: {
    browser: {
      name: 'chrome',
      version: '112',
    },
    device: 'Santosh Kulkarni & Kanchan Pandit',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
  customData: {
    title: 'Login Scenario',
    data: [
      { label: 'Project', value: 'Login Application' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'Smoke-1' },
    ],
  },
});
