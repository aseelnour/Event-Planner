import { api } from "@/services/axios";

export const verify = () => {
	return api.get("/api/customer-system/customer/verify");
};
