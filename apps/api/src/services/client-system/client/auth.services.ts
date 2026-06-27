import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

import { ActorEnum } from "../../../enums/models/actor";
import type { ClientAuthPayload } from "../../../interfaces/client-auth.interface";
import { ClientStatusEnum } from "../../../enums/models/client.status";
import { Client } from "../../../models/client.model";

const BCRYPT_ROUNDS = 10;

export async function registerClient(input: {
	email: string;
	password: string;
	fullName: string;
	phoneNumber: string;
}) {
	const existing = await Client.findOne({
		email: input.email,
		isDeleted: false,
	});

	if (existing) {
		throw new Error("Email already registered");
	}

	const passwordHash = await hash(input.password, BCRYPT_ROUNDS);

	const client = await Client.create({
		email: input.email,
		password: passwordHash,
		fullName: input.fullName,
		phoneNumber: input.phoneNumber,
		status: ClientStatusEnum.WAITING_APPROVE,
	});

	return {
		client: {
			_id: client._id.toString(),
			email: client.email,
			fullName: client.fullName,
			phoneNumber: client.phoneNumber,
			status: client.status,
		},
	};
}

function getClientJwtSecret(): string {
	const secret = process.env.JWT_CLIENT_SECRET;
	if (!secret) {
		throw new Error(
			"JWT_CLIENT_SECRET is missing in environment variables",
		);
	}
	return secret;
}

export async function clientLogin(email: string, password: string) {
	const client = await Client.findOne({ email, isDeleted: false });

	if (!client) {
		throw new Error("Invalid email or password");
	}

	if (client.status === ClientStatusEnum.WAITING_APPROVE) {
		throw new Error("Account pending approval");
	}

	if (client.status === ClientStatusEnum.BANNED) {
		throw new Error("Account suspended");
	}

	const isPasswordValid = await compare(password, client.password);
	if (!isPasswordValid) {
		throw new Error("Invalid email or password");
	}

	const payload: ClientAuthPayload = {
		id: client._id.toString(),
		email: client.email,
		actorType: ActorEnum.Client,
	};

	const token = jwt.sign(payload, getClientJwtSecret(), {
		expiresIn: "1d",
	});

	return {
		token,
		client: {
			_id: client._id.toString(),
			email: client.email,
			fullName: client.fullName,
			phoneNumber: client.phoneNumber,
			status: client.status,
		},
	};
}

export function verifyClientToken(token: string): ClientAuthPayload {
	const decoded = jwt.verify(
		token,
		getClientJwtSecret(),
	) as ClientAuthPayload;

	if (decoded.actorType !== ActorEnum.Client) {
		throw new Error("Forbidden");
	}

	return decoded;
}
