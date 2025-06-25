import { Chain, WalletClient } from "viem";
import {
  EIP6963ProviderDetail,
  SupportedWallets,
  EIP1193Provider,
} from "@eveworld/types";

export interface Connection {
  connectedProvider: {
    provider: any;
    connected: boolean;
  };
  connected: boolean;
  defaultNetwork: { network: Chain } | undefined;
  publicClient: any;
  walletClient: WalletClient | null;
  bundlerClient: any;
  availableWallets: string[];
  isCurrentChain: boolean;
  providers: EIP6963ProviderDetail[];
}

export type WalletContextType = Connection & {
  handleConnect: (wallet: SupportedWallets) => Promise<void>;
  handleDisconnect: () => Promise<void>;
};

export interface ActionPayloads {
  account: any;
  walletClientChain: Chain | null;
  defaultNetwork: { network: Chain } | null;
  provider: EIP1193Provider | null;
}
