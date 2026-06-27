// C:\Users\Osaid\GFA\event-planner\apps\aseel\myreact-native\src\api\auth.api.ts
import { api } from "./client";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/login", data),

  register: (data: { fullName: string; email: string; password: string }) =>
    api.post("/register", data),

  verify: () => api.get("/verify"),

  // ✅ إضافة دالة لجلب البروفايل
  getProfile: () => api.get("/profile"),
};
