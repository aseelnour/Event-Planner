import { Schema, model, type Model } from "mongoose";
import { IClient } from "../interfaces/models/client.interface";
import { ClientStatusEnum } from "../enums/models/client.status";

const clientSchema = new Schema<IClient>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(ClientStatusEnum),
      default: ClientStatusEnum.WAITING_APPROVE,
    },    isDeleted: { type: Boolean, default: false }, 
  }, 
  {
    collection: "clients", 
    timestamps: true,
  },
);

export const Client: Model<IClient> = model<IClient>("Client", clientSchema);

export { clientSchema };
