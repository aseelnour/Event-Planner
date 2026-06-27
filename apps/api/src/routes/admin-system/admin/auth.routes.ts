import { Router } from "express";

import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { adminLogin } from "../../../services/admin-system/admin/auth.services";
import { AdminLoginSchema } from "../../../validation/admin-system/admin-auth.schemas";

const router = Router();

router.post(
  "/login",
  validateRequest({ body: AdminLoginSchema }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const result = await adminLogin(email, password);
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

router.get("/verify", requireAdminAuth, (req, res) => {
  if (!req.admin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.status(200).json({
    valid: true,
    admin: {
      id: req.admin.id,
      email: req.admin.email,
      actorType: req.admin.actorType,
    },
  });
});

export const adminAuthRoutes = router;
