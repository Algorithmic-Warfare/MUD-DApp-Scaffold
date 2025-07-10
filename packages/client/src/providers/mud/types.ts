import { SetupResultT } from "@/data/mud/types";
import { ReactNode } from "react";
export type MudProviderProps = {
  children: ReactNode;
};

export interface MudContextValueType extends SetupResultT {
  sync: {
    isSyncing: boolean;
    live: boolean;
    syncedAtLeastOnce: boolean;
    currentBlock: bigint;
    latestBlock: bigint;
    progress: number;
    logCount: number;
  };
  networkSetupState: {
    isSettingUp: boolean;
    error: Error | null;
  };
}
