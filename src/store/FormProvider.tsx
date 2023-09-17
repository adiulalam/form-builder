import type { Question, Form, Option } from "@prisma/client";
import { createContext, type ReactNode } from "react";

type Options = { options?: Option[] };
type Questions = { questions?: (Question & Options)[] };
type FormProviderType = Form & Questions;

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
