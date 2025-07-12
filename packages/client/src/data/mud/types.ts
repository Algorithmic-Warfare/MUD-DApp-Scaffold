/**
 * @file
 * @summary Defines types used across the MUD client setup and interaction.
 * @description This file centralizes type definitions for public and wallet clients,
 * world addresses, chain IDs, and the return types of the MUD setup functions.
 * It ensures type consistency and clarity throughout the MUD integration.
 */
import { createPublicClient, createWalletClient, Hex } from "viem";
import { setupNetwork } from "./network/setupNetwork";
import { createClientComponents } from "./components/createClientComponents";
import { createSystemCalls } from "./systems/createSystemCalls";

/**
 * @summary Type definition for a Viem public client.
 * @description Represents the return type of `createPublicClient` from Viem,
 * used for interacting with the blockchain without a wallet.
 */
export type PublicClientT = ReturnType<typeof createPublicClient>;

/**
 * @summary Type definition for a Viem wallet client.
 * @description Represents the return type of `createWalletClient` from Viem,
 * used for signing transactions and interacting with a user's wallet.
 */
export type WalletClientT = ReturnType<typeof createWalletClient>;

/**
 * @summary Type definition for a blockchain address in hexadecimal format.
 * @description Used for representing contract addresses, particularly the MUD world address.
 */
export type WorldAddressT = Hex;

/**
 * @summary Type definition for a blockchain chain ID.
 * @description Represents the numerical identifier of a blockchain network.
 */
export type ChainIdT = number;

/**
 * @summary Defines the structure of the return value from the MUD setup function.
 * @description Encapsulates the initialized network, client components, and system calls
 * after the MUD client setup process is complete.
 */
export type SetupFunctionReturnT = {
  /**
   * @description The initialized MUD network object.
   */
  network: Awaited<ReturnType<typeof setupNetwork>>;
  /**
   * @description An object containing all MUD system calls.
   */
  systemCalls: ReturnType<typeof createSystemCalls>;
  /**
   * @description An object containing all MUD client components.
   */
  components: ReturnType<typeof createClientComponents>;
};

/**
 * @summary Type definition for the awaited result of the MUD setup function.
 * @description Represents the resolved type of `SetupFunctionReturnT` after the
 * asynchronous setup process has completed.
 */
export type SetupResultT = Awaited<SetupFunctionReturnT>;
