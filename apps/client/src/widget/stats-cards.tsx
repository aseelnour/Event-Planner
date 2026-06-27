import { useTranslation } from "react-i18next";
import { Building2, CalendarCheck, DollarSign, Users } from "lucide-react";

interface StatsCard {
  totalVenues: number;
  activeBookings: number;
  monthlyRevenue: number;
  totalClients: number;
  venuesChange?: string;
  bookingsChange?: string;
  revenueChange?: string;
  clientsChange?: string;
}

interface Props {
  cards: StatsCard;
}

const StatsCards = ({ cards }: Props) => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("overview.totalVenues"),
      value: cards.totalVenues,
      change: cards.venuesChange ?? "",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-500",
    },
    {
      title: t("overview.activeBookings"),
      value: cards.activeBookings,
      change: cards.bookingsChange ?? "",
      icon: CalendarCheck,
      color: "from-green-500 to-green-600",
      lightBg: "bg-green-500",
    },
    {
      title: t("overview.revenue"),
      value: `$${cards.monthlyRevenue?.toLocaleString() || 0}`,
      change: cards.revenueChange ?? "",
      icon: DollarSign,
      color: "from-indigo-500 to-indigo-600",
      lightBg: "bg-indigo-500",
    },
    {
      title: t("overview.totalClients"),
      value: cards.totalClients,
      change: cards.clientsChange ?? "",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* خلفية متدرجة خفيفة عند التمرير */}
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

            <div className="p-6">
              {/* الصف العلوي: الأيقونة */}
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.lightBg} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* القيمة */}
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>

              {/* العنوان */}
              <p className="text-sm text-gray-500 mb-3">{stat.title}</p>

              {/* نسبة التغيير */}
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>

            {/* شريط سفلي بلون المتدرج */}
            <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`} />
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
