"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readShortBio = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readShortBio = () => {
    const shortBioPath = path_1.default.join(__dirname, '..', '..', 'html', 'short-bio.html');
    return fs_1.default.readFileSync(shortBioPath, 'utf8');
};
exports.readShortBio = readShortBio;
