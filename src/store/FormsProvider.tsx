import { type ReactNode, createContext } from "react";

type FormsContextType = {
  refetch: () => void;
  userId: string;
};

export const FormsContext = createContext<FormsContextType>({
  refetch: () => null,
  userId: "",
});

export const FormsProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: FormsContextType;
}) => <FormsContext.Provider value={store}>{children}</FormsContext.Provider>;
