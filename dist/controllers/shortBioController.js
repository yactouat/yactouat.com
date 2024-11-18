"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ApiResponse_1 = __importDefault(require("../infra/ApiResponse"));
const Logger_1 = __importDefault(require("../infra/Logger"));
const updateShortBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logger = new Logger_1.default();
    try {
        const files = req.files;
        const shortBio = (_a = files.shortbio) === null || _a === void 0 ? void 0 : _a[0];
        if (!shortBio) {
            return res.status(400).json(new ApiResponse_1.default('no file uploaded'));
        }
        // define source and destination paths
        const sourcePath = shortBio.path;
        const destPath = path_1.default.join(__dirname, '..', '..', 'html', 'short-bio.html');
        // copy file from tmp to public directory
        fs_1.default.copyFileSync(sourcePath, destPath);
        // delete the temporary file
        fs_1.default.unlinkSync(sourcePath);
        res.status(200).json(new ApiResponse_1.default('short bio updated'));
    }
    catch (error) {
        logger.logMessage({
            context: 'short-bio-controller',
            message: `error updating short bio: ${error}`,
            serialized_data: '',
            time: new Date().toISOString()
        }, "ERROR");
        res.status(500).json(new ApiResponse_1.default('error updating short bio'));
    }
});
exports.default = updateShortBio;
