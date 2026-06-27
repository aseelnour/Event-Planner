import { api } from "@/services/axios";

export const verify = () => {
	return api.get("/api/client-system/client/verify");
};
