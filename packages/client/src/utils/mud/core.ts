/**
 * @file
 * @summary Core types and utilities for MUD integration.
 * @description This file defines fundamental types used across the MUD (Multi-User Dungeon)
 * integration within the client application, such as `WorldAddressT` and `ChainIdT`.
 * It serves as a central place for common MUD-related type definitions.
 *
 * @exports WorldAddressT - Type alias for a hexadecimal world address.
 * @exports ChainIdT - Type alias for a blockchain chain ID.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Type Definitions**: AI should refer to this file for understanding the core
 *   data types used in MUD interactions.
 * - **Consistency**: These types ensure consistency in how world addresses and
 *   chain IDs are represented throughout the codebase.
 */
import { createPublicClient, createWalletClient, Hex } from "viem";

/**
 * @summary Type alias for a hexadecimal world address.
 * @description Represents a blockchain address used for MUD world contracts.
 * @type {Hex}
 *
 * @notes
 * ## AI Usage Guidance:
 * - **MUD World Identification**: This type is used to uniquely identify a MUD world
 *   on the blockchain.
 */
export type WorldAddressT = Hex;

/**
 * @summary Type alias for a blockchain chain ID.
 * @description Represents the identifier for a specific blockchain network.
 * @type {number}
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Network Identification**: This type is used to specify which blockchain network
 *   operations are being performed on.
 */
export type ChainIdT = number;
