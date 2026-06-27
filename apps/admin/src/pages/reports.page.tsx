import React from "react";
import { useTranslation } from "react-i18next";
import { ReportStatsCard } from "@/widget/reports/report-stats-card";
import { ReportsList } from "@/widget/reports/reports-list";

export const ReportsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{t("pages.reportsPage.title")}</h1>
      <h6 className="text-gray-600">{t("pages.reportsPage.subtitle")}</h6>

      <div className="grid grid-cols-4 gap-4">
        <ReportStatsCard title={t("pages.reportsPage.pending")} value="12" icon="🕐" />
        <ReportStatsCard title={t("pages.reportsPage.reviewing")} value="5" icon="💬" />
        <ReportStatsCard title={t("pages.reportsPage.resolved")} value="142" icon="✅" />
        <ReportStatsCard title={t("pages.reportsPage.highPriority")} value="3" icon="🚩" />
      </div>

      <ReportsList />
    </div>
  );
};
