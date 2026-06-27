import { Router } from "express";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import {
  createClientSchema,
  updateStatusSchema,
  idParamSchema,
} from "../../../validation/admin-system/client/client.validation";
import { adminClientServices } from "../../../services/admin-system/client/client.service";
const router = Router();

//test done
router.post(
  "/",
  validateRequest({ body: createClientSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const { fullName, email, phoneNumber } = req.body;
      const client = await adminClientServices.createClient({ fullName, email, phoneNumber });
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  }
);
//test done
router.get("/", requireAdminAuth, async (req, res, next) => {
  try {
    const clients = await adminClientServices.getAllClients();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

//test done
router.get(
  "/:id",
  validateRequest({ params: idParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const client = await adminClientServices.getClientById(req.params.id);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);
//test done
router.patch(
  "/:id/status",
  validateRequest({ params: idParamSchema, body: updateStatusSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await adminClientServices.updateClientStatus(id, status);

      if (!updated) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);

//test done
router.delete(
  "/:id",
  validateRequest({ params: idParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const deleted = await adminClientServices.deleteClient(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json({ message: "Client deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export const adminClientRoutes = router;
