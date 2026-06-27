import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/api/customers.api";

export const useCustomers = () => {
	return useQuery({
		queryKey: ["customers"],
		queryFn: async () => {
			const res = await getCustomers();
			return res.data;
		},
	});
};
