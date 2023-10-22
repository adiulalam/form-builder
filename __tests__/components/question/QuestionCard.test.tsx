import { QuestionCard } from "@/components/question";
import { render, renderHook, screen } from "@testing-library/react";
import {
  AllQuestionTRPC,
  FormDraftQuestionsCheckboxTRPC,
  FormDraftQuestionsDropdownTRPC,
  FormDraftQuestionsInputTRPC,
  FormDraftQuestionsRadioTRPC,
  questionCheckboxData,
  questionDropdownData,
  questionInputData,
  questionRadioData,
  questionNullData,
} from ".";
import { useReactHookForm } from "@/store";

const cardMapper = [
  {
    name: "null",
    wrapper: AllQuestionTRPC,
    type: "NO TYPE PROVIDED",
    question: questionNullData.question,
  },
  {
    name: "checkbox",
    wrapper: FormDraftQuestionsCheckboxTRPC,
    type: questionCheckboxData.type as string,
    question: questionCheckboxData.question,
  },
  {
    name: "dropdown",
    wrapper: FormDraftQuestionsDropdownTRPC,
    type: questionDropdownData.type as string,
    question: questionDropdownData.question,
  },
  {
    name: "radio",
    wrapper: FormDraftQuestionsRadioTRPC,
    type: questionRadioData.type as string,
    question: questionRadioData.question,
  },
  {
    name: "input",
    wrapper: FormDraftQuestionsInputTRPC,
    type: questionInputData.type as string,
    question: questionInputData.question,
  },
];

describe("Test the 'FormCard' component", () => {
  renderHook(() => useReactHookForm());

  cardMapper.forEach(({ wrapper, type, question, name }) => {
    it(`Should test question ${name}`, () => {
      render(<QuestionCard />, {
        wrapper,
      });

      expect(screen.getByText(type)).toBeInTheDocument();

      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });
});
