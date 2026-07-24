// src/components/error/ErrorFallback.tsx
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Something went wrong</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We encountered an unexpected error. This has been logged and we're working to fix it.
          </p>
        </div>

        {error && import.meta.env.DEV && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-medium text-zinc-300 mb-2">Error Details:</h3>
            <pre className="text-xs text-red-400 font-mono whitespace-pre-wrap break-all">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-zinc-800 text-zinc-100 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>

        <p className="text-zinc-500 text-xs mt-6">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};
