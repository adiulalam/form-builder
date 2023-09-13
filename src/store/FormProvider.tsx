import { type Form } from "@prisma/client";
import { createContext, type ReactNode } from "react";

export const FormContext = createContext<Form>({
  id: "",
  status: "DRAFT",
  isFavourite: false,
  isShareable: false,
  title: "",
  userId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const FormProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: Form;
}) => <FormContext.Provider value={store}>{children}</FormContext.Provider>;
