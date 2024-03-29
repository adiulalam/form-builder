import { api } from "@/utils/api";
import { DashboardCardContainer } from ".";

export const DashboardFormCards = () => {
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboard.getDashboardFormCard.useQuery();

  return (
    <DashboardCardContainer
      cards={data?.data?.result}
      isLoading={isLoading}
      isError={(!data || isError) && !isLoading}
      refetch={refetch}
      isRefetching={isRefetching}
    />
  );
};
