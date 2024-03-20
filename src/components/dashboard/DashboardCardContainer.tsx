import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DashboardCard, DashboardCardStepper } from ".";
import type { ReadDashboardFormCardSchema } from "@/server/schema/dashboard.schema";

type CardType = {
  cards: ReadDashboardFormCardSchema[];
};

export const DashboardCardContainer = ({ cards }: CardType) => {
  const [cardsData, setCardsData] = useState(cards);

  useEffect(() => {
    setCardsData(cards);
  }, [cards]);

  return (
    <Box>
      <Box className="flex flex-row gap-1 overflow-x-hidden sm:overflow-x-auto">
        {cardsData.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </Box>
      <DashboardCardStepper cardsData={cardsData} setCardsData={setCardsData} />
    </Box>
  );
};
