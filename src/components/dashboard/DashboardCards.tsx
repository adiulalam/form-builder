import { Box } from "@mui/material";
import { DashboardCard, DashboardCardStepper } from ".";
import { DashboardSkeleton } from "../skeleton";
import type { DashboardCardRoute } from "@/types/Dashboard.types";
import { useDashboardCardQuery } from "@/hooks";

export const DashboardCards = ({ route }: { route: DashboardCardRoute }) => {
  const { cardsData, setCardsData, isError, isLoading, refetch, isRefetching } =
    useDashboardCardQuery(route);

  if (isLoading || isError) {
    return (
      <DashboardSkeleton
        className="h-[11rem] sm:h-[9rem]"
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );
  }

  return (
    <Box className="flex w-full flex-col" maxWidth={"xl"}>
      <Box className="flex flex-row gap-1 overflow-x-hidden sm:overflow-x-auto">
        {cardsData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </Box>
      <DashboardCardStepper cardsData={cardsData} setCardsData={setCardsData} />
    </Box>
  );
};
