import { api } from "@/services/axios";

export const getMessagesByThreadId = (threadId: string) => {
  return api.get(`/api/admin-system/messages/thread/${threadId}`);
};