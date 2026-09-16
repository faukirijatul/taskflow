import morgan, { StreamOptions } from 'morgan';
import { logger } from '../config/logger';
import { ENV } from '../config/env';

const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  const env = ENV.NODE_ENV || 'development';
  return env !== 'development';
};

export const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);
