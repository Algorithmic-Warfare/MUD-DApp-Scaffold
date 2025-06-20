import React from "react";
import { useMUD } from "src/providers/mud/MudContext";

const MudSyncStatusView: React.FC = () => {
  const { sync } = useMUD();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">MUD Sync Status</h2>
      <div className="mt-2">
        <p>Sync Status: {sync.isSyncing ? "Syncing" : "Not Syncing"}</p>
        <p>Synced At Least Once: {sync.syncedAtLeastOnce ? "Yes" : "No"}</p>
        <p>Current Block: {sync.currentBlock.toString()}</p>
        <p>Latest Block: {sync.latestBlock.toString()}</p>
        <p>Progress: {sync.progress.toFixed(2)}%</p>
        <p>Log Count: {sync.logCount}</p>
      </div>
    </div>
  );
};

export default MudSyncStatusView;
