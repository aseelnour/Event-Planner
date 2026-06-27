import { registerClient } from "@/api/register.api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
	return useMutation({
		mutationFn: registerClient,
	});
};
