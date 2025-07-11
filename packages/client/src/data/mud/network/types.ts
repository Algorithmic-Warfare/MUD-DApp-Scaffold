/**
 * @file
 * @summary Type definitions for MUD network setup and configuration.
 * @description This module defines various TypeScript types used throughout the MUD network setup process,
 * including configurations for merged MUD worlds, and the return types for network setup functions.
 *
 * @exports MergedMudConfig - The merged MUD config type.
 * @exports SyncToZustandBaseResult - The base return type from `syncToZustand`.
 * @exports SetupNetworkReturn - The full return type of the `setupNetwork` function.
 * @exports SetupNetworkResult - The awaited result of the `setupNetwork` function.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Type Safety**: These types ensure type safety across the MUD client's network layer.
 * - **Understanding Structure**: Refer to these types to understand the expected data structures
 *   for MUD configurations and network setup results.
 */
import { ContractWrite } from "@latticexyz/common";
import { syncToZustand } from "@latticexyz/store-sync/zustand";
import { Subject } from "rxjs";
import { WalletClient, PublicClient, Hex, getContract } from "viem";
import mudConfig from "contracts/mud.config";
import { MudWorldConfigType } from "../utils/world/types";

/**
 * @summary Defines the structure of a single namespace entry within a merged MUD config.
 * @description This type is used internally by `MergedMudConfig` to represent the configuration
 * for a specific namespace, including its label, name, and associated tables, systems, enums, and user types.
 */
type NamespaceConfig = {
  label: string;
  namespace: string;
  tables: Record<string, any>;
  systems: Record<string, any>;
  enums: Record<string, any>;
  userTypes: Record<string, any>;
};

/**
 * @summary The merged MUD config type, representing a world with multiple namespaces.
 * @description This type extends `MudWorldConfigType` by omitting certain top-level properties
 * and explicitly defining a `namespaces` object. It is designed to be compatible with
 * `syncToZustand` when `multipleNamespaces` is true, allowing for a structured representation
 * of a MUD world composed of multiple distinct namespaces.
 *
 * @property {object} namespaces - An object where keys are namespace names and values are `NamespaceConfig` objects.
 *                                 Includes an empty string key for the default namespace.
 * @property {object} tables - An empty object, as tables are now defined within namespaces.
 * @property {object} systems - An empty object, as systems are now defined within namespaces.
 * @property {object} enums - An empty object, as enums are now defined within namespaces.
 * @property {object} userTypes - An empty object, as user types are now defined within namespaces.
 * @property {object} enumValues - An empty object, as enum values are now defined within namespaces.
 * @property {boolean} multipleNamespaces - Explicitly set to `true` to indicate support for multiple namespaces.
 * @property {typeof mudConfig.codegen} codegen - Preserves the codegen configuration from the primary MUD config.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Multi-Namespace Support**: This type is crucial for MUD setups that utilize multiple namespaces.
 * - **Structure**: Understand that tables, systems, enums, and user types are nested under the `namespaces` property.
 */
export type MergedMudConfig = Omit<
  MudWorldConfigType,
  | "tables"
  | "systems"
  | "enums"
  | "userTypes"
  | "enumValues"
  | "multipleNamespaces"
> & {
  // Explicitly define the namespaces object
  namespaces: {
    "": NamespaceConfig; // The empty string namespace
    [key: string]: NamespaceConfig; // Allow other named namespaces
  };
  // Top-level properties are empty when using namespaces
  tables: {};
  systems: {};
  enums: {};
  userTypes: {};
  enumValues: {};
  // Explicitly set multipleNamespaces to true for this merged config
  multipleNamespaces: true;
  // Preserve codegen from the primary config
  codegen?: Partial<typeof mudConfig.codegen>;
};

/**
 * @summary The base return type from `syncToZustand` before adding custom network properties.
 * @description This type represents the core result of synchronizing the MUD store to Zustand,
 * providing access to tables, store hooks, and block observables. It is used as a base for `SetupNetworkReturn`.
 */
export type SyncToZustandBaseResult = Awaited<
  ReturnType<typeof syncToZustand<MergedMudConfig>>
>;

/**
 * @summary The full return type of the `setupNetwork` function.
 * @description This type combines the result from `syncToZustand` with additional network-specific objects
 * such as `publicClient`, `walletClient`, `worldContract`, and a `write$` subject for contract interactions.
 * It represents the complete set of tools and data available after the MUD network has been set up.
 *
 * @property {PublicClient} publicClient - The Viem PublicClient instance.
 * @property {WalletClient} walletClient - The Viem WalletClient instance.
 * @property {ReturnType<typeof getContract>} worldContract - The MUD world contract instance.
 * @property {Subject<ContractWrite>} write$ - An RxJS Subject for contract write operations.
 */
export type SetupNetworkReturn = SyncToZustandBaseResult & {
  publicClient: PublicClient;
  walletClient: WalletClient;
  worldContract: ReturnType<typeof getContract>;
  write$: Subject<ContractWrite>;
  config: MergedMudConfig;
};

/**
 * @summary The awaited result of the `setupNetwork` function, providing all necessary network objects.
 * @description This is the primary type representing the complete network setup,
 * encapsulating all the clients, contracts, and synchronization tools needed to interact with the MUD world.
 */
export type SetupNetworkResult = SetupNetworkReturn;
