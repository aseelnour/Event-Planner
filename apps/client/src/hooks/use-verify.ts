import { verify } from "@/api/verify.api";
import type { ClientSession } from "@/store/auth.store";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useVerify = () => {
	const token = useAuthStore((s) => s.token);
	const setClient = useAuthStore((s) => s.setClient);
	const setAuth = useAuthStore((s) => s.setAuth);
	const logout = useAuthStore((s) => s.logout);

	const query = useQuery({
		queryKey: ["client-verify"],
		queryFn: async () => {
			const response = await verify();
			const raw = response.data?.client as ClientSession | undefined;
			if (raw) {
				setClient({
					...raw,
					id: raw.id ?? raw._id,
				});
				setAuth(true);
			}
			return response;
		},
		enabled: !!token,
		retry: false,
	});

	useEffect(() => {
		if (query.isError) {
			logout();
		}
	}, [query.isError, logout]);

	return query;
};
