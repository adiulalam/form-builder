import { FormShare } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC } from ".";

describe("Test the 'FormShare' component", () => {
  it("Should return valid text and icon of NOT share", () => {
    render(<FormShare />, { wrapper: AllWithTRPC });

    expect(screen.getByLabelText(/Share link/i)).toBeInTheDocument();

    expect(screen.getByLabelText("ShareIcon")).toBeInTheDocument();
  });

  it("Should return disabled state of button", () => {
    render(<FormShare />, { wrapper: FormCompletedTRPC });

    const button = screen.getByRole("ShareButton");
    expect(button).toBeDisabled();
  });
});
