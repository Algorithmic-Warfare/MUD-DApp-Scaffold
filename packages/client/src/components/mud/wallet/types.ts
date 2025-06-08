/* eslint-disable @typescript-eslint/no-explicit-any */
import { BundlerClient } from "permissionless";
import { PublicClient, WalletClient, Chain } from "viem";

import {
  ChainConfig,
  EIP1193Provider,
  SupportedWallets,
} from "@eveworld/types";
import { GatewayNetworkConfig } from "@eveworld/utils";

export interface Connection {
  connectedProvider: {
    provider: EIP1193Provider | null;
    connected: boolean;
  };
  gatewayConfig: GatewayNetworkConfig;
  publicClient: PublicClient | null;
  walletClient: WalletClient | null;
  bundlerClient: BundlerClient | null;
  availableWallets: string[];
  defaultNetwork: ChainConfig;
}

export interface WalletContextType extends Connection {
  handleConnect: (preferredWallet: SupportedWallets) => void;
  handleDisconnect: () => void;
  availableWallets: SupportedWallets[];
  isCurrentChain: boolean;
}

export interface ActionPayloads {
  account: any;
  walletClientChain: Chain | null;
  defaultNetwork: ChainConfig | null;
  provider: EIP1193Provider | null;
}
