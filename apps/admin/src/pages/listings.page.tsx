import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useVenues } from "@/hooks/use-venues";

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
    <article className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
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
      </div>
    </article>
  );
};

export const ListingsPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("clientId") ?? searchParams.get("personId");
  const { data, isLoading, isError } = useVenues();

  const venues = useMemo(() => {
    const items = (data ?? []) as Venue[];
    if (!clientId) return items;
    return items.filter((venue) => venue.clientId === clientId);
  }, [clientId, data]);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">
          {t("listingsPage.title")}
        </h2>
        <p className="text-sm text-gray-500">
          {clientId
            ? t("listingsPage.subtitle", { clientId })
            : t("listingsPage.subtitle")}
        </p>
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

        {!isLoading && !isError && venues.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-sm text-gray-500">
            {clientId
              ? t("listingsPage.emptyForClient", { clientId })
              : t("venuesPage.empty")}
          </div>
        )}

        {!isLoading &&
          !isError &&
          venues.map((venue) => <VenueCard key={venue._id} venue={venue} />)}
      </div>
    </div>
  );
};
