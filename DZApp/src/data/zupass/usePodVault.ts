import { useCallback, useState } from "react";
import { connect as connectZapp, ParcnetAPI } from "@parcnet-js/app-connector";
import * as p from "@parcnet-js/podspec";
import { zAppConfig } from "./config";
import { POD } from "@pcd/pod";

export type PodVaultStatus = "offline" | "connecting" | "connected";

const query = p.pod({
  entries: {
    pod_type: { type: "string" },
  },
});

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
  return { status, pods, connect, store, prove, remove };
}
