import { Router } from "express";

import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import {
	createCustomer,
	deleteCustomer,
	getAllCustomers,
	getCustomerById,
	updateCustomer,
} from "../../../services/admin-system/customer/customer.services";
import {
	CreateCustomerSchema,
	CustomerIdParamSchema,
	UpdateCustomerSchema,
} from "../../../validation/admin-system/customer.schemas";

const router = Router();

router.get(
	"/",
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const customers = await getAllCustomers();
			res.status(200).json(customers);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.get(
	"/:id",
	validateRequest({ params: CustomerIdParamSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const customer = await getCustomerById(req.params.id);
			res.status(200).json(customer);
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Customer not found") {
				res.status(404).json({ error: "Customer not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

router.post(
	"/",
	validateRequest({ body: CreateCustomerSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const customer = await createCustomer(req.body);
			res.status(201).json(customer);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
);

router.patch(
	"/:id",
	validateRequest({ params: CustomerIdParamSchema, body: UpdateCustomerSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			const customer = await updateCustomer(req.params.id, req.body);
			res.status(200).json(customer);
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Customer not found") {
				res.status(404).json({ error: "Customer not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

router.delete(
	"/:id",
	validateRequest({ params: CustomerIdParamSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			await deleteCustomer(req.params.id);
			res.status(200).json({ message: "Customer deleted successfully" });
			return;
		} catch (error) {
			if (error instanceof Error && error.message === "Customer not found") {
				res.status(404).json({ error: "Customer not found" });
				return;
			}
			next(error);
			return;
		}
	},
);

export { router as adminCustomerRoutes };