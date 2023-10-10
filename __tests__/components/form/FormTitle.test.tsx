import { FormTitle } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC, formData } from ".";

describe("Test the 'FormTitle' component", () => {
  const setIsReadOnly = () => null;

  it("Should return card title when it's on draft status", () => {
    const isReadOnly = true;
    render(
      <FormTitle setIsReadOnly={setIsReadOnly} isReadOnly={isReadOnly} />,
      { wrapper: AllWithTRPC },
    );
    const textarea = screen.getByText(formData.title);
    expect(textarea).toHaveAttribute("readonly");
  });

  it("Should return card title when it's on completed status", () => {
    const isReadOnly = false;
    render(
      <FormTitle setIsReadOnly={setIsReadOnly} isReadOnly={isReadOnly} />,
      {
        wrapper: FormCompletedTRPC,
      },
    );

    const textarea = screen.getByText(formData.title);
    expect(textarea).toHaveAttribute("readonly");
  });
});
