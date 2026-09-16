import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { HTTP_STATUS } from './constants/http-status';
import { morganMiddleware } from './middlewares/logger.middleware';

const app: Express = express();

app.use(helmet());
app.use(cors());
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

export default app;
