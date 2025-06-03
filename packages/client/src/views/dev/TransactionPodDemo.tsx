import { FC, useState } from "react";
import { POD } from "@pcd/pod";
import { z } from "zod";
import { Button } from "src/components/ui/Button";
import { useZupassContext } from "src/data/zupass/ZupassContext";
import { zodParse } from "src/utils/validation";

const defaultEntries = {
  transactionType: 0,
  itemId: 1234567890,
  itemQuantity: 100,
  transacteeAddress: "0xAaAB55b1b65Eac23EC94B11FFdf20C2a9d4E3c4D",
  SsuId: 9999999,
  timestamp: 1746020716794,
};

const entriesSchema = z.object({
  transactionType: z.coerce.number(),
  itemId: z.coerce.bigint(),
  itemQuantity: z.coerce.bigint(),
  transacteeAddress: z.string(),
  SsuId: z.coerce.bigint(),
  timestamp: z.coerce.bigint(),
});

export const TransactionPodDemo: FC = () => {
  const [podData, setPodData] = useState<string>(
    JSON.stringify(defaultEntries, null, 2)
  );
  const [issuedPod, setIssuedPod] = useState<POD>();
  const { podVault } = useZupassContext();

  async function handleIssue() {
    try {
      const parsed = zodParse(entriesSchema, JSON.parse(podData));
      const pod = await podVault.issueTransactionPod(parsed);
      setIssuedPod(pod);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col p-2">
      <h2 className="text-xl font-bold">Issue a POD</h2>
      <textarea
        placeholder="Enter POD entries..."
        rows={30}
        value={podData}
        onChange={(e) => setPodData(e.target.value)}
      ></textarea>
      <Button onClick={handleIssue}>Issue</Button>
      {issuedPod && <pre>{JSON.stringify(issuedPod.toJSON(), null, 2)}</pre>}
    </div>
  );
};
