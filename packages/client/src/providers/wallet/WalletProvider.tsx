/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useState, useEffect, useReducer, useCallback } from "react";
import { Chain, ChainContract } from "viem";

import {
  ChainConfig,
  EIP6963ProviderDetail,
  SupportedWallets,
} from "@eveworld/types";
import { GatewayNetworkConfig } from "@eveworld/utils";

// Sets the initial state on app load
import { Connection, WalletContextType } from "./types";
import { walletReducer } from "./reducer";
import { supportedChains } from "src/data/mud/network/supportedChains";
import WalletContext from "./WalletContext";

const initialState: Connection = {
  connectedProvider: {
    provider: null,
    connected: false,
  },
  defaultNetwork: undefined,
  publicClient: null,
  walletClient: null,
  bundlerClient: null,
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
  const [publicClientChain, setPublicClientChain] = useState<Chain | undefined>(
    undefined
  );
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const [isCurrentChain, setIsCurrentChain] = useState<boolean>(false);
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);

  useEffect(() => {
    /** Public client network is determined by the world defined in .env */
    const setPublicClientNetwork = async () => {
      const publicClientNetworkConfig = await getChainConfig();
      setPublicClientChain(publicClientNetworkConfig?.chain);
    };

    setPublicClientNetwork();
  }, []);

  // Use EIP6963 to track multiple wallet providers
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
   * Triggers a connection to a preferred wallet if the user was previously connected and a preferred wallet is stored in the local storage.
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
   * Updates the state to reflect whether the connected provider is on the correct network, which is defined in .env
   */
  useEffect(() => {
    const connectedChainId = parseInt(
      state.connectedProvider.provider?.chainId
    );

    setIsCurrentChain(connectedChainId == publicClientChain?.id);
  }, [state.connectedProvider.provider, state.connected, publicClientChain]);

  /**
   * Retrieves the chain configuration from the gateway specified in the .env file.
   * If an error occurs during the fetch operation, logs the error and returns undefined.
   * @returns An object containing the chain and system IDs in the format { chain: Chain, systemIds: Record<string, `0x${string}`> }.
   */
  const getChainConfig = useCallback(async (): Promise<
    | {
        chain: Chain;
      }
    | undefined
  > => {
    try {
      const chainId = Number(import.meta.env.VITE_CHAIN_ID || 31337);
      const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
      const chain = supportedChains[chainIndex];
      const preparedChain = chain;
      return {
        chain: preparedChain,
      };
    } catch (e) {
      console.error("Error fetching config:", e);
      return undefined;
    }
  }, []);

  const availableWallets = providers.map((x) => x.info.name);

  /**
   * Returns the default network configuration based on the public client chain contracts.
   * @returns {ChainConfig} The default network configuration object containing network, World address, ERC2771Forwarder address, EVEToken address, and systemIds.
   */
  const getDefaultNetwork = useCallback((): { network: Chain } => {
    if (!publicClientChain) throw "No public client available";
    const chainContracts: Record<string, ChainContract> =
      publicClientChain.contracts as Record<string, ChainContract>;

    return {
      network: publicClientChain,
    };
  }, [publicClientChain]);

  /**
   * Handles the connection process for the preferred wallet.
   *
   * @param {SupportedWallets} preferredWallet - The preferred wallet to connect to.
   * @returns {void}
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
          const [account] = await ethProvider.provider.request({
            method: "eth_requestAccounts",
            params: [{ eth_accounts: {} }],
          });

          // First, get the corresponding default public client network
          // From the world that is defined in .env
          const defaultNetwork = getDefaultNetwork();

          const walletClientChainConfig = await getChainConfig();
          const walletClientChain = walletClientChainConfig?.chain;

          if (!walletClientChain)
            return console.error("Unable to fetch wallet network config");

          // Then dispatch the correct chain to CONNECT reducer
          dispatch({
            type: "CONNECT",
            payload: {
              account,
              walletClientChain,
              defaultNetwork,
              provider: ethProvider.provider,
            },
          });

          localStorage.setItem("eve-preferred-wallet", preferredWallet);
          localStorage.setItem("eve-dapp-connected", "true");

          ethProvider.provider.on("chainChanged", () => location.reload());

          // ethProvider.provider.on("accountsChanged", () => location.reload());
        }
      } catch (e) {
        console.error(e);
      }
    },
    [providers, publicClientChain]
  );

  const handleDisconnect = useCallback(async () => {
    dispatch({
      type: "DISCONNECT",
      payload: {
        account: {},
        walletClientChain: null,
        defaultNetwork: null,
        provider: null,
      },
    });
    localStorage.setItem("eve-dapp-connected", "false");
  }, [providers, publicClientChain]);

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
