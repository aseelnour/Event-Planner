import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BookingChart = ({ data, bookingsChange }: any) => {
  const { t } = useTranslation();

  console.log("Monthly bookings data:", data);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("overview.BookingsOverview")}
        </h2>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-400">
            {t("overview.No booking data available")}
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
  console.log("Monthly bookings data details:", JSON.stringify(data, null, 2));

  const labels = data.map((item: any) => {
    if (item._id && typeof item._id === "object") {
      const month = item._id.month;
      const year = item._id.year;
      if (month && month >= 1 && month <= 12) {
        return year
          ? `${monthNames[month - 1]} ${year}`
          : monthNames[month - 1];
      }
    }
    return t("overview.Unknown");
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: t("overview.Bookings"),
        data: data.map((item: any) => item.count || 0),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 8,
        barPercentage: 0.65,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
            return `${t("overview.Bookings")}: ${context.parsed.y}`;
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
          stepSize: 1,
          callback: function (value: any) {
            return value;
          },
          font: {
            size: 11,
          },
          color: "#9ca3af",
        },
        title: {
          display: true,
          text: t("overview.Number of Bookings"),
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
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("overview.BookingsOverview")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("overview.Monthly booking statistics")}
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          {bookingsChange && (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {bookingsChange}
            </span>
          )}
        </div> */}
      </div>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BookingChart;
