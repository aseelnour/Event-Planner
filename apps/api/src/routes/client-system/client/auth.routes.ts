import { Router } from "express";

import { requireClientAuth } from "../../../middlewares/require-client-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import {
	clientLogin,
	registerClient,
} from "../../../services/client-system/client/auth.services";
import {
	ClientLoginSchema,
	ClientRegisterSchema,
} from "../../../validation/client-system/client-auth.schemas";

const router = Router();

router.post(
	"/register",
	validateRequest({ body: ClientRegisterSchema }),
	async (req, res, next) => {
		try {
			const body = req.body as {
				email: string;
				password: string;
				fullName: string;
				phoneNumber: string;
			};

			const result = await registerClient(body);
			res.status(201).json({
				message:
					"Registration successful. Your account is pending approval.",
				...result,
			});
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "Email already registered"
			) {
				res.status(409).json({ error: "Email already registered" });
				return;
			}
			next(error);
		}
	},
);

router.post(
	"/login",
	validateRequest({ body: ClientLoginSchema }),
	async (req, res, next) => {
		try {
			const { email, password } = req.body as {
				email: string;
				password: string;
			};

			const result = await clientLogin(email, password);
			res.status(200).json(result);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "Invalid email or password"
			) {
				res.status(401).json({ error: "Invalid email or password" });
				return;
			}
			if (
				error instanceof Error &&
				error.message === "Account pending approval"
			) {
				res.status(403).json({ error: "Account pending approval" });
				return;
			}
			if (
				error instanceof Error &&
				error.message === "Account suspended"
			) {
				res.status(403).json({ error: "Account suspended" });
				return;
			}
			next(error);
		}
	},
);

router.get("/verify", requireClientAuth, (req, res) => {
	if (!req.client) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	res.status(200).json({
		valid: true,
		client: {
			id: req.client.id,
			email: req.client.email,
			actorType: req.client.actorType,
		},
	});
});

export const clientAuthRoutes = router;
