/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useReducer,
  useCallback,
  useContext,
} from "react";
import { Chain, ChainContract } from "viem";

import {
  ChainConfig,
  EIP6963ProviderDetail,
  QueryParams,
  SupportedWallets,
} from "@eveworld/types";
import { GatewayNetworkConfig, prepareChainConfig } from "@eveworld/utils";

// Sets the initial state on app load
import { Connection, WalletContextType } from "./types";
import { walletReducer } from "./reducer";
import { supportedChains } from "src/data/mud/network/supportedChains";

const initialState: Connection = {
  connectedProvider: {
    provider: null,
    connected: false,
  },
  defaultNetwork: {
    network: undefined,
    worldAddress: "0x",
    eveTokenAddress: "0x",
    erc2771ForwarderAddress: "0x",
    // systemIds: {},
  },
  publicClient: null,
  walletClient: null,
  bundlerClient: null,
  gatewayConfig: {
    gatewayHttp: "",
    gatewayWs: "",
  },
  availableWallets: [],
};

/**
 * WalletProvider component provides a context for managing wallet connections and interactions.
 * It initializes the wallet state, handles wallet connection and disconnection, and tracks the current network.
 * @param children - The child components to be wrapped by the WalletProvider context.
 * @returns ReactNode - The child components wrapped by the WalletProvider context.
 */
