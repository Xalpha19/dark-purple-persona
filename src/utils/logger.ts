// Environment-aware logging utility
// Only logs detailed information in development; sanitizes errors in production

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  context?: string;
  data?: Record<string, unknown>;
}

const isDevelopment = import.meta.env.DEV;

/**
 * Sanitizes error information for production logging
 * Removes stack traces and sensitive details
 */
const sanitizeError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.name || 'An error occurred';
  }
  return 'An error occurred';
};

/**
 * Environment-aware logger that prevents information leakage in production
 */
export const logger = {
  debug: (message: string, options?: LogOptions): void => {
    if (isDevelopment) {
      console.debug(`[DEBUG]${options?.context ? ` [${options.context}]` : ''}: ${message}`, options?.data || '');
    }
  },

  info: (message: string, options?: LogOptions): void => {
    if (isDevelopment) {
      console.info(`[INFO]${options?.context ? ` [${options.context}]` : ''}: ${message}`, options?.data || '');
    }
  },

  warn: (message: string, options?: LogOptions): void => {
    if (isDevelopment) {
      console.warn(`[WARN]${options?.context ? ` [${options.context}]` : ''}: ${message}`, options?.data || '');
    }
  },

  error: (message: string, error?: unknown, options?: LogOptions): void => {
    if (isDevelopment) {
      // Full logging in development
      console.error(`[ERROR]${options?.context ? ` [${options.context}]` : ''}: ${message}`, error, options?.data || '');
    } else {
      // Sanitized logging in production - no stack traces or sensitive details
      console.error(`[ERROR]${options?.context ? ` [${options.context}]` : ''}: ${message} - ${sanitizeError(error)}`);
    }
  },

  /**
   * Log for security-related events (never exposes details in production)
   */
  security: (message: string, options?: LogOptions): void => {
    if (isDevelopment) {
      console.warn(`[SECURITY]${options?.context ? ` [${options.context}]` : ''}: ${message}`, options?.data || '');
    }
    // In production, security events would be sent to a monitoring service
    // but never logged to the console
  }
};

export default logger;
