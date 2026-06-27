import { Schema, model, type Model } from "mongoose";

import { IAdmin } from "../interfaces/models/admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { collection: "admins", timestamps: true }
);

export const Admin: Model<IAdmin> = model<IAdmin>("Admin", adminSchema);

export { adminSchema };
