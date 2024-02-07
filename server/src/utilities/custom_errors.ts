/**
 * This file defines some custom errors that can be thrown by the application.
 */

/**
 * This error shall be thrown when there is some data conflict that has occurred.
 */
export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * This error shall be thrown when a validation or sanitization check fails.
 */
export class ValidationSanitizationError extends Error {
  static message: string;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}