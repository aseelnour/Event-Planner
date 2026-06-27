import { useAuthStore } from "@/store/auth.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};
