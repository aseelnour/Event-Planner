// C:\Users\Osaid\GFA\event-planner\apps\aseel\myreact-native\src\api\client.ts
import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ تأكد من أن الـ base URL صحيح
// للويب: localhost
// للجهاز الفعلي: استخدم IP الخاص بالجهاز (مثلاً 192.168.1.100)
const API_BASE_URL = "http://localhost:3000/api/customer-system/customer";

console.log(`🌐 API Base URL: ${API_BASE_URL}`);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor لإضافة التوكن
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem("customerToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`🔑 ${config.method?.toUpperCase()} ${config.url}`);
      } else {
        console.warn(
          `⚠️ ${config.method?.toUpperCase()} ${config.url} - No token`,
        );
      }
    } catch (error) {
      console.error("❌ Error getting token:", error);
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

// Interceptor للردود
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`,
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `❌ API Error: ${error.response.status}`,
        error.response.data || error.message,
      );
    } else {
      console.error(`❌ Network Error:`, error.message);
    }
    return Promise.reject(error);
  },
);
