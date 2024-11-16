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
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("@google-cloud/logging");
const error_reporting_1 = require("@google-cloud/error-reporting");
const strings_1 = require("../constants/strings");
class LoggerInfra {
    constructor() {
        this._errors = new error_reporting_1.ErrorReporting();
        const projectId = process.env.GCP_PROJECT_ID;
        const logging = new logging_1.Logging({
            projectId,
        });
        this._log = logging.log(`projects/${projectId}/logs/${strings_1.SERVICE_NAME}`);
    }
    logMessage(log_1) {
        return __awaiter(this, arguments, void 0, function* (log, severity = 'INFO') {
            const metadata = {
                resource: {
                    type: 'global',
                },
                severity
            };
            const entry = this._log.entry(metadata, log);
            yield this._log.write(entry);
            switch (severity) {
                case "ALERT":
                case "CRITICAL":
                case "EMERGENCY":
                case "ERROR":
                    console.error(log.message);
                    break;
                case "DEBUG":
                    console.debug(log.message);
                    break;
                case "INFO":
                    console.info(log.message);
                    break;
                case "WARNING":
                    console.warn(log.message);
                    break;
                default:
                    console.log(log.message);
            }
        });
    }
    reportError(message) {
        console.error(message);
        this._errors.report(message);
    }
}
exports.default = LoggerInfra;
