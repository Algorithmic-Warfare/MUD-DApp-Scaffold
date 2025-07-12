/**
 * @file
 * @summary Provides a MUD synchronization loader component.
 * @description This file exports the `SyncLoader` component, which displays the current
 * synchronization status of the MUD (Multi-chain Decentralized) network. It shows a
 * progress bar and text indicating the current block being synced against the latest block.
 *
 * @exports SyncLoader - A component that displays MUD synchronization progress.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Status Indicator**: Use this component to provide real-time feedback on the MUD network's synchronization status.
 * - **Data Source**: Relies on the `useMud` hook to access MUD synchronization data.
 * - **Conditional Rendering**: The display text changes based on whether the network is actively syncing or initializing.
 */
import { useMud } from "@/providers/mud";
import { Progress } from "@/components/ui/progress";

/**
 * @summary A MUD synchronization loader component.
 * @description This component fetches MUD synchronization data using the `useMud` hook
 * and renders a progress bar along with textual information about the current
 * synchronization status (e.g., syncing blocks, percentage complete, or initializing).
 *
 * @returns {JSX.Element} A React element displaying the MUD synchronization loader.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Data Consumption**: Directly consumes data from the `MudContext` via `useMud`.
 * - **UI Elements**: Integrates the `Progress` component to visualize the synchronization progress.
 * - **User Experience**: Provides clear feedback during potentially long synchronization processes.
 */
export const SyncLoader = () => {
  const {
    sync: { isSyncing, progress, currentBlock, latestBlock },
  } = useMud();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-64 text-center">
        <Progress value={progress} />
        <div className="mt-2 text-sm">
          {isSyncing ? (
            <>
              Syncing block {currentBlock.toString()} of{" "}
              {latestBlock.toString()}
              <br />({progress.toFixed(0)}% complete)
            </>
          ) : (
            "Initializing..."
          )}
        </div>
      </div>
    </div>
  );
};
