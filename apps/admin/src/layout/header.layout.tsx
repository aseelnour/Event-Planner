import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";

export const HeaderLayout = ({ selectedNavKey }: { selectedNavKey: string }) => {
	const { t, i18n } = useTranslation();
	const logout = useAuthStore((s) => s.logout);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const pageTitle = t(`nav.items.${selectedNavKey}` as "nav.items.analytics");

	return (
		<header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
			<h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>

			<div className="flex items-center gap-4">
				<label className="flex items-center gap-2 text-sm text-gray-500">
					<span>{t("language.label")}</span>
					<select
						className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-gray-800"
						value={i18n.resolvedLanguage ?? "en"}
						onChange={(e) => void i18n.changeLanguage(e.target.value)}
						aria-label={t("language.label")}
					>
						<option value="en">{t("language.en")}</option>
						<option value="ar">{t("language.ar")}</option>
					</select>
				</label>

				<div className="relative">
					<button
						type="button"
						onClick={() => setIsOpen((prev) => !prev)}
						className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
						</svg>
					</button>

					{isOpen && (
						<div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-3 z-50">
							<div className="px-4 pb-3 border-b border-gray-100">
								<p className="font-semibold text-gray-800">{t("header.adminDisplayName")}</p>
								<p className="text-sm text-gray-400 mt-0.5">{t("header.adminEmail")}</p>
							</div>

							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center gap-2 w-full px-4 py-2.5 mt-1 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />
								</svg>
								{t("header.logout")}
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
