import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { ActorEnum } from "../../../enums/models/actor";
import type { CustomerAuthPayload } from "../../../interfaces/customer-auth.interface";
import { Customer } from "../../../models/customer.model";

function getCustomerJwtSecret(): string {
	const secret = process.env.JWT_CUSTOMER_SECRET;
	if (!secret) {
		throw new Error(
			"JWT_CUSTOMER_SECRET is missing in environment variables",
		);
	}
	return secret;
}

export async function customerLogin(email: string, password: string) {
	const customer = await Customer.findOne({ email, isDeleted: false });

	if (!customer) {
		throw new Error("Invalid email or password");
	}

	const isPasswordValid = await compare(password, customer.password);
	if (!isPasswordValid) {
		throw new Error("Invalid email or password");
	}

	const payload: CustomerAuthPayload = {
		id: customer._id.toString(),
		email: customer.email,
		actorType: ActorEnum.Customer,
	};

	const token = jwt.sign(payload, getCustomerJwtSecret(), {
		expiresIn: "1d",
	});

	return {
		token,
		customer: {
			_id: customer._id.toString(),
			email: customer.email,
			fullName: customer.fullName,
			phoneNumber: customer.phoneNumber,
			gender: customer.gender,
			dob: customer.dob,
			city: customer.city,
		},
	};
}

export function verifyCustomerToken(token: string): CustomerAuthPayload {
	const decoded = jwt.verify(
		token,
		getCustomerJwtSecret(),
	) as CustomerAuthPayload;

	if (decoded.actorType !== ActorEnum.Customer) {
		throw new Error("Forbidden");
	}

	return decoded;
}
