import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { HTTP_STATUS, HttpStatusCode } from '../constants/http-status';
import { logger } from '../config/logger';
import { ENV } from '../config/env';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode: HttpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errors: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else {
    logger.error('Unhandled Error:', err);
  }

  const responseBody: Record<string, unknown> = {
    status: 'error',
    message,
  };

  if (errors !== undefined) {
    responseBody.errors = errors;
  }

  if (ENV.NODE_ENV === 'development' && err.stack) {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};
