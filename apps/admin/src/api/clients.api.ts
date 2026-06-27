import { api } from "@/services/axios";

export type ClientStatusValue =
	| "waiting-approve"
	| "approved"
	| "banned";

export const getClients = () => {
	return api.get("/api/admin-system/client");
};

export const updateClientStatus = (
	clientId: string,
	status: ClientStatusValue,
) => {
	return api.patch(`/api/admin-system/client/${clientId}/status`, {
		status,
	});
};
