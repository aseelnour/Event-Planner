import { z } from "zod";
import { Types } from "mongoose";

import { NotificationEnum } from "../../enums/models/notification";

const ObjectIdSchema = z
	.string()
	.refine((value) => Types.ObjectId.isValid(value), {
		message: "Invalid notificationId",
	});

const NotificationCommonSchema = z.object({
	type: z.nativeEnum(NotificationEnum),
	message: z.string().min(1, "Message is required").max(500),
});

export const CreateNotificationSchema = NotificationCommonSchema.extend({
	isRead: z.boolean().optional().default(false),
});

export const UpdateNotificationSchema = z
	.object({
		type: z.nativeEnum(NotificationEnum).optional(),
		message: z.string().min(1).max(500).optional(),
		isRead: z.boolean().optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field is required",
	});

export const NotificationIdParamsSchema = z.object({
	notificationId: ObjectIdSchema,
});

export const NotificationListQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	type: z.nativeEnum(NotificationEnum).optional(),
	isRead: z
		.enum(["true", "false"])
		.transform((value) => value === "true")
		.optional(),
});

export type CreateNotificationInput = z.infer<typeof CreateNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof UpdateNotificationSchema>;
export type NotificationListQueryInput = z.infer<
	typeof NotificationListQuerySchema
>;

export const notificationValidationSchemas = {
	CreateNotificationSchema,
	UpdateNotificationSchema,
	NotificationIdParamsSchema,
	NotificationListQuerySchema,
};
