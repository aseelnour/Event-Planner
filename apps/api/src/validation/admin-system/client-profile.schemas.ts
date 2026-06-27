import { z } from "zod";

const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const ClientProfileContactInformationSchema = z.object({
	name: z.string().min(1, "Contact name is required").max(100),
	phone: z.string().min(1, "Contact phone is required").max(30),
});

export const CreateClientProfileSchema = z.object({
	clientId: ObjectIdSchema,
	address: z.string().min(1, "Address is required"),
	description: z.string().min(1, "Description is required"),
	mapURL: z.string().url("mapURL must be a valid URL"),
	contactInformation: z
		.array(ClientProfileContactInformationSchema)
		.optional()
		.default([]),
	logo: z.string().url("logo must be a valid URL"),
	coverImage: z.string().url("coverImage must be a valid URL"),
});

export const UpdateClientProfileSchema = z
	.object({
		address: z.string().min(1).optional(),
		description: z.string().min(1).optional(),
		mapURL: z.string().url().optional(),
		contactInformation: z.array(ClientProfileContactInformationSchema).optional(),
		logo: z.string().url().optional(),
		coverImage: z.string().url().optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field is required",
	});

export const ClientProfileIdParamsSchema = z.object({
	profileId: ObjectIdSchema,
});

export const ClientIdParamsSchema = z.object({
	clientId: ObjectIdSchema,
});

export type CreateClientProfileInput = z.infer<typeof CreateClientProfileSchema>;
export type UpdateClientProfileInput = z.infer<typeof UpdateClientProfileSchema>;
