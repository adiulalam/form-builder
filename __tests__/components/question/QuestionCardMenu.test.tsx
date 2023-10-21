import { QuestionCardMenu } from "@/components/question";
import { render, screen, act } from "@testing-library/react";
import {
  AllQuestionTRPC,
  FormDraftQuestionsCheckboxTRPC,
  FormDraftQuestionsDropdownTRPC,
  FormDraftQuestionsInputTRPC,
  FormDraftQuestionsRadioTRPC,
} from ".";

const menuMapper = [
  { wrapper: AllQuestionTRPC, type: null, text: "Add" },
  {
    wrapper: FormDraftQuestionsCheckboxTRPC,
    type: "CHECKBOX",
    text: "Change to",
  },
  {
    wrapper: FormDraftQuestionsDropdownTRPC,
    type: "DROPDOWN",
    text: "Change to",
  },
  { wrapper: FormDraftQuestionsInputTRPC, type: "INPUT", text: "Change to" },
  { wrapper: FormDraftQuestionsRadioTRPC, type: "RADIO", text: "Change to" },
];

describe("Test the 'QuestionCardMenu' component", () => {
  menuMapper.forEach(({ wrapper, type, text }) => {
    it(`Should return card menu ${type} type of draft status`, () => {
      render(<QuestionCardMenu />, { wrapper });
      expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
      expect(screen.getByTestId("MoreVertIcon")).toBeInTheDocument();

      const button = screen.getByLabelText("Open menu");

      act(() => {
        button.click();
      });
      expect(screen.getByRole("menu")).toBeInTheDocument();

      expect(screen.getByText(`${text} DROPDOWN`)).toBeInTheDocument();
      expect(screen.getByTestId("ArrowDropDownCircleIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} CHECKBOX`)).toBeInTheDocument();
      expect(screen.getByTestId("CheckBoxIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} RADIO`)).toBeInTheDocument();
      expect(screen.getByTestId("RadioButtonCheckedIcon")).toBeInTheDocument();

      expect(screen.getByText(`${text} INPUT`)).toBeInTheDocument();
      expect(screen.getByTestId("KeyboardIcon")).toBeInTheDocument();

      expect(screen.getByText(/Delete/i)).toBeInTheDocument();
      expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();

      if (type) {
        expect(screen.getByTestId(type)).toHaveAttribute(
          "aria-disabled",
          "true",
        );
      }
    });
  });
});
