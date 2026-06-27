import axios, { InternalAxiosRequestConfig } from "axios";
const baseURL =
	import.meta.env.VITE_API_URL?.trim() || "https://dev-event-planner-608310769455.europe-west1.run.app";


export const api = axios.create({
	baseURL:  baseURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("customerToken");

	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
