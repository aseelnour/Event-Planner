import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
            <span>⭐</span>
            <span>{t("hero.badge")}</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            {t("hero.title")}
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center gap-4">
            <a href="/login" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              {t("hero.startBooking")} →
            </a>
            <a href="#venue-owner" className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              {t("hero.listVenue")}
            </a>
          </div>

          <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
            <div>
              <p className="text-3xl font-bold text-gray-900">5,689</p>
              <p className="text-sm text-gray-500">{t("hero.stats.events")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">342</p>
              <p className="text-sm text-gray-500">{t("hero.stats.venues")}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500">{t("hero.stats.rating")}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="col-span-2 rounded-2xl overflow-hidden h-52">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop"
              alt="Event venue"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-44">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop"
              alt="Wedding venue"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-44">
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop"
              alt="Concert venue"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};