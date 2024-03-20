import { api } from "@/utils/api";
import { DashboardCardContainer } from ".";

export const DashboardFormCards = () => {
  const { data, isError, isLoading } =
    api.dashboard.getDashboardFormCard.useQuery();

  if (isLoading) return <div>loading..</div>;

  if (!data || isError) return;

  return <DashboardCardContainer cards={data.data.result} />;
};
