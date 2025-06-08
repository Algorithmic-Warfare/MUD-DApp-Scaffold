import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SetupResult } from "../../data/mud/setup";

/**
 * Combined MUD context value including both setup and synchronization state
 */
interface MudContextValue extends SetupResult {
  sync: {
    isSyncing: boolean;
    live: boolean;
    syncedAtLeastOnce: boolean;
    currentBlock: bigint;
    latestBlock: bigint;
    progress: number;
    logCount: number;
  };
}

const MudContext = createContext<MudContextValue | null>(null);

type MudProviderProps = {
  children: ReactNode;
  config: SetupResult;
};

/**
 * Unified provider component handling both MUD setup and synchronization state
 */
export const MudProvider = ({ children, config }: MudProviderProps) => {
  const currentValue = useContext(MudContext);
  if (currentValue) throw new Error("MudProvider can only be used once");

  const [currentBlock, setCurrentBlock] = useState<bigint | null>(null);
  const [latestBlock, setLatestBlock] = useState<bigint | null>(null);
  const [logCount, setLogCount] = useState(0);
  const [syncedAtLeastOnce, setSyncedAtLeastOnce] = useState(false);

  useEffect(() => {
    const blockSub = config.network.storedBlockLogs$.subscribe(
      ({ blockNumber, logs }) => {
        setCurrentBlock(blockNumber);
        setLogCount((prev) => prev + logs.length);
      }
    );

    const latestBlockSub = config.network.latestBlockNumber$.subscribe(
      (blockNumber) => {
        setLatestBlock(blockNumber);
      }
    );

    return () => {
      blockSub.unsubscribe();
      latestBlockSub.unsubscribe();
    };
  }, [config.network]);

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
    ...config,
    sync: {
      isSyncing,
      progress,
      live,
      logCount,
      syncedAtLeastOnce,
      currentBlock: currentBlock ?? 0n,
      latestBlock: latestBlock ?? 0n,
    },
  };

  return (
    <MudContext.Provider value={contextValue}>{children}</MudContext.Provider>
  );
};

/**
 * Unified hook to access both MUD setup and synchronization state
 */
export const useMUD = (): MudContextValue => {
  const value = useContext(MudContext);
  if (!value) throw new Error("Must be used within a MudProvider");
  return value;
};
