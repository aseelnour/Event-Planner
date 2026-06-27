import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookings, updateBooking } from "@/api/bookings.api";
import type { StatusFilter } from "@/types/booking";
import type { BookingStatus } from "@/types/booking";

export const bookingsQueryKey = (status?: BookingStatus) =>
  status ? ["client-bookings", status] : ["client-bookings"];

export const useBookings = (status?: BookingStatus) => {
  return useQuery({
    queryKey: bookingsQueryKey(status),
    queryFn: async () => {
      const res = await getBookings();
      return res.data;
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateBooking(id, { status }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
