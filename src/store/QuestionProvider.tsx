import type { QuestionProviderType } from "@/types/Provider.types";
import { createContext, type ReactNode } from "react";

export const QuestionContext = createContext<QuestionProviderType>(
  {} as QuestionProviderType
);

export const QuestionProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: QuestionProviderType;
}) => (
  <QuestionContext.Provider value={store}>{children}</QuestionContext.Provider>
);
