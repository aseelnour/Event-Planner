import { ActorEnum } from "../../enums/models/actor";
import { NotificationEnum } from "../../enums/models/notification";
export interface INotification {
	_id: string;
	actorId: string;
	actorType: ActorEnum;
	type: NotificationEnum;
	message: string;
	isRead: boolean;
	isDeleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
