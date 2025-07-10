/**
 * @file
 * @summary Defines the supported MUD chains and provides a utility to retrieve chain information.
 * @description This module exports an array of `MUDChain` objects, representing the blockchain
 * networks that the MUD client is configured to interact with. It also includes a helper function
 * to find a specific chain by its ID.
 *
 * @exports supportedChains - An array of supported MUD chains.
 * @exports getSupportedChain - Function to retrieve a supported MUD chain by its chain ID.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Chain Configuration**: This file is the source of truth for all supported blockchain networks.
 * - **Extensibility**: To add support for a new chain, extend the `supportedChains` array.
 */
import { MUDChain, mudFoundry, pyrope } from "@latticexyz/common/chains";

/**
 * @summary An array of supported MUD chains.
 * @description This array lists all the `MUDChain` objects that the application is configured
 * to work with. Each object contains details like chain ID, name, and RPC URLs.
 */
export const supportedChains: MUDChain[] = [mudFoundry, pyrope];

/**
 * @summary Retrieves a supported MUD chain by its chain ID.
 * @description This function searches the `supportedChains` array for a chain
 * that matches the provided `chainId`.
 *
 * @param {number} chainId - The ID of the blockchain chain to retrieve.
 * @returns {MUDChain | undefined} The `MUDChain` object if found, otherwise `undefined`.
 *
 * @example
 * ```typescript
 * import { getSupportedChain } from './supportedChains';
 *
 * const foundryChain = getSupportedChain(31337);
 * if (foundryChain) {
 *   console.log(`Found chain: ${foundryChain.name}`);
 * }
 * ```
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Chain Lookup**: Use this function to programmatically access chain-specific configurations.
 * - **Error Handling**: Ensure to handle cases where the returned value is `undefined`, indicating an unsupported chain.
 */
export function getSupportedChain(chainId: number): MUDChain | undefined {
  // Find the index of the chain with the matching chainId.
  const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
  // Retrieve the chain object using the found index.
  const chain = supportedChains[chainIndex];

  return chain;
}
