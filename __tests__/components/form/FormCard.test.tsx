import type { Form } from "@prisma/client";
import { FormCard } from "@/components/form";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

describe("Test the 'FormCard' component", () => {
  const props: Form = {
    id: "80bbdd42-4d13-410e-abb7-79b0c81e3d32",
    status: "DRAFT",
    title: "test title",
    userId: "9954f8ab-9a3f-40aa-b006-4c8aa0af177e",
    createdAt: new Date("2023-09-05T20:38:09.219Z"),
    updatedAt: new Date("2023-09-05T20:38:09.219Z"),
  };

  it("Should return all card data", () => {
    render(<FormCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();

    expect(screen.getByText(props.status)).toBeInTheDocument();

    expect(
      screen.getByText(dayjs(props.updatedAt).format("LL")),
    ).toBeInTheDocument();
  });
});
