import { useTranslation } from "react-i18next";
import { Calendar, User, MapPin, Clock, ArrowRight } from "lucide-react";

const RecentActivity = ({ bookings }: any) => {
  const { t } = useTranslation();
  console.log(
    "First booking customerId:",
    JSON.stringify(bookings[0]?.customerId, null, 2),
  );
  const getRelativeTime = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const getClientName = (booking: any) => {
    if (!booking) return "Unknown client";
    if (booking.customerId && booking.customerId.fullName) {
      return booking.customerId.fullName;
    }
    if (booking.customerId && booking.customerId.name) {
      return booking.customerId.name;
    }
    if (typeof booking.customerId === "string") {
      return booking.customerId;
    }
    if (booking.customerName) {
      return booking.customerName;
    }

    console.log(
      "No customer name found for booking:",
      booking._id,
      booking.customerId,
    );
    return "Unknown client";
  };

  const getVenueName = (booking: any) => {
    if (booking.venueId?.title) {
      return booking.venueId.title;
    }
    if (booking.venueId?.name) {
      return booking.venueId.name;
    }
    if (typeof booking.venueId === "string") {
      return booking.venueId;
    }
    return "Unknown venue";
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="bg-gray-50 p-4 rounded-full">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t("overview.recentActivity")}
          </h3>
          <p className="text-gray-500 text-sm">{t("overview.noActivity")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {t("overview.recentActivity")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("overview.description")} ({bookings.length})
          </p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          {t("overview.viewAll")}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {bookings.slice(0, 5).map((booking: any, index: number) => (
          <div
            key={booking._id || index}
            className="p-5 hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {getClientName(booking)}
                    </h3>
                    <span className="text-gray-300 text-sm">•</span>
                    <span className="text-sm text-gray-500">booking for</span>
                    <span className="font-medium text-gray-700">
                      {getVenueName(booking)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {getRelativeTime(
                          booking.date || booking.createdAt || new Date(),
                        )}
                      </span>
                    </div>

                    {booking.time && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{booking.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length > 5 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            {t("overview.showMore")} ({bookings.length - 5} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
