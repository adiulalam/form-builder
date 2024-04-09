import type { ReadDashboardCardSchema } from "@/server/schema/dashboard.schema";
import type { DashboardCardRoute } from "@/types/Dashboard.types";
import { api } from "@/utils/api";
import { useState } from "react";

type DashboardQueryType =
  typeof api.dashboardCard.getDashboardFormCard.useQuery;
type CardsDataType = ReadDashboardCardSchema[];

export const useDashboardCardQuery = (route: DashboardCardRoute) => {
  const [cardsData, setCardsData] = useState<CardsDataType>([]);

  // I don't like doing this, but should work
  const dashboardCardQuery = api.dashboardCard[route]
    .useQuery as DashboardQueryType;
  const result = dashboardCardQuery(void {}, {
    onSuccess: ({ data }) => setCardsData(data.result),
  });

  return { ...result, cardsData, setCardsData };
};
