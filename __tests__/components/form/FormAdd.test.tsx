import { FormAdd } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC } from ".";

describe("Test the 'FormAdd' component", () => {
  it("Should return enabled valid button", () => {
    render(<FormAdd />, { wrapper: AllWithTRPC });
    expect(screen.getByLabelText("Add Form")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
});
