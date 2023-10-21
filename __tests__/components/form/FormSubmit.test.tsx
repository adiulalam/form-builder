import { FormSubmit } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { FormCompletedTRPC } from ".";

describe("Test the 'FormSubmit' component", () => {
  it("Should return enabled valid button", () => {
    render(<FormSubmit />, { wrapper: FormCompletedTRPC });
    expect(screen.getByLabelText("Submit Form")).toBeInTheDocument();
    expect(screen.getByTestId("SendIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
});
