import { QuestionCard } from "@/components/question";
import { render, renderHook, screen } from "@testing-library/react";
import {
  FormDraftQuestionsCheckboxTRPC,
  FormDraftQuestionsDropdownTRPC,
  FormDraftQuestionsInputTRPC,
  FormDraftQuestionsRadioTRPC,
  questionCheckboxData,
  questionDropdownData,
  questionInputData,
  questionRadioData,
} from ".";
import { useReactHookForm } from "@/store";

describe("Test the 'FormCard' component", () => {
  renderHook(() => useReactHookForm());

  it("Should test question checkbox", () => {
    render(<QuestionCard />, {
      wrapper: FormDraftQuestionsCheckboxTRPC,
    });

    expect(
      screen.getByText(questionCheckboxData.type as string),
    ).toBeInTheDocument();

    expect(screen.getByText(questionCheckboxData.question)).toBeInTheDocument();
  });

  it("Should test question dropdown", () => {
    render(<QuestionCard />, {
      wrapper: FormDraftQuestionsDropdownTRPC,
    });

    expect(
      screen.getByText(questionDropdownData.type as string),
    ).toBeInTheDocument();

    expect(screen.getByText(questionDropdownData.question)).toBeInTheDocument();
  });

  it("Should test question radio", () => {
    render(<QuestionCard />, {
      wrapper: FormDraftQuestionsRadioTRPC,
    });

    expect(
      screen.getByText(questionRadioData.type as string),
    ).toBeInTheDocument();

    expect(screen.getByText(questionRadioData.question)).toBeInTheDocument();
  });
  it("Should test question input", () => {
    render(<QuestionCard />, {
      wrapper: FormDraftQuestionsInputTRPC,
    });

    expect(
      screen.getByText(questionInputData.type as string),
    ).toBeInTheDocument();

    expect(screen.getByText(questionInputData.question)).toBeInTheDocument();
  });
});
