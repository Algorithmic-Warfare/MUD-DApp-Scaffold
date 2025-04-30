import { FC, useState } from "react";
import { usePodVault } from "src/data/zupass/usePodVault";
import * as p from "@parcnet-js/podspec";

const defaultProofRequest: p.PodspecProofRequest = {
  pods: {
    pod1: {
      pod: {
        entries: {
          role: {
            type: "string",
            isMemberOf: [{ type: "string", value: "agent" }],
          },
          hash: { type: "string" },
          pod_type: {
            type: "string",
            value: "hacking-protocol.security_badge",
          },
        },
      },
      revealed: {
        hash: true,
      },
    },
  },
};

export const PodVaultDemo: FC = () => {
  const [podData, setPodData] = useState<string>("");
  const [proofRequest, setProofRequest] = useState<string>(
    JSON.stringify(defaultProofRequest, null, 2)
  );
  const [proof, setProof] = useState<string>("");
  const { status, pods, connect, store, prove, remove } = usePodVault();

  async function handleProve() {
    const proof = await prove(proofRequest);
    setProof(JSON.stringify(proof, null, 2));
  }

  return (
    <div className="flex flex-col justify-center items-center p-2">
      {status === "offline" && (
        <button onClick={connect}>Connect to Zupass</button>
      )}
      {status === "connecting" && <div>Connecting...</div>}
      {status === "connected" && (
        <>
          <h2>Store a POD</h2>
          <textarea
            placeholder="Enter your POD here..."
            rows={10}
            value={podData}
            onChange={(e) => setPodData(e.target.value)}
            className="w-full"
          ></textarea>
          <button onClick={() => store(podData)}>Store</button>

          <h2>Prove</h2>
          <textarea
            placeholder="Enter your proof request here..."
            rows={20}
            value={proofRequest}
            onChange={(e) => setProofRequest(e.target.value)}
            className="w-full"
          ></textarea>
          <button onClick={handleProve}>Prove</button>
          {proof && <pre>{proof}</pre>}

          <h2>My PODs</h2>
          <div>
            {pods.map((pod) => (
              <details key={pod.signature}>
                <summary>{pod.signature}</summary>
                <pre>{JSON.stringify(pod, null, 2)}</pre>
                <button onClick={() => remove(pod.signature)}>Remove</button>
              </details>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
