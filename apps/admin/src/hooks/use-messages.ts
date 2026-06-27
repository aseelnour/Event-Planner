import { useQuery } from "@tanstack/react-query";
import { getMessagesByThreadId } from "@/api/messages.api";

export const useMessages = (threadId: string | null) => {
  return useQuery({
    queryKey: ["messages", threadId],
    queryFn: async () => {
      const res = await getMessagesByThreadId(threadId!);
      return res.data;
    },
    enabled: !!threadId,
  });
};