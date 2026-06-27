import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useTranslation } from "react-i18next";

const RevenueGrowthChart = () => {
  const { t } = useTranslation();
  
  const data = [
    { name: t("pages.analytics.months.jan"), value: 45000 },
    { name: t("pages.analytics.months.feb"), value: 52000 },
    { name: t("pages.analytics.months.mar"), value: 48000 },
    { name: t("pages.analytics.months.apr"), value: 67000 },
    { name: t("pages.analytics.months.may"), value: 61000 },
    { name: t("pages.analytics.months.jun"), value: 78000 },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">{t("pages.analytics.charts.revenueGrowth")}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { RevenueGrowthChart };