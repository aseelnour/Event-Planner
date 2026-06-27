import { useMutation } from '@tanstack/react-query';
import { register } from '../api/registar.api';

export const useRegister = () => {
	return useMutation({
		mutationFn: register,
	});
};