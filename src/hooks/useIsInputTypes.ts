import { useContext } from "react";
import { QuestionContext } from "@/store";
import { includesInputType } from "@/utils/arrayFunction";

export const useIsInputType = () => {
  const { type } = useContext(QuestionContext);
  const isInputType = includesInputType(type!);

  return isInputType;
};
