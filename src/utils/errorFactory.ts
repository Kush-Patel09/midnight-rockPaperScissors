// src/utils/errorFactory.ts
import { ErrorType, AppError, ValidationError, NetworkError } from './errorTypes';

export class ErrorFactory {
  static createNetworkError(
    message: string,
    status?: number,
    url?: string,
    details?: any
  ): NetworkError {
    return {
      type: ErrorType.NETWORK,
      message,
      status,
      url,
      details,
      timestamp: new Date(),
      context: 'Network request failed'
    };
  }

  static createValidationError(
    field: string,
    message: string,
    value?: any
  ): ValidationError {
    return {
      field,
      message,
      value
    };
  }

  static createAuthError(message: string, code?: string): AppError {
    return {
      type: ErrorType.AUTHENTICATION,
      message,
      code,
      timestamp: new Date(),
      context: 'Authentication failed'
    };
  }

  static createServerError(message: string, code?: string | number, details?: any): AppError {
    return {
      type: ErrorType.SERVER,
      message,
      code,
      details,
      timestamp: new Date(),
      context: 'Server error occurred'
    };
  }

  static createClientError(message: string, details?: any): AppError {
    return {
      type: ErrorType.CLIENT,
      message,
      details,
      timestamp: new Date(),
      context: 'Client error occurred'
    };
  }

  static createUnknownError(error: any): AppError {
    return {
      type: ErrorType.UNKNOWN,
      message: error?.message || 'An unknown error occurred',
      details: error,
      timestamp: new Date(),
      context: 'Unknown error'
    };
  }

  static fromError(error: any): AppError {
    if (error?.type && Object.values(ErrorType).includes(error.type)) {
      return error;
    }

    // Handle Axios/Network errors
    if (error?.response) {
      return this.createNetworkError(
        error.response.data?.message || error.message,
        error.response.status,
        error.config?.url,
        error.response.data
      );
    }

    // Handle fetch errors
    if (error?.status) {
      return this.createNetworkError(
        error.message || 'Network request failed',
        error.status,
        error.url,
        error
      );
    }

    // Handle validation errors
    if (error?.field) {
      return this.createClientError(
        `Validation error: ${error.message}`,
        { field: error.field, value: error.value }
      );
    }

    return this.createUnknownError(error);
  }
}