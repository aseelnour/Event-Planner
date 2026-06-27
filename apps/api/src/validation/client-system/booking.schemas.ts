import { z } from "zod";

import { BookingEnum } from "../../enums/models/booking";

export const BookingIdParamSchema = z.object({
	id: z.string().min(1, "Booking ID is required"),
});

export const StatusQuerySchema = z.object({
	status: z.nativeEnum(BookingEnum).optional(),
});

export const UpdateBookingStatusSchema = z.object({
	status: z.nativeEnum(BookingEnum),
});

export type UpdateBookingStatusInput = z.infer<
	typeof UpdateBookingStatusSchema
>;
