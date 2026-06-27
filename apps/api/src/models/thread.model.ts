import mongoose, { Schema } from "mongoose";
import { IThread } from "../interfaces/models/thread.interface";

const threadSchema = new Schema<IThread>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// منع تكرار نفس الثريد
threadSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

export const Thread = mongoose.model<IThread>("Thread", threadSchema);
