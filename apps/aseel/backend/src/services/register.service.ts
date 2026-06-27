import { hash } from "bcryptjs";
import { Customer } from "../models/customer.model";

export async function registerCustomer(input: {
  fullName: string;
  email: string;
  password: string;
}) {
  const existing = await Customer.findOne({
    email: input.email,
    isDeleted: false,
  });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await hash(input.password, 10);

  const customer = await Customer.create({
    email: input.email,
    password: passwordHash,
    fullName: input.fullName,
    phoneNumber: "",
    city: "",
  });

  return {
    customer: {
      id: customer._id.toString(),
      email: customer.email,
      fullName: customer.fullName,
    },
  };
}
