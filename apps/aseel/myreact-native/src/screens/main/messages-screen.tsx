// C:\Users\Osaid\GFA\event-planner\apps\aseel\myreact-native\src\screens\main\messages-screen.tsx
// ✅ استخدم api بدلاً من fetch

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { useAuth } from "../../hooks/use-auth";
import { api } from "../../api/client"; // ✅ استخدم api

type ChatMessage = {
  _id: string;
  venueId: string;
  body: string;
  direction: "in" | "out";
  createdAt: string;
};

type ConversationSummary = {
  id: string;
  title: string;
  initials: string;
  lastPreview: string;
  lastAtLabel: string;
  unread: boolean;
  isOnline?: boolean;
};

export const MessagesScreen = () => {
  const { customer, token } = useAuth();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);

  // 1. جلب المحادثات - ✅ استخدام api
  const fetchConversations = async () => {
    try {
      if (!token) {
        console.warn("No token available");
        setLoadingConversations(false);
        return;
      }

      console.log("📡 Fetching conversations...");

      // ✅ استخدم api بدلاً من fetch
      const response = await api.get("/chat/conversations");
      console.log("✅ Conversations response:", response.data);

      setConversations(response.data);

      if (response.data.length > 0 && !activeConversationId) {
        setActiveConversationId(response.data[0].id);
      }
    } catch (error: any) {
      console.error("❌ Error fetching conversations:", error);
      console.error("Response:", error.response?.data);

      // ✅ عرض رسالة للمستخدم
      if (error.response?.status === 404) {
        // لا توجد محادثات بعد
      } else if (error.response?.status === 401) {
        Alert.alert("Session Expired", "Please login again");
      } else {
        Alert.alert("Error", "Failed to load conversations");
      }
    } finally {
      setLoadingConversations(false);
      setRefreshing(false);
    }
  };

  // 2. جلب الرسائل - ✅ استخدام api
  const fetchMessages = async (venueId: string) => {
    if (!venueId || !token) return;

    setLoadingMessages(true);
    try {
      console.log(`📡 Fetching messages for venue: ${venueId}`);

      // ✅ استخدم api بدلاً من fetch
      const response = await api.get(`/chat/messages/${venueId}`);
      console.log(`✅ ${response.data.length} messages received`);

      setActiveMessages(response.data);
    } catch (error: any) {
      console.error("❌ Error fetching messages:", error);
      Alert.alert("Error", "Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  // 3. إرسال رسالة - ✅ استخدام api
  const sendMessage = useCallback(async () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !activeConversationId) return;

    setSending(true);
    try {
      console.log(`📤 Sending message to ${activeConversationId}: ${trimmed}`);

      // ✅ استخدم api بدلاً من fetch
      const response = await api.post("/chat/messages", {
        venueId: activeConversationId,
        body: trimmed,
      });

      console.log("✅ Message sent successfully:", response.data);

      // إضافة الرسالة الجديدة إلى القائمة
      setActiveMessages((prev) => [...prev, response.data]);
      setNewMessage("");

      // تحديث آخر رسالة في قائمة المحادثات
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? {
                ...c,
                lastPreview: trimmed,
                lastAtLabel: "Just now",
              }
            : c,
        ),
      );
    } catch (error: any) {
      console.error("❌ Error sending message:", error);
      Alert.alert("Error", "Failed to send message");
    } finally {
      setSending(false);
    }
  }, [newMessage, activeConversationId]);

  // تحميل المحادثات عند بدء التشغيل
  useEffect(() => {
    if (token) {
      fetchConversations();
    } else {
      setLoadingConversations(false);
    }
  }, [token]);

  // تحميل الرسائل عند تغيير المحادثة
  useEffect(() => {
    if (activeConversationId) {
      fetchMessages(activeConversationId);
    }
  }, [activeConversationId]);

  // تحديث يدوي (Pull to Refresh)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConversations();
  }, []);

  // فلترة المحادثات
  const filteredConversations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.lastPreview.toLowerCase().includes(q),
    );
  }, [conversations, searchQuery]);

  // المحادثة النشطة
  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) || null,
    [conversations, activeConversationId],
  );

  // اختيار محادثة
  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  // عرض رسالة
  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageBubble,
        item.direction === "out" ? styles.messageOut : styles.messageIn,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.direction === "out" && styles.messageTextOut,
        ]}
      >
        {item.body}
      </Text>
      <Text
        style={[
          styles.messageTime,
          item.direction === "out" && styles.messageTimeOut,
        ]}
      >
        {new Date(item.createdAt).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  // عرض محادثة
  const renderConversation = ({ item }: { item: ConversationSummary }) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        activeConversationId === item.id && styles.conversationActive,
      ]}
      onPress={() => selectConversation(item.id)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        {item.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationTitle}>{item.title}</Text>
          <Text style={styles.conversationTime}>{item.lastAtLabel}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.conversationPreview} numberOfLines={1}>
            {item.lastPreview}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  // ✅ حالة التحميل
  if (loadingConversations) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading conversations...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* شريط البحث */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.mainContainer}>
        {/* قائمة المحادثات */}
        <View style={styles.conversationsList}>
          {conversations.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>💬</Text>
              <Text style={styles.emptyStateTitle}>No conversations</Text>
              <Text style={styles.emptyStateText}>
                Start chatting with venues about your events
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredConversations}
              keyExtractor={(item) => item.id}
              renderItem={renderConversation}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>

        {/* منطقة الشات */}
        <View style={styles.chatArea}>
          {activeConversation ? (
            <>
              {/* رأس الشات */}
              <View style={styles.chatHeader}>
                <View>
                  <Text style={styles.chatTitle}>
                    {activeConversation.title}
                  </Text>
                  <Text style={styles.chatStatus}>
                    {activeMessages.length > 0
                      ? `${activeMessages.length} messages`
                      : "No messages yet"}
                  </Text>
                </View>
              </View>

              {/* الرسائل */}
              {loadingMessages ? (
                <View style={styles.centered}>
                  <ActivityIndicator color="#4f46e5" size="large" />
                </View>
              ) : (
                <FlatList
                  data={activeMessages}
                  keyExtractor={(item) => item._id}
                  renderItem={renderMessage}
                  contentContainerStyle={styles.messagesContainer}
                  inverted={false}
                  ref={(ref) => {
                    if (ref && activeMessages.length > 0) {
                      setTimeout(
                        () => ref.scrollToEnd({ animated: true }),
                        100,
                      );
                    }
                  }}
                />
              )}

              {/* حقل الإدخال */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    (!newMessage.trim() || sending) &&
                      styles.sendButtonDisabled,
                  ]}
                  onPress={sendMessage}
                  disabled={!newMessage.trim() || sending}
                >
                  <Text style={styles.sendButtonText}>
                    {sending ? "..." : "Send"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatIcon}>💬</Text>
              <Text style={styles.emptyChatTitle}>Select a conversation</Text>
              <Text style={styles.emptyChatText}>
                Choose a conversation from the list to start messaging
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f3ff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#6b7280", fontSize: 14 },

  searchContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1a1a2e",
  },

  mainContainer: { flex: 1, flexDirection: "row" },

  conversationsList: {
    width: "35%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },

  conversationItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
  },
  conversationActive: { backgroundColor: "#f5f3ff" },

  avatarContainer: { position: "relative", marginRight: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#fff",
  },

  conversationContent: { flex: 1 },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  conversationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a2e",
    flex: 1,
    marginRight: 8,
  },
  conversationTime: { fontSize: 11, color: "#9ca3af" },
  conversationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conversationPreview: {
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4f46e5",
  },

  chatArea: { flex: 1, backgroundColor: "#fff" },

  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fafafa",
  },
  chatTitle: { fontSize: 18, fontWeight: "600", color: "#1a1a2e" },
  chatStatus: { fontSize: 12, color: "#6b7280", marginTop: 2 },

  messagesContainer: { padding: 16, paddingBottom: 8 },

  messageBubble: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  messageIn: {
    backgroundColor: "#f3f4f6",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageOut: {
    backgroundColor: "#4f46e5",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  messageText: { fontSize: 14, color: "#1a1a2e" },
  messageTextOut: { color: "#fff" },
  messageTime: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  messageTimeOut: { color: "#c7d2fe" },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    alignItems: "flex-end",
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: "#1a1a2e",
  },
  sendButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 8,
    justifyContent: "center",
  },
  sendButtonDisabled: { opacity: 0.5 },
  sendButtonText: { color: "#fff", fontWeight: "600" },

  emptyChat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyChatIcon: { fontSize: 48, marginBottom: 16 },
  emptyChatTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  emptyChatText: { color: "#9ca3af", fontSize: 14, textAlign: "center" },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateIcon: { fontSize: 48, marginBottom: 16 },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  emptyStateText: { color: "#9ca3af", fontSize: 14, textAlign: "center" },
});
