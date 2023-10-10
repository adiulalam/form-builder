import { FormTitle } from "@/components/form";
import { render, screen, act } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC, formData } from ".";

describe("Test the 'FormTitle' component", () => {
  it("Should return card title when it's on draft status", () => {
    render(<FormTitle />, { wrapper: AllWithTRPC });
    const textarea = screen.getByText(formData.title);
    act(() => {
      textarea.click();
    });

    expect(textarea).not.toHaveAttribute("readonly");
  });

  it("Should return card title when it's on completed status", () => {
    render(<FormTitle />, {
      wrapper: FormCompletedTRPC,
    });

    const textarea = screen.getByText(formData.title);
    act(() => {
      textarea.click();
    });

    expect(textarea).toHaveAttribute("readonly");
  });
});
