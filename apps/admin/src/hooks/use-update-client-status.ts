import { updateClientStatus, type ClientStatusValue } from "@/api/clients.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateClientStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			status,
		}: {
			id: string;
			status: ClientStatusValue;
		}) => updateClientStatus(id, status),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
		},
	});
};
