import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/api/clients.api";

export const useClients = () => {
	return useQuery({
		queryKey: ["clients"],
		queryFn: async () => {
			const res = await getClients();
			return res.data;
		},
	});
};
