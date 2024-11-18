"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiTokenMiddleware = (req, res, next) => {
    const token = req.headers['x-api-token'];
    if (token !== process.env.X_API_TOKEN) {
        return res.status(401).json({ message: 'unauthorized' });
    }
    next();
};
exports.default = apiTokenMiddleware;
