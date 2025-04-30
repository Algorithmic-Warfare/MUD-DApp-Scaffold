import { FC, useState } from "react";
import { POD, PODEntries } from "@pcd/pod";
import { usePodIssuer } from "src/data/zupass/usePodIssuer";

const defaultPodEntries: PODEntries = {
  hash: {
    type: "string",
    value: "0x6d11ac8f376b6284a7e5d62a340f71869b306312",
  },
  role: {
    type: "string",
    value: "coordinator",
  },
  pod_type: { type: "string", value: "hacking-protocol.security_badge" },
};

export const PodIssuerDemo: FC = () => {
  const [podData, setPodData] = useState<string>(
    JSON.stringify(defaultPodEntries, null, 2)
  );
  const [issuedPod, setIssuedPod] = useState<POD>();
  const { issue } = usePodIssuer();

  async function handleIssue() {
    const pod = await issue(podData);
    setIssuedPod(pod);
  }

  return (
    <div>
      <h2>Issue a POD</h2>
      <textarea
        placeholder="Enter POD entries..."
        rows={30}
        value={podData}
        onChange={(e) => setPodData(e.target.value)}
      ></textarea>
      <button onClick={handleIssue}>Issue</button>
      {issuedPod && <pre>{JSON.stringify(issuedPod.toJSON(), null, 2)}</pre>}
    </div>
  );
};
