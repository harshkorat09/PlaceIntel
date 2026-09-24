import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let code = 'INTERNAL_ERROR';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = 'APP_ERROR';
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map((e: any) => e.message).join(', ');
    code = 'VALIDATION_ERROR';
  }

  // Do not leak stack traces in production responses
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    }
  });
};
