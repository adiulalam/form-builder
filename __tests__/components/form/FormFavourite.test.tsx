import { FormFavourite } from "@/components/form";
import { render, screen } from "@testing-library/react";
import { AllWithTRPC, FormIsFavouriteTRPC } from ".";

describe("Test the 'FormFavourite' component", () => {
  it("Should return valid text and icon of NOT favourite", () => {
    render(<FormFavourite />, { wrapper: AllWithTRPC });

    expect(screen.getByLabelText(/Mark as favourite/i)).toBeInTheDocument();

    expect(screen.getByLabelText("FavoriteBorderIcon")).toBeInTheDocument();
  });

  it("Should return valid text and icon of favourite", () => {
    render(<FormFavourite />, { wrapper: FormIsFavouriteTRPC });

    expect(screen.getByLabelText(/Mark as favourite/i)).toBeInTheDocument();

    expect(screen.getByLabelText("FavoriteIcon")).toBeInTheDocument();
  });
});
