import { Types } from "mongoose";

import { ActorEnum } from "../../../enums/models/actor";
import type { AdminAuthPayload } from "../../../interfaces/admin-auth.interface";
import type { INotification } from "../../../interfaces/models/notification.interface";
import { Notification } from "../../../models/notification.model";
import type {
	CreateNotificationInput,
	NotificationListQueryInput,
	UpdateNotificationInput,
} from "../../../validation/admin-system/notifications.schemas";

function assertAdminAuthorization(admin: AdminAuthPayload): void {
	if (admin.actorType !== ActorEnum.Admin) {
		throw new Error("Forbidden");
	}
}

function assertValidObjectId(id: string, fieldName: string): void {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

export async function getAllNotifications(
	admin: AdminAuthPayload,
	filters: NotificationListQueryInput,
): Promise<INotification[]> {
	assertAdminAuthorization(admin);

	const query: {
		actorId: string;
		actorType: ActorEnum;
		isDeleted: { $ne: boolean };
		type?: INotification["type"];
		isRead?: boolean;
	} = {
		actorId: admin.id,
		actorType: ActorEnum.Admin,
		isDeleted: { $ne: true },
	};

	if (filters.type !== undefined) {
		query.type = filters.type;
	}

	if (filters.isRead !== undefined) {
		query.isRead = filters.isRead;
	}

	const skip = (filters.page - 1) * filters.limit;

	return Notification.find(query)
		.sort({ createdAt: -1, _id: -1 })
		.skip(skip)
		.limit(filters.limit)
		.lean();
}

export async function getNotificationById(
	admin: AdminAuthPayload,
	notificationId: string,
): Promise<INotification> {
	assertAdminAuthorization(admin);
	assertValidObjectId(notificationId, "notificationId");

	const notification = await Notification.findOne({
		_id: notificationId,
		actorId: admin.id,
		actorType: ActorEnum.Admin,
		isDeleted: { $ne: true },
	}).lean();

	if (!notification) {
		throw new Error("Notification not found");
	}

	return notification;
}

export async function createNotification(
	admin: AdminAuthPayload,
	input: CreateNotificationInput,
): Promise<INotification> {
	assertAdminAuthorization(admin);

	return Notification.create({
		actorId: admin.id,
		actorType: ActorEnum.Admin,
		type: input.type,
		message: input.message,
		isRead: input.isRead ?? false,
		isDeleted: false,
	});
}

export async function updateNotification(
	admin: AdminAuthPayload,
	notificationId: string,
	input: UpdateNotificationInput,
): Promise<INotification> {
	assertAdminAuthorization(admin);
	assertValidObjectId(notificationId, "notificationId");

	const notification = await Notification.findOneAndUpdate(
		{
			_id: notificationId,
			actorId: admin.id,
			actorType: ActorEnum.Admin,
			isDeleted: { $ne: true },
		},
		{
			$set: {
				...(input.type !== undefined ? { type: input.type } : {}),
				...(input.message !== undefined
					? { message: input.message }
					: {}),
				...(input.isRead !== undefined ? { isRead: input.isRead } : {}),
			},
		},
		{ new: true, runValidators: true },
	).lean();

	if (!notification) {
		throw new Error("Notification not found");
	}

	return notification;
}

export async function deleteNotification(
	admin: AdminAuthPayload,
	notificationId: string,
): Promise<INotification> {
	assertAdminAuthorization(admin);
	assertValidObjectId(notificationId, "notificationId");

	const notification = await Notification.findOneAndUpdate(
		{
			_id: notificationId,
			actorId: admin.id,
			actorType: ActorEnum.Admin,
			isDeleted: { $ne: true },
		},
		{ $set: { isDeleted: true } },
		{ new: true },
	).lean();

	if (!notification) {
		throw new Error("Notification not found");
	}

	return notification;
}

export const notificationService = {
	getAllNotifications,
	getNotificationById,
	createNotification,
	updateNotification,
	deleteNotification,
};
