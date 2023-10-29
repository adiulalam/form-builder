import { OptionAdd } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from ".";

describe("Test the 'OptionAdd' component", () => {
  it("Should return enabled button", () => {
    render(<OptionAdd value="value" autocompleteRef={{ current: null }} />, {
      wrapper: DraftCheckboxOptionTRPC,
    });
    expect(screen.getByLabelText("Add Value")).toBeInTheDocument();
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("Should return disabled button", () => {
    render(<OptionAdd value="" autocompleteRef={{ current: null }} />, {
      wrapper: DraftCheckboxOptionTRPC,
    });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
