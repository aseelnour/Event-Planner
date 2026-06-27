import { api } from "@/services/axios";

export const getCustomers = () => {
	return api.get("/api/admin-system/customers");
};
