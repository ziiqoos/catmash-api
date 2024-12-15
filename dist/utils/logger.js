"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "info";
    LogLevel["ERROR"] = "error";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor(logDir = 'logs') {
        this.logFilePath = '';
        this.genLogs = process.env.GEN_LOGS;
        if (this.genLogs) {
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir);
            }
            this.logFilePath = path.join(logDir, 'app.log');
        }
    }
    writeToFile(message) {
        const logMessage = `${message}\n`;
        fs.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err.message);
            }
        });
    }
    log(level, message) {
        const timestamp = new Date().toISOString();
        const formattedMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
        if (this.genLogs) {
            this.writeToFile(formattedMessage);
        }
        else {
            console.log(formattedMessage);
        }
    }
    info(message) {
        this.log(LogLevel.INFO, message);
    }
    error(message) {
        this.log(LogLevel.ERROR, message);
    }
    httpInfo(method, endpoint, body, status) {
        const message = `Request: ${method} ${endpoint} | Body: ${body.toString()} | Status: ${status}`;
        this.log(LogLevel.INFO, message);
    }
    httpError(method, endpoint, body, status, error) {
        const message = `Request: ${method} ${endpoint} | Body: ${body.toString()} | Status: ${status} | error: ${error}`;
        this.log(LogLevel.INFO, message);
    }
}
exports.logger = new Logger('logs');
