import { useTranslation } from "react-i18next";

export const VenueOwner = () => {
  const { t } = useTranslation();

  return (
    <section id="venue-owner" className="py-20 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-white">
          <h2 className="text-4xl font-bold">{t("venueOwner.title")}</h2>
          <p className="text-indigo-200 leading-relaxed">{t("venueOwner.subtitle")}</p>

          <div className="space-y-4">
            {["visibility", "bookings", "analytics"].map((key) => (
              <div key={key} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{t(`venueOwner.${key}.title` as any)}</p>
                  <p className="text-indigo-200 text-sm">{t(`venueOwner.${key}.description` as any)}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="/login" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors">
            {t("venueOwner.listVenue")} →
          </a>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          {[
            { value: "+45%", label: t("venueOwner.stats.bookingIncrease"), icon: "📈" },
            { value: "1,200+", label: t("venueOwner.stats.activePlanners"), icon: "👥" },
            { value: "342", label: t("venueOwner.stats.venuesOnPlatform"), icon: "🏛️" },
            { value: "4.9", label: t("venueOwner.stats.ownerSatisfaction"), icon: "⭐" },
          ].map((stat) => (
            <div key={stat.label} className="bg-indigo-500 rounded-2xl p-6">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-indigo-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};