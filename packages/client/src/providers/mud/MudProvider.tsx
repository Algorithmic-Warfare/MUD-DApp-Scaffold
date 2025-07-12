/**
 * @file
 * @summary Provides the MudProvider component for managing MUD setup and synchronization.
 * @description This file exports the `MudProvider` component, which handles the initialization
 * and ongoing synchronization of the MUD (Multi-chain Decentralized) network. It sets up
 * the MUD environment, tracks synchronization status, and makes the MUD configuration
 * and state available to child components via the `MudContext`.
 *
 * @exports MudProvider - A React Context Provider for MUD network management.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Core MUD Logic**: This file contains the central logic for MUD integration.
 * - **Context Provider**: AI tools should recognize `MudProvider` as a context provider
 *   that makes MUD state and functions available to its children.
 * - **Synchronization**: Pay attention to how MUD synchronization status is tracked and exposed.
 * - **Dependencies**: This provider relies on `WalletProvider` and `WorldProvider` for
 *   necessary blockchain and world address information.
 */
import React, { ReactNode, useEffect, useState } from "react";
import { setup } from "../../data/mud/setup";
import { StorageAdapterBlock } from "@latticexyz/store-sync";
import { SetupFunctionReturnT } from "../../data/mud/types";
import MudContext from "./MudContext";
import { useConnection } from "src/providers/wallet";
import { useWorld } from "../world";
import { Button } from "@/components/ui/Button";
import mountDevTools from "../../data/mud/debug/mountDevTools";
import { MudProviderProps, MudContextValueType } from "./types";

/**
 * @summary Provides MUD setup and synchronization context to its children.
 * @description Manages MUD network setup, synchronization status, and makes them available to child components.
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Components needing MUD access
 * @param {boolean} [props.enableDevTools=false] - Whether to enable MUD dev tools.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization**: Handles MUD network setup internally.
 * - **Error States**: Check the `MudContext` for error states.
 * - **Dependencies**: Requires `WalletProvider` and `WorldProvider` in the component tree.
 */
