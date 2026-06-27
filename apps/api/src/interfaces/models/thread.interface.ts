import { Types } from "mongoose";
export interface IThread {
  _id: string;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
