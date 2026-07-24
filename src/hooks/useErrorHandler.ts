// src/hooks/useErrorHandler.ts
import { useCallback } from 'react';
import { ErrorFactory } from '../utils/errorFactory';
import { errorLogger } from '../utils/errorLogger';
import { NetworkErrorHandler, ValidationErrorHandler } from '../utils';
import { useToast } from '../components/error/ToastContainer';

export const useErrorHandler = () => {
  const { error: showErrorToast, success, warning, info } = useToast();

  const handleError = useCallback((error: any, showToast: boolean = true) => {
    const appError = ErrorFactory.fromError(error);
    errorLogger.log(appError);

    if (showToast) {
      const message = NetworkErrorHandler.getErrorMessage(appError);
      showErrorToast('Error', message);
    }

    return appError;
  }, [showErrorToast]);

  const handleValidationErrors = useCallback((errors: any[], showToast: boolean = true) => {
    ValidationErrorHandler.logValidationErrors(errors);

    if (showToast && errors.length > 0) {
      const message = errors.map(e => e.message).join(', ');
      showErrorToast('Validation Error', message);
    }

    return ValidationErrorHandler.formatValidationErrors(errors);
  }, [showErrorToast]);

  const handleAsync = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    context?: string,
    showToast: boolean = true
  ): Promise<T> => {
    try {
      return await NetworkErrorHandler.handleRequest(asyncFn, context);
    } catch (error) {
      handleError(error, showToast);
      throw error;
    }
  }, [handleError]);

  const handleAsyncWithRetry = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    maxRetries: number = 3,
    context?: string,
    showToast: boolean = true
  ): Promise<T> => {
    try {
      return await NetworkErrorHandler.retryRequest(asyncFn, maxRetries, 1000, context);
    } catch (error) {
      handleError(error, showToast);
      throw error;
    }
  }, [handleError]);

  return {
    handleError,
    handleValidationErrors,
    handleAsync,
    handleAsyncWithRetry,
    showSuccess: success,
    showWarning: warning,
    showInfo: info,
    showError: showErrorToast
  };
};