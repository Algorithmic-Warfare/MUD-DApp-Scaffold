/**
 * @file
 * @summary Utility to retrieve network configuration based on chain ID and world address.
 * @description This module provides a function to construct the network configuration required for MUD client setup.
 * It prioritizes explicit parameters, then URL query parameters, and finally environment variables or default values.
 * It also handles error cases for missing chain ID or world address.
 *
 * @exports getNetworkConfig - Function to retrieve the network configuration.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization**: This function is crucial for initializing the MUD client's network connection.
 * - **Error States**: Pay attention to the error messages thrown if `chainId` or `worldAddress` are not found.
 * - **Dependencies**: Relies on `supportedChains` and `worlds.json` for chain and world address lookups.
 */
import { getBurnerPrivateKey } from "@latticexyz/common";
import worlds from "contracts/worlds.json";

import { Hex } from "viem";

import { supportedChains } from "./supportedChains";
import { ChainIdT, WorldAddressT } from "../types";

/**
 * @summary Retrieves the network configuration for the MUD client.
 * @description This asynchronous function determines the network configuration by prioritizing
 * provided arguments, URL query parameters, and environment variables. It ensures that a valid
 * chain ID and world address are identified, and sets up the initial block number for synchronization.
 *
 * @param {ChainIdT} __chainId - Optional. The chain ID to use. If not provided, it will look in URL parameters or environment variables.
 * @param {WorldAddressT} __worldAddress - Optional. The world address to use. If not provided, it will look in URL parameters, `worlds.json`, or environment variables.
 * @returns {Promise<object>} A promise that resolves to an object containing the network configuration,
 *                            including private key, chain ID, chain details, faucet URL, world address,
 *                            and initial block number.
 * @throws {Error} If no chain ID is provided or found.
 * @throws {Error} If the specified chain is not found in `supportedChains`.
 * @throws {Error} If no world address is found for the determined chain.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Parameter Prioritization**: Understand the order of precedence for `chainId` and `worldAddress` resolution.
 * - **Dynamic Configuration**: This function allows for dynamic configuration via URL parameters, useful for testing or specific deployments.
 * - **Burner Wallet**: Automatically generates a burner private key if `VITE_PRIVATE_KEY` is not set.
 */
export async function getNetworkConfig(
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
) {
  // Parse URL query parameters to allow for dynamic configuration.
  const params = new URLSearchParams(window.location.search);

  // Determine the chain ID: prioritize explicit argument, then URL, then environment variable.
  const chainId =
    __chainId ||
    Number(
      params.get("chainId") ||
        params.get("chainid") ||
        import.meta.env.VITE_CHAIN_ID
    );

  // Ensure a chain ID is available; throw an error if not.
  if (!chainId) {
    throw new Error(
      "No chainId provided. Please provide a chainId in the URL query string or set the VITE_CHAIN_ID environment variable."
    );
  }

  // Find the chain configuration within the list of supported chains.
  const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
  const chain = supportedChains[chainIndex];

  // Ensure the found chain is supported; throw an error if not.
  if (!chain) {
    throw new Error(`Chain ${chainId} not found`);
  }

  // Determine the world address: prioritize explicit argument, then URL, then `worlds.json`, then environment variable.
  const world = worlds[chain.id.toString()];
  const worldAddress =
    __worldAddress ||
    params.get("worldAddress") ||
    world?.address ||
    import.meta.env.VITE_WORLD_ADDRESS;

  // Ensure a world address is available; throw an error if not.
  if (!worldAddress) {
    throw new Error(
      `No world address found for chain ${chainId}. Did you run \`mud deploy\`?`
    );
  }

  // Determine the initial block number for MUD client synchronization.
  // Prioritize URL parameter, then `worlds.json`, otherwise default to 0.
  const initialBlockNumber = params.has("initialBlockNumber")
    ? Number(params.get("initialBlockNumber"))
    : world?.blockNumber ?? 0n;

  // Return the complete network configuration object.
  return {
    privateKey: import.meta.env.VITE_PRIVATE_KEY ?? getBurnerPrivateKey(), // Use provided private key or generate a burner one.
    chainId,
    chain,
    faucetServiceUrl: params.get("faucet") ?? chain.faucetUrl, // Determine faucet URL.
    worldAddress,
    initialBlockNumber,
  };
}
