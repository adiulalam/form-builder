import { OptionDelete } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from ".";

describe("Test the 'OptionDelete' component", () => {
  it("Should return valid text and icon", () => {
    render(<OptionDelete handleClose={() => null} />, {
      wrapper: DraftCheckboxOptionTRPC,
    });

    expect(screen.getByText(/Delete All Options/i)).toBeInTheDocument();

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });
});
