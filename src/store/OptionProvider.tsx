import type { OptionProviderType } from "@/types/Provider.types";
import { createContext, type ReactNode } from "react";

export const OptionContext = createContext<OptionProviderType>(
  {} as OptionProviderType
);

export const OptionProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: OptionProviderType;
}) => <OptionContext.Provider value={store}>{children}</OptionContext.Provider>;
