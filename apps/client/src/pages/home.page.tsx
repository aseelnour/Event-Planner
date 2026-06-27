import { useAuthStore } from "@/store/auth.store";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
	const client = useAuthStore((s) => s.client);
	const { t } = useTranslation();

	const name =
		client?.fullName?.trim() ||
		client?.email ||
		t("home.fallbackName");

	return (
		<div className="max-w-2xl">
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
				<h2 className="text-xl font-semibold text-gray-800">
					{t("home.welcome", { name })}
				</h2>
				<p className="mt-3 text-gray-600">{t("home.description")}</p>
			</div>
		</div>
	);
};
