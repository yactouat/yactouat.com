import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

import ApiResponseInfra from "../infra/ApiResponse";
import LoggerInfra from "../infra/Logger";

const updateFavicon = async (req: Request, res: Response) => {
    const logger = new LoggerInfra();
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const favicon = files.favicon?.[0];
        if (!favicon) {
            return res.status(400).json(new ApiResponseInfra('no file uploaded'));
        }

        // define source and destination paths
        const sourcePath = favicon.path;
        const destPath = path.join(__dirname, '..', 'public', 'favicon.ico');

        // copy file from tmp to public directory
        fs.copyFileSync(sourcePath, destPath);

        // delete the temporary file
        fs.unlinkSync(sourcePath);

        res.status(200).json(new ApiResponseInfra('favicon updated'));
    } catch (error) {
        logger.logMessage({
            context: 'faviconController',
            message: `error updating favicon: ${error}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponseInfra('error updating favicon'));
    }
};

export default updateFavicon;