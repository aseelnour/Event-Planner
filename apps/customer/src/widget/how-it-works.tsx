import { useTranslation } from "react-i18next";

export const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { num: "1", key: "step1" },
    { num: "2", key: "step2" },
    { num: "3", key: "step3" },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">{t("howItWorks.title")}</h2>
          <p className="text-gray-500 mt-3">{t("howItWorks.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.key} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t(`howItWorks.${step.key}.title` as any)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(`howItWorks.${step.key}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};