import * as fs from 'fs';
import * as path from 'path';

enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
}

class Logger {
  private logFilePath: string;

  constructor(logDir: string = 'logs') {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    this.logFilePath = path.join(logDir, 'app.log');
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
    this.writeToFile(formattedMessage);
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

export const logger = new Logger('logs');