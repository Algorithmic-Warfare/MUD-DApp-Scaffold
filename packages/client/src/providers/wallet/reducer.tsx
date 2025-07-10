/**
 * @file Defines the reducer function for managing wallet state.
 */

import { createWalletClient, custom, createPublicClient, http } from "viem";

import { ActionPayloads, Connection } from "./types";

/**
/**
 * @summary Reducer function for managing wallet state.
 * @description This reducer handles actions to connect or disconnect the wallet, updating the application's wallet state accordingly. It creates `walletClient` and `publicClient` instances based on the connection details.
 *
 * @param {Connection} state - The current state of the wallet.
 * @param {{ type: string; payload: ActionPayloads }} action - The action object containing the type of action and its payload.
 * @returns {Connection} The new state after applying the action.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **State Management**: Centralized logic for managing wallet connection and disconnection.
 * - **Client Creation**: Responsible for instantiating `viem`'s `walletClient` and `publicClient`.
 * - **Error Handling**: Throws errors if essential connection details (account, chain, provider) are missing during connection.
 */
export const walletReducer = (
  state: Connection,
  action: {
    type: string;
    payload: ActionPayloads;
  }
) => {
  const { account, defaultChain, provider } = action.payload;

  switch (action.type) {
    case "CONNECT":
      if (!defaultChain) throw Error("No public client network found");
      if (!provider) throw Error("No provider found");
      if (!account) throw Error("No account found");

      const transport = (window as any).ethereum;

      const walletClient = createWalletClient({
        account,
        chain: defaultChain,
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
          chain: defaultChain,
          transport: http(defaultChain.rpcUrls.default.http[0]),
        }),
        walletClient,
        defaultChain,
        publicClientChain: defaultChain,
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
