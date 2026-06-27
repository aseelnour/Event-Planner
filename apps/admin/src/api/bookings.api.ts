import { api } from "@/services/axios";

export const getBookings = () => {
	return api.get("/api/admin-system/bookings");
};

export const updateBooking = (id: string, payload: { status?: string }) => {
	return api.put(`/api/admin-system/bookings/${id}`, payload);
};
