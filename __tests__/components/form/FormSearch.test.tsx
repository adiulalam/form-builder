import { FormSearch } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC } from ".";

describe("Test the 'FormSearch' component", () => {
  it("Should return valid text and icon", () => {
    render(<FormSearch />, { wrapper: AllWithTRPC });

    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
