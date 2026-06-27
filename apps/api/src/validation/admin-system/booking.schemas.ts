import { z } from "zod";
import { BookingEnum } from "../../enums/models/booking";

const BookingTimePeriodSchema = z.object({
  from: z.string().min(1, "From time is required"),
  to: z.string().min(1, "To time is required"),
});

export const CreateBookingSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  venueId: z.string().min(1, "Venue ID is required"),
  customerId: z.string().min(1, "Customer ID is required"),
  date: z.coerce.date(),
  status: z.nativeEnum(BookingEnum),
  timePeriod: z.array(BookingTimePeriodSchema).min(1, "At least one time period is required"),
});

export const UpdateBookingSchema = z.object({
  clientId: z.string().min(1, "Client ID is required").optional(),
  venueId: z.string().min(1, "Venue ID is required").optional(),
  customerId: z.string().min(1, "Customer ID is required").optional(),
  date: z.coerce.date().optional(),
  status: z.nativeEnum(BookingEnum).optional(),
  timePeriod: z.array(BookingTimePeriodSchema).min(1, "At least one time period is required").optional(),
});

export const BookingIdParamSchema = z.object({
  id: z.string().min(1, "Booking ID is required"),
});

export const ClientIdParamSchema = z.object({
  clientId: z.string().regex(/^\d+$/, "Client ID must be a number"),
});

export const VenueIdParamSchema = z.object({
  venueId: z.string().regex(/^\d+$/, "Venue ID must be a number"),
});

export const CustomerIdParamSchema = z.object({
  customerId: z.string().regex(/^\d+$/, "Customer ID must be a number"),
});

export const StatusParamSchema = z.object({
  status: z.nativeEnum(BookingEnum),
});

export const StatusQuerySchema = z.object({
  status: z.nativeEnum(BookingEnum).optional(),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type UpdateBookingInput = z.infer<typeof UpdateBookingSchema>;