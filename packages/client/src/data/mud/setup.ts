/**
 * @file
 * @summary Core MUD client setup and initialization.
 * @description This file orchestrates the setup of the MUD client, including
 * network configuration, client components, and system calls. It serves as the
 * primary entry point for initializing the MUD environment within the application.
 *
 * @exports setup - The main asynchronous function to set up the MUD client.
 */
import { createClientComponents } from "./components/createClientComponents";
import { createSystemCalls } from "./systems/createSystemCalls";
import { setupNetwork } from "./network/setupNetwork";
import {
  PublicClientT,
  WalletClientT,
  WorldAddressT,
  ChainIdT,
  SetupFunctionReturnT,
} from "./types";

/**
 * @summary Sets up the MUD client with the provided network configuration.
 * @description This asynchronous function initializes the MUD network, creates
 * client-side components, and sets up system calls based on the given
 * public client, wallet client, chain ID, and world address.
 *
 * @param {PublicClientT} __publicClient - The public client for blockchain interactions.
 * @param {WalletClientT} __walletClient - The wallet client for signing transactions.
 * @param {ChainIdT} __chainId - The ID of the blockchain network.
 * @param {WorldAddressT} __worldAddress - The address of the MUD world contract.
 * @returns {Promise<SetupFunctionReturnT>} An object containing the network, components, and system calls.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization Flow**: This function defines the core initialization flow for MUD.
 * - **Dependencies**: It depends on `setupNetwork`, `createClientComponents`, and `createSystemCalls`.
 * - **Return Structure**: The returned object (`SetupFunctionReturnT`) is crucial for accessing
 *   all MUD-related functionalities throughout the application.
 */
export async function setup(
  __publicClient: PublicClientT,
  __walletClient: WalletClientT,
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
): Promise<SetupFunctionReturnT> {
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
