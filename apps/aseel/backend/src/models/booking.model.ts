import { Schema, model, type Model } from "mongoose";

export enum BookingEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export interface IBookingTimePeriod {
  from: string;
  to: string;
}

export interface IBooking {
  _id: string;
  clientId: string;
  venueId: string;
  customerId: string;
  date: Date; // ✅ Date بدلاً من string
  status: BookingEnum;
  timePeriod: IBookingTimePeriod[];
  deletedAt?: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookingTimePeriodSchema = new Schema<IBookingTimePeriod>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false },
);

const BookingSchema = new Schema<IBooking>(
  {
    clientId: { type: String, required: true, ref: "Client" },
    venueId: { type: String, required: true, ref: "Venue" },
    customerId: { type: String, required: true, ref: "Customer" },
    date: { type: Date, required: true }, // ✅ Date
    status: {
      type: String,
      required: true,
      enum: Object.values(BookingEnum),
      default: BookingEnum.PENDING,
    },
    timePeriod: { type: [bookingTimePeriodSchema], required: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "bookings", timestamps: true },
);

export const Booking: Model<IBooking> = model<IBooking>(
  "Booking",
  BookingSchema,
);
