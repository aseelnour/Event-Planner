import { useLogin } from "@/hooks/use-login";
import { Input } from "@/components/input";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
	const { mutate, isPending, isError } = useLogin();
	const { t } = useTranslation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		mutate({
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-8 rounded-2xl shadow-md w-80 space-y-4"
		>
			<h2 className="text-2xl font-bold text-center">{t("login.title")}</h2>

			<Input name="email" placeholder={t("login.emailPlaceholder")} required />
			<Input name="password" type="password" placeholder={t("login.passwordPlaceholder")} required />

			{isError && <p className="text-red-500 text-sm">{t("login.invalidCredentials")}</p>}

			<button
				disabled={isPending}
				className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50"
			>
				{isPending ? t("login.loading") : t("login.submit")}
			</button>
		</form>
	);
};
