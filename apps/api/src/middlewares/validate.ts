import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { ValidationError } from '../utils/errors.js';

export const validate = (schema: ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Update the request with the validated/coerced data
      req.body = validatedData.body;
      req.query = validatedData.query as any;
      req.params = validatedData.params as any;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(new ValidationError('Invalid request data'));
      }
    }
  };
};
