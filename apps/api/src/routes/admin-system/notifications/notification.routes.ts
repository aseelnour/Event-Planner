import { type Response, Router } from "express";

import { requireAdminAuth } from "../../../middlewares/require-admin-auth.middleware";
import { validateRequest } from "../../../middlewares/validate-request.middleware";
import { notificationService } from "../../../services/admin-system/notifications/notification.services";
import {
	type NotificationListQueryInput,
	notificationValidationSchemas,
} from "../../../validation/admin-system/notifications.schemas";

const notificationRouter = Router();

const {
	CreateNotificationSchema,
	UpdateNotificationSchema,
	NotificationIdParamsSchema,
	NotificationListQuerySchema,
} = notificationValidationSchemas;

function handleNotificationError(error: unknown, res: Response): boolean {
	if (!(error instanceof Error)) {
		return false;
	}

	// TODO: Implement a shared/global error handler and remove route-level error mapping.
	switch (error.message) {
		case "Forbidden":
			res.status(403).json({ error: "Forbidden" });
			return true;
		case "Notification not found":
			res.status(404).json({ error: "Notification not found" });
			return true;
		default:
			if (error.message.startsWith("Invalid ")) {
				res.status(400).json({ error: error.message });
				return true;
			}
			return false;
	}
}

notificationRouter.get(
	"/",
	validateRequest({ query: NotificationListQuerySchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const notifications = await notificationService.getAllNotifications(
				req.admin,
				req.query as unknown as NotificationListQueryInput,
			);
			res.status(200).json(notifications);
		} catch (error) {
			if (handleNotificationError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

notificationRouter.get(
	"/:notificationId",
	validateRequest({ params: NotificationIdParamsSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { notificationId } = req.params as { notificationId: string };
			const notification = await notificationService.getNotificationById(
				req.admin,
				notificationId,
			);

			res.status(200).json(notification);
		} catch (error) {
			if (handleNotificationError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

notificationRouter.post(
	"/",
	validateRequest({ body: CreateNotificationSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const notification = await notificationService.createNotification(
				req.admin,
				req.body,
			);

			res.status(201).json(notification);
		} catch (error) {
			if (handleNotificationError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

notificationRouter.patch(
	"/:notificationId",
	validateRequest({
		params: NotificationIdParamsSchema,
		body: UpdateNotificationSchema,
	}),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { notificationId } = req.params as { notificationId: string };
			const notification = await notificationService.updateNotification(
				req.admin,
				notificationId,
				req.body,
			);

			res.status(200).json(notification);
		} catch (error) {
			if (handleNotificationError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

notificationRouter.delete(
	"/:notificationId",
	validateRequest({ params: NotificationIdParamsSchema }),
	requireAdminAuth,
	async (req, res, next) => {
		try {
			if (!req.admin) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const { notificationId } = req.params as { notificationId: string };
			await notificationService.deleteNotification(
				req.admin,
				notificationId,
			);

			res.status(200).json({
				message: "Notification deleted successfully",
			});
		} catch (error) {
			if (handleNotificationError(error, res)) {
				return;
			}
			next(error);
		}
	},
);

export const adminNotificationRouter = notificationRouter;
