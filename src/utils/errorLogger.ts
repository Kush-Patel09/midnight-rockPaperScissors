// src/utils/errorLogger.ts
import { AppError, ErrorType } from './errorTypes';

export class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: AppError[] = [];
  private maxLogs = 100;

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  log(error: AppError): void {
    console.error(`[${error.type}] ${error.message}`, {
      code: error.code,
      timestamp: error.timestamp,
      context: error.context,
      details: error.details
    });

    this.logs.unshift(error);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // In production, you might want to send this to a logging service
    this.sendToLoggingService(error);
  }

  getLogs(type?: ErrorType): AppError[] {
    if (type) {
      return this.logs.filter(log => log.type === type);
    }
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getErrorStats(): Record<ErrorType, number> {
    const stats = {} as Record<ErrorType, number>;

    Object.values(ErrorType).forEach(type => {
      stats[type] = this.logs.filter(log => log.type === type).length;
    });

    return stats;
  }

  private sendToLoggingService(error: AppError): void {
    // In a real app, you might send to services like:
    // - Sentry
    // - LogRocket
    // - DataDog
    // - Custom logging API

    if (import.meta.env.PROD) {
      // Example: Send to logging service
      // fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(error)
      // }).catch(() => {
      //   // Silently fail if logging fails
      // });
    }
  }
}

export const errorLogger = ErrorLogger.getInstance();
