import { useTranslation } from "react-i18next";

const features = [
  { key: "smartSearch", icon: "🔍", color: "bg-purple-100" },
  { key: "realTime", icon: "📅", color: "bg-green-100" },
  { key: "securePayments", icon: "🛡️", color: "bg-indigo-100" },
  { key: "directComm", icon: "💬", color: "bg-blue-100" },
  { key: "reviews", icon: "⭐", color: "bg-yellow-100" },
  { key: "premiumVenues", icon: "🏛️", color: "bg-pink-100" },
];

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">{t("features.title")}</h2>
          <p className="text-gray-500 mt-3">{t("features.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`features.${f.key}.title` as any)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(`features.${f.key}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};