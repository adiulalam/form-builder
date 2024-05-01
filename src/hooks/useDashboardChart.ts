import { api } from "@/utils/api";
import type { DashboardChartHookType } from "@/types/Dashboard.types";

export const useDashboardChart = ({ type, route }: DashboardChartHookType) => {
  if (type === "dashboardBarChart") {
    return api[type][route as "getDashboardBarChart"].useQuery();
  }

  if (type === "dashboardLineChart") {
    return api[type][route as "getDashboardLineChart"].useQuery();
  }

  if (type === "dashboardScatterChart") {
    return api[type][route as "getDashboardScatterChart"].useQuery();
  }

  if (type === "dashboardPieChart") {
    return api[type][route as "getDashboardPieChart"].useQuery();
  }

  throw Error("Dashbaord type didnt match");
};
