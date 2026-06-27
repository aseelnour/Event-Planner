import { LoginForm } from "@/widget/login-form";
import { LanguageSwitch } from "@/widget/language-switch";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();

	const registered =
		(location.state as { registered?: boolean } | null)?.registered ===
		true;

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

			<div className="flex flex-col items-center gap-6">
				{registered && (
					<div className="w-80 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-800 text-center">
						{t("auth.registerSuccess")}
					</div>
				)}
				<LoginForm />
			</div>
		</div>
	);
};
