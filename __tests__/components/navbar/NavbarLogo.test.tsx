import { NavbarLogo } from "@/components/navbar";
import { render, screen } from "@testing-library/react";

describe("Test the 'NavbarLogo' component", () => {
  it("Should return name on desktop mode", () => {
    render(<NavbarLogo isMobile={false} />);

    expect(screen.getByText(/FILDER/i)).toBeInTheDocument();
  });

  it("Should return name on mobile mode", () => {
    render(<NavbarLogo isMobile />);

    expect(screen.getByText(/FILDER/i)).toBeInTheDocument();
  });
});
