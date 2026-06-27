import {
	getManageMessages,
	getManageThreads,
	sendManageMessage,
	type SendManageMessagePayload,
} from "@/api/manage-messages.api";
import { useAuthStore } from "@/store/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const manageThreadsQueryKey = (clientId?: string) => [
	"manage-threads",
	clientId ?? "all",
];

export const manageMessagesQueryKey = (threadId?: string) => [
	"manage-messages",
	threadId ?? "none",
];

export const useManageThreads = () => {
	const client = useAuthStore((s) => s.client);
	const clientId = client?.id ?? client?._id;

	return useQuery({
		queryKey: manageThreadsQueryKey(clientId),
		queryFn: async () => {
			const response = await getManageThreads(clientId!);
			return response.data;
		},
		enabled: !!clientId,
		retry: false,
	});
};

export const useManageMessages = (threadId: string | null) => {
	return useQuery({
		queryKey: manageMessagesQueryKey(threadId ?? undefined),
		queryFn: async () => {
			const response = await getManageMessages(threadId!);
			return response.data;
		},
		enabled: !!threadId,
		retry: false,
	});
};

export const useSendManageMessage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: SendManageMessagePayload) => sendManageMessage(data),
		onSuccess: (_, variables) => {
			void queryClient.invalidateQueries({
				queryKey: manageMessagesQueryKey(variables.threadId),
			});
		},
	});
};
