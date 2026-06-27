import { Booking } from "../../../models/booking";
import { IBooking } from "../../../interfaces/models/booking.interface";
import { BookingEnum } from "../../../enums/models/booking";
import { Types } from "mongoose";

import { Client } from "../../../models/client.model";
import { Venue } from "../../../models/venue.model";
import { Customer } from "../../../models/customer.model";

const populateBookingReferences = async (bookings: any[]) => {
  console.log("=================================");
  console.log("populateBookingReferences START");
  console.log("Bookings count:", bookings.length);

  if (!bookings.length) {
    console.log("No bookings found");
    return bookings;
  }

  const clientIds = [
    ...new Set(bookings.map((b) => b.clientId).filter(Boolean)),
  ];

  const venueIds = [...new Set(bookings.map((b) => b.venueId).filter(Boolean))];

  const customerIds = [
    ...new Set(bookings.map((b) => b.customerId).filter(Boolean)),
  ];

  console.log("Client IDs from bookings:", clientIds);
  console.log("Venue IDs from bookings:", venueIds);
  console.log("Customer IDs from bookings:", customerIds);

  const [clients, venues, customers] = await Promise.all([
    Client.find({
      _id: { $in: clientIds },
      isDeleted: false,
    }).select("fullName email phoneNumber"),

    Venue.find({
      _id: { $in: venueIds },
      isDeleted: false,
    }).select("title location price"),

    Customer.find({
      _id: { $in: customerIds },
      isDeleted: false,
    }).select("fullName email phoneNumber"),
  ]);

  console.log("=================================");
  console.log("Clients found:", clients.length);
  console.log(
    clients.map((c) => ({
      _id: c._id,
      fullName: c.fullName,
    })),
  );

  console.log("=================================");
  console.log("Venues found:", venues.length);
  console.log(
    venues.map((v) => ({
      _id: v._id,
      title: v.title,
    })),
  );

  console.log("=================================");
  console.log("Customers found:", customers.length);
  console.log(
    customers.map((c) => ({
      _id: c._id,
      fullName: c.fullName,
    })),
  );

  const clientsMap = new Map(clients.map((c) => [c._id.toString(), c]));

  const venuesMap = new Map(venues.map((v) => [v._id.toString(), v]));

  const customersMap = new Map(customers.map((c) => [c._id.toString(), c]));

  bookings.forEach((booking) => {
    console.log("----------- BOOKING -----------");
    console.log("Booking ID:", booking._id);
    console.log("clientId:", booking.clientId);
    console.log("venueId:", booking.venueId);
    console.log("customerId:", booking.customerId);

    console.log("Client Match:", clientsMap.get(String(booking.clientId)));

    console.log("Venue Match:", venuesMap.get(String(booking.venueId)));

    console.log(
      "Customer Match:",
      customersMap.get(String(booking.customerId)),
    );
  });

  const result = bookings.map((booking) => {
    const bookingObj = booking.toObject ? booking.toObject() : booking;

    return {
      ...bookingObj,

      clientId: clientsMap.get(String(booking.clientId)) || booking.clientId,

      venueId: venuesMap.get(String(booking.venueId)) || booking.venueId,

      customerId:
        customersMap.get(String(booking.customerId)) || booking.customerId,
    };
  });

  console.log("=================================");
  console.log("Final populated bookings:");
  console.log(JSON.stringify(result, null, 2));
  console.log("populateBookingReferences END");
  console.log("=================================");

  return result;
};

export const getAllBookings = async () => {
  const bookings = await Booking.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return await populateBookingReferences(bookings);
};

export const getBookingById = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking || booking.isDeleted) return null;
  const populated = await populateBookingReferences([booking]);
  return populated[0] || null;
};

export const getBookingsByClientId = async (clientId: string) => {
  const bookings = await Booking.find({ clientId, isDeleted: false }).sort({
    createdAt: -1,
  });
  return await populateBookingReferences(bookings);
};

export const getBookingsByVenueId = async (venueId: string) => {
  const bookings = await Booking.find({ venueId, isDeleted: false }).sort({
    createdAt: -1,
  });
  return await populateBookingReferences(bookings);
};

export const getBookingsByCustomerId = async (customerId: string) => {
  const bookings = await Booking.find({ customerId, isDeleted: false }).sort({
    createdAt: -1,
  });
  return await populateBookingReferences(bookings);
};

export const getBookingsByStatus = async (status: BookingEnum) => {
  const bookings = await Booking.find({ status, isDeleted: false }).sort({
    createdAt: -1,
  });
  return await populateBookingReferences(bookings);
};

export const createBooking = async (bookingData: IBooking) => {
  const booking = await Booking.create({ ...bookingData, isDeleted: false });
  return await getBookingById(booking._id.toString());
};

export const updateBooking = async (
  id: string,
  bookingData: Partial<IBooking>,
) => {
  const updated = await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
  });

  if (!updated || updated.isDeleted) {
    throw new Error("Booking not found");
  }

  return await getBookingById(id);
};

export const deleteBooking = async (id: string) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isDeleted: true },
    { new: true },
  );

  if (!booking) {
    throw new Error("Booking not found");
  }

  return await getBookingById(id);
};

export const bookingService = {
  getAllBookings,
  getBookingById,
  getBookingsByClientId,
  getBookingsByVenueId,
  getBookingsByCustomerId,
  getBookingsByStatus,
  createBooking,
  updateBooking,
  deleteBooking,
};
