import { NavbarDesktop } from "@/components/navbar";
import { navbarPages } from "@/utils/navbar.config";
import { render, screen } from "@testing-library/react";

describe("Test the 'NavbarDesktop' component", () => {
  it("Should return all pages on desktop mode", () => {
    render(<NavbarDesktop />);

    navbarPages.forEach((page) =>
      expect(screen.getByText(page.name)).toBeInTheDocument(),
    );
  });
});
