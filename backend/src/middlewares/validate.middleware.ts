import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { AppError } from '../utils/app-error';
import { AnyZodObject, ZodError } from 'zod/v3';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.').replace(/^(body|query|params)\./, ''),
          message: err.message,
        }));
        next(new AppError('Validation Error', HTTP_STATUS.UNPROCESSABLE_ENTITY, formattedErrors));
      } else {
        next(error);
      }
    }
  };
