import { OptionBarMenu } from "@/components/option";
import { render, screen } from "@testing-library/react";
import { DraftCheckboxOptionTRPC } from ".";

describe("Test the 'OptionBarMenu' component", () => {
  it("Should return option menu button of draft status", () => {
    render(<OptionBarMenu />, { wrapper: DraftCheckboxOptionTRPC });
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
    expect(screen.getByTestId("MoreVertIcon")).toBeInTheDocument();
  });
});
