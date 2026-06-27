import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

// 1. تحديث الـ Base URL ليشمل الـ prefixes الخاصة بالـ API لديك
const api = axios.create({
  baseURL: "http://localhost:3000/api/client-system/client/manage-messages", // ◄ جرب هذا المسار الكامل أولاً
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useCustomerMessages = () => {
  const queryClient = useQueryClient();
  const customer = useAuthStore((s) => s.customer);
  const customerId = customer?.id || customer?._id;

  const [activeConversationId, setActiveConversationId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. جلب المحادثات (Threads) الحقيقية للكاستمر
  const threadsQuery = useQuery({
    queryKey: ["customer-threads", customerId],
    queryFn: async () => {
      // تم تنظيف المسار ليقرأ مباشرة بناءً على الـ baseURL
      const res = await api.get(`/customer/${customerId}`);
      return res.data;
    },
    enabled: !!customerId,
  });

  // 2. جلب رسائل الثريد المفتوح حالياً
  const messagesQuery = useQuery({
    queryKey: ["customer-messages", activeConversationId],
    queryFn: async () => {
      const res = await api.get(`/thread/${activeConversationId}`);
      return res.data;
    },
    enabled: !!activeConversationId,
  });

  // 3. طفرة إرسال رسالة جديدة للباك إند
  const sendMessageMutation = useMutation({
    mutationFn: async (body: string) => {
      return api.post(`/customer`, {
        customerId,
        threadId: activeConversationId,
        message: body,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["customer-messages", activeConversationId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["customer-threads", customerId],
      });
    },
  });

  // تحويل البيانات القادمة من الباك إند لتتوافق مع تصميم الواجهة (Adapter)
  const conversations = useMemo(() => {
    const rawThreads = threadsQuery.data ?? [];
    return rawThreads.map((t: any) => ({
      id: t._id,
      title: t.receiverId?.fullName || "Client Portal", // اسم الكلاينت أو الصالة
      initials: (t.receiverId?.fullName || "CP").substring(0, 2).toUpperCase(),
      lastPreview: t.lastMessage?.message || "No messages yet",
      lastAtLabel: t.lastMessage?.timestamp
        ? new Date(t.lastMessage.timestamp).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })
        : "",
      unread: t.unreadCount > 0,
      isOnline: true,
    }));
  }, [threadsQuery.data]);

  const filteredConversations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c: any) => c.title.toLowerCase().includes(q));
  }, [conversations, searchQuery]);

  const activeConversation =
    conversations.find((c: any) => c.id === activeConversationId) || null;

  // تحويل الرسائل القادمة من الباك إند لتتوافق مع تصميم الفقاعات (Bubbles)
  const activeMessages = useMemo(() => {
    const rawMessages = messagesQuery.data ?? [];
    return rawMessages.map((m: any) => ({
      id: m._id,
      conversationId: m.threadId,
      body: m.message,
      // إذا كان المرسل هو الكاستمر نفسه إذن الاتجاه out (يمين)، خلافه يكون in (يسار)
      direction: m.senderId === customerId ? "out" : "in",
      createdAt: m.timestamp,
    }));
  }, [messagesQuery.data, customerId]);

  return {
    searchQuery,
    setSearchQuery,
    filteredConversations,
    activeConversationId,
    activeConversation,
    activeMessages,
    selectConversation: setActiveConversationId,
    sendMessage: (body: string) => sendMessageMutation.mutate(body),
    formatBubbleTime: (iso: string) => {
      try {
        return new Date(iso).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
      } catch {
        return "";
      }
    },
  };
};
