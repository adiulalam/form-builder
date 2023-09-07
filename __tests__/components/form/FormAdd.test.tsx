import { FormAdd } from "@/components/form";
import { render, screen } from "@testing-library/react";

describe("Test the 'FormAdd' component", () => {
  it("Should return valid button", () => {
    render(<FormAdd />);

    const button = screen.getByRole("button");

    expect(button.innerText).toBeFalsy();
    expect(button).toHaveClass("MuiButtonBase-root");
  });
});
