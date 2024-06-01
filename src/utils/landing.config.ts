import type {
  FormProviderType,
  PlaygroundProviderType,
} from "@/types/Provider.types";
import type { Dispatch } from "react";
import type { PlaygroundAction } from "@/hooks/usePlaygroundReducer";

export const getPlaygroundForm = (): PlaygroundProviderType => {
  const dispatch = () => ({}) as Dispatch<PlaygroundAction>;
  const formId = crypto.randomUUID();
  const questionDropdownId = crypto.randomUUID();
  const questionRadioId = crypto.randomUUID();

  const form: FormProviderType = {
    id: formId,
    status: "DRAFT",
    isFavourite: false,
    isShareable: false,
    title: "Create a form",
    userId: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [
      {
        id: questionDropdownId,
        question: "Dropdown Question 1",
        order: 1,
        type: "DROPDOWN",
        formId: formId,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: [
          {
            id: crypto.randomUUID(),
            value: "DROPDOWN_option_1",
            questionId: questionDropdownId,
            showInput: false,
            isOtherOption: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      {
        id: questionRadioId,
        question: "Radio Question 1",
        order: 2,
        type: "RADIO",
        formId: formId,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: [
          {
            id: crypto.randomUUID(),
            value: "RADIO_option_1",
            questionId: questionRadioId,
            showInput: false,
            isOtherOption: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ],
  };

  return { isPlayground: true, form, dispatch };
};
