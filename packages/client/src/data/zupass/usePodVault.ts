import { useCallback, useState } from "react";
import { connect as connectZapp, ParcnetAPI } from "@parcnet-js/app-connector";
import * as p from "@parcnet-js/podspec";
import { zAppConfig } from "./config";
import { POD, PODEntries } from "@pcd/pod";

export type PodVaultStatus = "offline" | "connecting" | "connected";

const query = p.pod({
  entries: {},
});

export enum TransactionType {
  Withdraw = 0,
  Deposit = 1,
}

export type TransactionPodEntries = {
  transactionType: TransactionType;
  itemId: bigint;
  itemQuantity: bigint;
  transacteeAddress: string;
  SsuId: bigint;
  timestamp: bigint;
};

export function usePodVault() {
  const [status, setStatus] = useState<PodVaultStatus>("offline");
  const [zApp, setZApp] = useState<ParcnetAPI>();
  const [pods, setPods] = useState<p.PODData[]>([]);

  const connect = useCallback(async () => {
    if (status !== "offline") {
      throw new Error("Cannot connect to Zupass if not offline");
    }
    const iframeContainer = document.getElementById("zupass-container");
    if (!iframeContainer) {
      throw new Error("Could not find zupass-container element");
    }
    setStatus("connecting");
    const z = await connectZapp(
      zAppConfig,
      iframeContainer,
      "https://zupass.org"
    );
    const sub = await z.pod.collection(zAppConfig.collection).subscribe(query);
    const pods = await z.pod.collection(zAppConfig.collection).query(query);
    setPods(pods);
    sub.on("update", (pods) => {
      setPods(pods);
    });
    setZApp(z);
    setStatus("connected");
  }, [status]);

  const store = useCallback(
    async (podJson: string) => {
      if (!zApp) {
        throw new Error("Zapp not connected");
      }
      const pod = POD.fromJSON(JSON.parse(podJson));
      await zApp.pod.collection(zAppConfig.collection).insert({
        entries: pod.content.asEntries(),
        signature: pod.signature,
        signerPublicKey: pod.signerPublicKey,
      });
    },
    [zApp]
  );

  const prove = useCallback(
    async (proofRequestJson: string) => {
      if (!zApp) {
        throw new Error("Zapp not connected");
      }
      const proofRequest = JSON.parse(proofRequestJson);
      return await zApp.gpc.prove({ request: proofRequest });
    },
    [zApp]
  );

  const remove = useCallback(
    async (signature: string) => {
      if (!zApp) {
        throw new Error("Zapp not connected");
      }
      await zApp.pod.collection(zAppConfig.collection).delete(signature);
    },
    [zApp]
  );

  const issueTransactionPod = useCallback(
    async (transaction: TransactionPodEntries) => {
      if (!zApp) {
        throw new Error("Zapp not connected");
      }
      const podData: PODEntries = {
        pod_type: { type: "string", value: "hacking-protocol.transaction" },
        transactionType: {
          type: "int",
          value: BigInt(transaction.transactionType),
        },
        itemId: { type: "int", value: transaction.itemId },
        itemQuantity: {
          type: "int",
          value: transaction.itemQuantity,
        },
        transacteeAddress: {
          type: "string",
          value: transaction.transacteeAddress,
        },
        SsuId: { type: "int", value: transaction.SsuId },
        timestamp: {
          type: "date",
          value: new Date(Number(transaction.timestamp)),
        },
      };
      const signedPod = await zApp.pod.sign(podData);
      return POD.load(
        signedPod.entries,
        signedPod.signature,
        signedPod.signerPublicKey
      );
    },
    [zApp]
  );

  return { status, pods, connect, store, prove, remove, issueTransactionPod };
}
