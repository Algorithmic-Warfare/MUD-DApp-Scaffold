import { createWalletClient, custom, createPublicClient, http } from "viem";

import { ActionPayloads, Connection } from "./types";

/**
 * Reducer function for managing wallet state in the application.
 * Handles actions to connect or disconnect the wallet.
 * @param state - The current state of the wallet.
 * @param action - The action object containing type and payload.
 * @returns The new state after applying the action.
 */
export const walletReducer = (
  state: Connection,
  action: {
    type: string;
    payload: ActionPayloads;
  }
) => {
  const { account, defaultNetwork, walletClientChain, provider } =
    action.payload;

  switch (action.type) {
    case "CONNECT":
      if (!defaultNetwork?.network)
        throw Error("No public client network found");
      if (!provider) throw Error("No provider found");
      if (!walletClientChain) throw Error("No wallet network found");

      const transport = (window as any).ethereum;

      const walletClient = createWalletClient({
        account,
        chain: walletClientChain,
        transport: custom(transport),
      });
      return {
        ...state,
        connectedProvider: {
          provider: provider,
          connected: true,
        },
        publicClient: createPublicClient({
          batch: {
            multicall: true,
          },
          chain: defaultNetwork.network,
          transport: http(defaultNetwork.network.rpcUrls.default.http[0]),
        }),
        walletClient,
        defaultNetwork,
        publicClientChain: defaultNetwork.network,
        isCurrentChain: true,
        providers: state.providers, // Keep existing providers
      };

    case "DISCONNECT":
      return {
        ...state,
        connectedProvider: {
          provider: null,
          connected: false,
        },
        publicClient: null,
        walletClient: null,
        publicClientChain: undefined,
        isCurrentChain: false,
      };

    default:
      return state;
  }
};
