import winston from 'winston';
import { ENV } from './env';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  ENV.NODE_ENV === 'development'
    ? winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      )
    : winston.format.json(),
);

const transports = [new winston.transports.Console()];

export const logger = winston.createLogger({
  level: ENV.NODE_ENV === 'development' ? 'debug' : 'info',
  levels,
  format,
  transports,
});
