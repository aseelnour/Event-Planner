import { Types } from "mongoose";

export type AvailabilityWindow = {
  date: string;
  from: string;
  to: string;
};

export interface IVenue {
  _id: string;
  clientId: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  price: string;
  images: string[];
  extras: string;
  availability?: AvailabilityWindow[];
  discounts?: string;
  isDeleted: boolean;
}
