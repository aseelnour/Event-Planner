import type { NextFunction, Request, Response } from "express";

import { verifyClientToken } from "../services/client-system/client/auth.services";

export function requireClientAuth(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const authorization = req.headers.authorization;

	if (!authorization || !authorization.startsWith("Bearer ")) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	const token = authorization.slice(7).trim();
	if (!token) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	try {
		const decoded = verifyClientToken(token);
		req.client = decoded;
		next();
	} catch (error) {
		if (error instanceof Error && error.message === "Forbidden") {
			res.status(403).json({ error: "Forbidden" });
			return;
		}
		res.status(401).json({ error: "Unauthorized" });
	}
}
