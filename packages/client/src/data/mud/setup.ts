/*
 * This file sets up all the definitions required for a MUD client.
 */

import {
  createPublicClient,
  createWalletClient,
  Hex,
  WalletClient,
  PublicClient,
} from "viem";

import { createClientComponents } from "./systems/createClientComponents";
import { createSystemCalls } from "./systems/createSystemCalls";
import { setupNetwork } from "./network/setupNetwork";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup(
  __publicClient: ReturnType<typeof createPublicClient>,
  __walletClient: ReturnType<typeof createWalletClient>,
  __chainId: number,
  __worldAddress: Hex
): Promise<{
  network: Awaited<ReturnType<typeof setupNetwork>>;
  systemCalls: ReturnType<typeof createSystemCalls>;
  components: ReturnType<typeof createClientComponents>;
}> {
  const network = await setupNetwork(
    __publicClient,
    __walletClient,
    __chainId,
    __worldAddress
  );
  const components = createClientComponents(network);
  const systemCalls = createSystemCalls(network);

  return {
    network,
    components,
    systemCalls,
  };
}
