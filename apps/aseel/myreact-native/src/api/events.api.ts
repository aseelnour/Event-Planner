// C:\Users\Osaid\GFA\event-planner\apps\aseel\myreact-native\src\api\events.api.ts
import { api } from "./client";

export type Venue = {
  _id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  price: number;
  images: string[];
  availability?: {
    date: string;
    from: string;
    to: string;
  }[];
};

export type Booking = {
  _id: string;
  venueId: string;
  venueName?: string;
  date: string;
  timePeriod: { from: string; to: string }[];
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

export type CheckAvailabilityRequest = {
  venueId: string;
  date: string;
  from: string;
  to: string;
};

export type CheckAvailabilityResponse = {
  available: boolean;
  reason?: string;
};

export const eventsApi = {
  // ✅ استخدام المسارات الصحيحة (بدون تكرار /api/customer-system/customer)
  getVenues: () => api.get<Venue[]>("/venues"),

  getVenueById: (id: string) => api.get<Venue>(`/venues/${id}`),

  searchVenues: (query: string) =>
    api.get<Venue[]>(`/venues/search?q=${query}`),

  checkAvailability: (data: CheckAvailabilityRequest) =>
    api.post<CheckAvailabilityResponse>("/venues/check-availability", data),

  getMyBookings: () => api.get<Booking[]>("/bookings"),

  createBooking: (data: {
    venueId: string;
    date: string;
    timePeriod: { from: string; to: string }[];
  }) => api.post<Booking>("/bookings", data),

  cancelBooking: (bookingId: string) => api.delete(`/bookings/${bookingId}`),
};
