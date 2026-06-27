import { MessageEnum } from "../../enums/models/message.enum";
import { ActorEnum } from "../../enums/models/actor";
export interface IMessage {
  _id: string;
  senderId: string;
  actorType: ActorEnum;
  message: string;
  timestamp: Date;
  threadId: string;
  status: MessageEnum;
  isDeleted?: boolean;
}
