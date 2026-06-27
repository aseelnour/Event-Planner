import { getOverview } from "@/api/overview.api";

export const fetchDashboardData = async () => {
  return await getOverview();
};
