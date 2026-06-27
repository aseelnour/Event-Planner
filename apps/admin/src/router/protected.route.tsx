import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// إذا user مش logged in : روح login
// إذا logged in : اسمح له يدخل
