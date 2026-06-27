import { api } from "./client";

export const profileApi = {
  getProfile: () => api.get("/profile"),
  updateProfile: (data: any) => api.put("/profile", data),
};
