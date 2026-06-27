import { z } from "zod";

const passwordField = z
	.string()
	.min(8, "Password must be at least 8 characters long")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
	.max(100, "Password must be at most 100 characters long");

export const ClientLoginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: passwordField,
});

export type ClientLoginInput = z.infer<typeof ClientLoginSchema>;

export const ClientRegisterSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: passwordField,
	fullName: z.string().min(1, "Full name is required").max(200),
	phoneNumber: z.string().min(1, "Phone number is required").max(40),
});

export type ClientRegisterInput = z.infer<typeof ClientRegisterSchema>;
