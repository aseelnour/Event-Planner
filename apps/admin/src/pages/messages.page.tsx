import { useState } from "react";
import { useThreads } from "@/hooks/use-threads";
import { useMessages } from "@/hooks/use-messages";
import { useTranslation } from "react-i18next";

export const MessagesPage = () => {
  const { t } = useTranslation();
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const { data: threads, isLoading: threadsLoading } = useThreads();
  const { data: messages, isLoading: messagesLoading } = useMessages(selectedThreadId);

  const selectedThread = threads?.find((t: any) => t._id === selectedThreadId);

  const getInitials = (name: string) =>
    String(name ?? "??").slice(0, 2).toUpperCase();

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Left — Thread List */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <input
            type="text"
            placeholder={t("messagesPage.searchPlaceholder")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {threadsLoading ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              {t("messagesPage.loading")}
            </div>
          ) : threads?.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              {t("messagesPage.noConversations")}
            </div>
          ) : (
            threads?.map((thread: any) => (
              <button
                key={thread._id}
                onClick={() => setSelectedThreadId(thread._id)}
                className={`w-full flex items-center gap-3 px-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors text-start ${
                  selectedThreadId === thread._id ? "bg-indigo-50" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {getInitials(thread.senderId?.fullName)}
                  </div>
                  {thread.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {thread.senderId?.fullName ?? t("common.unknown")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(thread.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {thread.lastMessage || t("messagesPage.noMessagesYet")}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right — Messages */}
      <div className="flex-1 flex flex-col">
        {!selectedThreadId ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            {t("messagesPage.selectConversation")}
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                  {getInitials(selectedThread?.senderId?.fullName)}
                </div>
                {selectedThread?.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {selectedThread?.senderId?.fullName ?? t("common.unknown")}
                </p>
                <p className={`text-xs flex items-center gap-1 ${
                  selectedThread?.isOnline ? "text-green-500" : "text-gray-400"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                    selectedThread?.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`} />
                  {selectedThread?.isOnline
                    ? t("messagesPage.online")
                    : t("messagesPage.offline")}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                  {t("messagesPage.loadingMessages")}
                </div>
              ) : messages?.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                  {t("messagesPage.noMessagesYet")}
                </div>
              ) : (
                messages?.map((msg: any) => {
                  const isFromSender =
                    msg.senderId === selectedThread?.senderId?._id ||
                    msg.actorType === "customer";

                  return (
                    <div
                      key={msg._id}
                      className={`flex flex-col ${
                        isFromSender ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl text-sm ${
                          isFromSender
                            ? "bg-gray-100 text-gray-800"
                            : "bg-indigo-600 text-white"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input — read only */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
              <input
                type="text"
                placeholder={t("messagesPage.typeYourMessage")}
                disabled
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none bg-gray-50 cursor-not-allowed"
              />
              <button
                disabled
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium opacity-50 cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                {t("messagesPage.send")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};