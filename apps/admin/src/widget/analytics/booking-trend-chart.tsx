import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useTranslation } from "react-i18next";

const BookingTrendsChart = () => {
  const { t } = useTranslation();
  
  const data = [
    { name: t("pages.analytics.months.jan"), value: 400 },
    { name: t("pages.analytics.months.feb"), value: 500 },
    { name: t("pages.analytics.months.mar"), value: 470 },
    { name: t("pages.analytics.months.apr"), value: 620 },
    { name: t("pages.analytics.months.may"), value: 580 },
    { name: t("pages.analytics.months.jun"), value: 700 },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">{t("pages.analytics.charts.bookingTrends")}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingTrendsChart;