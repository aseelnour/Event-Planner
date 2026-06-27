import { z } from "zod";

export const CustomerRegisterSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(200, "Full name is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
