import {Log, Logging} from "@google-cloud/logging";
import {ErrorReporting} from "@google-cloud/error-reporting";

import { SERVICE_NAME } from "../constants/strings";

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
type LogSeverity = 'DEBUG' | 'INFO' | 'NOTICE' | 'WARNING' | 'ERROR' | 'CRITICAL' | 'ALERT' | 'EMERGENCY';
type StructuredLog = {
    context: string;
    message: string;
    serialized_data: string;
    time: string;
}

class LoggerInfra {

    private _errors: ErrorReporting;
    private _log: Log;

    constructor() {
        this._errors = new ErrorReporting();

        const projectId = process.env.GCP_PROJECT_ID as string;
        const logging = new Logging({
            projectId,
        });
        this._log = logging.log(`projects/${projectId}/logs/${SERVICE_NAME}`);
    }

    async logMessage(log: StructuredLog, severity: LogSeverity = 'INFO') {
        const metadata = {
            resource: {
                type: 'global',
            },
            severity
        };
        const entry = this._log.entry(metadata, log);
        await this._log.write(entry);
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
    }

    reportError(message: string) {
        console.error(message);
        this._errors.report(message);
    }

}

export default LoggerInfra;