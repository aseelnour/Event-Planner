import { ActorEnum } from "../enums/models/actor";

export interface CustomerAuthPayload {
	id: string;
	email: string;
	actorType: ActorEnum;
}
