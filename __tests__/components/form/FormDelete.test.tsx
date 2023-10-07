import { FormDelete } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC } from ".";

describe("Test the 'FormDelete' component", () => {
  it("Should return valid text and icon", () => {
    render(<FormDelete handleClose={() => null} />, { wrapper: AllWithTRPC });

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });
});
