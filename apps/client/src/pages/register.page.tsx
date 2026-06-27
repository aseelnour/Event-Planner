import { RegisterForm } from "@/widget/register-form";
import { LanguageSwitch } from "@/widget/language-switch";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
			<div className="absolute top-6 end-6">
				<LanguageSwitch />
			</div>
			<RegisterForm />
		</div>
	);
};
