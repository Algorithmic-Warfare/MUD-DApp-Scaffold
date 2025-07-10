/**
 * @file Defines types related to wallet connection and management.
 */

import { Chain, WalletClient, PublicClient, Hex } from "viem";

import {
  EIP6963ProviderDetail,
  EIP1193Provider,
} from "./EthereumProviderTypes";

/**
 * Represents the current connection status and details of the wallet.
 */
export interface Connection {
  /**
   * Details about the currently connected EIP-1193 provider.
   */
  connectedProvider: {
    /** The EIP-1193 provider object, or null if not connected. */
    provider: EIP1193Provider | null;
    /** Indicates if the provider is connected. */
    connected: boolean;
  };
  /** Indicates if a wallet is currently connected. */
  connected: boolean;
  /** The default blockchain chain for the connection, or null if not set. */
  defaultChain: Chain | null;
  /** The public client for interacting with the blockchain, or null if not available. */
  publicClient: PublicClient | null;
  /** The wallet client for signing transactions, or null if not available. */
  walletClient: WalletClient | null;
  /** A list of available wallet names. */
  availableWallets: string[];
  /** Indicates if the currently connected chain matches the default chain. */
  isCurrentChain: boolean;
  /** A list of EIP-6963 provider details. */
  providers: EIP6963ProviderDetail[];
}

/**
 * Defines the type for the wallet context, extending Connection with handler functions.
 */
export type WalletContextType = Connection & {
  /**
   * Function to handle connecting to a specified wallet.
   * @param wallet The wallet to connect to.
   */
  handleConnect: (wallet: SupportedWallets) => Promise<void>;
  /**
   * Function to handle disconnecting from the current wallet.
   */
  handleDisconnect: () => Promise<void>;
};

/**
 * Defines the structure for action payloads related to wallet operations.
 */
export interface ActionPayloads {
  /** The connected account address in hexadecimal format, or null. */
  account: Hex | null;
  /** The default blockchain chain, or null. */
  defaultChain: Chain | null;
  /** The EIP-1193 provider, or null. */
  provider: EIP1193Provider | null;
}

/**
 * Enum representing the supported wallet types.
 */
export enum SupportedWallets {
  METAMASK = "MetaMask",
  EVEVAULT = "EveVault",
  ONEKEY = "OneKey",
  FRONTIER = "EVE Frontier Wallet",
}
