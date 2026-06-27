import { Schema, model } from "mongoose";

export interface IVenue {
  _id: string;
  clientId: string;
  title: string; // ✅ title بدلاً من name
  description: string;
  location: string;
  capacity: number;
  price: string; // ✅ string بدلاً من number
  images: string[];
  extras?: string;
  availability?: {
    date: Date;
    from: string;
    to: string;
  }[];
  discounts?: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const availabilitySchema = new Schema(
  {
    date: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false },
);

const VenueSchema = new Schema<IVenue>(
  {
    clientId: { type: String, required: true, ref: "Client" },
    title: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: false },
    capacity: { type: Number, required: false },
    price: { type: String, required: false }, // ✅ string
    images: { type: [String], required: false },
    extras: { type: String, required: false },
    availability: { type: [availabilitySchema], required: false },
    discounts: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "venues", timestamps: true },
);

export const Venue = model<IVenue>("Venue", VenueSchema);
