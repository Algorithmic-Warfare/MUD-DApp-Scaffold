import { Chain } from "viem";
import { ChainConfig, EIP6963ProviderDetail } from "@eveworld/types";

export interface WalletContextType {
  connectedProvider: {
    provider: any;
    connected: boolean;
  };
  defaultNetwork: Omit<ChainConfig, "systemIds">;
  publicClient: any;
  walletClient: any;
  bundlerClient: any;
  gatewayConfig: {
    gatewayHttp: string;
    gatewayWs: string;
  };
  handleConnect: (wallet: string) => Promise<void>;
  handleDisconnect: () => Promise<void>;
  isCurrentChain: boolean;
  availableWallets: string[];
}

export interface Connection {
  connectedProvider: {
    provider: any;
    connected: boolean;
  };
  defaultNetwork: Omit<ChainConfig, "systemIds"> | undefined;
  publicClient: any;
  walletClient: any;
  bundlerClient: any;
  gatewayConfig: {
    gatewayHttp: string;
    gatewayWs: string;
  };
  availableWallets: string[];
}
