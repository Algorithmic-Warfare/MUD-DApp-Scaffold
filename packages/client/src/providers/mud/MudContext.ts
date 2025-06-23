import { createContext, useContext } from "react";
import { SetupResult } from "../../data/mud/setup";

/**
 * Combined MUD context value including both setup and synchronization state
 */
export interface MudContextValue extends SetupResult {
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

/**
 * Unified hook to access both MUD setup and synchronization state
 */
export const useMud = (): MudContextValue => {
  const value = useContext(MudContext);
  if (!value) throw new Error("Must be used within a MudProvider");
  return value;
};

export default MudContext;
