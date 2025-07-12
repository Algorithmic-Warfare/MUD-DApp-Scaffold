/**
 * @file
 * @summary Provides the WalletProvider component for managing wallet connections and interactions.
 * @description This file exports the `WalletProvider` component, which encapsulates the logic
 * for connecting to various wallet providers (e.g., MetaMask, WalletConnect), managing
 * wallet state (connected account, chain ID), and handling wallet-related events.
 * It uses `ethers` for blockchain interactions and provides a context for child components
 * to access wallet information and functions.
 *
 * @exports WalletProvider - A React Context Provider for wallet management.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Core Wallet Logic**: This file contains the central logic for wallet integration.
 * - **Context Provider**: AI tools should recognize `WalletProvider` as a context provider
 *   that makes wallet state and functions available to its children.
 * - **Event Handling**: Pay attention to how wallet events (e.g., account changes, chain changes)
 *   are handled and propagated.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useState, useEffect, useReducer, useCallback } from "react";

import { Connection, SupportedWallets } from "./types";
import { walletReducer } from "./reducer";
import WalletContext from "./WalletContext";
import { useWorld } from "../world";
import { EIP6963ProviderDetail } from "./EthereumProviderTypes";
import { Hex } from "viem";

/**
 * The initial state for the wallet connection.
 */
const initialState: Connection = {
  connectedProvider: {
    provider: null,
    connected: false,
  },
  defaultChain: null,
  publicClient: null,
  walletClient: null,
  availableWallets: [],
  isCurrentChain: false,
  providers: [],
  connected: false,
};