export const MudProvider = ({ children }: MudProviderProps) => {
  // State to store the MUD network configuration and setup result
  const [networkConfig, setNetworkConfig] =
    useState<SetupFunctionReturnT | null>(null);
  // State to track if the MUD setup is currently in progress
  const [isSettingUp, setIsSettingUp] = useState(false);
  // State to store any error that occurs during MUD setup
  const [error, setError] = useState<Error | null>(null);

  // States for MUD synchronization status
  const [currentBlock, setCurrentBlock] = useState<bigint | null>(null);
  const [latestBlock, setLatestBlock] = useState<bigint | null>(null);
  const [logCount, setLogCount] = useState(0);
  const [syncedAtLeastOnce, setSyncedAtLeastOnce] = useState(false);

  // Destructure connection details from the wallet provider
  const {
    connectedProvider,
    publicClient,
    walletClient,
    isCurrentChain,
    defaultChain,
  } = useConnection();

  // Get the world address from the world provider
  const { worldAddress } = useWorld();

  // Extract connected status from connectedProvider
  const { connected } = connectedProvider;

  // Determine if the environment is development for dev tools
  const isDevelopment = import.meta.env.MODE === "development";

  /**
   * @summary Effect hook for MUD network setup.
   * @description This effect runs when connection parameters change to initialize the MUD network.
   * It sets up the MUD environment using public and wallet clients, and the default chain.
   */
  useEffect(() => {
    // Only proceed if all necessary connection details are available and networkConfig is not yet set
    if (
      !connected ||
      !publicClient ||
      !walletClient ||
      !defaultChain ||
      networkConfig
    )
      return;

    /**
     * @summary Asynchronous function to perform MUD setup.
     * @description Handles the MUD setup process, including error handling and state updates.
     */
    const setupMud = async () => {
      try {
        setIsSettingUp(true); // Set setup status to true
        setError(null); // Clear any previous errors

        // Perform the MUD setup
        const result = await setup(
          publicClient,
          walletClient,
          defaultChain.id,
          worldAddress
        );

        setNetworkConfig(result); // Store the setup result
      } catch (err) {
        // Catch and set any errors during setup
        setError(err instanceof Error ? err : new Error("Failed to setup MUD"));
      } finally {
        setIsSettingUp(false); // Set setup status to false regardless of success or failure
      }
    };

    setupMud(); // Execute the setup function
  }, [
    connected,
    publicClient,
    walletClient,
    networkConfig,
    defaultChain,
    worldAddress,
  ]);

  /**
   * @summary Effect hook for MUD synchronization state.
   * @description Subscribes to block and latest block number updates from the MUD network
   * to track synchronization progress.
   */
  useEffect(() => {
    if (!networkConfig) return; // Only run if networkConfig is available

    // Subscribe to stored block logs to update current block and log count
    const blockSub = networkConfig.network.storedBlockLogs$.subscribe(
      (block: StorageAdapterBlock) => {
        setCurrentBlock(block.blockNumber);
        setLogCount((prev) => prev + block.logs.length);
      }
    );

    // Subscribe to the latest block number to update latestBlock
    const latestBlockSub = networkConfig.network.latestBlockNumber$.subscribe(
      (blockNumber: bigint) => {
        setLatestBlock(blockNumber);
      }
    );

    // Cleanup function to unsubscribe from observables when the component unmounts or networkConfig changes
    return () => {
      blockSub.unsubscribe();
      latestBlockSub.unsubscribe();
    };
  }, [networkConfig]);

  /**
   * @summary Effect hook for MUD Dev Tools.
   * @description Mounts MUD development tools if in development mode and networkConfig is available.
   */
  useEffect(() => {
    if (isDevelopment && networkConfig) {
      mountDevTools(networkConfig);
    }
  }, [isDevelopment, networkConfig]);

  // Calculate synchronization progress
  const progress =
    currentBlock && latestBlock
      ? Number((currentBlock * 100n) / latestBlock)
      : 0;

  // Determine if the MUD is live (fully synced)
  const live = progress === 100;

  // Update syncedAtLeastOnce status
  if (!syncedAtLeastOnce && live) {
    setSyncedAtLeastOnce(true);
  }

  // Determine if the MUD is currently syncing
  const isSyncing = currentBlock !== latestBlock;

  // Construct the context value to be provided to consumers
  const contextValue: MudContextValueType = {
    ...(networkConfig as SetupFunctionReturnT), // Spread the network configuration
    sync: {
      isSyncing,
      progress,
      live,
      logCount,
      syncedAtLeastOnce,
      currentBlock: currentBlock ?? 0n, // Default to 0n if null
      latestBlock: latestBlock ?? 0n, // Default to 0n if null
    },
    networkSetupState: {
      isSettingUp,
      error,
    },
  };

  // Display loading message if networkConfig or walletClient is not yet available
  if (!networkConfig || !walletClient) {
    return <div>Loading MUD configuration...</div>;
  }

  // Display error message if an error occurred during setup
  if (error) {
    return <div>Error setting up MUD: {error.message}</div>;
  }

  /**
   * @summary Handles switching the network in the wallet.
   * @description Prompts the user to add or switch to the required network.
   */
  const handleSwitchNetwork = () => {
    if (!walletClient.chain) {
      return;
    }

    // Request the wallet to add or switch to the current chain
    walletClient.addChain({
      chain: {
        id: walletClient.chain.id,
        name: walletClient.chain.name,
        rpcUrls: walletClient.chain.rpcUrls,
        nativeCurrency: walletClient.chain.nativeCurrency,
        blockExplorers: walletClient.chain.blockExplorers,
      },
    });
  };

  return (
    <MudContext.Provider value={contextValue}>
      {isCurrentChain ? (
        children // Render children if the current chain is correct
      ) : (
        // Prompt to switch network if on the wrong chain
        <div className="flex flex-col items-center justify-center h-full">
          <>{`Switch network to ${walletClient.chain?.name} to continue`}</>
          <Button variant="primary-default" onClick={handleSwitchNetwork}>
            Add/Switch Network
          </Button>
        </div>
      )}
    </MudContext.Provider>
  );
};
