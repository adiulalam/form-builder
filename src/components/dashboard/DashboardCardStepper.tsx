import { Button, MobileStepper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReadDashboardFormCardSchema } from "@/server/schema/dashboard.schema";

type Props = {
  cardsData: ReadDashboardFormCardSchema[];
  setCardsData: Dispatch<SetStateAction<ReadDashboardFormCardSchema[]>>;
};

export const DashboardCardStepper = ({ cardsData, setCardsData }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const length = cardsData?.length;
    const firstElement = cardsData.shift();
    setCardsData((prev) => (firstElement ? [...prev, firstElement] : prev));

    setActiveStep((prev) => (prev + 1) % length);
  };

  const handleBack = () => {
    const length = cardsData?.length;
    const lastElement = cardsData.pop();
    const newArray = lastElement ? [lastElement, ...cardsData] : cardsData;
    setCardsData(newArray);

    setActiveStep((prev) => (prev - 1 + length) % length);
  };

  return (
    <MobileStepper
      className="flex sm:hidden static"
      variant="dots"
      steps={cardsData?.length}
      activeStep={activeStep}
      nextButton={
        <Button size="small" onClick={handleNext}>
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  );
};
