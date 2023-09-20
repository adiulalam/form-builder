import type { FormProviderType } from "@/types/Provider.types";
import { createContext, type ReactNode } from "react";

export const FormContext = createContext<FormProviderType>(
  {} as FormProviderType,
);

export const FormProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: FormProviderType;
}) => <FormContext.Provider value={store}>{children}</FormContext.Provider>;
