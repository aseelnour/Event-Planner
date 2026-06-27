import { api } from "@/services/axios";
export const verify = () => {
  return api.get("/api/admin-system/admin/verify");
};
