import mongoose, { Schema, model, Model } from "mongoose";

import { IMessage } from "../interfaces/message.interface";
import { MessageEnum } from "../enums/message.enum";
import { ActorEnum } from "../enums/actor";

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: String,
      required: true,
    },
    actorType: {
      type: String,
      enum: Object.values(ActorEnum),
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    threadId: {
      type: String,
      ref: "Thread",
      required: true,
    },
    venueId: {
      type: String,
      ref: "Venue",
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(MessageEnum),
      default: MessageEnum.sent,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "messages" },
);

export const Message: Model<IMessage> = model<IMessage>(
  "Message",
  messageSchema,
);
export { messageSchema };
export type { IMessage } from "../interfaces/message.interface";
