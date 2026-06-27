import { useTranslation } from "react-i18next";

export const Pricing = () => {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">{t("pricing.title")}</h2>
          <p className="text-gray-500 mt-3">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("pricing.basic.title")}</h3>
            <p className="text-4xl font-bold text-gray-900 mb-1">{t("pricing.basic.price")}</p>
            <p className="text-gray-400 text-sm mb-6">{t("pricing.basic.period")}</p>
            <ul className="space-y-3 mb-8">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  {t(`pricing.basic.features.${i}` as any)}
                </li>
              ))}
            </ul>
            <a href="/login" className="block text-center border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
              {t("pricing.getStarted")}
            </a>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-8 shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
              {t("pricing.popular")}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t("pricing.pro.title")}</h3>
            <p className="text-4xl font-bold text-white mb-1">{t("pricing.pro.price")}</p>
            <p className="text-indigo-200 text-sm mb-6">{t("pricing.pro.period")}</p>
            <ul className="space-y-3 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white">
                  <span className="text-indigo-200">✓</span>
                  {t(`pricing.pro.features.${i}` as any)}
                </li>
              ))}
            </ul>
            <a href="/login" className="block text-center bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
              {t("pricing.getStarted")}
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("pricing.enterprise.title")}</h3>
            <p className="text-4xl font-bold text-gray-900 mb-1">{t("pricing.enterprise.price")}</p>
            <p className="text-gray-400 text-sm mb-6">{t("pricing.enterprise.period")}</p>
            <ul className="space-y-3 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  {t(`pricing.enterprise.features.${i}` as any)}
                </li>
              ))}
            </ul>
            <a href="/login" className="block text-center border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
              {t("pricing.contactUs")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};