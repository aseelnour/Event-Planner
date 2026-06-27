import { create } from "zustand";

type AuthState = {
	token: string | null;
	customer: any;
	isAuthenticated: boolean;

	setToken: (token: string) => void;
	setCustomer: (customer: any) => void;
	setAuth: (value: boolean) => void;
	logout: () => void;
};

const tokenKey = "customerToken";

export const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem(tokenKey),
	customer: null,
	isAuthenticated: false,

	setToken: (token) => {
		localStorage.setItem(tokenKey, token);
		set({ token });
	},

	setCustomer: (customer) => set({ customer }),

	setAuth: (value) => set({ isAuthenticated: value }),

	logout: () => {
		localStorage.removeItem(tokenKey);
		set({ token: null, customer: null, isAuthenticated: false });
	},
}));
