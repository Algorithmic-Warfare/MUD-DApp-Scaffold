import { useMemo } from "react";
import { initialProgress, SyncProgress } from "@latticexyz/store-sync/internal";
import { SyncStep } from "@latticexyz/store-sync";
import { getRecord } from "@latticexyz/stash/internal";
import { useStash } from "@latticexyz/stash/react";

import { stash } from "src/data/mud/stash";

export function useSyncProgress() {
  const progress = useStash(stash, (state) =>
    getRecord({
      state,
      table: SyncProgress,
      key: {},
      defaultValue: initialProgress,
    })
  );

  return useMemo(
    () => ({
      ...progress,
      isLive: progress.step === SyncStep.LIVE,
    }),
    [progress]
  );
}
