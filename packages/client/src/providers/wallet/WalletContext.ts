import { createContext, useContext } from "react";

import { WalletContextType } from "./types";

const WalletContext = createContext<WalletContextType>({
  connectedProvider: {
    provider: null,
    connected: false,
  },
  gatewayConfig: {
    gatewayHttp: "",
    gatewayWs: "",
  },
  publicClient: null,
  walletClient: null,
  bundlerClient: null,
  handleConnect: async () => {},
  handleDisconnect: async () => {},
  isCurrentChain: false,
  availableWallets: [],
  defaultNetwork: {
    network: undefined,
    worldAddress: "0x",
    eveTokenAddress: "0x",
    erc2771ForwarderAddress: "0x",
    // systemIds: {},
  },
});

/**
 * Custom hook to provide access to wallet connection functionalities, network configurations,
 * and available wallet providers from the WalletContext.
 *
 * Uses the publicClient and walletClient provided by viem.
 *
 * This hook utilizes the `WalletContext` to allow components to easily manage and interact
 * with wallet connections, fetch network configurations, and handle connection state.
 *
 * Usage:
 * ```tsx
 * const {
 *   connectedProvider,
 *   gatewayConfig,
 *   handleConnect,
 *   handleDisconnect,
 *   availableWallets,
 *   isCurrentChain,
 *   publicClient,
 *   walletClient,
 *   bundlerClient,
 *   defaultNetwork
 * } = useConnection();
 * ```
 *
 * Returns:
 * - `connectedProvider`: Object containing the currently connected provider and connection state.
 * - `gatewayConfig`: Configuration for the blockchain gateway.
 * - `handleConnect`: Function to connect to a preferred wallet.
 * - `handleDisconnect`: Function to disconnect the wallet.
 * - `availableWallets`: Array of available wallet provider names.
 * - `isCurrentChain`: Boolean indicating if the provider is on the correct network.
 * - `publicClient`: The public client instance for interacting with the blockchain.
 * - `walletClient`: The wallet client instance.
 * - `bundlerClient`: The bundler client instance (if available).
 * - `defaultNetwork`: Object containing the default network configuration.
 *
 * Example:
 * ```tsx
 * import { useConnection } from '@eveworld/contexts';
 *
 * const MyComponent = () => {
 *   const {
 *     connectedProvider,
 *     gatewayConfig,
 *     handleConnect,
 *     handleDisconnect,
 *     availableWallets,
 *     isCurrentChain,
 *     publicClient,
 *     walletClient,
 *     bundlerClient,
 *     defaultNetwork
 *   } = useConnection();
 *
 *   const connectWallet = () => {
 *     handleConnect('MetaMask');
 *   };
 *
 *   return (
 *     <div>
 *       {connectedProvider.connected ? (
 *         <button onClick={handleDisconnect}>Disconnect</button>
 *       ) : (
 *         <button onClick={connectWallet}>Connect Wallet</button>
 *       )}
 *       {isCurrentChain ? (
 *         <p>Connected to the correct network</p>
 *       ) : (
 *         <p>Please switch to the correct network</p>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */
export const useConnection = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useConnection must be used within an WalletContext");
  }
  return context;
};

export default WalletContext;
