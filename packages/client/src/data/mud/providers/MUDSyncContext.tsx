import React, { createContext, useContext, useEffect, useState } from "react";

import { useMUD } from "./MUDContext";

interface MUDSyncState {
  isSyncing: boolean;
  live: boolean;
  syncedAtLeastOnce: boolean;
  currentBlock: bigint;
  latestBlock: bigint;
  progress: number;
  logCount: number;
}

interface MUDSyncContextValue extends MUDSyncState {}

const MUDSyncContext = createContext<MUDSyncContextValue | null>(null);

export function useMUDSyncContext() {
  const context = useContext(MUDSyncContext);
  if (!context) {
    throw new Error("useSyncContext must be used within a SyncProvider");
  }
  return context;
}

interface MUDSyncProviderProps {
  children: React.ReactNode;
}

const MUDSyncProvider: React.FC<MUDSyncProviderProps> = ({
  children,
}: MUDSyncProviderProps) => {
  const { network } = useMUD();
  const [currentBlock, setCurrentBlock] = useState<bigint | null>(null);
  const [latestBlock, setLatestBlock] = useState<bigint | null>(null);
  const [logCount, setLogCount] = useState(0);
  const [syncedAtLeastOnce, setSyncedAtLeastOnce] = useState(false);

  useEffect(() => {
    const blockSub = network.storedBlockLogs$.subscribe(
      ({ blockNumber, logs }) => {
        setCurrentBlock(blockNumber);
        setLogCount((prev) => prev + logs.length);
      }
    );

    const latestBlockSub = network.latestBlockNumber$.subscribe(
      (blockNumber) => {
        setLatestBlock(blockNumber);
      }
    );

    return () => {
      blockSub.unsubscribe();
      latestBlockSub.unsubscribe();
    };
  }, [network]);

  const progress =
    currentBlock && latestBlock
      ? Number((currentBlock * 100n) / latestBlock)
      : 0;

  const live = progress === 100;

  if (!syncedAtLeastOnce && live) {
    setSyncedAtLeastOnce(true);
  }

  const isSyncing = currentBlock !== latestBlock;

  return (
    <MUDSyncContext.Provider
      value={{
        isSyncing,
        progress,
        live,
        logCount,
        syncedAtLeastOnce,
        currentBlock: currentBlock ?? 0n,
        latestBlock: latestBlock ?? 0n,
      }}
    >
      {children}
    </MUDSyncContext.Provider>
  );
};

export default MUDSyncProvider;

export const useMUDSync = () => {
  const {
    isSyncing,
    progress,
    logCount,
    live,
    syncedAtLeastOnce,
    currentBlock,
    latestBlock,
  } = useMUDSyncContext();
  return {
    isSyncing,
    progress,
    logCount,
    live,
    syncedAtLeastOnce,
    currentBlock,
    latestBlock,
  };
};
