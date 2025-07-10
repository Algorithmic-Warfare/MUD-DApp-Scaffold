/**
 * @file Provides the WalletProvider component for managing wallet connections and interactions.
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
 * @param children - The child components to be wrapped by the WalletProvider context.
 * @returns ReactNode - The child components wrapped by the WalletProvider context.
 */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const [isCurrentChain, setIsCurrentChain] = useState<boolean>(false);
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);

  const { worldAddress, chain } = useWorld();

  /**
   * Effect hook to use EIP-6963 to track multiple wallet providers.
   * It listens for 'eip6963:announceProvider' events and dispatches 'eip6963:requestProvider' on page load.
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
   * and a preferred wallet is stored in local storage.
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
   * which is defined in the .env file.
   */
  useEffect(() => {
    const connectedChainId = parseInt(
      state.connectedProvider.provider?.chainId!
    );

    setIsCurrentChain(connectedChainId == chain.id);
  }, [state.connectedProvider.provider, state.connected]);

  /**
   * Derives a list of available wallet names from the detected providers.
   */
  const availableWallets = providers.map((x) => x.info.name);

  /**
   * Handles the connection process for the preferred wallet.
   * It attempts to connect to the specified wallet, requests accounts, and dispatches the connection details.
   * It also stores the preferred wallet and connection status in local storage.
   * @param preferredWallet - The preferred wallet to connect to.
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
   * It dispatches a DISCONNECT action and updates the local storage.
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
