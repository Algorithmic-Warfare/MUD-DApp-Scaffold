import React from "react";
import { usePodVault } from "./usePodVault";
import { ZupassContext } from "./ZupassContext";

interface ZupassContextProvider {
  children: React.ReactNode;
}

export const ZupassContextProvider: React.FC<ZupassContextProvider> = ({
  children,
}) => {
  const podVault = usePodVault();

  return (
    <>
      <ZupassContext.Provider
        value={{
          podVault,
        }}
      >
        {children}
      </ZupassContext.Provider>
    </>
  );
};
