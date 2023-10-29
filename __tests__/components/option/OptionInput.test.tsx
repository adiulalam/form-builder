import { OptionInput } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from ".";

describe("Test the 'OptionInput' component", () => {
  it("Should return valid placeholder and attribute", () => {
    render(<OptionInput />, {
      wrapper: DraftCheckboxOptionTRPC,
    });

    expect(screen.getByLabelText(/OTHER/i)).toBeInTheDocument();

    const otherInput = screen.getByPlaceholderText(/Type here/i);
    expect(otherInput).toHaveAttribute("readonly");
  });
});
