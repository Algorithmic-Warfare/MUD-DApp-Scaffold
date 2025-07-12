/**
 * @file
 * @summary Mounts MUD development tools for debugging and inspection.
 * @description This file provides a function to integrate the `@latticexyz/dev-tools`
 * into the client application. It takes the result of the MUD setup and
 * configures the dev tools to display relevant MUD network and contract information.
 *
 * @exports default - Asynchronous function to mount the MUD dev tools.
 */
import contracts_mudWorldConfig from "contracts/mud.config";
import eveworld_mudWorldConfig from "@eveworld/world-v2/mud.config";
import { PublicClient, WalletClient, Transport, Chain, type Abi } from "viem";
import { type setup } from "../setup";

/**
 * @summary Mounts the MUD development tools.
 * @description Initializes and displays the MUD dev tools in the browser,
 * providing insights into the MUD network state, components, and transactions.
 *
 * @param {Awaited<ReturnType<typeof setup>>} result - The comprehensive result object from the MUD setup process.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Debugging Aid**: This function is primarily for development and debugging purposes.
 * - **Configuration**: It requires the `result` object from `setup` to properly configure the dev tools.
 * - **Type Casting**: Note the `as any` and explicit type castings, which might indicate areas
 *   where MUD's type inference could be improved or where specific versions are expected.
 */
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
