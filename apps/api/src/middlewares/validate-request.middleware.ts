import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export type RequestValidationSchemas = {
	body?: z.ZodType;
	query?: z.ZodType;
	params?: z.ZodType;
};

export function validateRequest(schemas: RequestValidationSchemas) {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			if (schemas.body) {
				req.body = schemas.body.parse(req.body) as Request["body"];
			}
			if (schemas.query) {
				req.query = schemas.query.parse(req.query) as Request["query"];
			}
			if (schemas.params) {
				req.params = schemas.params.parse(
					req.params,
				) as Request["params"];
			}
			next();
		} catch (err) {
			if (err instanceof z.ZodError) {
				res.status(400).json({
					error: "Validation failed",
					details: z.treeifyError(err),
				});
				return;
			}
			next(err);
		}
	};
}
