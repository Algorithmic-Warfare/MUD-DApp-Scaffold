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
import mudConfig from "contracts/mud.config";
import eveworld_mudConfig from "@eveworld/world-v2/mud.config";
import ITaskSystemAbi from "contracts/out/ITaskSystem.sol/ITaskSystem.abi.json";

import { getNetworkConfig } from "./getNetworkConfig";
import { mergeWorlds } from "../utils/mergeWorlds";
import { SetupNetworkResult } from "./types";
import {
  PublicClientT,
  WalletClientT,
  ChainIdT,
  WorldAddressT,
} from "../types";
import { reverseWorld } from "../utils/reverseWorld";

export async function setupNetwork(
  __publicClient: PublicClientT,
  __walletClient: WalletClientT,
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
): Promise<SetupNetworkResult> {
  const networkConfig = await getNetworkConfig(__chainId, __worldAddress);

  const mergedAbi = mergeAbis([ITaskSystemAbi]);

  //@ts-ignore
  const mergedMudConfig = mergeWorlds(mudConfig, eveworld_mudConfig);

  const worldInput = reverseWorld(mudConfig);
  console.log("worldInput", worldInput);

  const fallbackTransport = fallback([webSocket(), http()]);
  const clientOptions = {
    chain: networkConfig.chain as Chain,
    transport: transportObserver(fallbackTransport),
    pollingInterval: 1000,
    account: __walletClient.account,
  } as const satisfies ClientConfig;

  const publicClient = createPublicClient(clientOptions);

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
    stopSync,
  } = await syncToZustand<typeof mergedMudConfig>({
    config: mergedMudConfig,
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
    waitForTransaction,
    stopSync,
  };
}
