import type { User as ProfileProviderType } from "@prisma/client";

import { createContext, useContext, type ReactNode } from "react";

export const ProfileContext = createContext<ProfileProviderType>(
  {} as ProfileProviderType
);

export const ProfileProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: ProfileProviderType;
}) => (
  <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
);

export const useProfileInfo = () => useContext(ProfileContext);
