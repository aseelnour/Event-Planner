import { hash } from "bcryptjs";

import { Customer } from "../../../models/customer.model";

const BCRYPT_ROUNDS = 10;

/** Placeholders until the customer completes profile (model requires these fields). */
const PENDING_PROFILE_VALUE = "";

export async function registerCustomer(input: {
  fullName: string;
  email: string;
  password: string;
}) {
  const existing = await Customer.findOne({
    email: input.email,
    isDeleted: false,
  });

  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await hash(input.password, BCRYPT_ROUNDS);

  const customer = await Customer.create({
    email: input.email,
    password: passwordHash,
    fullName: input.fullName,
    phoneNumber: PENDING_PROFILE_VALUE,
    city: PENDING_PROFILE_VALUE,
  });

  return {
    customer: {
      _id: customer._id.toString(),
      email: customer.email,
      fullName: customer.fullName,
    },
  };
}
