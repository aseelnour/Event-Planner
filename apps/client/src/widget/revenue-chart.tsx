import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const RevenueChart = ({ data, revenueChange }: any) => {
  const { t } = useTranslation();

  console.log("RevenueChart data:", data); // للتأكد من البيانات

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("overview.Revenue Trend")}
        </h2>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-400">
            {t("overview.No revenue data available")}
          </p>
        </div>
      </div>
    );
  }

  const monthNames = [
    t("overview.Jan"),
    t("overview.Feb"),
    t("overview.Mar"),
    t("overview.Apr"),
    t("overview.May"),
    t("overview.Jun"),
    t("overview.Jul"),
    t("overview.Aug"),
    t("overview.Sep"),
    t("overview.Oct"),
    t("overview.Nov"),
    t("overview.Dec"),
  ];

  // معالجة labels بشكل صحيح
  const labels = data.map((item: any) => {
    // إذا كان _id object فيه month و year
    if (item._id && typeof item._id === "object") {
      const month = item._id.month;
      const year = item._id.year;
      if (month && month >= 1 && month <= 12) {
        return year
          ? `${monthNames[month - 1]} ${year}`
          : monthNames[month - 1];
      }
    }
    // إذا كان _id رقم
    if (typeof item._id === "number" && item._id >= 1 && item._id <= 12) {
      return monthNames[item._id - 1];
    }
    return t("overview.Unknown");
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: t("overview.Revenue"),
        data: data.map((item: any) => item.totalRevenue || item.revenue || 0),
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(139, 92, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 12,
            weight: "normal" as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1f2937",
        bodyColor: "#6b7280",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `Revenue: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          callback: function (value: any) {
            return `$${value.toLocaleString()}`;
          },
          font: {
            size: 11,
          },
          color: "#9ca3af",
        },
        title: {
          display: true,
          text: "Revenue ($)",
          color: "#6b7280",
          font: {
            size: 12,
            weight: "normal" as const,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: "normal" as const,
          },
          color: "#6b7280",
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("overview.Revenue Trend")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("overview.Monthly revenue performance")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {revenueChange && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {revenueChange}
            </span>
          )}
        </div>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
