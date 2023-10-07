import { FormAdd } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC } from ".";

describe("Test the 'FormAdd' component", () => {
  it("Should return valid button", () => {
    render(<FormAdd />, { wrapper: AllWithTRPC });

    const button = screen.getByRole("button");

    expect(button.innerText).toBeFalsy();
    expect(button).toHaveClass("MuiButtonBase-root");
  });
});
