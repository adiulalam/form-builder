import { api } from "@/utils/api";
import { DashboardCardContainer } from ".";

export const DashboardFormCards = () => {
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboard.getDashboardFormCard.useQuery();

  return (
    <DashboardCardContainer
      data={data?.data?.result}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      isRefetching={isRefetching}
    />
  );
};
