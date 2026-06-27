import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../api/auth.api";

type Customer = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  city?: string;
};

export type AuthContextType = {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل التوكن عند بدء التطبيق
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("customerToken");
        if (storedToken) {
          setToken(storedToken);
          await verifyToken();
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await authApi.verify();
      setCustomer(response.data.customer);
      setIsAuthenticated(true);
    } catch (error) {
      await logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("🔐 Attempting login for:", email);
      const response = await authApi.login({ email, password });
      const { token, customer } = response.data;

      console.log("✅ Login successful. Customer:", customer);

      // ✅ تخزين التوكن
      await AsyncStorage.setItem("customerToken", token);

      // ✅ تخزين بيانات المستخدم الكاملة (بما فيها phoneNumber و city)
      await AsyncStorage.setItem("customerData", JSON.stringify(customer));

      setToken(token);
      setCustomer(customer);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("❌ Login error:", error);
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    try {
      await authApi.register({ fullName, email, password });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("customerToken");
    setToken(null);
    setCustomer(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
