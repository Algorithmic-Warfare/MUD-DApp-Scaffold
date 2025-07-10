import { getBurnerPrivateKey } from "@latticexyz/common";
import worlds from "contracts/worlds.json";

import { Hex } from "viem";

import { supportedChains } from "./supportedChains";
import { ChainIdT, WorldAddressT } from "../types";

export async function getNetworkConfig(
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
) {
  const params = new URLSearchParams(window.location.search);

  const chainId =
    __chainId ||
    Number(
      params.get("chainId") ||
        params.get("chainid") ||
        import.meta.env.VITE_CHAIN_ID
    );

  if (!chainId) {
    throw new Error(
      "No chainId provided. Please provide a chainId in the URL query string or set the VITE_CHAIN_ID environment variable."
    );
  }

  /*
   * Find the chain (unless it isn't in the list of supported chains).
   */
  const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
  const chain = supportedChains[chainIndex];

  if (!chain) {
    throw new Error(`Chain ${chainId} not found`);
  }

  /*
   * Get the address of the World. If you want to use a
   * different address than the one in worlds.json,
   * provide it as worldAddress in the query string.
   */
  const world = worlds[chain.id.toString()];
  const worldAddress =
    __worldAddress ||
    params.get("worldAddress") ||
    world?.address ||
    import.meta.env.VITE_WORLD_ADDRESS;

  if (!worldAddress) {
    throw new Error(
      `No world address found for chain ${chainId}. Did you run \`mud deploy\`?`
    );
  }

  /*
   * MUD clients use events to synchronize the database, meaning
   * they need to look as far back as when the World was started.
   * The block number for the World start can be specified either
   * on the URL (as initialBlockNumber) or in the worlds.json
   * file. If neither has it, it starts at the first block, zero.
   */
  const initialBlockNumber = params.has("initialBlockNumber")
    ? Number(params.get("initialBlockNumber"))
    : world?.blockNumber ?? 0n;

  return {
    privateKey: import.meta.env.VITE_PRIVATE_KEY ?? getBurnerPrivateKey(),
    chainId,
    chain,
    faucetServiceUrl: params.get("faucet") ?? chain.faucetUrl,
    worldAddress,
    initialBlockNumber,
  };
}
