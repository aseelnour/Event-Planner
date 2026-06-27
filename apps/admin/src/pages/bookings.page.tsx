import { useBookings, useUpdateBookingStatus } from "@/hooks/use-bookings";
import type { Booking, BookingCustomer, BookingStatus } from "@/types/booking";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";

type StatusFilter = BookingStatus | "all";

const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "pending",
  "approved",
  "declined",
];

const statusBadgeClass = (status: BookingStatus): string => {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700";
    case "declined":
      return "bg-red-50 text-red-700";
    case "pending":
    default:
      return "bg-yellow-50 text-yellow-700";
  }
};

const BookingCard = ({ booking }: { booking: Booking }) => {
  console.log("Full booking object:", booking);
  console.log("ClientId object:", booking.clientId);
  console.log("VenueId object:", booking.venueId);

  const { t, i18n } = useTranslation<"translation">("translation");
  const updateStatus = useUpdateBookingStatus();

  const isPending = booking.status === "pending";
  const isMutating =
    updateStatus.isPending && updateStatus.variables?.id === booking._id;

  const formatDate = (value?: string) => {
    if (!value) return t("common.dash");
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return t("common.dash");
    return date.toLocaleDateString(i18n.language, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getClientName = () => {
    if (!booking.clientId) return t("common.dash");
    if (typeof booking.clientId === "string") return booking.clientId;
    return (
      booking.clientId?.fullName || booking.clientId?._id || t("common.dash")
    );
  };

  const getVenueName = () => {
    if (!booking.venueId) return t("common.dash");
    if (typeof booking.venueId === "string") return booking.venueId;
    return booking.venueId?.title || booking.venueId?._id || t("common.dash");
  };

  const getClientEmail = () => {
    if (!booking.clientId || typeof booking.clientId === "string")
      return undefined;
    return (booking.clientId as BookingCustomer).email;
  };

  const getClientPhone = () => {
    if (!booking.clientId || typeof booking.clientId === "string")
      return undefined;
    return (booking.clientId as BookingCustomer).phoneNumber;
  };

  const parsePrice = (price: string | number | undefined) => {
    if (price === undefined || price === null || price === "") return 0;
    if (typeof price === "number") return price;
    const parsed = parseFloat(String(price).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getTotalPrice = () => {
    const explicit = (booking as any).totalAmount;
    let amount = 0;
    if (explicit !== undefined && explicit !== null && explicit !== "") {
      amount = parsePrice(explicit);
    } else if (booking.venueId && typeof booking.venueId !== "string") {
      amount = parsePrice(booking.venueId.price);
    }

    if (!amount) return t("common.dash");

    return `$${amount.toLocaleString()}`;
  };

  const dateFormatted = formatDate(booking.date);

  const handleUpdate = (status: BookingStatus) => {
    updateStatus.mutate({ id: booking._id, status });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {getVenueName()}
          </h3>
          <p className="text-sm text-gray-400">
            {t("bookingsPage.card.requestReceived", { date: dateFormatted })}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(
            booking.status,
          )}`}
        >
          {booking.status === "approved"
            ? t("bookingsPage.status.approved")
            : booking.status === "declined"
              ? t("bookingsPage.status.declined")
              : t("bookingsPage.status.pending")}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {t("bookingsPage.card.clientInfo")}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {getClientName()}
          </p>
          {getClientEmail() ? (
            <>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Mail size={14} />
                {getClientEmail()}
              </p>
              {getClientPhone() ? (
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Phone size={14} />
                  {getClientPhone()}
                </p>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-gray-500">
              {t("bookingsPage.card.bookingId", { id: booking._id })}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {t("bookingsPage.card.eventDetails")}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                  />
                </svg>
                <span className="text-xs text-gray-400">
                  {t("bookingsPage.card.eventDate")}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {dateFormatted}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 22a10 10 0 100-20 10 10 0 000 20z"
                  />
                </svg>
                <span className="text-xs text-gray-400">
                  {t("bookingsPage.card.timePeriod")}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {booking.timePeriod?.length
                  ? `${booking.timePeriod[0].from} - ${booking.timePeriod[0].to}`
                  : t("common.dash")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-400">
            {t("bookingsPage.card.totalAmount", {
              defaultValue: "Total Amount",
            })}
          </p>
          <p className="text-lg font-semibold text-indigo-600">
            {getTotalPrice()}
          </p>
        </div>
      </div>

      {updateStatus.isError && updateStatus.variables?.id === booking._id && (
        <p className="mt-3 text-sm text-red-500">
          {t("bookingsPage.updateError")}
        </p>
      )}
    </div>
  );
};

export const BookingsPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<StatusFilter>("all");

  const { data, isLoading, isError } = useBookings();
  const all = (data ?? []) as Booking[];
  const bookings = all.filter((booking) =>
    filter === "all" ? true : booking.status === filter,
  );

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">
          {t("bookingsPage.title")}
        </h2>
        <p className="text-sm text-gray-500">{t("bookingsPage.subtitle")}</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((option) => {
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t(`bookingsPage.filters.${option}`)}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {isLoading && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">{t("bookingsPage.loading")}</p>
          </div>
        )}

        {isError && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-red-500">
              {t("bookingsPage.loadError")}
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm text-center">
            <p className="text-sm text-gray-500">{t("bookingsPage.empty")}</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
      </div>
    </div>
  );
};
