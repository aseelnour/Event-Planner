import { api } from "@/services/axios";

export const login = (data: { email: string; password: string }) => {
	return api.post("/api/client-system/client/login", data);
};
