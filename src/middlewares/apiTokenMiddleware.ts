import { NextFunction, Request, Response } from "express";

const apiTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-api-token'];
    if (token !== process.env.X_API_TOKEN || !token) {
        res.status(401).json({ message: 'unauthorized' });
        return;
    }
    next();
};

export default apiTokenMiddleware;