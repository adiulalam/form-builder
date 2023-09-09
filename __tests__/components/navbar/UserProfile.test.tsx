import { UserProfile } from "@/components/navbar";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { userPages } from "@/utils/navbar.config";

jest.mock("next-auth/react");

describe("Test the 'UserProfile' component", () => {
  it("Should mock unauthenticated user", () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "unauthenticated",
    });

    render(<UserProfile />);

    expect(screen.getByText(/SIGN IN/i)).toBeInTheDocument();

    userPages.forEach((page) =>
      expect(screen.queryByText(page.name)).not.toBeInTheDocument(),
    );
  });

  it("Should mock authenticated user", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "adiulalam",
        },
      },
      status: "authenticated",
    });

    render(<UserProfile />);

    userPages.forEach((page) =>
      expect(screen.getByText(page.name)).toBeInTheDocument(),
    );

    expect(screen.queryByText(/SIGN IN/i)).not.toBeInTheDocument();
  });
});
