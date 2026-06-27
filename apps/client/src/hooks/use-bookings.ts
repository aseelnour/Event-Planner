import {
	getBookings,
	updateBookingStatus,
} from "@/api/bookings.api";
import type { BookingStatus } from "@/types/booking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const bookingsQueryKey = (status?: BookingStatus) =>
	status ? ["client-bookings", status] : ["client-bookings"];

export const useBookings = (status?: BookingStatus) => {
	return useQuery({
		queryKey: bookingsQueryKey(status),
		queryFn: async () => {
			const res = await getBookings(status);
			return res.data;
		},
	});
};

export const useUpdateBookingStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			status,
		}: {
			id: string;
			status: BookingStatus;
		}) => updateBookingStatus(id, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["client-bookings"] });
		},
	});
};
