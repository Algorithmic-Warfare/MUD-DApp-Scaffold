import { useCallback } from "react";
import { POD } from "@pcd/pod";

const privateSigningKey =
  "cbb65811cf0ba67f541b19610c3c443303a2f8ed70e7d9a9f5e70b8062256af8";

export function usePodIssuer() {
  const issue = useCallback(async (entriesJson: string) => {
    const entries = JSON.parse(entriesJson);
    return await POD.sign(entries, privateSigningKey);
  }, []);

  return { issue };
}
