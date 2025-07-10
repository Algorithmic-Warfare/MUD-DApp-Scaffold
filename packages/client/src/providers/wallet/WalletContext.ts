/**
 * @file Defines the WalletContext and a custom hook for accessing wallet connection details.
 */

import { createContext, useContext } from "react";

import { WalletContextType } from "./types";

/**
 * Creates a React Context for managing wallet connection state and functions.
 * Provides default values for the wallet connection properties.
 */
const WalletContext = createContext<WalletContextType>({
  connectedProvider: {
    provider: null,
    connected: false,
  },
  publicClient: null,
  walletClient: null,
  handleConnect: async () => {},
  handleDisconnect: async () => {},
  isCurrentChain: false,
  availableWallets: [],
  defaultChain: null,
  providers: [],
  connected: false,
});

/**
 * Custom hook to access the WalletContext.
 * Throws an error if used outside of a WalletContext.Provider.
 * @returns The wallet connection context.
 * @throws Error if `useConnection` is not used within an `WalletContext`.
 */
export const useConnection = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useConnection must be used within an WalletContext");
  }
  return context;
};

export default WalletContext;
