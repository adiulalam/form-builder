import { FormSort } from "@/components/form";
import { act, render, screen } from "@testing-library/react";
import { AllWithTRPC } from ".";
import { sortItems } from "@/utils/form.config";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        sort: "title",
        order: "desc",
      },
    };
  },
}));

describe("Test the 'FormSort' component", () => {
  it("Should return valid text and icon", () => {
    render(<FormSort />, { wrapper: AllWithTRPC });

    expect(screen.getByText(/SORT/i)).toBeInTheDocument();
    expect(screen.getByTestId("SortIco")).toBeInTheDocument();

    const button = screen.getByRole("SortButton");

    act(() => {
      button.click();
    });
    sortItems.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      if (name === "Name")
        expect(screen.getByTestId("TextRotationDownIcon")).toBeInTheDocument();
    });
  });
});
