import { Router } from "express";

import { requireCustomerAuth } from "../../../middlewares/require-customer-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { customerLogin } from "../../../services/customer-system/customer/auth.services";
import { CustomerLoginSchema } from "../../../validation/customer-system/customer-auth.schemas";

const router = Router();

router.post(
	"/login",
	validateRequest({ body: CustomerLoginSchema }),
	async (req, res, next) => {
		try {
			const { email, password } = req.body as {
				email: string;
				password: string;
			};

			const result = await customerLogin(email, password);
			res.status(200).json(result);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "Invalid email or password"
			) {
				res.status(401).json({ error: "Invalid email or password" });
				return;
			}
			next(error);
		}
	},
);

router.get("/verify", requireCustomerAuth, (req, res) => {
	if (!req.customer) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	res.status(200).json({
		valid: true,
		customer: {
			id: req.customer.id,
			email: req.customer.email,
			actorType: req.customer.actorType,
		},
	});
});

export const customerAuthRoutes = router;
