import { api } from "@/services/axios";

export const registerClient = (data: {
	email: string;
	password: string;
	fullName: string;
	phoneNumber: string;
}) => {
	return api.post("/api/client-system/client/register", data);
};
