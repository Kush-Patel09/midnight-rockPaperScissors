// src/utils/errorTypes.ts
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  details?: any;
  timestamp: Date;
  context?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface NetworkError extends AppError {
  type: ErrorType.NETWORK;
  status?: number;
  url?: string;
}