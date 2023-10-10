import { FormNavbar } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC, FormCompletedTRPC, formData } from ".";

describe("Test the 'FormNavbar' component", () => {
  it("Should return valid text on draft status", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require("next/router"), "useRouter").mockReturnValue({
      pathname: "/form/[id]",
    });

    render(<FormNavbar isFetching={false} />, { wrapper: AllWithTRPC });

    expect(screen.getByText(formData.title)).toBeInTheDocument();

    const statusButton = screen.queryByText(formData.status);
    expect(statusButton).not.toBeNull();
  });

  it("Should return valid text on completed status", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require("next/router"), "useRouter").mockReturnValue({
      pathname: "/share/[id]",
    });

    render(<FormNavbar isFetching={false} />, { wrapper: FormCompletedTRPC });

    expect(screen.getByText(formData.title)).toBeInTheDocument();

    const statusButton = screen.queryByText(formData.status);
    expect(statusButton).toBeNull();
  });
});
