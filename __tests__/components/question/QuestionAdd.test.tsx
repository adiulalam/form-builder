import { QuestionAdd } from "@/components/question";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC } from "../form";

describe("Test the 'QuestionAdd' component", () => {
  it("Should return enabled button", () => {
    render(<QuestionAdd />, { wrapper: AllWithTRPC });
    expect(screen.getByLabelText("Add Question")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("Should return disabled button", () => {
    render(<QuestionAdd />, { wrapper: FormCompletedTRPC });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
