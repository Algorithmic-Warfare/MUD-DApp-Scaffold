import { createContext, useContext } from "react";
import { SetupResult } from "../../data/mud/setup";

/**
 * @summary Context for MUD setup and synchronization state
 * @description Provides access to the combined MUD setup result and synchronization status.
 *
 * @property {SetupResult} setup - The result of the MUD setup process.
 * @property {object} sync - Synchronization status.
 * @property {boolean} sync.isSyncing - Whether the MUD is currently syncing.
 * @property {boolean} sync.live - Whether the MUD is live and fully synced.
 * @property {boolean} sync.syncedAtLeastOnce - Whether the MUD has synced at least once.
 * @property {bigint} sync.currentBlock - The current block number.
 * @property {bigint} sync.latestBlock - The latest block number.
 * @property {number} sync.progress - The synchronization progress (0-100).
 * @property {number} sync.logCount - The number of logs processed.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Consumption**: Prefer the `useMud` hook for accessing this context.
 * - **Null States**: The context value will be null if the `MudProvider` is not initialized.
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

export const useMud = (): MudContextValue => {
  const value = useContext(MudContext);
  if (!value) throw new Error("Must be used within a MudProvider");
  return value;
};

/**
 * @summary Hook to access MUD setup and synchronization state
 * @description Provides MUD config, loading status, and sync status.
 *
 * @returns {MudContextValue} Current MUD context value.
 *
 * @example
 * const { config, sync } = useMud();
 * if (sync.isSyncing) return <Loader />;
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Performance**: Lightweight - safe for frequent calls.
 * - **Dependencies**: Requires `MudProvider` parent.
 * - **Alternatives**: For simple checks, create derived hooks.
 */

export default MudContext;
