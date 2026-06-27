import { Router } from "express";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { threadSchemas } from "../../../validation/admin-system/thread.schemas";
import { adminThreadServices } from "../../../services/admin-system/thread/thread.service";

const router = Router();

router.post(
  "/",
  validateRequest({ body: threadSchemas.createThreadSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const { senderId, receiverId } = req.body;
      const thread = await adminThreadServices.createThread(
        senderId,
        receiverId,
      );
      res.json(thread);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/", requireAdminAuth, async (req, res, next) => {
  try {
    const data = await adminThreadServices.getAllThreads();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/sender/:senderId",
  validateRequest({ params: threadSchemas.senderIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const data = await adminThreadServices.getThreadsBySenderId(
        req.params.senderId,
      );
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No threads found" });
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/receiver/:receiverId",
  validateRequest({ params: threadSchemas.receiverIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const data = await adminThreadServices.getThreadsByReceiverId(
        req.params.receiverId,
      );
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "No threads found" });
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/:id",
  validateRequest({ params: threadSchemas.threadIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const data = await adminThreadServices.getThreadById(req.params.id);
      if (!data) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:id",
  validateRequest({
    params: threadSchemas.threadIdParamSchema,
    body: threadSchemas.updateThreadSchema,
  }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const updated = await adminThreadServices.updateThread(
        req.params.id,
        req.body,
      );
      if (!updated) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  validateRequest({ params: threadSchemas.threadIdParamSchema }),
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const deleted = await adminThreadServices.deleteThread(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Thread not found" });
      }
      res.json({ message: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
);

export const adminThreadRoutes = router;
