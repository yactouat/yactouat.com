import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { NextFunction, Request, Response, Router } from 'express';

import ApiResponseInfra from './infra/ApiResponse';
import LoggerInfra from './infra/Logger';
import { SERVICE_NAME } from './constants/strings';

(async () => {
    const loggerInfra = new LoggerInfra();

    const app = express();
    const PORT = process.env.PORT || 6000;

    app.use(cors());
    app.use(express.json());

    const apiRouter = Router();

    apiRouter.get('/', (req: Request, res: Response) => {
        res.json(new ApiResponseInfra("yactouat.com API is up"));
    });

    // 500 error handler for API routes
    apiRouter.use('*', async (err: Error, req: Request, res: Response, next: NextFunction) => {
        await loggerInfra.logMessage({
            context: SERVICE_NAME,
            message: err.message,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponseInfra('Something went wrong, please try again later'));
    });

    app.use('/api', apiRouter);

    // 404 error handler
    app.get('*', (req: Request, res: Response) => {
        res.status(404).json(new ApiResponseInfra('resource not found'));
    });

    app.listen(PORT, () => {
        loggerInfra.logMessage({
            context: SERVICE_NAME,
            message: `${SERVICE_NAME} is running on http://localhost:${PORT}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "INFO");
    });
})();