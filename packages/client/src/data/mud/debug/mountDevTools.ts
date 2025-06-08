import mudConfig from "contracts/mud.config";
import {
  type Chain,
  type PublicClient,
  type WalletClient,
  type Abi,
} from "viem";
import { type setup } from "../setup";

export default async function mountDevTools(
  result: Awaited<ReturnType<typeof setup>>
) {
  const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
  mountDevTools({
    config: mudConfig,
    //@ts-ignore
    publicClient: result.network.publicClient as PublicClient &
      Required<Pick<PublicClient, "chain">>,
    //@ts-ignore
    walletClient: result.network.walletClient as WalletClient &
      Required<Pick<WalletClient, "chain">>,
    latestBlock$: result.network.latestBlock$,
    storedBlockLogs$: result.network.storedBlockLogs$,
    worldAddress: result.network.worldContract.address,
    worldAbi: result.network.worldContract.abi as Abi,
    write$: result.network.write$,
    useStore: result.network.useStore,
  });
}
