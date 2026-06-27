import { BookingEnum } from "../../enums/models/booking";

export interface IBookingTimePeriod {
  from: string;
  to: string;
}

export interface IBooking {
  _id: string;
  clientId: string | { _id: string; fullName: string; email: string };
  venueId: string | { _id: string; title: string; location: string };
  customerId: string | { _id: string; fullName: string; email: string };
  date: Date;
  status: BookingEnum;
  timePeriod: IBookingTimePeriod[];
  deletedAt?: Date;
  isDeleted?: boolean;
}
