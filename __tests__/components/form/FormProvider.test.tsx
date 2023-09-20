import type { ReactNode } from "react";
import { Status, type Form } from "@prisma/client";
import { FormProvider } from "@/store";
import { api } from "@/utils/api";
import { z } from "zod";

export const formData: Form = {
  id: "80bbdd42-4d13-410e-abb7-79b0c81e3d32",
  status: "DRAFT",
  title: "test title",
  isFavourite: true,
  isShareable: false,
  userId: "9954f8ab-9a3f-40aa-b006-4c8aa0af177e",
  createdAt: new Date("2023-09-05T20:38:09.219Z"),
  updatedAt: new Date("2023-09-05T20:38:09.219Z"),
};

const formDataSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(Status),
  title: z.string().min(1),
  isFavourite: z.boolean(),
  isShareable: z.boolean(),
  userId: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const AllTheProviders = ({ children }: { children: ReactNode }) => (
  <FormProvider store={formData}>{children}</FormProvider>
);

export const AllWithTRPC = api.withTRPC(AllTheProviders);

describe("Test the 'formData'", () => {
  it("Should test all string data", () => {
    const { success } = formDataSchema.safeParse(formData);
    expect(success).toEqual(true);
  });
});
