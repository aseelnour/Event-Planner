import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useTranslation } from "react-i18next";

const UserRegistrationChart = () => {
  const { t } = useTranslation();
  
  const data = [
    { name: t("pages.analytics.weeks.week1"), users: 40, venues: 18 },
    { name: t("pages.analytics.weeks.week2"), users: 58, venues: 22 },
    { name: t("pages.analytics.weeks.week3"), users: 46, venues: 15 },
    { name: t("pages.analytics.weeks.week4"), users: 66, venues: 28 },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">{t("pages.analytics.charts.userRegistration")}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" />
          <Line type="monotone" dataKey="venues" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { UserRegistrationChart };