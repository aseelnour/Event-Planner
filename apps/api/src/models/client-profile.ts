import { Schema, model, type Model } from "mongoose";

import { IClientProfile, IClientProfileContactInformation } from "../interfaces/models/client-profile.interface";

const clientProfileContactInformationSchema = new Schema<IClientProfileContactInformation>(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
	},
	{ _id: false },
);

const clientProfileSchema = new Schema<IClientProfile>(
	{
		clientId: {
			type: String,
			required: true,
			ref: "Client",
		},
		address: { type: String, required: true },
		description: { type: String, required: true },
		mapURL: { type: String, required: true },
		contactInformation: {
			type: [clientProfileContactInformationSchema],
			required: false,
		},
		logo: { type: String, required: true },
		coverImage: { type: String, required: true },
	},
	{ collection: "clientProfiles" },
);

export const ClientProfile: Model<IClientProfile> = model<IClientProfile>(
	"ClientProfile",
	clientProfileSchema,
);

export { clientProfileSchema };
