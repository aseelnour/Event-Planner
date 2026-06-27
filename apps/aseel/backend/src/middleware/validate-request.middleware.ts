import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (validators: { body?: AnyZodObject }) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      next();
    } catch (error: any) {
      res.status(400).json({ error: error.errors || "Validation Error" });
    }
  };
};
