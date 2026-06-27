import { Thread } from "../../../models/thread.model";
import { Message } from "../../../models/message.model";
import { ActorEnum } from "../../../enums/models/actor";
import type {
  SendManageMessageInput,
  SendCustomerMessageInput,
} from "../../../validation/client-system/manage-messages.schemas";

export async function getThreadsByClientId(clientId: string) {
  // جلب الثريدات وترتيبها حسب التحديث الأحدث
  const threads = await Thread.find({ receiverId: clientId, isDeleted: false })
    .sort({ updatedAt: -1 })
    .populate("senderId")
    .populate({ path: "venueId", options: { strictPopulate: false } });

  const threadsWithLastMessage = await Promise.all(
    threads.map(async (thread) => {
      const lastMessage = await Message.findOne({
        threadId: thread._id,
        isDeleted: false,
      }).sort({ timestamp: -1 });

      // تحويل الـ clientId إلى string لضمان المقارنة النصية الصحيحة داخل السيرفر
      const unreadCount = await Message.countDocuments({
        threadId: thread._id,
        senderId: { $ne: clientId.toString() },
        status: { $ne: "read" },
        isDeleted: false,
      });

      return {
        ...thread.toObject(),
        lastMessage: lastMessage
          ? {
              message: lastMessage.message,
              timestamp: lastMessage.timestamp,
              senderId: lastMessage.senderId,
            }
          : null,
        unreadCount,
      };
    }),
  );

  return threadsWithLastMessage;
}

export async function getMessagesByThreadId(threadId: string) {
  return await Message.find({ threadId, isDeleted: false }).sort({
    timestamp: 1,
  });
}

export async function sendManageMessage(data: SendManageMessageInput) {
  const thread = await Thread.findOne({
    _id: data.threadId,
    receiverId: data.clientId,
    isDeleted: false,
  });

  if (!thread) {
    throw new Error("Thread not found");
  }

  // 1. إنشاء الرسالة وحفظها
  const message = new Message({
    senderId: data.clientId.toString(),
    actorType: ActorEnum.Client,
    message: data.message,
    threadId: data.threadId,
    timestamp: new Date(),
  });
  const savedMessage = await message.save();

  // 2. تحديث وقت الـ Thread الصحيح في Mongoose لإجباره على الصعود للأعلى
  await Thread.findByIdAndUpdate(data.threadId, {
    $set: { updatedAt: new Date() },
  });

  return savedMessage;
}
// أضف هذه الدوال في نهاية الملف مع بقية الدوال السابقة

export async function getThreadsByCustomerId(customerId: string) {
  const threads = await Thread.find({ senderId: customerId, isDeleted: false })
    .sort({ updatedAt: -1 })
    .populate("receiverId"); // عمل Populate لحساب الكلاينت (المستقبل)

  const threadsWithLastMessage = await Promise.all(
    threads.map(async (thread) => {
      const lastMessage = await Message.findOne({
        threadId: thread._id,
        isDeleted: false,
      }).sort({ timestamp: -1 });

      const unreadCount = await Message.countDocuments({
        threadId: thread._id,
        senderId: { $ne: customerId.toString() },
        status: { $ne: "read" },
        isDeleted: false,
      });

      return {
        ...thread.toObject(),
        lastMessage: lastMessage
          ? {
              message: lastMessage.message,
              timestamp: lastMessage.timestamp,
              senderId: lastMessage.senderId,
            }
          : null,
        unreadCount,
      };
    }),
  );

  return threadsWithLastMessage;
}

export async function sendCustomerMessage(data: SendCustomerMessageInput) {
  const thread = await Thread.findOne({
    _id: data.threadId,
    senderId: data.customerId,
    isDeleted: false,
  });

  if (!thread) {
    throw new Error("Thread not found");
  }

  const message = new Message({
    senderId: data.customerId.toString(),
    actorType: ActorEnum.Customer, // تأكيد الهوية هنا
    message: data.message,
    threadId: data.threadId,
    timestamp: new Date(),
  });

  const savedMessage = await message.save();

  // تحديث وقت الـ Thread ليصعد للأعلى للطرفين
  await Thread.findByIdAndUpdate(data.threadId, {
    $set: { updatedAt: new Date() },
  });

  return savedMessage;
}

export const clientManageMessagesServices = {
  getThreadsByClientId,
  getMessagesByThreadId,
  sendManageMessage,
  getThreadsByCustomerId,
  sendCustomerMessage,
};
