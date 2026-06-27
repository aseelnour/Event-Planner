import { Types } from "mongoose";

import { ActorEnum } from "../../../enums/models/actor";
import type { AdminAuthPayload } from "../../../interfaces/admin-auth.interface";
import type {
	IClientProfile,
	IClientProfileContactInformation,
} from "../../../interfaces/models/client-profile.interface";
import { Client } from "../../../models/client.model";
import { ClientProfile } from "../../../models/client-profile";

export interface CreateClientProfileInput {
	clientId: string;
	address: string;
	description: string;
	mapURL: string;
	contactInformation?: IClientProfileContactInformation[];
	logo: string;
	coverImage: string;
}

export interface UpdateClientProfileInput {
	address?: string;
	description?: string;
	mapURL?: string;
	contactInformation?: IClientProfileContactInformation[];
	logo?: string;
	coverImage?: string;
}

function assertAdminAuthorization(admin: AdminAuthPayload): void {
	if (admin.actorType !== ActorEnum.Admin) {
		throw new Error("Forbidden");
	}
}

function assertValidObjectId(id: string, fieldName: string): void {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error(`Invalid ${fieldName}`);
	}
}

async function assertClientExists(clientId: string): Promise<void> {
	const client = await Client.findById(clientId).select("_id").lean();
	if (!client) {
		throw new Error("Client not found");
	}
}

export async function createClientProfile(
	admin: AdminAuthPayload,
	input: CreateClientProfileInput,
): Promise<IClientProfile> {
	assertAdminAuthorization(admin);
	assertValidObjectId(input.clientId, "clientId");
	await assertClientExists(input.clientId);

	const existingProfile = await ClientProfile.findOne({ clientId: input.clientId })
		.select("_id")
		.lean();
	if (existingProfile) {
		throw new Error("Client profile already exists");
	}

	return ClientProfile.create({
		clientId: input.clientId,
		address: input.address,
		description: input.description,
		mapURL: input.mapURL,
		contactInformation: input.contactInformation ?? [],
		logo: input.logo,
		coverImage: input.coverImage,
	});
}

export async function getClientProfiles(
	admin: AdminAuthPayload,
): Promise<IClientProfile[]> {
	assertAdminAuthorization(admin);
	return ClientProfile.find().sort({ _id: -1 }).lean();
}

export async function getClientProfileById(
	admin: AdminAuthPayload,
	profileId: string,
): Promise<IClientProfile> {
	assertAdminAuthorization(admin);
	assertValidObjectId(profileId, "profileId");

	const profile = await ClientProfile.findById(profileId).lean();
	if (!profile) {
		throw new Error("Client profile not found");
	}

	return profile;
}

export async function getClientProfileByClientId(
	admin: AdminAuthPayload,
	clientId: string,
): Promise<IClientProfile> {
	assertAdminAuthorization(admin);
	assertValidObjectId(clientId, "clientId");

	const profile = await ClientProfile.findOne({ clientId }).lean();
	if (!profile) {
		throw new Error("Client profile not found");
	}

	return profile;
}

export async function updateClientProfile(
	admin: AdminAuthPayload,
	profileId: string,
	input: UpdateClientProfileInput,
): Promise<IClientProfile> {
	assertAdminAuthorization(admin);
	assertValidObjectId(profileId, "profileId");

	const profile = await ClientProfile.findByIdAndUpdate(
		profileId,
		{
			$set: {
				...(input.address !== undefined ? { address: input.address } : {}),
				...(input.description !== undefined
					? { description: input.description }
					: {}),
				...(input.mapURL !== undefined ? { mapURL: input.mapURL } : {}),
				...(input.contactInformation !== undefined
					? { contactInformation: input.contactInformation }
					: {}),
				...(input.logo !== undefined ? { logo: input.logo } : {}),
				...(input.coverImage !== undefined ? { coverImage: input.coverImage } : {}),
			},
		},
		{
			new: true,
			runValidators: true,
		},
	).lean();

	if (!profile) {
		throw new Error("Client profile not found");
	}

	return profile;
}

export async function deleteClientProfile(
	admin: AdminAuthPayload,
	profileId: string,
): Promise<void> {
	assertAdminAuthorization(admin);
	assertValidObjectId(profileId, "profileId");

	const deletedProfile = await ClientProfile.findByIdAndDelete(profileId)
		.select("_id")
		.lean();

	if (!deletedProfile) {
		throw new Error("Client profile not found");
	}
}
