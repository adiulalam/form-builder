import { QuestionOrder } from "@/components/question";
import { render, screen } from "@testing-library/react";
import { FormDraftQuestionsCheckboxTRPC } from ".";

describe("Test the 'QuestionOrder' component", () => {
  it("Should return valid question order with up arrow", () => {
    render(<QuestionOrder isUp={true} />, {
      wrapper: FormDraftQuestionsCheckboxTRPC,
    });

    expect(screen.getByLabelText("Move UP the question")).toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowUpIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("Should return valid question order with down arrow", () => {
    render(<QuestionOrder isUp={false} />, {
      wrapper: FormDraftQuestionsCheckboxTRPC,
    });

    expect(screen.getByLabelText("Move Down the question")).toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
