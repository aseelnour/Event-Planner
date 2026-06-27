import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { ActorEnum } from "../enums/actor";
import type { CustomerAuthPayload } from "../interfaces/customer-auth.interface";
import { Customer } from "../models/customer.model";

function getCustomerJwtSecret(): string {
  return process.env.JWT_CUSTOMER_SECRET || "default_customer_secret_key_2026";
}

export async function customerLogin(email: string, password: string) {
  const customer = await Customer.findOne({ email, isDeleted: false });
  if (!customer) throw new Error("Invalid email or password");

  const isPasswordValid = await compare(password, customer.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const payload: CustomerAuthPayload = {
    id: customer._id.toString(),
    email: customer.email,
    actorType: ActorEnum.Customer,
  };

  const token = jwt.sign(payload, getCustomerJwtSecret(), { expiresIn: "1d" });

  return {
    token,
    customer: {
      id: customer._id.toString(),
      email: customer.email,
      fullName: customer.fullName,
    },
  };
}

export function verifyCustomerToken(token: string): CustomerAuthPayload {
  return jwt.verify(token, getCustomerJwtSecret()) as CustomerAuthPayload;
}
