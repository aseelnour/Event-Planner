import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

// المخططات الحالية للكلاينت...
export const SendManageMessageSchema = z.object({
  clientId: objectIdSchema,
  threadId: objectIdSchema,
  message: z.string().min(1, "Message is required"),
});

export const MessageThreadIdParamSchema = z.object({
  threadId: objectIdSchema,
});

export const MessageClientIdParamSchema = z.object({
  clientId: objectIdSchema,
});

// المخططات الجديدة المضافة للكاستمر
export const MessageCustomerIdParamSchema = z.object({
  customerId: objectIdSchema,
});

export const SendCustomerMessageSchema = z.object({
  customerId: objectIdSchema,
  threadId: objectIdSchema,
  message: z.string().min(1, "Message is required"),
});

export type SendManageMessageInput = z.infer<typeof SendManageMessageSchema>;
export type SendCustomerMessageInput = z.infer<
  typeof SendCustomerMessageSchema
>;
