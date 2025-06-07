//@ts-nocheck
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
import mudConfig from "../../../TribeDispenser/packages/contracts/mud.config";
import ITribeStorageSystemAbi from "../../../TribeDispenser/packages/contracts/out/ITribeStorageSystem.sol/ITribeStorageSystem.abi.json";
import ITribeDispenserSystemAbi from "../../../TribeDispenser/packages/contracts/out/ITribeDispenserSystem.sol/ITribeDispenserSystem.abi.json";

import { getNetworkConfig } from "./getNetworkConfig";

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork(
  __publicClient: ReturnType<typeof createPublicClient>,
  __walletClient: ReturnType<typeof createWalletClient>,
  __chainId: number,
  __worldAddress: Hex
): Promise<{
  tables: Awaited<ReturnType<typeof syncToZustand>>["tables"];
  useStore: Awaited<ReturnType<typeof syncToZustand>>["useStore"];
  latestBlock$: Awaited<ReturnType<typeof syncToZustand>>["latestBlock$"];
  latestBlockNumber$: Awaited<
    ReturnType<typeof syncToZustand>
  >["latestBlockNumber$"];
  storedBlockLogs$: Awaited<
    ReturnType<typeof syncToZustand>
  >["storedBlockLogs$"];
  publicClient: PublicClient;
  walletClient: WalletClient;
  worldContract: ReturnType<typeof getContract>;
  write$: Subject<ContractWrite>;
}> {
  const networkConfig = await getNetworkConfig(__chainId, __worldAddress);

  const mergedAbi = mergeAbis([
    ITribeStorageSystemAbi,
    ITribeDispenserSystemAbi,
  ]);

  const fallbackTransport = fallback([webSocket(), http()]);
  const clientOptions = {
    chain: networkConfig.chain as Chain,
    transport: transportObserver(fallbackTransport),
    pollingInterval: 1000,
    account: __walletClient.account,
  } as const satisfies ClientConfig;

  const publicClient = createPublicClient(clientOptions);

  console.log(publicClient);
  const write$ = new Subject<ContractWrite>();

  const worldContract = getContract({
    address: networkConfig.worldAddress as Hex,
    abi: mergedAbi,
    client: { public: publicClient, wallet: __walletClient },
  });

  const {
    tables,
    useStore,
    latestBlock$,
    latestBlockNumber$,
    storedBlockLogs$,
    waitForTransaction,
  } = await syncToZustand({
    config: mudConfig,
    address: networkConfig.worldAddress as Hex,
    publicClient,
    startBlock: BigInt(networkConfig.initialBlockNumber),
  });

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
  };
}
