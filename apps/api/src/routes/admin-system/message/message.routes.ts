import { Router } from "express";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { adminMessageSchemas } from "../../../validation/admin-system/message.schemas";
import { adminMessageServices } from "../../../services/admin-system/message/message.service";

const router = Router();

router.post(
  "/",
  validateRequest({ body: adminMessageSchemas.createMessageSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const message = await adminMessageServices.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/thread/:threadId",
  validateRequest({ params: adminMessageSchemas.threadIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const data = await adminMessageServices.getMessagesByThread(
        req.params.threadId,
      );
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No messages found" });
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/sender/:senderId",
  validateRequest({ params: adminMessageSchemas.senderIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const data = await adminMessageServices.getMessagesBySenderId(
        req.params.senderId,
      );
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No messages found" });
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/:id",
  validateRequest({ params: adminMessageSchemas.messageIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const message = await adminMessageServices.getMessageById(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:id",
  validateRequest({
    params: adminMessageSchemas.messageIdParamSchema,
    body: adminMessageSchemas.updateMessageSchema,
  }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const updated = await adminMessageServices.updateMessage(
        req.params.id,
        req.body,
      );
      if (!updated) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },
);
router.delete(
  "/:id",
  validateRequest({ params: adminMessageSchemas.messageIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const deleted = await adminMessageServices.deleteMessage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
);

export const adminMessageRoutes = router;
