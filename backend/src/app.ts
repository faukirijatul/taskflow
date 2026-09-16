import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { HTTP_STATUS } from './constants/http-status';
import { morganMiddleware } from './middlewares/logger.middleware';
import { AppError } from './utils/app-error';
import { errorHandler } from './middlewares/error.middleware';
import { globalLimiter } from './config/rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(globalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the status and uptime of the API server.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   example: "2026-09-16T06:50:00.000Z"
 *                 uptime:
 *                   type: number
 *                   example: 12.34
 */
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
