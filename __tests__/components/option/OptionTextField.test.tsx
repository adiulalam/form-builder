import { OptionTextField } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from ".";

describe("Test the 'OptionTextField' component", () => {
  it("Should return valid placeholder and attribute", () => {
    render(<OptionTextField />, {
      wrapper: DraftCheckboxOptionTRPC,
    });

    const otherInput = screen.getByPlaceholderText(/Type here/i);
    expect(otherInput).toHaveAttribute("readonly");
  });
});
