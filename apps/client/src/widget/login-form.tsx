import { Input } from "@/components/input";
import { useLogin } from "@/hooks/use-login";
import { getValidationMessagesFromAxiosData } from "@/utils/validation-errors";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const LoginForm = () => {
	const { mutate, isPending, isError, error } = useLogin();
	const { t } = useTranslation();

	const apiMessages = useMemo(() => {
		if (!isError || !error || !axios.isAxiosError(error)) {
			return null;
		}
		const data = error.response?.data;
		const fromDetails = getValidationMessagesFromAxiosData(data);
		if (fromDetails && fromDetails.length > 0) {
			return fromDetails;
		}
		if (data && typeof data === "object" && "error" in data) {
			const err = (data as { error?: unknown }).error;
			if (typeof err === "string" && err.trim()) {
				return [err];
			}
		}
		return null;
	}, [isError, error]);

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
			<h2 className="text-2xl font-bold text-center text-gray-800">
				{t("auth.loginTitle")}
			</h2>

			<Input name="email" type="email" placeholder={t("auth.email")} required />
			<Input
				name="password"
				type="password"
				placeholder={t("auth.password")}
				required
			/>

			{isError && (
				<div className="text-red-500 text-sm rounded-lg bg-red-50 border border-red-100 px-3 py-2">
					{apiMessages && apiMessages.length > 0 ? (
						<ul className="list-disc list-inside space-y-1">
							{apiMessages.map((msg, i) => (
								<li key={`${i}-${msg}`}>{msg}</li>
							))}
						</ul>
					) : (
						<p>{t("auth.invalidLogin")}</p>
					)}
				</div>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50"
			>
				{isPending ? t("auth.loading") : t("auth.login")}
			</button>

			<p className="text-center text-sm text-gray-600">
				{t("auth.noAccount")}{" "}
				<Link to="/register" className="text-indigo-600 font-medium hover:underline">
					{t("auth.register")}
				</Link>
			</p>
		</form>
	);
};
