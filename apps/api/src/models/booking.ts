import { Schema, model, type Model } from "mongoose";
import mongoose from "mongoose";
import { BookingEnum } from "../enums/models/booking";
import {
  IBooking,
  IBookingTimePeriod,
} from "../interfaces/models/booking.interface";

const bookingTimePeriodSchema = new Schema<IBookingTimePeriod>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false },
);

const bookingSchema = new Schema<IBooking>(
  {
    clientId: {
      type: String,
      required: true,
      ref: "Client",
    },
    venueId: {
      type: String,
      required: true,
      ref: "Venue",
    },
    customerId: {
      type: String,
      required: true,
      ref: "Customer",
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(BookingEnum),
    },
    timePeriod: {
      type: [bookingTimePeriodSchema],
      required: true,
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "bookings", timestamps: true },
);

export const Booking: Model<IBooking> = model<IBooking>(
  "Booking",
  bookingSchema,
);

export { bookingSchema };
