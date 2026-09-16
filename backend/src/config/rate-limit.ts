import rateLimit from 'express-rate-limit';
import { ENV } from './env';
import { HTTP_STATUS } from '../constants/http-status';

export const globalLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  limit: ENV.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later',
  },
});

export const authLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  limit: ENV.RATE_LIMIT_AUTH_MAX_REQUESTS,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  message: {
    status: 'error',
    message: 'Too many attempts, please try again later',
  },
});
