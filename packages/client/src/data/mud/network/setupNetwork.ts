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
  createBurnerAccount, // Utility to create a burner wallet account.
  transportObserver, // Observes transport layer events for debugging/logging.
  ContractWrite, // Type definition for contract write operations.
} from "@latticexyz/common";
import { mergeAbis } from "@ponder/utils"; // Utility to merge multiple contract ABIs.
import { syncToZustand } from "@latticexyz/store-sync/zustand"; // MUD store synchronization with Zustand.
import { transactionQueue, writeObserver } from "@latticexyz/common/actions"; // Utilities for transaction management and observation.
import { Subject, share } from "rxjs"; // Reactive programming utilities.
import {
  WalletClient, // Viem WalletClient type.
  PublicClient, // Viem PublicClient type.
  createPublicClient, // Function to create a Viem PublicClient.
  fallback, // Viem transport fallback utility.
  webSocket, // Viem WebSocket transport.
  http, // Viem HTTP transport.
  createWalletClient, // Function to create a Viem WalletClient.
  Hex, // Hexadecimal string type.
  ClientConfig, // Viem client configuration type.
  getContract, // Function to get a contract instance.
  Chain, // Viem Chain type.
} from "viem";
import ITaskSystemAbi from "contracts/out/ITaskSystem.sol/ITaskSystem.abi.json"; // ABI for the ITaskSystem contract.
import {
  contracts_mudWorldConfig, // MUD world configuration from the contracts package.
  eveworld_mudWorldConfig, // MUD world configuration from the eveworld package.
} from "./getWorldConfig";
import { getNetworkConfig } from "./getNetworkConfig"; // Function to get network configuration.
import { SetupNetworkResult, MergedMudConfig } from "./types"; // Type definitions for network setup.
import {
  PublicClientT, // Custom type for PublicClient.
  WalletClientT, // Custom type for WalletClient.
  ChainIdT, // Custom type for Chain ID.
  WorldAddressT, // Custom type for World Address.
} from "../types";
import { mergeWorlds } from "../utils/world/merge"; // Utility to merge MUD world configurations.

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
  // Retrieve the network configuration based on provided chain ID and world address.
  const networkConfig = await getNetworkConfig(__chainId, __worldAddress);

  // Merge contract ABIs, starting with ITaskSystemAbi.
  const mergedAbi = mergeAbis([ITaskSystemAbi]);

  // Merge MUD world configurations from different sources.
  const mergedMudWorldConfig = mergeWorlds(
    //@ts-ignore // Ignoring TypeScript error for potential type mismatch during merge.
    contracts_mudWorldConfig,
    eveworld_mudWorldConfig
  );

  // Define fallback transports for Viem client (WebSocket preferred, then HTTP).
  const fallbackTransport = fallback([webSocket(), http()]);
  // Configure client options for Viem, including chain, transport, polling, and account.
  const clientOptions = {
    chain: networkConfig.chain as Chain, // Cast chain to Viem Chain type.
    transport: transportObserver(fallbackTransport), // Apply transport observer.
    pollingInterval: 1000, // Set polling interval for client.
    account: __walletClient.account, // Use the provided wallet client's account.
  } as const satisfies ClientConfig;

  // Create a Viem PublicClient with the defined options.
  const publicClient = createPublicClient(clientOptions);

  // Create a Subject for contract write operations, allowing for reactive handling of transactions.
  const write$ = new Subject<ContractWrite>();

  // Get a contract instance for the MUD world, using the merged ABI and both clients.
  const worldContract = getContract({
    address: networkConfig.worldAddress as Hex, // Cast world address to Hex type.
    abi: mergedAbi, // Use the merged ABI.
    client: { public: publicClient, wallet: __walletClient }, // Provide both public and wallet clients.
  });

  // Synchronize the MUD store to Zustand, providing reactive access to world state.
  const {
    tables, // MUD tables, providing structured access to on-chain data.
    useStore, // Zustand hook to access the MUD store.
    latestBlock$, // Observable for the latest block.
    latestBlockNumber$, // Observable for the latest block number.
    storedBlockLogs$, // Observable for stored block logs.
    waitForTransaction, // Function to wait for a transaction to be mined.
    stopSync, // Function to stop the synchronization process.
  } = await syncToZustand<typeof mergedMudWorldConfig>({
    config: mergedMudWorldConfig, // The merged MUD world configuration.
    address: networkConfig.worldAddress as Hex, // The world contract address.
    publicClient, // The Viem PublicClient.
    startBlock: BigInt(networkConfig.initialBlockNumber), // The block number to start synchronization from.
  });

  // Return the comprehensive SetupNetworkResult object.
  return {
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
