import { Schema, model, type Model } from "mongoose";
import { GenderEnum } from "../enums/models/gender.enum";
import { ICustomer } from "../interfaces/models/customer.interface";

const CustomerSchema = new Schema<ICustomer>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
    },
    dob: { type: Date },
    city: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "customers" },
);

export const Customer: Model<ICustomer> = model<ICustomer>("Customer", CustomerSchema);

export { CustomerSchema };