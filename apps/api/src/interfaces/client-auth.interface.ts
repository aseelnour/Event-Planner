import { ActorEnum } from "../enums/models/actor";

export interface ClientAuthPayload {
	id: string;
	email: string;
	actorType: ActorEnum;
}
