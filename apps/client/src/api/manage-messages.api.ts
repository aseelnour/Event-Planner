import { api } from "@/services/axios";

export type ManageThread = {
  _id: string;
  senderId: {
    _id: string;
    fullName: string;
    email: string;
    city?: string;
  };
  receiverId: string;
  venueId?: {
    _id: string;
    title: string;
  };
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  lastMessage?: {
    message: string;
    timestamp: string;
    senderId: string;
  } | null;
  unreadCount?: number;
};

export type ManageMessage = {
  _id: string;
  senderId: string;
  actorType: "client" | "customer" | "admin";
  message: string;
  timestamp: string;
  threadId: string;
  status: "sent" | "delivered" | "read";
  isDeleted?: boolean;
};

export type SendManageMessagePayload = {
  clientId: string;
  threadId: string;
  message: string;
};

const basePath = "/api/client-system/client/manage-messages";

export const getManageThreads = (clientId: string) => {
  return api.get<ManageThread[]>(`${basePath}/client/${clientId}`);
};

export const getManageMessages = (threadId: string) => {
  return api.get<ManageMessage[]>(`${basePath}/thread/${threadId}`);
};

export const sendManageMessage = (data: SendManageMessagePayload) => {
  return api.post<ManageMessage>(basePath, data);
};
