import type { SubmissionProviderType } from "@/types/Provider.types";
import { createContext, type ReactNode } from "react";

export const SubmissionContext = createContext<SubmissionProviderType>(
  {} as SubmissionProviderType,
);

export const SubmissionProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: SubmissionProviderType;
}) => (
  <SubmissionContext.Provider value={store}>
    {children}
  </SubmissionContext.Provider>
);
