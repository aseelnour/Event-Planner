import {
	createManageVenue,
	deleteManageVenue,
	getManageVenues,
	type ManageVenuePayload,
	type UpdateManageVenuePayload,
	updateManageVenue,
} from "@/api/manage-venues.api";
import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const manageVenuesQueryKey = (clientId?: string) => [
	"manage-venues",
	clientId ?? "all",
];

export const useManageVenues = () => {
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;

	return useQuery({
		queryKey: manageVenuesQueryKey(clientId),
		queryFn: async () => {
			const response = await getManageVenues(clientId);
			return response.data;
		},
		enabled: !!clientId,
		retry: false,
	});
};

export const useCreateManageVenue = () => {
	const queryClient = useQueryClient();
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;

	return useMutation({
		mutationFn: (data: ManageVenuePayload) => createManageVenue(data),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: manageVenuesQueryKey(clientId),
			});
		},
	});
};

export const useUpdateManageVenue = () => {
	const queryClient = useQueryClient();
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: UpdateManageVenuePayload;
		}) => updateManageVenue(id, data),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: manageVenuesQueryKey(clientId),
			});
		},
	});
};

export const useDeleteManageVenue = () => {
	const queryClient = useQueryClient();
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;

	return useMutation({
		mutationFn: deleteManageVenue,
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: manageVenuesQueryKey(clientId),
			});
		},
	});
};
