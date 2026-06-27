import { api } from "../services/axios";

export const getOverview = async () => {
  const response = await api.get("/api/client-system/dashboard/overview");
  return response.data;
};
