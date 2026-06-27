import { useEffect, useRef, useState } from "react";

import { useCustomerMessages } from "@/hooks/use-customer-messages";
import type { ChatMessage, ConversationSummary } from "@/types/messages.types";

const SearchIcon = () => (
	<svg
		className="h-4 w-4 text-slate-400"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
		/>
	</svg>
);

function AvatarBadge({
	initials,
	className = "",
}: {
	initials: string;
	className?: string;
}) {
	return (
		<div
			className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-sm ${className}`}
		>
			{initials}
		</div>
	);
}

function ConversationRow({
	item,
	active,
	onSelect,
}: {
	item: ConversationSummary;
	active: boolean;
	onSelect: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={`flex w-full gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
				active
					? "bg-indigo-50/90 ring-1 ring-indigo-100"
					: "hover:bg-slate-50"
			}`}
		>
			<AvatarBadge initials={item.initials} className="h-10 w-10 text-xs" />
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between gap-2">
					<p className="truncate font-semibold text-slate-900">{item.title}</p>
					<div className="flex shrink-0 items-center gap-1">
						{item.unread ? (
							<span className="h-2 w-2 rounded-full bg-indigo-500" />
						) : null}
						<span className="text-xs text-slate-400">{item.lastAtLabel}</span>
					</div>
				</div>
				<p className="mt-0.5 truncate text-sm text-slate-500">{item.lastPreview}</p>
			</div>
		</button>
	);
}

function ChatBubble({
	message,
	formatTime,
}: {
	message: ChatMessage;
	formatTime: (iso: string) => string;
}) {
	const incoming = message.direction === "in";
	return (
		<div className={`flex ${incoming ? "justify-start" : "justify-end"}`}>
			<div className="max-w-[min(85%,28rem)]">
				<div
					className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
						incoming
							? "rounded-tl-md bg-slate-100 text-slate-900"
							: "rounded-tr-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
					}`}
				>
					{message.body}
				</div>
				<p
					className={`mt-1 text-xs text-slate-400 ${incoming ? "text-left" : "text-right"}`}
				>
					{formatTime(message.createdAt)}
				</p>
			</div>
		</div>
	);
}

export const MessagesBoard = () => {
	const {
		searchQuery,
		setSearchQuery,
		filteredConversations,
		activeConversationId,
		activeConversation,
		activeMessages,
		selectConversation,
		sendMessage,
		formatBubbleTime,
	} = useCustomerMessages();

	const [draft, setDraft] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}, [activeConversationId, activeMessages.length]);

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		sendMessage(draft);
		setDraft("");
	};

	return (
		<div className="flex min-h-[calc(100dvh-12rem)] flex-col">
			<h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
				Messages
			</h1>

			<div className="flex min-h-0 flex-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_80px_-48px_rgba(79,70,229,0.35)] ring-1 ring-slate-100">
				<aside className="flex w-full max-w-[340px] flex-col border-r border-slate-100 bg-slate-50/50">
					<div className="p-4">
						<div className="relative">
							<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
								<SearchIcon />
							</span>
							<input
								type="search"
								placeholder="Search conversations..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
							/>
						</div>
					</div>
					<div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
						{filteredConversations.map((c) => (
							<ConversationRow
								key={c.id}
								item={c}
								active={c.id === activeConversationId}
								onSelect={() => selectConversation(c.id)}
							/>
						))}
						{filteredConversations.length === 0 ? (
							<p className="px-3 py-8 text-center text-sm text-slate-500">
								No conversations match your search.
							</p>
						) : null}
					</div>
				</aside>

				<section className="flex min-w-0 flex-1 flex-col bg-white">
					{activeConversation ? (
						<>
							<header className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
								<AvatarBadge initials={activeConversation.initials} />
								<div className="min-w-0 flex-1">
									<p className="truncate font-semibold text-slate-900">
										{activeConversation.title}
									</p>
									<div className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
										<span
											className={`inline-block h-2 w-2 rounded-full ${
												activeConversation.isOnline
													? "bg-emerald-500"
													: "bg-slate-300"
											}`}
										/>
										<span>
											{activeConversation.isOnline ? "Online" : "Offline"}
										</span>
									</div>
								</div>
							</header>

							<div
								ref={scrollRef}
								className="min-h-[280px] flex-1 space-y-4 overflow-y-auto bg-slate-50/40 px-6 py-6"
							>
								{activeMessages.map((m) => (
									<ChatBubble
										key={m.id}
										message={m}
										formatTime={formatBubbleTime}
									/>
								))}
							</div>

							<form
								onSubmit={handleSend}
								className="border-t border-slate-100 p-4"
							>
								<div className="flex gap-2">
									<input
										type="text"
										value={draft}
										onChange={(e) => setDraft(e.target.value)}
										placeholder="Type a message…"
										className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
									/>
									<button
										type="submit"
										disabled={!draft.trim()}
										className="shrink-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
									>
										Send
									</button>
								</div>
							</form>
						</>
					) : (
						<div className="grid flex-1 place-items-center text-slate-500">
							Select a conversation
						</div>
					)}
				</section>
			</div>
		</div>
	);
};
