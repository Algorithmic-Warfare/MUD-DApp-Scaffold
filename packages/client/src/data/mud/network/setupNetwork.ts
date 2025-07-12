/**
 * @file
 * @summary MUD network setup and synchronization.
 * @description This module provides the core function to set up the MUD (Multi-chain Utility Dapp) network,
 * including client creation, contract interaction, and state synchronization.
 * It integrates various MUD and Viem utilities to establish a robust connection to the MUD world.
 *
 * @exports setupNetwork - Function to set up the MUD network.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization**: This is the primary entry point for setting up the MUD client.
 * - **Dependencies**: Relies heavily on `@latticexyz/common`, `viem`, and local network configuration modules.
 * - **State Management**: Utilizes Zustand for state synchronization, making the MUD world state reactive.
 */
import {
  createBurnerAccount,
  transportObserver,
  ContractWrite,
} from "@latticexyz/common";
import { mergeAbis } from "@ponder/utils";
import { syncToZustand } from "@latticexyz/store-sync/zustand";
import { transactionQueue, writeObserver } from "@latticexyz/common/actions";
import { Subject, share } from "rxjs";
import {
  WalletClient,
  PublicClient,
  createPublicClient,
  fallback,
  webSocket,
  http,
  createWalletClient,
  Hex,
  ClientConfig,
  getContract,
  Chain,
} from "viem";
import ITaskSystemAbi from "contracts/out/ITaskSystem.sol/ITaskSystem.abi.json";
import {
  contracts_mudWorldConfig,
  eveworld_mudWorldConfig,
} from "./getWorldConfig";
import { getNetworkConfig } from "./getNetworkConfig";
import { SetupNetworkResult, MergedMudConfig } from "./types";
import {
  PublicClientT,
  WalletClientT,
  ChainIdT,
  WorldAddressT,
} from "../types";
import { mergeWorlds } from "../utils/world/merge";
import { MudWorldConfigType } from "../utils/world/types";

/**
 * @summary Sets up the MUD network and returns the necessary client objects and synchronization tools.
 * @description This asynchronous function orchestrates the entire MUD network setup process.
 * It fetches network configuration, merges contract ABIs and MUD world configurations,
 * creates Viem clients, and initializes the MUD store synchronization with Zustand.
 *
 * @param {PublicClientT} __publicClient - The Viem PublicClient instance.
 * @param {WalletClientT} __walletClient - The Viem WalletClient instance.
 * @param {ChainIdT} __chainId - The ID of the blockchain chain to connect to.
 * @param {WorldAddressT} __worldAddress - The address of the MUD world contract.
 * @returns {Promise<SetupNetworkResult>} A promise that resolves to an object containing
 *                                        all the necessary components for MUD interaction,
 *                                        including tables, store, clients, and contract instances.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Core Setup**: This function encapsulates the entire MUD client setup logic.
 * - **Client Instances**: Provides configured `publicClient`, `walletClient`, and `worldContract` instances.
 * - **Reactive State**: The `tables` and `useStore` properties provide reactive access to the MUD world state.
 * - **Transaction Management**: The `write$` subject and `waitForTransaction` function are key for handling on-chain interactions.
 */
export async function setupNetwork(
  __publicClient: PublicClientT,
  __walletClient: WalletClientT,
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
): Promise<SetupNetworkResult> {
  /**
   * @description Retrieve the network configuration based on provided chain ID and world address.
   */
  const networkConfig = await getNetworkConfig(__chainId, __worldAddress);

  /**
   * @description Merge contract ABIs, starting with ITaskSystemAbi.
   */
  const mergedAbi = mergeAbis([ITaskSystemAbi]);

  /**
   * @description Merge MUD world configurations from different sources.
   */
  const merged_mudWorldConfig = mergeWorlds(
    contracts_mudWorldConfig as unknown as MudWorldConfigType,
    eveworld_mudWorldConfig as unknown as MudWorldConfigType
  );

  console.log("merged_mudWorldConfig", merged_mudWorldConfig);

  /**
   * @description Define fallback transports for Viem client (WebSocket preferred, then HTTP).
   */
  const fallbackTransport = fallback([webSocket(), http()]);
  /**
   * @description Configure client options for Viem, including chain, transport, polling, and account.
   */
  const clientOptions = {
    chain: networkConfig.chain as Chain,
    transport: transportObserver(fallbackTransport),
    pollingInterval: 1000,
    account: __walletClient.account,
  } as const satisfies ClientConfig;

  /**
   * @description Create a Viem PublicClient with the defined options.
   */
  const publicClient = createPublicClient(clientOptions);

  /**
   * @description Create a Subject for contract write operations, allowing for reactive handling of transactions.
   */
  const write$ = new Subject<ContractWrite>();

  /**
   * @description Get a contract instance for the MUD world, using the merged ABI and both clients.
   */
  const worldContract = getContract({
    address: networkConfig.worldAddress as Hex,
    abi: mergedAbi,
    client: { public: publicClient, wallet: __walletClient },
  });

  /**
   * @description Synchronize the MUD store to Zustand, providing reactive access to world state.
   */
  const {
    tables,
    useStore,
    latestBlock$,
    latestBlockNumber$,
    storedBlockLogs$,
    waitForTransaction,
    stopSync,
  } = await syncToZustand<typeof merged_mudWorldConfig>({
    config: merged_mudWorldConfig,
    address: networkConfig.worldAddress as Hex,
    publicClient,
    startBlock: BigInt(networkConfig.initialBlockNumber),
  });

  /**
   * @description Return the comprehensive SetupNetworkResult object.
   */
  return {
    config: merged_mudWorldConfig,
    tables,
    useStore,
    latestBlock$,
    latestBlockNumber$,
    storedBlockLogs$,
    publicClient,
    walletClient: __walletClient,
    worldContract,
    write$,
    waitForTransaction,
    stopSync,
  };
}
