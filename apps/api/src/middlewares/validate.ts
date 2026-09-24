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
      // req.query and req.params are getters in Express, modifying them directly can fail. 
      // Coercion from Zod is usually for body anyway.

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        console.error('Validate Error:', error);
        next(error); // Pass actual error
      }
    }
  };
};
