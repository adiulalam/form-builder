import { api } from "@/utils/api";
import { DashboardCardContainer } from ".";
import { DashboardSkeleton } from "../skeleton";

export const DashboardFormCards = () => {
  const { data, isError, isLoading, refetch, isRefetching } =
    api.dashboard.getDashboardFormCard.useQuery();

  if (isLoading || !data || isError) {
    return (
      <DashboardSkeleton
        className="h-[11rem] sm:h-[9rem]"
        isLoading={isLoading}
        isError={(!data || isError || true) && !isLoading}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );
  }

  return <DashboardCardContainer cards={data.data.result} />;
};
