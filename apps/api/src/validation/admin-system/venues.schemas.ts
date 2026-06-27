import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

export const CreateVenueSchema = z.object({
  clientId: objectIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().min(1, "Price is required"),
  images: z.array(z.string().url("Invalid image URL")).default([]),
  extras: z.string().optional(),
  availability: z
    .array(
      z.object({
        date: z.date("Invalid date"),
        from: z
          .string()
          .regex(/^\d{2}:\d{2}$/, "Invalid time format, use HH:MM"),
        to: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format, use HH:MM"),
      }),
    )
    .default([]),
  discounts: z.string().optional(),
});

export const UpdateVenueSchema = CreateVenueSchema.partial().omit({
  clientId: true,
});

export const VenueIdParamSchema = z.object({
  id: objectIdSchema,
});

export const ClientIdParamSchema = z.object({
  clientId: objectIdSchema,
});

export type CreateVenueInput = z.infer<typeof CreateVenueSchema>;
export type UpdateVenueInput = z.infer<typeof UpdateVenueSchema>;

export const venueValidationSchemas = {
  CreateVenueSchema,
  UpdateVenueSchema,
  VenueIdParamSchema,
  ClientIdParamSchema,
};
