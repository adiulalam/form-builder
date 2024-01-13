import { FormAdd } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC } from ".";

describe("Test the 'FormAdd' component", () => {
  it("Should return enabled valid button", () => {
    render(<FormAdd />, { wrapper: AllWithTRPC });
    expect(screen.getByLabelText("Create new form")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();

    expect(screen.getByLabelText("See unsubmitted forms")).toBeInTheDocument();
    expect(screen.getByTestId("CreateIcon")).toBeInTheDocument();

    expect(screen.getByLabelText("See submitted forms")).toBeInTheDocument();
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
});
