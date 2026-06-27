import { useDashboard } from "@/hooks/use-overview";
import StatsCards from "@/widget/stats-cards";
import BookingChart from "@/widget/booking-chart";
import RevenueChart from "@/widget/revenue-chart";
import RecentActivity from "@/widget/recent-activity";
import { Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const { data, loading } = useDashboard();

  const { t } = useTranslation();

  console.log("CARDS:", data?.cards);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-gray-500">
        {t("overview.noDashboardData")}
      </div>
    );
  }

  const { cards, monthlyBookings, revenueChart, recentBookings } = data;
  console.log("MonthlyBookings data:", monthlyBookings);
  console.log("revenueChart data:", revenueChart);

  return (
    <div className="p-4 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("overview.DashboardOverview")}
          </h1>
          <p className="text-gray-500 mt-1">
            {t(
              "overview.Welcome back! Here's what's happening with your venues and bookings.",
            )}
          </p>
        </div>
      </div>

      <StatsCards cards={cards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingChart
          data={monthlyBookings || []}
          bookingsChange={cards?.bookingsChange}
        />

        <RevenueChart
          data={revenueChart || []}
          revenueChange={cards?.revenueChange}
        />
      </div>

      <RecentActivity bookings={recentBookings || []} />
    </div>
  );
};
export default Overview;
