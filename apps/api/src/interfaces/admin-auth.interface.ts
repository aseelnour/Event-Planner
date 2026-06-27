import { ActorEnum } from "../enums/models/actor";

export interface AdminAuthPayload {
	id: string;
	email: string;
	actorType: ActorEnum;
}