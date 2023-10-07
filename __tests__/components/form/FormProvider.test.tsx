import type { ReactNode } from "react";
import { Status, type Form } from "@prisma/client";
import { FormProvider } from "@/store";
import { api } from "@/utils/api";
import { z } from "zod";
type Props = {
  children: ReactNode;
};

export const formData: Form = {
  id: "80bbdd42-4d13-410e-abb7-79b0c81e3d32",
  status: "DRAFT",
  title: "test title",
  isFavourite: false,
  isShareable: false,
  userId: "9954f8ab-9a3f-40aa-b006-4c8aa0af177e",
  createdAt: new Date("2023-09-05T20:38:09.219Z"),
  updatedAt: new Date("2023-09-05T20:38:09.219Z"),
};

export const formDataFavourite: Form = {
  ...formData,
  isFavourite: true,
};

export const formDataShare: Form = {
  ...formData,
  isShareable: true,
};

export const formDataCompleted: Form = {
  ...formDataShare,
  status: "COMPLETED",
};

const formDataSchema = z
  .object({
    id: z.string().min(1),
    status: z.nativeEnum(Status),
    title: z.string().min(1),
    isFavourite: z.boolean(),
    isShareable: z.boolean(),
    userId: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .array();

const AllTheProviders = ({
  children,
  store = formData,
}: {
  children?: ReactNode;
  store: Form;
}) => <FormProvider store={store}>{children}</FormProvider>;

export const AllWithTRPC = api.withTRPC(AllTheProviders);

const FormIsFavourite = (props: Props) => (
  <AllTheProviders store={formDataFavourite} {...props} />
);
export const FormIsFavouriteTRPC = api.withTRPC(FormIsFavourite);

const FormIsShare = (props: Props) => (
  <AllTheProviders store={formDataShare} {...props} />
);
export const FormIsShareTRPC = api.withTRPC(FormIsShare);

const FormCompleted = (props: Props) => (
  <AllTheProviders store={formDataShare} {...props} />
);
export const FormCompletedTRPC = api.withTRPC(FormCompleted);

describe("Test the 'formData'", () => {
  it("Should test all string data", () => {
    const { success } = formDataSchema.safeParse([formData, formDataFavourite]);
    expect(success).toEqual(true);
  });
});
