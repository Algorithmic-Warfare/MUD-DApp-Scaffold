import React, { useState, useEffect } from "react";
import { setup } from "src/data/mud";
import { useConnection } from "src/providers/wallet";
import { MudProvider } from "./MudProvider";
import { MudDevToolsProvider } from "./MudDevToolsProvider";
import MudWalletAdapterContext from "./MudWalletAdapterContext";
import { MudWalletAdapterContextValue } from "./MudWalletAdapterContext";

type Props = {
  children: React.ReactNode;
};

/**
 * @summary Provider component for MUD network configuration
 * @description Manages the setup and state of the MUD network connection.
 * Handles initialization, error states, and provides the context to child components.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that need access to MUD context
 *
 * @notes
 * ## AI Usage Guidance:
 * - Should wrap all components needing MUD network access
 * - Handles all setup logic automatically when wallet is connected
 * - Provides loading and error states that should be handled by consumers
 * - Depends on WalletProvider being in the component tree
 */
export const MudWalletAdapterProvider = ({ children }: Props) => {
  const [networkConfig, setNetworkConfig] = useState<Awaited<
    ReturnType<typeof setup>
  > | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    connectedProvider,
    publicClient,
    walletClient,
    isCurrentChain,
    defaultNetwork,
  } = useConnection();

  const { connected } = connectedProvider;

  /**
   * @summary Sets up the MUD network configuration when dependencies are ready
   * @description This effect initializes the MUD network when the wallet is connected,
   * publicClient and walletClient are available, and the networkConfig is not already set.
   * It calls the setup function, handles potential errors, and updates the component state.
   *
   * @notes
   * ## AI Usage Guidance:
   * - This effect should only run once when the component mounts and dependencies are ready
   * - Ensure proper error handling to prevent app crashes
   * - The setup function is crucial for initializing the MUD network
   * - Dependencies: connected, publicClient, walletClient, networkConfig, defaultNetwork
   */
  useEffect(() => {
    if (!connected || !publicClient || !walletClient || networkConfig) return;

    const setupMud = async () => {
      try {
        setIsSettingUp(true);
        setError(null);

        const { worldAddress, network } = defaultNetwork;
        const { id: chainId } = network!;

        const result = await setup(
          publicClient,
          walletClient,
          chainId,
          worldAddress
        );
        setNetworkConfig(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to setup MUD"));
      } finally {
        setIsSettingUp(false);
      }
    };

    setupMud();
  }, [connected, publicClient, walletClient, networkConfig, defaultNetwork]);

  const value = {
    networkConfig,
    isSettingUp,
    error,
  };

  if (!networkConfig || !walletClient) {
    return <div>Loading MUD configuration...</div>;
  }

  if (error) {
    return <div>Error setting up MUD: {error.message}</div>;
  }

  return (
    <MudWalletAdapterContext.Provider value={value}>
      <MudDevToolsProvider config={networkConfig}>
        <MudProvider config={networkConfig}>
          {isCurrentChain ? (
            children
          ) : (
            <div>
              {`Switch network to ${walletClient.chain?.name} to continue`}
            </div>
          )}
        </MudProvider>
      </MudDevToolsProvider>
    </MudWalletAdapterContext.Provider>
  );
};
