import { api } from "@/services/axios";

export const getVenues = () => {
	return api.get("/api/admin-system/venues");
};
