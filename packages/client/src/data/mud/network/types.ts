import { ContractWrite } from "@latticexyz/common";
import { syncToZustand } from "@latticexyz/store-sync/zustand";
import { Subject } from "rxjs";
import { WalletClient, PublicClient, Hex, getContract } from "viem";
import mudConfig from "contracts/mud.config";
import eveworld_mudConfig from "@eveworld/world-v2/mud.config";
import { MudWorldConfigType } from "../utils/world/types";

// Define the structure of a single namespace entry
type NamespaceConfig = {
  label: string;
  namespace: string;
  tables: Record<string, any>;
  systems: Record<string, any>;
  enums: Record<string, any>;
  userTypes: Record<string, any>;
};

/**
 * The merged MUD config type, representing a world with multiple namespaces.
 * This type is designed to be compatible with `syncToZustand` when `multipleNamespaces` is true.
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
  codegen: typeof mudConfig.codegen;
};

/**
 * The base return type from `syncToZustand` before adding custom network properties.
 */
export type SyncToZustandBaseResult = Awaited<
  ReturnType<typeof syncToZustand<MergedMudConfig>>
>;

/**
 * The full return type of the `setupNetwork` function.
 * This type combines the result from `syncToZustand` with additional network-specific objects.
 */
export type SetupNetworkReturn = SyncToZustandBaseResult & {
  publicClient: PublicClient;
  walletClient: WalletClient;
  worldContract: ReturnType<typeof getContract>;
  write$: Subject<ContractWrite>;
};

/**
 * The awaited result of the `setupNetwork` function, providing all necessary network objects.
 * This is the primary type representing the complete network setup.
 */
export type SetupNetworkResult = SetupNetworkReturn;
