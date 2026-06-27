import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NavLayout = ({
  onSelect,
}: {
  onSelect: (label: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <aside className="flex flex-col w-64 h-full bg-white px-4 py-6 border-r border-gray-100">
      <div className="mb-6 px-2">
        <h1 className="text-2xl font-bold text-indigo-600">Eventat</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {t("layout.portalSubtitle")}
        </p>
      </div>

      <hr className="border-gray-200 mb-6" />

      <nav className="flex flex-col gap-1">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          onClick={() => onSelect(t("layout.dashboard"))}
        >
          {({ isActive }) => (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={isActive ? "text-indigo-600" : "text-gray-500"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13h4v8H3v-8zm6-5h4v13H9V8zm6-4h4v17h-4V4z"
                  />
                </svg>
              </span>
              {t("layout.dashboard")}
            </div>
          )}
        </NavLink>

        {/* Venues */}
        <NavLink
          to="/dashboard/venues"
          onClick={() => onSelect(t("manageVenues.title"))}
        >
          {({ isActive }) => (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={isActive ? "text-indigo-600" : "text-gray-500"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 21V8.25L12 3l7.5 5.25V21M9 21v-6h6v6M8.25 10.5h.008v.008H8.25V10.5Zm7.5 0h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </span>
              {t("manageVenues.title")}
            </div>
          )}
        </NavLink>

        {/* Bookings */}
        <NavLink
          to="/dashboard/bookings"
          onClick={() => onSelect(t("bookings.title"))}
        >
          {({ isActive }) => (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={isActive ? "text-indigo-600" : "text-gray-500"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M4.5 9.5h15M6 5.5h12A1.5 1.5 0 0 1 19.5 7v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Z"
                  />
                </svg>
              </span>
              {t("bookings.title")}
            </div>
          )}
        </NavLink>

        {/* زر الرسائل الجديد المضاف (Messages) */}
        <NavLink
          to="/dashboard/messages"
          onClick={() => onSelect(t("manageMessages.title") ?? "Messages")}
        >
          {({ isActive }) => (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className={isActive ? "text-indigo-600" : "text-gray-500"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v5.118Z"
                  />
                </svg>
              </span>
              {t("manageMessages.title") ?? "Messages"}
            </div>
          )}
        </NavLink>
      </nav>
    </aside>
  );
};
