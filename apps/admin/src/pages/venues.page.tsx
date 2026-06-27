import { useVenues } from "@/hooks/use-venues";
import { useTranslation } from "react-i18next";

interface Venue {
  _id: string;
  clientId: string;
  title: string;
  description: string;
  location: string;
  price: string;
  images: string[];
  extras: string;
  availability: { date?: string | Date; from: string; to: string }[];
  discounts?: string;
  isDeleted: boolean;
}

const mockVenues: Venue[] = [
  {
    _id: "venue-mock-1",
    clientId: "client-102",
    title: "Riverside Events",
    description: "Waterfront venue with modern facilities.",
    location: "Brooklyn Waterfront, NY",
    price: "$3500",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f29c2c7bcd?q=80&w=1200&auto=format&fit=crop",
    ],
    extras: "AV, Catering",
    availability: [
      { date: new Date("2023-10-02"), from: "09:00", to: "22:00" },
    ],
    discounts: "10% weekday",
    isDeleted: false,
  },
  {
    _id: "venue-mock-2",
    clientId: "client-207",
    title: "Grand Ballroom",
    description: "Classic ballroom for weddings and events.",
    location: "Downtown, Chicago",
    price: "$5000",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    ],
    extras: "Stage, Lighting",
    availability: [
      { date: new Date("2023-10-03"), from: "10:00", to: "23:00" },
    ],
    discounts: "",
    isDeleted: false,
  },
];

const VenueCard = ({ venue }: { venue: Venue }) => {
  const { t, i18n } = useTranslation();
  const status = venue.isDeleted
    ? t("venuesPage.card.statusArchived")
    : t("venuesPage.card.statusActive");
  const imageUrl = venue.images?.[0];

  const slot = venue.availability?.[0];
  const formatDate = (value?: string | Date) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString(i18n.language, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const formattedDate = slot ? formatDate(slot.date) : null;
  const availabilityLabel =
    formattedDate && slot?.from && slot?.to
      ? `${formattedDate}: ${slot.from} - ${slot.to}`
      : t("common.notAvailable");

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:w-44">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={venue.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                {t("venuesPage.card.noImage")}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {venue.title}
              </h3>
              <p className="text-sm text-gray-500">
                {t("venuesPage.card.clientId", { id: venue.clientId })}
              </p>
              <p className="text-sm text-gray-500">{venue.location}</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold">
              {status}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400">
                {t("venuesPage.card.price")}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {venue.price || t("common.notAvailable")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400">
                {t("venuesPage.card.availability")}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {availabilityLabel}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400">
                {t("venuesPage.card.discounts")}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {venue.discounts || t("common.notAvailable")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400">
                {t("venuesPage.card.extras")}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {venue.extras || t("common.notAvailable")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {t("venuesPage.card.viewDetails")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const VenuesPage = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useVenues();
  const venues = (data ?? []) as Venue[];
  const list = venues.length ? venues : mockVenues;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">
          {t("venuesPage.title")}
        </h2>
        <p className="text-sm text-gray-500">{t("venuesPage.subtitle")}</p>
      </header>

      <div className="space-y-6">
        {isLoading && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">{t("venuesPage.loading")}</p>
          </div>
        )}

        {isError && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-red-500">{t("venuesPage.loadError")}</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          list.map((venue) => <VenueCard key={venue._id} venue={venue} />)}
      </div>
    </div>
  );
};
