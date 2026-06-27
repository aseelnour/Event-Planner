import { api } from "@/services/axios";
import type { Booking, BookingStatus } from "@/types/booking";

const BOOKINGS_URL = "/api/client-system/bookings";

export const getBookings = (status?: BookingStatus) => {
	return api.get<Booking[]>(BOOKINGS_URL, {
		params: status ? { status } : undefined,
	});
};

export const getBookingById = (id: string) => {
	return api.get<Booking>(`${BOOKINGS_URL}/${id}`);
};

export const updateBookingStatus = (id: string, status: BookingStatus) => {
	return api.patch<Booking>(`${BOOKINGS_URL}/${id}/status`, { status });
};
