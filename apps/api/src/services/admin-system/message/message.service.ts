import { Message } from "../../../models/message.model";
import { Thread } from "../../../models/thread.model";
import { IMessage } from "../../../interfaces/models/message.interface";

const createMessage = async (data: IMessage) => {
  const thread = await Thread.findById(data.threadId);
  if (!thread) {
    throw new Error("Thread not found");
  }
  const message = await Message.create(data);
  return message;
};

const getMessagesByThread = async (threadId: string) => {
  return await Message.find({
    threadId,
    isDeleted: { $ne: true },
  }).sort({ createdAt: 1 });
};

const updateMessage = async (id: string, data: IMessage) => {
  const message = await Message.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!message) return null;
  if (data.message) {
    message.message = data.message;
  }
  await message.save();
  return message;
};

const deleteMessage = async (id: string) => {
  const message = await Message.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!message) return null;
  message.isDeleted = true;
  await message.save();
  return message;
};

const getMessageById = async (id: string) => {
  return await Message.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
};

const getMessagesBySenderId = async (senderId: string) => {
  return await Message.find({
    senderId,
    isDeleted: { $ne: true },
  });
};
export const adminMessageServices = {
  createMessage,
  getMessagesByThread,
  deleteMessage,
  updateMessage,
  getMessagesBySenderId,
  getMessageById,
};
