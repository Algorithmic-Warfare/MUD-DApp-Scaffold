//@ts-nocheck
import mudConfig from "contracts/mud.config";

import { setup } from "./setup";

export default async function mountDevTools(
  result: Awaited<ReturnType<typeof setup>>
) {
  const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
  mountDevTools({
    config: mudConfig,
    publicClient: result.network.publicClient,
    walletClient: result.network.walletClient,
    latestBlock$: result.network.latestBlock$,
    storedBlockLogs$: result.network.storedBlockLogs$,
    worldAddress: result.network.worldContract.address,
    worldAbi: result.network.worldContract.abi,
    write$: result.network.write$,
    useStore: result.network.useStore,
  });
}
