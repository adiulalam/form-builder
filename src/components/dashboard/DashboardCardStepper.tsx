import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  cardsData: {
    heading: string;
    button: string;
  }[];
  setCardsData: Dispatch<
    SetStateAction<
      {
        heading: string;
        button: string;
      }[]
    >
  >;
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
      className="flex sm:hidden"
      variant="dots"
      steps={cardsData?.length}
      position="static"
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
