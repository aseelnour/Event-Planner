import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

const AvailabilitySchema = z.object({
  date: z.string().datetime().optional(),
  from: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format, use HH:MM"),
  to: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format, use HH:MM"),
});

export const CreateManageVenueSchema = z.object({
  clientId: objectIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  capacity: z.coerce
    .number()
    .int("Capacity must be a whole number")
    .positive("Capacity must be greater than 0"),
  price: z.string().min(1, "Price is required"),
  images: z.array(z.string().url("Invalid image URL")).default([]),
  extras: z.string().optional(),
  availability: z.array(AvailabilitySchema).default([]),
  discounts: z.string().optional(),
});

export const UpdateManageVenueSchema = CreateManageVenueSchema.partial().omit({
  clientId: true,
});

export const ManageVenueIdParamSchema = z.object({
  id: objectIdSchema,
});

export const ManageVenueClientIdParamSchema = z.object({
  clientId: objectIdSchema,
});

export type CreateManageVenueInput = z.infer<typeof CreateManageVenueSchema>;
export type UpdateManageVenueInput = z.infer<typeof UpdateManageVenueSchema>;

export const manageVenueValidationSchemas = {
  CreateManageVenueSchema,
  UpdateManageVenueSchema,
  ManageVenueIdParamSchema,
  ManageVenueClientIdParamSchema,
};
