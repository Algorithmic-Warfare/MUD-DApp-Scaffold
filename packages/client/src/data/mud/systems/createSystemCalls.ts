/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { Hex } from "viem";
import { SetupNetworkResult } from "../network/setupNetwork.ts";
import type { PackageAbi } from "../types.ts";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   *   Out of this parameter, we care about the following fields:
   *   - worldContract (which comes from getContract, see
   *     https://github.com/latticexyz/mud/blob/main/templates/react/packages/client/src/mud/setupNetwork.ts#L63-L69).
   *
   *   - useStore
   *   - tables
   */
  { worldContract, useStore, tables }: SetupNetworkResult
) {
  /*
   * The system calls are functions that will be used to
   * call the System contracts.
   *
   * They are not called directly, but rather through the
   * useSystemCalls hook (see useSystemCalls.ts).
   *
   * The system calls are defined as async functions that
   * return a promise.
   *
   * The promise resolves when the transaction is confirmed.
   */

  const getAllPackages = () => {
    const allPackages = Object.values(
      useStore.getState().getRecords(tables.TribePackage)
    );

    return allPackages;
  };

  const getAllStorageTransactions = () => {
    const allTransactions = Object.values(
      useStore.getState().getRecords(tables.TribeStorageTransaction)
    );
    return allTransactions;
  };

  const registerPackage = async (
    smartStorageUnitId: bigint,
    packageName: string,
    pack: PackageAbi
  ) => {
    //@ts-ignore
    await worldContract.write.AWAR__registerPackage([
      smartStorageUnitId,
      packageName,
      [pack],
    ]);
  };

  const unregisterPackage = async (packageId: bigint) => {
    //@ts-ignore
    await worldContract.write.AWAR__unregisterPackage([packageId]);
  };

  const renamePackage = async (packageId: bigint, newName: string) => {
    //@ts-ignore
    await worldContract.write.AWAR__renamePackage([packageId, newName]);
  };

  const dispensePackageMaterials = async (
    smartStorageUnitId: bigint,
    packageId: bigint,
    quantity: bigint
  ) => {
    //@ts-ignore
    await worldContract.write.AWAR__dispensePackageMaterials([
      smartStorageUnitId,
      packageId,
      quantity,
    ]);
  };

  const depositAll = async (
    smartStorageUnitId: bigint,
    ephemeralInventoryItemIds: bigint[]
  ) => {
    //@ts-ignore
    await worldContract.write.AWAR__depositAll([
      smartStorageUnitId,
      ephemeralInventoryItemIds,
    ]);
  };

  const deposit = async (
    smartStorageUnitId: bigint,
    ephemeralInventoryItemId: bigint,
    ephemeralInventoryItemAmount: bigint
  ) => {
    //@ts-ignore
    await worldContract.write.AWAR__deposit([
      smartStorageUnitId,
      ephemeralInventoryItemId,
      ephemeralInventoryItemAmount,
    ]);
  };

  const withdraw = async (
    smartStorageUnitId: bigint,
    inventoryItemId: bigint,
    inventoryItemAmount: bigint
  ) => {
    //@ts-ignore
    await worldContract.write.AWAR__withdraw([
      smartStorageUnitId,
      inventoryItemId,
      inventoryItemAmount,
    ]);
  };

  return {
    withdraw,
    deposit,
    depositAll,
    registerPackage,
    renamePackage,
    unregisterPackage,
    dispensePackageMaterials,
    getAllPackages,
    getAllStorageTransactions,
  };
}
