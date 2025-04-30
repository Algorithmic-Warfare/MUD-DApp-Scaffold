import { useState } from "react";
import { PodVaultDemo } from "./PodVaultDemo";
import { PodIssuerDemo } from "./PodIssuerDemo";

function DevIndex() {
  const [page, setPage] = useState<"vault" | "issuer">("vault");

  return (
    <div className="p-2">
      <div className="flex justify-center items-center gap-4">
        <button onClick={() => setPage("vault")} className="white-button">
          Vault
        </button>
        <button onClick={() => setPage("issuer")} className="white-button">
          Issuer
        </button>
      </div>
      {page === "vault" && <PodVaultDemo />}
      {page === "issuer" && <PodIssuerDemo />}
    </div>
  );
}

export default DevIndex;
