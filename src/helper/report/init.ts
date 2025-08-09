import logger from '../../Utility/logger';
// Ensure the test-results directory exists and is empty
// This code ensures that the 'test-results' directory is created and emptied before running tests.
// If the directory cannot be created or emptied, it logs an error message.
const fs = require('fs-extra');
try {
  fs.ensureDir('test-results');
  fs.emptyDir('test-results');
} catch (error) {
  logger.info('Folder not created! ' + error);
}
