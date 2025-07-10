/**
 * @file Defines types related to wallet connection and management.
 */

import { Chain, WalletClient, PublicClient, Hex } from "viem";

import {
  EIP6963ProviderDetail,
  EIP1193Provider,
} from "./EthereumProviderTypes";

/**
/**
 * @summary Represents the current connection status and details of the wallet.
 * @description This interface defines the comprehensive state of the wallet connection, including the connected provider, clients, chain information, and available wallets.
 */
export interface Connection {
  /**
   * @summary Details about the currently connected EIP-1193 provider.
   */
  connectedProvider: {
    /**
     * @description The EIP-1193 provider object, or null if not connected.
     */
    provider: EIP1193Provider | null;
    /**
     * @description Indicates if the provider is connected.
     */
    connected: boolean;
  };
  /**
   * @description Indicates if a wallet is currently connected.
   */
  connected: boolean;
  /**
   * @description The default blockchain chain for the connection, or null if not set.
   */
  defaultChain: Chain | null;
  /**
   * @description The public client for interacting with the blockchain, or null if not available.
   */
  publicClient: PublicClient | null;
  /**
   * @description The wallet client for signing transactions, or null if not available.
   */
  walletClient: WalletClient | null;
  /**
   * @description A list of available wallet names.
   */
  availableWallets: string[];
  /**
   * @description Indicates if the currently connected chain matches the default chain.
   */
  isCurrentChain: boolean;
  /**
   * @description A list of EIP-6963 provider details.
   */
  providers: EIP6963ProviderDetail[];
}

/**
/**
 * @summary Defines the type for the wallet context.
 * @description This type extends the `Connection` interface with handler functions for connecting and disconnecting the wallet, making them available through the React context.
 */
export type WalletContextType = Connection & {
  /**
   * @summary Function to handle connecting to a specified wallet.
   * @param {SupportedWallets} wallet - The wallet to connect to.
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   */
  handleConnect: (wallet: SupportedWallets) => Promise<void>;
  /**
   * @summary Function to handle disconnecting from the current wallet.
   * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
   */
  handleDisconnect: () => Promise<void>;
};

/**
/**
 * @summary Defines the structure for action payloads related to wallet operations.
 * @description This interface specifies the data structure for payloads used in wallet reducer actions, containing details necessary for connecting or disconnecting a wallet.
 */
export interface ActionPayloads {
  /**
   * @description The connected account address in hexadecimal format, or null.
   */
  account: Hex | null;
  /**
   * @description The default blockchain chain, or null.
   */
  defaultChain: Chain | null;
  /**
   * @description The EIP-1193 provider, or null.
   */
  provider: EIP1193Provider | null;
}

/**
/**
 * @summary Enum representing the supported wallet types.
 * @description This enum provides a predefined list of wallet names that the application supports for connection.
 */
export enum SupportedWallets {
  /**
   * @description Represents the MetaMask wallet.
   */
  METAMASK = "MetaMask",
  /**
   * @description Represents the EveVault wallet.
   */
  EVEVAULT = "EveVault",
  /**
   * @description Represents the OneKey wallet.
   */
  ONEKEY = "OneKey",
  /**
   * @description Represents the EVE Frontier Wallet.
   */
  FRONTIER = "EVE Frontier Wallet",
}
