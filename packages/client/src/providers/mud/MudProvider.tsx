import React, { ReactNode, useEffect, useState } from "react";
import { setup } from "../../data/mud/setup";
import { StorageAdapterBlock } from "@latticexyz/store-sync";
import { SetupFunctionReturnT } from "../../data/mud/types";
import MudContext from "./MudContext";
import { MudContextValue } from "./MudContext";
import { useConnection } from "src/providers/wallet";
import { useWorld } from "../world";
import { Button } from "@/components/ui/Button";
import mountDevTools from "../../data/mud/debug/mountDevTools";

type MudProviderProps = {
  children: ReactNode;
};

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
  const [networkConfig, setNetworkConfig] =
    useState<SetupFunctionReturnT | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [currentBlock, setCurrentBlock] = useState<bigint | null>(null);
  const [latestBlock, setLatestBlock] = useState<bigint | null>(null);
  const [logCount, setLogCount] = useState(0);
  const [syncedAtLeastOnce, setSyncedAtLeastOnce] = useState(false);

  const {
    connectedProvider,
    publicClient,
    walletClient,
    isCurrentChain,
    defaultChain,
  } = useConnection();

  const { worldAddress } = useWorld();

  const { connected } = connectedProvider;

  const isDevelopment = import.meta.env.MODE === "development";

  // Effect for MUD network setup
  useEffect(() => {
    if (
      !connected ||
      !publicClient ||
      !walletClient ||
      !defaultChain ||
      networkConfig
    )
      return;

    const setupMud = async () => {
      try {
        setIsSettingUp(true);
        setError(null);

        const result = await setup(
          publicClient,
          walletClient,
          defaultChain.id,
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
  }, [
    connected,
    publicClient,
    walletClient,
    networkConfig,
    defaultChain,
    worldAddress,
  ]);

  // Effect for MUD sync state
  useEffect(() => {
    if (!networkConfig) return;

    const blockSub = networkConfig.network.storedBlockLogs$.subscribe(
      (block: StorageAdapterBlock) => {
        setCurrentBlock(block.blockNumber);
        setLogCount((prev) => prev + block.logs.length);
      }
    );

    const latestBlockSub = networkConfig.network.latestBlockNumber$.subscribe(
      (blockNumber: bigint) => {
        setLatestBlock(blockNumber);
      }
    );

    return () => {
      blockSub.unsubscribe();
      latestBlockSub.unsubscribe();
    };
  }, [networkConfig]);

  // Effect for MUD Dev Tools
  useEffect(() => {
    if (isDevelopment && networkConfig) {
      mountDevTools(networkConfig);
    }
  }, [isDevelopment, networkConfig]);

  const progress =
    currentBlock && latestBlock
      ? Number((currentBlock * 100n) / latestBlock)
      : 0;

  const live = progress === 100;

  if (!syncedAtLeastOnce && live) {
    setSyncedAtLeastOnce(true);
  }

  const isSyncing = currentBlock !== latestBlock;

  const contextValue: MudContextValue = {
    ...(networkConfig as SetupFunctionReturnT), // Cast as SetupFunctionReturnT, will be null if not set up
    sync: {
      isSyncing,
      progress,
      live,
      logCount,
      syncedAtLeastOnce,
      currentBlock: currentBlock ?? 0n,
      latestBlock: latestBlock ?? 0n,
    },
    network: {
      networkConfig,
      isSettingUp,
      error,
    },
  };

  if (!networkConfig || !walletClient) {
    return <div>Loading MUD configuration...</div>;
  }

  if (error) {
    return <div>Error setting up MUD: {error.message}</div>;
  }

  const handleSwitchNetwork = () => {
    if (!walletClient.chain) {
      return;
    }

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
        children
      ) : (
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
