import { Address } from "viem";

export async function getWorldDeploy(): Promise<{
  chainId: number;
  address: Address;
  blockNumber: bigint | null;
}> {
  const chainId = parseInt(import.meta.env.VITE_CHAIN_ID) || 31337;
  const address: Address = import.meta.env.VITE_WORLD_ADDRESS || "0x";

  return { chainId, address, blockNumber: null };
}
