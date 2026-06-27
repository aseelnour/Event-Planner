import { Input } from "@/components/input";
import { useRegister } from "@/hooks/use-register";
import { getValidationMessagesFromAxiosData } from "@/utils/validation-errors";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";

export const RegisterForm = () => {
	const { mutate, isPending, isError, error } = useRegister();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [localError, setLocalError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLocalError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirm = formData.get("confirmPassword") as string;
		const fullName = formData.get("fullName") as string;
		const phoneNumber = formData.get("phoneNumber") as string;

		if (password !== confirm) {
			setLocalError(t("auth.passwordMismatch"));
			return;
		}

		mutate(
			{ email, password, fullName, phoneNumber },
			{
				onSuccess: () => {
					navigate("/login", {
						replace: true,
						state: { registered: true },
					});
				},
			},
		);
	};

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

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-8 rounded-2xl shadow-md w-80 space-y-4 max-h-[90vh] overflow-y-auto"
		>
			<h2 className="text-2xl font-bold text-center text-gray-800">
				{t("auth.registerTitle")}
			</h2>

			<Input name="fullName" placeholder={t("auth.fullName")} required />
			<Input name="email" type="email" placeholder={t("auth.email")} required />
			<Input name="phoneNumber" placeholder={t("auth.phone")} required />
			<Input
				name="password"
				type="password"
				placeholder={t("auth.password")}
				required
			/>
			<Input
				name="confirmPassword"
				type="password"
				placeholder={t("auth.confirmPassword")}
				required
			/>

			{localError && (
				<p className="text-red-500 text-sm">{localError}</p>
			)}
			{isError && (
				<div className="text-red-500 text-sm rounded-lg bg-red-50 border border-red-100 px-3 py-2">
					{apiMessages && apiMessages.length > 0 ? (
						<ul className="list-disc list-inside space-y-1">
							{apiMessages.map((msg, i) => (
								<li key={`${i}-${msg}`}>{msg}</li>
							))}
						</ul>
					) : (
						<p>{t("auth.registerFailed")}</p>
					)}
				</div>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="w-full bg-blue-600 text-white py-2 rounded-xl disabled:opacity-50"
			>
				{isPending ? t("auth.loading") : t("auth.submitRegister")}
			</button>

			<p className="text-center text-sm text-gray-600">
				{t("auth.haveAccount")}{" "}
				<Link to="/login" className="text-indigo-600 font-medium hover:underline">
					{t("auth.login")}
				</Link>
			</p>
		</form>
	);
};
