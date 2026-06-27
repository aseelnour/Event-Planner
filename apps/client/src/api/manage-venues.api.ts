import { api } from "@/services/axios";

export type AvailabilityWindow = {
  date: string;
  from: string;
  to: string;
};

export type ManageVenue = {
  _id: string;
  clientId: string;
  title: string;
  description: string;
  location: string;
  price: string;
  images: string[];
  extras?: string;
  availability?: AvailabilityWindow[];
  discounts?: string;
  isDeleted?: boolean;
  capacity?: string | number;
  status?: "active" | "inactive";
  bookingsCount?: number;
};

export type ManageVenuePayload = {
  clientId: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  price: string;
  images: string[];
  extras?: string;
  availability?: AvailabilityWindow[];
  discounts?: string;
};

export type UpdateManageVenuePayload = Partial<
  Omit<ManageVenuePayload, "clientId">
>;

const basePath = "/api/client-system/client/manage-venues";

export const getManageVenues = (clientId?: string) => {
  if (clientId) {
    return api.get<ManageVenue[]>(`${basePath}/client/${clientId}`);
  }

  return api.get<ManageVenue[]>(basePath);
};

export const createManageVenue = (data: ManageVenuePayload) => {
  return api.post<ManageVenue>(basePath, data);
};

export const updateManageVenue = (
  id: string,
  data: UpdateManageVenuePayload,
) => {
  return api.patch<ManageVenue>(`${basePath}/${id}`, data);
};

export const deleteManageVenue = (id: string) => {
  return api.delete<{ message: string }>(`${basePath}/${id}`);
};
