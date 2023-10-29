import { OptionOtherInput } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from ".";

describe("Test the 'OptionOtherInput' component", () => {
  it("Should return valid placeholder and attribute", () => {
    render(<OptionOtherInput label="INPUT" />, {
      wrapper: DraftCheckboxOptionTRPC,
    });

    expect(screen.getByLabelText(/INPUT/i)).toBeInTheDocument();

    const otherInput = screen.getByPlaceholderText(/Type here/i);
    expect(otherInput).toHaveAttribute("readonly");
  });
});
