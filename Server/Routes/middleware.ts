import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
export const validateMiddleware = (whatToValidate: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(
      whatToValidate.map((validate) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next();
        }
        res.status(400).json({ errors: errors.array() });
      })
    );
  };
};
