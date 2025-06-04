import { Address } from "viem";

type WorldDeploy = {
  chainId: number;
  address: Address;
  blockNumber: bigint | null;
};

export async function getWorldDeploy(): Promise<WorldDeploy> {
  const chainId = parseInt(import.meta.env.VITE_CHAIN_ID) || 31337;
  const address: Address = import.meta.env.VITE_WORLD_ADDRESS || "0x";

  return { chainId, address, blockNumber: null };
}
