export type BookingStatus = "pending" | "approved" | "declined";
export type StatusFilter = BookingStatus | "all";
export interface BookingTimePeriod {
  from: string;
  to: string;
}

export interface BookingCustomer {
  _id: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string | number;
}

export interface BookingVenue {
  _id: string;
  title?: string;
  location?: string;
  price?: string | number;
}

export interface Booking {
  _id: string;
  clientId: string | BookingCustomer;
  venueId: string | BookingVenue;
  customerId: string | BookingCustomer;
  date: string;
  status: BookingStatus;
  totalAmount?: string | number;
  timePeriod: BookingTimePeriod[];
}
