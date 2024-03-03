import { ErrorWrapper } from "@/components/ui";
import { render, screen } from "@testing-library/react";

describe("Test the 'FormTitle' component", () => {
  it("Should return card title when it's on draft status", () => {
    const message = "This is an error message";
    render(<ErrorWrapper message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(
      screen.getByText("Error - Something went wrong")
    ).toBeInTheDocument();

    expect(screen.getAllByText("404 Not Found")).toHaveLength(2);

    expect(screen.getByAltText(/Scarecrow/i)).toBeInTheDocument();

    const button = screen.getByRole("RedirectButton");
    expect(button).toHaveTextContent("BACK TO HOMEPAGE");
  });
});
