import { QuestionDelete } from "@/components/question";
import { render, screen } from "@testing-library/react";
import { AllQuestionTRPC } from ".";

describe("Test the 'QuestionDelete' component", () => {
  it("Should return valid text and icon", () => {
    render(<QuestionDelete handleClose={() => null} />, {
      wrapper: AllQuestionTRPC,
    });

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });
});
