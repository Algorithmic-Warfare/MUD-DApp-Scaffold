import { useState } from "react";
import { useZupassContext } from "src/data/zupass/ZupassContext";
import { PodVaultDemo } from "./PodVaultDemo";
import { TransactionPodDemo } from "./TransactionPodDemo";
import { Button } from "src/components/ui/Button";

function DevPages() {
  const [page, setPage] = useState<"vault" | "transaction">("vault");

  const { podVault } = useZupassContext();

  return (
    <div className="p-2">
      {podVault.status === "connected" ? (
        <>
          <div className="flex justify-center items-center gap-4">
            <Button variant="outline" onClick={() => setPage("vault")}>
              Vault
            </Button>
            <Button variant="outline" onClick={() => setPage("transaction")}>
              Transaction PODs
            </Button>
          </div>
          {page === "vault" && <PodVaultDemo />}
          {page === "transaction" && <TransactionPodDemo />}
        </>
      ) : (
        <>
          {podVault.status === "offline" ? (
            <Button variant="outline" onClick={podVault.connect}>
              Connect to Zupass
            </Button>
          ) : (
            <div>Connecting...</div>
          )}
        </>
      )}
    </div>
  );
}

export default DevPages;
