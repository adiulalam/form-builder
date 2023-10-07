import { FormShare } from "@/components/form";
import { act, render, screen } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC } from ".";

describe("Test the 'FormShare' component", () => {
  it("Should return valid text and icon of NOT share and disabled", () => {
    render(<FormShare />, { wrapper: AllWithTRPC });

    expect(screen.getByLabelText(/Share link/i)).toBeInTheDocument();

    expect(screen.getByLabelText("ShareIcon")).toBeInTheDocument();

    const button = screen.getByRole("ShareButton");
    expect(button).toBeDisabled();
  });

  it("Should as enabled state of button", () => {
    render(<FormShare />, { wrapper: FormCompletedTRPC });

    const button = screen.getByRole("ShareButton");
    expect(button).not.toBeDisabled();
  });
});

describe("Test the 'FormShare' modal component", () => {
  it("Should return disabled state of button", () => {
    render(<FormShare />, { wrapper: FormCompletedTRPC });

    const button = screen.getByRole("ShareButton");
    act(() => {
      button.click();
    });

    expect(screen.getByText("Allow Sharing?")).toBeInTheDocument();
    expect(screen.getByLabelText("Share:")).toBeInTheDocument();
  });
});
