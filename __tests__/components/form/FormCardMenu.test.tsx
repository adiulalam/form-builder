import { FormCardMenu } from "@/components/form";
import { render, screen, act } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC } from ".";
import { useState } from "react";

describe("Test the 'FormCardMenu' component", () => {
  it("Should return card menu button of draft status", () => {
    const Component = () => {
      const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
      return (
        <FormCardMenu isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />
      );
    };
    render(<Component />, { wrapper: AllWithTRPC });
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
    expect(screen.getByTestId("MoreVertIcon")).toBeInTheDocument();

    const button = screen.getByRole("button");

    act(() => {
      button.click();
    });
    expect(screen.getByRole("menu")).toBeInTheDocument();

    expect(screen.getByText(/Edit Name/i)).toBeInTheDocument();
    expect(screen.getByTestId("EditIcon")).toBeInTheDocument();

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();

    expect(screen.getByText(/Mark as Completed/i)).toBeInTheDocument();
    expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument();
  });

  it("Should return card menu button of completed status", () => {
    const Component = () => {
      const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
      return (
        <FormCardMenu isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />
      );
    };
    render(<Component />, { wrapper: FormCompletedTRPC });

    const button = screen.getByRole("button");
    act(() => {
      button.click();
    });

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();

    expect(screen.getByText(/Mark as Draft/i)).toBeInTheDocument();
    expect(screen.getByTestId("EditNoteIcon")).toBeInTheDocument();
  });
});
