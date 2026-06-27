import type { ManageThread } from "@/api/manage-messages.api";
import { ChatWindow } from "@/components/manage-messages/chat-window";
import { ThreadList } from "@/components/manage-messages/thread-list";
import {
	useManageMessages,
	useManageThreads,
	useSendManageMessage,
} from "@/hooks/use-manage-messages";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ManageMessagesPage = () => {
	const { t } = useTranslation();
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;

	const [selectedThread, setSelectedThread] = useState<ManageThread | null>(
		null,
	);

	const threadsQuery = useManageThreads();
	const messagesQuery = useManageMessages(selectedThread?._id ?? null);
	const sendMessage = useSendManageMessage();

	const threads = threadsQuery.data ?? [];
	const messages = messagesQuery.data ?? [];

	const handleSend = (message: string) => {
		if (!selectedThread || !clientId) return;
		sendMessage.mutate({
			clientId,
			threadId: selectedThread._id,
			message,
		});
	};

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-3xl font-bold text-gray-950">
					{t("manageMessages.title")}
				</h2>
				<p className="mt-4 text-lg text-gray-600">
					{t("manageMessages.subtitle")}
				</p>
			</div>

			{!clientId && (
				<div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
					{t("manageMessages.sessionLoading")}
				</div>
			)}

			{threadsQuery.isError && (
				<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
					{t("manageMessages.loadError")}
				</div>
			)}

			{threadsQuery.isLoading && (
				<div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-600">
					{t("manageMessages.loading")}
				</div>
			)}

			{!threadsQuery.isLoading && !threadsQuery.isError && (
				<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
					<div className="grid h-[70vh] grid-cols-[320px_1fr]">
						<div className="overflow-y-auto border-r border-gray-100">
							<div className="border-b border-gray-100 px-4 py-3">
								<h3 className="text-sm font-semibold text-gray-700">
									{t("manageMessages.conversations")}
								</h3>
							</div>
							<ThreadList
								threads={threads}
								selectedThreadId={selectedThread?._id ?? null}
								onSelect={setSelectedThread}
							/>
						</div>
						<ChatWindow
							thread={selectedThread}
							messages={messages}
							isSending={sendMessage.isPending}
							onSend={handleSend}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
