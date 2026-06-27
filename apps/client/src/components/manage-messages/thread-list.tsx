// import type { ManageThread } from "@/api/manage-messages.api";
// import { useTranslation } from "react-i18next";

// type ThreadListProps = {
// 	threads: ManageThread[];
// 	selectedThreadId: string | null;
// 	onSelect: (thread: ManageThread) => void;
// };

// const getInitials = (name: string) => {
// 	return name
// 		.split(" ")
// 		.map((part) => part[0])
// 		.join("")
// 		.toUpperCase()
// 		.slice(0, 2);
// };

// const formatDate = (dateStr?: string) => {
// 	if (!dateStr) return "";
// 	const date = new Date(dateStr);
// 	const now = new Date();
// 	const diffDays = Math.floor(
// 		(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
// 	);
// 	if (diffDays === 0)
// 		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// 	if (diffDays === 1) return "1d ago";
// 	return `${diffDays}d ago`;
// };

// export const ThreadList = ({
// 	threads,
// 	selectedThreadId,
// 	onSelect,
// }: ThreadListProps) => {
// 	const { t } = useTranslation();

// 	if (threads.length === 0) {
// 		return (
// 			<div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-500">
// 				<p>{t("manageMessages.emptyThreads")}</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<ul className="divide-y divide-gray-100">
// 			{threads.map((thread) => {
// 				const isSelected = thread._id === selectedThreadId;
// 				const name =
// 					thread.senderId?.fullName ?? t("manageMessages.unknownCustomer");
// 				const initials = getInitials(name);

// 				return (
// 					<li key={thread._id}>
// 						<button
// 							type="button"
// 							onClick={() => onSelect(thread)}
// 							className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-200 ${
// 								isSelected ? "bg-indigo-50" : ""
// 							}`}
// 						>
// 							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
// 								{initials}
// 							</div>
// 							<div className="min-w-0 flex-1">
// 								<div className="flex items-center justify-between">
// 									<p
// 										className={`truncate text-sm font-semibold ${
// 											isSelected ? "text-indigo-700" : "text-gray-900"
// 										}`}
// 									>
// 										{name}
// 									</p>
// 									<span className="ml-2 shrink-0 text-xs text-gray-400">
// 										{formatDate(thread.updatedAt ?? thread.createdAt)}
// 									</span>
// 								</div>
// 								<p className="mt-0.5 truncate text-xs text-gray-500">
// 									{thread.senderId?.email ?? ""}
// 								</p>
// 							</div>
// 						</button>
// 					</li>
// 				);
// 			})}
// 		</ul>
// 	);
// };

import type { ManageThread } from "@/api/manage-messages.api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type ThreadListProps = {
  threads: ManageThread[];
  selectedThreadId: string | null;
  onSelect: (thread: ManageThread) => void;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "1d ago";
  return `${diffDays}d ago`;
};

export const ThreadList = ({
  threads,
  selectedThreadId,
  onSelect,
}: ThreadListProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter((thread) => {
    const name = thread.senderId?.fullName?.toLowerCase() ?? "";
    const venue = (thread.venueId as any)?.title?.toLowerCase() ?? "";
    return (
      name.includes(searchQuery.toLowerCase()) ||
      venue.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-100 p-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredThreads.length === 0 ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-500">
            <p>{t("manageMessages.emptyThreads")}</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {filteredThreads.map((thread) => {
              const isSelected = thread._id === selectedThreadId;
              const name =
                thread.senderId?.fullName ??
                t("manageMessages.unknownCustomer");
              const initials = getInitials(name);
              const venueName =
                (thread.venueId as any)?.title ?? "General Inquiry";

              const timeStr =
                thread.lastMessage?.timestamp ??
                thread.updatedAt ??
                thread.createdAt;

              return (
                <li key={thread._id}>
                  <button
                    type="button"
                    onClick={() => onSelect(thread)}
                    className={`flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none ${
                      isSelected
                        ? "bg-indigo-50/70 border-r-2 border-indigo-600"
                        : ""
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`truncate text-sm font-semibold text-gray-900`}
                        >
                          {name}
                        </p>
                        <span className="ml-2 shrink-0 text-xs text-gray-400">
                          {formatDate(timeStr)}
                        </span>
                      </div>
                      <p className="truncate text-xs text-gray-400 mt-0.5">
                        {venueName}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p
                          className={`truncate text-xs ${isSelected ? "text-indigo-900/80" : "text-gray-500"} flex-1 pr-2`}
                        >
                          {thread.lastMessage?.message ??
                            t("manageMessages.noMessages")}
                        </p>
                        {thread.unreadCount && thread.unreadCount > 0 && (
                          <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0"></span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
