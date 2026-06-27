import { Venue } from "../../../models/venue.model";
import type {
  CreateVenueInput,
  UpdateVenueInput,
} from "../../../validation/admin-system/venues.schemas";

export async function getAllVenues() {
  return await Venue.find({ isDeleted: false });
}

export async function getVenueById(id: string) {
  const venue = await Venue.findOne({ _id: id, isDeleted: false });
  if (!venue) {
    throw new Error("Venue not found");
  }
  return venue;
}

export async function getVenuesByClientId(clientId: string) {
  const venues = await Venue.find({ clientId, isDeleted: false });
  if (!venues.length) {
    throw new Error("No venues found for this client");
  }
  return venues;
}

export async function createVenue(data: CreateVenueInput) {
  const venue = new Venue(data);
  return await venue.save();
}

export async function updateVenue(id: string, data: UpdateVenueInput) {
  const venue = await Venue.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
  if (!venue) {
    throw new Error("Venue not found");
  }
  return venue;
}

export async function deleteVenue(id: string) {
  const venue = await Venue.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  if (!venue) {
    throw new Error("Venue not found");
  }
  return venue;
}

export const adminVenueServices = {
  getAllVenues,
  getVenueById,
  getVenuesByClientId,
  createVenue,
  updateVenue,
  deleteVenue,
};