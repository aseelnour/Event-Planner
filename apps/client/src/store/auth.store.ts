import { create } from "zustand";

export type ClientSession = {
	id?: string;
	_id?: string;
	email: string;
	fullName?: string;
	phoneNumber?: string;
	status?: string;
	actorType?: string;
};

type AuthState = {
	token: string | null;
	client: ClientSession | null;
	isAuthenticated: boolean;

	setToken: (token: string) => void;
	setClient: (client: ClientSession | null) => void;
	setAuth: (value: boolean) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem("token"),
	client: null,
	isAuthenticated: false,

	setToken: (token) => {
		localStorage.setItem("token", token);
		set({ token });
	},

	setClient: (client) => set({ client }),

	setAuth: (value) => set({ isAuthenticated: value }),

	logout: () => {
		localStorage.removeItem("token");
		set({ token: null, client: null, isAuthenticated: false });
	},
}));
