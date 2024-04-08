import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DashboardCard, DashboardCardStepper } from ".";
import type { ReadDashboardCardSchema } from "@/server/schema/dashboard.schema";
import { DashboardSkeleton } from "../skeleton";
import type { DashboardSkeletonProps } from "@/types/Dashboard.types";
import type { Dispatch, SetStateAction } from "react";

type CardType = {
  data: ReadDashboardCardSchema[] | undefined;
} & DashboardSkeletonProps;

export const DashboardCardContainer = ({
  data,
  isLoading,
  isError,
  isRefetching,
  refetch,
}: CardType) => {
  const [cardsData, setCardsData] = useState(data);

  useEffect(() => {
    setCardsData(data);
  }, [data]);

  if (isLoading || !cardsData || isError) {
    return (
      <DashboardSkeleton
        className="h-[11rem] sm:h-[9rem]"
        isLoading={isLoading}
        isError={!cardsData || isError}
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
      <DashboardCardStepper
        cardsData={cardsData}
        setCardsData={
          setCardsData as Dispatch<SetStateAction<ReadDashboardCardSchema[]>>
        }
      />
    </Box>
  );
};
