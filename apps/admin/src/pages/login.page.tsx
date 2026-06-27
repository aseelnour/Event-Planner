import { LoginForm } from "@/widget/login-form";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};
