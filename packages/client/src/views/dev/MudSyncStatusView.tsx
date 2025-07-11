import React from "react";
import { useMud } from "@/providers/mud";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { Progress } from "@/components/ui/progress";

const MudSyncStatusView: React.FC = () => {
  const { sync } = useMud();

  const statusData = [
    { label: "Sync Status", value: sync.isSyncing ? "Syncing" : "Not Syncing" },
    {
      label: "Synced At Least Once",
      value: sync.syncedAtLeastOnce ? "Yes" : "No",
    },
    { label: "Current Block", value: sync.currentBlock.toString() },
    { label: "Latest Block", value: sync.latestBlock.toString() },
    { label: "Log Count", value: sync.logCount },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">MUD Sync Status</h2>
      <Table>
        <TableBody>
          {statusData.map((item) => (
            <TableRow key={item.label}>
              <TableCell className="font-medium">{item.label}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">Progress</TableCell>
            <TableCell>
              <Progress value={sync.progress} className="w-[100px]" />
              <span className="ml-2">{sync.progress.toFixed(2)}%</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MudSyncStatusView;
