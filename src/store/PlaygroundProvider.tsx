import type { PlaygroundProviderType } from "@/types/Provider.types";
import { createContext, useContext, type ReactNode } from "react";

export const PlaygroundContext = createContext<PlaygroundProviderType>({
  isPlayground: false,
});

type PlaygroundProviderProps = {
  children: ReactNode;
  store: PlaygroundProviderType;
};

export const PlaygroundProvider = ({
  children,
  store,
}: PlaygroundProviderProps) => (
  <PlaygroundContext.Provider value={{ ...store }}>
    {children}
  </PlaygroundContext.Provider>
);

export const usePlaygroundContext = () => useContext(PlaygroundContext);