/**
 * WalletProvider component provides a context for managing wallet connections and interactions.
 * It initializes the wallet state, handles wallet connection and disconnection, and tracks the current network.
 * @summary Provides a context for managing wallet connections and interactions.
 * @description The `WalletProvider` component initializes the wallet state, handles wallet connection and disconnection, and tracks the current network. It makes wallet-related functionalities available to its child components via the `WalletContext`.
 *
 * @param {Object} props - The props for the WalletProvider component.
 * @param {ReactNode} props.children - The child components to be wrapped by the WalletProvider context.
 * @returns {ReactNode} The child components wrapped by the WalletProvider context.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Initialization**: Handles wallet connection state and interactions.
 * - **Dependencies**: Relies on `useWorld` for world address and chain information.
 * - **Local Storage**: Persists preferred wallet and connection status in local storage.
 */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const [isCurrentChain, setIsCurrentChain] = useState<boolean>(false);
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);

  const { worldAddress, chain } = useWorld();

  /**
   * Effect hook to use EIP-6963 to track multiple wallet providers.
/**
 * @summary Effect hook to use EIP-6963 to track multiple wallet providers.
 * @description This effect listens for 'eip6963:announceProvider' events to discover available wallet providers and dispatches 'eip6963:requestProvider' on page load to prompt providers to announce themselves.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Event Listeners**: Sets up global event listeners for EIP-6963 provider announcements.
 * - **Provider Discovery**: Initiates the discovery process for compatible wallet providers.
 */
  useEffect(() => {
    function onPageLoad() {
      const availableProviders: EIP6963ProviderDetail[] = [];

      window.addEventListener("eip6963:announceProvider", (event: any) => {
        availableProviders.push(event.detail);
      });
      setProviders(availableProviders);
      window.dispatchEvent(new Event("eip6963:requestProvider"));
    }
    onPageLoad();
  }, []);

  /**
   * Effect hook to trigger a connection to a preferred wallet if the user was previously connected
/**
 * @summary Effect hook to trigger a connection to a preferred wallet.
 * @description This effect checks local storage for a previously connected wallet and attempts to re-establish the connection if found.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Persistence**: Utilizes `localStorage` to maintain user's wallet connection preference across sessions.
 * - **Auto-connect**: Automatically attempts to connect to the preferred wallet on component mount.
 */
  useEffect(() => {
    const isPreviouslyConnected =
      localStorage.getItem("eve-dapp-connected") === "true";
    const preferredWallet = localStorage.getItem("eve-preferred-wallet");

    if (
      typeof window !== "undefined" &&
      isPreviouslyConnected &&
      preferredWallet
    ) {
      handleConnect(preferredWallet as SupportedWallets);
    }
  }, []);

  /**
   * Effect hook to update the state to reflect whether the connected provider is on the correct network,
/**
 * @summary Effect hook to update the chain status.
 * @description This effect updates the `isCurrentChain` state based on whether the connected wallet's chain ID matches the application's default chain ID (defined in the .env file).
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Chain Validation**: Ensures the connected wallet is on the expected network.
 * - **Reactivity**: Reacts to changes in the connected provider or connection status to update chain validity.
 */
  useEffect(() => {
    const connectedChainId = parseInt(
      state.connectedProvider.provider?.chainId!
    );

    setIsCurrentChain(connectedChainId == chain.id);
  }, [state.connectedProvider.provider, state.connected]);

  /**
/**
 * @summary Derives a list of available wallet names.
 * @description This constant derives a list of human-readable wallet names from the detected EIP-6963 providers.
 *
 * @type {string[]}
 */
  const availableWallets = providers.map((x) => x.info.name);

  /**
   * Handles the connection process for the preferred wallet.
/**
 * @summary Handles the connection process for a preferred wallet.
 * @description This asynchronous callback function attempts to connect to the specified `preferredWallet`. It requests accounts from the Ethereum provider, sets up the default chain, dispatches the connection details to the reducer, and persists the preferred wallet and connection status in local storage. It also sets up event listeners for `chainChanged` and `accountsChanged` to reload the page.
 *
 * @param {SupportedWallets} preferredWallet - The preferred wallet to connect to (e.g., "MetaMask", "EveVault").
 * @returns {Promise<void>} A promise that resolves when the connection process is complete.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Wallet Integration**: Demonstrates how to interact with EIP-1193 compatible wallet providers.
 * - **State Management**: Dispatches actions to update the global wallet state.
 * - **Error Handling**: Includes a try-catch block to gracefully handle connection errors.
 * - **Event Handling**: Subscribes to wallet events (`chainChanged`, `accountsChanged`) for dynamic updates.
 */
  const handleConnect = useCallback(
    async (preferredWallet: SupportedWallets) => {
      try {
        // EveVault uses the OneKey provider
        let walletProviderName: string = preferredWallet;
        if (preferredWallet == "EveVault") walletProviderName = "OneKey";

        // Check for provider that corresponds to the preferred
        const ethProvider = providers.find(
          ({ info }) => info.name == walletProviderName
        );
        if (ethProvider) {
          const [account] = (await ethProvider.provider.request({
            method: "eth_requestAccounts",
            params: [{ eth_accounts: {} }],
          })) as Hex[];

          // First, get the corresponding default public client network
          // From the world that is defined in .env
          const defaultChain = chain;

          const walletClientChain = chain;

          if (!walletClientChain)
            return console.error("Unable to fetch wallet network config");

          // Then dispatch the correct chain to CONNECT reducer
          dispatch({
            type: "CONNECT",
            payload: {
              account,
              defaultChain,
              provider: ethProvider.provider,
            },
          });

          localStorage.setItem("eve-preferred-wallet", preferredWallet);
          localStorage.setItem("eve-dapp-connected", "true");

          ethProvider.provider.on("chainChanged", () => location.reload());
          ethProvider.provider.on("accountsChanged", () => location.reload());
        }
      } catch (e) {
        console.error(e);
      }
    },
    [providers]
  );

  /**
   * Handles the disconnection process from the current wallet.
/**
 * @summary Handles the disconnection process from the current wallet.
 * @description This asynchronous callback function dispatches a `DISCONNECT` action to clear the wallet state and updates the `eve-dapp-connected` status in local storage to `false`.
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **State Reset**: Resets the wallet connection state upon disconnection.
 * - **Local Storage**: Updates `localStorage` to reflect the disconnected status.
 */
  const handleDisconnect = useCallback(async () => {
    dispatch({
      type: "DISCONNECT",
      payload: {
        account: null,
        defaultChain: null,
        provider: null,
      },
    });
    localStorage.setItem("eve-dapp-connected", "false");
  }, [providers]);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        handleConnect,
        handleDisconnect,
        availableWallets,
        isCurrentChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
