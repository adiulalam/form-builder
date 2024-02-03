import { useState } from "react";
import Box from "@mui/material/Box";
import { DashboardCard, DashboardCardStepper } from ".";

type CardType = {
  cards: {
    heading: string;
    button: string;
  }[];
};

export const DashboardCardContainer = ({ cards }: CardType) => {
  const [cardsData, setCardsData] = useState(cards);

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
