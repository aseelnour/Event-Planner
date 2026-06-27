import { Router } from "express";

import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { registerCustomer } from "../../../services/customer-system/customer/customer-register.service";
import { CustomerRegisterSchema } from "../../../validation/customer-system/customer-register.schemas";

const router = Router();

router.post(
  "/register",
  validateRequest({ body: CustomerRegisterSchema }),
  async (req, res, next) => {
    try {
      const body = req.body as {
        fullName: string;
        email: string;
        password: string;
      };

      const result = await registerCustomer(body);
      res.status(201).json({
        message: "Registration successful",
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

export const customerRegisterRoutes = router;
