import contracts_mudWorldConfig from "contracts/mud.config";
import eveworld_mudWorldConfig from "@eveworld/world-v2/mud.config";
import { PublicClient, WalletClient, Transport, Chain, type Abi } from "viem";
import { type setup } from "../setup";

export default async function mountDevTools(
  result: Awaited<ReturnType<typeof setup>>
) {
  const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
  mountDevTools({
    config: result.network.config as any, // Cast to any to avoid type issues
    publicClient: result.network.publicClient as PublicClient<Transport, Chain>,
    walletClient: result.network.walletClient as WalletClient<Transport, Chain>,
    latestBlock$: result.network.latestBlock$,
    storedBlockLogs$: result.network.storedBlockLogs$,
    worldAddress: result.network.worldContract.address,
    worldAbi: result.network.worldContract.abi as Abi,
    write$: result.network.write$,
    useStore: result.network.useStore,
  });
}
