import { api } from "@/services/axios";

export const getThreads = () => {
  return api.get("/api/admin-system/threads");
};