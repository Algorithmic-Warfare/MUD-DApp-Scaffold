import React, { createContext, useContext } from "react";

export type WalletMudContextValue = {
  networkConfig: Awaited<
    ReturnType<typeof import("src/data/mud").setup>
  > | null;
  isSettingUp: boolean;
  error: Error | null;
};

export const WalletMudContext = createContext<WalletMudContextValue>({
  networkConfig: null,
  isSettingUp: false,
  error: null,
});

export const useWalletMud = () => useContext(WalletMudContext);
