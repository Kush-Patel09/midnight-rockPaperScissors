// src/utils/validationErrorHandler.ts
import { ValidationError } from './errorTypes';
import { ErrorFactory } from './errorFactory';
import { errorLogger } from './errorLogger';

export class ValidationErrorHandler {
  static validateEmail(email: string): ValidationError | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return ErrorFactory.createValidationError('email', 'Email is required');
    }
    if (!emailRegex.test(email)) {
      return ErrorFactory.createValidationError('email', 'Please enter a valid email address');
    }
    return null;
  }

  static validateRequired(value: any, fieldName: string): ValidationError | null {
    if (value === null || value === undefined || value === '') {
      return ErrorFactory.createValidationError(fieldName, `${fieldName} is required`);
    }
    return null;
  }

  static validateMinLength(value: string, minLength: number, fieldName: string): ValidationError | null {
    if (value && value.length < minLength) {
      return ErrorFactory.createValidationError(
        fieldName,
        `${fieldName} must be at least ${minLength} characters long`
      );
    }
    return null;
  }

  static validateMaxLength(value: string, maxLength: number, fieldName: string): ValidationError | null {
    if (value && value.length > maxLength) {
      return ErrorFactory.createValidationError(
        fieldName,
        `${fieldName} must be no more than ${maxLength} characters long`
      );
    }
    return null;
  }

  static validateUrl(url: string): ValidationError | null {
    try {
      new URL(url);
      return null;
    } catch {
      return ErrorFactory.createValidationError('url', 'Please enter a valid URL');
    }
  }

  static validatePhone(phone: string): ValidationError | null {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone && !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return ErrorFactory.createValidationError('phone', 'Please enter a valid phone number');
    }
    return null;
  }

  static validateForm<T extends Record<string, any>>(
    data: T,
    rules: Partial<Record<keyof T, ((value: any) => ValidationError | null)[]>>
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = data[field];
      for (const rule of fieldRules!) {
        const error = rule(value);
        if (error) {
          errors.push(error);
          break; // Stop at first error for this field
        }
      }
    }

    return errors;
  }

  static logValidationErrors(errors: ValidationError[]): void {
    errors.forEach(error => {
      const appError = ErrorFactory.createClientError(
        `Validation error: ${error.message}`,
        { field: error.field, value: error.value }
      );
      errorLogger.log(appError);
    });
  }

  static formatValidationErrors(errors: ValidationError[]): Record<string, string> {
    return errors.reduce((acc, error) => {
      acc[error.field] = error.message;
      return acc;
    }, {} as Record<string, string>);
  }
}

// Common validation rules
export const validationRules = {
  required: (fieldName: string) => (value: any) =>
    ValidationErrorHandler.validateRequired(value, fieldName),

  email: () => (value: string) =>
    ValidationErrorHandler.validateEmail(value),

  minLength: (minLength: number, fieldName: string) => (value: string) =>
    ValidationErrorHandler.validateMinLength(value, minLength, fieldName),

  maxLength: (maxLength: number, fieldName: string) => (value: string) =>
    ValidationErrorHandler.validateMaxLength(value, maxLength, fieldName),

  url: () => (value: string) =>
    ValidationErrorHandler.validateUrl(value),

  phone: () => (value: string) =>
    ValidationErrorHandler.validatePhone(value),
};