const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [publicClientChain, setPublicClientChain] = useState<Chain | undefined>(
    undefined
  );
  // const [systemIds, setSystemIds] = useState<Record<string, `0x${string}`>>({});
  const [gatewayConfig, setGatewayConfig] = useState<GatewayNetworkConfig>({
    gatewayHttp: import.meta.env.VITE_GATEWAY_HTTP,
    gatewayWs: import.meta.env.VITE_GATEWAY_WS,
  });
  const [isCurrentChain, setIsCurrentChain] = useState<boolean>(false);
  // Keep track of all available EIP6963-compliant injected providers
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);
  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    // const gatewayHttp = import.meta.env.VITE_GATEWAY_HTTP;
    // const gatewayWs = import.meta.env.VITE_GATEWAY_WS;

    // if (!gatewayHttp || !gatewayWs) {
    //   throw Error("Environment variables are undefined");
    // }

    // setGatewayConfig({
    //   gatewayHttp: import.meta.env.VITE_GATEWAY_HTTP,
    //   gatewayWs: import.meta.env.VITE_GATEWAY_WS,
    // });

    /** Public client network is determined by the world defined in .env */
    const setPublicClientNetwork = async () => {
      const publicClientNetworkConfig = await getChainConfig();
      setPublicClientChain(publicClientNetworkConfig?.chain);
      // const systems = publicClientNetworkConfig?.systemIds ?? [];
      // setSystemIds(
      //   Object.fromEntries(
      //     systems.map((system) => [system.name, system.systemId])
      //   )
      // );
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
        // systemIds: {
        //   namespaceLabel: string;
        //   label: string;
        //   namespace: string;
        //   name: string;
        //   systemId: `0x${string}`;
        //   abi: string[];
        //   worldAbi: string[];
        // }[];
      }
    | undefined
  > => {
    // Return corresponding config from gateway specified in .env
    // const url = `${gatewayConfig?.gatewayHttp}/config`;
    // const abiUrl = `${gatewayConfig?.gatewayHttp}/abis/config`;

    try {
      // const response = await fetch(url);
      // const systemIdsResponse = await fetch(abiUrl);
      // const data = await response.json();
      // const systemIdsData = await systemIdsResponse.json();
        const chainId =
    Number(
        import.meta.env.VITE_CHAIN_ID ||
        31337
    );
      const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
  const chain = supportedChains[chainIndex];
      const preparedChain = chain 
      return {
        chain: preparedChain,
        // systemIds: systemIdsData.systems,
      }; // Return either devnet or testnet config
    } catch (e) {
      console.error("Error fetching config:", e);
      return undefined;
    }
  }, [gatewayConfig]);

  const availableWallets = providers.map((x) => x.info.name);

  /**
   * Returns the default network configuration based on the public client chain contracts.
   * @returns {ChainConfig} The default network configuration object containing network, World address, ERC2771Forwarder address, EVEToken address, and systemIds.
   */
  const getDefaultNetwork = useCallback((): Omit<ChainConfig, "systemIds"> => {
    if (!publicClientChain) throw "No public client available";
    const chainContracts: Record<string, ChainContract> =
      publicClientChain.contracts as Record<string, ChainContract>;

    // const { World, ERC2771Forwarder, EVEToken } = chainContracts;
    return {
      network: publicClientChain,
      worldAddress: import.meta.env.VITE_WORLD_ADDRESS as `0x${string}`,
      erc2771ForwarderAddress: import.meta.env.VITE_TRUSTED_FORWARDER_ADDRESS as `0x${string}`,
      eveTokenAddress: import.meta.env.VITE_EVE_TOKEN_ADDRESS as `0x${string}`,
      // systemIds: systemIds,
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
        gatewayConfig,
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

export const WalletContext = createContext<WalletContextType>({
  connectedProvider: {
    provider: null,
    connected: false,
  },
  gatewayConfig: {
    gatewayHttp: "",
    gatewayWs: "",
  },
  publicClient: null,
  walletClient: null,
  bundlerClient: null,
  handleConnect: () => {},
  handleDisconnect: () => {},
  isCurrentChain: false,
  availableWallets: [],
  defaultNetwork: {
    network: undefined,
    worldAddress: "0x",
    eveTokenAddress: "0x",
    erc2771ForwarderAddress: "0x",
    // systemIds: {},
  },
});

/**
 * Custom hook to provide access to wallet connection functionalities, network configurations,
 * and available wallet providers from the WalletContext.
 *
 * Uses the publicClient and walletClient provided by viem.
 *
 * This hook utilizes the `WalletContext` to allow components to easily manage and interact
 * with wallet connections, fetch network configurations, and handle connection state.
 *
 * Usage:
 * ```tsx
 * const {
 *   connectedProvider,
 *   gatewayConfig,
 *   handleConnect,
 *   handleDisconnect,
 *   availableWallets,
 *   isCurrentChain,
 *   publicClient,
 *   walletClient,
 *   bundlerClient,
 *   defaultNetwork
 * } = useConnection();
 * ```
 *
 * Returns:
 * - `connectedProvider`: Object containing the currently connected provider and connection state.
 * - `gatewayConfig`: Configuration for the blockchain gateway.
 * - `handleConnect`: Function to connect to a preferred wallet.
 * - `handleDisconnect`: Function to disconnect the wallet.
 * - `availableWallets`: Array of available wallet provider names.
 * - `isCurrentChain`: Boolean indicating if the provider is on the correct network.
 * - `publicClient`: The public client instance for interacting with the blockchain.
 * - `walletClient`: The wallet client instance.
 * - `bundlerClient`: The bundler client instance (if available).
 * - `defaultNetwork`: Object containing the default network configuration.
 *
 * Example:
 * ```tsx
 * import { useConnection } from '@eveworld/contexts';
 *
 * const MyComponent = () => {
 *   const {
 *     connectedProvider,
 *     gatewayConfig,
 *     handleConnect,
 *     handleDisconnect,
 *     availableWallets,
 *     isCurrentChain,
 *     publicClient,
 *     walletClient,
 *     bundlerClient,
 *     defaultNetwork
 *   } = useConnection();
 *
 *   const connectWallet = () => {
 *     handleConnect('MetaMask');
 *   };
 *
 *   return (
 *     <div>
 *       {connectedProvider.connected ? (
 *         <button onClick={handleDisconnect}>Disconnect</button>
 *       ) : (
 *         <button onClick={connectWallet}>Connect Wallet</button>
 *       )}
 *       {isCurrentChain ? (
 *         <p>Connected to the correct network</p>
 *       ) : (
 *         <p>Please switch to the correct network</p>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */
export const useConnection = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useConnection must be used within an WalletContext");
  }
  return context;
};

export default WalletProvider;
