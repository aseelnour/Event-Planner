import { api } from "@/services/axios";

export const login = (data: { email: string; password: string }) => {
	return api.post("/api/customer-system/customer/login", data);
};
