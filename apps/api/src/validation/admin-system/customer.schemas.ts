import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

export const CreateCustomerSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(100, "Password must be at most 100 characters long"),
	fullName: z.string().min(1, "Full name is required"),
	phoneNumber: z.string().min(1, "Phone number is required"),
	gender: z.enum(["male", "female"]).optional(),
	dob: z.coerce.date().optional(),
	city: z.string().min(1, "City is required"),
});

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

export const CustomerIdParamSchema = z.object({
	id: objectIdSchema,
});

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;