import { Schema, model, type Model } from "mongoose";

import { ActorEnum } from "../enums/models/actor";
import { NotificationEnum } from "../enums/models/notification";
import { INotification } from "../interfaces/models/notification.interface";

const notificationSchema = new Schema<INotification>(
	{
		actorId: { type: String, required: true },
		actorType: {
			type: String,
			required: true,
			enum: Object.values(ActorEnum),
		},
		type: {
			type: String,
			required: true,
			enum: Object.values(NotificationEnum),
		},
		message: { type: String, required: true },
		isRead: { type: Boolean, required: true, default: false },
		isDeleted: { type: Boolean, required: true, default: false },
	},
	{ collection: "notifications", timestamps: true },
);

export const Notification: Model<INotification> = model<INotification>(
	"Notification",
	notificationSchema,
);

export { notificationSchema };
