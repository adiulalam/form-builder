import { FormShareClipboard } from "@/components/form";
import { act, render, screen } from "@testing-library/react";
import { FormCompletedTRPC, formData } from ".";

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn().mockReturnValueOnce(""),
  },
});

describe("Test the 'FormShareClipboard' modal component", () => {
  it("Should return copy url and icon", () => {
    const url = `${window.location.host}/share/${formData.id}`;
    render(<FormShareClipboard text={url} />, {
      wrapper: FormCompletedTRPC,
    });
    expect(screen.getByDisplayValue(url)).toBeInTheDocument();
    expect(screen.getByTestId("ContentCopyIcon")).toBeInTheDocument();

    const button = screen.getByRole("CopyButton");

    act(() => {
      button.click();
    });
    expect(screen.getByTestId("ContentPasteIcon")).toBeInTheDocument();
  });
});
