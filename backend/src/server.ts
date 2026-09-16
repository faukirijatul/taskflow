import app from './app';
import { ENV } from './config/env';
import { logger } from './config/logger';

const server = app.listen(ENV.PORT, () => {
  logger.info(
    `[server]: Server is running at http://localhost:${ENV.PORT} in ${ENV.NODE_ENV} mode`,
  );
});

const handleShutdown = (signal: string) => {
  logger.info(`[server]: ${signal} signal received. Closing HTTP server...`);
  server.close(() => {
    logger.info('[server]: HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
