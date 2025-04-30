import { FC, useState } from "react";
import { useZupassContext } from "src/data/zupass/ZupassContext";
import * as p from "@parcnet-js/podspec";
import { Button } from "src/components/ui/Button";
import { POD } from "@pcd/pod";

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
  const { podVault } = useZupassContext();

  async function handleProve() {
    const proof = await podVault.prove(proofRequest);
    setProof(JSON.stringify(proof, null, 2));
  }

  return (
    <div className="flex flex-col p-2">
      <h2 className="text-xl font-bold">Store a POD</h2>
      <textarea
        placeholder="Enter your POD here..."
        rows={10}
        value={podData}
        onChange={(e) => setPodData(e.target.value)}
        className="w-full"
      ></textarea>
      <Button onClick={() => podVault.store(podData)}>Store</Button>

      <h2 className="text-xl font-bold">Prove</h2>
      <textarea
        placeholder="Enter your proof request here..."
        rows={20}
        value={proofRequest}
        onChange={(e) => setProofRequest(e.target.value)}
        className="w-full"
      ></textarea>
      <Button onClick={handleProve}>Prove</Button>
      {proof && <pre>{proof}</pre>}
      <h2 className="text-xl font-bold">My PODs</h2>
      <div>
        {podVault.pods.map((pod) => {
          const p = POD.load(pod.entries, pod.signature, pod.signerPublicKey);
          return (
            <details key={pod.signature}>
              <summary>{pod.signature}</summary>
              <pre>{JSON.stringify(p, null, 2)}</pre>
              <button onClick={() => podVault.remove(pod.signature)}>
                Remove
              </button>
            </details>
          );
        })}
      </div>
    </div>
  );
};
