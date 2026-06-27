import { create } from "zustand";

type AuthState = {
  token: string | null;
  admin: any;
  isAuthenticated: boolean;

  setToken: (token: string) => void;
  setAdmin: (admin: any) => void;
  setAuth: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  admin: null,
  isAuthenticated: false,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setAdmin: (admin) => set({ admin }),

  setAuth: (value) => set({ isAuthenticated: value }),

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, admin: null, isAuthenticated: false });
  },
}));

//global state
//store token + admin data
