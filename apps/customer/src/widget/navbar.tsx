import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t, i18n } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-indigo-600">Eventat</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">{t("nav.features")}</a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">{t("nav.howItWorks")}</a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">{t("nav.pricing")}</a>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none text-gray-600"
            value={i18n.resolvedLanguage ?? "en"}
            onChange={(e) => void i18n.changeLanguage(e.target.value)}
          >
            <option value="en">{t("language.en")}</option>
            <option value="ar">{t("language.ar")}</option>
          </select>
          <a href="/login" className="text-sm text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            {t("nav.login")}
          </a>
          <a href="/login" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors font-medium">
            {t("nav.getStarted")}
          </a>
        </div>
      </div>
    </nav>
  );
};