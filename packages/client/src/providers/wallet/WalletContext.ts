/**
 * @file Defines the WalletContext and a custom hook for accessing wallet connection details.
 */

import { createContext, useContext } from "react";

import { WalletContextType } from "./types";

/**
 * @summary React Context for managing wallet connection state.
 * @description This context provides access to the wallet connection details, including connected provider, clients, and handler functions. It's intended to be consumed by components that need to interact with or display information about the wallet.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Consumption**: It is highly recommended to use the `useConnection` hook for accessing this context, as it provides a convenient and type-safe way to consume the context value and handles null checks.
 * - **Null States**: The context value is initialized with default values. Ensure `WalletProvider` wraps any components that use `useConnection`.
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
 * @summary Custom React Hook to access wallet connection state.
 * @description This hook provides a convenient way to consume the `WalletContext`. It returns the current wallet connection details and functions. If the hook is used outside of a `WalletProvider`, it will throw an error.
 *
 * @returns {WalletContextType} The wallet connection context.
 * @throws {Error} if `useConnection` is not used within an `WalletContext`.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Dependencies**: This hook requires a `WalletProvider` component to be an ancestor in the React component tree. Without it, the hook will throw a runtime error.
 * - **Error States**: The hook explicitly throws an error if the context is null, indicating improper usage.
 */
export const useConnection = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useConnection must be used within an WalletContext");
  }
  return context;
};

export default WalletContext;
