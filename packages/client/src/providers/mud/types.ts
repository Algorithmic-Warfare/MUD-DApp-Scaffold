import { SetupResultT } from "@/data/mud/types";
import { ReactNode } from "react";

/**
 * @summary Props for the MudProvider component.
 */
export type MudProviderProps = {
  /**
   * @description The child components that will have access to the MUD context.
   */
  children: ReactNode;
};

/**
 * @summary Defines the structure of the value provided by the MudContext.
 * @description Extends `SetupResultT` with additional synchronization and network setup state.
 */
export interface MudContextValueType extends SetupResultT {
  /**
   * @summary Synchronization status of the MUD network.
   */
  sync: {
    /**
     * @description True if the MUD network is currently syncing.
     */
    isSyncing: boolean;
    /**
     * @description True if the MUD network is live and fully synced.
     */
    live: boolean;
    /**
     * @description True if the MUD network has synced at least once.
     */
    syncedAtLeastOnce: boolean;
    /**
     * @description The current block number being processed.
     */
    currentBlock: bigint;
    /**
     * @description The latest block number available on the network.
     */
    latestBlock: bigint;
    /**
     * @description The synchronization progress as a percentage (0-100).
     */
    progress: number;
    /**
     * @description The number of logs processed during synchronization.
     */
    logCount: number;
  };
  /**
   * @summary State related to the MUD network setup process.
   */
  networkSetupState: {
    /**
     * @description True if the network setup is currently in progress.
     */
    isSettingUp: boolean;
    /**
     * @description Any error encountered during the network setup, or null if no error.
     */
    error: Error | null;
  };
}
