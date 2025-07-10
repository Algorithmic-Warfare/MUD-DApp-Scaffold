import { createClientComponents } from "./components/createClientComponents";
import { createSystemCalls } from "./systems/createSystemCalls";
import { setupNetwork } from "./network/setupNetwork";
import {
  PublicClientT,
  WalletClientT,
  WorldAddressT,
  ChainIdT,
  SetupFunctionReturnT,
} from "./types";

export async function setup(
  __publicClient: PublicClientT,
  __walletClient: WalletClientT,
  __chainId: ChainIdT,
  __worldAddress: WorldAddressT
): Promise<SetupFunctionReturnT> {
  const network = await setupNetwork(
    __publicClient,
    __walletClient,
    __chainId,
    __worldAddress
  );
  const components = createClientComponents(network);
  const systemCalls = createSystemCalls(network);

  return {
    network,
    components,
    systemCalls,
  };
}
