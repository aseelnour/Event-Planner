import { useAuthStore } from "@/store/auth.store";
import { LanguageSwitch } from "@/widget/language-switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HeaderLayout = ({ selectedLabel }: { selectedLabel: string }) => {
  const logout = useAuthStore((s) => s.logout);
  const client = useAuthStore((s) => s.client);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const email = client?.email ?? "";

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">{selectedLabel}</h1>

      <div className="flex items-center gap-4">
        <LanguageSwitch />

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-3 z-50">
              <div className="px-4 pb-3 border-b border-gray-100">
                <p className="font-semibold text-gray-800">
                  {t("layout.account")}
                </p>
                <p className="text-sm text-gray-400 mt-0.5 break-all">
                  {email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 mt-1 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                {t("auth.logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
