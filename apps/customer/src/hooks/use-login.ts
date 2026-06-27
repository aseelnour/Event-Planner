import { login } from "@/api/login.api";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
	const setToken = useAuthStore((s) => s.setToken);

	return useMutation({
		mutationFn: login,
		onSuccess: (res: any) => {
			setToken(res.data.token);
		},
	});
};
