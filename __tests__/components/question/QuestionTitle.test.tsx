import { QuestionTitle } from "@/components/question";
import { render, screen } from "@testing-library/react";
import {
  FormDraftQuestionsCheckboxTRPC,
  FormCompletedQuestionsCheckboxTRPC,
  questionCheckboxData,
} from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/form/[id]",
    };
  },
}));

describe("Test the 'QuestionTitle' component", () => {
  it("Should return question title when it's on draft status", () => {
    render(<QuestionTitle />, { wrapper: FormDraftQuestionsCheckboxTRPC });
    const textarea = screen.getByText(questionCheckboxData.question);
    expect(textarea).not.toHaveAttribute("readonly");
  });

  it("Should return question title when it's on completed status", () => {
    render(<QuestionTitle />, {
      wrapper: FormCompletedQuestionsCheckboxTRPC,
    });

    const textarea = screen.getByText(questionCheckboxData.question);
    expect(textarea).toHaveAttribute("readonly");
  });
});
