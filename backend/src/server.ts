import app from './app';
import { ENV } from './config/env';

const server = app.listen(ENV.PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${ENV.PORT} in ${ENV.NODE_ENV} mode`,
  );
});

const handleShutdown = (signal: string) => {
  console.log(`[server]: ${signal} signal received. Closing HTTP server...`);
  server.close(() => {
    console.log('[server]: HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
