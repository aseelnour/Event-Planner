import { NavLayout } from "@/layout/nav.layout";
import { HeaderLayout } from "@/layout/header.layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const DashboardLayout = () => {
  const { t } = useTranslation();
  const [selectedLabel, setSelectedLabel] = useState(() =>
    t("layout.dashboard"),
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <NavLayout onSelect={setSelectedLabel} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <HeaderLayout selectedLabel={selectedLabel} />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
