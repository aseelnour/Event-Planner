import { login } from "@/api/login.api";
import type { ClientSession } from "@/store/auth.store";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
	const setToken = useAuthStore((s) => s.setToken);
	const setClient = useAuthStore((s) => s.setClient);
	const setAuth = useAuthStore((s) => s.setAuth);

	return useMutation({
		mutationFn: login,
		onSuccess: (res: { data: { token: string; client: ClientSession } }) => {
			setToken(res.data.token);
			const c = res.data.client;
			setClient({
				...c,
				id: c.id ?? c._id,
			});
			setAuth(true);
		},
	});
};
