//@ts-nocheck
import { ContractWrite } from "@latticexyz/common";
import { syncToZustand } from "@latticexyz/store-sync/zustand";
import { Subject } from "rxjs";
import { WalletClient, PublicClient, Hex, getContract } from "viem";
import mudConfig from "contracts/mud.config";
import eveworld_mudConfig from "@eveworld/world-v2/mud.config";
import { mergeWorlds, WorldConfig } from "../utils/merge";

/**
 * The merged MUD config type, combining the base mudConfig and eveworld_mudConfig.
 */
export type MergedMudConfig = typeof mergeWorlds(mudConfig, eveworld_mudConfig);

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
