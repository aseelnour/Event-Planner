import type { ChatMessage, ConversationSummary } from "@/types/messages.types";

export const MOCK_CONVERSATIONS: ConversationSummary[] = [
	{
		id: "c1",
		title: "Grand Ballroom",
		initials: "GB",
		lastPreview: "Thanks! We're excited to host your event.",
		lastAtLabel: "2m ago",
		unread: true,
		isOnline: true,
	},
	{
		id: "c2",
		title: "Riverside Garden",
		initials: "RE",
		lastPreview: "Could we schedule a tour for next week?",
		lastAtLabel: "1h ago",
		unread: true,
		isOnline: false,
	},
	{
		id: "c3",
		title: "Sunset Terrace",
		initials: "ST",
		lastPreview: "Your deposit has been received. Thank you!",
		lastAtLabel: "Yesterday",
		unread: false,
		isOnline: false,
	},
	{
		id: "c4",
		title: "Crystal Hall Events",
		initials: "CH",
		lastPreview: "Let me know if you need any adjustments.",
		lastAtLabel: "3d ago",
		unread: false,
		isOnline: true,
	},
];

const now = new Date();

function at(hours: number, minutes: number) {
	const d = new Date(now);
	d.setHours(hours, minutes, 0, 0);
	return d.toISOString();
}

export const MOCK_MESSAGES_BY_CONVERSATION: Record<string, ChatMessage[]> = {
	c1: [
		{
			id: "m1",
			conversationId: "c1",
			body: "Hi! Thanks for reaching out about your wedding reception. We'd love to help make your day special.",
			direction: "in",
			createdAt: at(10, 30),
		},
		{
			id: "m2",
			conversationId: "c1",
			body: "That sounds perfect! What dates do you have available in June?",
			direction: "out",
			createdAt: at(10, 32),
		},
		{
			id: "m3",
			conversationId: "c1",
			body: "We have the 14th and 21st open. I can send a detailed quote for both.",
			direction: "in",
			createdAt: at(10, 35),
		},
	],
	c2: [
		{
			id: "m4",
			conversationId: "c2",
			body: "Hello! We'd love to show you the garden venue.",
			direction: "in",
			createdAt: at(9, 0),
		},
		{
			id: "m5",
			conversationId: "c2",
			body: "Could we schedule a tour for next week?",
			direction: "out",
			createdAt: at(9, 15),
		},
	],
	c3: [
		{
			id: "m6",
			conversationId: "c3",
			body: "Your deposit has been received. Thank you!",
			direction: "in",
			createdAt: at(8, 0),
		},
	],
	c4: [
		{
			id: "m7",
			conversationId: "c4",
			body: "The layout looks great from our side.",
			direction: "out",
			createdAt: at(14, 20),
		},
		{
			id: "m8",
			conversationId: "c4",
			body: "Let me know if you need any adjustments.",
			direction: "in",
			createdAt: at(14, 45),
		},
	],
};
