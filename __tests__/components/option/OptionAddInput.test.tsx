import { OptionAddInput } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from "../option";

describe("Test the 'OptionAddInput' component", () => {
  it("Should return valid text and icon", () => {
    render(<OptionAddInput handleClose={() => null} />, {
      wrapper: DraftCheckboxOptionTRPC,
    });

    expect(screen.getByText(/Remove 'Other' input field/i)).toBeInTheDocument();

    expect(screen.getByRole("menuitem")).toBeInTheDocument();
    expect(screen.getByTestId("KeyboardIcon")).toBeInTheDocument();
  });
});
