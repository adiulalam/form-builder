import type { ReadDashboardCardSchema } from "@/server/schema/dashboard.schema";
import type { DashboardRoute } from "@/types/Dashboard.types";
import { api } from "@/utils/api";
import { useState } from "react";

type DashboardQueryType = typeof api.dashboard.getDashboardFormCard.useQuery;
type CardsDataType = ReadDashboardCardSchema[];

export const useDashboardCardQuery = (route: DashboardRoute) => {
  const [cardsData, setCardsData] = useState<CardsDataType>([]);

  // I don't like doing this, but should work
  const dashboardCardQuery = api.dashboard[route]
    .useQuery as DashboardQueryType;
  const { isError, isLoading, refetch, isRefetching } = dashboardCardQuery(
    void {},
    {
      onSuccess: ({ data }) => setCardsData(data.result),
    }
  );

  return { isError, isLoading, refetch, isRefetching, cardsData, setCardsData };
};
