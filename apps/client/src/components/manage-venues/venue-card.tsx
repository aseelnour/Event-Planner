import type { ManageVenue } from "@/api/manage-venues.api";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type VenueCardProps = {
  venue: ManageVenue;
  onEdit: (venue: ManageVenue) => void;
  onDelete: (venue: ManageVenue) => void;
  onBookingsClick: (venue: ManageVenue) => void;
  isDeleting?: boolean;
};

const EditIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16.862 4.487 19.5 7.125M18 14.25V19.5H4.5V6h5.25m1.125 9.375 7.987-7.988a1.875 1.875 0 0 0-2.65-2.65l-7.987 7.988-.75 3.4 3.4-.75Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M9.75 9.75v7.5m4.5-7.5v7.5M4.5 6.75h15m-9.75 0V4.5h4.5v2.25m3 0-.75 13.5H7.5L6.75 6.75"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4m11 0c0-1.8-1.2-3.3-2.9-3.8M8 15.2C6.3 15.7 5 17.2 5 19m9.5-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm3.5 2a2 2 0 1 0 0-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DollarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 3v18m4-14.5h-5.5a2.5 2.5 0 0 0 0 5H13a2.5 2.5 0 0 1 0 5H7.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const formatPrice = (price: string) => {
  const cleanPrice = price.trim();
  if (!cleanPrice) {
    return "-";
  }

  return cleanPrice.startsWith("$") ? cleanPrice : `$${cleanPrice}`;
};

export const VenueCard = ({
  venue,
  onEdit,
  onDelete,
  onBookingsClick,
  isDeleting,
}: VenueCardProps) => {
  const { t } = useTranslation();
  const image = venue.images?.[0];
  const status = venue.status ?? (venue.isDeleted ? "inactive" : "active");
  const capacity = venue.capacity ?? t("manageVenues.notAvailable");
  const bookingsCount = venue.bookingsCount ?? 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-60 bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={venue.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            {t("manageVenues.imageUnavailable")}
          </div>
        )}
        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-2 text-sm font-semibold ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-white/90 text-gray-900"
          }`}
        >
          {t(`manageVenues.status.${status}`)}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-950">{venue.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-gray-600">
          <LocationIcon />
          <span>{venue.location}</span>
        </p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 px-3 py-4 text-center">
            <div className="mx-auto flex justify-center text-gray-600">
              <UsersIcon />
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {t("manageVenues.fields.capacity")}
            </p>
            <p className="font-bold text-gray-950">{capacity}</p>
          </div>
          <div className="rounded-xl bg-gray-50 px-3 py-4 text-center">
            <div className="mx-auto flex justify-center text-gray-600">
              <DollarIcon />
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {t("manageVenues.fields.price")}
            </p>
            <p className="font-bold text-gray-950">
              {formatPrice(venue.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onBookingsClick(venue)}
            className="rounded-xl bg-gray-50 px-3 py-4 text-center transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            <p className="text-sm text-gray-600">
              {t("manageVenues.bookings")}
            </p>
            <p className="mt-2 text-2xl font-bold text-indigo-600">
              {bookingsCount}
            </p>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_62px] gap-3">
          <Button
            onClick={() => onEdit(venue)}
            icon={<EditIcon />}
            className="h-12 text-base"
          >
            {t("manageVenues.edit")}
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(venue)}
            disabled={isDeleting}
            aria-label={t("manageVenues.deleteVenue", { title: venue.title })}
            className="h-12 px-0"
            icon={<TrashIcon />}
          />
        </div>
      </div>
    </article>
  );
};
