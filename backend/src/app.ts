import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { HTTP_STATUS } from './constants/http-status';
import { morganMiddleware } from './middlewares/logger.middleware';
import { AppError } from './utils/app-error';
import { errorHandler } from './middlewares/error.middleware';
import { globalLimiter } from './config/rate-limit';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(globalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get('/health', (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError('Route not found', HTTP_STATUS.NOT_FOUND));
});

app.use(errorHandler);

export default app;
