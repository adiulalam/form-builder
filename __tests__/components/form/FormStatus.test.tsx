import { FormStatus } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC } from ".";

describe("Test the 'FormStatus' component", () => {
  const handleClose = () => null;

  it("Should return card menu button of draft status", () => {
    render(<FormStatus handleClose={handleClose} />, { wrapper: AllWithTRPC });
    expect(screen.getByText(/Mark as Completed/i)).toBeInTheDocument();
    expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument();
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  it("Should return card menu button of completed status", () => {
    render(<FormStatus handleClose={handleClose} />, {
      wrapper: FormCompletedTRPC,
    });

    expect(screen.getByText(/Mark as Draft/i)).toBeInTheDocument();
    expect(screen.getByTestId("EditNoteIcon")).toBeInTheDocument();
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });
});
