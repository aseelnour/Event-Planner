import { useQuery } from "@tanstack/react-query";
import { getThreads } from "@/api/threads.api";

export const useThreads = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await getThreads();
      const threads = Array.isArray(res.data) ? res.data : [];

      return threads.map((thread: any) => {
        const lastMessageText =
          thread?.lastMessage?.message ?? thread?.lastMessage ?? "";
        const lastMessageTimestamp =
          thread?.lastMessage?.timestamp ??
          thread?.lastMessageAt ??
          thread?.updatedAt;
        const lastMessageTime = lastMessageTimestamp
          ? new Date(lastMessageTimestamp).getTime()
          : 0;
        const isOnline = Date.now() - lastMessageTime < 5 * 60 * 1000;

        return {
          ...thread,
          lastMessage: lastMessageText,
          isOnline,
        };
      });
    },
    refetchInterval: 30000,
  });
};