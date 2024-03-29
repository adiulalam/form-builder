import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DashboardCard, DashboardCardStepper } from ".";
import type { ReadDashboardFormCardSchema } from "@/server/schema/dashboard.schema";
import { DashboardSkeleton } from "../skeleton";
import type { DashboardSkeletonProps } from "@/types/Dashboard.types";
import type { Dispatch, SetStateAction } from "react";

type CardType = {
  cards: ReadDashboardFormCardSchema[] | undefined;
} & DashboardSkeletonProps;

export const DashboardCardContainer = ({
  cards,
  isLoading,
  isError,
  isRefetching,
  refetch,
}: CardType) => {
  const [cardsData, setCardsData] = useState(cards);

  useEffect(() => {
    setCardsData(cards);
  }, [cards]);

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
    <Box>
      <Box className="flex flex-row gap-1 overflow-x-hidden sm:overflow-x-auto">
        {cardsData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </Box>
      <DashboardCardStepper
        cardsData={cardsData}
        setCardsData={
          setCardsData as Dispatch<
            SetStateAction<ReadDashboardFormCardSchema[]>
          >
        }
      />
    </Box>
  );
};
