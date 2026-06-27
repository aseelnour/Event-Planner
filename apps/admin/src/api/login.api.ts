import { api } from "@/services/axios";

export const login = (data: { email: string; password: string }) => {
  return api.post("/api/admin-system/admin/login", data);
};
