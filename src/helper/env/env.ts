import * as dotenv from 'dotenv';
import logger from '../../Utility/logger';
export const getEnv = () => {
  if (process.env.ENV) {
    dotenv.config({
      override: true,
      path: `src/helper/env/.env.${process.env.ENV}`,
    });
  } else {
    logger.info('NO ENV PASSED!');
  }
};
