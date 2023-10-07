import { FormShareClipboard } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { FormCompletedTRPC, formData } from ".";

describe("Test the 'FormShareClipboard' modal component", () => {
  it("Should return disabled state of button", () => {
    const url = `${window.location.host}/share/${formData.id}`;

    render(<FormShareClipboard text={url} />, { wrapper: FormCompletedTRPC });

    expect(screen.getByDisplayValue(url)).toBeInTheDocument();
  });
});
