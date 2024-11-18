import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

import ApiResponseInfra from "../infra/ApiResponse";
import LoggerInfra from "../infra/Logger";

const updateShortBio = async (req: Request, res: Response) => {
    const logger = new LoggerInfra();
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const shortBio = files.shortbio?.[0];
        if (!shortBio) {
            return res.status(400).json(new ApiResponseInfra('no file uploaded'));
        }
        
        // define source and destination paths
        const sourcePath = shortBio.path;
        const destPath = path.join(__dirname, '..', '..', 'html', 'short-bio.html');

        // copy file from tmp to public directory
        fs.copyFileSync(sourcePath, destPath);

        // delete the temporary file
        fs.unlinkSync(sourcePath);

        res.status(200).json(new ApiResponseInfra('short bio updated'));
    } catch (error) {
        logger.logMessage({
            context: 'short-bio-controller',
            message: `error updating short bio: ${error}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponseInfra('error updating short bio'));
    }
};

export default updateShortBio;