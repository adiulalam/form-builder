import { FormCard } from "@/components/form";
import { render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AllWithTRPC, formData } from ".";
dayjs.extend(localizedFormat);

describe("Test the 'FormCard' component", () => {
  it("Should return all card data", () => {
    render(<FormCard />, { wrapper: AllWithTRPC });

    expect(screen.getByText(formData.status)).toBeInTheDocument();

    expect(
      screen.getByText(dayjs(formData.updatedAt).format("LL")),
    ).toBeInTheDocument();

    void waitFor(() =>
      expect(screen.getByText(formData.title)).toBeInTheDocument(),
    );
  });
});
