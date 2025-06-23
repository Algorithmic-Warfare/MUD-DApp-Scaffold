import { useMud } from "@/providers/mud";
import { Progress } from "@/components/ui/progress";

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
