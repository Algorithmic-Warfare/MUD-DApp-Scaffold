import { createPublicClient, createWalletClient, Hex } from "viem";
import { setupNetwork } from "./network/setupNetwork";
import { createClientComponents } from "./components/createClientComponents";
import { createSystemCalls } from "./systems/createSystemCalls";

export type PublicClientT = ReturnType<typeof createPublicClient>;
export type WalletClientT = ReturnType<typeof createWalletClient>;
export type WorldAddressT = Hex;
export type ChainIdT = number;

export type SetupFunctionReturnT = {
  network: Awaited<ReturnType<typeof setupNetwork>>;
  systemCalls: ReturnType<typeof createSystemCalls>;
  components: ReturnType<typeof createClientComponents>;
};

export type SetupResultT = Awaited<SetupFunctionReturnT>;
