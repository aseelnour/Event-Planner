import { Schema, model, type Model } from "mongoose";
import { GenderEnum } from "../enums/actor";
import { ICustomer } from "../interfaces/customer.interface";

const CustomerSchema = new Schema<ICustomer>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, default: "" },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
    },
    dob: { type: Date },
    city: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "customers" },
);

export const Customer: Model<ICustomer> = model<ICustomer>(
  "Customer",
  CustomerSchema,
);
