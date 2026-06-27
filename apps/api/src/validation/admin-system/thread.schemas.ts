import { z } from "zod";
import mongoose from "mongoose";

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

const createThreadSchema = z
  .object({
    senderId: objectId,
    receiverId: objectId,
  })
  .refine((data) => data.senderId !== data.receiverId, {
    message: "senderId and receiverId cannot be the same",
  });

const threadIdParamSchema = z.object({
  id: objectId,
});

export const senderIdParamSchema = z.object({
  senderId: z.string(),
});
export const receiverIdParamSchema = z.object({
  receiverId: z.string(),
});

export const updateThreadSchema = z.object({
  receiverId: z.string().optional(),
});
export const threadSchemas = {
  createThreadSchema,
  threadIdParamSchema,
  senderIdParamSchema,
  receiverIdParamSchema,
  updateThreadSchema,
};
