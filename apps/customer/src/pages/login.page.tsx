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

	const dots = Array.from({ length: 16 });

	return (
		<div className="relative min-h-dvh overflow-hidden bg-[#f5f3ff]">
			<div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-indigo-200/60 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-fuchsia-200/60 blur-3xl" />
			<div className="pointer-events-none absolute right-12 top-20 hidden h-44 w-44 rounded-full border border-white/70 lg:block" />
			<div className="pointer-events-none absolute bottom-16 left-16 hidden grid-cols-4 gap-2 text-indigo-200/70 lg:grid">
				{dots.map((_, index) => (
					<span
						key={`dot-${index}`}
						className="h-1.5 w-1.5 rounded-full bg-current"
					/>
				))}
			</div>

			<div className="relative mx-auto flex min-h-dvh w-full items-center justify-center px-6 py-12">
				<LoginForm />
			</div>
		</div>
	);
};
