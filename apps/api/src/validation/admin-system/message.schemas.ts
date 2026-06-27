import { z } from "zod";
import mongoose from "mongoose";
import { MessageEnum } from "../../enums/models/message.enum";

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

const createMessageSchema = z.object({
  senderId: objectId,
  actorType: z.nativeEnum(MessageEnum),
  message: z.string().min(1),
  threadId: objectId,
});

const messageIdParamSchema = z.object({
  id: objectId,
});

const updateMessageSchema = z.object({
  content: z.string().min(1).optional(),
});
export const senderIdParamSchema = z.object({
  senderId: z.string(),
});
export const threadIdParamSchema = z.object({
  threadId: z.string(),
});
export const adminMessageSchemas = {
  createMessageSchema,
  messageIdParamSchema,
  updateMessageSchema,
  senderIdParamSchema,
  threadIdParamSchema,
};
