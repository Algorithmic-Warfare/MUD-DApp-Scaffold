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

export async function setupNetwork(
  __publicClient: PublicClientT,
  __walletClient: WalletClientT,
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
): Promise<SetupNetworkResult> {
  const networkConfig = await getNetworkConfig(__chainId, __worldAddress);

  const mergedAbi = mergeAbis([ITaskSystemAbi]);

  const mergedMudWorldConfig = mergeWorlds(
    //@ts-ignore
    contracts_mudWorldConfig,
    eveworld_mudWorldConfig
  );

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
  } = await syncToZustand<typeof mergedMudWorldConfig>({
    config: mergedMudWorldConfig,
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
