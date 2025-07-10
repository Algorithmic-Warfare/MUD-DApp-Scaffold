import { MUDChain, mudFoundry, pyrope } from "@latticexyz/common/chains";

export const supportedChains: MUDChain[] = [mudFoundry, pyrope];

export function getSupportedChain(chainId: number): MUDChain | undefined {
  const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
  const chain = supportedChains[chainIndex];

  return chain;
}
