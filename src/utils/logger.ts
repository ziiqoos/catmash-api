import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
}

class Logger {
  private logFilePath: string = '';
  private genLogs = process.env.GEN_LOGS;

  constructor(logDir: string = 'tmp') {
    if (this.genLogs) {
      this.logFilePath = path.join(logDir, 'app.log');
    }
  }

  private writeToFile(message: string): void {
    const logMessage = `${message}\n`;
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err.message);
      }
    });
  }

  private log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    if (this.genLogs) {
      this.writeToFile(formattedMessage);
    } else {
      console.log(formattedMessage)
    }
  }

  info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  httpInfo(method: string, endpoint: string, body: object | string, status: number) {
    const message = `Request: ${method} ${endpoint} | Body: ${body.toString()} | Status: ${status}`;
    this.log(LogLevel.INFO, message);
  }

  httpError(method: string, endpoint: string, body: object | string, status: number, error: string) {
    const message = `Request: ${method} ${endpoint} | Body: ${body.toString()} | Status: ${status} | error: ${error}`;
    this.log(LogLevel.INFO, message);
  }
}

export const logger = new Logger('tmp');
