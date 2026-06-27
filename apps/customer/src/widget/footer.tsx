import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Eventat</span>
            </div>
            <p className="text-gray-400 text-sm">{t("footer.tagline")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">{t("footer.product")}</h4>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.features")}</a>
              <a href="#pricing" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.pricing")}</a>
              <a href="#how-it-works" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.howItWorks")}</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">{t("footer.company")}</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.aboutUs")}</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.careers")}</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.contact")}</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">{t("footer.legal")}</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.privacyPolicy")}</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.termsOfService")}</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{t("footer.cookiePolicy")}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};