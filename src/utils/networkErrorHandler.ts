// src/utils/networkErrorHandler.ts
import { ErrorFactory } from './errorFactory';
import { errorLogger } from './errorLogger';

export class NetworkErrorHandler {
  static async handleRequest<T>(
    requestFn: () => Promise<T>,
    context?: string
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error: any) {
      const appError = ErrorFactory.fromError(error);
      if (appError.type === 'NETWORK') {
        appError.context = context || appError.context;
      }
      errorLogger.log(appError);

      throw appError;
    }
  }

  static isNetworkError(error: any): boolean {
    return error?.type === 'NETWORK';
  }

  static getErrorMessage(error: any): string {
    if (this.isNetworkError(error)) {
      switch (error.status) {
        case 400:
          return 'Bad request. Please check your input.';
        case 401:
          return 'Authentication required. Please log in.';
        case 403:
          return 'Access denied. You don\'t have permission.';
        case 404:
          return 'Resource not found.';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return error.message || 'Network error occurred.';
      }
    }
    return error?.message || 'An error occurred.';
  }

  static shouldRetry(error: any): boolean {
    if (!this.isNetworkError(error)) return false;

    // Retry on 5xx errors, network failures, or timeouts
    const retryableStatuses = [500, 502, 503, 504];
    return retryableStatuses.includes(error.status) ||
           error.code === 'NETWORK_ERROR' ||
           error.code === 'TIMEOUT';
  }

  static async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
    context?: string
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.handleRequest(requestFn, context);
      } catch (error) {
        lastError = error;

        if (!this.shouldRetry(error) || attempt === maxRetries) {
          throw error;
        }

        // Exponential backoff
        const waitTime = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    throw lastError;
  }
}