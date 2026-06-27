import { api } from "@/services/axios";

export const register = (data: { fullName: string; email: string; password: string }) => {
	return api.post("/api/customer-system/customer/register", data);
};