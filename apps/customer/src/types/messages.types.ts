export type ChatDirection = "in" | "out";

export type ChatMessage = {
	id: string;
	conversationId: string;
	body: string;
	direction: ChatDirection;
	createdAt: string;
};

export type ConversationSummary = {
	id: string;
	title: string;
	initials: string;
	lastPreview: string;
	lastAtLabel: string;
	unread: boolean;
	isOnline?: boolean;
};
