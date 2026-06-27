import type { ManageMessage, ManageThread } from "@/api/manage-messages.api";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

type ChatWindowProps = {
  thread: ManageThread | null;
  messages: ManageMessage[];
  isSending?: boolean;
  onSend: (message: string) => void;
};

const formatTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ChatWindow = ({
  thread,
  messages,
  isSending,
  onSend,
}: ChatWindowProps) => {
  const { t } = useTranslation();
  const client = useAuthStore((s) => s.client);
  const clientId = client?.id ?? client?._id;
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  if (!thread) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        <p>{t("manageMessages.selectThread")}</p>
      </div>
    );
  }

  const customerName =
    thread.senderId?.fullName ?? t("manageMessages.unknownCustomer");

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
          {thread.senderId?.fullName
            ? getInitials(thread.senderId.fullName)
            : "SJ"}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{customerName}</h3>
          <p className="text-xs text-gray-500">
            {(thread as any).venueId?.title
              ? `${(thread as any).venueId.title} inquiry`
              : "General Inquiry"}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            {t("manageMessages.noMessages")}
          </div>
        )}
        {messages.map((msg) => {
          const isOwn =
            msg.senderId?.toString() === clientId?.toString() &&
            msg.actorType === "client";
          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                  isOwn
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.message}</p>
                <p
                  className={`mt-1 text-xs ${
                    isOwn ? "text-indigo-200" : "text-gray-400"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("manageMessages.typePlaceholder")}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            disabled={isSending}
          />
          <Button
            type="submit"
            icon={<SendIcon />}
            disabled={isSending || !text.trim()}
            className="h-12 px-5"
          >
            {t("manageMessages.send")}
          </Button>
        </div>
      </form>
    </div>
  );
};
