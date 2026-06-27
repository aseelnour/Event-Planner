import { login } from "@/api/login.api";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
	const setToken = useAuthStore((s) => s.setToken);
	const setAdmin = useAuthStore((s) => s.setAdmin);
	const setAuth = useAuthStore((s) => s.setAuth);

	return useMutation({
		mutationFn: login,
		onSuccess: (res: any) => {
			setToken(res.data.token);
			if (res.data.admin) {
				setAdmin(res.data.admin);
			}
			setAuth(true);
		},
	});
};
