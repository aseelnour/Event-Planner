import { Thread } from "../../../models/thread.model";

const notDeleted = { isDeleted: { $ne: true } };

export const createThread = async (senderId: string, receiverId: string) => {
  if (senderId === receiverId) {
    throw new Error("Sender and receiver cannot be the same");
  }
  const existingThread = await Thread.findOne({
    senderId,
    receiverId,
    ...notDeleted,
  });
  if (existingThread) {
    return existingThread;
  }
  const thread = await Thread.create({
    senderId,
    receiverId,
  });
  return thread;
};

export const getAllThreads = async () => {
  return await Thread.find(notDeleted)
    .sort({ createdAt: -1 })
    .populate("senderId receiverId");
};

export const getThreadById = async (id: string) => {
  return await Thread.findOne({ _id: id, ...notDeleted }).populate(
    "senderId receiverId",
  );
};

export const getThreadsBySenderId = async (senderId: string) => {
  return await Thread.find({
    senderId,
    ...notDeleted,
  })
    .sort({ createdAt: -1 })
    .populate("senderId receiverId");
};

export const getThreadsByReceiverId = async (receiverId: string) => {
  return await Thread.find({
    receiverId,
    ...notDeleted,
  })
    .sort({ createdAt: -1 })
    .populate("senderId receiverId");
};

export const updateThread = async (id: string, data: any) => {
  const thread = await Thread.findOne({ _id: id, ...notDeleted });
  if (!thread) return null;
  if (data.receiverId) {
    thread.receiverId = data.receiverId;
  }

  await thread.save();
  return thread;
};

export const deleteThread = async (id: string) => {
  const thread = await Thread.findOne({ _id: id, ...notDeleted });
  if (!thread) return null;
  thread.isDeleted = true;
  await thread.save();

  return thread;
};

export const adminThreadServices = {
  createThread,
  getAllThreads,
  getThreadById,
  getThreadsBySenderId,
  getThreadsByReceiverId,
  updateThread,
  deleteThread,
};
