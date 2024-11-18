"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ApiResponse_1 = __importDefault(require("../infra/ApiResponse"));
const Logger_1 = __importDefault(require("../infra/Logger"));
const updateFavicon = (req, res) => {
    var _a;
    const logger = new Logger_1.default();
    try {
        const files = req.files;
        const favicon = (_a = files.favicon) === null || _a === void 0 ? void 0 : _a[0];
        if (!favicon) {
            return res.status(400).json(new ApiResponse_1.default('no file uploaded'));
        }
        // define source and destination paths
        const sourcePath = favicon.path;
        const destPath = path_1.default.join(__dirname, '..', 'public', 'favicon.ico');
        // copy file from tmp to public directory
        fs_1.default.copyFileSync(sourcePath, destPath);
        // delete the temporary file
        fs_1.default.unlinkSync(sourcePath);
        res.status(200).json(new ApiResponse_1.default('favicon updated'));
    }
    catch (error) {
        logger.logMessage({
            context: 'favicon-controller',
            message: `error updating favicon: ${error}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponse_1.default('error updating favicon'));
    }
};
exports.default = updateFavicon;
