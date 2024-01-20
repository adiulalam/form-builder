import type { LogProviderType } from "@/types/Provider.types";
import { createContext, type ReactNode } from "react";

export const LogContext = createContext<LogProviderType>({} as LogProviderType);

export const LogProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: LogProviderType;
}) => <LogContext.Provider value={store}>{children}</LogContext.Provider>;
