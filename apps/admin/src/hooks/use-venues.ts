import { useQuery } from "@tanstack/react-query";
import { getVenues } from "@/api/venues.api";

export const useVenues = () => {
	return useQuery({
		queryKey: ["venues"],
		queryFn: async () => {
			const res = await getVenues();
			return res.data;
		},
	});
};
