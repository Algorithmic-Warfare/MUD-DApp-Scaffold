import { createWalletClient, custom, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

import { ActionPayloads } from "./types";

/**
 * Reducer function for managing wallet state in the application.
 * Handles actions to connect or disconnect the wallet.
 * @param state - The current state of the wallet.
 * @param action - The action object containing type and payload.
 * @returns The new state after applying the action.
 */
export const walletReducer = (
  state: any,
  action: {
    type: string;
    payload: ActionPayloads;
  }
) => {
  const { account, defaultNetwork, walletClientChain, provider } =
    action.payload;

  switch (action.type) {
    case "CONNECT":
      // If defaultNetwork.baseChain is undefined, no supported network was found
      // Fallback publicClient to Ethereum Mainnet
      const publicClientChain = defaultNetwork?.network
        ? defaultNetwork.network
        : mainnet;
      if (!provider) throw Error("No provider found");
      if (!walletClientChain) throw Error("No wallet network found");

      const transport = window.ethereum;

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
          chain: publicClientChain,
          transport: http(publicClientChain.rpcUrls.default.http[0]),
        }),
        walletClient,
        defaultNetwork,
      };

    case "DISCONNECT":
      return {
        ...state,
        connected: false,
        publicClient: null,
        walletClient: null,
      };

    default:
      return state;
  }
};
