import { useTranslation } from "react-i18next";

export const LanguageSwitch = () => {
	const { t, i18n } = useTranslation();

	return (
		<label className="flex items-center gap-2 text-sm text-gray-500">
			<span>{t("language.label")}</span>
			<select
				className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-gray-800"
				value={i18n.resolvedLanguage ?? "en"}
				onChange={(e) => void i18n.changeLanguage(e.target.value)}
				aria-label={t("language.label")}
			>
				<option value="ar">{t("language.ar")}</option>
				<option value="en">{t("language.en")}</option>
				<option value="es">{t("language.es")}</option>
			</select>
		</label>
	);
};
