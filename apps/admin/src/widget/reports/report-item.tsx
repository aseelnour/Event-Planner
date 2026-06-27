import React from "react";
import { useTranslation } from "react-i18next";

export const ReportItem = ({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
}: {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Reviewing": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "High": return t("report-item.high");
      case "Medium": return t("report-item.medium");
      case "Low": return t("report-item.low");
      default: return priority;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
              {getPriorityLabel(priority)} {t("report-item.priority")}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-500">{createdAt}</div>
      </div>
    </div>
  );
};
